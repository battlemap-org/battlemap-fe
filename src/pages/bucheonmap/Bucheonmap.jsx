import React, { useState, useEffect } from "react";
import "./Bucheonmap.css";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

function Bucheonmap() {
  const [quest, setQuest] = useState("");
  const [topPlayer, setTopPlayer] = useState("");

  // 예시: API 호출 (비동기)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.example.com/bucheonmap-data"); // ✅ 실제 API 주소로 교체
        const data = await res.json();

        // 예시: API 응답 구조가 { quest: "...", topPlayer: "..." } 일 경우
        setQuest(data.quest);
        setTopPlayer(data.topPlayer);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header />

      <main className="bucheonmap-main">
        <div className="quest-card">
          {quest ? (
            <>
              📌오늘의 퀘스트: {quest}
              <br />
              ⭐️ 이번 시즌 Top Player: {topPlayer}
            </>
          ) : (
            <p>로딩 중...</p> // ✅ 데이터 로드 전 상태
          )}
        </div>

        <div className="bucheonmap-card">지도 들어갈 부분</div>
      </main>

      <Footer />
    </>
  );
}

export default Bucheonmap;
