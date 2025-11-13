import React, { useState, useEffect, useRef } from 'react';
import './PickCafe.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const KAKAO_API_KEY = "3a11aa359ca635ecbd8260eb1d2271db";
const BASE_URL = "http://3.39.56.40:8080";

const categoryNames = {
  FD6: "식당",
  CE7: "카페",
  CULTURE: "문화·체험",
  AD5: "숙박",
};


function CafePage() {
  const navigate = useNavigate(); // 뒤로가기 버튼용
  const { categoryCode } = useParams();

  const [stores, setStores] = useState([]); // 초기값 빈 배열
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dongId, setDongId] = useState(null);

  // 카카오맵 인스턴스 (지도, 마커, 인포윈도우)를 저장할 Ref
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infowindowRef = useRef(null);

  // API 데이터 호출 useEffect
  useEffect(() => {
    const fetchStores = async () => {
      const cityName = '부천시'; 
      const dongName = '역곡동'; 
      // 나중에는 이 값들을 동적으로 받아와야됨

      const token = localStorage.getItem("token");
      // 토큰이 없을 때 에러메시지
      if (!token) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `${BASE_URL}/api/regions/${cityName}/dongs/${dongName}/stores?category=${categoryCode}`,
          {
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }
        );

        setStores(response.data.stores); 
        setDongId(response.data.dongId || 42);

      } catch (err) {
        console.error("API 호출 에러:", err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("데이터를 불러오는 데 실패했습니다.");
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchStores(); 

  }, [categoryCode]); // categoryCode가 바뀔 때마다(페이지가 열릴 때마다) 실행

  // 1. 카카오맵 스크립트 로드 및 지도 초기화
  useEffect(() => {
    if (loading || stores.length === 0) {
      return;
    }
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');

        if (!mapContainer) {
          console.warn("mapContainer를 찾을 수 없습니다.");
          return; 
        }
        
        const firstStore = stores[0];
        const options = {
          center: new window.kakao.maps.LatLng(firstStore.y, firstStore.x),
          level: 3,
        };

        // 지도 생성 및 Ref에 저장
        const mapInstance = new window.kakao.maps.Map(mapContainer, options);
        mapRef.current = mapInstance;

        // 인포윈도우 생성 및 Ref에 저장
        infowindowRef.current = new window.kakao.maps.InfoWindow({
          zIndex: 1,
          content: '<div style="padding:5px;font-size:12px;"></div>'
        });

        // 카페 데이터 기준으로 마커 생성
        const newMarkers = stores.map(store => {
          const position = new window.kakao.maps.LatLng(store.y, store.x);
          const marker = new window.kakao.maps.Marker({
            position: position,
            title: store.place_name // 마커에 카페 이름 저장 (검색용)
          });

          // 마커 클릭 이벤트: Map -> List
          window.kakao.maps.event.addListener(marker, 'click', () => {
            setSelectedStore(store); // 클릭된 마커의 카페로 state 변경
          });

          marker.setMap(mapInstance);
          return marker;
        });
        
        markersRef.current = newMarkers; // 생성된 마커 목록 Ref에 저장
      });
    };

    return () => {
      if (script.parentNode) {
         document.head.removeChild(script);
      }
    };
  }, [loading, stores]);


  // 2. selectedStore이 변경될 때 지도 연동
  useEffect(() => {
    if (!mapRef.current || !infowindowRef.current || !selectedStore) {
      return; // 맵, 인포윈도우, 선택된 카페가 모두 준비되어야 실행
    }

    // 선택된 카페 위치 생성
    const position = new window.kakao.maps.LatLng(selectedStore.y, selectedStore.x);

    // 해당 위치로 지도 부드럽게 이동
    mapRef.current.panTo(position);

    mapRef.current.setLevel(2); // 지도 확대

    // Ref에 저장된 마커 목록에서 현재 선택된 카페의 마커 찾기
    const marker = markersRef.current.find(m => m.getTitle() === selectedStore.place_name);

    if (marker) {
      // 인포윈도우 내용 설정 및 마커 위에 열기
      const content = `<div style="padding:5px 10px;font-size:14px;font-weight:bold;">${selectedStore.place_name}</div>`;
      infowindowRef.current.setContent(content);
      infowindowRef.current.open(mapRef.current, marker);
    }

  }, [selectedStore]); // selectedStore state가 바뀔 때마다 실행


  // 목록 아이템 클릭 이벤트: List -> Map
  const handleStoreClick = (store) => {
    setSelectedStore(store); // 클릭된 리스트의 카페로 state 변경
  }

  const handleQuestClick = async (event, store) => {
    event.stopPropagation(); // 부모 요소(리스트 아이템) 클릭 방지

    if (!dongId) {
      alert("dongId를 찾을 수 없습니다. (fetchStores 확인 필요)");
      return;
    }

    const getNumericId = (code) => {
    if (code === "FD6") return 5;
    if (code === "CE7") return 6;
    if (code === "CULTURE") return 7;
    if (code === "AD5") return 8;
    return 0; // 기본값 (백엔드와 협의 필요) ??
  };

    const numericId = getNumericId(categoryCode);
    console.log("URL에서 가져온 categoryCode:", categoryCode);
    console.log("변환된 numericId:", numericId);

    const requestBody = {
      dongId: dongId || 42,
      categoryId: getNumericId(categoryCode),
      storeInfo: {   
        id: store.id,
        place_name: store.place_name,
        address_name: store.address_name,
        place_url: store.place_url,
        x: parseFloat(store.x),
        y: parseFloat(store.y)
      }
    };

    // URL에 사용할 카카오 ID
    const kakao_store_id = store.id;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    };

    console.log("요청 URL:", `${BASE_URL}/api/quests/${kakao_store_id}/stores`);
    console.log("요청 헤더:", config.headers);
    
      // 3. "퀘스트 생성" API (POST) 호출
      const response = await axios.post(
        `${BASE_URL}/api/quests/${kakao_store_id}/stores`,
        requestBody,
        config
       ) // 👈 ⭐️ 명세서에 맞게 만든 Body 전달

      console.log("퀘스트 생성 성공 응답:", response.data);
    const dbStoreId = response.data.success?.storeId;
    if (dbStoreId) {
      navigate(`/questlist/${dbStoreId}`);
    } else {
      alert(response.data.success?.message || "DB ID를 받지 못했습니다.");
      console.log("퀘스트 생성 응답:", response.data);
    }

  } catch (err) {
    console.error("퀘스트 생성 API 호출 에러:", err);
    if (err.response) {
      console.error("서버 응답 데이터:", err.response.data);
      console.error("서버 응답 상태:", err.response.status);
      alert(`에러: ${err.response.data.message || '서버 응답 확인 필요 (status: ' + err.response.status + ')'}`);
    } else if (err.request) {
      console.error("응답을 받지 못함:", err.request);
      alert("서버에 연결할 수 없습니다. 네트워크를 확인하세요.");
    } else {
      console.error("요청 설정 에러:", err.message);
      alert(`요청 중 오류 발생: ${err.message}`);
    }
  }
};

  // 로딩, 에러
  if (loading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }
  if (error) {
    return <div>에러: {error}</div>; 
  }
  if (!stores || stores.length === 0) {
    return <div>'역곡동' 주변에 해당하는 매장이 없습니다.</div>; 
  }

  return (
    <div className="cafe-page">
      <Header />

      <main className="cafe-main-content">
        
        {/* 스크롤 안 됨 */}
        <div className="static-content">
          <div className="page-controls">
            <button className="back-button" onClick={() => navigate(-1)}>{'<'}</button>
            <div className="category-tag">
              {categoryNames[categoryCode] || categoryCode}
            </div>
          </div>
          
          <div id="map"></div>
        </div>
        
        {/* 여기만 스크롤 됨 */}
        <div className="cafe-list-wrapper">
          {stores.map((store) => {
            console.log("store 객체 확인:", store);
            return (
            <div 
              key={store.id} 
              className={`cafe-list-item ${selectedStore?.id === store.id ? 'selected' : ''}`}
              onClick={() => handleStoreClick(store)}
            >
              <div className="store-info">
                <h3 className="cafe-name">{store.place_name}</h3>
                <p className="cafe-address">{store.address_name}</p>
              </div>
              <button 
                className="quest-button" 
                onClick={(e) => handleQuestClick(e, store)}
              >
                <img 
                  src="/assets/quest.png" 
                  alt="퀘스트 목록" 
                />
              </button>

              
            </div>
            );
          })}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default CafePage;