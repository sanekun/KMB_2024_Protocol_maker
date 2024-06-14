import streamlit as st
from streamlit import session_state as state
import pandas as pd
import re
import json
from pathlib import Path

if __name__ == '__main__':
    st.set_page_config(page_title='Cloning', layout='wide')

# def
def check_project():
    return list(Path("data/project").glob('*.json'))

def load_project(value: Path):
    with open(value, 'r') as f:
        project_json = json.load(f)
    
    # Duplicate check
    if str(value.stem) in state.loaded_project['Project'].values:
        return
    
    state.loaded_project = \
        pd.concat([state.loaded_project, pd.DataFrame({'Project':[str(value.stem)], 'Task': ', '.join(project_json['Build'].keys())})], axis=0)

def add_workflow(value):
    tmp = [i.startswith(value) for i in state.new_workflow]
    if not len(tmp):
        num = 1
    else:
        num = len(tmp) + 1
    
    state.new_workflow.append(f'{value}_{num}')

def reset_workflow():
    state.new_workflow = state.select_workflow

def plate_initialization(plate_type: str, i=0, table_type="empty"):
    # Make Default Plate Map
    # Make Default session state value
    initial_tables = {
        "empty": empty_plate_df(),
        "PCR": pd.DataFrame(
            {
                "Name": [None for _ in range(1)],
                "DNA1": [None for _ in range(1)],
                "DNA2": [None for _ in range(1)],
                "DNA3": [None for _ in range(1)],
                "Enzyme1": ["PCRMix" for _ in range(1)],
                "DW": ["DW" for _ in range(1)],
            }
        ),
        "Gibson": pd.DataFrame(
            {
                "Name": [None for _ in range(1)],
                "DNA1": [None for _ in range(1)],
                "DNA2": [None for _ in range(1)],
                "Enzyme1": ["GibsonMix" for _ in range(1)],
                "DW": ["DW" for _ in range(1)],
            }
        ),
    }
    if table_type == "empty":
        if f"{plate_type}_plate_{i}_name" not in st.session_state:
            st.session_state[
                f"{plate_type}_plate_{i}_name"
            ] = f"{plate_type}_plate_{i}"
        if f"{plate_type}_plate_{i}_toggle" not in st.session_state:
            st.session_state[f"{plate_type}_plate_{i}_toggle"] = False

    if f"{plate_type}_plate_{i}_df" not in st.session_state:
        st.session_state[f"{plate_type}_plate_{i}_df"] = initial_tables[table_type]

# Session State
if 'project' not in state:
    state.project = check_project()
if 'new_workflow' not in state:
    state.new_workflow = []
if 'loaded_project' not in state:
    state.loaded_project = pd.DataFrame({'Project':[], 'Task':[]}, index=None)

def empty_plate_df(plate_type='96well'):
    if plate_type == '96well':
        rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
        columns = [str(i) for i in range(1, 13)]
        plate_df = pd.DataFrame(index=rows, columns=columns)
        return plate_df

# Statics
workflows = ['PCR', 'Gibson', 'GGA', 'Transformation']
initial_tables = {
    "empty": empty_plate_df(),
    "PCR": pd.DataFrame(
        {
            "Name": [None for _ in range(1)],
            "DNA1": [None for _ in range(1)],
            "DNA2": [None for _ in range(1)],
            "DNA3": [None for _ in range(1)],
            "Enzyme1": ["PCRMix" for _ in range(1)],
            "DW": ["DW" for _ in range(1)],
        }
    ),
    "Gibson": pd.DataFrame(
        {
            "Name": [None for _ in range(1)],
            "DNA1": [None for _ in range(1)],
            "DNA2": [None for _ in range(1)],
            "Enzyme1": ["GibsonMix" for _ in range(1)],
            "DW": ["DW" for _ in range(1)],
        }
    ),
}

# Main
col1 = st.columns([1, 2])
with col1[0]:
    st.markdown("## Load Project")
    st.selectbox("Saved Project", state.project,
                 format_func=lambda x: x.stem,
                 key='select_project')
    st.button("Load", key='load_project',
              on_click=load_project,
              kwargs={'value': state.select_project})

