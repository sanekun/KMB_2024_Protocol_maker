from opentrons import types, protocol_api

# Cell + Substrate transfer to 96 well plate
# 23-10-20 Simulated by kun.

# PARAMETERS
# Primer, Template Input을 Dict (JSON)으로 받는다고 가정.

PARAMETER={
    "plate_type":"nest_96_wellplate_200ul_flat",
    "PLATE": {
        "Plate1": {
            "NewRiboJ-F": "A1",
            "NewRiboJ-R": "A2"
            },
        "Plate2": {
            "TemplateDNA": "B1"
            }
        },
    "PARAM1": 1,
    "PARAM2": 0
}

MULTI_PIPETTE=False

metadata = {
    'protocolName': 'WJ_plate_replicate',
    'author': 'Seong-Kun Bak <sanekun@kaist.ac.kr>',
    'apiLevel': '2.15',
    'robotType': "OT-2",
    'description': ''
}

from opentrons import simulate
protocol=simulate.get_protocol_api('2.15')

def flow_rate(pipette, **kwargs):
    assert (item in ['aspirate', 'dispense', 'blow_out'] for item in kwargs.keys()), "Error Keywords in Flow Rate."
    for i in kwargs.keys:
        pipette.flow_rate[i] = kwargs[i]

def run(protocol: protocol_api.ProtocolContext):
    # Deck Setting
    ## Modules 
    tc_mod = protocol.load_module(module_name="thermocyclerModuleV1")
    
    ## Pipette
    p20_tip = protocol.load_labware("opentrons_96_tiprack_20ul", 1)
    if MULTI_PIPETTE:
        p20 = protocol.load_instrument("p20_multi_gen2", "left", tip_racks=[p20_tip])
    else:
        p20 = protocol.load_instrument("p20_single_gen2", "left", tip_racks=[p20_tip])
    
    ## Plates
    
    for i in range(len(PARAMETER["PLATE"])):
        protocol.load_labware(PARAMETER["plate_type"], location=i)
    PARAMETER["PLATE"].keys()
    
    
    source_plate = protocol.load_labware("nest_96_wellplate_200ul_flat", location=3)
    tc_plate = tc_mod.load_labware("nest_96_wellplate_200ul_flat")
    mag_plate = mag_mod.load_labware("nest_96_wellplate_200ul_flat")
    
    ## Materials
    vector_template = source_plate.wells_by_name()['A1']
    vector_primer = source_plate.wells_by_name()['A2']
    insert_template = source_plate.wells_by_name()['A3']
    insert_primer = source_plate.wells_by_name()['A4']
    
    # RUN
    ## Vector
    src = [vector_template, vector_primer]
    dest = tc_plate.wells_by_name()['A1'] # Input PCR master Mix
    p20.transfer(volume=[0,0],
                 source=src,
                 dest=dest)
    
    ## Insert
    src = [insert_template, insert_primer]
    p20.transfer(volume=[0,0],
                 source=src,
                 dest=dest)
    
        
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