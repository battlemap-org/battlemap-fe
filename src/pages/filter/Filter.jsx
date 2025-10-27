import React from "react";
import "./Filter.css";
import Header from '../../components/header/Header';
import Footer from '../../components/Footer';

const categories = [
  { name: "식당", icon: "/assets/restaurant.png" },
  { name: "카페", icon: "/assets/cafe.png" },
  { name: "문화 체험", icon: "/assets/entertainment.png" },
  { name: "숙박", icon: "/assets/hotel.png" },
];

function Filter() {
  return (
    <div className="filter-page">

      <Header />

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
