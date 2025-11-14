import React, { useState, useEffect } from "react";
import "./QuestList.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function QuestList() {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const [storeName, setStoreName] = useState("");
  const [quests, setQuests] = useState([]);
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
          `https://www.battlemap.kr/api/quests/${storeId}/stores`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("퀘스트 목록 응답:", response.data);

        const questDataList = response.data.success;

        // 퀘스트 배열이 존재하고, 1개 이상인지 확인
        if (questDataList && questDataList.length > 0) {
          // 퀘스트 목록을 state에 저장
          setQuests(questDataList);

          setStoreName(questDataList[0].storeName);
        } else {
          // 퀘스트가 0개이거나 success가 널값일때
          setQuests([]);
          // storeName을 알 수 없으면 그냥 가게로만 뜨게
          setStoreName("가게");
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

  const handleQuestClick = (questId) => {
    navigate(`/quests/${questId}/solve`, {
      state: {
        storeName: storeName, // 함께 보낼 데이터 (가게이름)
      },
    });
  }; // 풀이화면 페이지로 이동

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
          <button className="back-button" onClick={() => navigate(-1)}>
            {"<"}
          </button>
          <div className="title">퀘스트</div>
        </nav>

        <div className="location-info">
          <img src="/assets/location.png" alt="위치" />
          {/* API에서 받은 storeName 표시 */}
          <span>{storeName}</span>
        </div>

        <div className="quest-list-container">
          {quests.length === 0 ? (
            <div className="quest-item">이 가게에는 퀘스트가 없습니다.</div>
          ) : (
            // API에서 받은 quests 배열(questDataList)을 map으로
            quests.map((quest) => (
              <div
                className="quest-item"
                key={quest.questId}
                onClick={() => handleQuestClick(quest.questId)}
                style={{ cursor: "pointer" }}
              >
                <span>{`퀘스트 ${quest.questNumber}`}</span>
                <div className="questlist-point">
                  <img src="/assets/point.png" alt="포인트" />
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
