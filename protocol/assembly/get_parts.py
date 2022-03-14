import pandas as pd

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

# Parameters

pro = ["P1", "P2", 'P3', 'P4']
rbs = ["R1", "R2", 'R3']
ter = ["T1", "T2"]


# MW (fmol)
cds_MW = 112
part_MW = 56

class dna:
    def __init__(self, length, conc, MW, Name = None):
        self.length = length
        self.conc = conc
        self.MW = MW
        self.Name = Name

db_path = "/mnt/kun/box/-20/Part_DB.xlsx"

pro_db = pd.read_excel(db_path, sheet_name="pro")
rbs_db = pd.read_excel(db_path, sheet_name="rbs")
ter_db = pd.read_excel(db_path, sheet_name="ter")
# cds는 DB에 없을 경우가 많을 것 같으니 Unknown을 쓸 수 잇도록 (모든 파트가)
cds_db = pd.read_excel(db_path, sheet_name="cds")


"P1" in pro_db["No"]


#assembly(pro = [], rbs = [], ter = [], cds = [])


B = dna(length = 50, concentration = 100, MW = 200)

