from signal import SIG_DFL
from opentrons import types, protocol_api, simulate

# 96 well plate Tagging PCR
# Not Verified !
# Verified at 22-05-10 by kun.

metadata = {
    'protocolName': 'Tagging colony PCR (96 well plate based)',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'Using forward [1-12] & Reverse [1-8] Primer Make 96 sperated tag combination in 96well plate'
}

"""
Add three component.
1) Premixed mixture (Enzyme + Buffer + DW + Forward Primer)
2) Reverse Primer (10 pmol)
3) Cultured Cell
"""

def run(protocol: protocol_api.ProtocolContext):

    # Functions
    
    def part_transfer(pipette, volume, src, dest, delay_second=[0, 0], top_delay=False, asp_rate=None, dis_rate=None, mix_after=False, drop_tip = True):
        
            
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
            protocol.delay(seconds=top_delay)
        pipette.dispense(volume, dest)
        protocol.delay(seconds=delay_second[1])
        if type(mix_after) == list:
            try:
                pipette.flow_rate.aspirate=mix_after[2]
                pipette.flow_rate.dispense=mix_after[2]
            except:
                pass
            pipette.mix(mix_after[0], mix_after[1])
        pipette.blow_out()
        if drop_tip:    
            pipette.drop_tip()

    class Reagent():
        def __init__(self, name, wells, cols, vol_per_well):
            self.name
            self.wells
            self.cols

            aa
    # Deck Setting
    ## Modules  
    module_thermocycler = protocol.load_module("thermocycler Module")
    module_magnetic = protocol.load_module('magnetic module gen2', '4')

    ## Racks
    forward_mix = protocol.load_labware('usascientific_96_wellplate_2.4ml_deep', 3)
    reverse_primer = protocol.load_labware('biorad_96_wellplate_200ul_pcr', 2)
    cultured_cell = protocol.load_labware('biorad_96_wellplate_200ul_pcr', 1)
    trash = protocol.loaded_labwares[12]["A1"]
    assemble_plate = module_thermocycler.load_labware('biorad_96_wellplate_200ul_pcr')

    tiprack_20_1 = protocol.load_labware("opentrons_96_tiprack_20ul", 6)
    tiprack_20_2 = protocol.load_labware("opentrons_96_tiprack_20ul", 5)

    tipracks_20 = [tiprack_20_1, tiprack_20_2]

    p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=tipracks_20)
    p20_mul = protocol.load_instrument("p20_multi_gen2", "left", tip_racks=tipracks_20)

    ## Start Tiprack positions
    p20_sin.starting_tip = tiprack_20_1.well("A1")
    p20_mul.starting_tip = tiprack_20_1.well("A1")

    ## Reagents
    ### Every reagent should be in 1.5ml Bioneer screw tube.

    forward = [forward_mix.columns_by_name()['1'][0], forward_mix.columns_by_name()['2'][0]] 
    reverse = reverse_primer.rows_by_name()['A']
    
    ## Protocol RUN

    module_thermocycler.open_lid()

    # forward transfer
    for_n, for_vol = 0, 500
    for dest_col in assemble_plate.rows():
        vol = 18
        for_vol -= vol

        if for_vol <= 0:
            for_n += 1
            for_vol = 500
            p20_mul.drop_tip()
        part_transfer(p20_mul, vol, forward[for_n], dest_col, 1, 1, 20, 20, drop_tip=False)
    
    p20_mul.drop_tip()

    # reverse & cell
    n = 0
    for src in reverse:
        for dest in assemble_plate.columns():
            cell = cultured_cell.wells()[n]
            part_transfer(p20_mul, 1, src, dest, 0, 0, 5, 5, drop_tip=False)
            part_transfer(p20_mul, 1, cell, dest, 0, 0, 5, 5)
            n += 1


    # PCR
    module_thermocycler.close_lid()
    module_thermocycler.set_lid_temperature(105)

    module_thermocycler.set_block_temperature(94, hold_time_minutes=5)
    profile = [{'temperature': 94, 'hold_time_minutes': 1},
                {'temperature': 55, 'hold_time_minutes': 1},
                {'temperature': 72, 'hold_time_minutes': 5}]
    module_thermocycler.execute_profile(steps=profile, repetitions=30, block_max_volume=20)
    module_thermocycler.set_block_temperature(72, hold_time_minutes=5)
    module_thermocycler.set_block_temperature(4, hold_time_minutes=10)

    module_thermocycler.deactivate()
    module_thermocycler.open_lid()
