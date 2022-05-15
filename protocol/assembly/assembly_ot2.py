import pickle
import sys
from opentrons import simulate

protocol = simulate.get_protocol_api('2.12')

def get_args():
    pas

with open('/mnt/kun/git/ot2/protocol/assembly/get_parts/data.pickle', 'rb') as f:
    meta_data = pickle.load(f)



#======================
plates = list(filter(None, meta_data[-1]))
if len(plates) > 4:
    sys.exit("Too many plates !\nMaximum is 4.")
#======================
n = 1
for i in plates:
    globals()[f'{i}'] = protocol.load_labware('biorad_96_wellplate_200ul_pcr', n)
    n+=1
#======================

use_enz_mix = True

if use_enz_mix:
    enz_mix = tube_rack['D1']
else:
    BsaI = tube_rack["D1"]
    T4_buf = tube_rack["D2"]
    T4_ligase = tube_rack["D3"]
    DW = tube_rack['D5']
    
#======================

