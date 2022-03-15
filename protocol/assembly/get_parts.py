import pandas as pd
import logging

"""
1. Part 정보들 불러오기 (Excel)
2. 내가 넣어준 디자인 대로 Part Master Mix 제작
= Library의 경우 master mix를 제작하는게 Volume 문제를 해결하기가 좋다.

Final Plate를 A1 ~ A12 ... 으로하여서
각 번호 1, 2, 3, 4 마다 들어가는 Part를 정하도록 하자.
(많이 하려면 Loop를 돌리면되니까)


Output = {
    Well1 = {pro : [p1, p2, p3, p4], 
             rbs : [r1, r2, r3],
             ter : [t1, t2]},
    Well2 = ...
}

이러한 Vector를 Output으로 전달하도록 하자. 
"""

"""
input

Well1 = {Pro : [P1, P2, P3], 
         RBS : [R1, R2],
         Ter : [T1],
         CDS : sfGFP (CDS도 DB로)
         Para {
             CDS : 112 fmol
             part : 112 fmol
             vector : 56 fmol
         }

         }

"""

"""
함수형으로 전개해서

def assembly()
를만들고

assembly(pro=[A], rbs=[B], ter=[C], cds=[], vector=[position])
이렇게 치면

Well1 = {

}
이런 output이 등장하도록 하기.!

또한 for loop를 통해

for i in A:
    assembly(i)

를하면 위 결과가 모여진 Vector가 긴 Well을 형성 하도록 하기!

* 추가로 이렇게 만들어진 output (Well1 = {}, Well2 = {})
은 실험노트에도 바로 사용할 수 있도록 사람이 읽을 수 있게하자.
"""
# MW 까지는 받아오지만 Volume은 정한 Parameter에 맞춰서 변경 할 수 있도록 해야한다.
# 우선 Library  고려 없이 진행하도록 ? 단일 파트만..


# Functions

class dna:
    # Basic information
    ## MW can calculate with python or Excel.
    def __init__(self, length, conc, MW, well, name):
        self.length = length
        self.conc = conc
        self.MW = MW
        self.name = name
        self.well = well

    # get optimal volume based on [part, cds, vector]_MW parameter.
    def get_volume(self, goal_MW):
        final = (goal_MW/self.MW).round(2)
        return (final)

def db_check(part_list, db):
    for i in part_list:
        if i in db["No"].values:
            pass
        else:
            logging.critical("{} is not in DB !".format(i))
            return True

def assembly(pro=[], rbs=[], ter=[], cds=[]):

    # Check every part is in DB with Part's No
    for n1, n2 in zip([pro, rbs, ter, cds], [pro_db, rbs_db, ter_db, cds_db]):
        if db_check(n1, n2):
            return ("Protocol Break")
        else:
            pass

    return ("Every Part is in DB print Assembly Well")



#def main():

db_path = "/mnt/kun/box/-20/Part_DB.xlsx"

pro_db = pd.read_excel(db_path, sheet_name="pro")
rbs_db = pd.read_excel(db_path, sheet_name="rbs")
ter_db = pd.read_excel(db_path, sheet_name="ter")
cds_db = pd.read_excel(db_path, sheet_name="cds")

# Parameters
## input Part's No in DB
pro = ["p1"]
rbs = ["r1"]
ter = ["t1"]
cds = ["c1"]

# MW (fmol)
part_MW = 112
cds_MW = 112
vector_MW = 56

assembly(pro, rbs, ter)

pro_dna = []
for i in pro:
    tmp = pro_db[pro_db["No"] == i]
    pro1 = dna(length = tmp.full_length.values,
            conc = tmp.concentration.values,
            MW = tmp.MW.values,
            name = tmp.Name.values,
            well = tmp.Well.values)

for i in rbs:
    tmp = rbs_db[rbs_db["No"] == i]
    rbs1 = dna(length = tmp.full_length.values,
            conc = tmp.concentration.values,
            MW = tmp.MW.values,
            name = tmp.Name.values,
            well = tmp.Well.values)

for i in ter:
    tmp = ter_db[ter_db["No"] == i]
    ter1 = dna(length = tmp.full_length.values,
            conc = tmp.concentration.values,
            MW = tmp.MW.values,
            name = tmp.Name.values,
            well = tmp.Well.values)

for i in cds:
    tmp = cds_db[cds_db["No"] == i]
    cds1 = dna(length = tmp.full_length.values,
            conc = tmp.concentration.values,
            MW = tmp.MW.values,
            name = tmp.Name.values,
            well = tmp.Well.values)


rbs1.get_volume(112)
pro1.get_volume(112)
ter1.get_volume(112)
cds1.get_volume(56)
ter1.MW



# Output Simulate
Well1 = assembly(pro, rbs, ter, cds, parameters = [])

# 우선 SIngle Part로 진행하고 이후 고민해 보도록 하자.