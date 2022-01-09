from opentrons import types, execute, simulate

# this data is from Ligation Sequencing Kit: DNA Repair and End-Prep 
# from Sakib <sakib.hossain@opentrons.com>


metadata = {
    'protocolName': 'Nanopore LSK109(1) DNA endprep_flongle',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'with movable PCR tube pause the protocol when the tube should move'
}

protocol = simulate.get_protocol_api("2.11")
#protocol = protocol_api.get_protocol_api("2.11")

# ================ Module setting.
# for the movement of Pippete Input all of modules in Device!

module_magnetic = protocol.load_module('magnetic module gen2', '4')
module_thermocycler = protocol.load_module("Thermocycler Module")

# ================ Deck setting
## Labware setting
enzyme_rack = protocol.load_labware("opentrons_24_tuberack_eppendorf_1.5ml_safelock_snapcap", 6)
falcon_rack = protocol.load_labware("opentrons_15_tuberack_falcon_15ml_conical", 1)
dna_plate = protocol.load_labware("nest_96_wellplate_100ul_pcr_full_skirt", 5)
thermo_plate = protocol.load_labware("nest_96_wellplate_100ul_pcr_full_skirt", 12)
mag_plate = module_magnetic.load_labware("nest_96_wellplate_100ul_pcr_full_skirt", 4)
trash = protocol.loaded_labwares[12]["A1"]

tiprack_20_sin = protocol.load_labware("opentrons_96_tiprack_20ul", 2)
tiprack_300_sin = protocol.load_labware("opentrons_96_tiprack_300ul", 3)

p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_sin])
p300_sin = protocol.load_instrument("p300_single_gen2", "left", tip_racks=[tiprack_300_sin])

## Reagents
ampure_beads = falcon_rack["A1"]
ethanol_70 = falcon_rack["A2"]

repair_enzyme = enzyme_rack["A1"]
repair_buf = enzyme_rack["A2"]
endprep_enzyme = enzyme_rack["A3"]
endprep_buf = enzyme_rack["A4"]
water = enzyme_rack["A5"]

## Sample Wells
start_position = 0 ## start from A1
sample_number = 8

## Start Tiprack positions
p20_sin.starting_tip = tiprack_20_sin.well("A1")
p300_sin.starting_tip = tiprack_300_sin.well("A1")

dna_well = [dna_plate.wells()[i] for i in range(start_position, start_position + sample_number)]
final_well = [dna_plate.wells()[i] for i in range(start_position + 16, start_position + 16 + sample_number)]
thermo_well = [thermo_plate.wells()[i] for i in range(start_position, start_position + sample_number)]
mag_well = [mag_plate.wells()[i] for i in range(start_position, start_position + sample_number)]

# ================ PROTOCOL STEPS
## Functions
def remove_supernantant(pipette, volume, src, dest):
    pipette.pick_up_tip()
    pipette.flow_rate.aspirate=20
    pipette.aspirate(volume, src.bottom().move(types.Point(x=0, y=0, z=0)))
    pipette.dispense(volume, dest)
    pipette.drop_tip()

## Enzyme reaction
p20_sin.transfer(1, repair_enzyme, dna_well, rate=0.5, new_tip="always")
p20_sin.transfer(1.75, repair_buf, dna_well, rate=0.5, new_tip="always", mix_after=(2,15))
p20_sin.transfer(1.5, endprep_buf, dna_well, rate=0.5, new_tip="always")
p20_sin.transfer(1.75, endprep_enzyme, dna_well, rate=0.5, new_tip="always", mix_after=(2, 15))

try:
    module_thermocycler.open_lid()
except:
    pass
protocol.pause("1. Check enzyme\n2. Spindown\n3. Move sample tube to thermocycler\n4. Resume")

## Incubate on Thermocycler (3)
module_thermocycler.close_lid()
module_thermocycler.set_block_temperature(20)
module_thermocycler.set_lid_temperature(70)
profile = [{'temperature': 20, 'hold_time_minutes': 5},
            {'temperature': 65, 'hold_time_minutes': 5},
            {'temperature': 4, 'hold_time_minutes': 2}]
module_thermocycler.execute_profile(steps=profile, repetitions=1, block_max_volume=30)

protocol.pause("1. If you enter Resume, thermocycler deactivate and open")

module_thermocycler.deactivate()
module_thermocycler.open_lid()

protocol.pause("Move tubes from thermocycler to magnet well and Resume")

## Resuspend AMPure Beads (4)
p300_sin.pick_up_tip()
p300_sin.mix(5, 300, ampure_beads.bottom(z=3), rate=0.5)
p300_sin.touch_tip()
p300_sin.drop_tip()

p300_sin.transfer(80, ampure_beads.top(z=3), dna_well, mix_after=(3, 30), rate=0.3, new_tip="always")

## transfer to tube for Hula Mixer (5)
protocol.pause("1. Move sample tube to Hula Mixer\n2. Put sample tube in Magnetic well\n3. Resume")

## Engage Magnet and Delay for 5 Minutes (6)
module_magnetic.engage(height_from_base=3.5)
protocol.delay(minutes=5)

## Remove Supernant (7)
for src in mag_well:
    remove_supernantant(p300_sin, 130, src, trash)

## Wash Beads with Ethanol (12)
for _ in range(2):
    ## Ethanol
    p300_sin.pick_up_tip()
    for src in mag_well:
        p300_sin.aspirate(190, ethanol_70, rate=0.5)
        p300_sin.dispense(190, src.top(-3), rate=0.5)
    p300_sin.drop_tip()
    ## Remove
    for src in mag_well:
        remove_supernantant(p300_sin, 200, src, trash)

## Pause and Remove Samples for Spin Down (15)
module_magnetic.disengage()
protocol.pause('1. Spindown\n2. replace tube in magnetic_well\n3. Resume')

## Remove Residual Ethanol (16)
module_magnetic.engage(height_from_base=5)
protocol.delay(minutes=1)
for src in mag_well:
    remove_supernantant(p20_sin, 15, src, trash)
module_magnetic.disengage()
protocol.delay(seconds=30)

## Add 61 uL of Nuclease-free Water (17)
for src in mag_well:
    p300_sin.transfer(50, water, src.top(-3), mix_after=(3,60), rate=0.5, new_tip="always")

module_magnetic.engage()
protocol.delay(minutes=5)

## Elution
## Elution은 사람이하자..
for src, dest in zip(mag_well, final_well):
    remove_supernantant(p300_sin, 50, src, dest)
module_magnetic.disengage()

#transfer System message protocol End