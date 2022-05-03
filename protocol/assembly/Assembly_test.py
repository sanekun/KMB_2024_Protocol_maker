#!/usr/bin/env python
# coding: utf-8

# In[151]:


from opentrons import types, protocol_api, execute

# Unverified

# Default DNA MW is 112 fmol (CDS), 56 fmol (Backborn)
# Default PCR protocol is .

metadata = {
    'protocolName': 'Golden gate assembly used by SBL (96 well plate based)',
    'author': 'Seong-Kun Bak <tjdrns27@kribb.re.kr>',
    'apiLevel': '2.11',
    'description': 'For combinatorial part library assembly & Simultaneous assembly with different part combination'
}


# In[152]:


#Reset all of values ex) labware, instrument ..
protocol = execute.get_protocol_api("2.11")


# In[153]:


#after protocol.home is running, can't reset the tiprack's position
protocol.home()


# In[145]:


module_thermocycler = protocol.load_module("thermocycler Module")
module_magnetic = protocol.load_module('magnetic module gen2', '4')


# In[146]:


pro = protocol.load_labware("biorad_96_wellplate_200ul_pcr", 1)
rbs = protocol.load_labware("biorad_96_wellplate_200ul_pcr", 2)
ter = protocol.load_labware("biorad_96_wellplate_200ul_pcr", 3)
assemble_plate = module_thermocycler.load_labware("biorad_96_wellplate_200ul_pcr")

tube_rack = protocol.load_labware("opentrons_24_tuberack_eppendorf_1.5ml_safelock_snapcap", 9)


# In[147]:


#tag_primer_plate = protocol.load_labware_from_definition(bioneer, 2)
#destination_plate = protocol.load_labware_from_definition(eppendorf, 1)
tiprack_20_sin = protocol.load_labware("opentrons_96_tiprack_20ul", 5)
tiprack_300_sin = protocol.load_labware("opentrons_96_tiprack_300ul", 6)

p20_sin = protocol.load_instrument("p20_single_gen2", "right", tip_racks=[tiprack_20_sin])
p300_sin = protocol.load_instrument("p300_single_gen2", "left", tip_racks=[tiprack_300_sin])


# In[156]:


#Input Tip start positions
p20_sin.starting_tip = tiprack_20_sin.well("A7")
p300_sin.starting_tip = tiprack_300_sin.well("D4")


# In[149]:


module_thermocycler.open_lid()


# In[54]:


#module_thermocycler.close_lid()


# In[157]:


p20_sin.pick_up_tip()


# In[115]:


#p20_sin.return_tip()


# In[158]:


p20_sin.aspirate(10, pro.wells()[5])


# In[159]:


p20_sin.move_to(assemble_plate.wells()[5].bottom().move(types.Point(0,0,0)))


# In[160]:


p20_sin.dispense(10, assemble_plate.wells()[5])


# In[161]:


p20_sin.mix(3, 3)


# In[ ]:


#p20_sin.touch_tip()


# In[162]:


p20_sin.drop_tip()


# In[ ]:





# In[ ]:





# ## Functional Transfer

# In[132]:


import pickle

# Load data
with open("/var/lib/jupyter/notebooks/assembly/data2.pickle", 'rb') as f:
    meta_data = pickle.load(f)


# In[ ]:


def part_transfer(pipette, volume, src, dest, delay_second, asp_rate=None, dis_rate=None, top_delay=0, mix_after=False):
    if asp_rate != None:
        pipette.flow_rate.aspirate=asp_rate
    if dis_rate != None:
        pipette.flow_rate.dispense=dis_rate            
    pipette.pick_up_tip()
    pipette.aspirate(volume, src)
    protocol.delay(seconds=delay_second)
    if top_delay == True:
        pipette.move_to(src.top(z=-3))
        protocol.delay(seconds=1)
    pipette.dispense(volume, dest)
    protocol.delay(seconds=delay_second/2)
    if type(mix_after) == tuple:
        try:
            pipette.flow_rate.aspirate=mix_after[2]
            pipette.flow_rate.dispense=mix_after[2]
        except:
            pass
        pipette.mix(mix_after[0], mix_after[1])
    pipette.blow_out()    
    pipette.drop_tip()


# In[133]:


meta_data


# In[134]:


data = meta_data[5]


# In[131]:


part_transfer(p20_sin, 10, tube_rack.wells_by_name()["A1"],
             assemble_plate.wells()[n], 0, 10, 10, 1, mix_after=(2,10))


# In[136]:


data


# In[163]:


n = 0

for i in range(1, len(data)):
    tmp = data['part' + str(i)]
    if tmp['plate'] == 'ext':
        part_transfer(p20_sin, 10, tube_rack.wells_by_name()["A1"],
             assemble_plate.wells()[n], 0, 10, 10, 1, mix_after=(2,10))
    else:
        part_transfer(p20_sin, 10, eval(tmp['plate']).wells_by_name()[tmp['well']],
                     assemble_plate.wells()[n], 0, 10, 10, 1, mix_after=(2,10))
    
    n+=1


# In[164]:


module_thermocycler.close_lid()


# In[138]:


#after protocol.home is running, can't reset the tiprack's position
protocol.home()


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:


profile = [{'temperature': 30, 'hold_time_minutes': 1},
            {'temperature': 80, 'hold_time_minutes': 1},
            {'temperature': 4, 'hold_time_minutes': 2}]
module_thermocycler.execute_profile(steps=profile, repetitions=1, block_max_volume=20)


# In[ ]:


module_thermocycler.deactivate()
module_thermocycler.open_lid()


# In[ ]:





# In[ ]:





# In[ ]:




