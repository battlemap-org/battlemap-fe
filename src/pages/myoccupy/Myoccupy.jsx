import "./Myoccupy.css";
// import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";

function Myoccupy() {
  //api 연결 부분 우선 주석처리
  //   const [point, setPoint] = useState(0);
  //   const [score, setScore] = useState(0);

  //   // 역곡동 포인트/점수 불러오기
  //   const fetchYeogokData = async () => {
  //     try {
  //       // 예시 API 엔드포인트 삽입
  //       const res = await axios.get("http://3.35.246.97:8081/api/area/yeogok");
  //       console.log("역곡동 데이터:", res.data);

  //       // 예시 응답 형태:
  //       // { point: 1550, score: 12 } 이렇게
  //       setPoint(res.data.point);
  //       setScore(res.data.score);
  //     } catch (err) {
  //       console.error(" 역곡동 데이터 불러오기 실패:", err);
  //       alert("역곡동 데이터를 불러오는 중 오류가 발생했습니다.");
  //     }
  //   };

  //   useEffect(() => {
  //     fetchYeogokData();
  //   }, []);

  {
    /* 목데이터 사용 */
  }
  const [point, setPoint] = useState(0);
  const [score, setScore] = useState(0);

  const fetchYeogokData = async () => {
    try {
      const mockData = {
        point: 1550,
        score: 12,
      };

      console.log(" (Mock) 역곡동 데이터:", mockData);

      setPoint(mockData.point);
      setScore(mockData.score);
    } catch (err) {
      console.error(" 역곡동 데이터 세팅 실패:", err);
    }
  };

  useEffect(() => {
    fetchYeogokData();
  }, []);

  return (
    <div>
      <div className="header-section">
        <Header />
      </div>

      <div className="occupy-page">
        <div className="occupy-title">나의 점령 현황</div>

        <div className="yeogok">
          <h3>역곡동</h3>
          <p>
            <img
              src="/assets/point.png"
              alt="포인트 아이콘"
              className="pointicon"
            />
            나의 포인트: {point}P
          </p>
          <p>
            <img
              src="/assets/quest.png"
              alt="퀘스트 아이콘"
              className="questicon"
            />
            완료한 퀘스트 수: {score}개
          </p>
        </div>

        <div className="wonmi">
          <h3>원미동</h3>
          <p>
            <img
              src="/assets/point.png"
              alt="포인트 아이콘"
              className="pointicon"
            />
            나의 포인트: 400P
          </p>

          <p>
            <img
              src="/assets/quest.png"
              alt="퀘스트 아이콘"
              className="questicon"
            />
            완료한 퀘스트 수: 7개
          </p>
        </div>

        <div className="sosa">
          <h3>소사동</h3>
          <p>
            <img
              src="/assets/point.png"
              alt="포인트 아이콘"
              className="pointicon"
            />
            나의 포인트: 650P
          </p>
          <p>
            <img
              src="/assets/quest.png"
              alt="퀘스트 아이콘"
              className="questicon"
            />
            완료한 퀘스트 수: 10개
          </p>
        </div>
      </div>
    </div>
  );
}

export default Myoccupy;
