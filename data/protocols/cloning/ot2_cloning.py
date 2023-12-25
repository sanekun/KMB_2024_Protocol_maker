# 23-10-20 Simulated by kun.

# [PARAMETERS]
PARAMETERS = {
    "Plates": {
        "DNA_plate_0_name": {
            "data": {
                "Template1": "A1",
                "Primer1": "B1",
                "Primer2": "C1",
                "Template2": "A2",
                "Primer3": "B2",
                "Primer4": "C2",
            },
            "labware": "nest_96_wellplate_200ul_flat",
            "type": "DNA",
        },
        "DNA_plate_1_name": {
            "data": {},
            "labware": "nest_96_wellplate_200ul_flat",
            "type": "DNA",
        },
        "Reaction_plate_0_name": {
            "data": {"Vector": "A1", "Insert": "A2", "Assembled_vector": "A4"},
            "labware": "nest_96_wellplate_200ul_flat",
            "type": "Reaction",
        },
        "TF_plate_0_name": {
            "data": {"Assembled_vector": "A3"},
            "labware": "nest_96_wellplate_200ul_flat",
            "type": "TF",
        },
    },
    "Reactions": {
        "PCR_plate_0_name": {
            "data": {
                "Name": {"0": "Vector", "1": "Insert"},
                "DNA1": {"0": "Template1", "1": "Template2"},
                "DNA2": {"0": "Primer1", "1": "Primer3"},
                "DNA3": {"0": "Primer2", "1": "Primer4"},
                "Enzyme1": {"0": "PCRMix", "1": "PCRMix"},
                "DW": {"0": "DW", "1": "DW"},
            },
            "type": "PCR",
        },
        "Assembly_plate_0_name": {
            "data": {
                "Name": {"0": "Assembled_vector"},
                "DNA1": {"0": "Vector"},
                "DNA2": {"0": "Insert"},
                "Enzyme1": {"0": "AssemblyMix"},
                "DW": {"0": "DW"},
            },
            "type": "Assembly",
        },
    },
    "Reaction_volume": {
        "PCR": {
            "DNA1": "0.5",
            "DNA2": "0.75",
            "DNA3": "0.75",
            "Enzyme1": "12.5",
            "DW": "25",
        },
        "Assembly": {"DNA1": "1", "DNA2": "1", "Enzyme1": "10", "DW": "20"},
    },
    "Parameters": {
        "Number of Plate": 4,
        "Plate_type": ["DNA", "Reaction", "TF"],
        "Reaction_type": ["PCR", "Assembly"],
        "Enzyme_position": {"AssemblyMix": "A1", "DW": "A2",
                            "PCRMix": "A3", "CPcell": "A4"},
        "number_of_tips": None,
    },
}

metadata = {
    "protocolName": "Cloning (PCR, Assembly, Transformation)",
    "author": "Seong-Kun Bak <sanekun@kaist.ac.kr>",
    "apiLevel": "2.15",
    "robotType": "OT-2",
    "description": "Cloning Protocol in SBL",
}
debug = True

from opentrons import types, protocol_api
from opentrons import simulate

protocol = simulate.get_protocol_api("2.15")
import pandas as pd
import re
import requests
import json


# [Functions]
def discord_message(message):
    url = "https://discord.com/api/webhooks/1169608986891390996/wLti5ulSOXBtGelwiYO4SJi1jQSJ9tEQ8uC8sVXVlWXih3XWwkoLDr6cJBEm2iPY9b0t"

    headers = {"Content-Type": "application/json"}
    data = {"content": message}
    response = requests.post(url, headers=headers, data=json.dumps(data))

    print("Response Code:", response.status_code)
    print("Send Message")

def flow_rate(pipette, **kwargs):
    assert (
        item in ["aspirate", "dispense", "blow_out"] for item in kwargs.keys()
    ), "Error Keywords in Flow Rate."
    for i in kwargs.keys():
        setattr(pipette.flow_rate, i, kwargs[i])

def find_materials_well(material, type: ["DNA", "Enzyme"], PARAMETERS=PARAMETERS):
    # If DNA
    if type == "DNA":
        for i in PARAMETERS["Plates"].keys():
            plate = PARAMETERS["Plates"][i]
            if plate["type"] != "TF":
                for name in plate["data"].keys():
                    if name == material:
                        return plate["Deck"].wells_by_name()[plate["data"][name]]
    # If Enzyme
    if type == "Enzyme":
        return PARAMETERS["Parameters"]["Enzyme_position"][material]
    # If DW
    if type == "DW":
        return PARAMETERS["Parameters"]["Enzyme_position"][material]

def transfer_materials(key, p20, p300):
    reaction = PARAMETERS["Reactions"][key]
    volume_dict = PARAMETERS["Reaction_volume"][reaction["type"]]
    # transform dict to row iterable
    df = pd.DataFrame(reaction["data"])

    # Only First Material transfer to all wells at once (Enzyme1 or DW)
    for enzyme_name in df["Enzyme1"].unique():
        tmp = df[df["Enzyme1"] == enzyme_name]
        # tmp exists
        if not len(tmp):
            src = find_materials_well(enzyme_name, "Enzyme")
            vol = float(volume_dict["Enzyme1"])
            dest = [find_materials_well(name, "DNA") for name in tmp["Name"].values]

            flow_rate(p300, aspirate=50, dispense=50, blow_out=50)
            p300.distribute(
                vol,
                src,
                dest,
                new_tip="once",
                touch_tip=True,
                mix_before=(2, 100),
                trash=not debug,
            )

    print (f"{key} Enzyme done Take off Enzyme from Deck")
    
    df.drop(columns=["Enzyme1"], inplace=True)
    columns = df.columns
    for action in df.values:
        for sample_type, sample_name in zip(columns, action):
            if sample_type == "Name":
                dest = find_materials_well(sample_name, "DNA")
                continue
            if sample_name == "":
                continue
            # Check DNA or Enzyme
            if re.sub(r"[0-9]+", "", sample_type) == "Enzyme":
                flow_rate(p20, aspirate=5, dispense=5, blow_out=5)
                touch_tip = True
            else:  # DNA & DW
                flow_rate(p20, aspirate=5, dispense=5, blow_out=5)
                touch_tip = False

            src = find_materials_well(sample_name, re.sub(r"[0-9]+", "", sample_type))
            vol = float(volume_dict[sample_type])

            p20.transfer(
                vol, src, dest, new_tip="always", touch_tip=touch_tip, trash=not debug
            )

