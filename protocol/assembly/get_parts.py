import pandas as pd
import pickle
#import logging

# Parameters

db_path = "/mnt/kun/box/-20/Part_DB.xlsx"

pro = ['p1','p6','p12','p18','p21']
rbs = ['r1','r18','r22','r23']
ter = ["t25"]
cds = ["c1"]

# P R C T
MW = [112, 112, 56, 112]

vector_volume = 7
final_volume = 20

excel_export = "/mnt/kun/work/nanopore_od/p5r4_assembly.xlsx"


# Functions

class dna:
    # Basic information
    ## MW can calculate with python or Excel.
    def __init__(self, length, conc, MW, well, name, No):
        self.length = length
        self.conc = conc
        self.MW = MW
        self.name = name
        self.well = well
        self.No = No

    # get optimal volume based on [part, cds, vector]_MW parameter.
    def get_volume(self, goal_MW):
        final = (goal_MW/self.MW).round(2)
        return (final)

def db_check(part_list, db):
    for i in part_list:
        if i in db["No"].values:
            return True
        else:
            print (f"Break! {i} in {part_list} isn't in DB")
            return False

def make_dna_form(part_list, part_db):
    return_list = []
    for i in part_list:
        tmp = part_db[part_db["No"] == i]
        globals()[f'{i}_dna'] = dna(
            length = tmp.full_length.values[0],
            conc = tmp.concentration.values[0],
            name = tmp.Name.values[0],
            MW = tmp.MW.values[0],
            well = tmp.Well.values[0],
            No = tmp.No.values[0])
        return_list.append(globals()[f'{i}_dna'])
    
    return (return_list)

# make assembly well
def check_dilution(dna, vol):
    if dna.get_volume(vol) < 0.5:
        return ((dna.get_volume(vol)*5).round(3), 5)
    else:
        return(dna.get_volume(vol).round(3), 0)

def assembly(i1, i2, i3, i4, MW = MW, vec_vol = vector_volume):
    
    vol, dil = check_dilution(i1, MW[0])
    pro_asm = {"well": i1.well, "vol": vol, "dil": dil}

    vol, dil = check_dilution(i2, MW[1])
    rbs_asm = {"well": i2.well, "vol": vol, "dil": dil}

    vol, dil = check_dilution(i3, MW[2])
    cds_asm = {"well": i3.well, "vol": vol, "dil": dil}

    vol, dil = check_dilution(i4, MW[3])
    ter_asm = {"well": i4.well, "vol": vol, "dil": dil}

    meta_data = {
        "No": '_'.join([i1.No, i2.No, i3.No, i4.No]),
        "name": '_'.join([i1.name, i2.name, i3.name, i4.name]),
        "DW" : ((final_volume*4/5) - (pro_asm['vol'] + rbs_asm['vol'] + cds_asm['vol'] + ter_asm['vol'] + vec_vol)).round(3),
        "vec" : vec_vol
    }
    return {
        "pro":pro_asm, "rbs":rbs_asm, 'cds':cds_asm, 'ter':ter_asm,
        'meta':meta_data
        }

def convert_well_to_dataframe(well):
    
    No = well['meta']['No']

    if well['pro']['dil']:
        Pro = " / ".join([str(well['pro']['vol']), str(well['pro']['dil'])])
    else:
        Pro = well['pro']['vol']

    if well['rbs']['dil']:
        RBS = " / ".join([str(well['rbs']['vol']), str(well['rbs']['dil'])])
    else:
        RBS = well['rbs']['vol']

    if well['cds']['dil']:
        CDS = " / ".join([str(well['cds']['vol']), str(well['cds']['dil'])])
    else:
        CDS = well['cds']['vol']

    if well['ter']['dil']:
        Ter = " / ".join([str(well['ter']['vol']), str(well['ter']['dil'])])
    else:
        Ter = well['ter']['vol']
    
    DW = well['meta']['DW']
    Vector = well['meta']['vec']
    
    df = {'No': No, 'Pro': Pro, 'RBS':RBS, 'Ter':Ter, 'CDS': CDS, 'DW':DW, 'Vector':Vector}

    return (pd.DataFrame.from_dict(df, orient='index').T)

def export_wells_to_xlsx(n, save_path):
    tmp_list = []
    for i in range(1, n):
        tmp_list.append(convert_well_to_dataframe(eval(f'well{i}')))
    
    pd.concat(tmp_list).to_excel(save_path)

#===============================

pro_db = pd.read_excel(db_path, sheet_name="pro")
rbs_db = pd.read_excel(db_path, sheet_name="rbs")
ter_db = pd.read_excel(db_path, sheet_name="ter")
cds_db = pd.read_excel(db_path, sheet_name="cds")

# Parameters
## input Part's No in DB


# DB check
for n1, n2 in zip([pro, rbs, ter, cds], [pro_db, rbs_db, ter_db, cds_db]):
    if db_check(n1, n2):
        pass
    else:
        print ("Protocol Break, Parts isn't in DB")
        break
    print ("Every Part is in DB go next")

# make dna_form

pro_dna = make_dna_form(pro, pro_db)
rbs_dna = make_dna_form(rbs, rbs_db)
cds_dna = make_dna_form(cds, cds_db)
ter_dna = make_dna_form(ter, ter_db)

n = 1
for i1 in pro_dna:
    for i2 in rbs_dna:
        for i3 in ter_dna:
            for i4 in cds_dna:
                globals()[f'well{n}'] = assembly(i1, i2, i3, i4, MW = MW)
                n+=1
print (f'Last Well : {n-1}')

#export_wells_to_xlsx(n, excel_export)

convert_well_to_dataframe(well2)

pickle_export = []
for i in range(1, n):
    pickle_export.append(eval(f'well{i}'))

with open("./data.pickle", 'wb') as f:
    pickle.dump(pickle_export, f, pickle.HIGHEST_PROTOCOL)