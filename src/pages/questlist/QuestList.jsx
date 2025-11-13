import React, { useState, useEffect } from 'react';
import './QuestList.css'; 
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // 👈 API 호출을 위해 axios를 import 합니다.

// 🚨 이 BASE_URL은 CafePage.js와 동일하게 설정해주세요.
const BASE_URL = "http://3.39.56.40:8080"; 

function QuestList() { 
  const navigate = useNavigate();
  const { storeId } = useParams(); // URL에서 storeId를 가져옵니다.

  const [storeName, setStoreName] = useState(''); // 가게 이름
  const [quests, setQuests] = useState([]); // 퀘스트 목록
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    const fetchQuests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/quests/${storeId}/stores`, // API 엔드포인트
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        
        // ⭐️ API 명세서에 맞게 수정된 부분
        const questDataList = response.data; // 응답 데이터 자체가 퀘스트 배열

        if (questDataList && questDataList.length > 0) {
          // 1. 퀘스트 목록 설정
          setQuests(questDataList);
          // 2. 가게 이름은 첫 번째 퀘스트 객체에서 가져옴 (모두 동일할 것이므로)
          setStoreName(questDataList[0].storeName); 
        } else {
          // 퀘스트가 없는 경우
          setQuests([]);
          // 퀘스트가 없으면 storeName도 알 수 없으므로, 
          // '가게 정보' 같은 기본값을 표시하거나
          // 혹은 이 페이지에 진입하기 전 페이지에서 storeName을 넘겨받아야 합니다.
          // 일단 '가게'로만 표시합니다.
          setStoreName('가게');
        }

      } catch (err) {
        console.error("퀘스트 목록 로딩 에러:", err);
        setError("퀘스트를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();

  }, [storeId]); // storeId가 바뀔 때마다 실행

  // 퀘스트 아이템 클릭 시 풀이 페이지로 이동
  const handleQuestClick = (questId) => {
    // ⭐️ API 명세서의 questId를 사용합니다.
    navigate(`/quests/${questId}/solve`); 
  };

  // 로딩 및 에러 처리
  if (loading) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>; 
  }

  return (
    <>
      <Header />
      <div className="page-wrapper">
        <nav className="navigation">
          <button className="back-button" onClick={() => navigate(-1)}>{'<'}</button>
          <div className="title">퀘스트</div>
        </nav>

        <div className="location-info">
          <img src="/assets/location.png" alt="위치" />
          {/* 👈 API에서 받은 storeName 표시 */}
          <span>{storeName}</span> 
        </div>

        <div className="quest-list-container">
          {quests.length === 0 ? (
            <div className="quest-item">이 가게에는 퀘스트가 없습니다.</div>
          ) : (
            // 👈 API에서 받은 quests 배열(questDataList)을 map으로 돌립니다.
            quests.map((quest) => (
              <div 
                className="quest-item" 
                key={quest.questId} // ⭐️ key는 questId
                onClick={() => handleQuestClick(quest.questId)} // ⭐️ questId 전달
                style={{ cursor: 'pointer' }} // 클릭 가능하다는 표시
              >
                {/* ⭐️ 명세서의 questNumber를 "퀘스트 {번호}" 형식으로 표시 */}
                <span>{`퀘스트 ${quest.questNumber}`}</span> 
                <div className="questlist-point">
                  <img src="/assets/point.png" alt="포인트" />
                  {/* ⭐️ 명세서의 rewardPoint 사용 */}
                  <span>{quest.rewardPoint}</span> 
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default QuestList;