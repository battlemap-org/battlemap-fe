// Join.jsx
import React from "react";
import "./Join.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/login");
  };
  const backButton = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="login-container">
        <div className="headerWrap">
          <div className="backbutton" onClick={backButton}>
            &lt;
          </div>
          <div className="titleWrap">회원가입</div>
        </div>
        <div className="contentWrap">
          {/* 이름 입력칸 */}
          <div className="InputName">
            <input placeholder="이름" />
            <img
              src="/assets/person.png"
              alt="이름 아이콘"
              className="lockicon"
            />
          </div>
          {/* 아이디입력칸 */}
          <div className="InputId">
            <input placeholder="아이디" />
            <img
              src="/assets/person.png"
              alt="아이디 아이콘"
              className="lockicon"
            />
          </div>
          {/* 이메일 입력칸 */}
          <div className="InputEmail">
            <input placeholder="sky@gmail.com" />
            <img
              src="/assets/Email.png"
              alt="이메일 아이콘"
              className="emailicon"
            />
          </div>
          {/* 비밀번호 */}
          <div className="InputPwd">
            <input type="password" placeholder="비밀번호 입력" />
            <img
              src="/assets/lock.png"
              alt="비밀번호 아이콘"
              className="lockicon"
            />
          </div>
          <div className="InputPwd">
            <input type="password" placeholder="비밀번호 재입력" />
            <img
              src="/assets/lock.png"
              alt="비밀번호 아이콘"
              className="lockicon"
            />
          </div>
          <button className="JoinUserButton" onClick={handleJoin}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Join;
