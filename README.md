# BattleMap

> 관광을 플레이하다, 우리 팀의 색으로 도시를 점령하다.

관광지를 방문하고 퀘스트를 수행해 포인트를 획득하고,  
지역을 점령하며 다른 사용자와 경쟁하는 게임형 관광 활성화 서비스입니다.

<br>

## About BattleMap

기존의 관광은 관광지를 방문하고 정보를 확인하는 일방향적인 경험에 머무르는 경우가 많습니다.

**BattleMap**은 관광에 `퀘스트`, `포인트`, `지역 점령`, `랭킹` 요소를 결합하여  
사용자가 직접 참여하고 경쟁하며 지역을 탐색할 수 있도록 기획되었습니다.

관광지와 지역 문화를 하나의 게임 필드처럼 경험하며  
관광에 대한 새로운 방문 동기와 지속적인 참여 경험을 제공합니다.

<br>

## Main Features

### 지역 선택 및 점령 현황

사용자가 방문할 지역을 선택하고  
지역별 점령 현황을 확인할 수 있습니다.

### 관광지 및 장소 탐색

Kakao Map API를 활용해 지도 위에서 관광지와 주변 장소를 탐색할 수 있습니다.

### 장소 필터링

카페, 음식점 등 원하는 카테고리를 선택하여  
조건에 맞는 장소를 확인할 수 있습니다.

### Quest

각 장소에서 제공되는 퀘스트를 확인하고 미션에 참여할 수 있습니다.

퀘스트 수행을 통해 포인트를 획득하며  
획득한 포인트는 지역 점령 경쟁에 활용됩니다.

### 지역 점령

사용자의 활동 및 획득 포인트를 기반으로  
지역 점령 현황을 확인할 수 있습니다.

### League

사용자의 포인트를 기반으로 전체 순위를 확인하며  
다른 사용자들과 경쟁할 수 있습니다.

### Point & Reward

서비스 활동을 통해 획득한 포인트와  
교환 가능한 보상을 확인할 수 있습니다.

### Coupon

보유 중인 쿠폰을 확인하고  
쿠폰 상세 정보를 조회할 수 있습니다.

### My Page

프로필을 비롯해 포인트, 점령 현황, 쿠폰 등  
사용자의 활동 정보를 한곳에서 확인할 수 있습니다.

<br>

## Screens

| Onboarding | Login | Sign Up |
| :---: | :---: | :---: |
| 서비스 시작 화면 | 사용자 로그인 | 신규 사용자 회원가입 |

| Region | Map | Filter |
| :---: | :---: | :---: |
| 방문 지역 선택 | 주변 장소 탐색 | 카테고리별 장소 검색 |

| Quest | League | My Page |
| :---: | :---: | :---: |
| 장소별 퀘스트 참여 | 사용자 순위 확인 | 활동 및 보상 관리 |

<br>

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Kakao Map API](https://img.shields.io/badge/Kakao_Map_API-FFCD00?style=for-the-badge&logo=kakao&logoColor=000000)

| Category | Technology |
| --- | --- |
| Library | React |
| Language | JavaScript |
| Routing | React Router |
| Map | Kakao Map API |

<br>

## Project Structure

```text
src/
├── components/
│   ├── footer/
│   ├── header/
│   ├── resultmodal/
│   ├── statusmodal/
│   └── Layout.jsx
│
├── pages/
│   ├── bucheonmap/
│   ├── entirelevel/
│   ├── filter/
│   ├── join/
│   ├── login/
│   ├── myoccupy/
│   ├── onboarding/
│   ├── pickCafe/
│   ├── profile/
│   ├── questlist/
│   └── whereistoday/
│
├── App.jsx
├── Router.jsx
├── main.jsx
├── App.css
└── index.css
```

<br>

## User Flow

```text
서비스 접속
      │
      ▼
로그인 / 회원가입
      │
      ▼
오늘 방문할 지역 선택
      │
      ▼
지역 점령 현황 확인
      │
      ▼
지도에서 관광지 및 장소 탐색
      │
      ▼
카테고리 필터링 및 장소 선택
      │
      ▼
장소별 퀘스트 참여
      │
      ▼
포인트 획득
      │
      ▼
지역 점령 경쟁
      │
      ├───────────────┐
      ▼               ▼
리그 순위 확인    포인트 / 보상 확인
                      │
                      ▼
                   쿠폰 관리
```

<br>

## Team

### 잠파티티

| Member | GitHub | Frontend |
| :---: | :---: | --- |
| 고은우 | [@soletsgooooo](https://github.com/soletsgooooo) | 온보딩, 로그인, 회원가입, 지역 선택, 지역 점령 현황, 리그 |
| 김지선 | [@nin0nee](https://github.com/nin0nee) | 필터, 지도 및 장소 탐색, 장소 상세, 퀘스트 |
| 손윤아 | [@yunvring](https://github.com/yunvring) | 프로필, 포인트 및 보상, 쿠폰 |

<br>

## Expected Effects

### 참여형 관광 경험

단순히 관광지를 방문하는 방식에서 벗어나  
퀘스트 수행과 지역 점령을 통해 사용자가 직접 참여하는 관광 경험을 제공합니다.

### 지역 관광 활성화

관광지뿐만 아니라 주변 음식점과 카페 등 다양한 장소를 함께 탐색하도록 유도하여  
지역 내 관광 활동의 범위를 확장합니다.

### 지속적인 서비스 참여

포인트, 지역 점령, 리그 등의 경쟁 요소를 통해  
사용자가 반복적으로 서비스를 이용할 수 있는 동기를 제공합니다.

### 지역 문화 경험

관광지와 관련된 퀘스트를 수행하는 과정에서  
지역의 문화와 정보를 자연스럽게 접할 수 있습니다.

<br>

## Future Development

BattleMap은 향후 다음과 같은 기능으로 확장할 수 있습니다.

- 시즌별 점령 현황 및 랭킹 운영
- 퀘스트 성공에 따른 아이템 및 버프 시스템
- GPS 기반 관광지 방문 인증
- 경기관광공사 및 공공데이터 관광 정보 연동
- 관광 약자를 위한 무장애 관광 정보 제공
- 더 많은 지역 및 관광지로 서비스 범위 확대

<br>

---

<div align="center">

### BattleMap

**EXPLORE · QUEST · CAPTURE**


</div>
