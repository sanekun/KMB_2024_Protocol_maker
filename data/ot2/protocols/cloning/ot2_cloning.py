# 23-10-20 Simulated by kun.

# [PARAMETERS]
PARAMETERS = EXPORT_JSON
metadata = {
    "protocolName": "Cloning (PCR, Assembly, Transformation)",
    "author": "Seong-Kun Bak <sanekun@kaist.ac.kr>",
    "apiLevel": "2.13",
    "robotType": "OT-2",
    "description": "Cloning Protocol in SBL",
}
debug = False

from opentrons import protocol_api
from opentrons import simulate
protocol = simulate.get_protocol_api("2.13")

import pandas as pd
import re
import time


# [Functions]
# def discord_message(message):
#     url = "https://discord.com/api/webhooks/1169608986891390996/wLti5ulSOXBtGelwiYO4SJi1jQSJ9tEQ8uC8sVXVlWXih3XWwkoLDr6cJBEm2iPY9b0t"

#     headers = {"Content-Type": "application/json"}
#     data = {"content": message}
#     response = requests.post(url, headers=headers, data=json.dumps(data))

#     print("Response Code:", response.status_code)
#     print("Send Message")


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
                for well in plate["data"].keys():
                    if plate["data"][well] == material:
                        return plate["Deck"].wells_by_name()[well]
    # If Enzyme
    if type == "Enzyme":
        return PARAMETERS["Parameters"]["Enzyme_position"][material]
    # If DW
    if type == "DW":
        return PARAMETERS["Parameters"]["Enzyme_position"][material]


def transfer_materials(key, p20, p300, mix_last=False):
    reaction = PARAMETERS["Reactions"][key]
    volume_dict = PARAMETERS["Reaction_volume"][reaction["type"]]
    # transform dict to row iterable
    df = pd.DataFrame(reaction["data"])

    # Only First Material transfer to all wells at once (Enzyme1 or DW)
    for dw in df["DW"].unique():
        tmp = df[df["DW"] == dw]
        # tmp exists
        if len(tmp):
            src = find_materials_well(dw, "DW")
            vol = float(volume_dict["DW"])
            dest = [find_materials_well(name, "DNA") for name in tmp["Name"].values]

            flow_rate(p300, aspirate=50, dispense=50, blow_out=20)
            p300.distribute(
                vol, src, dest,
                new_tip="once", touch_tip=False,
                disposal_volume=5,
                blow_out=False,
                trash=not debug
            )

    for enzyme_name in df["Enzyme1"].unique():
        tmp = df[df["Enzyme1"] == enzyme_name]
        # tmp exists
        if len(tmp):
            src = find_materials_well(enzyme_name, "Enzyme")
            vol = float(volume_dict["Enzyme1"])
            # z 3cm
            dest = [find_materials_well(name, "DNA").bottom(z=3) for name in tmp["Name"].values]

            flow_rate(p300, aspirate=20, dispense=20, blow_out=20)
            p300.distribute(
                vol, src, dest,
                new_tip="once", touch_tip=True,
                mix_before=(2, 50), disposal_volume=5,
                blow_out=True, blowout_location="source well",
                trash=not debug
            )

    print(f"{key} Enzyme done Take off Enzyme from Deck")

    df.drop(columns=["Enzyme1", "DW"], inplace=True)
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
                flow_rate(p20, aspirate=1, dispense=1, blow_out=1)
                touch_tip = True
            else:  # DNA & DW
                flow_rate(p20, aspirate=1, dispense=1, blow_out=1)
                touch_tip = False

            src = find_materials_well(sample_name, re.sub(r"[0-9]+", "", sample_type))
            vol = float(volume_dict[sample_type])

            p20.transfer(
                vol, src, dest, new_tip="always", 
                touch_tip=touch_tip, 
                blow_out=True, blowout_location="destination well",
                trash=not debug
            )
        # Final Mix
        if mix_last:
            p20.pick_up_tip()
            p20.mix(3, 10, dest)
            p20.drop_tip()


