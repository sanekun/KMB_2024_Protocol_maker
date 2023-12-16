import sys
import streamlit as st
import pandas as pd
import re
from datetime import datetime

sys.path.append('/home/kun/workspace/webservice/automated-protocol-ot2/data')
from protocols.cloning.check_protocol import check_tips, enzyme_position
# I wanna use ot2_cloning.py's function in this script.
# But I don't want import imported module in ot2_cloning.py


# Statics
def empty_plate_df():
    # Empty 96-well plate DataFrame
    rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    columns = [str(i) for i in range(1, 13)]
    plate_df = pd.DataFrame(index=rows, columns=columns)
    return plate_df

def plate_initialization(i, plate_type: str, table_type='empty'):
    # Make Default Plate Map
    # Make Default session state value
    initial_tables = {
        'empty': empty_plate_df(),
        'PCR': pd.DataFrame({
            'Name': [None for _ in range(1)],
            'DNA1': [None for _ in range(1)],
            'DNA2': [None for _ in range(1)],
            'DNA3': [None for _ in range(1)],
            'Enzyme1': ["PCRMix" for _ in range(1)],
            'DW': ['DW' for _ in range(1)]
        }),
        'Assembly': pd.DataFrame({
            'Name': [None for _ in range(1)],
            'DNA1': [None for _ in range(1)],
            'DNA2': [None for _ in range(1)],
            'Enzyme1': ['AssemblyMix' for _ in range(1)],
            'DW': ['DW' for _ in range(1)]
        }),
    }
    if table_type == 'empty':
        if f"{plate_type}_plate_{i}_name" not in st.session_state:
            st.session_state[f"{plate_type}_plate_{i}_name"] = f"{plate_type}_plate_{i+1}"
        if f'{plate_type}_plate_{i}_toggle' not in st.session_state:
            st.session_state[f'{plate_type}_plate_{i}_toggle'] = False

    if f"{plate_type}_plate_{i}_df" not in st.session_state:
        st.session_state[f"{plate_type}_plate_{i}_df"] = initial_tables[table_type]

def plate_transformation(df, data_form):
    # Change data form to [long or wide]
    assert data_form in ["wide", "long"], "data_form Error"
    if data_form == 'long':
        new_df = (df
        .reset_index()
        .melt(id_vars=['index'], value_name='Value')
        .rename(columns={'index':'Row', 'variable':'Column'})
        )
        new_df['well'] = new_df['Row'] + new_df['Column'].astype(str)
        new_df = new_df.set_index('well')['Value'].to_frame()
        
        return new_df
    
    elif data_form == 'wide':
        new_df = df.reset_index()
        new_df[['Row', 'Column']] = new_df['well'].str.extract(r'([A-Z]+)(\d+)')
        new_df['Column'] = new_df['Column'].astype(int)
        new_df = new_df[['Row', 'Column', 'Value']]
        
        new_df = new_df.pivot(index='Row', columns='Column', values='Value').sort_index(axis=1)
        new_df.columns.name = None
        new_df.index.name = None
        
        return new_df

def editor_update(editor_key, df, df_form):
    # For convert long form to wide form
    
    # Cuz of the st.data_editor's behavior.
    # It store the edited data in the dictionary
    # And if script re-run by another behavior If update the dataframe and send to output.
    # If I make the output will be the original dataframe, It updated every time when i change table and re-read again for make data_editor.
    # If makes some errors to editing tables.
    
    # So if we change toogle value, we need to update directly the dataframe and transform.
    if df_form == 'wide':
        editor = st.session_state[editor_key]['edited_rows']
        for rows, updates in editor.items():
            for cols, value in updates.items():
                df.loc[df.index[rows], cols] = value
        editor = st.session_state[editor_key]['added_rows']
        for i in editor:
            df.loc[len(df)] = i

    if df_form == 'long':
        editor = st.session_state[editor_key]['edited_rows']
        for rows, updates in editor.items():
            row, col = re.match('([A-Z]+)(\d+)', plate_transformation(df, 'long').index[rows]).groups()
            for _, value in updates.items():
                df.loc[row, col] = value

