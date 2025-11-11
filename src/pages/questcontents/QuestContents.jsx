import React, { useState, useRef } from "react";
import "./QuestContents.css";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import ResultModal from "../../components/resultmodal/ResultModal";
import fail_image1 from "/assets/fail_image1.png";
import fail_image2 from "/assets/fail_image2.png";
import fail_image3 from "/assets/fail_image3.png";
import fail_image4 from "/assets/fail_image4.png";
import success_image from "/assets/success_image.png";

// 목데이터----------------------------
const questData = {
  short: {
    type: "short_answer",
    title: "퀘스트 1 (주관식)",
    question: "다음 메뉴 중 메뉴판에 없는 메뉴는?",
  },
  multi: {
    type: "multiple_choice",
    title: "퀘스트 2 (객관식)",
    question: "이 카페의 시그니처 원두 이름은?",
    options: ["블루마운틴", "예가체프", "분더 블렌드"],
  },
  photo: {
    type: "photo_upload",
    title: "퀘스트 4 (사진)",
    question: "Q. 곰돌이 인형과 함께 사진 찍기",
  },
};
// ------------------------------------

// 모달 창 ---------------------------
const failData = [
  {
    title: "이런..! 틀렸어요!",
    message: "다시 시도해보세요.",
    imageSrc: fail_image1,
  },
  {
    title: "이렇게까지 틀리기도 쉽지 않은데?",
    message: "다시 시도해보세요.",
    imageSrc: fail_image2,
  },
  {
    title: "정답은커녕 근처도 못 갔네ㅋ",
    message: "다시 시도해보세요.",
    imageSrc: fail_image3,
  },
  {
    title: "그걸 정답이라고 낸 거니?",
    message: "다시 시도해보세요.",
    imageSrc: fail_image4,
  },
];

const successData = {
  title: "성공 ㅋㅋ 똥드셈",
  message: "ㅊㅋㅊㅋ",
  imageSrc: success_image,
};

const QuestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "",
    message: "",
    imageSrc: null,
  });

  // 오답일 때 랜덤 모달창 띄우기
  const handleFail = () => {
    // 0 ~ 3 사이의 랜덤 인덱스 뽑기
    const randomIndex = Math.floor(Math.random() * failData.length);

    // 랜덤으로 뽑힌 데이터를 모달 props로 설정
    setModalProps(failData[randomIndex]);
    setIsModalOpen(true);
  };

  // 정답일 때
  const handleSuccess = () => {
    setModalProps(successData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
};
// ------------------------------------

const QuestDetailPage = () => {
  // API 연결해서 받아올 퀘스트 데이터 (토리아에즈 사진 퀘스트로 시작)
  const [currentQuest, setCurrentQuest] = useState(questData.photo);

  const [selectedOption, setSelectedOption] = useState(null); // 객관식 답
  const [preview, setPreview] = useState(null); // 사진 미리보기
  const fileInputRef = useRef(null); // 사진 파일 input

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoBoxClick = () => {
    fileInputRef.current.click();
  };

  // 제출부분
  const handleSubmit = (e) => {
    e.preventDefault();
    // 퀘스트 타입별로 다른 데이터 제출
    switch (currentQuest.type) {
      case "short_answer":
        console.log("주관식 답 제출:", e.target.answer.value);
        break;
      case "multiple_choice":
        console.log("객관식 답 제출:", selectedOption);
        break;
      case "photo_upload":
        console.log("사진 파일 제출:", fileInputRef.current.files[0]);
        break;
      default:
        console.log("제출 에러");
    }
  };

  // 퀘스트 타입에 따라 바꿔서 보여줌
  const renderQuestContent = () => {
    switch (currentQuest.type) {
      // 1. 주관식
      case "short_answer":
        return (
          <textarea
            name="answer"
            className="quest-answer-input"
            placeholder="정답을 입력하세요."
            rows={4}
          />
        );

      // 2. 객관식
      case "multiple_choice":
        return (
          <div className="options-container">
            {currentQuest.options.map((option, index) => (
              <button
                type="button"
                key={index}
                className={`option-button ${
                  selectedOption === option ? "selected" : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        );

      // 3. 사진
      case "photo_upload":
        return (
          <>
            {/* 실제 파일 입력창 (숨김) */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {/* 사진 업로드 영역 (텍스트 상자처럼 보이게) */}
            <div className="photo-upload-box" onClick={handlePhotoBoxClick}>
              {preview ? (
                <img
                  src={preview}
                  alt="미리보기"
                  className="photo-preview-image"
                />
              ) : (
                <span className="photo-placeholder-text"></span>
              )}
              <div className="photo-upload-icons">
                <span className="icon-camera">📷</span>
                <span className="icon-edit">✎</span>
              </div>
            </div>
          </>
        );

      default:
        return <div>퀘스트 유형을 불러올 수 없습니다.</div>;
    }
  };

  return (
    <div className="quest-page-layout">
      <Header />

      {/* 연결하면 지울 부분임 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        <button onClick={() => setCurrentQuest(questData.short)}>
          주관식 테스트
        </button>
        <button onClick={() => setCurrentQuest(questData.multi)}>
          객관식 테스트
        </button>
        <button onClick={() => setCurrentQuest(questData.photo)}>
          사진제출 테스트
        </button>
      </div>
      {/* ----------------------- */}

      <main className="main-content">
        <nav className="navigation">
          <button className="back-button">{"<"}</button>
          <div className="title">퀘스트</div>
        </nav>

        <div className="location-info">
          <img src="/assets/location.png" alt="위치" />
          <span>분더커피바</span>
        </div>

        {/* 공통 퀘스트 박스 */}
        <div className="quest-container">
          {/* 퀘스트 제목과 질문은 공통으로 표시 */}
          <h3 className="quest-title">{currentQuest.title}</h3>
          <p className="quest-question">{currentQuest.question}</p>

          <form onSubmit={handleSubmit}>
            {/* 퀘스트 타입에 맞는 내용물(주관식/객관식/사진)이 renderQuestContent() 함수 통해서 여기에 들어올거 */}
            <div className="quest-form-content">{renderQuestContent()}</div>

            <button type="submit" className="quest-submit-button">
              제출
            </button>
          </form>
        </div>
      </main>

      <Footer />

      {isModalOpen && (
        <ResultModal
          onClose={closeModal}
          title={modalProps.title}
          message={modalProps.message}
          imageSrc={modalProps.imageSrc}
        />
      )}
    </div>
  );
};

export default QuestDetailPage;
