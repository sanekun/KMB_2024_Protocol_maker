from opentrons import types, protocol_api

# this data is from Ligation Sequencing Kit: DNA Repair and End-Prep 
# modified script from Sakib <sakib.hossain@opentrons.com>
metadata = {
    'protocolName': 'Nanopore LSK109(1) DNA endprep_flongle',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'with movable PCR tube pause the protocol when the tube should move'
}

def run(protocol: protocol_api.ProtocolContext):
    #============= Deck setting

    ## Parameters
    start_position = 0 ## start from A1
    sample_number = 2
    self_elution = True

    ## Module setting
    ### for the movement of Pippete Input all of modules in Device!
    module_magnetic = protocol.load_module('magnetic module gen2', '4')
    module_thermocycler = protocol.load_module("thermocycler Module")

    ## Labware setting
    enzyme_rack = protocol.load_labware("opentrons_24_tuberack_eppendorf_1.5ml_safelock_snapcap", 1)
    falcon_rack = protocol.load_labware("opentrons_6_tuberack_falcon_50ml_conical", 2)
    dna_plate = protocol.load_labware("bioneer_96_tuberack_200ul", 5)
    mag_plate = module_magnetic.load_labware("biorad_96_tuberack_200ul", 4)
    trash = protocol.loaded_labwares[12]["A1"]

    tiprack_20_sin = protocol.load_labware("opentrons_96_tiprack_20ul", 3)
    tiprack_300_sin = protocol.load_labware("opentrons_96_tiprack_300ul", 6)
    p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_sin])
    p300_sin = protocol.load_instrument("p300_single_gen2", "left", tip_racks=[tiprack_300_sin])

    ## Start Tiprack positions
    p20_sin.starting_tip = tiprack_20_sin.well("A1")
    p300_sin.starting_tip = tiprack_300_sin.well("A2")

    ## Reagents
    ### All of reagents in Eppendorf 1.5ml lobind tube.
    repair_buf = enzyme_rack["E1"]
    repair_enzyme = enzyme_rack["E2"]
    endprep_buf = enzyme_rack["E3"]
    endprep_enzyme = enzyme_rack["E4"]
    water = enzyme_rack["E5"]

    ampure_beads = falcon_rack["A1"]
    ethanol_70 = falcon_rack["A2"]

    dna_well = [dna_plate.wells()[i] for i in range(start_position, start_position + sample_number)]
    final_well = [dna_plate.wells()[i] for i in range(start_position + 16, start_position + 16 + sample_number)]
    mag_well = [mag_plate.wells()[i] for i in range(start_position, start_position + sample_number)]

    #============= PROTOCOL STEPS
    ## Functions
    def enzyme_transfer(pipette, volume, src, dest, delay_second, asp_rate=None, dis_rate=None, mix_after=False):
        if asp_rate != None:
            pipette.flow_rate.aspirate=asp_rate
        if dis_rate != None:
            pipette.flow_rate.dispense=dis_rate            
        pipette.pick_up_tip()
        pipette.aspirate(volume, src)
        protocol.delay(seconds=delay_second)
        pipette.touch_tip()
        pipette.dispense(volume, dest)
        protocol.delay(seconds=delay_second/2)
        if type(mix_after) == tuple:
            try:
                pipette.flow_rate.aspirate=mix_after[2]
                pipette.flow_rate.dispense=mix_after[2]
            except:
                pass
            pipette.mix(mix_after[0], mix_after[1])
        pipette.blow_out()    
        pipette.touch_tip()
        pipette.drop_tip()

    def remove_supernantant(pipette, volume, src, dest, asp_rate=20, xyz=(0,0,0)):
        pipette.pick_up_tip()
        pipette.flow_rate.aspirate=asp_rate
        pipette.aspirate(volume, src.bottom().move(types.Point(x=xyz[0], y=xyz[1], z=xyz[2])))
        pipette.dispense(volume, dest)
        pipette.drop_tip()

    ## protocol's order
    for dest in dna_well:
        enzyme_transfer(p20_sin, 1.75, repair_buf, dest, 1, 5, 5)
    for dest in dna_well:
        enzyme_transfer(p20_sin, 1.75, endprep_buf, dest, 1, 5, 5)
    for dest in dna_well:
        enzyme_transfer(p20_sin, 1.5, endprep_enzyme, dest, 1, 3, 3)
    for dest in dna_well:
        enzyme_transfer(p20_sin, 1, repair_enzyme, dest, 1, 3, 3, mix_after=(2, 20))

    module_thermocycler.open_lid()
    
    protocol.pause("1. Check enzyme\
                \n2. Spindown\
                \n3. Move sample tube to thermocycler\
                \n4. Resume")

    ## Incubate on Thermocycler (3)
    module_thermocycler.close_lid()
    
    module_thermocycler.set_block_temperature(20)
    module_thermocycler.set_lid_temperature(70)
    profile = [{'temperature': 20, 'hold_time_minutes': 5},
                {'temperature': 65, 'hold_time_minutes': 5},
                {'temperature': 4, 'hold_time_minutes': 2}]
    module_thermocycler.execute_profile(steps=profile, repetitions=1, block_max_volume=60)

    protocol.pause("1. If you enter Resume, thermocycler deactivate and open")

    module_thermocycler.deactivate()
    module_thermocycler.open_lid()

    protocol.pause("Move tubes from thermocycler to dna_well and Resume")

    ## Resuspend AMPure Beads (4)
    p300_sin.flow_rate.aspirate=300
    p300_sin.flow_rate.dispense=300
    p300_sin.pick_up_tip()
    p300_sin.mix(5, 300, ampure_beads.bottom(z=15))
    p300_sin.blow_out()
    p300_sin.move_to(ampure_beads.top())
    protocol.delay(seconds=1)
    p300_sin.touch_tip()
    p300_sin.drop_tip()

    for dest in dna_well:
        enzyme_transfer(p300_sin, 40, ampure_beads, dest, 1, 50, 50, mix_after=(3, 30))

    ## transfer to tube for Hula Mixer (5)
    protocol.pause("1. Move sample tube to Hula Mixer\
                \n2. Put sample tube in Magnetic well\
                \n3. Resume")

    ## Engage Magnet and Delay for 5 Minutes (6)
    module_magnetic.engage(height_from_base=3) # Biorad tube rack = 3
    protocol.delay(minutes=5)

    ## Remove Supernant (7)
    for src in mag_well:
        remove_supernantant(p300_sin, 70, src, trash, asp_rate=50)

    ## EtOH wash
    for _ in range(2):
        ## Ethanol
        p300_sin.pick_up_tip()
        for dest in mag_well:
            p300_sin.flow_rate.aspirate=150
            p300_sin.flow_rate.dispense=50
            p300_sin.aspirate(190, ethanol_70)
            p300_sin.dispense(190, dest.top(-3))
        p300_sin.drop_tip()
        ## Remove
        for src in mag_well:
            remove_supernantant(p300_sin, 200, src, trash, asp_rate=100)

    ## Pause and Remove Samples for Spin Down (15)
    module_magnetic.engage(height_from_base=2)
    protocol.pause('1. Spindown\
                \n2. replace tube in magnetic_well\
                \n3. Resume')

    ## Remove Residual Ethanol (16)
    protocol.delay(seconds=30)
    for src in mag_well:
        remove_supernantant(p20_sin, 15, src, trash, asp_rate=10, z=(0,0,-0.5))
    module_magnetic.disengage()
    protocol.delay(seconds=40)

    ## Elution with water
    for dest in mag_well:
        enzyme_transfer(p20_sin, 12.5, water, dest, 0, 20, 20, mix_after=(3, 10))

    if self_elution != None:
        protocol.pause("Final step : Elution")
    else:
        protocol.delay(minutes=2.5)
        module_magnetic.engage(height_from_base=2.5)
        protocol.delay(minutes=1.5)
        p20_sin.flow_rate.aspirate=20
        p20_sin.flow_rate.dispense=20
        for src, dest in zip(mag_well, final_well):
            p20_sin.transfer(12, src, dest, new_tip="always")
        module_magnetic.disengage()
