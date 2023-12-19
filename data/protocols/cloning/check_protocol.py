def get_values(*names):
    import json
    _all_values = json.loads("""
                             export_JSON
                             """)
    return [_all_values[n] for n in names]

# Check needed tips
def check_tips():
    pass

# Enzyme position
def enzyme_position(enzyme_list):
    # 24-well position
    well_position = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4","C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4"]
    return_dict = {}
    for enzyme, well in zip(enzyme_list, well_position):
        return_dict[enzyme] = well
    return return_dict