import React from "react";
import "./Filter.css";
import Header from '../../components/header/Header';
import Footer from '../../components/Footer';
import { useNavigate } from "react-router-dom";

const categoryNames = {
  FD6: "식당",
  CE7: "카페",
  CULTURE: "문화·체험",
  AD5: "숙박",
};

function Filter() {
  const categories = [
    { name: "식당", code: "FD6", icon: "/assets/restaurant.png"},
    { name: "카페", code: "CE7", icon: "/assets/cafe.png"},
    { name: "문화 체험", code: "CULTURE", icon: "/assets/entertainment.png" },
    { name: "숙박", code: "AD5", icon: "/assets/hotel.png" },
  ];

  const navigate = useNavigate();

  const handleCategoryClick = (code) => { 
    navigate(`/stores/${code}`);
  };

  return (
    <div className="filter-page">

      <Header />

      <main className="main">
        <div className="region">역곡동</div>
        <div className="category">
          {categories.map((category) => (
            <button key={category.name} className="category-button" onClick={() => handleCategoryClick(category.code)}>
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