def add_column_button(df, column_type):
    # DNA, Enzyme 등 마지막 열 옆에 새로운 열 추가
    
    # Check current df's column name (like DNA1, DNA2, DNA3) add final number
    column_names = df.columns
    # grep column_type+[0-9]+ string in column_names
    column_numbers = [int(re.findall(rf'{column_type}(\d+)', column_name)[0]) for column_name in column_names if re.findall(rf'{column_type}(\d+)', column_name)]
    df[f'{column_type}{max(column_numbers)+1}'] = [None for _ in range(len(df))]
    # column order is 'well', 'name', ['DNA\d+', 'Enzyme[+]', 'DW'']
    df = df.reindex(['Name'] + 
               sorted([column_name for column_name in df.columns if re.findall(rf'DNA(\d+)', column_name)]) + 
               sorted([column_name for column_name in df.columns if re.findall(rf'Enzyme(\d+)', column_name)]) + 
               ['DW'], axis=1)
    return df

def check_overlap_name(df1, df2):
    # Reaction, TF table에서 등록한 Name만 활용하기 위하여 Overlap 이름 확인
    # Check overlap in each dataframe first If overlap name exist, return False
    # Check overlap between df1 and df2
    # If overlap name exist, return False
    df1_names = df1.dropna().unique()
    df2_names = df2.dropna().unique()
    if len(df1_names) != len(set(df1_names)):
        return False
    if len(df2_names) != len(set(df2_names)):
        return False
    if len(set(df1_names) & set(df2_names)) != 0:
        return False
    return list(df1_names) + list(df2_names)


def Example():
    # Example Data set
    PCR_df = pd.DataFrame({
        'Well': ['A1', 'B1', 'C1', 'D1', 'F1'],
        'Name': ['S1', 'S2', 'S3', 'S4', 'S5'],
        'DNA1': ['pACBB_4-5', 'pACBB_4-5', 'pACBB_4-5', 'pACBB_4-5', 'pACBB_4-5'],
        'DNA2': ['pACBB_vec-F1', 'pACBB_vec-F2', 'pACBB_T7-F1', 'pACBB_T7-F2', 'pET28_MCS-F1'],
        'DNA3': ['pACBB_vec-R1', 'pACBB_vec-R2', 'pACBB_T7-R1', 'pACBB_T7-R2', 'pET28_MCS-R1'],
        'Enzyme': ['KODone', 'KODone', 'KODone', 'KODone', 'KODone'],
        'DW': ['DW', 'DW', 'DW', 'DW', 'DW']
        }),
    Assembly_df = pd.DataFrame({
        'Well': ['A9', 'B9', 'C9', 'D9', 'E9'],
        'Name': ['vec1', 'vec2', 'vec3', 'vec4', 'vec5'],
        'DNA1': ['S1', 'S1', 'S2', 'S1', 'S3'],
        'DNA2': ['S2', 'S3', 'S3', 'S2', None],
        'DNA3': [None, None, None, 'S3', None],
        'Enzyme (10)': ['NEBuilder HiFi Master Mix'] * 5,
        'DW (20)': ['DW'] * 5
        }),

st.set_page_config(page_title="Cloning",
                   layout="wide")
st.session_state['labwares'] = ["nest_96_wellplate_200ul_flat"]
export_JSON = False

