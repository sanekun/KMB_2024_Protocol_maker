from opentrons import protocol_api
import math

metadata = {
    'protocolName': '96 well plate pooling',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11'   # CHECK IF YOUR API LEVEL HERE IS UP TO DATE
}

def run(protocol: protocol_api.ProtocolContext):

    # Deck setting

        # Module setting.
        # for the movement of Pippete Input all of modules in Device!

    # module_magnetic = protocol.load_module('magnetic module gen2', '4')
    
        # Plate setting
    source_plate = protocol.load_labware("nesteppendrf_96_wellplate_150ul", 6)
    dest_plate = protocol.load_labware("bioneer_96_wellplate_300ul", 5)

        # tiprack
    tiprack_20_sin = protocol.load_labware("opentrons_96_tiprack_20ul", 3)
    tiprack_20_mul = protocol.load_labware("opentrons_96_tiprack_20ul", 2)

        # Pipette 
    p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_sin])
    p20_mul = protocol.load_instrument("p20_multi_gen2", "left", tip_racks=[tiprack_20_mul])

        # Tip rack start positions
    p20_sin.starting_tip = tiprack_20_sin.well("A1")
    p20_mul.starting_tip = tiprack_20_mul.well("A1")
    dest_well = dest_plate["A1"]

        # Liquids name and positions
        # it should set appropriate position

    pcr_product = source_plate.rows_by_name()["A"][0:8] # start to end position of source well
    tmp_pooling = source_plate.columns_by_name()["11"]
    
        # tmp_pooling
    p20_mul.pick_up_tip()
    p20_mul.consolidate(5, pcr_product, tmp_pooling[0], rate=0.5, new_tip="never")
    p20_mul.touch_tip()
    p20_mul.mix(3, 10, tmp_pooling[0], rate=0.5)
    p20_mul.touch_tip()
    p20_mul.drop_tip()

        # final_pooling
    p20_sin.pick_up_tip()
    p20_sin.consolidate(5, tmp_pooling, dest_well, rate=0.5, new_tip="never")
    p20_sin.touch_tip()
    p20_sin.mix(2, 10, dest_well, rate=0.5)
    p20_sin.touch_tip()
    p20_sin.drop_tip()