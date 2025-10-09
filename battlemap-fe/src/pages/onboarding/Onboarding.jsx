import React from "react";
import "./Onboarding.css"; // CSS 파일 import

function Onboarding() {
  return (
    <div className="onboarding-container">
      <img
        src="/assets/battlemap_logo.png"
        alt="Battlemap Logo"
        className="onboarding-logo"
      />
    </div>
  );
}

export default Onboarding;
