import React, { useState, useEffect } from "react";
import "./Bucheonmap.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import StatusModal from "../../components/statusmodal/StatusModal";
import axios from "axios";

function Bucheonmap() {
  const [quest, setQuest] = useState("");
  const [topPlayer, setTopPlayer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [dongList, setDongList] = useState([]);
  
  // 역곡동 1등의 색상을 저장
  const [yeokgokdongColor, setYeokgokdongColor] = useState("#cccccc");

  const coordsMap = {
    대장동: { x: 140, y: 79 },
    삼정동: { x: 110, y: 157 },
    오정동: { x: 160, y: 130 },
    고강동: { x: 280, y: 127 },
    원종동: { x: 240, y: 145 },
    내동: { x: 155, y: 173 },
    도당동: { x: 165, y: 205 },
    여월동: { x: 215, y: 205 },
    작동: { x: 275, y: 210 },
    상동: { x: 47, y: 265 },
    중동: { x: 115, y: 260 },
    약대동: { x: 115, y: 210 },
    춘의동: { x: 225, y: 250 },
    역곡동: { x: 246, y: 310 },
    괴안동: { x: 256, y: 350 },
    범박동: { x: 256, y: 390 },
    옥길동: { x: 308, y: 405 },
    송내동: { x: 85, y: 333 },
    심곡동: { x: 165, y: 310 },
    심곡본동: { x: 145, y: 360 },
    소사동: { x: 195, y: 325 },
    소사본동: { x: 197, y: 373 },
    원미동: { x: 195, y: 285 },
    계수동: { x: 242, y: 420 },
  };

  // 1) 퀘스트 + 전체 리더보드 (유지)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get("http://3.39.56.40:8080/api/regions/부천시/leaderboard", { headers })
      .then((res) => {
        const top1 = res.data.success.leaderboard?.[0]?.nickname;
        if (top1) setTopPlayer(top1);
      });

    axios
      .get("http://3.39.56.40:8080/api/quests/today", { headers })
      .then((res) => {
        const q = res.data.success?.todayContent;
        if (q) setQuest(q);
      })
      .catch(() => setQuest("퀘스트를 불러오는 데 실패했습니다."));
  }, []);

  // 2) 동 목록 불러오기 (유지)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get("http://3.39.56.40:8080/api/regions/부천시/dongs", { headers })
      .then((res) => {
        const list = res.data;
        if (list) setDongList(list);
      });
  }, []);

  // 역곡동 1등 색상만 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchYeokgokdongOwner = async () => {
      try {
        const res = await axios.get(
          `http://3.39.56.40:8080/api/regions/부천시/dongs/${encodeURIComponent(
            "역곡동"
          )}/leaderboard`,
          { headers }
        );
        // API 명세서(top3)에 따라 1등 정보를 가져옴
        const topUser = res.data.success?.top3?.[0];
        if (topUser && topUser.userColorCode) {
          setYeokgokdongColor(topUser.userColorCode);
        } else {
          setYeokgokdongColor("#cccccc"); // 데이터가 없으면 기본색
        }
      } catch (err) {
        console.error("역곡동 1등 정보 로딩 실패:", err);
        setYeokgokdongColor("#cccccc"); // 오류 시 기본색
      }
    };

    fetchYeokgokdongOwner();
  }, []);

  // '역곡동'만 클릭되도록 수정
  const handleAreaClick = (dongName) => {
    if (dongName === "역곡동") {
      setSelectedArea(dongName);
      setIsModalOpen(true);
    } else {
      alert("현재 '역곡동'의 점령 현황만 조회할 수 있습니다.");
    }
  };

  return (
    <>
      <Header />
      <main className="bucheonmap-main">
        <div className="quest-card">
          📌 오늘의 퀘스트: {quest || "로딩 중..."}
          <br />
          ⭐️ Top Player: {topPlayer || "로딩 중..."}
        </div>

        <div className="bucheonmap-card">
          <div className="map-wrapper">
            <img
              src="/assets/bucheonmap.jpeg"
              alt="부천 지도"
              className="bucheonmap-image"
            />

            {dongList.map((dong) => {
              const pos = coordsMap[dong.dongName];
              if (!pos) return null;

              const isYeokgokdong = dong.dongName === "역곡동";
              const markerColor = isYeokgokdong ? yeokgokdongColor : "#cccccc";

              return (
                <div
                  key={dong.dongId}
                  className="dong-marker"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    backgroundColor: markerColor,
                    cursor: isYeokgokdong ? "pointer" : "default",
                  }}
                  onClick={() => handleAreaClick(dong.dongName)}
                >
                  {dong.dongName}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />

      {isModalOpen && (
        <StatusModal
          onClose={() => setIsModalOpen(false)}
          areaName={selectedArea}
        />
      )}
    </>
  );
}

export default Bucheonmap;