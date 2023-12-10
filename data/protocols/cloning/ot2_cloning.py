from opentrons import types, protocol_api
import pandas as pd

# Cell + Substrate transfer to 96 well plate
# 23-10-20 Simulated by kun.

# PARAMETERS
# Primer, Template Input을 Web으로부터 Dict(JSON)으로 받는다고 가정.

## 먼저 사용할 모든 Plate 등록 (Transformation 받을 것 까지)
## Thermocycler Plate 1개 등록
PLATE = {
    "Plate1": {
        "Deck": 4,
        "Type": "nest_96_wellplate_200ul_flat"
    },
    "Plate2": {
        "Deck": 5,
        "Type": "nest_96_wellplate_200ul_flat"
    },
    "Plate3": {
        "Deck": 9,
        "Type": "nest_96_wellplate_200ul_flat"
    },
    "Plate4": {
        "Deck": 6,
        "Type": "nest_96_wellplate_200ul_flat"
    },
}

## 사용할 DNA 등록 (Plate별로)
INPUT= {
    "Plate1": pd.DataFrame({
        "Well":["A1","B1","B6","C2","E7","F9"],
        "Name":["pACBB_vec-F1", "pACBB_vec-R1", "primer3", "primer4", "primer5", "primer6"]}),
    "Plate2": pd.DataFrame({
        "Well":["A1","B1"],
        "Name":["pACBB_4-5", "pET28a"]})
}

REACTION = {
    "PCR":  pd.DataFrame({
        "Well": ['A1','B1','C1','D1','F1'],
        'Name': ['S1','S2','S3','S4','S5'],
        'DNA1 (0.5)': ['pACBB_4-5','pACBB_4-5','pACBB_4-5','pACBB_4-5','pACBB_4-5'],
        'DNA2 (0.75)': ['pACBB_vec-F1','pACBB_vec-F2','pACBB_T7-F1', 'pACBB_T7-F2','pACBB_MCS-F1'],
        'DNA3 (0.75)': ['pACBB_vec-R1','pACBB_vec-R2','pACBB_T7-R1', 'pACBB_T7-R2','pACBB_MCS-R1'],
        'Enzyme (12.5)': ['KODone','KODone','KODone','KODone','KODone'],
        'DW (25)': ['DW','DW','DW','DW','DW']
        }),
    "Assembly": pd.DataFrame({
        'Well': ['A9','B9','C9','D9','E9'],
        'Name': ['vec1','vec2','vec3','vec4','vec5'],
        'DNA1': ['S1','S1','S2','S1','S3'],
        'DNA2': ['S2','S3','S3','S2',''],
        'DNA3': ['S2','S3','S3','S2',''],
        'Enzyme (10)': ['NEBuilder HiFi Master Mix','NEBuilder HiFi Master Mix','NEBuilder HiFi Master Mix','NEBuilder HiFi Master Mix','NEBuilder HiFi Master Mix'],
        'DW (20)': ['DW','DW','DW','DW','DW']
        }),
    "Transformation": {}
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