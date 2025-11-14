import "./Myoccupy.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";

function Myoccupy() {
  const [areas, setAreas] = useState([]);

  const fetchMyAreas = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://www.battlemap.kr/api/users/me/cities/부천시/dongs/points-and-quests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("역곡동 점령 현황:", res.data);

      const data = res.data.success;

      const real =
        Array.isArray(data) && data.length > 0
          ? {
              dongName: data[0].dongName,
              myPoint: data[0].myPoint,
              completedQuestCount: data[0].completedQuestCount,
            }
          : {
              dongName: "역곡동",
              myPoint: 0,
              completedQuestCount: 0,
            };

      const dummy = [
        { dongName: "중동", myPoint: 0, completedQuestCount: 0 },
        { dongName: "원미동", myPoint: 0, completedQuestCount: 0 },
      ];

      setAreas([real, ...dummy]);
    } catch (err) {
      console.error("점령 현황 불러오기 실패:", err);

      setAreas([
        { dongName: "역곡동", myPoint: 0, completedQuestCount: 0 },
        { dongName: "중동", myPoint: 0, completedQuestCount: 0 },
        { dongName: "원미동", myPoint: 0, completedQuestCount: 0 },
      ]);
    }
  };

  useEffect(() => {
    fetchMyAreas();
  }, []);

  return (
    <div>
      <div className="header-section">
        <Header />
      </div>

      <div className="occupy-page">
        <div className="occupy-title">나의 점령 현황</div>

        {areas.length === 0 ? (
          <p className="empty-message">점령한 동이 없습니다.</p>
        ) : (
          areas.map((area) => (
            <div key={area.dongName} className="dong-card">
              <h3>{area.dongName}</h3>
              <p>
                <img
                  src="/assets/point.png"
                  alt="포인트 아이콘"
                  className="pointicon"
                />
                나의 포인트: {area.myPoint}P
              </p>
              <p>
                <img
                  src="/assets/quest.png"
                  alt="퀘스트 아이콘"
                  className="questicon"
                />
                완료한 퀘스트 수: {area.completedQuestCount}개
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Myoccupy;
