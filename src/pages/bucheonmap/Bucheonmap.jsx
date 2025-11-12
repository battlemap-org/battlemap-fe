import React, { useState, useEffect } from "react";
import "./Bucheonmap.css";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import StatusModal from "../../components/statusmodal/StatusModal";
import axios from "axios";

// [수정] colorMap을 밖으로 빼서 재사용 (효율성)
const colorMap = {
  하늘: "#FFD700",
  고은우: "#FFD700",
  김민지: "#87CEFA",
  이하늘: "#98FB98",
  default: "#CCCCCC",
};

function Bucheonmap() {
  // [수정] 컴포넌트 최상단에 있던 token, headers 정의 삭제
  // (useEffect 안에서 정의하는 게 더 정확함)

  const [quest, setQuest] = useState("");
  const [topPlayer, setTopPlayer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [dongList, setDongList] = useState([]);
  const [territories, setTerritories] = useState({});

  // 1. 전체 리더보드 (이건 원래 잘 되어있었음)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get("http://3.39.56.40:8080/api/regions/부천시/leaderboard", { headers })
      .then((res) => {
        const data = res.data;
        if (data.result === "Success" && data.success.leaderboard.length > 0) {
          const top1 = data.success.leaderboard[0].nickname;
          setTopPlayer(top1);
        }
      })
      .catch((err) => {
        console.error("리더보드 불러오기 실패:", err);
      });

    axios
      .get("http://3.39.56.40:8080/api/quests/today", { headers }) // 👈 ⚠️ 이 주소 확인해!
      .then((res) => {
        const data = res.data;
        if (data.result === "Success" && data.success.todayContent) {
          setQuest(data.success.todayContent); // 👈 API 응답으로 state 설정
        }
      })
      .catch((err) => {
        console.error("오늘의 퀘스트 불러오기 실패:", err);
        setQuest("퀘스트를 불러오는 데 실패했습니다.");
      });

    // 💥 [삭제] 하드코딩된 퀘스트 삭제
    // setQuest("역곡동에서 오늘의 미션을 수행하세요!"); 👈 이 줄 삭제됨
  }, []); // [] : 컴포넌트 마운트 시 1회 실행

  // 2. 각 동 목록 + 각 동 점령자 색칠 (💥 401 에러 수정)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://3.39.56.40:8080/api/regions/부천시/dongs",
          { headers }
        );
        const data = res.data;

        if (data.result !== "Success" || !data.success.regionList) return;
        const dongs = data.success.regionList;
        setDongList(dongs);

        // 💥 [수정] colorMap 정의를 밖으로 뺐음

        const requests = dongs.map((dong) =>
          axios
            .get(
              `http://3.39.56.40:8080/api/regions/부천시/dongs/${encodeURIComponent(
                dong.dongName
              )}/leaderboard`,
              { headers } // 👈 2. 헤더 추가
            )
            .then((res2) => {
              // ⚠️ .name이 맞는지 .nickname이 맞는지 백엔드 응답 확인해봐
              const top1 = res2.data.success.top3?.[0]?.name;
              return { dongName: dong.dongName, owner: top1 || null };
            })
            .catch(() => ({ dongName: dong.dongName, owner: null }))
        );

        const results = await Promise.all(requests);

        const newTerritories = {};
        results.forEach(({ dongName, owner }) => {
          newTerritories[dongName] = {
            owner,
            color: colorMap[owner] || colorMap.default,
          };
        });

        setTerritories(newTerritories);
      } catch (err) {
        // 💥 401 에러 뜨면 여기서 잡힐 거임
        console.error("점령 정보 불러오기 실패 (401 에러 아닌지 확인):", err);
      }
    };

    fetchData();
  }, []); // token이 바뀌어도 갱신 안 되니까, 로그인 풀리면 새로고침해야 함

  const handleAreaClick = (dongName) => {
    console.log(`${dongName} 클릭됨!`);
    setSelectedArea(dongName);
    setIsModalOpen(true);
  };

  const handleConquer = (dongName, newOwner) => {
    // 💥 [수정] colorMap 참조 (밖으로 뺀 것)
    const newColor = colorMap[newOwner] || colorMap.default;

    setTerritories((prev) => ({
      ...prev,
      [dongName]: { owner: newOwner, color: newColor },
    }));

    // ⚠️ [경고] 여기에 서버로 POST/PATCH 하는 API 호출 코드가 빠져있음
    // ⚠️ 지금은 새로고침하면 점령한 거 날아감
    console.warn("로컬 점령만 성공. 서버 저장은 구현 안 됨.");
  };

  // ... (convertToPixel 함수 동일) ...
  const convertToPixel = (lat, lon) => {
    const latMin = 37.45;
    const latMax = 37.55;
    const lonMin = 126.75;
    const lonMax = 126.83;

    const x = ((lon - lonMin) / (lonMax - lonMin)) * 800;
    const y = (1 - (lat - latMin) / (latMax - latMin)) * 1100;

    return { x, y };
  };

  return (
    <>
      <Header />
      <main className="bucheonmap-main">
        {/* ... (quest-card) ... */}
        <div className="quest-card">
          📌 오늘의 퀘스트: {quest || "로딩 중..."}
          <br />
          ⭐️ 이번 시즌 Top Player: {topPlayer || "로딩 중..."}
        </div>

        <div className="bucheonmap-card">
          <div className="map-wrapper">
            <img
              src="/assets/bucheonmap.jpeg"
              alt="부천 지도"
              className="bucheonmap-image"
            />

            {dongList.map((dong) => {
              const pos = convertToPixel(dong.latitude, dong.longitude);
              const territory = territories[dong.dongName];
              return (
                <div
                  key={dong.dongId}
                  className="dong-marker"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    backgroundColor: territory?.color || "#cccccc",
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
          currentOwner={territories[selectedArea]?.owner}
          onConquer={handleConquer}
        />
      )}
    </>
  );
}

export default Bucheonmap;
