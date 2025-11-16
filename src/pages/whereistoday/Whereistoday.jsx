import React, { useState, useEffect, useCallback } from "react";
import "./Whereistoday.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";

function City() {
  const [selected, setSelected] = useState([]); // 상태 변경: 문자열 -> 배열
  const navigate = useNavigate();

  const cities = [
    "고양시",
    "과천시",
    "광명시",
    "광주시",
    "구리시",
    "군포시",
    "김포시",
    "남양주시",
    "동두천시",
    "부천시",
    "성남시",
    "수원시",
    "시흥시",
    "안산시",
    "안성시",
    "안양시",
    "양주시",
    "여주시",
    "오산시",
    "용인시",
    "의왕시",
    "의정부시",
    "이천시",
    "파주시",
    "평택시",
    "포천시",
    "하남시",
    "화성시",
  ];

  // --- 로직 수정 시작 ---
  const toggleSelect = (city) => {
    setSelected((prev) =>
      // 1. 이미 선택된 도시를 클릭하면 선택 해제 (빈 배열)
      // 2. 새 도시를 클릭하면 해당 도시만 담긴 배열로 덮어쓰기
      prev.includes(city) ? [] : [city]
    );
  };

  const handleConfirm = () => {
    // 1. 오직 '부천시'만 선택했는지 확인 (조건 복구)
    if (selected.length === 1 && selected.includes("부천시")) {
      // 2. 부천시 -> 이동
      navigate("/bucheonmap");
    } else {
      // 3. 그 외 모든 경우 (다른 도시, 여러 도시 선택) -> 알림
      alert("현재는 부천시에서만 플레이가 가능합니다.");
    }
  };

  const onEsc = useCallback((e) => {
    if (e.key === "Escape") setSelected([]); // 초기화 복구
  }, []);
  // --- 로직 수정 끝 ---

  useEffect(() => {
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onEsc]);

  return (
    <div className="city-page">
      <h2 className="city-title">오늘은 어디?</h2>

      <div className="city-modal">
        <div
          className="city-card"
          role="dialog"
          aria-modal="true"
          aria-label="도시 선택"
        >
          <div className="city-list">
            {cities.map((city, index) => (
              <label key={index} className="city-item">
                <input
                  type="checkbox" // 타입 복구: radio -> checkbox
                  // name 속성 제거
                  checked={selected.includes(city)} // checked 조건 복구
                  onChange={() => toggleSelect(city)} // onChange 핸들러 복구
                />
                <span>{city}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          className="city-confirm"
          onClick={handleConfirm}
          disabled={selected.length === 0}
        >
          완료
        </button>
      </div>
    </div>
  );
}

export default City;
