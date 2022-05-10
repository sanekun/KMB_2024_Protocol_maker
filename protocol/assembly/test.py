import sys
sys.path.append("/mnt/kun/work/git/ot2/protocol/assembly")

with open("/mnt/kun/work/git/ot2/protocol/assembly/template.txt", 'r') as f:
    txt = f.readlines()

txt


Lend = "잘나옴"
Cent1 = "ABCD"
"".join(txt).format(Lend=Lend, Cent1=Cent1)