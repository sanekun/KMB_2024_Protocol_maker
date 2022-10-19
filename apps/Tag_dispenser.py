import streamlit as st
import string
import numpy as np
import pandas as pd

#
#Make Tag primer dispense Protocol.
#
#1) Select Forward, Reverse tag
#2) Start Well-Column

def plate_diagram(plate):
    if plate == '96 well plate':
        st.table(pd.DataFrame(np.zeros([8,12])))
    elif plate == '24 well 1.5ml tube':
        np.zeros([4,6])

def app():
    # DIV
    st.title("Tag dispenser")
    st.caption("Author : Seong-Kun Bak <<tjdrns227@gmail.com>>")
    st.warning('Pipette : P20-Multi (Left)')
    st.markdown('---')
    
    col1, col2 = st.columns([2,1])
    with col1:
        plate_type = st.selectbox('Input Plate', options = ['96 well plate', '24 well 1.5ml tube'])
    with col2:
        st.selectbox('Position', options=[i for i in range(4,7)], help='Deck position of Input plate')
    
    with st.form(' '):
        st.selectbox('First Primers (Rows)', options = [i for i in range(1,9)])
        st.selectbox('Second Primers (Columns)', options = list(string.ascii_uppercase)[0:8])
        st.selectbox('Output Position', options = [i for i in range(4,7)])
        st.form_submit_button('Submit', help='output diagram')

    plate_diagram(plate = plate_type)

#st.dataframe(st.session_state.gen_well, use_container_width=True)

if __name__ == '__main__':
    app()