# Main
with st.expander("Manual", expanded=True):
    manual_tabs = st.tabs(['How to use', 'Developer only'])
    with manual_tabs[0]:
        st.markdown(
            """
            # How to use
            ***This method is for `Cloning` and optimized in `OT-2`.***  
            (`PCR` - `Assembly` - `Transformation`)
            """)
        st.success(
            """
            - The Maximum number of plates is 5
            - Using OT-2 the reaction plate should be 1 on thermocycler
            """
            )
        st.warning(
            """
            - The `Name` in each table is necessary!
            - If name of sample is **overlaped**, protocol makes error.
            - If name of sample is **empty**, the sample will be skipped
            """
        )
        st.markdown(
            """
            1. Fill the `DNA Plate` in the order of the following table

            2. Describe the Reaction using Sample Name write in `Sample Plate`

            3. Fill the `Reaction plate` in the order of the following table
            
            4. Fill the `TF plate` in the order of the following table
                - You can spot the same sample several times

            5. If you don't use default setting, check advanced tab
                - If you add additional enzyme you fill the volume for it
                - It can adjust volume and condition
                - It's `advanced` options the protocol only optimized deafult condition.
            
            6. Click `Make Protocol` button.
                - Automatically check the error. 
                    - same sample name, empty sample name ...
                - The Report will be displayed
                - Transformed Plate on each sample is recorded
                - Parameters used in this protocol
            7. Download and Transfer `protocol.py` file to OT-2
            
            8. Run the protocol with appropriate samples
            """)            
    
    with manual_tabs[1]:
        st.markdown(
            """
            # Flow
            1. Check Number of plate and plate type can access to Device  
            2. Check whole DNA used in Reaction be in DNA plate.  
            3. Check whole Reacted Sample used in Transformation be in Reaction plate.  
            4. Check and Notice Enzyme and DW using in this Protocol.  
            5. Check Number of Reaction and How many tips need.  
            6. Make Report and Protocol with upper information.    
            ---
            
            # Output Information  
            `Number of Plate` = st.session_state['num_of_plate'] + st.session_state['num_of_reaction_plate'] + st.session_state['num_of_TF_plate']  
            `Plate_type` = ['DNA', 'Reaction', 'Transformation']  
            `Reaction_type` = ['PCR', 'Assembly']  
            `plate_name` = st.session_state[f'{plate_type}_plate_{i}_name']  
            `plate_df` = st.session_state[f'{plate_type}_plate_{i}_df']  
            """
            )
        st.json({
            "Plates": {
                # DNA plate (for loop)
                "st.session_state[f'{plate_type}_plate_{i}_name']": {
                    "data": "st.session_state[f'{plate_type}_plate_{i}_df'].to_dict()",
                    "labware": "st.session_state[f'{plate_type}_plate_{i}_labware']",
                    "type": "DNA"
                },
                # Reaction plate (for loop)
                # Merge {reaction_type}_plate to reaction_plate
                "st.session_state[f'{plate_type}_plate_{i}_name']": {
                    "data": "st.session_state[f'{plate_type}_plate_{i}_df'].to_dict()",
                    "labware": "st.session_state[f'{plate_type}_plate_{i}_labware']",
                    "type": "reaction"
                },
                # Transformation plate (for loop)
                "st.session_state[f'{plate_type}_plate_{i}_name']": {
                    "data": "st.session_state[f'{plate_type}_plate_{i}_df'].to_dict()",
                    "labware": "st.session_state[f'{plate_type}_plate_{i}_labware']",
                    "type": "TF"
            }},
            "Reactions":{
                # PCR reaction
                "st.session_state[f'{reaction_type}_plate_{i}_name']": {
                    "data": "st.session_state[f'{reaction_type}_plate_{i}_df'].to_dict()",
                    "type": "PCR"
                },
                # Assembly reaction
                "st.session_state[f'{reaction_type}_plate_{i}_name']": {
                    "data": "st.session_state[f'{reaction_type}_plate_{i}_df'].to_dict()",
                    "type": "Assembly"
            }},
            "Parameters": {
                "Number of Plate": "st.session_state['num_of_plate'] + st.session_state['num_of_reaction_plate'] + st.session_state['num_of_TF_plate']",
                "Plate_type": "['DNA', 'Reaction', 'Transformation']",
                "Reaction_type": "['PCR', 'Assembly']",
                "Enzyme": "st.session_state['Enzyme']",
                "DW": "st.session_state['DW']",
                "Tips": "st.session_state['Tips']"
            },
            "Volumn": {
                "DW": "",
                "DNA_PCR": ""
            }
        })
        st.json({
            "PCR": {
                "DNA1": 0.5,
                "DNA2": 0.75,
                "DNA3": 0.75,
                "Enzyme1": 12.5,
                "DW": 25
            },
            "Assembly": {
                "DNA1": 1,
                "DNA2": 1,
                "Enzyme1": 10,
                "DW": 20
            }
        })

st.button('Use Example')
st.markdown("---")

