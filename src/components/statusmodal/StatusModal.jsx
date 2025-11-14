import React, { useState, useEffect } from "react";
import "./StatusModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StatusModal({ onClose, areaName }) {
  const [ranking, setRanking] = useState([]);
  const [myNickname, setMyNickname] = useState("");
  const [myColor, setMyColor] = useState("#cccccc");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRanking = async () => {
    setIsLoading(true);

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

      const currentLeaderboard = data.leaderboard || [];
      setRanking(currentLeaderboard);
      setMyNickname(data.myNickname);
      setIsConnected(true);

      const myData = currentLeaderboard.find(
        (user) => user.nickname === data.myNickname
      );
      if (myData) {
        setMyColor(myData.userColorCode);
      }
    } catch (err) {
      console.error("랭킹 불러오기 실패:", err);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
    const interval = setInterval(fetchRanking, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleGoToFilter = () => {
    navigate("/filter");
    onClose(); // 페이지 이동 후 모달 닫기
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