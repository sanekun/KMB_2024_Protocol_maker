import streamlit as st
import pandas as pd
import re

# Statics
def empty_plate_df():
    # Define rows and columns
    rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    columns = range(1, 13)

    # Create a DataFrame with row names and column names
    plate_df = pd.DataFrame(index=rows, columns=columns)
    return plate_df

def plate_initialization(i, plate_type: str, table_type='empty'):
    initial_tables = {
        'empty': empty_plate_df(),
        'PCR': pd.DataFrame({
            'Well': ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'A10', 'B10', 'C10', 'D10', 'E10', 'F10', 'G10', 'H10', 'A11', 'B11', 'C11', 'D11', 'E11', 'F11', 'G11', 'H11', 'A12', 'B12', 'C12', 'D12', 'E12', 'F12', 'G12', 'H12'],
            'Name': [None for _ in range(96)],
            'DNA1': [None for _ in range(96)],
            'DNA2': [None for _ in range(96)],
            'DNA3': [None for _ in range(96)],
            'Enzyme1': ["KODone" for _ in range(96)],
            'DW': ['DW' for _ in range(96)]
        }),
        'Assembly': pd.DataFrame({
            'Well': ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'A10', 'B10', 'C10', 'D10', 'E10', 'F10', 'G10', 'H10', 'A11', 'B11', 'C11', 'D11', 'E11', 'F11', 'G11', 'H11', 'A12', 'B12', 'C12', 'D12', 'E12', 'F12', 'G12', 'H12'],
            'Name': [None for _ in range(96)],
            'DNA1': [None for _ in range(96)],
            'DNA2': [None for _ in range(96)],
            'Enzyme1': ['NEBuilder HiFi Master Mix'] * 96,
            'DW': ['DW'] * 96
        }),
    }
    if f"{plate_type}_plate_{i}_name" not in st.session_state:
        st.session_state[f"{plate_type}_plate_{i}_name"] = ""
    if f"{plate_type}_plate_{i}_df" not in st.session_state:
        st.session_state[f"{plate_type}_plate_{i}_df"] = initial_tables[table_type]

def plate_transformation(df, data_form):
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

def add_column_button(df, column_type):
    # Check current df's column name (like DNA1, DNA2, DNA3) add final number
    column_names = df.columns
    # grep column_type+[0-9]+ string in column_names
    column_numbers = [int(re.findall(rf'{column_type}(\d+)', column_name)[0]) for column_name in column_names if re.findall(rf'{column_type}(\d+)', column_name)]
    df[f'{column_type}{max(column_numbers)+1}'] = [None for _ in range(len(df))]
    # column order is 'well', 'name', ['DNA\d+', 'Enzyme[+]', 'DW'']
    df = df.reindex(['Well', 'Name'] + 
               sorted([column_name for column_name in df.columns if re.findall(rf'DNA(\d+)', column_name)]) + 
               sorted([column_name for column_name in df.columns if re.findall(rf'Enzyme(\d+)', column_name)]) + 
               ['DW'], axis=1)
    return df

def Example():
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