## DNA Plate
st.markdown("# Main")
st.markdown("## DNA")
with st.expander("DNA Plate", expanded=True):
    plate_type = 'DNA'
    number_of_plate = st.number_input(f"Number of {plate_type}_plate", min_value=1, step=1, value=2, key=f'num_of_{plate_type}_plate')
    plates = st.tabs([f'{plate_type}_Plate_{i+1}' for i in range(number_of_plate)])

    for i in range(len(plates)):
        plate_initialization(i, plate_type=plate_type, table_type='empty')
        with plates[i]:
            st.text_input("Name", placeholder=f'{plate_type}_plate_{i+1}_name', key=f'{plate_type}_plate_{i}_name')
            st.selectbox("Labware", options=st.session_state['labwares'], key=f'{plate_type}_plate_{i}_labware')

            st.toggle("Long Form", key=f'{plate_type}_plate_{i}_toggle',
                      on_change=editor_update,
                      kwargs={'editor_key': f'{plate_type}_plate_{i}_long' if st.session_state[f'{plate_type}_plate_{i}_toggle'] else f'{plate_type}_plate_{i}_wide',
                              'df': st.session_state[f'{plate_type}_plate_{i}_df'],
                              'df_form': 'long' if st.session_state[f'{plate_type}_plate_{i}_toggle'] else 'wide'})
            if not st.session_state[f'{plate_type}_plate_{i}_toggle']:
                st.data_editor(data=st.session_state[f'{plate_type}_plate_{i}_df'],
                               use_container_width=True,
                               key=f'{plate_type}_plate_{i}_wide')
            else:
                st.data_editor(data=plate_transformation(st.session_state[f'{plate_type}_plate_{i}_df'], data_form='long'),
                               use_container_width=True,
                               key=f'{plate_type}_plate_{i}_long')
            st.file_uploader("Upload", key=f'{plate_type}_plate_{i}_uploader', disabled=True)

st.markdown("## Reaction")
with st.expander("Reaction - PCR", expanded=True):
    i, reaction_type = 0, 'PCR'
    plate_initialization(i, plate_type=reaction_type, table_type='PCR')
    col1, col2 = st.columns([10, 2])
    with col1:
        st.data_editor(
            data = st.session_state[f'{reaction_type}_plate_{i}_df'],
            num_rows='dynamic',
            use_container_width=True,
            key=f'{reaction_type}_plate_{i}_wide',
            hide_index=True
        )
    with col2:
        with st.container(border=True):
            column_type = st.selectbox('Add Column', ['DNA', 'Enzyme'], label_visibility='collapsed',
                            key=f'{reaction_type}_plate_{i}_selecttype')
            if st.button('Add Column', key=f'{reaction_type}_plate_{i}_addcolumn',
                         on_click=editor_update,
                         kwargs={'editor_key': f'{reaction_type}_plate_{i}_wide',
                                 'df': st.session_state[f'{reaction_type}_plate_{i}_df'],
                                 'df_form': 'wide'}):
                st.session_state[f'{reaction_type}_plate_{i}_df'] = add_column_button(df=st.session_state[f'{reaction_type}_plate_{i}_df'],
                                                                                        column_type= column_type)
                st.rerun()

with st.expander("Reaction - Assembly", expanded=True):
    i, reaction_type = 0, 'Assembly'
    plate_initialization(i, plate_type=reaction_type, table_type='Assembly')
    col1, col2 = st.columns([10, 2])
    with col1:
        st.data_editor(
            data = st.session_state[f'{reaction_type}_plate_{i}_df'],
            num_rows='dynamic',
            use_container_width=True,
            key=f'{reaction_type}_plate_{i}_wide',
            hide_index=True
        )
    with col2:
        with st.container(border=True):
            column_type = st.selectbox('Add Column', ['DNA', 'Enzyme'], label_visibility='collapsed',
                            key=f'{reaction_type}_plate_{i}_selecttype')
            if st.button('Add Column', key=f'{reaction_type}_plate_{i}_addcolumn',
                         on_click=editor_update,
                         kwargs={'editor_key': f'{reaction_type}_plate_{i}_wide',
                                 'df': st.session_state[f'{reaction_type}_plate_{i}_df'],
                                 'df_form': 'wide'}):
                st.session_state[f'{reaction_type}_plate_{i}_df'] = add_column_button(df=st.session_state[f'{reaction_type}_plate_{i}_df'],
                                                                                        column_type= column_type)
                st.rerun()

