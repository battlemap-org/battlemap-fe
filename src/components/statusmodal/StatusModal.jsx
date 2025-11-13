// src/pages/statusModal/StatusModal.jsx
import React, { useState, useEffect } from "react";
import "./StatusModal.css";
import axios from "axios";

function StatusModal({ onClose, areaName, currentOwner, onConquer }) {
  const [ranking, setRanking] = useState([]);
  const [myNickname, setMyNickname] = useState(""); // ⭐ 내 닉네임 저장
  const [isConnected, setIsConnected] = useState(false);

  const fetchRanking = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://3.39.56.40:8080/api/regions/부천시/leaderboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.success;
      if (!data) return;

      setRanking(data.leaderboard || []);
      setMyNickname(data.myNickname); // ⭐ 내 닉네임 설정
      setIsConnected(true);
    } catch (err) {
      console.error("랭킹 불러오기 실패:", err);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    fetchRanking();
    const interval = setInterval(fetchRanking, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleConquer = () => {
    const myName = myNickname; // ⭐ 자동으로 로그인된 유저 이름 사용
    onConquer(areaName, myName);
    alert(`${areaName}을(를) 점령했습니다!`);
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

        {ranking.length > 0 ? (
          ranking.map((user, index) => (
            <div
              key={index}
              className={`rank-item ${
                user.nickname === myNickname ? "me" : ""
              }`}
            >
              <span
                className="rank-color"
                style={{ backgroundColor: user.userColorCode }}
              ></span>

              <span className="rank-name">{user.nickname}</span>

              <span className="rank-point">
                <img src="/assets/point.png" alt="포인트" />
                {user.totalPoints}
              </span>
            </div>
          ))
        ) : (
          <p>데이터 수신 대기 중...</p>
        )}

        <button className="status-conquer" onClick={handleConquer}>
          {currentOwner ? "탈취하기" : "점령하기"}
        </button>
      </div>
    </div>
  );
}

export default StatusModal;
