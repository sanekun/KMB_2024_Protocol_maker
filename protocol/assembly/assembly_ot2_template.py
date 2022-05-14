from opentrons import types, protocol_api, simulate
import pickle

# DNA assembly template script.
# Don't Run This script with OT2!

metadata = {
    'protocolName': 'Golden gate assembly used by SBL (96 well plate based)',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'For combinatorial part library assembly & Simultaneous assembly with different part combination'
}

# Load assembled well data
with open("/mnt/kun/work/git/ot2/protocol/assembly/get_parts/data.pickle", 'rb') as f:
    meta_data = pickle.load(f)

def run(protocol: protocol_api.ProtocolContext):

    # get global parameters
    well_data = meta_data[:-1]
    enz_vol = '{enzyme_mix_volume}'

    # Deck Setting
    ## Modules  
    module_thermocycler = protocol.load_module("thermocycler Module")

    ## Racks
    '{part_plates}'

    assemble_plate = module_thermocycler.load_labware("biorad_96_wellplate_200ul_pcr")
    tube_rack = protocol.load_labware('opentrons_24_tuberack_eppendorf_1.5ml_safelock_snapcap', 9)
    trash = protocol.loaded_labwares[12]["A1"]

    tiprack_20_1 = protocol.load_labware("opentrons_96_tiprack_20ul", 6)
    tiprack_20_2 = protocol.load_labware("opentrons_96_tiprack_20ul", 5)
    p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_1, tiprack_20_2])

    ## Start Tiprack positions
    p20_sin.starting_tip = tiprack_20_1.well("A1")

    ## Reagents
    ### Every reagent should be in 1.5ml Bioneer screw tube.
    enz_mix = tube_rack['D1']
    DW = tube_rack['D5']


    ## Protocol
    ### Functions
    def enzyme_transfer(pipette, volume, src, dest, delay_second=[0, 0],
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
        pipette.dispense(1, dest.top(z=-3))
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

    def get_enz_vol():
        end

    ## Enzyme Transfer
    # Mix를 그냥 사용하는게 현명한듯 하나씩 넣는건 너무 힘들다.

    src = enz_mix

    p20_sin.pick_up_tip()
    p20_sin.aspirate(20, src)


    for i in range(len(well_data)):
        src = enz_mix
        dest = assemble_plate[i]


    ## Part Transfer
    
    for i in range(well_data):
        data = well_data[i]
        dest = assemble_plate.wells()[i]

        for i2 in range(1, len(data)-1):
            
            tmp = data.get(f'part{i2}')
            vol = tmp['vol']
            # plate가 ext 포지션일 때는 name을 기준으로 well을 정해두기.
            if tmp['plate'] == None:
                # getpart에서 metadata의 [-2]에 포지션을 정의하도록 하기 그냥 A1부터 쭉.!
                tmp_no = data['meta']['No'].split('_')[i2-1]
                src = tube_rack.wells_by_name()['C5']
            else:
                src = eval(tmp['plate']).wells_by_name()[tmp['well']]
            enzyme_transfer(p20_sin, vol, src, dest,
                            asp_rate = 5, dis_rate =5, drop_tip=True)

# Enzyme transfer

# Thermocycling

module_thermocycler.close_lid()
module_thermocycler.set_lid_temperature(100)
