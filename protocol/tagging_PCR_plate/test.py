    if asp_rate:
        pipette.flow_rate.aspirate=20
    if dis_rate:
        pipette.flow_rate.dispense=20
    
    if pipette._has_tip == False:
        pipette.pick_up_tip()

    pipette.aspirate(vol, forward[for_n])
    protocol.delay(seconds=1)
    if top_delay:
        pipette.move_to(src.top(z=-3))
        protocol.delay(seconds=top_delay[0])
    pipette.dispense(vol, dest_col[0])
    protocol.delay(seconds=0)
    if type(mix_after) == list:
        try:
            pipette.flow_rate.aspirate=mix_after[2]
            pipette.flow_rate.dispense=mix_after[2]
        except:
            pass
        pipette.mix(mix_after[0], mix_after[1])
    pipette.blow_out()
    if top_delay:
        pipette.move_to(forward[for_n].top(z=-3))
        protocol.delay(seconds=1)
    if drop_tip:    
        pipette.drop_tip()