def run(protocol: protocol_api.ProtocolContext):
    # Deck Setting
    ## Modules
    tc_mod = protocol.load_module(module_name="thermocyclerModuleV1")
    tc_mod.open_lid()

    ## Pipette
    p20_tip = protocol.load_labware("opentrons_96_tiprack_20ul", 1)
    p300_tip = protocol.load_labware("opentrons_96_tiprack_300ul", 2)
    p20 = protocol.load_instrument("p20_single_gen2", "left", tip_racks=[p20_tip])
    p300 = protocol.load_instrument("p300_single_gen2", "right", tip_racks=[p300_tip])

    ## Enzymes
    Enzyme_deck = protocol.load_labware("opentrons_24_tuberack_nest_0.5ml_screwcap", 9)
    for key in PARAMETERS["Parameters"]["Enzyme_position"].keys():
        PARAMETERS["Parameters"]["Enzyme_position"][key] = Enzyme_deck.wells_by_name()[
            PARAMETERS["Parameters"]["Enzyme_position"][key]
        ]

    ## Plates
    for n, key in enumerate(PARAMETERS["Plates"].keys()):
        if PARAMETERS["Plates"][key]["type"] == "Reaction":
            PARAMETERS["Plates"][key]["Deck"] = tc_mod.load_labware(
                PARAMETERS["Plates"][key]["labware"]
            )
        PARAMETERS["Plates"][key]["Deck"] = protocol.load_labware(
            PARAMETERS["Plates"][key]["labware"], location=n + 3
        )

    # RUN first Reaction
    transfer_materials(list(PARAMETERS["Reactions"].keys())[0], p20=p20, p300=p300)
    ## Thermocycler
    tc_mod.close_lid()
    tc_mod.set_lid_temperature(100)
    profile = [
        {"temperature": 98, "hold_time_seconds": 10},
        {"temperature": 55, "hold_time_seconds": 5},
        {"temperature": 68, "hold_time_seconds": 30},
    ]
    tc_mod.execute_profile(
        steps=profile,
        repetitions=30,
        block_max_volume=float(PARAMETERS["Reaction_volume"]["PCR"]["DW"]),
    )
    tc_mod.set_block_temperature(
        temperature=8,
        hold_time_minutes=5,
        block_max_volume=float(PARAMETERS["Reaction_volume"]["PCR"]["DW"]),
    )
    tc_mod.deactivate()
    tc_mod.open_lid()

    # Second Reaction
    transfer_materials(list(PARAMETERS["Reactions"].keys())[1], p20=p20, p300=p300)
    ## Thermocycler
    tc_mod.close_lid()
    tc_mod.set_lid_temperature(100)
    tc_mod.set_block_temperature(
        temperature=50,
        hold_time_minutes=40,
        block_max_volume=float(PARAMETERS["Reaction_volume"]["Assembly"]["DW"]),
    )
    
    print ("Assembly will end soon")
    
    tc_mod.set_block_temperature(
        temperature=8,
        hold_time_minutes=5,
        block_max_volume=float(PARAMETERS["Reaction_volume"]["PCR"]["DW"]),
        ramp_rate=0.1
    )
    
    # Transformation
    # Assembly DNA 위에 그냥 CP cell을 얹어야 할 것 같은데 ..?
    # CP cell 분주하는 걸로..
    tc_mod.open_lid()

    flow_rate(p300, aspirate=20, dispense=10, blow_out=100)
    src = PARAMETERS["Parameters"]["Enzyme_position"]["CPcell"]
    dest = [find_materials_well(name, "DNA") for name in PARAMETERS["Reactions"]["Assembly_plate_0_name"]["data"]["Name"].values()]
    vol = 25
    p300.distribute(
        vol,
        src,
        dest,
        new_tip="once",
        touch_tip=True,
        mix_before=(2, 100),
        trash=not debug,
    )
    
    ## Thermocycler
    tc_mod.close_lid()
    profile = [
        {"temperature": 42, "hold_time_seconds": 90},
        {"temperature": 8, "hold_time_seconds": 90},
        {"temperature": 37, "hold_time_minutes": 15},
    ]
    tc_mod.execute_profile(
        steps=profile,
        block_max_volume=float(PARAMETERS["Reaction_volume"]["Assembly"]["DW"]) + vol,
    )
    
    # Spotting
    PARAMETERS["Plates"]["TF_plate_0_name"]["data"]
    
    print ("Protocol End")
    
    
    for enzyme_name in df["Enzyme1"].unique():
        tmp = df[df["Enzyme1"] == enzyme_name]
        # tmp exists
        if not len(tmp):
            src = find_materials_well(enzyme_name, "Enzyme")
            vol = float(volume_dict["Enzyme1"])
            dest = [find_materials_well(name, "DNA") for name in tmp["Name"].values]

            flow_rate(p300, aspirate=50, dispense=50, blow_out=50)
            p300.distribute(
                vol,
                src,
                dest,
                new_tip="once",
                touch_tip=True,
                mix_before=(2, 100),
                trash=not debug,
            )