# Main
with st.expander("Manual", expanded=True):
    manual_tabs = st.tabs(['How to use', 'Developer only'])
    with manual_tabs[0]:
        st.markdown(
            """
            # How to use
            ***This method is optimized for `cloning` with `OT-2`.***  
            (PCR - Assembly - Transformation)
            """)
        st.success(
            """
            - The Maximum number of plates is 5
            - Using OT-2 the reaction plate should be One on thermocycler
            - **If name of sample is empty, the sample will be skipped**
            """
            )
        st.markdown(
            """
            1. Fill the `Sample Plate` in the order of the following table

            2. Describe the Reaction using Sample you write in `Sample Plate`

            3. Fill the `TF plate` in the order of the following table.
            - You can spot the same sample several times

            4. Click `Make Protocol` button.
            - Automatically check the error. 
                - same sample name, no sample name ...
            - The Report will be displayed
                - Transformed Plate on each sample is recorded
                - Parameters used in this protocol
            - Download and Transfer `protocol.py` file to OT-2
            - Run the protocol with appropriate samples
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
            }
            },
            "Parameters": {
                "Number of Plate": "st.session_state['num_of_plate'] + st.session_state['num_of_reaction_plate'] + st.session_state['num_of_TF_plate']",
                "Plate_type": "['DNA', 'Reaction', 'Transformation']",
                "Reaction_type": "['PCR', 'Assembly']",
                "Enzyme": "st.session_state['Enzyme']",
                "DW": "st.session_state['DW']",
                "Tips": "st.session_state['Tips']"
            },
            "Volumn": {
                "DW": ""
                "DNA_PCR": ""
                }
        }
        )
st.button('Use Example')

## DNA Plate
with st.expander("DNA Plate", expanded=True):
    plate_type = 'DNA'
    number_of_plate = st.number_input(f"Number of {plate_type}_plate", min_value=1, step=1, value=2, key=f'num_of_{plate_type}_plate')
    plates = st.tabs([f'{plate_type}_Plate_{i+1}' for i in range(number_of_plate)])

    for i in range(len(plates)):
        plate_initialization(i, plate_type=plate_type, table_type='empty')
        with plates[i]:
            st.text_input("Name", placeholder=f'{plate_type}_plate_{i+1}_name', value=st.session_state[f'{plate_type}_plate_{i}_name'], key=f'{plate_type}_plate_{i}_name')
            st.selectbox("Labware", options=st.session_state['labwares'], key=f'{plate_type}_plate_{i}_labware')

            st.toggle("Long Form", key=f'{plate_type}_plate_{i}_toggle')
            if not st.session_state[f'{plate_type}_plate_{i}_toggle']:
                st.session_state[f'{plate_type}_plate_{i}_df'] = st.data_editor(data=st.session_state[f'{plate_type}_plate_{i}_df'],
                                                                use_container_width=True,
                                                                key=f'{plate_type}_plate_{i}_wide')
            else:
                st.session_state[f'{plate_type}_plate_{i}_df'] = plate_transformation(df = st.data_editor(plate_transformation(st.session_state[f'{plate_type}_plate_{i}_df'], data_form='long'),
                                                                                            use_container_width=True, key=f'{plate_type}_plate_{i}_long'),
                                                                        data_form = 'wide')
            st.file_uploader("Upload", key=f'{plate_type}_plate_{i}_uploader', disabled=True)

plate_type = 'Reaction'
with st.expander("Reaction - PCR", expanded=True):
    reaction_type = 'PCR'
    number_of_plate = st.number_input(f"Number of {plate_type}_plate", min_value=1, step=1, value=1, key=f'num_of_{plate_type}_plate',
                                      disabled=True, help='This Method can only one reaction Plate')
    plates = st.tabs([f'{plate_type}_Plate_{i+1}' for i in range(number_of_plate)])

    for i in range(len(plates)):
        plate_initialization(i, plate_type=plate_type, table_type='empty')
        plate_initialization(i, plate_type=reaction_type, table_type='PCR')
        with plates[i]:
            st.text_input("Name", value=st.session_state[f'{plate_type}_plate_{i}_name'], key=f'{plate_type}_plate_{i}_name')
            st.selectbox("Labware", options=st.session_state['labwares'], key=f'{plate_type}_plate_{i}_labware')
            col1, col2 = st.columns([10, 2])
            with col1:
                st.session_state[f'{reaction_type}_plate_{i}_df'] = st.data_editor(
                    data = st.session_state[f'{reaction_type}_plate_{i}_df'],
                    num_rows='dynamic',
                    use_container_width=True,
                    key=f'{plate_type}_{reaction_type}_plate_{i}_wide'
                )
            with col2:
                with st.container(border=True):
                    column_type = st.selectbox('Add Column', ['DNA', 'Enzyme'], label_visibility='collapsed',
                                 key=f'{plate_type}_{reaction_type}_plate_{i}_selecttype')
                    if st.button('Add Column', key=f'{plate_type}_{reaction_type}_plate_{i}_addcolumn'):
                        st.session_state[f'{reaction_type}_plate_{i}_df'] = add_column_button(df=st.session_state[f'{reaction_type}_plate_{i}_df'],
                                                                                              column_type= column_type)
                        st.rerun()

with st.expander("Reaction - Assembly", expanded=True):
    reaction_type = 'Assembly'
    plates = st.tabs([f'{plate_type}_Plate_{i+1}' for i in range(number_of_plate)])
    
    for i in range(len(plates)):
        plate_initialization(i, plate_type=reaction_type, table_type='Assembly')
        with plates[i]:
            col1, col2 = st.columns([10, 2])
            with col1:
                st.session_state[f'{reaction_type}_plate_{i}_df'] = st.data_editor(
                    data = st.session_state[f'{reaction_type}_plate_{i}_df'],
                    num_rows='dynamic',
                    use_container_width=True,
                    key=f'{plate_type}_{reaction_type}_plate_{i}_wide'
                )
            with col2:
                with st.container(border=True):
                    column_type = st.selectbox('Add Column', ['DNA', 'Enzyme'], label_visibility='collapsed',
                                 key=f'{plate_type}_{reaction_type}_plate_{i}_selecttype')
                    if st.button('Add Column', key=f'{plate_type}_{reaction_type}_plate_{i}_addcolumn'):
                        st.session_state[f'{reaction_type}_plate_{i}_df'] = add_column_button(df=st.session_state[f'{reaction_type}_plate_{i}_df'],
                                                                                              column_type= column_type)
                        st.rerun()


## Transformation
with st.expander("Transformation", expanded=True):
    plate_type = 'TF'
    number_of_plate = st.number_input(f"Number of {plate_type}_plate", min_value=1, step=1, value=1, key=f'num_of_{plate_type}_plate')
    plates = st.tabs([f'{plate_type}_Plate_{i+1}' for i in range(number_of_plate)])

    for i in range(len(plates)):
        plate_initialization(i, plate_type=plate_type, table_type='empty')
        with plates[i]:
            st.text_input("Name", value=st.session_state[f'{plate_type}_plate_{i}_name'], key=f'{plate_type}_plate_{i}_name')
            st.selectbox("Labware", options=st.session_state['labwares'], key=f'{plate_type}_plate_{i}_labware')
            
            st.toggle("Long Form", key=f'{plate_type}_plate_{i}_toggle')
            if not st.session_state[f'{plate_type}_plate_{i}_toggle']:
                st.session_state[f'{plate_type}_plate_{i}_df'] = st.data_editor(data=st.session_state[f'{plate_type}_plate_{i}_df'],
                                                                use_container_width=True,
                                                                key=f'{plate_type}_plate_{i}_wide')
            else:
                st.session_state[f'{plate_type}_plate_{i}_df'] = plate_transformation(df = st.data_editor(plate_transformation(st.session_state[f'{plate_type}_plate_{i}_df'], data_form='long'),
                                                                                            use_container_width=True, key=f'{plate_type}_plate_{i}_long'),
                                                                        data_form = 'wide')

protocol = False
if st.button("Make Protocol"):
    protocol = True
st.download_button(label="Download Protocol", data="test", file_name="test.txt", disabled=not bool(protocol))