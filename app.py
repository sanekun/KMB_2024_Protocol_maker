import streamlit as st
from multiapp import MultiApp
from data.ot2.protocols.cloning import cloning
st.set_page_config(layout="wide")
app = MultiApp()

# Add all your application here
app.add_app("OT-2 Cloning", cloning.main)
#app.add_app("Tag dispense", Tag_dispenser.app)
#app.add_app("Pooling", Pooling.app)

# The main app
if __name__ == "__main__":
    app.run()