def run(protocol: protocol_api.ProtocolContext):
    print(f"Protocol Run: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    # Deck Setting
    ## Modules
    tc_mod = protocol.load_module(module_name="thermocyclerModuleV1")
    tc_mod.open_lid()
    Enzyme_deck = protocol.load_labware("opentrons_24_tuberack_nest_1.5ml_screwcap", 1)

    ## Pipette
    p20_tip = protocol.load_labware("opentrons_96_tiprack_20ul", 2)
    p300_tip = protocol.load_labware("opentrons_96_tiprack_300ul", 3)
    p20 = protocol.load_instrument("p20_single_gen2", "left", tip_racks=[p20_tip])
    p300 = protocol.load_instrument("p300_single_gen2", "right", tip_racks=[p300_tip])

    ## Enzymes
    for key in PARAMETERS["Parameters"]["Enzyme_position"].keys():
        PARAMETERS["Parameters"]["Enzyme_position"][key] = Enzyme_deck.wells_by_name()[
            PARAMETERS["Parameters"]["Enzyme_position"][key]
        ]

    ## Plates
    for key in PARAMETERS["Plates"].keys():
        location = PARAMETERS["Parameters"]["Deck_position"][key]
        if str(location) == "7":
            PARAMETERS["Plates"][key]["Deck"] = tc_mod.load_labware(
                PARAMETERS["Plates"][key]["labware"])
            continue

        PARAMETERS["Plates"][key]["Deck"] = protocol.load_labware(
            PARAMETERS["Plates"][key]["labware"], location=location)

    # RUN first Reaction
    reaction = list(PARAMETERS["Reactions"].keys())[0]
    final_volume = sum([float(i) for i in PARAMETERS["Reaction_volume"]["PCR"].values()])
    if [i for i in PARAMETERS["Reactions"][reaction]["data"]["Name"].values() if i != None]:
        print (f"RUN {reaction}")
        transfer_materials(key=reaction, p20=p20, p300=p300, mix_last=True)
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
            block_max_volume=final_volume
        )
        tc_mod.set_block_temperature(
            temperature=8,
            hold_time_minutes=5,
            block_max_volume=final_volume
        )
        tc_mod.deactivate()
        tc_mod.open_lid()

    # Second Reaction
    protocol.pause(f"Place down {list(PARAMETERS['Reactions'].keys())[1]} enzyme")
    reaction = list(PARAMETERS["Reactions"].keys())[1]
    final_volume = sum([float(i) for i in PARAMETERS["Reaction_volume"]["PCR"].values()])
    if [i for i in PARAMETERS["Reactions"][reaction]["data"]["Name"].values() if i != None]:
        print (f"RUN {reaction}")
        transfer_materials(list(PARAMETERS["Reactions"].keys())[1], p20=p20, p300=p300, mix_last=True)
        ## Thermocycler
        tc_mod.close_lid()
        tc_mod.set_lid_temperature(100)
        tc_mod.set_block_temperature(
            temperature=50,
            hold_time_minutes=30,
            block_max_volume=final_volume,
        )

        print("Assembly will end soon")

        tc_mod.set_block_temperature(
            temperature=8,
            hold_time_minutes=5,
            block_max_volume=final_volume,
            ramp_rate=0.1,
        )
        tc_mod.deactivate()
        tc_mod.open_lid()

    # Transformation
    # Assembly DNA 위에 그냥 CP cell을 얹어야 할 것 같은데 ..?
    # CP cell 분주하는 걸로..
    protocol.pause("Place down TF-associated materials")
    if PARAMETERS["Plates"]["TF_plate_0_name"]["data"]:
        print (f"RUN TF")
        flow_rate(p300, aspirate=20, dispense=10, blow_out=100)
        src = find_materials_well("CPcell", "DW").bottom(z=3)
        dest = [
            find_materials_well(name, "DNA")
            for name in PARAMETERS["Reactions"]["Assembly_plate_0_name"]["data"][
                "Name"
            ].values()
        ]
        CP_cell_volume = 25
        p300.pick_up_tip()
        p300.mix(3, 25, src)
        p300.drop_tip()
        p300.transfer(CP_cell_volume, src, dest,
                        new_tip="always", touch_tip=True, disposal_volume=5,
                        mix_after=(3, 20),
                        blow_out=False, trash=not debug)

        ## Thermocycler
        tc_mod.close_lid()
        profile = [
            {"temperature": 42, "hold_time_seconds": 70},
            {"temperature": 8, "hold_time_seconds": 100},
        ]
        tc_mod.execute_profile(
            steps=profile,
            repetitions=1,
            block_max_volume=final_volume + CP_cell_volume
        )
        tc_mod.open_lid()
        tc_mod.deactivate_block()
        
        src = find_materials_well("LB", "DW").bottom(z=3)
        p300.transfer(50, src, dest,
                      new_tip="always", touch_tip=True, disposal_volume=5,
                      trash=not debug)

        tc_mod.set_block_temperature(37, hold_time_minutes=15, block_max_volume=final_volume + CP_cell_volume + 50)

        # Spotting
        spotting_volume = 4
        flow_rate(p20, aspirate=5, dispense=5, blow_out=5)
        for i in PARAMETERS["Plates"].keys():
            plate = PARAMETERS["Plates"][i]
            if plate["type"] != "TF":
                continue
            else:
                unique_sample = list(set(plate["data"].values()))
                for sample in unique_sample:
                    src = find_materials_well(sample, "DNA")
                    # value == sample
                    dest = [plate['Deck'][well].bottom(z=4) for well, value in plate["data"].items() if value == sample]
                    p20.distribute(spotting_volume, src, dest, new_tip="once", touch_tip=False, trash=not debug)
        tc_mod.deactivate()

    print(f"Protocol End: {time.strftime('%Y-%m-%d %H:%M:%S')}")