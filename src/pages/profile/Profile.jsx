import React, { useState, useEffect } from 'react'; // useEffect 추가
import axios from 'axios'; // axios 추가
import { LogOut, UserCircle, Flag, ScrollText, Coffee, ChevronRight, X, ChevronLeft } from 'lucide-react';

const Header = ({ onLogoutClick }) => {
  return (
    <header
      style={{
        position: 'relative',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 16px',
        background: '#fff',
      }}
    >
      <img
        src="/assets/logo_clean.png"
        alt="Battlemap 로고"
        style={{ height: 48, width: 'auto' }}
      />
      <div 
        style={{ position: 'absolute', right: 16, cursor: 'pointer' }}
        onClick={onLogoutClick}
      >
        <LogOut size={30} style={{ color: '#000' }} strokeWidth={2.5} />
      </div>
    </header>
  );
};

function Profile() {
  const userName = '사용자 이름';
  
  {/* 2650 -> state로 변경 */}
  const [points, setPoints] = useState(null); // points state
  const [loading, setLoading] = useState(true); // 로딩 state
  const [error, setError] = useState(null); // 에러 state

  const [modalStep, setModalStep] = useState(0); // 0: 닫힘, 1: 쿠폰함, 2: 충전, 3: 확인
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOwnedCouponModal, setShowOwnedCouponModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);


  /* 쿠폰 이미지들 */
  const coupons = [
    { img: 'cu3000.png', value: 'P 3000' },
    { img: 'cu5000.png', value: 'P 5000' },
    { img: 'cu10000.png', value: 'P 10000' },
    { img: 'mega5000.png', value: 'P 5000' },
    { img: 'mega10000.png', value: 'P 10000' },
    { img: 'mega20000.png', value: 'P 20000' },
    { img: 'olive5000.png', value: 'P 5000' },
    { img: 'olive10000.png', value: 'P 10000' },
    { img: 'olive20000.png', value: 'P 20000' },
  ];

  {/* API 호출 */}
  useEffect(() => {
    const fetchPoints = async () => {
      const token = localStorage.getItem("token"); // 토큰 읽기

      if (!token) {
        setError("로그인이 필요합니다."); // 토큰 없음
        setLoading(false);
        setPoints(0); 
        return;
      }

      try {
        setLoading(true); // 로딩 시작
        const response = await axios.get(
          "http://3.35.246.97:8081/api/points", // GET 요청
          {
            headers: {
              "Authorization": `Bearer ${token}` // 헤더 설정
            }
          }
        );
 
        setPoints(response.data.points); // state 업데이트
        setError(null); 

      } catch (err) {
        console.error("포인트 조회 실패:", err); // 에러 처리
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
        setPoints(0); // 에러 시 0
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchPoints();
  }, []); // [] : 처음 한 번만 실행

  {/* 로딩/에러 텍스트 */}
  const pointsText = loading ? '로딩중...' : (error ? '에러' : `P ${points}`);
  const pointsValue = loading || error ? 0 : points; // 충전 모달용


  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Header onLogoutClick={() => setShowLogoutModal(true)} />

      <main style={{ padding: 16, background: '#fff' }}>
        {/* 프로필 영역 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <UserCircle size={120} style={{ color: '#000' }} strokeWidth={1} />
          <div
            style={{
              marginLeft: 16,
              height: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700 }}>{userName}</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: '#6b7280',
              }}
            >
              <span>사용 가능 포인트</span>
              <span
                style={{
                  background: '#FDE68A',
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {/* state 값 적용 1 */}
                {pointsText} 
              </span>
              <ChevronRight
                size={18}
                style={{ cursor: 'pointer' }}
                onClick={() => setModalStep(1)}
              />
            </div>

            <button
              onClick={() => setShowOwnedCouponModal(true)}
              style={{
                marginTop: 8,
                background: '#5E936C',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                alignSelf: 'flex-start',
              }}
            >
              보유 쿠폰
            </button>
          </div>
        </div>

        {/* 구분선 */}
        <hr style={{ border: '1px solid #e5e7eb', marginBottom: 24 }} />

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>현 시즌 점령 현황</div>
          <div style={{ fontSize: 18, color: '#374151', marginBottom: 2 }}>
            - 리그 순위: <span style={{ fontWeight: 600 }}>4위</span>
          </div>
          <div style={{ fontSize: 18, color: '#374151' }}>
            {/* 1550p 수정 안함 */}
            - 포인트: <span style={{ fontWeight: 600 }}>1550p</span>
          </div>
        </div>

        {/* 박스 3개 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
            marginBottom: 8,
          }}
        >
          {/* 박스 1 */}
          <div
            style={{
              flex: 1,
              background: '#f3f4f6',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1 / 1',
            }}
          >
            <Flag size={52} style={{ color: '#374151' }} />
            <span style={{ marginTop: 8, fontWeight: 600 }}>7개</span>
          </div>

          {/* 박스 2 */}
          <div
            style={{
              flex: 1,
              background: '#f3f4f6',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1 / 1',
            }}
          >
            <ScrollText size={52} style={{ color: '#374151' }} />
            <span style={{ marginTop: 8, fontWeight: 600 }}>125개</span>
          </div>

          {/* 박스 3 */}
          <div
            style={{
              flex: 1,
              background: '#f3f4f6',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1 / 1',
            }}
          >
            <Coffee size={52} style={{ color: '#374151' }} />
            <span style={{ marginTop: 8, fontWeight: 600 }}>카페인 중독자</span>
          </div>
        </div>

        {/* 박스 하단 텍스트 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'center',
            color: '#44474bff',
            fontSize: 13,
            marginBottom: 24,
          }}
        >
          <span style={{ flex: 1 }}>총 점령 수</span>
          <span style={{ flex: 1 }}>총 퀘스트 수</span>
          <span style={{ flex: 1 }}>많이 활동한 카테고리</span>
        </div>

        {/* 그래프 이미지 */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <img
            src="/assets/graph.png"
            alt="활동 그래프"
            style={{
              width: '100%',
              maxWidth: 400,
              height: 'auto',
              borderRadius: 12,
            }}
          />
        </div>
      </main>

      {/* 모달 1: 쿠폰함 */}
      {modalStep >= 1 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setModalStep(0)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
            	 padding: 24,
            	 width: '90%',
            	 maxWidth: 420,
            	 position: 'relative',
            }}
          	 onClick={(e) => e.stopPropagation()}
          >
          	 <X
          	   size={28}
          	   style={{
          	 	 position: 'absolute',
          	 	 top: 16,
          	 	 right: 16,
          	 	 cursor: 'pointer',
          	 	 color: '#444',
          	   }}
          	   onClick={() => setModalStep(0)}
          	 />

          	 {/* 포인트 */}
          	 <div style={{ marginBottom: 8 }}>
          	   <span
          	 	 style={{
          	 	   background: '#FDE68A',
          	 	   padding: '2px 8px',
          	 	   borderRadius: 20,
          	 	   fontWeight: 600,
          	 	   display: 'inline-block',
          	 	   fontSize: 22,
          	 	 }}
          	   >
                {/* state 값 적용 2 */}
          	 	 {pointsText}
          	   </span>
          	 </div>


          	 {/* 지역 화폐 충전 버튼 */}
          	 <button
          	   onClick={() => setModalStep(2)}
          	   style={{
          	 	 background: '#5E936C',
          	 	 color: '#fff',
          	 	 border: 'none',
          	 	 padding: '10px 20px',
          	 	 borderRadius: 10,
          	 	 cursor: 'pointer',
          	 	 fontSize: 15,
          	 	 fontWeight: 600,
          	 	 marginBottom: 20,
          	   }}
          	 >
          	   지역 화폐 충전
          	 </button>

          	 {/* 쿠폰 섹션 */}
          	 <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>쿠폰</div>
          	 <div
          	   style={{
          	 	 display: 'grid',
          	 	 gridTemplateColumns: 'repeat(3, 1fr)',
          	 	 gap: 12,
          	   }}
          	 >
          	   {coupons.map(
          	 	 (coupon, idx) => (
          	 	   <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          	 		 <img
          	 		   src={`/assets/${coupon.img}`}
          	 		   alt={`${coupon.value} 쿠폰`}
          	 		   style={{
          	 			 background: '#f3f4f6',
          	 			 borderRadius: 14,
          	 			 height: 80,
          	 			 width: '100%',
          	 			 objectFit: 'cover',
          	 			 cursor: 'pointer',
          	 		   }}
          	 		   onClick={(e) => {
          	 			 e.stopPropagation();
          	 			 setShowExchangeModal(true);
          	 		   }}
          	 		 />
          	 		 <div
          	 		   style={{
          	 			 fontWeight: 600,
          	 			 color: '#374151',
          	 			 fontSize: 15,
          	 		   }}
          	 		 >
          	 		   {coupon.value}
          	 		 </div>
          	 	   </div>
          	 	 )
          	   )}
          	 </div>
        	 </div>
        </div>
      )}

      {/* 모달 2: 충전 */}
      {modalStep >= 2 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001, 
          }}
          onClick={() => setModalStep(0)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: 24,
              width: '90%',
              maxWidth: 320, 
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <X
              size={28}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                cursor: 'pointer',
                color: '#444',
              }}
              onClick={() => setModalStep(0)}
            />
            
            <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>
              지역 화폐 충전
            </div>
            
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
              <input
          	   type="text"
          	   placeholder="충전 금액을 입력하세요."
          	   style={{
          	 	 flex: 1,
          	 	 border: '1px solid #d1d5db',
          	 	 borderRadius: 8,
          	 	 padding: '8px 12px',
          	 	 fontSize: 14,
          	 	 width: '100%',
          	   }}
          	 />
          	 <button
          	   onClick={() => setModalStep(3)}
          	   style={{
          	 	 background: '#5E936C',
          	 	 color: '#fff',
          	 	 border: 'none',
          	 	 padding: '8px 16px',
          	 	 borderRadius: 8,
          	 	 cursor: 'pointer',
          	 	 fontSize: 14,
          	 	 fontWeight: 600,
          	 	 whiteSpace: 'nowrap',
          	   }}
          	 >
          	   확인
          	 </button>
        	 </div>

        	 <div style={{ fontSize: 13, color: '#000000ff', textAlign: 'center' }}>
            {/* state 값 적용 3 */}
        		 충전 가능 금액: {pointsValue}원
        	 </div>
        	 <div style={{ fontSize: 13, color: '#000000ff', textAlign: 'center' }}>
        		 보유 지역 화폐: 450원
        	 </div>
          </div>
        </div>
      )}

      {/* 모달 3: 충전 확인 */}
      {modalStep === 3 && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002, 
          }}
          onClick={() => setModalStep(0)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: 24,
              width: '90%',
              maxWidth: 320, 
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <X
              size={28}
              style={{
          	   position: 'absolute',
          	   top: 16,
          	   right: 16,
          	   cursor: 'pointer',
          	   color: '#444',
          	 }}
          	 onClick={() => setModalStep(0)}
            />
          	 
        	 <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 24, marginTop: 12 }}>
        	   지역 화폐를 충전하시겠습니까?
        	 </div>
        	 
        	 <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        	   <button
        	 	 onClick={() => setModalStep(0)} 
        	 	 style={{
        	 	   background: '#5E936C',
        	 	   color: '#fff',
        	 	   border: 'none',
        	 	   padding: '10px 20px',
        	 	   borderRadius: 10,
        	 	   cursor: 'pointer',
        	 	   fontSize: 15,
        	 	   fontWeight: 600,
        	 	   flex: 1,
        	 	 }}
        	   >
        	 	 확인
        	   </button>

        	   <button
        	 	 onClick={() => setModalStep(0)} 
        	 	 style={{
        	 	   background: '#e5e7eb',
        	 	   color: '#374151',
        	 	   border: 'none',
        	 	   padding: '10px 20px',
        	 	   borderRadius: 10,
        	 	   cursor: 'pointer',
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

      {/* 모달 4: 로그아웃 확인 */}
      {showLogoutModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1003, 
          }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            style={{
          	   background: '#fff',
          	   borderRadius: 20,
          	   padding: 24,
          	   width: '90%',
          	   maxWidth: 320, 
          	   position: 'relative',
          	 }}
          	 onClick={(e) => e.stopPropagation()}
          >
        	 <X
        	   size={28}
        	   style={{
        	 	 position: 'absolute',
        	 	 top: 16,
        	 	 right: 16,
        	 	 cursor: 'pointer',
        	 	 color: '#444',
        	   }}
        	   onClick={() => setShowLogoutModal(false)}
        	 />
        	 
        	 <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 24, marginTop: 12 }}>
        	   로그아웃 하시겠습니까?
        	 </div>
        	 
        	 <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        	   <button
        	 	 onClick={() => setShowLogoutModal(false)} // 
        	 	 style={{
        	 	   background: '#5E936C',
        	 	   color: '#fff',
        	 	   border: 'none',
        	 	   padding: '10px 20px',
        	 	   borderRadius: 10,
        	 	   cursor: 'pointer',
        	 	   fontSize: 15,
        	 	   fontWeight: 600,
        	 	   flex: 1,
        	 	 }}
        	   >
        	 	 확인
        	   </button>

        	   <button
        	 	 onClick={() => setShowLogoutModal(false)} 
        	 	 style={{
        	 	   background: '#e5e7eb',
        	 	   color: '#374151',
        	 	   border: 'none',
        	 	   padding: '10px 20px',
        	 	   borderRadius: 10,
        	 	   cursor: 'pointer',
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

      {/* 모달 5: 보유 쿠폰 */}
      {showOwnedCouponModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowOwnedCouponModal(false)}
      	>
      	  <div
      	 	 style={{
      	 	   background: '#fff',
      	 	   borderRadius: 20,
      	 	   padding: 24,
      	 	   width: '90%',
      	 	   maxWidth: 420,
      	 	   position: 'relative',
      	 	   minHeight: 400,
      	 	 }}
      	 	 onClick={(e) => e.stopPropagation()}
      	   >
      	 	 <X
      	 	   size={28}
      	 	   style={{
      	 		 position: 'absolute',
      	 		 top: 16,
      	 		 right: 16,
      	 		 cursor: 'pointer',
      	 		 color: '#444',
      	 	   }}
      	 	   onClick={() => setShowOwnedCouponModal(false)}
      	 	 />

      	 	 <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, textAlign: 'center' }}>보유쿠폰</div>
      	 	 
      	 	 <div
      	 	   style={{
      	 		 display: 'grid',
      	 		 gridTemplateColumns: 'repeat(3, 1fr)',
      	 		 gap: 12,
      	 	   }}
      	 	 >
      	 	   {/* 첫 번째 박스에만 쿠폰 이미지 삽입 */}
      	 	   <div 
      	 		 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
      	 		 onClick={(e) => {
      	 		   e.stopPropagation();
      	 		   setSelectedCoupon(coupons[0]);
      	 		   setShowBarcodeModal(true);
      	 		 }}
      	 	   >
      	 		 <img
      	 		   src={`/assets/${coupons[0].img}`} // 첫 번째 쿠폰 이미지 사용
      	 		   alt={`${coupons[0].value} 쿠폰`}
      	 		   style={{
      	 			 background: '#f3f4f6',
      	 			 borderRadius: 14,
      	 			 height: 80,
      	 			 width: '100%',
      	 			 objectFit: 'cover',
      	 		   }}
      	 		 />
      	 	   </div>

      	 	   {/* 나머지 5개는 회색 박스로 유지 */}
      	 	   {[...Array(5)].map((_, idx) => (
      	 		 <div key={idx + 1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      	 		   <div
      	 			 style={{
      	 			   background: '#f3f4f6',
      	 			   borderRadius: 14,
      	 			   height: 80,
      	 			   width: '100%',
      	 			 }}
      	 		   />
      	 		 </div>
      	 	   ))}
      	 	 </div>
      	   </div>
    	 </div>
    	)}

    	{/* 모달 6: 쿠폰 교환 확인 */}
    	{showExchangeModal && (
    	  <div
    	 	 style={{
    	 	   position: 'fixed',
    	 	   top: 0,
    	 	   left: 0,
    	 	   width: '100%',
    	 	   height: '100%',
    	 	   background: 'rgba(0,0,0,0.5)',
    	 	   display: 'flex',
    	 	   alignItems: 'center',
    	 	   justifyContent: 'center',
    	 	   zIndex: 1002, 
    	 	 }}
    	 	 onClick={() => setShowExchangeModal(false)}
    	   >
    	 	 <div
    	 	   style={{
    	 		 background: '#fff',
    	 		 borderRadius: 20,
    	 		 padding: 24,
    	 		 width: '90%',
    	 		 maxWidth: 320, 
    	 		 position: 'relative',
    	 	   }}
    	 	   onClick={(e) => e.stopPropagation()}
    	 	 >
    	 	   <X
    	 		 size={28}
    	 		 style={{
    	 		   position: 'absolute',
    	 		   top: 16,
    	 		   right: 16,
    	 		   cursor: 'pointer',
    	 		   color: '#444',
    	 		 }}
    	 		 onClick={() => setShowExchangeModal(false)}
    	 	   />
    	 	   
    	 	   <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 24, marginTop: 12 }}>
    	 		 해당 쿠폰으로 교환하시겠습니까?
    	 	   </div>
    	 	   
    	 	   <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
    	 		 <button
    	 		   onClick={() => setShowExchangeModal(false)} 
    	 		   style={{
    	 			 background: '#5E936C',
    	 			 color: '#fff',
    	 			 border: 'none',
    	 			 padding: '10px 20px',
    	 			 borderRadius: 10,
    	 			 cursor: 'pointer',
    	 			 fontSize: 15,
    	 			 fontWeight: 600,
    	 			 flex: 1,
    	 		   }}
    	 		 >
    	 		   확인
    	 		 </button>

    	 		 <button
    	 		   onClick={() => setShowExchangeModal(false)} 
    	 		   style={{
    	 			 background: '#e5e7eb',
    	 			 color: '#374151',
    	 			 border: 'none',
    	 			 padding: '10px 20px',
    	 			 borderRadius: 10,
    	 			 cursor: 'pointer',
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

    	{/* 모달 7: 바코드 확인 */}
    	{showBarcodeModal && selectedCoupon && (
    	  <div
    	 	 style={{
    	 	   position: 'fixed',
    	 	   top: 0,
    	 	   left: 0,
    	 	   width: '100%',
    	 	   height: '100%',
    	 	   background: 'rgba(0,0,0,0.5)',
    	 	   display: 'flex',
    	 	   alignItems: 'center',
    	 	   justifyContent: 'center',
    	 	   zIndex: 1004,
    	 	 }}
    	 	 onClick={() => setShowBarcodeModal(false)}
    	   >
    	 	 <div
    	 	   style={{
    	 		 background: '#fff',
    	 		 borderRadius: 20,
    	 		 padding: 24,
    	 		 width: '65%',
    	 		 maxWidth: 420,
    	 		 position: 'relative',
    	 		 minHeight: 400,
    	 	   }}
    	 	   onClick={(e) => e.stopPropagation()}
    	 	 >
    	 	   <ChevronLeft
    	 		 size={28}
    	 		 style={{
    	 		   position: 'absolute',
    	 		   top: 16,
    	 		   left: 16,
    	 		   cursor: 'pointer',
    	 		   color: '#444',
    	 		 }}
    	 		 onClick={() => setShowBarcodeModal(false)}
    	 	   />

    	 	 <div style={{ display: 'flex', justifyContent: 'center' }}>
    	 	   <img
    	 		 src="/assets/cu3000.png"
    	 		 alt="cu3000"
    	 		 style={{
    	 		   width: '100%',
    	 		   maxWidth: 300,
    	 		   height: 'auto',
    	 		 }}
    	 	   />
    	 	 </div>
    	 	 
    	 	 <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, textAlign: 'center'}}>
    	 	   CU 모바일 금액권 3000원
    	 	 </div>
    	 	 
    	 	 <div style={{ display: 'flex', justifyContent: 'center' }}>
    	 	   <img
    	 		 src="/assets/barcode.png"
    	 		 alt="바코드"
    	 		 style={{
      	 		   width: '100%',
      	 		   maxWidth: 200,
      	 		   height: 'auto',
      	 		 }}
    	 	   />
    	 	 </div>
    	 	 </div>
    	   </div>
    	 )}

  	 </div>
  );
}

export default Profile;