reaction_names = check_overlap_name(st.session_state['PCR_plate_0_df']['Name'], st.session_state['Assembly_plate_0_df']['Name'])
with st.expander("Reaction Plate", expanded=True):
    plate_type = 'Reaction'
    number_of_plate = st.number_input(f"Number of {plate_type}_plate", min_value=1, step=1, value=1, key=f'num_of_{plate_type}_plate',
                                      disabled=True, help='This Method can only one reaction Plate')
    plates = st.tabs([f'{plate_type}_Plate_{i+1}' for i in range(number_of_plate)])

    for i in range(len(plates)):
        plate_initialization(i, plate_type=plate_type, table_type='empty')
        with plates[i]:
            st.text_input("Name", key=f'{plate_type}_plate_{i}_name')
            st.selectbox("Labware", options=st.session_state['labwares'], key=f'{plate_type}_plate_{i}_labware')

            st.toggle("Long Form", key=f'{plate_type}_plate_{i}_toggle',
                      on_change=editor_update,
                      kwargs={'editor_key': f'{plate_type}_plate_{i}_long' if st.session_state[f'{plate_type}_plate_{i}_toggle'] else f'{plate_type}_plate_{i}_wide',
                              'df': st.session_state[f'{plate_type}_plate_{i}_df'],
                              'df_form': 'long' if st.session_state[f'{plate_type}_plate_{i}_toggle'] else 'wide'})
            if not st.session_state[f'{plate_type}_plate_{i}_toggle']:
                st.data_editor(data=st.session_state[f'{plate_type}_plate_{i}_df'],
                               use_container_width=True,
                               key=f'{plate_type}_plate_{i}_wide',
                               column_config={str(i): st.column_config.SelectboxColumn(options=reaction_names) for i in range(1, 13)})
            else:
                st.data_editor(data=plate_transformation(st.session_state[f'{plate_type}_plate_{i}_df'], data_form='long'),
                               use_container_width=True,
                               key=f'{plate_type}_plate_{i}_long',
                               column_config={"Value": st.column_config.SelectboxColumn(options=reaction_names)})

## Transformation
st.markdown("## Transformation")
with st.expander("Transformation", expanded=True):
    plate_type = 'TF'
    number_of_plate = st.number_input(f"Number of {plate_type}_plate", min_value=1, step=1, value=1, key=f'num_of_{plate_type}_plate')
    plates = st.tabs([f'{plate_type}_Plate_{i+1}' for i in range(number_of_plate)])

    for i in range(len(plates)):
        plate_initialization(i, plate_type=plate_type, table_type='empty')
        with plates[i]:
            st.text_input("Name", key=f'{plate_type}_plate_{i}_name')
            st.selectbox("Labware", options=st.session_state['labwares'], key=f'{plate_type}_plate_{i}_labware')
            
            st.toggle("Long Form", key=f'{plate_type}_plate_{i}_toggle',
                      on_change=editor_update,
                      kwargs={'editor_key': f'{plate_type}_plate_{i}_long' if st.session_state[f'{plate_type}_plate_{i}_toggle'] else f'{plate_type}_plate_{i}_wide',
                              'df': st.session_state[f'{plate_type}_plate_{i}_df'],
                              'df_form': 'long' if st.session_state[f'{plate_type}_plate_{i}_toggle'] else 'wide'})
            if not st.session_state[f'{plate_type}_plate_{i}_toggle']:
                st.data_editor(data=st.session_state[f'{plate_type}_plate_{i}_df'],
                               use_container_width=True,
                               key=f'{plate_type}_plate_{i}_wide',
                               column_config={str(i): st.column_config.SelectboxColumn(options=reaction_names) for i in range(1, 13)})
            else:
                st.data_editor(data=plate_transformation(st.session_state[f'{plate_type}_plate_{i}_df'], data_form='long'),
                               use_container_width=True,
                               key=f'{plate_type}_plate_{i}_long',
                               column_config={"Value": st.column_config.SelectboxColumn(options=reaction_names)})

