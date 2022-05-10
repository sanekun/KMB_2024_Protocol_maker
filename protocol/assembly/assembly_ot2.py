import pickle
import sys
import opentrons.simulate

# Load assembled well data
with open("/mnt/kun/work/git/ot2/protocol/assembly/get_parts/data.pickle", 'rb') as f:
    meta_data = pickle.load(f)

#======================
plates = list(filter(None, meta_data[-1]))
if len(plates) > 4:
    sys.exit("Too many plates !\nMaximum is 4.")
#======================
n = 1
for i in plates:
    # prevent crash with magnetic position
    if n == 4:
        n+=1
    globals()[f'{i}'] = protocol.load_labware('biorad_96_wellplate_200ul_pcr', n)
    n+=1
#======================

use_enz_mix = True

if use_enz_mix:
    enz_mix = tube_rack['D1']
else:
    BsaI = tube_rack["D1"]
    T4_buf = tube_rack["D2"]
    T4_ligase = tube_rack["D3"]
    DW = tube_rack['D5']
    
#======================

def part_transfer(pipette, volume, src, dest, delay_second=0, top_delay=0, asp_rate=0, dis_rate=0, mix_after=False, drop_tip = True):
    if asp_rate:
        pipette.flow_rate.aspirate=asp_rate
    if dis_rate:
        pipette.flow_rate.dispense=dis_rate            
    pipette.pick_up_tip()
    pipette.aspirate(volume, src)
    protocol.delay(seconds=delay_second)
    if top_delay:
        pipette.move_to(src.top(z=-3))
        protocol.delay(seconds=top_delay)
    pipette.dispense(volume, dest)
    protocol.delay(seconds=delay_second/2)
    if type(mix_after) == list:
        # list가 낫지않을까?
        try:
            pipette.flow_rate.aspirate=mix_after[2]
            pipette.flow_rate.dispense=mix_after[2]
        except:
            pass
        pipette.mix(mix_after[0], mix_after[1])
    pipette.blow_out()
    if drop_tip:    
        pipette.drop_tip()
    else:
        pass

module_thermocycler.open_lid()

well_data = meta_data[:-1]

# insert DW
n=1
for i1 in well_data:
    src = DW
    dest = assemble_plate.wells()[n]
    vol = i1['meta']['DW']

    part_transfer(p20_sin, vol, src, dest, asp_rate=30, dis_rate=30)
    n+=1

n=1
for i1 in well_data:
    keys = list(i1.keys())[:-1]
    dest = assemble_plate.wells()[n]
    for i2 in keys[:-1]:
        part = i1[i2]
        plate = part['plate']
        well = part['well']
        
        # for external parts
        if well:
            vol = part['vol']
        else:
            well
            plate

        src = eval(plate).wells_by_name()[well]
        part_transfer(p20_sin, vol, src, dest, asp_rate=10, dis_rate=10)
    n+=1

# Insert Enzyme 
## Master Mix
n=1
for i1 in well_data:
    src = enz_mix
    dest = assemble_plate.wells()[n]
    vol = 6.5 #calculate with final_volume

    part_transfer(p20_sin, vol, src, dest, delay_second=1, top_delay=0.5, asp_rate=10, dis_rate=10, mix_after=[2, 5])
    n+=1

## Enzymes

enzymes = [BsaI, T4_ligase, T4_buf]
n=1
for i1 in well_data:
    dest = assemble_plate.wells()[n]
    for i2 in enzymes:
        src = i2
        if i2 == T4_buf:
            vol = 2
            mix=[2,5]
        else:
            vol = 1
            mix=False
        part_transfer(p20_sin, vol, src, dest, delay_second=1, top_delay=0.5, asp_rate=10, dis_rate=10, mix_after=mix)
    n+=1

module_thermocycler.close_lid()
module_thermocycler.set_lid_temperature(105)

profile = [{'temperature': 30, 'hold_time_minutes': 1},
            {'temperature': 80, 'hold_time_minutes': 1},
            {'temperature': 4, 'hold_time_minutes': 5}]
module_thermocycler.execute_profile(steps=profile, repetitions=1, block_max_volume=20)

# protocol end until click Resume button
protocol.pause()

module_thermocycler.deactivate()
module_thermocycler.open_lid()

# Protocol End
protocol.disconnect()
