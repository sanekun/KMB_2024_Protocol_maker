from opentrons import protocol_api

metadata = {
    'protocolName': '96 well plate pooling',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11'   # CHECK IF YOUR API LEVEL HERE IS UP TO DATE
}

def run(protocol: protocol_api.ProtocolContext):

    # Module setting.
    # for the movement of Pippete Input all of modules in Device!
    #module_magnetic = protocol.load_module('magnetic module gen2', '4')
    
    
    source_plate = protocol.load_labware("nesteppendrf_96_wellplate_150ul", 6)
    dest_plate = protocol.load_labware("bioneer_96_wellplate_300ul", 5)
    tiprack_20_sin = protocol.load_labware("opentrons_96_tiprack_20ul", 3)
    tiprack_20_mul = protocol.load_labware("opentrons_96_tiprack_20ul", 2)

    p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_sin])
    p20_mul = protocol.load_instrument("p20_multi_gen2", "left", tip_racks=[tiprack_20_mul])


    #Input Tip start positions
    p20_sin.starting_tip = tiprack_20_sin.well("E7")
    p20_mul.starting_tip = tiprack_20_mul.well("A12")

    #Set the Liquids
    pcr_product = source_plate.rows()[:][0:8]

    def source_assemble(i):

        p20_mul.pick_up_tip()

        source = i[0] #A row position
        dest = 

        
        p20_mul.aspirate(5, source, rate=0.5)

    for i in pcr_product:
        source_assemble(i)
        

    def dispense_reverse_tag(i):

        source = reverse_tag[i]
        dest = destination_plate.columns()[i]

        p20_sin.pick_up_tip()
        #p20_sin.well_bottom_clearance.aspirate= -1
        p20_sin.mix(2,10, source, rate =0.5)
        p20_sin.aspirate(10, source, rate=0.5)
        for j in dest:
            p20_sin.dispense(1, j)

        # drop
        p20_sin.drop_tip()

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