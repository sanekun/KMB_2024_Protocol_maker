from opentrons import types, protocol_api, simulate
from opentrons.simulate import get_protocol_api
import ot2_functions as sbl

# 96 well plate Tagging PCR
# Not Verified at 22-05-11 by kun.

metadata = {
    'protocolName': 'Substrate dispense',
    'author': 'Seong-Kun Bak <sanekun@kribb.re.kr>',
    'apiLevel': '2.13',
    'description': '',
    'date': '2023-09-07'
}
protocol = get_protocol_api('2.13')

def run(protocol: protocol_api.ProtocolContext):
    cnt=0
    for _ in range(20):
        protocol.home()
        single_run(P300_start=cnt*4, protocol=protocol)
        cnt += 1
        
        Resume_message="""
        Fill all of plates and 20P tips
        """
        if cnt == 3:
            Resume_message += "\n**Warning** Fill 300P tip"
            cnt = 0
        
        protocol.pause(Resume_message)
    
def single_run(P300_start, protocol=protocol):
    plate_rows = ['A' + str(i) for i in range(1, 13)]
    
    # Deck Setting
    ## Labwares
    tiprack_P20 = [protocol.load_labware('opentrons_96_tiprack_20ul', '1'),
                   protocol.load_labware('opentrons_96_tiprack_20ul', '2')]
    tiprack_P300 = protocol.load_labware('opentrons_96_tiprack_300ul', '3')
    
    target_plates = [protocol.load_labware('biorad_96_wellplate_200ul_pcr', i) for i in range(4, 8)]
    substrate_plate = protocol.load_labware('biorad_96_wellplate_200ul_pcr', '8')
    WT_reservoir = protocol.load_labware('biorad_96_wellplate_200ul_pcr', '9')
    E135K_reservoir = protocol.load_labware('biorad_96_wellplate_200ul_pcr', '10')
    DMSO_reservoir = protocol.load_labware('biorad_96_wellplate_200ul_pcr', '11')
    
    P20 = protocol.load_instrument("p20_multi_gen2", "left", tip_racks=tiprack_P20)
    P300 = protocol.load_instrument("p300_multi_gen2", "right", tip_racks=tiprack_P300)
    
    # For loop
    P300.starting_tip(tiprack_P300.rows_by_name()['A'][P300_start])
    
    # Protocol
    ## 1
    P300.flow_rate=80 # ul/s
    for i in range(2):
        P300.transfer(198, WT_reservoir, [i.rows_by_name()['A'] for i in target_plates[i]],
                      disposal_volume = 50, new_tip='once')
    for i in range(2, 4):
        P300.transfer(198, E135K_reservoir, [i.rows_by_name()['A'] for i in target_plates[i]],
                      disposal_volume = 50, new_tip='once')
    P300.flow_rate=160 # Reset to Default
    
    ## 2-4
    # row 맞춰야함
    P20.flow_rate=5
    for dest_well in plate_rows[:-2]: # A1 to A10
        P20.pick_up_tip()
        P20.transfer(5, DMSO_reservoir, substrate_plate.wells_by_name()[dest_well],
                     disposal_volume = 5, new_tip='never', mix_after=(3, 5))
        P20.dispense(2, substrate_plate.wells_by_name()[dest_well],
                     [i.wells_by_name()[dest_well] for i in target_plates[:2]],
                     disposal_volume = 0.5)
        P20.drop_tip()
        P20.dispense(2, substrate_plate.wells_by_name()[dest_well],
                     [i.wells_by_name()[dest_well] for i in target_plates[2:]],
                     disposal_volume = 0.5, new_tip='once')
    P20.flow_rate=7.6 # Reset to Default