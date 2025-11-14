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
    // areaName이 없으면 API를 호출하지 않음
    if (!areaName) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      // 클릭된 '동'의 리더보드 API 호출 (역곡동)
      const res = await axios.get(
        `https://www.battlemap.kr//api/regions/부천시/dongs/${encodeURIComponent(
          areaName
        )}/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.success;
      if (!data) return;
      setRanking(data.top3 || []);

      if (data.me) {
        setMyNickname(data.me.name);
      }

      setIsConnected(true);
    } catch (err) {
      console.error(`${areaName} 랭킹 불러오기 실패:`, err);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // areaName이 변경될 때마다 랭킹을 새로 불러옴
  useEffect(() => {
    fetchRanking();
  }, [areaName]);

  // 탈취하기 버튼 -> 필터페이지
  const handleGoToFilter = () => {
    navigate("/filter");
    onClose();
  };

  return (
    <div className="status-overlay" onClick={onClose}>
      <div className="status-card" onClick={(e) => e.stopPropagation()}>
        <div className="status-header">
          {areaName} 점령 현황
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
