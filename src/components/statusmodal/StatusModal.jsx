// src/pages/statusModal/StatusModal.jsx
import React, { useState, useEffect, useRef } from "react";
import "./StatusModal.css";
import { Client } from "@stomp/stompjs";

function StatusModal({ onClose, areaName, currentOwner, onConquer }) {
  const [ranking, setRanking] = useState([]);
  const [myInfo, setMyInfo] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const token = "YOUR_JWT_TOKEN_HERE";
  const areaId = areaName === "역곡동" ? "yeokgok-dong" : "unknown";
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws:/3.39.56.40:8080/ws",
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 1000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (msg) => console.log("[STOMP]", msg),
    });

    client.onConnect = () => {
      console.log("✅ WebSocket 연결됨");
      setIsConnected(true);

      client.subscribe(`/topic/league/${areaId}`, (message) => {
        const payload = JSON.parse(message.body);
        console.log("받은 메시지:", payload);

        switch (payload.type) {
          case "LEADERBOARD_SNAPSHOT":
          case "SCORE_UPDATED":
            setRanking(payload.data.leaderboard || []);
            break;
          case "ERROR":
            alert(payload.message || "에러 발생");
            break;
          default:
            console.log("Unhandled type:", payload.type);
        }
      });

      client.publish({
        destination: `/app/league/${areaId}/snapshot`,
        body: JSON.stringify({
          type: "SNAPSHOT_REQUEST",
          areaId,
        }),
      });
    };

    client.onDisconnect = () => {
      console.log(" WebSocket 연결 종료됨");
      setIsConnected(false);
    };

    client.onStompError = (frame) => {
      console.error(" STOMP 에러:", frame.headers["message"]);
      setIsConnected(false);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) clientRef.current.deactivate();
    };
  }, [areaId]);

  const handleConquer = () => {
    const myName = "김민지"; // 예시, 실제 로그인 정보로 교체 가능
    onConquer(areaName, myName);
    alert(`${areaName}을(를) 점령했습니다!`);
    onClose();
  };

  return (
    <div className="status-overlay" onClick={onClose}>
      <div className="status-card" onClick={(e) => e.stopPropagation()}>
        <div className="status-header">
          {areaName} 점령 현황{" "}
          <span
            className={`status-dot ${
              isConnected ? "connected" : "disconnected"
            }`}
          ></span>
        </div>

        {ranking.length > 0 ? (
          <>
            {ranking.slice(0, 3).map((user, index) => (
              <div key={index} className="rank-item">
                🏅 {index + 1}위 — {user.user} ({user.point}점)
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

        <button className="status-conquer" onClick={handleConquer}>
          {currentOwner ? "탈취하기" : "점령하기"}
        </button>
      </div>
    </div>
  );
}

export default StatusModal;
