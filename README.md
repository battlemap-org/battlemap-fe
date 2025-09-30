- 깃 플로우
    
    https://puleugo.tistory.com/107
    
    본 프로젝트에선
    main | dev | feature
    
    세가지 사용
    
    main-최종 배포 버젼 - dev 에서만 올라감
    
    dev - 개발진행단계 - feature의 소스
    
    feat - 기능 단위 개발 브랜치 - 완료 후 소거
    

- **작업 시작 할 때 준수 사항**
    
    `cd sijangtong-fe` 를 통해 디렉토리 타켓팅
    
    `npm install` 통해 dependency 등 최신화
    
    이후 `npm run dev`
    
- PR 진행하면 상호 연락 // 코드 리뷰 후 merge
- 브랜치이름 - PART 에서 구분한 페이지 넘버 기준 (기존 은우 온보딩 브랜치 방식)
    - 기능 상세로 인한 브랜치 세분화 필요하면 ‘-’ 추가하여 추가 키워드
    - ex)**feat/1.1-Onboarding-more information**

- Router.jsx 외 파일 조작 시 내용 공유(작업 과정 충돌 방지)
- 디렉토리 규칙
    - pages/components 구분
    - 디렉토리의 하위 디렉토리 생성하여 그룹화
        - 기준은 PART 에서 구분된 페이지 그룹 혹은 자체 판단
        - 예를 들어 지도(2. MAP) 에 관련되어있는 MarketMap.jsx, StoreList.jsx 가 있다면
        src\pages\map 디렉토리에 MarketMap.jsx, StoreList.jsx 생성
    - pages 에 .jsx, .css 동시 관리
    - 이미지(png jpeg 등)는 public\assets 에 저장
        - 이미지 다량 발생 시 구분 위한 디렉토리 생성 가능
        - 이미지 이름으로 어느정도 구분 가능하도록 작명# battlemap-fe
Frontend repository for Battlemap project
