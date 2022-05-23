import pickle
import sys
import argparse
import datetime

"""
썩 깔끔하지 않네
Write script
---------------------------------

with template py file and pickle data.
Write specific research's script.
"""
def get_args():
    parser=argparse.ArgumentParser()
    parser.add_argument('-m', type=str, help='meta_data path', required=True)
    parser.add_argument('-t', type=str, help='template script path', required=True)
    parser.add_argument('-o', type=str, help='script output', default="./assembly.py" , required=True)
    
    args=parser.parse_args()
    return args

def main():
    args = get_args()
    # Parameters

    save_path = args.o

    ## Load metadata
    with open(args.m, 'rb') as f:
        meta_data = pickle.load(f)

    ## Load template
    with open(args.t, 'r') as f:
        template = ''.join(f.readlines())
        f.close()

    ## Arguments

    """
    time
    meta_data
    enzyme_mix_vol
    load_plate
    """
    time = datetime.datetime.now().strftime("%x")
    enz_vol = 4

    ### load_plate
    plates = meta_data[-1]
    plates.remove('EXT')
    if len(plates) > 4:
        sys.exit("Too many plates !\nMaximum is 4.")

    load_plate = []
    n = 1
    for i in plates:
        load_plate.append(f"globals()['{i}'] = protocol.load_labware('biorad_96_wellplate_200ul_pcr', {n})")
        n+=1

    #======================================================
    new_script = template.format(date = time, meta_data = str(meta_data), enzyme_mix_vol=enz_vol, load_plate='\n    '.join(load_plate))

    with open(save_path, 'w') as f:
        f.write(new_script)
        f.close()

if __name__ == '__main__':
    main()
