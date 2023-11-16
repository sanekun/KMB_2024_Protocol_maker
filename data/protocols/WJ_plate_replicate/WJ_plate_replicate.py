from opentrons import types, protocol_api

# Cell + Substrate transfer to 96 well plate
# 23-10-20 Simulated by kun.

# PARAMETERS

metadata = {
    'protocolName': 'WJ_plate_replicate',
    'author': 'Seong-Kun Bak <sanekun@kaist.ac.kr>',
    'apiLevel': '2.15',
    'robotType': "OT-2",
    'description': ''
}

# from opentrons import simulate
# protocol=simulate.get_protocol_api('2.15')

def flow_rate(pipette, **kwargs):
    assert (item in ['aspirate', 'dispense', 'blow_out'] for item in kwargs.keys()), "Error Keywords in Flow Rate."
    for i in kwargs.keys:
        pipette.flow_rate[i] = kwargs[i]

def run(protocol: protocol_api.ProtocolContext):
    # Deck Setting
    ## Modules  
    
    # Pipette
    p20_tip_1 = protocol.load_labware("opentrons_96_tiprack_20ul", 1)
    p20_tip_2 = protocol.load_labware("opentrons_96_tiprack_20ul", 2)
    p300_tip_1 = protocol.load_labware("opentrons_96_tiprack_300ul", 3)
    
    p20 = protocol.load_instrument("p20_multi_gen2", "left", tip_racks=[p20_tip_1, p20_tip_2])
    p300 = protocol.load_instrument("p300_multi_gen2", "right", tip_racks=[p300_tip_1])
    
    ## Racks
    target_plates = [protocol.load_labware('nest_96_wellplate_200ul_flat', i) for i in [4, 5, 6, 7]]
    substrate_plate = protocol.load_labware('nest_96_wellplate_200ul_flat', 8)
    
    GESS_WT_reservoir = protocol.load_labware('nest_12_reservoir_15ml', 9)
    GESS_E135K_reservoir = protocol.load_labware('nest_12_reservoir_15ml', 10)
    DMSO_reservoir = protocol.load_labware('nest_12_reservoir_15ml', 11)
    
    ## Start Tiprack positions
    # p20_sin.starting_tip = tiprack_20_1.well("A1")
    # p20_mul.starting_tip = tiprack_20_1.well("A1")
    
    # Protocol RUN
    ## Transfer1
    for dest in target_plates[:2]:
        p300.transfer(198, source=GESS_WT_reservoir.rows()[0][0], dest=dest.rows_by_name()['A'],
                      disposal_volume=50,
                      new_tip='once')

    for dest in target_plates[2:4]:
        p300.transfer(198, source=GESS_E135K_reservoir.rows()[0][0], dest=dest.rows_by_name()['A'],
                      disposal_volume=50,
                      new_tip='once')

    ##
    for i in range(10):
        src = substrate_plate.rows()[0][2+i]
        dest = [plate.rows_by_name()['A'][1+i] for plate in target_plates[:2]]
        
        p20.pick_up_tip()
        p20.transfer(5, DMSO_reservoir.rows()[0][0], src, new_tip='never')
        p20.mix(3, volume=5, location=src)
        p20.touch_tip(src)
        
        p20.distribute(4, src, dest, new_tip='never', disposal_volume=1)
        p20.drop_tip()
        
        dest = [plate.rows_by_name()['A'][1+i] for plate in target_plates[2:4]]
        
        p20.pick_up_tip()
        p20.distribute(4, src, dest, new_tip='never', disposal_volume=1)
        p20.drop_tip()