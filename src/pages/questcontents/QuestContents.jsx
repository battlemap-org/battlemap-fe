import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./QuestContents.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ResultModal from "../../components/resultmodal/ResultModal";

// 퀘스트 타입 추론 함수
// 백엔드 쪽에서 type이 따로 없어서 퀘스트 내용으로 타입 추론함
const getQuestType = (content) => {
  if (content.includes("인증샷") || content.includes("사진")) {
    return "photo_upload";
  }
  return "short_answer";
};

// 모달데이터
const failData = [
  {
    title: "이런..! 틀렸어요!",
    message: "다시 시도해보세요.",
    imageSrc: "/assets/fail_image1.png",
  },
  {
    title: "이렇게까지 틀리기도 쉽지 않은데?",
    message: "다시 시도해보세요.",
    imageSrc: "/assets/fail_image2.png",
  },
  {
    title: "정답은커녕 근처도 못 갔네ㅋ",
    message: "다시 시도해보세요.",
    imageSrc: "/assets/fail_image3.png",
  },
  {
    title: "그걸 정답이라고 낸 거니?",
    message: "다시 시도해보세요.",
    imageSrc: "/assets/fail_image4.png",
  },
];
const successData = {
  title: "성공 ㅋㅋ 똥드셈",
  message: "ㅊㅋㅊㅋ",
  imageSrc: "/assets/success_image.png",
};

function QuestContents() {
  const { questId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 혹시 사용자가 새로고침해서 state가 날아갈 경우를 대비해 기본값 '가게' 설정
  const storeName = location.state?.storeName || "가게";

  // api데이터, 로딩, 에러
  const [currentQuest, setCurrentQuest] = useState(null); // API로 받아올 퀘스트 (초기값 null)
  const [questType, setQuestType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 유저입력값
  const [shortAnswer, setShortAnswer] = useState(""); // 주관식 답
  const [preview, setPreview] = useState(null); // 사진 미리보기
  const imageInputRef = useRef(null); // 사진 input
  const galleryInputRef = useRef(null); // 갤러리에서 사진 불러오기 input

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "",
    message: "",
    imageSrc: null,
  });

  const handleFail = () => {
    const randomIndex = Math.floor(Math.random() * failData.length);
    setModalProps(failData[randomIndex]);
    setIsModalOpen(true);
  };
  const handleSuccess = () => {
    setModalProps(successData);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // (GET) 퀘스트 내용 불러오기
  useEffect(() => {
    const fetchQuestDetail = async () => {
      const token = localStorage.getItem("token");
      if (!token || !questId) {
        setError("잘못된 접근입니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `https://www.battlemap.kr/api/quests/${questId}/solve`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data && response.data.success) {
          const questData = response.data.success;
          setCurrentQuest(questData);

          // 퀘스트 타입 추론 (주관식/사진)
          const type = getQuestType(questData.questContent);
          setQuestType(type);
        } else {
          setError("퀘스트 정보를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error("퀘스트 조회 에러:", err);
        setError("퀘스트 조회 중 오류 발생");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestDetail();
  }, [questId]); // questId가 바뀔 때마다 실행

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleCameraClick = (e) => {
    // 텍스트 상자(photo-upload-box) 클릭 이벤트가 같이 실행되지 않도록 막기
    e.stopPropagation();
    imageInputRef.current.click();
  };
  const handleGalleryClick = (e) => {
    e.stopPropagation();
    galleryInputRef.current.click();
  };

  // (POST) 정답 제출하기
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("로그인이 필요합니다.");

    try {
      let response;
      let submitUrl;

      if (questType === "short_answer") {
        // 주관식 답 제출
        if (shortAnswer.trim() === "") return alert("정답을 입력하세요.");

        const requestBody = {
          userAnswerContent: shortAnswer,
        };

        submitUrl = `https://www.battlemap.kr/api/quests/${questId}/answers`;

        response = await axios.post(submitUrl, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else if (questType === "photo_upload") {
        // 사진 제출
        const file = imageInputRef.current.files[0];
        if (!file) return alert("사진을 첨부해주세요.");

        const formData = new FormData();
        formData.append("image", file); // image 맞는지 백엔드한테 확인받아야됨

        submitUrl = `https://www.battlemap.kr/api/quests/${questId}/answers-images`;

        response = await axios.post(submitUrl, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // 제출 결과
      if (response.data && response.data.success) {
        if (response.data.success.correct === true) {
          handleSuccess();
        } else {
          handleFail();
        }
      } else {
        handleFail(); // 예외
      }
    } catch (err) {
      console.error("제출 에러:", err);
      if (err.response?.data?.error?.errorCode === "QUEST_ALREADY_COMPLETED") {
        alert("이미 완료한 퀘스트입니다.");
        navigate(-1);
      } else {
        alert("제출 중 오류가 발생했습니다.");
      }
    }
  };

  // 퀘스트 타입에 따라 렌더링
  const renderQuestContent = () => {
    switch (questType) {
      case "short_answer":
        return (
          <textarea
            name="answer"
            className="quest-answer-input"
            placeholder="정답을 입력하세요."
            rows={4}
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
          />
        );

      case "photo_upload":
        return (
          <>
            {/* 카메라 */}
            <input
              type="file"
              accept="image/*"
              capture="environment" // 카메라 실행
              ref={imageInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {/* 갤러리 */}
            <input
              type="file"
              accept="image/*"
              ref={galleryInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div className="photo-upload-box">
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
                {/* 카메라 아이콘 */}
                <img
                  src="/assets/camera.png"
                  alt="카메라로 찍기"
                  className="camera-icon"
                  onClick={handleCameraClick}
                />
                {/* 갤러리 아이콘 */}
                <img
                  src="/assets/gallery.png"
                  alt="갤러리에서 불러오기"
                  className="gallery-icon"
                  onClick={handleGalleryClick}
                />
              </div>
            </div>
          </>
        );

      default:
        return <div>퀘스트 유형을 확인 중입니다...</div>; // 로딩중일때
    }
  };

  if (loading) return <div>퀘스트를 불러오는 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!currentQuest) return <div>퀘스트가 없습니다.</div>;

  return (
    <div className="quest-page-layout">
      <Header />

      <main className="main-content">
        <nav className="navigation">
          <button className="back-button" onClick={() => navigate(-1)}>
            {"<"}
          </button>
          <div className="title">퀘스트</div>
        </nav>

        <div className="location-info">
          <img src="/assets/location.png" alt="위치" />
          <span>{storeName}</span>
        </div>

        <div className="quest-container">
          <h3 className="quest-title">{`퀘스트 ${currentQuest.questNumber}`}</h3>
          <p className="quest-question">{currentQuest.questContent}</p>

          <form onSubmit={handleSubmit}>
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
}

export default QuestContents;
