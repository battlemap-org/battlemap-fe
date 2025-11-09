import React, { useEffect, useState } from "react";
import "./Entirelevel.css";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
//import axios from "axios";

// ✅ API에서 랭킹 불러오기
const fetchRanking = async () => {
  try {
    const res = await axios.get("http://3.35.246.97:8081/api/leaderboard");
    console.log("📡 랭킹 데이터:", res.data);

    // 백엔드에서 데이터 형태가 아래와 같다고 가정:
    // { leaderboard: [...], me: { rank: 4, name: "이하느니", point: 1550 } }
    setRanking(res.data.leaderboard);
    setMyInfo(res.data.me);
  } catch (error) {
    console.error("❌ 랭킹 불러오기 실패:", error);
    alert("랭킹 데이터를 불러오는 중 오류가 발생했습니다.");
  }
};

//   // API에서 랭킹 불러오기
//   const fetchRanking = async () => {
//     try {
//       const res = await axios.get("http://3.35.246.97:8081/api/leaderboard");
//       console.log("랭킹 데이터:", res.data);

//       // 백엔드에서 데이터값에 따라 변경
//       // { leaderboard: [...], me: { rank: 4, name: "이하느니", point: 1550 } }
//       setRanking(res.data.leaderboard);
//       setMyInfo(res.data.me);
//     } catch (error) {
//       console.error("랭킹 불러오기 실패:", error);
//       alert("랭킹 데이터를 불러오는 중 오류가 발생했습니다.");
//     }
//   };

//   //API 호출하는 부분
//   useEffect(() => {
//     fetchRanking();
//   }, []);

function Entirelevel() {
  const [ranking, setRanking] = useState([]);
  const [myInfo, setMyInfo] = useState(null);

  //목데이터 집어넣음 추후 api 개발 후에 바로 연결
  const mockData = {
    leaderboard: [
      { rank: 1, name: "손윤아", point: 1750 },
      { rank: 2, name: "장주은", point: 1600 },
      { rank: 3, name: "고은우", point: 1650 },
      { rank: 4, name: "이하느니", point: 1550 },
      { rank: 5, name: "김희진", point: 1400 },
      { rank: 6, name: "김민지", point: 1200 },
      { rank: 7, name: "밥오..", point: 950 },
      { rank: 8, name: "집가고싶다", point: 800 },
    ],
    me: { rank: 4, name: "이하느니", point: 1550 },
  };

  useEffect(() => {
    setRanking(mockData.leaderboard);
    setMyInfo(mockData.me);
  }, []);

  return (
    <div className="page-container">
      <div className="header-section">
        <Header />
      </div>

      <div className="level-container">
        <div className="entirelevel">전체 순위</div>

        <div className="ranking-list">
          {ranking.map((user, idx) => (
            <div
              key={idx}
              className={`rank-item level-${user.rank} ${
                myInfo && user.name === myInfo.name ? "level-me" : ""
              }`}
            >
              <div className="rank-left">
                <span className="rank-number">{user.rank}.</span>
                <span className="rank-name">{user.name}</span>
              </div>
              <div className="rank-right">
                <span>P {user.point}</span>
              </div>
            </div>
          ))}
        </div>

        {myInfo && (
          <div className="my-rank">
            <span>
              {myInfo.rank}. {myInfo.name}
            </span>
            <span>P {myInfo.point}</span>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Entirelevel;
