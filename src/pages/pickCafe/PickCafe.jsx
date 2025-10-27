import React, { useState, useEffect, useRef } from 'react';
import './PickCafe.css';
import Header from '../../components/header/Header';
import Footer from '../../components/Footer';


const KAKAO_API_KEY = "3a11aa359ca635ecbd8260eb1d2271db";


// 예시 카페 데이터
const mockCafes = [
  { name: "분더커피바", address: "경기 부천시 신흥로 178 1층", lat: 37.5023, lng: 126.7661 },
  { name: "달리는 커피", address: "경기 부천시 부흥로303번길 36", lat: 37.5045, lng: 126.7683 },
  { name: "카페 동네", address: "경기 부천시 석천로177번길 33 1층", lat: 37.5041, lng: 126.7649 },
  { name: "벱", address: "경기 부천시 중동로248번길 38 1층", lat: 37.5034, lng: 126.7675 },
  { name: "카메 커피", address: "경기 부천시 신흥로 150-1 1층", lat: 37.5008, lng: 126.7645 }
];


function CafePage() {
  const [cafes, setCafes] = useState(mockCafes);
  const [selectedCafe, setSelectedCafe] = useState(null); // 목록/지도 연동용 state

  // 카카오맵 인스턴스 (지도, 마커, 인포윈도우)를 저장할 Ref
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infowindowRef = useRef(null);

  // 1. 카카오맵 스크립트 로드 및 지도 초기화
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const firstCafe = cafes[0];
        const options = {
          center: new window.kakao.maps.LatLng(firstCafe.lat, firstCafe.lng),
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
        const newMarkers = cafes.map(cafe => {
          const position = new window.kakao.maps.LatLng(cafe.lat, cafe.lng);
          const marker = new window.kakao.maps.Marker({
            position: position,
            title: cafe.name // 마커에 카페 이름 저장 (검색용)
          });

          // 마커 클릭 이벤트: Map -> List
          window.kakao.maps.event.addListener(marker, 'click', () => {
            setSelectedCafe(cafe); // 클릭된 마커의 카페로 state 변경
          });

          marker.setMap(mapInstance);
          return marker;
        });
        
        markersRef.current = newMarkers; // 생성된 마커 목록 Ref에 저장
      });
    };

    return () => {
      document.head.removeChild(script); // 컴포넌트 언마운트 시 스크립트 제거
    };
  }, [cafes]);


  // 2. selectedCafe가 변경될 때 지도 연동
  useEffect(() => {
    if (!mapRef.current || !infowindowRef.current || !selectedCafe) {
      return; // 맵, 인포윈도우, 선택된 카페가 모두 준비되어야 실행
    }

    // 선택된 카페 위치 생성
    const position = new window.kakao.maps.LatLng(selectedCafe.lat, selectedCafe.lng);

    // 해당 위치로 지도 부드럽게 이동
    mapRef.current.panTo(position);

    // Ref에 저장된 마커 목록에서 현재 선택된 카페의 마커 찾기
    const marker = markersRef.current.find(m => m.getTitle() === selectedCafe.name);

    if (marker) {
      // 인포윈도우 내용 설정 및 마커 위에 열기
      const content = `<div style="padding:5px 10px;font-size:14px;font-weight:bold;">${selectedCafe.name}</div>`;
      infowindowRef.current.setContent(content);
      infowindowRef.current.open(mapRef.current, marker);
    }

  }, [selectedCafe]); // selectedCafe state가 바뀔 때마다 실행


  // 목록 아이템 클릭 이벤트: List -> Map
  const handleCafeClick = (cafe) => {
    setSelectedCafe(cafe); // 클릭된 리스트의 카페로 state 변경
  };

  return (
    <div className="cafe-page">
      <Header />

      <main className="cafe-main-content">
        
        {/* 스크롤 안 됨 */}
        <div className="static-content">
          <div className="page-controls">
            <button className="back-button">{'<'}</button>
            <div className="category-tag">카페</div>
          </div>
          
          <div id="map"></div>
        </div>
        
        {/* 여기만 스크롤 됨 */}
        <div className="cafe-list-wrapper">
          {cafes.map((cafe) => (
            <div 
              key={cafe.name}
              // 선택된 카페일 경우 'selected' 클래스 추가
              className={`cafe-list-item ${selectedCafe?.name === cafe.name ? 'selected' : ''}`}
              // 클릭 시 핸들러 연결
              onClick={() => handleCafeClick(cafe)}
            >
              <h3 className="cafe-name">{cafe.name}</h3>
              <p className="cafe-address">{cafe.address}</p>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default CafePage;