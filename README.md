# 🗺️ Battlemap-FE

Frontend repository for Battlemap project

### ⚙️ 개발 환경
Node.js: 22 (📌 .nvmrc 참고)
패키지 매니저: npm
프레임워크: React + Vite
라우터: React Router v6

### 🎨 개발 가이드라인
스타일: TailwindCSS + Pretendard
전역 스타일: src/styles/index.css
Utility-first 접근 → 가능한 Tailwind class 사용 (별도 CSS 최소화)
색상/spacing 단위는 필요 시 tailwind.config.js에서 커스터마이징

### 🔹 Pull Request 규칙
PR 진행 시 팀원과 상호 연락
코드 리뷰 후 merge
merge 완료 시 feature 브랜치 삭제

### 🔹 브랜치 네이밍 규칙
형식: feat/{PART-페이지번호}-{기능명}

```bash
예시:
feat/1.1-Onboarding
feat/1.1-Onboarding-moreInformation (세분화 시 -추가 키워드)
```

⚠️ Router.jsx 외 파일 변경 시 → 반드시 팀원에게 작업 내용 공유 (충돌 방지)

### 📂 디렉토리 구조 규칙
```bash
src/
 ├── pages/
 │    ├── map/
 │    │    ├── MarketMap.jsx
 │    │    ├── StoreList.jsx
 │    └── onboarding/
 │         ├── Onboarding.jsx
 │         ├── Onboarding.css
 │
 └── components/
```

pages : 페이지 단위 컴포넌트 (.jsx, .css 함께 관리)
components : 공용 컴포넌트
하위 디렉토리 생성 : PART 기준 페이지 그룹 혹은 자체 판단

### 🖼️ Assets 관리
경로: public/assets
이미지가 많을 경우 하위 디렉토리 생성 가능
파일명으로 어떤 용도인지 알 수 있도록 작명

### 📦 Scripts
npm run dev : 개발 서버 실행
npm run build : 프로덕션 빌드
npm run preview : 빌드 미리보기
npm run lint : 코드 검사 (ESLint)

### ✅ 협업 체크리스트
 작업 시작 시 브랜치 생성 (feat/...)
 npm install 로 dependency 최신화
 공유 파일(Router.jsx 등) 수정 시 팀에 공지
 기능 단위로 PR 생성
 코드 리뷰 완료 후 merge → feature 브랜치 삭제
