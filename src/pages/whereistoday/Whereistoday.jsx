import React, { useState, useEffect, useCallback } from "react";
import "./Whereistoday.css";
import "../../index.css";

function City() {
  const [selected, setSelected] = useState([]);

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

  const toggleSelect = (city) => {
    setSelected((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const handleConfirm = () => {
    if (selected.length === 0) return;
    alert(`선택된 도시: ${selected.join(", ")}`);
  };

  const onEsc = useCallback((e) => {
    if (e.key === "Escape") setSelected([]);
  }, []);

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
                  type="checkbox"
                  checked={selected.includes(city)}
                  onChange={() => toggleSelect(city)}
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
