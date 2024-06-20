import streamlit as st
from streamlit import session_state as state
import json
from pathlib import Path

# Sequencing 폴더 선택
# Sequencing Table 보여주기
# Barcode별 REference랑 Result 보여주기
if __name__ == '__main__':
    st.set_page_config(page_title='Project', layout='wide')

st.sidebar.title("2024 KMB")
st.sidebar.subheader("by Seong-Kun Bak *sanekun@kaist.ac.kr*")
st.sidebar.markdown("---")
st.sidebar.markdown("## Author Comments")
st.sidebar.markdown("""
                    This pageg is stand-alone page collect sequencing result.
                    """)

st.markdown("Working on it.")
def check_project():
    return list(Path("data/sequencing").iterdir())

def load_project():
    with open(state.select_project, 'r') as f:
        state['load_project'] = json.load(f)

def get_barcode(path):
    return list(Path(path).iterdir())

@st.cache_data
def get_sequencing(path):
    try:
        with open(path, 'r') as f:
            result = f.read()
    except:
        result = None

    return result

# session
if 'directory' not in state:
    state.directory = check_project()

st.markdown("# Task")
st.selectbox("Sequencing Result", state.directory,
            format_func=lambda x:x.stem,
            disabled=True,
            key='select_directory',
            help="Demo")

st.markdown("## Sample Table")
"""
method: `RBK114`
user: `kun`
| Barcode | Design | Sample |
|---|---|---|
|RB33|	pRSFDuet-1_MQ_Q147L-T7pol|	240528_1|
|RB34|	pRSFDuet-1_MQ_Q147L-T7pol|	240528_2
RB35|	pRSFDuet-1_MQ_Q147L-T7pol|	240528_3
RB36|	pRSFDuet-1_MQ_Q147L-T7pol|	240528_4
RB37|	pRSFDuet-1_MQ_Q147L-T7pol|	240528_5
RB38|	pRSFDuet-1_MQ_Q147L-T7pol|	240528_6
RB39|	pRSFduet1_ABE_sgRNA	|   240528_9
RB40|	pRSFduet1_ABE_sgRNA	 |  240528_10
RB41|	eM_P266L			|		240524_20
RB42|	eM_Q568A			|		240524_3
RB43|	eM_Y571F			|		240524_4
RB44|	eM_T639K			|		240524_13
RB45|	eM_Y639D			|		240524_10
RB46|	eM_Y639N			|		240524_7
RB47|	eM_Q568A			|		240524_21
RB48|	pRSFduet1_WT-DmpR	|		240309_2
RB49|	pCC1BAC_BsaI_T7pad	|		240523_1
"""
st.markdown("## Barocde")
st.selectbox("Select Barcode", get_barcode(state.select_directory),
             format_func=lambda x:x.stem,
             key='select_barcode')

with st.container(border=True):
    sequencing_result = get_sequencing(f"{state.select_barcode}/report.html")
    st.components.v1.html(sequencing_result, scrolling=True, height=500)

