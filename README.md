# Automated-protocol for synthetic biology

`Janus`, `Zephyr`, `OT-2` 등 서로 다른 Input을 받는 장비들이 동일한 연구노트 기반의 Input을 받아 프로토콜을 수행할 수 있도록 도와줄 Protocol Maker 필요  
또, 자주 사용되는 프로토콜의 Web 기반 UI를 제공 하여 다른 사용자들의 참여를 유도함.  

The Protocols are using in KRIBB Synthetic biology Research Center[(SBL)](https://oak.kribb.re.kr/handle/201005/19496/tab-browse?sort_by=2&order=DESC)  
Contact about Protocols : <sanekun@kribb.ac.kr>

## Machine

OT2 liquid-handler[(OT2)](https://opentrons.com/ot-2/)  

# Protocols  

* Every Protocol have own Setup Process and Web Programs refer to each README.md    

- [x] Nanopore: Ligation Sequencing Kit  
- [x] Cloning: PCR - Assembly - Transformation  

## Protocol Development flow  
1. Deck positioning, Reaction, Transformation 등 기본적인 골격을 함수 단위로 유지
2. 각자 실험에 필요한 프로토콜 자체 제작 후 사용
3. 공용으로 사용이 필요한 프로토콜 선정
4. 3에서 선정된 프로토콜의 Web-based UI, Expanded protocol (High-value machine) 제작.  

# Web Application

- [x] Cloning  

## Web Development flow
1. 외부에서 입력이 필요한 Parameter 선정 ex) Plate 위치, 이름 ...  
2. 동적 할당이 필요한 변수 선정 ex) 볼륨, 샘플 수 ...
3. `JSON` format 사용 예시 데이터 작성
4. 해당 데이터를 생성할 수 있는 Web UI 개발
5. Protocol과 연결 후 테스트
