# SBL OT2 protocols

OT2 liquid-handler[(OT2)](https://opentrons.com/ot-2/) Protocols for Synthetic Biology 

The Protocols are using in KRIBB Synthetic biology Research Center[(SBL)](https://oak.kribb.re.kr/handle/201005/19496/tab-browse?sort_by=2&order=DESC)  
Contact about Protocols : <tjdrns227@gmail.com>

# Protocols  

## Verified Protocols

* Every Protocol have own Setup Process and Programs refer to each README.md    
  

**Nanopore** : For construction of nanopore sequencing library (Ligation Sequencing Kit)  

**well_pooling.py** : Pool every wells from 96 well plate.  

**Tag_dispense** : Dispense the Tagging Primer according to column and row.   

**DNAssembler** : Use [Streamlit](https://docs.streamlit.io/library/get-started/installation) DNA part assembly, golden gate assembly, DNA library generation (Refer to Own repository)

# Usage

<img src = "https://raw.githubusercontent.com/Lelp27/automated-protocol-ot2/main/streamlit_main.png" width="30%" height="30%">

* Use Streamlit Web App for handling parameters.  

* The Docker containers are getting ready.  
``` bash
docker pull tjdrns27/streamlit:v0.2

docker run --rm -it -p 5001:5001 tjdrns27/streamlit:v0.2
```
* if you run docker, The Web Applications automatically run.

## In preparation

**Plate_replication** : Replicate 96-well plate according to specified column and row.  
