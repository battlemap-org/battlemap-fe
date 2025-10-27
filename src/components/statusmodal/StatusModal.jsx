// src/pages/statusModal/StatusModal.jsx
import React, { useState, useEffect } from "react";
import "./StatusModal.css";

function StatusModal() {
  const [ranking, setRanking] = useState([]); // 전체 랭킹
  const [myInfo, setMyInfo] = useState(null); // 나의 점수
  const [isConnected, setIsConnected] = useState(false); // 연결 상태

  useEffect(() => {
    // 백엔드 WebSocket 완성 후 여기 코드 추가
  }, []);

  return (
    <div className="status-card">
      <div className="status-header">
        역곡동 점령 현황{" "}
        <span
          className={`status-dot ${isConnected ? "connected" : "disconnected"}`}
        ></span>
      </div>

      {ranking.length > 0 ? (
        <>
          {ranking.slice(0, 3).map((user, index) => (
            <div key={index} className="rank-item">
              {index === 0}
              {index === 1}
              {index === 2}
              {user.user} — {user.point}점
            </div>
          ))}
          {myInfo && (
            <div className="me">
              <strong>나:</strong> {myInfo.user} — {myInfo.point}점
            </div>
          )}
        </>
      ) : (
        <p>데이터 수신 대기 중...</p>
      )}
    </div>
  );
}

export default StatusModal;
