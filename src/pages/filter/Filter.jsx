import React from "react";
import "./Filter.css";
import Footer from "../../components/Footer";

const categories = [
  { name: "식당", icon: "/assets/restaurant.png" },
  { name: "카페", icon: "/assets/cafe.png" },
  { name: "문화 체험", icon: "/assets/entertainment.png" },
  { name: "숙박", icon: "/assets/hotel.png" },
];

function Filter() {
  return (
    <div className="filter-page">
      <header className="header">
        <div className="location">
          <img src="/assets/location.png" />
          <span>부천시</span>
        </div>
        <div className="point">
          <img src="/assets/point.png" />
          <span>1400</span>
        </div>
      </header>

      <main className="main">
        <div className="region">역곡동</div>
        <div className="category">
          {categories.map((category) => (
            <button key={category.name} className="category-button">
              <img src={category.icon} alt={category.name} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Filter;
