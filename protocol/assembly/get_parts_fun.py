import pandas as pd
import sys

# Functions
class dna:
    # Basic information
    ## MW can calculate with python or Excel.
    ## MW & name is necessary
    def __init__(self, name, MW=None, vol=None, No=None, well=None, plate=None):
        #self.length = length
        #self.conc = conc
        self.MW = MW
        self.vol = vol
        self.name = name
        self.No = No
        self.well = well
        self.plate = plate

        self.necessary_parameter()

    def necessary_parameter(self):
        if (self.vol == None) & (self.MW == None):
            print ("Warnning, \nWrong Part! \nOne of MW or vol is necessary! \n")
            sys.exit("Exit Protocol")

        if self.vol:
            print ("Volume parameter is only for Vector.\n")

        print ("DNA part accepted")
    
    # get optimal volume based on [part, cds, vector]_MW parameter.
    def get_volume(self, goal_MW):
        final = (goal_MW/self.MW).round(2)
        return (final)

def parameter_check(part_order, part_number):
    # for logging
    if len(part_order) != part_number:
        print ("Part number is not equal to length of order, Plz check it")
    print ("Parameter Checked")
    # internal_part check를 여기에서.

def internal_part_check(part_order, db):
    
    for i1 in part_order:
        for i2 in i1:
            if type(i2) == dna:
                continue
            if i2 in db['No'].values:
                continue
            else:
                print (f"Break! {i2} in {i1} isn't in DB")
                sys.exit("Exit Protocol")
    print ("Internal Part Checked")

def internal_part_to_dna_form(part_list, part_db):
    return_list = []
    for i in part_list:
        tmp = part_db[part_db["No"] == i]
        locals()[f'{i}_dna'] = dna(
            name = tmp.Name.values[0],
            MW = tmp.MW.values[0],
            well = tmp.Well.values[0],
            No = tmp.No.values[0],
            plate = tmp.plate.values[0])
        return_list.append(locals()[f'{i}_dna'])
    
    return (return_list)

def read_parts(part_order, db_path):
    db = pd.read_excel(db_path)

    return_list = []
    for i1 in part_order:
        internal_part_check_to_db(i1, db)
    print ("Internal Part Checked")





    return (internal_part_to_dna_form(part_list[1:], df))

# make assembly well
def check_dilution(dna, vol):
    if dna.get_volume(vol) < 0.5:
        return ((dna.get_volume(vol)*5).round(3), 5)
    else:
        return(dna.get_volume(vol).round(3), 0)

def assembly(i1, i2, i3, i4, MW, vec_vol=5, final_volume=20):
    
    vol, dil = check_dilution(i1, MW[0])
    pro_asm = {"well": i1.well, "vol": vol, "dil": dil, 'plate': i1.plate}

    vol, dil = check_dilution(i2, MW[1])
    rbs_asm = {"well": i2.well, "vol": vol, "dil": dil, 'plate': i2.plate}

    vol, dil = check_dilution(i3, MW[2])
    ter_asm = {"well": i3.well, "vol": vol, "dil": dil, 'plate': i3.plate}

    vol, dil = check_dilution(i4, MW[3])
    cds_asm = {"well": i4.well, "vol": vol, "dil": dil, 'plate': i4.plate}

    meta_data = {
        "No": '_'.join([i1.No, i2.No, i3.No, i4.No]),
        "name": '_'.join([i1.name, i2.name, i3.name, i4.name]),
        "DW" : ((final_volume*4/5) - (pro_asm['vol'] + rbs_asm['vol'] + cds_asm['vol'] + ter_asm['vol'] + vec_vol)).round(3),
        "vec" : vec_vol
    }
    return {
        "part1":pro_asm, "part2":rbs_asm, 'part3':ter_asm, 'part4':cds_asm,
        'meta':meta_data
        }

def assembly2(parts=[], ):
    """
    with Shiny based web input form, make flexible input part number(not strict 4)
    and assemble it.

    Plate 이름을 metadata안에 같이 기록하도록!
    """