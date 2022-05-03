import pandas as pd

def convert_well_to_dataframe(well):
    
    No = well['meta']['No']

    if well['pro']['dil']:
        Pro = " / ".join([str(well['pro']['vol']), str(well['pro']['dil'])])
    else:
        Pro = well['pro']['vol']

    if well['rbs']['dil']:
        RBS = " / ".join([str(well['rbs']['vol']), str(well['rbs']['dil'])])
    else:
        RBS = well['rbs']['vol']

    if well['cds']['dil']:
        CDS = " / ".join([str(well['cds']['vol']), str(well['cds']['dil'])])
    else:
        CDS = well['cds']['vol']

    if well['ter']['dil']:
        Ter = " / ".join([str(well['ter']['vol']), str(well['ter']['dil'])])
    else:
        Ter = well['ter']['vol']
    
    DW = well['meta']['DW']
    Vector = well['meta']['vec']
    
    df = {'No': No, 'Pro': Pro, 'RBS':RBS, 'Ter':Ter, 'CDS': CDS, 'DW':DW, 'Vector':Vector}

    return (pd.DataFrame.from_dict(df, orient='index').T)

def export_wells_to_xlsx(n, save_path):
    tmp_list = []
    for i in range(1, n):
        tmp_list.append(convert_well_to_dataframe(eval(f'well{i}')))
    
    pd.concat(tmp_list).to_excel(save_path)