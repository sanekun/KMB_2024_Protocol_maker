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

# Read DNAs from DB
n = 1
for i in range(part_order):
    if type(i) == dna:
        globals()[f'part{n}_dna'] = i
    else:
        globals()[f'part{n}_dna'] = read_parts(i, db_path)
    n+=1

def parts_to_dna_form(part_order, db):
    return_list = []


part1_dna = read_db(part1, db_path)
part2_dna = read_db(part2, db_path)
part3_dna = read_db(part3, db_path)
part4_dna = read_db(part4, db_path)

# Parameters
## input Part's No in DB

n = 1
for i1 in part1_dna:
    for i2 in part2_dna:
        for i3 in part3_dna:
            for i4 in part4_dna:
                globals()[f'well{n}'] = assembly(i1, i2, i3, i4, MW = MW)
                n+=1
print (f'Last Well : {n-1}')

#export_wells_to_xlsx(n, excel_export)

pickle_export = []
for i in range(1, n):
    pickle_export.append(eval(f'well{i}'))

with open("/mnt/kun/work/script/assembly/data2.pickle", 'wb') as f:
    pickle.dump(pickle_export, f, protocol=3)