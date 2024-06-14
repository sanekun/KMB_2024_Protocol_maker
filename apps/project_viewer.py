import streamlit as st
from streamlit_seqviz import streamlit_seqviz
from pathlib import Path
import json
import pandas as pd
from Bio import SeqIO
import subprocess

# def
def check_project():
    return list(Path("data/project").glob('*json'))

def load_project():
    with open(st.session_state.select_project, 'r') as f:
        st.session_state['load_project'] = json.load(f)

# session state
if 'project' not in st.session_state:
    st.session_state.project = check_project()
if 'load_project' not in st.session_state:
    st.session_state.load_project = None

"""
# Project Dash Board
"""
st.selectbox('Load Project', st.session_state.project, 
             format_func=lambda x:x.stem,
             key='select_project',
             on_change=load_project)

if not st.session_state.load_project:
    load_project()
st.json(st.session_state.load_project)

df = pd.DataFrame(data=st.session_state.load_project['Process'].values()).T
df.columns = st.session_state.load_project['Process'].keys()
st.dataframe(df, use_container_width=True, hide_index=True)

st.markdown("## Design")
with st.expander("## Reference", expanded=False):
    if not 'reference' in st.session_state:
        try:
            tmp = subprocess.run(['seqparse', f"data/reference/{st.session_state.load_project['Design']}"], capture_output=True, text=True).stdout
            st.session_state.reference = json.loads(tmp)
        except:
            st.session_state.reference = None

    if st.session_state.reference:
        streamlit_seqviz(name = st.session_state.reference['name'],
                        seq = st.session_state.reference['seq'],
                        annotations = st.session_state.reference['annotations'],
                        style =  { "height": "100vh", "width": "100vw" },
                        highlights=[{}],
                        enzymes = ["BsaI"])

st.markdown("## Build")

with st.expander("## Sequencing", expanded=False):
    if not 'sequencing_result' in st.session_state:
        try:
            tmp = f"data/Result/{st.session_state.load_project['Process']['Sequencing']}.html"
            with open(tmp, 'r') as f:
                st.session_state.sequencing_result = f.read()
        except:
            st.session_state.sequencing_result = None
        
        st.components.v1.html(st.session_state.sequencing_result, scrolling=True, height=500)