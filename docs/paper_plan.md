Subject: How to make automated protocol for biology research  
Claim Point: 
  1. Automation, High-throughput 등 특정 분야에서만 Autoamted-Protocol이 쓰이고 실제 연구환경을 변경하지 못하는 이유  
  2. 단순 Automation, High-throughput이 아닌 실제 연구환경에 맞는 프로토콜을 만드는 방법  
  3. 그 예시


# 프로토콜 제작 방법

![image](https://github.com/sblabkribb/Automated-protocol/assets/67701541/4677972f-3bd9-41ad-81c3-cd108eb20f0e)
아래와 같이 세 부분으로 구분한 UI 사용

1. Add Protocol
    - 순서대로 진행할 프로토콜 붙이기
    - PCR, golden gate, Gibson, TF, Spotting ... (각 프로토콜 별 조건은 DB에 보관)
    - 각 프로토콜을 순서에 맞게 배치
    - 버튼 클릭 -> UI 생성
2. Reactions Tab (왼쪽)
    - Tab으로 나누어 Reaction들 구분하기
    - 각 Reaction의 세부적인 조건은 db를 만들어 외부에 저장 후 불러오기

3. Source & Destination Plate (오른쪽)
    - Reaction Table에 사용할 이름들 바로 볼 수 있게 Plate와 구분하기

4. Advanced Setting
    - 아래 쪽으로 빼서 추가적인 설정들 넣도록

# 논문 흐름

### Introduce

1. 자동화 장비들이 많이 보급되었지만 일반 연구자들의 실험을 대체하지 못하였다
2. Biofoundry를 중심으로 일부 high-throughput technology 에서만 사용되고 있다.
3. 우리가 흔히 사용하는 프로토콜을 대체하기위해선 연구자들이 사용하는 자연어로 장비를 동작시킬 수 있어야 한다.
4. Cloning을 예시로 이를 구현했다.

### 차이가 발생하는 이유 (자연어 - 기계어)

추상화를 예시로 더 낮은 단계를 사용해야한다

1. 연구자들은 자연어를 많은 부분이 추상화된 자연어를 사용함 (연구노트 예시)
2. 기계는 축약되지 않은 언어를 사용함 ex) Well A1 -> Well A2
3. 각 장비는 본질적인 동작은 동일하나(Liquid in Plate -> Liquid in Plate) 동작을 위한 언어가 다름
4. 위 세 이유는 Biology 연구자들이 자동화장비를 사용하는 허들이 됨

### How to make

1. 타겟 설정 - 자동화를 했을 때 얼마나 효과가 있을 지
2. 시나리오 작성
    1. 각 프로토콜 별 여러가지 시나리오들 작성 (변수확인 용)
    2. 받아들일 시나리오 선택
3. 변수 결정
    1. 어떤 부분을 조절 가능한 변수로 설정할 것인가 확실히 선정
    2. Input으로 무엇을 받을 것인지
4. 데이터 타입 및 UI 설정
    1. 데이터를 어떻게 저장 및 옮길 것인가.
    2. Input을 어떤 UI로 받을 것인가
5. Input Data 변환
    1. 기계어가 읽을 수 있는 언어로 변환
6. 5의 변환언어를 사용해 각 기계 별 프로토콜 작성
7. 테스트 및 디버깅
    1. 기본적으로 Manual과 100% 같게 할 수 없다 본인만의 프로토콜을 구축해야 할 것

### 결론

위와 같이 프로토콜을 만들 시 Computation에 익숙하지 않은 사람들도 충분히 사용가능한 프로토콜 제작 가능
공통된 프로토콜을 사용해 표준화 가속
일상적으로 사용하는 자연어와 같이 장비를 동작할 수 있게 함으로 데이터의 표준화 달성
