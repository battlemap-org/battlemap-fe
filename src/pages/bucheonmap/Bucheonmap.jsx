// Bucheonmap.jsx
import React, { useState, useEffect } from "react";
import "./Bucheonmap.css";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import StatusModal from "../../components/statusmodal/StatusModal";
import imageMapResize from "image-map-resizer";

function Bucheonmap() {
  const [quest, setQuest] = useState("");
  const [topPlayer, setTopPlayer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  // 점령 상태 관리
  const [territories, setTerritories] = useState({
    역곡동: { owner: "고은우", color: "#FFD700" },
    // 필요 시 초기값 더 추가 가능
  });

  useEffect(() => {
    setQuest("오늘의 미션을 수행하세요!");
    setTopPlayer("고은우");
  }, []);

  useEffect(() => {
    imageMapResize();
  }, []);

  // 클릭 시 모달 열기
  const handleAreaClick = (areaName) => {
    console.log(`${areaName} 클릭됨!`);
    setSelectedArea(areaName);
    setIsModalOpen(true);
  };

  //  점령 색상 업데이트 콜백
  const handleConquer = (areaName, newOwner) => {
    const colorMap = {
      고은우: "#FFD700",
      김민지: "#87CEFA",
      이하늘: "#98FB98",
      default: "#CCCCCC",
    };
    const newColor = colorMap[newOwner] || colorMap.default;

    setTerritories((prev) => ({
      ...prev,
      [areaName]: { owner: newOwner, color: newColor },
    }));
  };

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
          <div className="map-wrapper">
            <img
              src="/assets/bucheonmap.jpeg"
              useMap="#image-map"
              alt="부천 지도"
              className="bucheonmap-image"
            />

            {/* ✅ 점령 색 오버레이 */}
            {Object.entries(territories).map(([area, data]) => (
              <div
                key={area}
                className={`territory-overlay ${area}`}
                style={{
                  backgroundColor: data.color,
                  opacity: 0.4,
                }}
              />
            ))}

            {/* 클릭 가능한 영역 전체 */}
            <map name="image-map">
              {[
                "옥길동",
                "범박동",
                "계수동",
                "소사본동",
                "소사동",
                "괴안동",
                "심곡본동",
                "송내동",
                "상동",
                "중동",
                "약대동",
                "삼정동",
                "도당동",
                "여월동",
                "작동",
                "심곡동",
                "원미동",
                "춘의동",
                "내동",
                "오정동",
                "원종동",
                "고강동",
                "대장동",
              ].map((name) => {
                // coords 매핑 (동명: 좌표)
                const coordsMap = {
                  옥길동: "874,1163,35",
                  범박동: "725,1110,38",
                  계수동: "681,1193,24",
                  소사본동: "558,1078,74",
                  소사동: "572,927,31",
                  괴안동: "733,998,46",
                  심곡본동: "418,1017,47",
                  송내동: "257,966,51",
                  상동: "133,745,53",
                  중동: "327,740,86",
                  약대동: "317,579,21",
                  삼정동: "312,451,55",
                  도당동: "468,593,48",
                  여월동: "618,605,50",
                  작동: "787,606,58",
                  심곡동: "425,883,36",
                  원미동: "551,817,43",
                  춘의동: "663,720,40",
                  내동: "440,491,28",
                  오정동: "463,360,45",
                  원종동: "687,409,45",
                  고강동: "801,358,51",
                  대장동: "401,237,47",
                };

                return (
                  <area
                    key={name}
                    shape="circle"
                    coords={coordsMap[name]}
                    alt={name}
                    title={name}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAreaClick(name);
                    }}
                  />
                );
              })}
            </map>
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
