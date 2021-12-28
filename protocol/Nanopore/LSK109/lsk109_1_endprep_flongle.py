from opentrons import protocol_api, types
from opentrons import simulate
import math

# this data is from Ligation Sequencing Kit: DNA Repair and End-Prep 
# from Sakib <sakib.hossain@opentrons.com>

metadata = {
    'protocolName': 'Nanopore LSK109 DNA endprep_flongle',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11'
}

protocol = simulate.get_protocol_api("2.11")

# Module setting.
# for the movement of Pippete Input all of modules in Device!

module_magnetic = protocol.load_module('magnetic module gen2', '4')
module_thermocycler = protocol.load_module("Thermocycler Module")

# Deck setting
## Labware setting
enzyme_rack = protocol.load_labware("opentrons_24_tuberack_eppendorf_1.5ml_safelock_snapcap", 6)
falcon_rack = protocol.load_labware("opentrons_15_tuberack_falcon_15ml_conical", 1)
final_plate = protocol.load_labware("nest_96_wellplate_100ul_pcr_full_skirt", 5)
thermo_plate = protocol.load_labware("nest_96_wellplate_100ul_pcr_full_skirt", 12)
mag_plate = module_magnetic.load_labware("nest_96_wellplate_100ul_pcr_full_skirt", 4)

tiprack_20_sin = protocol.load_labware("opentrons_96_tiprack_20ul", 2)
tiprack_300_sin = protocol.load_labware("opentrons_96_tiprack_300ul", 3)

p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_sin])
p300_sin = protocol.load_instrument("p300_single_gen2", "left", tip_racks=[tiprack_300_sin])

## Reagents
ampure_beads = falcon_rack["A1"]
ethanol_70 = falcon_rack["A2"]
repair_enzyme = enzyme_rack["A1"]
repair_buf = enzyme_rack["A2"]
endprep_enzyme = enzyme_rack["A3"]
endprep_buf = enzyme_rack["A4"]

## Sample Wells
start_position = 0 ## start from A1
sample_number = 8

## Start Tiprack positions
p20_sin.starting_tip = tiprack_20_sin.well("A1")
p300_sin.starting_tip = tiprack_300_sin.well("A1")

### calculated DNA by Qubit should be in thermo_plate
dna_well = [thermo_plate.wells()[i] for i in range(start_position, start_position + sample_number)]
final_plate.wells()[0:15]
final_plate.wells()[16:32]
tmp_well = [final_plate.wells()[i] for i in range(start_position, start_position + sample_number)]
final_well = [final_plate.wells()[i] for i in range(start_position, start_position + sample_number)]
mag_well = [mag_plate.wells()[i] for i in range(start_position, start_position + sample_number)]

# PROTOCOL STEPS
## Enzyme reaction
p20_sin.transfer(1, repair_enzyme, dna_well, rate=0.5, new_tip="always")
p20_sin.transfer(1, repair_buf, dna_well, rate=0.5, new_tip="always")
p20_sin.transfer(1, endprep_buf, dna_well, rate=0.5, new_tip="always")
p20_sin.transfer(1, endprep_enzyme, dna_well, rate=0.5, new_tip="always", mix_after=(2, 15))

protocol.pause("Check enzyme & spindown and resume")

## Incubate on Thermocycler (3)
module_thermocycler.close_lid()
module_thermocycler.set_block_temperature(20)
module_thermocycler.set_lid_temperature(70)
profile = [{'temperature': 20, 'hold_time_minutes': 5},
            {'temperature': 65, 'hold_time_minutes': 5},
            {'temperature': 4, 'hold_time_minutes': 2}]
module_thermocycler.execute_profile(steps=profile, repetitions=1, block_max_volume=30)
module_thermocycler.deactivate()
module_thermocycler.open_lid()

## Resuspend AMPure Beads (4)
p300_sin.pick_up_tip()
p300_sin.mix(5, 300, ampure_beads.bottom(z=3), rate=0.5)
p300_sin.touch_tip()
p300_sin.drop_tip()

p300_sin.transfer(45, ampure_beads.top(z=-2), dna_well, touch_tip=True, mix_after=(3, 30), rate=0.5, new_tip="always")

## transfer to tube for Hula Mixer
p300_sin.transfer(60, dna_well, final_well)

# Pause for Hula Mixer/Spin Down (8-9)
ctx.pause('''Incubate on Hula Mixer for 5 minutes and spin down the samples.
                Then place back on the magnet and click resume.''')

# Engage Magnet and Delay for 5 Minutes (10)
magnet(5)
# Remove Supernatant (11)
for well, side in zip(mag_plate_wells, sides):
    pick_up(m300)
    remove_supernatant(100, well, trash, side)
    m300.drop_tip()

# (12-14)
for _ in range(2):
    # Wash Beads with Ethanol (12)
    for well in mag_plate_wells:
        pick_up(m300)
        m300.aspirate(200, ethanolTrack.tracker(200))
        m300.dispense(200, well.top(-3))
        m300.mix(3, 100)
        m300.drop_tip()

    # Remove Supernatant (11)
    for well, side in zip(mag_plate_wells, sides):
        pick_up(m300)
        remove_supernatant(100, well, trash, side)
        m300.drop_tip()

# Pause and Remove Samples for Spin Down (15)
mag_mod.disengage()
ctx.pause('''Spin down and place samples back on the maget.
            Then click resume.''')
magnet(1)

# Remove Residual Ethanol (16)
for well, side in zip(mag_plate_wells, sides):
    pick_up(m300)
    remove_supernatant(100, well, trash, side)
    m300.drop_tip()

# Add 61 uL of Nuclease-free Water (17)
mag_mod.disengage()
for well in mag_plate_wells:
    m300.transfer(61, nfa, well.top(-3), mix_after=(3, 60))
ctx.delay(minutes=2, msg='Incubating at Room Temperature for 2 minutes...')

# Engage Magnet (18)
magnet(5)

# Transfer Eluate into MIDI plate for part 2 (19)
for well, dest, side in zip(mag_plate_wells, final_plate_wells, sides):
    pick_up(m300)
    remove_supernatant(100, well, dest, side)
    m300.drop_tip()

temp_mod.deactivate()
mag_mod.disengage()
