from opentrons import types, protocol_api, simulate
import pickle

# Unverified

# Default DNA MW is 112 fmol (CDS), 56 fmol (Backborn)

metadata = {
    'protocolName': 'Golden gate assembly used by SBL (96 well plate based)',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'For combinatorial part library assembly & Simultaneous assembly with different part combination'
}

# Load assembled well data
with open("/mnt/kun/work/git/ot2/protocol/assembly/get_parts/data.pickle", 'rb') as f:
    meta_data = pickle.load(f)


protocol = simulate.get_protocol_api("2.11")

# Deck Setting

well_number = len(meta_data)

## Module
module_thermocycler = protocol.load_module("thermocycler Module")
module_magnetic = protocol.load_module('magnetic module gen2', '4')

## Labwares
pro = protocol.load_labware("biorad_96_wellplate_200ul_pcr", 1)
rbs = protocol.load_labware("biorad_96_wellplate_200ul_pcr", 2)
ter = protocol.load_labware("biorad_96_wellplate_200ul_pcr", 3)
### assemble plate is on thermocycler
assemble_plate = module_thermocycler.load_labware("biorad_96_wellplate_200ul_pcr")

tube_rack = protocol.load_labware('opentrons_24_tuberack_eppendorf_1.5ml_safelock_snapcap', 9)
trash = protocol.loaded_labwares[12]["A1"]

tiprack_20_sin = protocol.load_labware("opentrons_96_tiprack_20ul", 5)
tiprack_300_sin = protocol.load_labware("opentrons_96_tiprack_300ul", 6)
p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_sin])
p300_sin = protocol.load_instrument("p300_single_gen2", "left", tip_racks=[tiprack_300_sin])

## Start Tiprack positions
p20_sin.starting_tip = tiprack_20_sin.well("A1")
p300_sin.starting_tip = tiprack_300_sin.well("A1")

## Reagents
### Every reagent should be in 1.5ml Bioneer screw tube.
BsaI = tube_rack["A1"]
T4_buf = tube_rack["A2"]
T4_ligase = tube_rack["A3"]
DW = tube_rack['D5']


## Protocol

### Functions

def part_transfer(pipette, volume, src, dest, delay_second=0, top_delay=0, asp_rate=None, dis_rate=None, mix_after=False, drop_tip = True):
    if asp_rate != None:
        pipette.flow_rate.aspirate=asp_rate
    if dis_rate != None:
        pipette.flow_rate.dispense=dis_rate            
    pipette.pick_up_tip()
    pipette.aspirate(volume, src)
    protocol.delay(seconds=delay_second)
    if top_delay == True:
        pipette.move_to(src.top(z=-3))
        protocol.delay(seconds=1)
    pipette.dispense(volume, dest)
    protocol.delay(seconds=delay_second/2)
    if type(mix_after) == tuple:
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


### Part Transfer

# Vector를 Part1으로 배치해서 높은 volume 부터 들어갈 수 있도록 하는게 좋아보인다.
for i in range(well_number):
    data = meta_data[i]
    dest = assemble_plate.wells()[i]

    for i2 in range(1, len(data)):
        tmp = data['part' + str(i2)]
        vol = eval(tmp['vol'])
        # plate가 ext 포지션일 때는 name을 기준으로 well을 정해두기.
        if tmp['plate'] != 'ext':
            src = eval(tmp['plate']).wells_by_name()[tmp['well']]
        else:
            src = tube_rack.wells_by_name()['C5']
        part_transfer(p20_sin, vol, src, dest, top_delay=0.5, mix_after=False, drop_tip=True)
    n+=1

# Enzyme transfer

# Thermocycling

module_thermocycler.close_lid()
module_thermocycler.set_lid_temperature(100)
