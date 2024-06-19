# Landing Page
# Send Message to Author

import streamlit as st
import requests
import json
from streamlit import session_state as state
from streamlit_pdf_viewer import pdf_viewer


def discord_message(message, user="kun"):
    if user == "None":
        return None

    # Send message to discord chaneel
    url = "https://discord.com/api/webhooks/1169608986891390996/wLti5ulSOXBtGelwiYO4SJi1jQSJ9tEQ8uC8sVXVlWXih3XWwkoLDr6cJBEm2iPY9b0t"

    headers = {"Content-Type": "application/json"}
    data = {"content": message}
    response = requests.post(url, headers=headers, data=json.dumps(data), verify=False)

if __name__ == '__main__':
    st.set_page_config("KMB_2024", layout="wide", initial_sidebar_state="expanded", page_icon="1️⃣")
    # Menu Items

st.sidebar.title("Protocol Maker")
st.sidebar.subheader("by Seong-Kun Bak *sanekun@kribb.re.kr*")
st.sidebar.markdown("---")

if "language" not in state:
    state["language"] = 0
if "korean" not in state:
    with open("data/korean_intro.md", "r") as f:
        state["korean"] = f.read()
if "english" not in state:
    with open("data/english_intro.md", "r") as f:
        state["english"] = f.read()

# 페이지에 대한 설명 (영어, 한글)
st.markdown("# Toward Automated workflows for synthetic biology")
st.markdown("Author: Seong-Kun Bak <sanekun@kaist.ac.kr>")
with st.expander("Description", expanded=True):
    cols = st.columns([1,1,1,1])
    if cols[0].button("한국어", use_container_width=True,
                      type='secondary' if state.language else 'primary'):
        state.language = 0
        st.rerun()
    if cols[1].button("English", use_container_width=True,
                      type='primary' if state.language else 'secondary',
                      disabled=True,
                      help="Working"):
        state.language = 1
        st.rerun()

    if not state.language:
        st.markdown(state["korean"])
    else:
        st.markdown(state["english"])
    
st.page_link("pages/2_2️⃣_Protocol_Maker.py", label="GO to Protocol Maker", icon="2️⃣")
st.page_link("https://sblab.or.kr/", label="KRIBB SBL", icon="🏠")

# 디스코드 알림 보내는 양식

# PDF 띄우기
with st.expander("POSTER VIEWER", expanded=True):
    pdf_viewer("data/2024_KMB_poster.pdf")

with st.form("Send Message"):
    mail_title = st.text_input("Title", placeholder="Question from KMB")
    mail_sender = st.text_input("Sender", placeholder="ex) sanekun@kaist.ac.kr")
    mail_body = st.text_area("msg", placeholder="Message", label_visibility='collapsed')
    
    if st.form_submit_button("Send", type='primary', disabled=False):
        if not mail_sender:
            st.warning("Message was not sent. Fill all contents")
        else:
            st.success("Message has been sent")
            msg = f"Title: {mail_title}\nSender: {mail_sender}\n{mail_body}"
            discord_message(msg)