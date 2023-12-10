import streamlit as st
import pandas as pd
import numpy as np

# Statics
def plate_df():
    # Define rows and columns
    rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    columns = range(1, 13)

    # Create a DataFrame with row names and column names
    plate_df = pd.DataFrame(index=rows, columns=columns)
    return plate_df

def plate_initialization(i):
    if f"plate_{i}_df" not in st.session_state:
        st.session_state[f"plate_{i}_df"] = plate_df()
    if f"plate_{i}_name" not in st.session_state:
        st.session_state[f"plate_{i}_name"] = ""

def plate_transformation(df, type):
    assert type in ["wide", "long"], "Type Error"
    if type == 'long':
        new_df = (df
        .reset_index()
        .melt(id_vars=['index'], value_name='Value')
        .rename(columns={'index':'Row', 'variable':'Column'})
        )
        return new_df
    
    elif type == 'wide':
        new_df = df.pivot(index='Row', columns='Column', values='Value')
        new_df.columns.name = None
        new_df.index.name = None
        return new_df

if 'tf_df' not in st.session_state:
    st.session_state['tf_df'] = plate_df()


st.set_page_config(page_title="Cloning",
                   layout="wide")

# Main
num_of_plate = st.number_input("Number of Plate", min_value=1, step=1, value=2,
                               help="Plate 등록 (Transformation 까지)")
reaction_plate = st.selectbox("Reaction Plate", options=[f"Plate_{i+1}" for i in range(num_of_plate)],
             help="Reaction Plate should be on Thermocycler")
st.button('Use Example')

with st.expander("Input Plate", expanded=True):
    plates = st.tabs([f"Plate_{i+1}" for i in range(num_of_plate)])

for i in range(len(plates)):
    plate_initialization(i)
    with plates[i]:
        st.toggle("Long Form", key=f"plate_{i}_toggle")
        if not st.session_state[f'plate_{i}_toggle']:
            st.session_state[f"plate_{i}_df"] = st.data_editor(data=st.session_state[f"plate_{i}_df"],
                                                            use_container_width=True,
                                                            key=f'plate_{i}_wide')
        else:
            st.session_state[f'plate_{i}_df'] = plate_transformation(df = st.data_editor(plate_transformation(st.session_state[f'plate_{i}_df'], type='long'),
                                                                                        use_container_width=True, key=f'plate_{i}_long'),
                                                                    type = 'wide')
        st.markdown("---")
        
        st.text_input("Name", value=st.session_state[f"plate_{i}_name"], key=f"plate_{i}_name")
        st.selectbox("Type", options=["nest_96_wellplate_200ul_flat"], key=f"plate_{i}_type")
        st.file_uploader("Upload", key=f"plate_{i}_uploader", disabled=True)

with st.expander("PCR", expanded=True):
    st.data_editor(
        pd.DataFrame({
        'Well': ['A1', 'B1', 'C1', 'D1', 'F1'],
        'Name': ['S1', 'S2', 'S3', 'S4', 'S5'],
        'DNA1 (0.5)': ['pACBB_4-5', 'pACBB_4-5', 'pACBB_4-5', 'pACBB_4-5', 'pACBB_4-5'],
        'DNA2 (0.75)': ['pACBB_vec-F1', 'pACBB_vec-F2', 'pACBB_T7-F1', 'pACBB_T7-F2', 'pET28_MCS-F1'],
        'DNA3 (0.75)': ['pACBB_vec-R1', 'pACBB_vec-R2', 'pACBB_T7-R1', 'pACBB_T7-R2', 'pET28_MCS-R1'],
        'Enzyme (12.5)': ['KODone', 'KODone', 'KODone', 'KODone', 'KODone'],
        'DW (25)': ['DW', 'DW', 'DW', 'DW', 'DW']
        }),
        num_rows='dynamic',
        use_container_width=True
    )

with st.expander("Assembly", expanded=True):
    st.data_editor(
        pd.DataFrame({
            'Well': ['A9', 'B9', 'C9', 'D9', 'E9'],
            'Name': ['vec1', 'vec2', 'vec3', 'vec4', 'vec5'],
            'DNA1': ['S1', 'S1', 'S2', 'S1', 'S3'],
            'DNA2': ['S2', 'S3', 'S3', 'S2', None],
            'DNA3': [None, None, None, 'S3', None],
            'Enzyme (10)': ['NEBuilder HiFi Master Mix'] * 5,
            'DW (20)': ['DW'] * 5
        }),
        num_rows='dynamic',
        use_container_width=True
    )

with st.expander("Transformation (Plotting)", expanded=True):
    if not st.toggle('Long Form'):
        st.session_state['tf_df'] = st.data_editor(st.session_state['tf_df'],
                                                   use_container_width=True)
    else:
        st.session_state['tf_df'] = plate_transformation(df = st.data_editor(plate_transformation(st.session_state['tf_df'], type='long'),
                                                                                            use_container_width=True),
                                                                        type = 'wide')