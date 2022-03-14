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


# Parameters

# MW (fmol)
cds_MW = 112
part_MW = 56

class dna_parts:
    def __init__(self, length, concentration, MW, Name = None):
        self.length = length
        self.concentration = concentration
        self.MW = MW
        self.Name = Name

db_path = "/mnt/kun/box/-20/Part_DB.xlsx"

pro_db = pd.read_excel(db_path, sheet_name="pro")
