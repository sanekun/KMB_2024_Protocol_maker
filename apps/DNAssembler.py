# Functions
import sys
import streamlit as st
import pandas as pd
from streamlit_ace import st_ace
import numpy as np
import re

class dna:
    # Basic information
    ## MW can calculate with python or Excel.
    ## MW & name is necessary
    def __init__(self, name, MW=None, No=None, well=None, plate="EXT"):
        #self.length = length
        #self.conc = conc
        self.MW = MW
        self.name = name
        self.No = No
        self.well = well
        self.plate = plate
    
    # get optimal volume based on [part, cds, vector]_MW parameter.
    def get_volume(self, goal_MW):
        if self.MW == None:
            return (self.vol)
        final = round(goal_MW/self.MW, 2)
        return (final)

# 220726
def part_check(uni_parts, db):
    for i1 in uni_parts:
        if i1 in db['No'].values:
            continue
        else:
            st.error(f"Break! {i1} isn't in DB", icon="🚨")
            #sys.exit('Parts No Error')
    #print ("Parts confirmed")

def parameter_check(wells):
    for well in wells.iloc():
        part_num = len(well['DNA'].split('_'))
        vol_num = len(well['Volume'].split('_'))
        if part_num != vol_num:
            st.error(f"Warning!, {well['DNA']}'s Volume must be same length with part number \nExit Protocol.", icon="🚨")
            st.stop()
    #print ("Parameters Confrimed")

def part_to_dna_form(uni_parts, db):
    tmp = db[db["No"] == uni_parts]
    tmp_dna = dna(
        name = tmp.Name.values[0],
        MW = tmp.MW.values[0],
        well = tmp.Well.values[0],
        No = tmp.No.values[0],
        plate = tmp.plate.values[0])
    
    return (tmp_dna)

def assembly(well, part_list, part_list_dna, final_volume):
    n = 0
    No_list, name_list, vol_list, well_dict = [], [], [], {}
    for no, vol in zip(well['DNA'].split('_'), well['Volume'].split('_')):
        DNA = part_list_dna[part_list.index(no)]
        well_dict[f'part{n+1}'] = {'plate':DNA.plate, 'well': DNA.well, 'vol':vol}
        No_list.append(DNA.No)
        name_list.append(DNA.name)
        vol_list.append(float(vol))
        n+=1
    meta_data = {
        'No': '_'.join(No_list),
        'name': '_'.join(name_list),
        'DW': round(final_volume - sum(vol_list), 2)
        }
    well_dict['meta'] = meta_data

    return (well_dict)

def calculate_metadata(**kwargs):
    """
    kwargs : input_path, db_path, 
    """
    ## input parameter
    db = pd.read_excel(kwargs['db_path'])
    wells = pd.read_excel(kwargs['input_path']).iloc()[:,:2].fillna(0)
    well_parts = [i.split('_') for i in wells['DNA']]
    part_list = list(set(sum(well_parts, [])))
    part_check(part_list, db)
    parameter_check(wells)

    print (f"Final Well number: {len(wells['DNA'])}")
    print (f"Used Parts: {part_list}")

    ## convert to dna class
    part_list_dna = [part_to_dna_form(i, db) for i in part_list]

    ### EXT parts
    n, ext_dna = 0, {}
    for i in part_list_dna:
        if i.plate == 'ext':
            ext_dna[i.No] = EXT_wells[n]
            i.well = EXT_wells[n]
            n+=1

    plates = list(set([i.plate for i in part_list_dna]))

    meta_data = {}
    n, well_data = 1, {}
    for well in wells.iloc():
        well_data[f'well{n}'] = assembly(well, part_list, part_list_dna, kwargs['final_volume'])
        n+=1

    meta_data['well_data'] = well_data
    meta_data['part'] = part_list
    meta_data['plate'] = plates
    meta_data['EXT'] = ext_dna

    return (meta_data)

## tmp_dna's well The well's architechture is from opentrons 24 wells plate.
EXT_wells = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6']
DB = "./data/Part_DB.xlsx"

def app():
    # Side bar
