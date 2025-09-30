# 🗺️ Battlemap-FE

Frontend repository for Battlemap project

---

## 🚀 Git Flow 규칙

### 브랜치 구조
- **main** : 최종 배포 버전 (🚫 dev 외 다른 브랜치에서 merge 금지)  
- **dev** : 개발 단계, feature 브랜치에서만 merge  
- **feature** : 기능 단위 작업 브랜치 (작업 완료 시 dev에 PR → merge 후 삭제)

### 작업 시작 전
```bash
cd sijangtong-fe   # 디렉토리 이동
npm install        # dependency 최신화
npm run dev        # 개발 서버 실행

