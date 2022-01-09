from opentrons import execute, types, simulate

# this data is from Ligation Sequencing Kit: DNA Repair and End-Prep 
# from Sakib <sakib.hossain@opentrons.com>

metadata = {
    'protocolName': 'Nanopore LSK109(1) DNA endprep_flongle',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'with movable PCR tube pause the protocol when the tube should move'
}
protocol = simulate.get_protocol_api("2.11")
#protocol = execute.get_protocol_api("2.11")

#============= Deck setting

## Module setting
### for the movement of Pippete Input all of modules in Device!
module_magnetic = protocol.load_module('magnetic module gen2', '4')
module_thermocycler = protocol.load_module("thermocycler Module")

## Labware setting
enzyme_rack = protocol.load_labware("opentrons_24_tuberack_eppendorf_1.5ml_safelock_snapcap", 1)
falcon_rack = protocol.load_labware("opentrons_15_tuberack_falcon_15ml_conical", 2)
dna_plate = protocol.load_labware("bineer_96_tuberack_200ul", 5)
mag_plate = protocol.load_labware("biorad_96_tuberack_200ul", 4)
trash = protocol.loaded_labwares[12]["A1"]

tiprack_20_sin = protocol.load_labware("opentrons_96_tiprack_20ul", 3)
tiprack_300_sin = protocol.load_labware("opentrons_96_tiprack_300ul", 6)
p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_sin])
p300_sin = protocol.load_instrument("p300_single_gen2", "left", tip_racks=[tiprack_300_sin])

## Start Tiprack positions
p20_sin.starting_tip = tiprack_20_sin.well("A1")
p300_sin.starting_tip = tiprack_300_sin.well("A1")

## Reagents
repair_buf = enzyme_rack["A1"]
repair_enzyme = enzyme_rack["A2"]
endprep_buf = enzyme_rack["A3"]
endprep_enzyme = enzyme_rack["A4"]
water = enzyme_rack["A5"]

ampure_beads = falcon_rack["A1"]
ethanol_70 = falcon_rack["A2"]

## Sample Wells
start_position = 0 ## start from A1
sample_number = 2

dna_well = [dna_plate.wells()[i] for i in range(start_position, start_position + sample_number)]
final_well = [dna_plate.wells()[i] for i in range(start_position + 16, start_position + 16 + sample_number)]
mag_well = [mag_plate.wells()[i] for i in range(start_position, start_position + sample_number)]

#============= PROTOCOL STEPS
## Functions
def enzyme_transfer(pipette, volume, src, dest, delay_second, asp_rate=None, dis_rate=None):
    if asp_rate != None:
        pipette.flow_rate.aspirate=asp_rate
    if dis_rate != None:
        pipette.flow_rate.dispense=dis_rate
    pipette.pick_up_tip()
    pipette.aspirate(volume, src)
    protocol.delay(seconds=delay_second)
    pipette.touch_tip()
    pipette.dispense(volume, dest)
    protocol.delay(seconds=delay_second/2)
    pipette.blow_out()    
    pipette.touch_tip()
    pipette.drop_tip()

def remove_supernantant(pipette, volume, src, dest):
    pipette.pick_up_tip()
    pipette.flow_rate.aspirate=20
    pipette.aspirate(volume, src.bottom().move(types.Point(x=0, y=0, z=0)))
    pipette.dispense(volume, dest)
    pipette.drop_tip()