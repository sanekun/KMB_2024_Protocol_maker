"""
DB를 2개 쓰더라도 OT2용, 정보 저장 용 으로 나뉘는게 맞는듯.
=> csv DB를 써도 json으로 Load할까?
"""

"""
1. name
2. no
3. seq
4. type
5. plate
6. well
"""


import pandas as pd
pd.read_csv('./data/Part_DB.csv')