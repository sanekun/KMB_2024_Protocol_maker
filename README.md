# SBL OT2 protocols

OT2 liquid-handler[(OT2)](https://opentrons.com/ot-2/) Protocols for Synthetic Biology 

The Protocols are using in KRIBB Synthetic biology Research Center[(SBL)](https://oak.kribb.re.kr/handle/201005/19496/tab-browse?sort_by=2&order=DESC)  
Contact about Protocols : <sanekun@kaist.ac.kr>

# Protocols  

* Every Protocol have own Setup Process and Web Programs refer to each README.md    

[v] Nanopore: Ligation Sequencing Kit
[v] NEBuilder HiFi Assembly: PCR - Assembly - Transformation

# Web Application

[ ] Plate Registeration
[v] NEBuilder HiFi Assembly

# Flow
Plate, Reaction, Transformation 등 기본적인 골격을 함수 단위로 유지  
Tip 수 등 각 프로토콜마다 달라지는 값들을 protocol.py 안에 개별적으로 관리  
해당 프로토콜에서 함수를 불러와서 계산 후 생성