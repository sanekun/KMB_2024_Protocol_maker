import streamlit as st
import string

# by column
# start col, end col, interval
# Duplication Number

def app():
    # DIV
    st.title("Pooling")
    st.caption("Author : Seong-Kun Bak <<tjdrns227@gmail.com>>")
    st.markdown("---")
    st.text("")

    col1, col2 = st.columns([2, 1])

    alphabet = list(string.ascii_uppercase)[0:8]
    with col1:
        st.selectbox('Start Column', options=alphabet)
        st.selectbox('End Column', options=[i for i in alphabet[::-1]])
        st.number_input('Interval', min_value=1, max_value=6)

    with col2:
        st.selectbox('Input Position', options = [1,2,3], help='The Plate Position want to pool')
        st.selectbox('Output Position', options = [2,3], help='The Pooled Plate position')
    st.download_button('Download Protocol', data="A")

if __name__ == '__main__':
    app()