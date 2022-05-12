from opentrons import types, protocol_api, simulate

# 96 well Pooling
# Not Verified

metadata = {
    'protocolName': 'Tagging colony PCR (96 well plate based)',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'Using forward [1-12] & Reverse [1-8] Primer Make 96 sperated tag combination in 96well plate'
}

"""
Add three component.
1) Set Parameters [num_of_plate, target_columns]
"""

protocol=simulate.get_protocol_api('2.11')

def run(protocol: protocol_api.ProtocolContext):

    # parmeters
    num_of_plate = 2
    target_columns = 12

    # Functions
    
    def enzyme_transfer(pipette, volume, src, dest, delay_second=None,
                    top_delay=False, asp_rate=None, dis_rate=None,
                    mix_after=False, drop_tip = True):
        # top_delay = list, delay_second= list, mix_after = list
        
        if asp_rate:
            pipette.flow_rate.aspirate=asp_rate
        if dis_rate:
            pipette.flow_rate.dispense=dis_rate            
        
        if pipette._has_tip == False:
            pipette.pick_up_tip()

        pipette.aspirate(volume, src)
        protocol.delay(seconds=delay_second[0])
        if top_delay:
            pipette.move_to(src.top(z=-3))
            protocol.delay(seconds=top_delay[0])
        pipette.dispense(volume, dest)
        protocol.delay(seconds=delay_second[1])
        if type(mix_after) == list:
            try:
                pipette.flow_rate.aspirate=mix_after[2]
                pipette.flow_rate.dispense=mix_after[2]
            except:
                pass
            pipette.mix(mix_after[0], mix_after[1])
        if top_delay:
            pipette.move_to(src.top(z=-3))
            protocol.delay(seconds=top_delay[1])
        if drop_tip:    
            pipette.drop_tip()

    def get_well(well):
        if type(well) == list:
            return (well[0])
        else:
            return (well)

    def well_mix(pipette, dest, mix_params, flow_rate):
        if pipette._has_tip != True:
            pipette.pick_up_tip()
        pipette.flow_rate = flow_rate
        pipette.move_to(dest.bottom())
        pipette.mix(mix_params[0], mix_params[1])
        pipette.blow_out()
        pipette.move_to(dest.top(z=-3))
        pipette.delay(seconds=2)
        pipette.drop_tip()

    # Deck Setting
    ## Modules  
    module_thermocycler = protocol.load_module("thermocycler Module")

    ## Racks
    pooled_plate = protocol.load_labware('biorad_96_wellplate_200ul_pcr', 9) 
    trash = protocol.loaded_labwares[12]["A1"]
    for n in range(num_of_plate):
        globals()[f'source_plate{n+1}'] = protocol.load_labware('biorad_96_wellplate_200ul_pcr', n+1)

    tiprack_20_1 = protocol.load_labware("opentrons_96_tiprack_20ul", 6)
    tiprack_20_2 = protocol.load_labware("opentrons_96_tiprack_20ul", 5)

    tipracks_20 = [tiprack_20_1, tiprack_20_2]

    p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=tipracks_20)
    p20_mul = protocol.load_instrument("p20_multi_gen2", "left", tip_racks=tipracks_20)

    ## Start Tiprack positions
    p20_sin.starting_tip = tiprack_20_1.well("A1")
    p20_mul.starting_tip = tiprack_20_1.well("A1")

    ## Well Positions
    tmp_well, final_well = [], []
    for n in range(num_of_plate):
        tmp_well.append(pooled_plate.columns()[-(n+1)])
        final_well.append(pooled_plate.columns()[0][(n)])
    
    ## Protocol RUN

    ### First 8 - channel Pooling
    for n in range(num_of_plate):
        src_col = eval(f'source_plate{n+1}').rows_by_name()['A'][0:target_columns]
        dest = get_well(tmp_well[n])
        vol = 10
        tip_trial = 0
        
        for src in src_col:
            enzyme_transfer(p20_mul, vol, src, dest,
                            asp_rate=10, dis_rate=10, drop_tip=False)
            tip_trial += 1

            if tip_trial == 4:
                p20_mul.drop_tip()
        
        ### Mix
        well_mix(p20_mul, dest=dest, mix_params=[5, 10], flow_rate=10)

    ### Single Chanel Pooling
    for n in range(num_of_plate):
        src_col = tmp_well[n]
        dest = final_well[0]
        vol = 10
        tip_trial = 0

        for src in src_col:
            enzyme_transfer(p20_sin, vol, src, dest,
                            asp_rate=10, dis_rate=10, drop_tip=False)
            tip_trial += 1
            
            if tip_trial == 4:
                p20_sin.drop_tip()

        well_mix(p20_sin, dest=dest, mix_params=[5, 10], flow_rate=10)
