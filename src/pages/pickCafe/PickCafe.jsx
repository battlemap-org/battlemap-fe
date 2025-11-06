import React, { useState, useEffect, useRef } from 'react';
import './PickCafe.css';
import Header from '../../components/header/Header';
import Footer from '../../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const KAKAO_API_KEY = "3a11aa359ca635ecbd8260eb1d2271db";
const BASE_URL = "http://3.35.246.97:8081";

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

  // 카카오맵 인스턴스 (지도, 마커, 인포윈도우)를 저장할 Ref
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infowindowRef = useRef(null);

  // API 데이터 호출 useEffect
  useEffect(() => {
    const fetchStores = async () => {
      const cityName = '부천시'; 
      const dongName = '역곡동'; 
      // (TODO: 나중에는 이 값들을 동적으로 받아와야 함)

      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          `${BASE_URL}/api/regions/${cityName}/dongs/${dongName}/stores?category=${categoryCode}`
        );

        setStores(response.data.stores); 

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
        const firstStore = stores[0];
        const options = {
          center: new window.kakao.maps.LatLng(firstStore.x, firstStore.y),
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
            title: store.name // 마커에 카페 이름 저장 (검색용)
          });

          // 마커 클릭 이벤트: Map -> List
          window.kakao.maps.event.addListener(marker, 'click', () => {
            setSelectedCafe(store); // 클릭된 마커의 카페로 state 변경
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

    // Ref에 저장된 마커 목록에서 현재 선택된 카페의 마커 찾기
    const marker = markersRef.current.find(m => m.getTitle() === selectedStore.name);

    if (marker) {
      // 인포윈도우 내용 설정 및 마커 위에 열기
      const content = `<div style="padding:5px 10px;font-size:14px;font-weight:bold;">${selectedStore.name}</div>`;
      infowindowRef.current.setContent(content);
      infowindowRef.current.open(mapRef.current, marker);
    }

  }, [selectedStore]); // selectedStore state가 바뀔 때마다 실행


  // 목록 아이템 클릭 이벤트: List -> Map
  const handleCafeClick = (store) => {
    setSelectedStore(store); // 클릭된 리스트의 카페로 state 변경
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
          {stores.map((store) => (
            <div 
              key={store.id} 
              className={`cafe-list-item ${selectedStore?.id === store.id ? 'selected' : ''}`}
              onClick={() => handleStoreClick(store)}
            >
              <h3 className="cafe-name">{store.name}</h3>
              <p className="cafe-address">{store.address}</p>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default CafePage;