st.markdown("## Advanced")
with st.expander("Advanced", expanded=False):
    st.success("Please adjust here as last step")
    # Reaction-PCR: DNA, Enzyme, DW(up to)
    # Reaction-Assembly: DNA, Enzyme, DW(up to)
    
    # Make Empty DataFrame with existing column name of PCR and Assembly
    PCR_volume = pd.DataFrame(columns=st.session_state['PCR_plate_0_df'].columns).drop(columns=['Name'])
    PCR_volume.loc[0, ['DNA1', 'DNA2', 'DNA3', 'Enzyme1', 'DW']] = ['0.5', '0.75', '0.75', '12.5', '25']

    Assembly_volume = pd.DataFrame(columns=st.session_state['Assembly_plate_0_df'].columns).drop(columns=['Name'])
    Assembly_volume.loc[0, ['DNA1', 'DNA2', 'Enzyme1', 'DW']] = ['1', '1', '10', '20']
    
    st.markdown("### PCR volume")
    update_PCR_volume = st.data_editor(data=PCR_volume,
                   use_container_width=True,
                   key='PCR_volume')
    st.markdown("### Assembly volume")
    update_Assembly_volume = st.data_editor(data=Assembly_volume,
                   use_container_width=True,
                   key='Assembly_volume')

protocol = False
if st.button("Make Protocol"):
    export_JSON = {"Plates": {}, "Reactions": {}, "Reaction_volume": {}, "Parameters": {}}
    
    plate_types = ['DNA', 'Reaction', 'TF']
    for plate_type in plate_types:
        for num in range(st.session_state[f'num_of_{plate_type}_plate']):
            if st.session_state[f'{plate_type}_plate_{num}_toggle']:
                editor_update(editor_key=f'{plate_type}_plate_{num}_long', df=st.session_state[f'{plate_type}_plate_{num}_df'], df_form='long')
            else:
                editor_update(editor_key=f'{plate_type}_plate_{num}_wide', df=st.session_state[f'{plate_type}_plate_{num}_df'], df_form='wide')
            
            # Json append
            # With Long form
            export_JSON["Plates"][f'{plate_type}_plate_{num}_name'] = {
                "data": (plate_transformation(st.session_state[f'{plate_type}_plate_{num}_df'], "long")
                         .dropna()
                         .reset_index()
                         .set_index('Value')).to_dict()['well'],
                "labware": st.session_state[f'{plate_type}_plate_{num}_labware'],
                "type": plate_type
                }

    reaction_types = ['PCR', 'Assembly']
    for reaction_type in reaction_types:
        editor_update(editor_key=f'{reaction_type}_plate_{0}_wide', df=st.session_state[f'{reaction_type}_plate_{0}_df'], df_form='wide')
        
        export_JSON["Reactions"][f'{reaction_type}_plate_{0}_name'] = {
            "data": st.session_state[f'{reaction_type}_plate_{0}_df'].to_dict(),
            "type": reaction_type
            }
        
        # Reaction Volume
        editor_update(editor_key=f'{reaction_type}_volume', df=eval(f'{reaction_type}_volume'), df_form='wide')
        export_JSON["Reaction_volume"][f"{reaction_type}"] = eval(f'{reaction_type}_volume').dropna(how='all').to_dict()
    
    # Protocol 별 검사 (Tip 수, Plate 수, Volume 최대 등)
    # Plate에서 ['well']을 위해 최소 1개 이상의 값이 있어야함.
    
    # All Enzymes in PCR and Assembly
    PCR_enzyme = [column_name for column_name in st.session_state['PCR_plate_0_df'].columns if re.findall(r'Enzyme(\d+)', column_name)]
    Assembly_enzyme = [column_name for column_name in st.session_state['Assembly_plate_0_df'].columns if re.findall(r'Enzyme(\d+)', column_name)]

    export_JSON["Parameters"] = {
        "Number of Plate": sum([st.session_state[f'num_of_{i}_plate'] for i in plate_types]),
        "Plate_type": plate_types,
        "Reaction_type": reaction_types,
        "Enzyme_position": enzyme_position(enzyme_list = list(set(PCR_enzyme + Assembly_enzyme))),
        "number_of_tips": check_tips(),
        }
    
    protocol = True
    with open('data/protocols/cloning/ot2_cloning.py', 'r') as f:
        protocol = f.read()
        protocol = protocol.replace("#[Remove]", "")
        new_protocol = protocol.replace('export_JSON', str(export_JSON))
    
st.download_button(label="Download Protocol", data=new_protocol if protocol else "",
                   file_name=f"{datetime.now().strftime('%Y%m%d')[2:]}-ot2_cloning.py", disabled=not bool(protocol))
if export_JSON:
    with st.expander("Report", expanded=True):
        st.json(export_JSON)