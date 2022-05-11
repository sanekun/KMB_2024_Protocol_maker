from opentrons import simulate, types

metadata = {
    'protocolName': 'OT2 Functions',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'Basic OT2 Functions'
}

protocol = simulate.get_protocol_api('2.11')

def enzyme_transfer(pipette, volume, src, dest, delay_second=[0, 0],
                  top_delay=False, asp_rate=None, dis_rate=None,
                  mix_after=False, drop_tip = True):
    if asp_rate:
        pipette.flow_rate.aspirate=asp_rate
    if dis_rate:
        pipette.flow_rate.dispense=dis_rate            
    
    if pipette._has_tip == False:
        pipette.pick_up_tip()

    pipette.aspirate(volume, src)
    protocol.delay(seconds=delay_second[0])
    if top_delay:
        pipette.move_to(src.top(z=-3))
        protocol.delay(seconds=top_delay[0])
    pipette.dispense(volume, dest)
    protocol.delay(seconds=delay_second[1])
    if type(mix_after) == list:
        try:
            pipette.flow_rate.aspirate=mix_after[2]
            pipette.flow_rate.dispense=mix_after[2]
        except:
            pass
        pipette.mix(mix_after[0], mix_after[1])
    pipette.blow_out()
    if top_delay:
        pipette.move_to(src.top(z=-3))
        protocol.delay(seconds=top_delay[1])
    if drop_tip:    
        pipette.drop_tip()


class Reagent():
    def __init__(self, name, wells, cols, vol_per_well):
        self.name
        self.wells
        self.cols
