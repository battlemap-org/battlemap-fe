import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="location">
        <img src="/assets/location.png" alt="위치" />
        <span>부천시</span>
      </div>
    </header>
  );
}

export default Header;