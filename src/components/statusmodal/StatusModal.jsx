// src/pages/statusModal/StatusModal.jsx
import React, { useState, useEffect, useRef } from "react";
import "./StatusModal.css";
import { Client } from "@stomp/stompjs";

function StatusModal({ onClose }) {
  const [ranking, setRanking] = useState([]);
  const [myInfo, setMyInfo] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const token = "YOUR_JWT_TOKEN_HERE";
  const areaId = "yeokgok-dong";
  const clientRef = useRef(null);
  useEffect(() => {
    const client = new Client({
      brokerURL:
        import.meta.env.MODE === "production"
          ? "ws://3.35.246.97:8081/ws"
          : "ws://3.35.246.97:8081/ws",
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 1000, // 자동 재연결 (1s → 2s → 5s → 30s)
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (msg) => console.log("[STOMP]", msg),
    });

    // 연결 성공
    client.onConnect = () => {
      console.log(" WebSocket 연결됨");
      setIsConnected(true);

      // 지역 리그 구독
      client.subscribe(`/topic/league/${areaId}`, (message) => {
        const payload = JSON.parse(message.body);
        console.log("받은 메시지:", payload);

        switch (payload.type) {
          case "LEADERBOARD_SNAPSHOT":
            setRanking(payload.data.leaderboard || []);
            break;
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

      // 스냅샷 요청 (최초 1회)
      client.publish({
        destination: `/app/league/${areaId}/snapshot`,
        body: JSON.stringify({
          type: "SNAPSHOT_REQUEST",
          areaId,
        }),
      });
    };

    // 연결 종료 시
    client.onDisconnect = () => {
      console.log(" WebSocket 연결 종료됨");
      setIsConnected(false);
    };

    client.onStompError = (frame) => {
      console.error(" STOMP 에러:", frame.headers["message"]);
      setIsConnected(false);
    };

    //  연결 시작
    client.activate();
    clientRef.current = client;

    //  언마운트 시 정리
    return () => {
      if (clientRef.current) clientRef.current.deactivate();
    };
  }, []);

  return (
    <div className="status-overlay" onClick={onClose}>
      <div
        className="status-card"
        onClick={(e) => e.stopPropagation()} // 배경 클릭 시만 닫히게
      >
        <div className="status-header">
          역곡동 점령 현황{" "}
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

        <button className="status-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default StatusModal;
