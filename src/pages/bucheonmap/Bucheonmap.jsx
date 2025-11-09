// Bucheonmap.jsx
import React, { useState, useEffect } from "react";
import "./Bucheonmap.css";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import StatusModal from "../../components/statusmodal/StatusModal";
import imageMapResize from "image-map-resizer"; // ✅ ➊ 추가

function Bucheonmap() {
  const [quest, setQuest] = useState("");
  const [topPlayer, setTopPlayer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setQuest("역곡동에서 오늘의 미션을 수행하세요!");
    setTopPlayer("고은우");
  }, []);

  // ✅ ➋ 이미지맵 리사이저 실행 (좌표 자동 조정)
  useEffect(() => {
    imageMapResize();
  }, []);

  return (
    <>
      <Header />
      <main className="bucheonmap-main">
        <div className="quest-card">
          {quest ? (
            <>
              📌 오늘의 퀘스트: {quest}
              <br />
              ⭐️ 이번 시즌 Top Player: {topPlayer}
            </>
          ) : (
            <p>로딩 중...</p>
          )}
        </div>

        <div className="bucheonmap-card">
          {/* 이미지맵 */}
          <img
            src="/assets/bucheonmap.jpeg"
            useMap="#image-map"
            alt="부천 지도"
            className="bucheonmap-image"
          />

          <map name="image-map">
            {/* 첫 번째 클릭 영역 */}
            <area
              shape="circle"
              coords="695,873,76"
              alt="역곡동"
              title="역곡동"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log("역곡동 클릭됨!");
                setIsModalOpen(true);
              }}
            />
          </map>
        </div>
      </main>

      <Footer />
      {isModalOpen && <StatusModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default Bucheonmap;
