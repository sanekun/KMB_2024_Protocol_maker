from opentrons import simulate, types

metadata = {
    'protocolName': 'OT2 Functions',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'Basic OT2 Functions'
}

protocol=simulate.get_protocol_api('2.11')

def enzyme_transfer(pipette, volume, src, dest, delay_second=None,
                top_delay=False, asp_rate=None, dis_rate=None,
                mix_after=False, drop_tip = True):

    """
    basic transfer method for Liquid.
    can adjust pipette delay, speed, mix ...

    Parameters
    ----------------------------------------

    """
    
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
    if top_delay:
        pipette.move_to(src.top(z=-3))
        protocol.delay(seconds=top_delay[1])
    if drop_tip:    
        pipette.drop_tip()


def get_well(well):
    #check가 되도록해야할듯.
    if type(well) == list:
        return (well[0])
    else:
        return (well)


def well_mix(protocol, pipette, dest, mix_params, flow_rate):
    if pipette._has_tip != True:
        pipette.pick_up_tip()
    pipette.flow_rate = flow_rate
    pipette.move_to(dest.bottom())
    pipette.mix(mix_params[0], mix_params[1])
    pipette.blow_out()
    pipette.move_to(dest.top(z=-3))
    protocol.delay(seconds=2)
    pipette.drop_tip()