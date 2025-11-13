import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

function Onboarding() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000); // 2초 후 로그인 페이지로 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, [navigate]);

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
