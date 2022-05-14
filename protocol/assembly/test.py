import sys
sys.path.append("/mnt/kun/work/git/ot2/protocol/assembly")

import pickle

# Load assembled well data
with open("/mnt/kun/work/git/ot2/protocol/assembly/get_parts/data.pickle", 'rb') as f:
    meta_data = pickle.load(f)

with open("/mnt/kun/work/git/ot2/protocol/assembly/assemble_ot2_template.py", 'r') as f:
    txt = f.readlines()

txt


Lend = "잘나옴"
Cent1 = "ABCD"
"".join(txt).format(Lend=Lend, Cent1=Cent1)