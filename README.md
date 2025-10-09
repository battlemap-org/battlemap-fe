<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
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

### 💻 개발 세팅
nvm install 22
nvm use 22 
rm -rf node_modules
rm package-lock.json
npm install
npm run dev


### 🔹 Pull Request 규칙
PR 진행 시 팀원과 상호 연락
코드 리뷰 후 merge
merge 완료 시 feature 브랜치 삭제

### 🔹 브랜치 네이밍 규칙
형식: feat/{기능명}

```bash
예시:
feat/Onboarding
feat/Onboarding-moreInformation (세분화 시 -추가 키워드)
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
 긴급 수정 외에는 main 직접 푸시 금지
 기능 작업은 feature 브랜치 → dev → main 흐름 고정
>>>>>>> bc11b5198b389a485c24d637c5ad1e0568cc7df3
