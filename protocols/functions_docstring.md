## Fucntions Docstrings

### Enzyme transfer

<div>
def enzyme_transfer(pipette, volume, src, dest, delay_second=None,
                top_delay=False, asp_rate=None, dis_rate=None,
                mix_after=False, drop_tip = True):
"""
basic transfer method for Liquid.
can adjust pipette delay, speed, mix ...

Parameters
----------------------------------------
pipette : opentrons pipette object
volume : (int, float) aspirate & dispense volume
src : liquid source for aspiration
dest : destination well to dispense

**kwargs

delay_second : (list) after aspiration and dispension protocol delay with {args} second. 
In list, first value is for aspiration, second is for dispension
ex) [1, 1]

top_delay : (list)

asp_rate : (list)

dis_rate : (list)

mix_after : (list)

drop_tip : (boolen)
"""
</div>