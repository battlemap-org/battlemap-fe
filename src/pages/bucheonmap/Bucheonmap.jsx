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

  // 오늘의 퀘스트 ID 저장 (인증에 필요)
  const [todayQuestId, setTodayQuestId] = useState(null);

  // 역곡동 색상
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
    옥길동: { x: 305, y: 405 },
    송내동: { x: 85, y: 333 },
    심곡동: { x: 150, y: 310 },
    심곡본동: { x: 145, y: 360 },
    소사동: { x: 195, y: 325 },
    소사본동: { x: 197, y: 373 },
    원미동: { x: 195, y: 285 },
    계수동: { x: 242, y: 420 },
  };

  // 전체 리더보드 + 오늘의 퀘스트 텍스트(GET)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // Top 사용자
    axios
      .get("https://www.battlemap.kr/api/regions/부천시/leaderboard", {
        headers,
      })
      .then((res) => {
        const top1 = res.data.success.leaderboard?.[0]?.nickname;
        if (top1) setTopPlayer(top1);
      });

    // 오늘의 퀘스트 텍스트 + todayQuestId (GET)
    axios
      .get("https://www.battlemap.kr/api/quests/today", { headers })
      .then((res) => {
        const q = res.data.success?.todayContent;
        const id = res.data.success?.todayQuestId;

        if (q) setQuest(q);
        if (id) setTodayQuestId(id);
      })
      .catch(() => setQuest("퀘스트를 불러오는 데 실패했습니다."));
  }, []);

  // 동 목록 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get("https://www.battlemap.kr/api/regions/부천시/dongs", { headers })
      .then((res) => {
        const list = res.data;
        if (list) setDongList(list);
      });
  }, []);

  // 인증 요청
  const verifyTodayQuest = () => {
    if (!todayQuestId) return;

    const token = localStorage.getItem("token");

    axios
      .post(
        `https://www.battlemap.kr/api/quests/${todayQuestId}/answers-today`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.success?.correct) {
          console.log("🎉 인증 성공!");
        } else {
          console.log(res.data.success?.message);
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.error?.message || "인증 실패";
        console.log(msg);
      });
  };

  // 역곡동 1등 색상
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(
        `https://www.battlemap.kr/api/regions/부천시/dongs/${encodeURIComponent(
          "역곡동"
        )}/leaderboard`,
        { headers }
      )
      .then((res) => {
        const topUser = res.data.success?.top3?.[0];
        if (topUser?.userColorCode) {
          setYeokgokdongColor(topUser.userColorCode);
        } else {
          setYeokgokdongColor("#cccccc");
        }
      })
      .catch(() => setYeokgokdongColor("#cccccc"));
  }, []);

  const handleAreaClick = (dongName) => {
    if (dongName === "역곡동") {
      verifyTodayQuest();
      setSelectedArea(dongName);
      setIsModalOpen(true);
    } else {
      alert("현재는 '역곡동'에서만 인증할 수 있습니다.");
    }
  };

  return (
    <>
      <Header />
      <main className="bucheonmap-main">
        {/* --- 수정된 부분 (quest-card) --- */}
        <div className="quest-card">
          <div>
            {" "}
            {/* 텍스트 정렬을 위해 div로 한번 감싸줍니다. */}
            📌 <strong>오늘의 퀘스트:</strong> {quest || "로딩 중..."}
            <br />
            ⭐️ <strong>이번 시즌 부천시 Top Player:</strong>{" "}
            {topPlayer || "로딩 중..."}
          </div>
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
                    cursor: "pointer",
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