#    st.sidebar.title("OT2 Protocols")
#    st.sidebar.caption("github.com/Lelp27/automated-protocol-ot2")

    def load_template(path):
        template = path

        with open(template, 'r') as f:
            template = ''.join(f.readlines())
            f.close()

        comment_tag = re.compile("#!#.+#!#") # for comment in template
        template = re.sub(comment_tag, "", template) # remove comment in template

        return (template)

    def export_protocol():
        data = calculate_metadata(input_path=input_wells, db_path = DB, final_volume=20)
        plate = data['plate']

        if len(plate) > 4:
            sys.exit("Too many plates ! Maximum is 4. \nProtocol End")

        n, load_plate = 1, []
        for i in plate:
            load_plate.append(f"globals()['{i}'] = protocol.load_labware('biorad_96_wellplate_200ul_pcr', {n})")
            n+=1
        
        new_script = template.format(date = date, meta_data = str(data), load_plate='\n    '.join(load_plate), thermocycler=thermocycler)
            # Output protocol
        return data, new_script


    # DIV
    st.title("DNAssembler")
    st.caption("Author : Seong-Kun Bak <<tjdrns227@gmail.com>>")
    st.text("")

    tab1, tab2, tab3 = st.tabs(["Protocol generation", "Make input file", "DB"])

    with tab1:
        st.subheader("Necessary input")
        with st.container():
            date = st.date_input("Date")
            input_wells = st.file_uploader("Upload Wells", type=".xlsx", key='uploaded')
            #sample_input = st.checkbox("Sample", False)
            if input_wells:
                df = pd.read_excel(input_wells)
                st.subheader("Preview")
                st.dataframe(df.head())
            st.text("")

        st.subheader("Parameters")
        thermocycler = st.selectbox("RUN Thermocycler", ('False', 'True'), help = "Directly run thermocycler in OT2")
        st.text("")

        #Load_template
        template = load_template(path = "./data/protocols/DNAssembler/assembly_template.py")

        if 'make_protocol' not in st.session_state:
            st.session_state.make_protocol = False

        if st.session_state.uploaded:
            st.session_state.make_protocol = True
            data, template = export_protocol()

        st.download_button("⬇️ Download Protocol", template, file_name="DNAssembler.py", disabled=(st.session_state.make_protocol is not True))

        with st.expander("Deck Position"):
            st.warning("For the Detail informations,\\\nCheck the Opentrons App")
            if 'data' in globals():
                st.write('')
                st.markdown(f'**Plate** : {data["plate"]}')
                st.markdown(f'**Extra Samples** : {data["EXT"]}')
            else:
                st.write("Empty")

        with st.expander("Change Script (Only for Developer)"):
            edit_code = st_ace(template, language='python', theme='dracula')
            st.download_button("⬇️ Editied Protocol", edit_code, file_name='DNAssembler.py')

    with tab2:
        st.header("Wells")
        st.selectbox("Select", ("Single", "Library"))

    with tab3:
        df = pd.read_excel(DB)
        st.header("Part DB")
        st.warning("In this Page, Only can add data temporarly")
        st.warning("If you want to add data permanently, Move to Part DB on sidebar")
        col1, col2 = st.columns([2,1])

        with col1:
            plate = st.selectbox("Well Plate", np.delete(df['plate'].unique(), 0))
            st.dataframe(df[df['plate'] == plate])
        #df[df['plate'] == plate]
        #['No', 'Name', 'Sequence', 'MW', 'plate', 'Well']

        with col2:
            if 'count' not in st.session_state:
                st.session_state.count = 1

            with st.form("col2", clear_on_submit=True):
                st.markdown('**Add temporary data**')
                name = st.text_input('Name')
                vol = st.text_input('Volume')
                st.text_input('Plate', 'ext', disabled=True, help='Temporary data only can add as ext')
                st.text_input('No', f'e{st.session_state.count}', disabled=True, help='Temporary data only can add as ext')
                if st.form_submit_button('Add data', help = 'Fill all of sections'):
                    if (name == '') | (vol == ''):
                        st.error('Fill All of sections!')
                    else:
                        st.success(f"Succesfully Add as e{st.session_state.count}")
                        st.session_state.count += 1
                        #form 초기화 필요

if __name__=='__main__':
    app()