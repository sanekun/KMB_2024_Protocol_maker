import streamlit as st
from streamlit import session_state as state
import json
from pathlib import Path

# Sequencing 폴더 선택
# Sequencing Table 보여주기
# Barcode별 REference랑 Result 보여주기
if __name__ == '__main__':
    st.set_page_config(page_title='Project', layout='wide')

st.sidebar.title("Protocol Maker")
st.sidebar.subheader("by Seong-Kun Bak *sanekun@kribb.re.kr*")
st.sidebar.markdown("---")

st.markdown("Working on it.")
if False:
    def check_project():
        return list(Path("data/sequencing").iterdir())

    def load_project():
        with open(state.select_project, 'r') as f:
            state['load_project'] = json.load(f)

    # session
    if 'project' not in state:
        state.directory = check_project()

    if __name__ == "__main__":
        st.set_page_config(layout="wide")

    st.selectbox("Sequencing Result", state.directory,
                format_func=lambda x:x.stem)