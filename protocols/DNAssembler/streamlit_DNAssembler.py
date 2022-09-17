# Streamlit page for DNAssembler
import sys
sys.path.append('/mnt/d/workspace/git/automated-protocol-ot2/protocols/DNAssembler')
from assembly_functions import *
import streamlit as st
from streamlit_ace import st_ace
import pandas as pd
import numpy as np
import re
#parameter = ['date', 'meta_data', 'thermocycler', 'load_plate']

st.set_page_config(
    page_title = "DNAssembler"
)


def load_template(path):
    template = path

    with open(template, 'r') as f:
        template = ''.join(f.readlines())
        f.close()

    comment_tag = re.compile("#!#.+#!#") # for comment in template
    template = re.sub(comment_tag, "", template) # remove comment in template

    return (template)

def export_protocol():
    data = calculate_metadata(input_path=input_wells, db_path="//mnt/d/workspace/git/automated-protocol-ot2/protocols/DNAssembler/Part_DB.xlsx", final_volume=20)
    plate = data['plate']

    if len(plate) > 4:
        sys.exit("Too many plates ! Maximum is 4. \nProtocol End")

    n, load_plate = 1, []
    for i in plate:
        load_plate.append(f"globals()['{i}'] = protocol.load_labware('biorad_96_wellplate_200ul_pcr', {n})")
        n+=1
    
    new_script = template.format(date = date, meta_data = str(data), load_plate='\n    '.join(load_plate), thermocycler=thermocycler)
        # Output protocol
    return (new_script)


# DIV
st.title("DNAssembler")
st.caption("Author : Seong-Kun Bak <<tjdrns227@gmail.com>>")
st.text("")


st.subheader("Necessary input")
with st.container():
    date = st.date_input("Date")
    input_wells = st.file_uploader("Upload Wells", type=".xlsx", key='uploaded')
    if input_wells:
        df = pd.read_excel(input_wells)
        st.subheader("Preview")
        st.dataframe(df.head())
    st.text("")

st.subheader("Parameters")
thermocycler = st.selectbox("RUN Thermocycler", ('False', 'True'), help = "Directly run thermocycler in OT2")
st.text("")

#Load_template
template = load_template(path = "/mnt/d/workspace/git/automated-protocol-ot2/protocols/DNAssembler/assembly_template.py")

if 'make_protocol' not in st.session_state:
    st.session_state.make_protocol = False

if st.session_state.uploaded:
    st.session_state.make_protocol = True
    template = export_protocol()

st.download_button("⬇️ Download Protocol", template, file_name="DNAssembler.py", disabled=(st.session_state.make_protocol is not True))

with st.expander("Change Script (Only for Developer)"):
    edit_code = st_ace(template, language='python', theme='dracula')
    st.download_button("⬇️ Editied Protocol", edit_code, file_name='DNAssembler.py')