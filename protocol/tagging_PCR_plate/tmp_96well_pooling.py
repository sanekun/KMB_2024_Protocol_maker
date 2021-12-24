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
    p20_sin.starting_tip = tiprack_20_sin.well("E7")
    p20_mul.starting_tip = tiprack_20_mul.well("A12")

        # Liquids name and positions
        # it should set appropriate position

    pcr_product = source_plate.rows()[:][0:8] # start to end position of source well
    tmp_pooling = source_plate.rows()[:][11] # temporary pooling well
    

        # parameters
    tmp_volume = 5 # aspiration volume
    count1 = int(20/tmp_volume)
    count2 = math.ceil(len(pcr_product)/count1)
    start_row = 0 # start position of source_well

    p20_mul.consolidate(5, pcr_product, tmp_pooling, rate=0.5, touch_tip=True)

        # temp_pooling
    def pooling(start_row, count1):
        for i in range(0, count1):
            start_row += 1
            if start_row > len(pcr_product):
                break
            else:
                p20_mul.aspirate(tmp_volume, pcr_product[start_row], rate=0.5)
        p20_mul.blow_out(tmp_pooling, rate=0.5)   
        p20_mul.touch_tip()

    p20_mul.pick_up_tip()
    for x in range(0, count2):
        pooling(start_row, count1)
    p20_mul.mix(3, 10, tmp_pooling, rate=0.5)
    p20_mul.touch_tip()
    p20_mul.drop_tip()
        
        
        # final_pooling
    pooling_volume = 5
    count3 = int(20/pooling_volume)

    def pooling():
    p20_sin.pick_up_tip()        
    for i in tmp_pooling:
        p20_sin.aspirate(5, i, rate=0.5)

        

    # Reverse_tag_primer dispense
    for i in range(0, len(reverse_tag)):
        dispense_reverse_tag(i)


    def transfer_forward_mix(i):

        # for multi-channel pipette.
        source = forward_tag_mix[0]
        dest = destination_plate.columns()[i][0]

        # aspiration
        p20_mul.pick_up_tip()
        p20_mul.well_bottom_clearance.aspirate=0
        # for polymerase mixture use low flow rate
        p20_mul.aspirate(9, source, rate=0.5)
        
        # dispense
        p20_mul.dispense(10, dest, rate = 0.5)
        p20_mul.mix(2, 5, dest, rate= 0.5)
        p20_mul.blow_out()
        p20_mul.touch_tip()
        p20_mul.move_to(dest.top())
        protocol.delay(seconds=1)

        # drop
        p20_mul.drop_tip()


    for i in range(0, len(reverse_tag)):
        transfer_forward_mix(i)