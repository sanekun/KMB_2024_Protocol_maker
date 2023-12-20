from opentrons import types, protocol_api
import pandas as pd

# 23-10-20 Simulated by kun.
# Parameters

#[PARAMETERS]
PARAMETERS = {
  "Plates": {
    "DNA_plate_0_name": {
      "data": {
        "Template1": "A1",
        "Primer1": "B1",
        "Primer2": "C1",
        "Template2": "A2",
        "Primer3": "B2",
        "Primer4": "C2"
      },
      "labware": "nest_96_wellplate_200ul_flat",
      "type": "DNA"
    },
    "DNA_plate_1_name": {
      "data": {},
      "labware": "nest_96_wellplate_200ul_flat",
      "type": "DNA"
    },
    "Reaction_plate_0_name": {
      "data": {
        "Assembled_vector": "A1"
      },
      "labware": "nest_96_wellplate_200ul_flat",
      "type": "Reaction"
    },
    "TF_plate_0_name": {
      "data": {
        "Assembled_vector": "A3"
      },
      "labware": "nest_96_wellplate_200ul_flat",
      "type": "TF"
    }
  },
  "Reactions": {
    "PCR_plate_0_name": {
      "data": {
        "Name": {
          "0": "Vector",
          "1": "Insert"
        },
        "DNA1": {
          "0": "Template1",
          "1": "Template2"
        },
        "DNA2": {
          "0": "Primer1",
          "1": "Primer3"
        },
        "DNA3": {
          "0": "Primer2",
          "1": "Primer4"
        },
        "Enzyme1": {
          "0": "PCRMix",
          "1": ""
        },
        "DW": {
          "0": "DW",
          "1": ""
        }
      },
      "type": "PCR"
    },
    "Assembly_plate_0_name": {
      "data": {
        "Name": {
          "0": "Assembled_vector"
        },
        "DNA1": {
          "0": "Vector"
        },
        "DNA2": {
          "0": "Insert"
        },
        "Enzyme1": {
          "0": "AssemblyMix"
        },
        "DW": {
          "0": "DW"
        }
      },
      "type": "Assembly"
    }
  },
  "Reaction_volume": {
    "PCR": {
      "DNA1": {
        "0": "0.5"
      },
      "DNA2": {
        "0": "0.75"
      },
      "DNA3": {
        "0": "0.75"
      },
      "Enzyme1": {
        "0": "12.5"
      },
      "DW": {
        "0": "25"
      }
    },
    "Assembly": {
      "DNA1": {
        "0": "1"
      },
      "DNA2": {
        "0": "1"
      },
      "Enzyme1": {
        "0": "10"
      },
      "DW": {
        "0": "20"
      }
    }
  },
  "Parameters": {
    "Number of Plate": 4,
    "Plate_type": [
      "DNA",
      "Reaction",
      "TF"
    ],
    "Reaction_type": [
      "PCR",
      "Assembly"
    ],
    "Enzyme_position": {
      "AssemblyMix": "A1",
      "PCRMix": "A2"
    },
    "number_of_tips": None
  }
}

metadata = {
    'protocolName': 'Cloning (PCR, Assembly, Transformation)',
    'author': 'Seong-Kun Bak <sanekun@kaist.ac.kr>',
    'apiLevel': '2.15',
    'robotType': "OT-2",
    'description': ''
}

from opentrons import simulate
protocol=simulate.get_protocol_api('2.15')

#[Functions]
def flow_rate(pipette, **kwargs):
    assert (item in ['aspirate', 'dispense', 'blow_out'] for item in kwargs.keys()), "Error Keywords in Flow Rate."
    for i in kwargs.keys:
        pipette.flow_rate[i] = kwargs[i]

def run(protocol: protocol_api.ProtocolContext):
    # Deck Setting
    ## Modules 
    tc_mod = protocol.load_module(module_name="thermocyclerModuleV1")
    
    ## Pipette
    p20_tip = protocol.load_labware("opentrons_96_tiprack_20ul", 1)
    p300_tip = protocol.load_labware("opentrons_96_tiprack_300ul", 2)
    p20 = protocol.load_instrument("p20_single_gen2", "left", tip_racks=[p20_tip])
    p300 = protocol.load_instrument("p300_single_gen2", "right", tip_racks=[p300_tip])
    
    ## Plates
    for i in range(len(PARAMETERS["Plates"])):
        plate = PARAMETERS["Plates"][i]
        plate["Deck"] = protocol.load_labware(plate["labware"], location=i+3)
    
    
    source_plate = protocol.load_labware("nest_96_wellplate_200ul_flat", location=3)
    tc_plate = tc_mod.load_labware("nest_96_wellplate_200ul_flat")
    mag_plate = mag_mod.load_labware("nest_96_wellplate_200ul_flat")
    
    ## Materials
    vector_template = source_plate.wells_by_name()['A1']
    vector_primer = source_plate.wells_by_name()['A2']
    insert_template = source_plate.wells_by_name()['A3']
    insert_primer = source_plate.wells_by_name()['A4']
    
    # RUN
    ## Vector
    src = [vector_template, vector_primer]
    dest = tc_plate.wells_by_name()['A1'] # Input PCR master Mix
    p20.transfer(volume=[0,0],
                 source=src,
                 dest=dest)
    
    ## Insert
    src = [insert_template, insert_primer]
    p20.transfer(volume=[0,0],
                 source=src,
                 dest=dest)
    
        
    for dest in target_plates[:2]:
        p300.transfer(198, source=GESS_WT_reservoir.rows()[0][0], dest=dest.rows_by_name()['A'],
                      disposal_volume=50,
                      new_tip='once')

    for dest in target_plates[2:4]:
        p300.transfer(198, source=GESS_E135K_reservoir.rows()[0][0], dest=dest.rows_by_name()['A'],
                      disposal_volume=50,
                      new_tip='once')

    ##
    for i in range(10):
        src = substrate_plate.rows()[0][2+i]
        dest = [plate.rows_by_name()['A'][1+i] for plate in target_plates[:2]]
        
        p20.pick_up_tip()
        p20.transfer(5, DMSO_reservoir.rows()[0][0], src, new_tip='never')
        p20.mix(3, volume=5, location=src)
        p20.touch_tip(src)
        
        p20.distribute(4, src, dest, new_tip='never', disposal_volume=1)
        p20.drop_tip()
        
        dest = [plate.rows_by_name()['A'][1+i] for plate in target_plates[2:4]]
        
        p20.pick_up_tip()
        p20.distribute(4, src, dest, new_tip='never', disposal_volume=1)
        p20.drop_tip()