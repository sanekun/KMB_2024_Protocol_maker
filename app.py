import streamlit as st
from multiapp import MultiApp
from apps import DNAssembler, Pooling, Tag_dispenser
#st.set_page_config(layout="wide")
app = MultiApp()

# Add all your application here
app.add_app("DNAssembler", DNAssembler.app)
#app.add_app("Tag dispense", Tag_dispenser.app)
#app.add_app("Pooling", Pooling.app)

# The main app
if __name__ == "__main__":
    app.run()