import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UserCircle,
  Flag,
  ScrollText,
  Coffee,
  ChevronRight,
  X,
  ChevronLeft,
} from "lucide-react";

const Header = () => {
  return (
    <header
      style={{
        position: "relative",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 16px",
        background: "#fff",
      }}
    >
           {" "}
      <img
        src="/assets/logo_clean.png"
        alt="Battlemap 로고"
        style={{ height: 48, width: "auto" }}
      />
         {" "}
    </header>
  );
};

function Profile() {
  const [userName, setUserName] = useState("사용자 이름");
  const [userNameLoading, setUserNameLoading] = useState(true);
  const [userNameError, setUserNameError] = useState(null);
  const [points, setPoints] = useState(null); // points state
  const [loading, setLoading] = useState(true); // 로딩 state
  const [error, setError] = useState(null); // 에러 state

  const [modalStep, setModalStep] = useState(0);
  const [showOwnedCouponModal, setShowOwnedCouponModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const [ownedCoupons, setOwnedCoupons] = useState([]);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState(null);

  const [chargeAmount, setChargeAmount] = useState("");

  const [localCurrency, setLocalCurrency] = useState(null);
  const [localCurrencyLoading, setLocalCurrencyLoading] = useState(true);
  const [localCurrencyError, setLocalCurrencyError] = useState(null);

  const [completedQuests, setCompletedQuests] = useState(null);
  const [questsLoading, setQuestsLoading] = useState(true);
  const [questsError, setQuestsError] = useState(null);

  const [totalQuests, setTotalQuests] = useState(null);
  const [totalQuestsLoading, setTotalQuestsLoading] = useState(true);
  const [totalQuestsError, setTotalQuestsError] = useState(null);

  const [myRank, setMyRank] = useState(null);
  const [mySeasonPoint, setMySeasonPoint] = useState(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState(null);

  const [topCategory, setTopCategory] = useState(null);
  const [topCategoryLoading, setTopCategoryLoading] = useState(true);
  const [topCategoryError, setTopCategoryError] = useState(null);

  const coupons = [
    { img: "cu3000.png", amount: 3000, brand: "CU", name: "CU 3000원권" },
    { img: "cu5000.png", amount: 5000, brand: "CU", name: "CU 5000원권" },
    { img: "cu10000.png", amount: 10000, brand: "CU", name: "CU 10000원권" },
    {
      img: "mega5000.png",
      amount: 5000,
      brand: "메가커피",
      name: "메가커피 5000원권",
    },
    {
      img: "mega10000.png",
      amount: 10000,
      brand: "메가커피",
      name: "메가커피 10000원권",
    },
    {
      img: "mega20000.png",
      amount: 20000,
      brand: "메가커피",
      name: "메가커피 20000원권",
    },
    {
      img: "olive5000.png",
      amount: 5000,
      brand: "올리브영",
      name: "올리브영 5000원권",
    },
    {
      img: "olive10000.png",
      amount: 10000,
      brand: "올리브영",
      name: "올리브영 10000원권",
    },
    {
      img: "olive20000.png",
      amount: 20000,
      brand: "올리브영",
      name: "올리브영 20000원권",
    },
  ];

  const categoryIcons = {
    식당: "/assets/restaurant.png",
    카페: "/assets/cafe.png",
    문화·체험: "/assets/entertainment.png",
    숙박: "/assets/hotel.png",
  };

  {
    /* API 호출 (포인트) */
  }
  const fetchPoints = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      setPoints(0);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get("https://www.battlemap.kr/api/points", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPoints(response.data.success.currentPoint);
      setError(null);
    } catch (err) {
      console.error("포인트 조회 실패:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setError("인증에 실패했습니다. (토큰 오류)");
        } else if (err.response.status === 404) {
          setError("사용자 정보를 찾을 수 없습니다.");
        } else {
          setError("서버 오류가 발생했습니다.");
        }
      } else {
        setError("포인트 조회 중 알 수 없는 오류");
      }
      setPoints(0);
    } finally {
      setLoading(false);
    }
  };

  {
    /* API 호출 (지역 화폐) */
  }
  const fetchLocalCurrency = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLocalCurrencyError("로그인 필요");
      setLocalCurrencyLoading(false);
      setLocalCurrency(0);
      return;
    }

    try {
      setLocalCurrencyLoading(true);
      const response = await axios.get(
        "https://www.battlemap.kr/api/wallet/balance",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLocalCurrency(response.data.balance);
      setLocalCurrencyError(null);
    } catch (err) {
      console.error("지역 화폐 조회 실패:", err);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 404) {
          setLocalCurrencyError("인증 실패");
        } else {
          setLocalCurrencyError("서버 오류");
        }
      } else {
        setLocalCurrencyError("조회 실패");
      }
      setLocalCurrency(0);
    } finally {
      setLocalCurrencyLoading(false);
    }
  };

  {
    /* API 호출 (완료 퀘스트) */
  }
  const fetchCompletedQuests = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setQuestsError("로그인 필요");
      setQuestsLoading(false);
      setCompletedQuests(0);
      return;
    }

    try {
      setQuestsLoading(true);
      const response = await axios.get(
        "https://www.battlemap.kr/api/users/quests/complete",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCompletedQuests(response.data.success.totalComplete);
      setQuestsError(null);
    } catch (err) {
      console.error("완료 퀘스트 조회 실패:", err);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 404) {
          setQuestsError("인증 실패");
        } else {
          setQuestsError("서버 오류");
        }
      } else {
        setQuestsError("조회 실패");
      }
      setCompletedQuests(0);
    } finally {
      setQuestsLoading(false);
    }
  };

  {
    /* API 호출 (총 퀘스트) */
  }
  const fetchTotalQuests = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTotalQuestsError("로그인 필요");
      setTotalQuestsLoading(false);
      setTotalQuests(0);
      return;
    }

    try {
      setTotalQuestsLoading(true);
      const response = await axios.get(
        "https://www.battlemap.kr/api/users/quests/count",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTotalQuests(response.data.success.totalCount);
      setTotalQuestsError(null);
    } catch (err) {
      console.error("총 퀘스트 조회 실패:", err);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 404) {
          setTotalQuestsError("인증 실패");
        } else {
          setTotalQuestsError("서버 오류");
        }
      } else {
        setTotalQuestsError("조회 실패");
      }
      setTotalQuests(0);
    } finally {
      setTotalQuestsLoading(false);
    }
  };
  {
    /* API 호출 (사용자 이름) */
  }
  const fetchUserName = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUserNameError("로그인 필요");
      setUserNameLoading(false);
      setUserName("사용자 이름"); // 기본값 유지
      return;
    }

    try {
      setUserNameLoading(true);
      const response = await axios.get(
        "https://www.battlemap.kr/api/users/name",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserName(response.data.success.userName);
      setUserNameError(null);
    } catch (err) {
      console.error("사용자 이름 조회 실패:", err);
      if (err.response) {
        setUserNameError("서버 오류");
      } else {
        setUserNameError("조회 실패");
      }
      setUserName("사용자 이름"); // 에러 시 기본값 유지
    } finally {
      setUserNameLoading(false);
    }
  };

  {
    /* API 호출 (리더보드) */
  }
  const fetchLeaderboard = async () => {
    const token = localStorage.getItem("token");
    const cityName = "부천";

    if (!token) {
      setLeaderboardError("로그인 필요");
      setLeaderboardLoading(false);
      return;
    }

    try {
      setLeaderboardLoading(true);
      const response = await axios.get(
        `https://www.battlemap.kr/api/regions/${cityName}/leaderboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMyRank(response.data.success.myRank);
      setMySeasonPoint(response.data.success.mySeasonPoint);
      setLeaderboardError(null);
    } catch (err) {
      console.error("리그 순위/포인트 조회 실패:", err);
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 404) {
          setLeaderboardError("인증/조회 실패");
        } else {
          setLeaderboardError("서버 오류");
        }
      } else {
        setLeaderboardError("조회 실패");
      }
    } finally {
      setLeaderboardLoading(false);
    }
  };

  {
    /* API 호출 (많이 활동한 카테고리) */
  }
  const fetchTopCategory = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTopCategoryError("로그인 필요");
      setTopCategoryLoading(false);
      setTopCategory(null);
      return;
    }

    try {
      setTopCategoryLoading(true);

      const response = await axios.get(
        "https://www.battlemap.kr/api/users/categories/top",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTopCategory(response.data.success); // "식당", "카페", "문화·체험", "숙박"
      setTopCategoryError(null);
    } catch (err) {
      console.error("카테고리 조회 실패:", err);
      setTopCategoryError("조회 실패");
      setTopCategory(null);
    } finally {
      setTopCategoryLoading(false);
    }
  };

  {
    /* API 호출 (마운트) */
  }
  useEffect(() => {
    fetchPoints();
    fetchLocalCurrency();
    fetchCompletedQuests();
    fetchTotalQuests();
    fetchUserName();
    fetchLeaderboard();
    fetchTopCategory();
  }, []);

  {
    /* 텍스트 (포인트) */
  }
  const pointsText = loading ? "로딩중..." : error ? "에러" : `${points}`;
  const pointsValue = loading || error ? 0 : points;

  {
    /* 텍스트 (지역 화폐) */
  }
  const localCurrencyText = localCurrencyLoading
    ? "로딩중..."
    : localCurrencyError
    ? localCurrencyError
    : `${localCurrency}원`;

  {
    /* 텍스트 (완료 퀘스트) */
  }
  const completedQuestsText = questsLoading
    ? "..."
    : questsError
    ? "!"
    : `${completedQuests || 0}개`;

  {
    /* 텍스트 (총 퀘스트) */
  }
  const totalQuestsText = totalQuestsLoading
    ? "..."
    : totalQuestsError
    ? "!"
    : `${totalQuests || 0}개`;

  {
    /* 텍스트 (리그 순위/리그 포인트) */
  }
  const myRankText = leaderboardLoading
    ? "..."
    : leaderboardError
    ? "!"
    : `${myRank || "?"}위`;
  const mySeasonPointText = leaderboardLoading
    ? "..."
    : leaderboardError
    ? "!"
    : `${mySeasonPoint || 0}p`;

  {
    /* API 호출 (보유 쿠폰) */
  }
  const handleShowOwnedCoupons = async () => {
    setShowOwnedCouponModal(true);
    setCouponLoading(true);
    setCouponError(null);
    setOwnedCoupons([]);

    const token = localStorage.getItem("token");
    if (!token) {
      setCouponError("로그인이 필요합니다.");
      setCouponLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://www.battlemap.kr/api/coupons", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // API 데이터 → 모달용 데이터로 변환
      const apiCoupons = response.data || [];

      const processedCoupons = apiCoupons.map((apiCoupon) => {
        const staticData = coupons.find(
          (c) =>
            c.brand.toLowerCase() === apiCoupon.brand.toLowerCase() &&
            c.amount === apiCoupon.amount
        );

        return {
          ...apiCoupon,
          img: staticData
            ? `/assets/${staticData.img}`
            : "/assets/logo_clean.png",
          value: apiCoupon.name,
          barcodeImg: "assets/barcode.png",
        };
      });

      setOwnedCoupons(processedCoupons);
    } catch (err) {
      console.error("쿠폰 조회 실패:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setCouponError("인증에 실패했습니다.");
        } else if (err.response.status === 404) {
          setCouponError("사용자를 찾을 수 없습니다.");
        } else {
          setCouponError("서버 오류가 발생했습니다.");
        }
      } else {
        setCouponError("쿠폰 조회 중 오류 발생");
      }
    } finally {
      setCouponLoading(false);
    }
  };

  {
    /* API 호출 (지역 화폐 충전) */
  }
  const handleConfirmCharge = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      alert("로그인 정보가 올바르지 않습니다. 다시 로그인해주세요.");
      setModalStep(0);
      return;
    }

    const amount = parseInt(chargeAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("올바른 충전 금액을 입력하세요.");
      setModalStep(2);
      return;
    }

    if (amount > pointsValue) {
      alert("보유한 포인트를 초과하여 충전할 수 없습니다.");
      setModalStep(2);
      return;
    }

    try {
      await axios.post(
        "https://www.battlemap.kr/api/wallet/charge",
        {
          userId: Number(userId),
          amount: amount,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("충전이 완료되었습니다.");
      fetchPoints();
      fetchLocalCurrency();
    } catch (err) {
      console.error("충전 실패:", err);
      if (err.response) {
        if (err.response.status === 400) {
          alert(err.response.data.message || "잘못된 요청입니다.");
        } else if (err.response.status === 401 || err.response.status === 404) {
          alert("인증 정보가 올바르지 않습니다.");
        } else {
          alert("서버 오류가 발생했습니다.");
        }
      } else {
        alert("충전 중 오류가 발생했습니다.");
      }
    } finally {
      setModalStep(0);
      setChargeAmount("");
    }
  };

  {
    /* 쿠폰 교환 API 핸들러 */
  }
  const handleExchangeCoupon = async () => {
    const token = localStorage.getItem("token"); // 방어 코드 1: 쿠폰 선택/토큰 확인

    if (!selectedCoupon || !token) {
      alert("쿠폰 정보가 없거나 로그인이 필요합니다.");
      setShowExchangeModal(false);
      return;
    } // 방어 코드 2: 포인트 확인
    if (selectedCoupon.amount > pointsValue) {
      alert("보유한 포인트가 부족합니다.");
      setShowExchangeModal(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://www.battlemap.kr/api/coupons/redeem",
        {
          // API 명세서 Body
          brand: selectedCoupon.brand,
          name: selectedCoupon.name,
          amount: selectedCoupon.amount,
        },
        {
          // API 명세서 Header
          headers: { Authorization: `Bearer ${token}` },
        }
      ); // 성공 응답 처리 (명세서 기준)
      alert(response.data.message || "성공적으로 교환되었습니다.");
      setPoints(response.data.remainPoint);
    } catch (err) {
      console.error("쿠폰 교환 실패:", err); // 에러 처리
      if (err.response) {
        if (err.response.status === 400) {
          alert("포인트가 부족합니다.");
        } else if (err.response.status === 401 || err.response.status === 404) {
          alert("인증 정보가 올바르지 않습니다.");
        } else {
          alert("교환 중 서버 오류가 발생했습니다.");
        }
      } else {
        alert("쿠폰 교환 중 오류가 발생했습니다.");
      }
    } finally {
      // 모든 모달 닫기
      setShowExchangeModal(false); // 모달 6 닫기
      setModalStep(0); // 모달 1 닫기
      setSelectedCoupon(null); // 선택 초기화
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
    >
            <Header /> {" "}
      <main style={{ padding: 16, background: "#fff" }}>
               {/* 프로필 영역 */}       
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
                   
          <UserCircle size={120} style={{ color: "#000" }} strokeWidth={1} />   
               
          <div
            style={{
              marginLeft: 16,
              height: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
                     
            <div style={{ fontSize: 24, fontWeight: 700 }}>{userName}</div>     
               
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                color: "#6b7280",
              }}
            >
              <span>사용 가능 포인트</span>
                         
              <img
                src="/assets/point.png"
                alt="포인트"
                style={{ width: 28, height: 32 }}
              />
                         <span> {pointsText} </span> {" "}
              <ChevronRight
                size={18}
                style={{ cursor: "pointer" }}
                onClick={() => setModalStep(1)}
              />
                       
            </div>
                     
            <button
              onClick={handleShowOwnedCoupons}
              style={{
                marginTop: 8,
                background: "#5E936C",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                alignSelf: "flex-start",
              }}
            >
              보유 쿠폰          
            </button>
                     
          </div>
                 
        </div>
               {/* 구분선 */}
               <hr style={{ border: "1px solid #e5e7eb", marginBottom: 24 }} /> 
             
        <div style={{ marginBottom: 24 }}>
                   
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            현 시즌 점령 현황
          </div>
                   
          <div style={{ fontSize: 18, color: "#374151", marginBottom: 2 }}>
                     - 리그 순위:{" "}
            <span style={{ fontWeight: 600 }}>{myRankText}</span>         
          </div>
                   
          <div style={{ fontSize: 18, color: "#374151" }}>
                     - 리그 포인트:{" "}
            <span style={{ fontWeight: 600 }}>{mySeasonPointText}</span>       
             
          </div>
                 
        </div>
               {/* 박스 3개 */}       
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 8,
          }}
        >
                   {/* 박스 1 */}         
          <div
            style={{
              flex: 1,
              background: "#f3f4f6",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1 / 1",
            }}
          >
                     <Flag size={52} style={{ color: "#374151" }} />         
            <span style={{ marginTop: 8, fontWeight: 600 }}>
                         {completedQuestsText}         
            </span>
                     
          </div>
                   {/* 박스 2 */}         
          <div
            style={{
              flex: 1,
              background: "#f3f4f6",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1 / 1",
            }}
          >
                     <ScrollText size={52} style={{ color: "#374151" }} />     
               
            <span style={{ marginTop: 8, fontWeight: 600 }}>
              {totalQuestsText}
            </span>
                     
          </div>
          {/* 박스 3 : 많이 활동한 카테고리 */}
          <div
            style={{
              flex: 1,
              background: "#f3f4f6",
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1 / 1",
            }}
          >
            {topCategoryLoading ? (
              <span>...</span>
            ) : topCategoryError ? (
              <span>!</span>
            ) : (
              <>
                <img
                  src={categoryIcons[topCategory]}
                  alt={topCategory}
                  style={{ width: 52, height: 52 }}
                />
                <span style={{ marginTop: 8, fontWeight: 600 }}>
                  {topCategory}
                </span>
              </>
            )}
          </div>
                 
        </div>
               {/* 박스 하단 텍스트 */}       
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
            color: "#44474bff",
            fontSize: 13,
            marginBottom: 24,
          }}
        >
          <span style={{ flex: 1 }}>완료한 퀘스트 수</span>         
          <span style={{ flex: 1 }}>총 퀘스트 수</span>         
          <span style={{ flex: 1 }}>많이 활동한 카테고리</span>       
        </div>
               {/* 그래프 이미지 */}       
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
                   
          <img
            src="/assets/graph.png"
            alt="활동 그래프"
            style={{
              width: "100%",
              maxWidth: 400,
              height: "auto",
              borderRadius: 12,
            }}
          />
                 
        </div>
             {" "}
      </main>
            {/* 모달 1: 쿠폰함 */}{" "}
      {modalStep >= 1 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setModalStep(0)}
        >
                   
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              width: "90%",
              maxWidth: 420,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
                     
            <X
              size={28}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                cursor: "pointer",
                color: "#444",
              }}
              onClick={() => setModalStep(0)}
            />
                     {/* 포인트 */}         
            <div
              style={{
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
                         {" "}
              <img src="/assets/point.png" style={{ width: 40, height: 44 }} /> 
                       {" "}
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                }}
              >
                            {pointsText}{" "}
              </span>
                       
            </div>
                     {/* 지역 화폐 충전 버튼 */}         
            <button
              onClick={() => setModalStep(2)}
              style={{
                background: "#5E936C",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 20,
              }}
            >
              지역 화폐 충전          
            </button>
                     {/* 쿠폰 섹션 */}         
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
              쿠폰
            </div>
                     
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
              }}
            >
                         
              {coupons.map((coupon, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                               
                  <img
                    src={`/assets/${coupon.img}`}
                    alt={`${coupon.amount} 쿠폰`}
                    style={{
                      background: "#f3f4f6",
                      borderRadius: 14,
                      height: 80,
                      width: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCoupon(coupon);
                      setShowExchangeModal(true);
                    }}
                  />
                               
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#374151",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 15,
                    }}
                  >
                               {" "}
                    <img
                      src="/assets/point.png"
                      alt="P"
                      style={{ width: 24, height: 28 }}
                    />
                                   {coupon.amount}             
                  </div>
                               
                </div>
              ))}
                       
            </div>
                     
          </div>
                 
        </div>
      )}
            {/* 모달 2: 충전 */}     {" "}
      {modalStep >= 2 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
          }}
          onClick={() => setModalStep(0)}
        >
                   
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              width: "90%",
              maxWidth: 320,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
                     
            <X
              size={28}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                cursor: "pointer",
                color: "#444",
              }}
              onClick={() => setModalStep(0)}
            />
                               
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
                         지역 화폐 충전          
            </div>
                               
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 12,
                alignItems: "center",
              }}
            >
                         
              <input
                type="number"
                placeholder="충전 금액을 입력하세요."
                value={chargeAmount}
                onChange={(e) => setChargeAmount(e.target.value)}
                style={{
                  flex: 1,
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 14,
                  width: "100%",
                }}
              />
                         
              <button
                onClick={() => setModalStep(3)} // 확인 모달로
                style={{
                  background: "#5E936C",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                           확인            
              </button>
                       
            </div>
                     
            <div
              style={{ fontSize: 13, color: "#000000ff", textAlign: "center" }}
            >
                         충전 가능 금액: {pointsValue}원          
            </div>
                     
            <div
              style={{ fontSize: 13, color: "#000000ff", textAlign: "center" }}
            >
                         보유 지역 화폐: {localCurrencyText}         
            </div>
                     
          </div>
                 
        </div>
      )}
            {/* 모달 3: 충전 확인 */}     
      {modalStep === 3 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1002,
          }}
          onClick={() => setModalStep(0)}
        >
                   
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              width: "90%",
              maxWidth: 320,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
                     
            <X
              size={28}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                cursor: "pointer",
                color: "#444",
              }}
              onClick={() => setModalStep(0)}
            />
                               
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 24,
                marginTop: 12,
              }}
            >
                         {chargeAmount}원을 지역 화폐로 충전하시겠습니까?      
                 
            </div>
                               
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                         
              <button
                onClick={handleConfirmCharge}
                style={{
                  background: "#5E936C",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                }}
              >
                           확인            
              </button>
                         
              <button
                onClick={() => setModalStep(2)}
                style={{
                  background: "#e5e7eb",
                  color: "#374151",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                }}
              >
                           취소            
              </button>
                       
            </div>
                     
          </div>
                 
        </div>
      )}
            {/* 모달 5: 보유 쿠폰 */}     {" "}
      {showOwnedCouponModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowOwnedCouponModal(false)}
        >
                   
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              width: "90%",
              maxWidth: 420,
              position: "relative",
              minHeight: 400,
            }}
            onClick={(e) => e.stopPropagation()}
          >
                     
            <X
              size={28}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                cursor: "pointer",
                color: "#444",
              }}
              onClick={() => setShowOwnedCouponModal(false)}
            />
                     
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              보유쿠폰
            </div>
                               
            <div style={{ minHeight: 300 }}>
                         
              {couponLoading && (
                <div style={{ textAlign: "center", paddingTop: 40 }}>
                               쿠폰을 불러오는 중...            
                </div>
              )}
                         
              {couponError && (
                <div
                  style={{ textAlign: "center", paddingTop: 40, color: "red" }}
                >
                               {couponError}           
                </div>
              )}
                         
              {!couponLoading && !couponError && ownedCoupons.length === 0 && (
                <div style={{ textAlign: "center", paddingTop: 40 }}>
                               보유한 쿠폰이 없습니다.            
                </div>
              )}
                         
              {!couponLoading && !couponError && ownedCoupons.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12,
                  }}
                >
                               
                  {ownedCoupons.map((coupon, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCoupon(coupon);
                        setShowBarcodeModal(true);
                      }}
                    >
                                     
                      <img
                        src={coupon.img}
                        alt={coupon.value || "쿠폰"}
                        style={{
                          background: "#f3f4f6",
                          borderRadius: 14,
                          height: 80,
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                                     
                      {coupon.value && (
                        <div
                          style={{
                            fontWeight: 600,
                            color: "#374151",
                            fontSize: 14,
                            textAlign: "center",
                          }}
                        >
                                           {coupon.value}                 
                        </div>
                      )}
                                   
                    </div>
                  ))}
                       {" "}
                </div>
              )}
                       
            </div>
                     
          </div>
                 
        </div>
      )}
            {/* 모달 6: 쿠폰 교환 확인 */}     {" "}
      {showExchangeModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1002,
          }}
          onClick={() => {
            setShowExchangeModal(false);
            setSelectedCoupon(null);
          }}
        >
                   
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              width: "90%",
              maxWidth: 320,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
                     
            <X
              size={28}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                cursor: "pointer",
                color: "#444",
              }}
              onClick={() => {
                setShowExchangeModal(false);
                setSelectedCoupon(null);
              }}
            />
                               {/* 선택된 쿠폰 이름 동적 표시 */}         
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                textAlign: "center",
                marginBottom: 24,
                marginTop: 12,
              }}
            >
                         {selectedCoupon?.name || "쿠폰"}으로
              <br /> 교환하시겠습니까?          
            </div>
                               
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                       
              <button
                onClick={handleExchangeCoupon}
                style={{
                  background: "#5E936C",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                }}
              >
                           확인          
              </button>
                       
              <button
                onClick={() => {
                  setShowExchangeModal(false);
                  setSelectedCoupon(null);
                }}
                style={{
                  background: "#e5e7eb",
                  color: "#374151",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  flex: 1,
                }}
              >
                           취소          
              </button>
                       
            </div>
                     
          </div>
                   
        </div>
      )}
            {/* 모달 7: 바코드 확인 */}     {" "}
      {showBarcodeModal && selectedCoupon && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1004,
          }}
          onClick={() => setShowBarcodeModal(false)}
        >
                   
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 24,
              width: "65%",
              maxWidth: 420,
              position: "relative",
              minHeight: 400,
            }}
            onClick={(e) => e.stopPropagation()}
          >
                     
            <ChevronLeft
              size={28}
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                cursor: "pointer",
                color: "#444",
              }}
              onClick={() => setShowBarcodeModal(false)}
            />
                     
            <div style={{ display: "flex", justifyContent: "center" }}>
                         
              <img
                src={selectedCoupon.img}
                alt={selectedCoupon.value || "쿠폰 이미지"}
                style={{
                  width: "100%",
                  maxWidth: 300,
                  height: "auto",
                }}
              />
                       
            </div>
                               
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 24,
                textAlign: "center",
              }}
            >
                         {selectedCoupon.value}         
            </div>
                               
            <div style={{ display: "flex", justifyContent: "center" }}>
                       
              <img
                src={selectedCoupon.barcodeImg}
                alt="바코드"
                style={{
                  width: "100%",
                  maxWidth: 200,
                  height: "auto",
                }}
              />
                       
            </div>
                     
          </div>
                   
        </div>
      )}
         {" "}
    </div>
  );
}

export default Profile;
