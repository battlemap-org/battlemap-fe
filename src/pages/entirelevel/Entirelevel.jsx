import React, { useEffect, useState } from "react";
import "./Entirelevel.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import axios from "axios";

const BASE_URL = "http://3.39.56.40:8080";

function Entirelevel() {
  const [ranking, setRanking] = useState([]);
  const [myInfo, setMyInfo] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const myColor = localStorage.getItem("userColor") || '#CCCCCC'; // 기본색

  // 랭킹불러옴
  const fetchRanking = async () => {
    const cityName = "부천시"; 
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `${BASE_URL}/api/regions/${cityName}/leaderboard`, 
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      console.log("랭킹 데이터:", res.data);

      // 응답 데이터로 state 설정
      if (res.data && res.data.success) {
        
        setRanking(res.data.success.leaderboard || []);

        const myData = {
          rank: res.data.success.myRank,
          name: res.data.success.myNickname,
          point: res.data.success.mySeasonPoint
        };
        setMyInfo(myData);
        
      } else {
        setError("데이터 형식이 올바르지 않습니다.");
      }
      
    } catch (err) {
      console.error("랭킹 불러오기 실패:", err);
      if (err.response) {
        setError(err.response.data.message || "랭킹 로딩 중 오류 발생");
      } else {
        setError("서버와 통신할 수 없습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  // API 호출
  useEffect(() => {
    fetchRanking();
  }, []); // 처음 로드될 때 한 번만 실행

  if (loading) {
    return <div>랭킹을 불러오는 중...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>;
  }

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
                <div
                  className="rank-color-circle"
                  style={{ backgroundColor: user.userColorCode || '#CCCCCC' }}
                ></div>
                <span className="rank-name">{user.name}</span>
              </div>
              <div className="rank-right">
                <span>P {user.point}</span>
              </div>
            </div>
          ))}
        </div>

        
      </div>

      {myInfo && (
          <div className="my-rank">
            <div className="rank-left">
              <span className="rank-number">{myInfo.rank}.</span>
              <div
                className="rank-color-circle"
                style={{ backgroundColor: myColor }}
              ></div>
              <span className="rank-name">{myInfo.name}</span>
            </div>
            <div className="rank-right">
              <span>P {myInfo.point}</span>
            </div>
          </div>
        )}

      <Footer />
    </div>
  );
}

export default Entirelevel;