import React, { useState, useEffect } from "react";
import "./StatusModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StatusModal({ onClose, areaName }) {
  const [ranking, setRanking] = useState([]);
  const [myNickname, setMyNickname] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRanking = async () => {
    if (!areaName) return;

    // 🔥 핵심: 공백·줄바꿈 제거
    const cleanAreaName = areaName.trim();

    console.log("🔥 areaName raw:", JSON.stringify(areaName));
    console.log("🔥 cleaned areaName:", JSON.stringify(cleanAreaName));

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://www.battlemap.kr/api/regions/부천시/dongs/${encodeURIComponent(
          cleanAreaName
        )}/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🔥 API RESPONSE:", res.data);

      const data = res.data.success;
      if (!data) {
        setRanking([]);
        return;
      }

      setRanking(data.top3 || []);
      if (data.me) setMyNickname(data.me.name);

      setIsConnected(true);
    } catch (err) {
      console.error(
        `🔥 [${areaName}] 랭킹 호출 에러:`,
        err.response?.data || err
      );
      setRanking([]);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, [areaName]);

  const handleGoToFilter = () => {
    navigate("/filter");
    onClose();
  };

  return (
    <div className="status-overlay" onClick={onClose}>
      <div className="status-card" onClick={(e) => e.stopPropagation()}>
        <div className="status-header">
          {areaName.trim()} 점령 현황
          <span
            className={`status-dot ${
              isConnected ? "connected" : "disconnected"
            }`}
          ></span>
          <span className="modal-close" onClick={onClose}>
            ✕
          </span>
        </div>

        {isLoading ? (
          <p>데이터 수신 대기 중...</p>
        ) : ranking.length > 0 ? (
          ranking.map((user, index) => (
            <div
              key={index}
              className={`rank-item ${user.name === myNickname ? "me" : ""}`}
            >
              <span
                className="rank-color"
                style={{ backgroundColor: user.userColorCode }}
              ></span>

              <span className="rank-name">{user.name}</span>

              <span className="rank-point">
                <img src="/assets/point.png" alt="포인트" />
                {user.point}
              </span>
            </div>
          ))
        ) : (
          <p>랭킹 정보가 없습니다.</p>
        )}

        <button className="status-conquer" onClick={handleGoToFilter}>
          탈취하기
        </button>
      </div>
    </div>
  );
}

export default StatusModal;