with col1[1]:
    st.markdown("## New Task")
    st.multiselect("New workflows", state['new_workflow'],
                   key='select_workflow',
                   default=state.new_workflow,
                   on_change=reset_workflow,
                   help='New Task is dominant than load project')
    workflow_col = st.columns([1,1,1,1,1])
    workflow_col[0].button("PCR", on_click=add_workflow,
                           kwargs={'value': 'PCR'},
                           use_container_width=True)
    workflow_col[1].button("GGA", use_container_width=True,
                           on_click=add_workflow,
                           kwargs={'value': 'GGA'})
    workflow_col[2].button("Gibson", use_container_width=True,
                           on_click=add_workflow,
                           kwargs={'value': 'Gibson'})
    workflow_col[3].button("TF", use_container_width=True,
                           on_click=add_workflow,
                           kwargs={'value': 'Transformation'})
    workflow_col[4].button("Make", use_container_width=True,
                           type="primary")

st.dataframe(state.loaded_project, use_container_width=True, hide_index=True)
st.markdown('---')

mid_col = st.columns([1, 1])
with mid_col[0]:
    st.markdown('## Mapping')
    # Source Plate Module
    with st.expander("Source Plate", expanded=True):
        plate_type = "Source"
        st.number_input(f"Number of {plate_type} plate",
                        min_value=1, step=1, max_value=3,
                        key=f"num_{plate_type}_plate")
        
        plates = st.tabs([f"{plate_type}_Plate_{i+1}" for i in range(state[f"num_{plate_type}_plate"])])
        
        for n in range(len(plates)):
            with plates[n]:
                st.text_input(
                    "Name",
                    placeholder=f"{plate_type}_plate_{n+1}_name",
                    key=f"{plate_type}_plate_{n+1}_name",
                )
                # Toggle을 도입하기 위해선 Emptydf를 미리 선언 -> Session state에 넣어둔 후 Long, Wide를 인식해서 바꺼ㅜ야함
                st.data_editor(empty_plate_df(), key=f"{plate_type}_plate_{n+1}_df")
    
    with st.expander("Destination Plate", expanded=True):
        plate_type = "Destination"
        st.number_input(f"Number of {plate_type} plate",
                        min_value=1, step=1, max_value=1,
                        key=f"num_{plate_type}_plate")
        plates = st.tabs([f"{plate_type}_Plate_{i+1}" for i in range(state[f"num_{plate_type}_plate"])])
        
        for n in range(len(plates)):
            with plates[n]:
                # Toggle을 도입하기 위해선 Emptydf를 미리 선언 -> Session state에 넣어둔 후 Long, Wide를 인식해서 바꺼ㅜ야함
                st.data_editor(empty_plate_df(), key=f"{plate_type}_plate_{n+1}_df",
                               use_container_width=True)



def workflow_table(workflow):
    with st.expander(f'{workflow}', expanded=True):
        col1, col2 = st.columns([10, 2])
        
        with col1:
            st.data_editor(initial_tables[f'workflow'], key=f'{workflow}_table',
                        use_container_width=True,
                        hide_index=True)
        with col2:
            with st.container(border=True):
                column_type = st.selectbox(
                        "Add Column",
                        ["DNA", "Enzyme"],
                        label_visibility="collapsed",
                        key=f"{workflow}_plate_selecttype",
                    )
                if st.button("Add column", key=f"{workflow}_plate_addcolumn"):
                    pass

with mid_col[1]:
    st.markdown('## Workflow')
    
    workflow = 'PCR'
    with st.expander(f'{workflow}', expanded=True):
        col1, col2 = st.columns([10, 2])
        
        with col1:
            st.data_editor(initial_tables['PCR'], key=f'{workflow}_table',
                        use_container_width=True,
                        hide_index=True)
        with col2:
            with st.container(border=True):
                column_type = st.selectbox(
                        "Add Column",
                        ["DNA", "Enzyme"],
                        label_visibility="collapsed",
                        key=f"{workflow}_plate_selecttype",
                    )
                if st.button("Add column", key=f"{workflow}_plate_addcolumn"):
                    if column_type == "DNA":
                        pass

    st.input_text("A")
    workflow='Gibson'
    with st.expander(f'{workflow}2', expaner=True):
        col1, col2 = st.columns([10, 2])
        with col1:
            st.data_editor(initial_tables[f'{workflow}'], key='tt')