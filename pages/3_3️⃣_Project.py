import streamlit as st
from streamlit import session_state as state
from streamlit_seqviz import streamlit_seqviz
from pathlib import Path
import json
import pandas as pd
import subprocess

if __name__ == '__main__':
    st.set_page_config(page_title='Project', layout='wide')

# def
def check_project():
    return list(Path("data/project").glob('*json'))

def load_project():
    with open(state.select_project, 'r') as f:
        state['load_project'] = json.load(f)

@st.cache_data
def get_reference(path):
    try:
        tmp = subprocess.run(['seqparse', path], capture_output=True, text=True).stdout
        reference = json.loads(tmp)
    except:
        reference = None

    return reference

@st.cache_data
def get_build(path):
    try: 
        with open(path, 'r') as f:
            result = json.load(f)
    except:
        result = None
    
    return result

@st.cache_data
def get_sequencing(path):
    try:
        with open(path, 'r') as f:
            result = f.read()
    except:
        result = None

    return result

# session state
if 'project' not in state:
    state.project = check_project()
if 'load_project' not in state:
    state.load_project = None

st.sidebar.title("Protocol Maker")
st.sidebar.subheader("by Seong-Kun Bak *sanekun@kribb.re.kr*")
st.sidebar.markdown("---")

st.markdown("# Project")
st.selectbox('Load Project', state.project, 
             format_func=lambda x:x.stem,
             key='select_project',
             on_change=load_project)

if not state.load_project:
    load_project()

with st.expander("Project", expanded=True):
    with st.container(border=False, height=350):
        st.json(state.load_project, expanded=True)

df = pd.DataFrame(data=state.load_project['Process'].values()).T
df.columns = state.load_project['Process'].keys()
st.dataframe(df, use_container_width=True, hide_index=True)

st.markdown("## Design")
with st.container(border=True, height=550):
    reference = get_reference(f"data/reference/{state.load_project['Design']}")
    
    if True:
        if reference:
            streamlit_seqviz(name = reference['name'],
                             seq = reference['seq'],
                             annotations = reference['annotations'],
                             style =  { "height": "100vh", "width": "100vw" },
                             highlights=[{}],
                             enzymes = ["BsaI"])


st.markdown("## Build")
# Table 으로 표시하기 (Reaction들)
reactions = state.load_project['Build']
for reaction in reactions.keys():
    st.markdown(f"### {reaction}")
    st.dataframe(pd.DataFrame(reactions[reaction]).T.reset_index(names="Name"), hide_index=True, use_container_width=False)


with st.expander("## Protocol", expanded=False):
    build_result = get_build(f"data/Result/build/{state.load_project['Process']['Build']}.json")
    if build_result:
        with st.container(border=False, height=450):
            st.json(build_result)

st.markdown("## Sequencing")
with st.expander("## Sequencing", expanded=False):
    sequencing_result = get_sequencing(f"data/Result/{state.load_project['Process']['Sequencing']}.html")
    st.components.v1.html(sequencing_result, scrolling=True, height=500)
