import pickle
from get_parts_fun import *
#from export_excel import *

# Parameters

db_path = "/mnt/kun/box/-20/Part_DB_ot2.xlsx"
part_number = 5
final_volume = 20
#excel_export = "/mnt/kun/work/nanopore_od/p5r4_assembly.xlsx"

## External Parts
### [name, MW, / No, well, plate]

pACBB_vec = dna(
    name = "pACBB",
    No = 'pBB',
    vol = 5
)

dmpR = dna(
    name="DmpR",
    MW=34,
    No="Dm"
)

## Internal Parts
### ['Plate name', 'No'...]
pro = ['p1','p6','p12','p18','p21']
rbs = ['r1','r18','r22','r23']
ter = ['t25']
vec = [pACBB_vec]
cds = [dmpR]

## Order & Target MW
### order can affect to Assembled DNA's name order & Device Input order
part_order = [vec, cds, pro, rbs, ter]
target_MW = [56, 112, 112, 112, 112]

#===============================

db = pd.read_excel(db_path)

parameter_check(part_order, part_number)
internal_part_check(part_order, db)

part_dna = []
for i1 in part_order:
    part_dna.append(internal_part_to_dna_form(i1, db))

#====================

def assembly(dna, final_volume):
    n = 0
    No_list, name_list, vol_list, well_dict = [], [], [], {}
    for i2 in dna:
        vol, dil = 5, 5
        well_dict[f'part{n}'] = {'well': i2.well, 'vol':vol, 'dil':dil, 'plate':i2.plate}
        No_list.append(i2.No)
        name_list.append(i2.name)
        vol_list.append(vol)
        n+=1
    meta_data = {
        'No':'_'.join(No_list),
        'name':'_'.join(name_list),
        'DW': (final_volume*4/5) - sum(vol_list)
        }
    well_dict['meta_data'] = meta_data

    return (well_dict)

def set_part_to_assembly(part_dna, n2, target_MW, n1=0):

    if n1 == n2:
        parts = []
        for i in range(n2):
            parts.append(eval(f"part{i}"))
        dna_well = assembly(dna=parts, final_volume=20)
        yield (dna_well)
    else:
        for globals()[f'part{n1}'] in part_dna[0+n1]:
            set_part_to_assembly(part_dna, n2=n2, target_MW=target_MW, n1 = n1+1)

#==============
well_list = []
test = set_part_to_assembly(part_dna, n2=part_number, target_MW=target_MW, n1=0)



n = 1
for i1 in part1_dna:
    for i2 in part2_dna:
        for i3 in part3_dna:
            for i4 in part4_dna:
                globals()[f'well{n}'] = assembly(i1, i2, i3, i4, MW = MW)
                n+=1
print (f'Last Well : {n-1}')

#export_wells_to_xlsx(n, excel_export)

# Pickle Data Export

pickle_export = []
for i in range(1, n):
    pickle_export.append(eval(f'well{i}'))

with open("/mnt/kun/work/script/assembly/data2.pickle", 'wb') as f:
    pickle.dump(pickle_export, f, protocol=3)

# Excel Data Export