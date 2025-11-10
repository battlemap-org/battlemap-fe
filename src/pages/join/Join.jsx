// Join.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Join.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const handleRegister = () => {
    // 비밀번호 확인 검사
    if (pw !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post("http://3.35.246.97:8081/api/users/register", {
        name,
        id,
        email,
        pw,
      })
      .then((res) => {
        console.log("회원가입:", res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error("회원가입 실패:", err);
        alert("회원가입 실패: " + err.message);
      });
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
            <input
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <img
              src="/assets/person.png"
              alt="이름 아이콘"
              className="lockicon"
            />
          </div>

          {/* 아이디 입력칸 */}
          <div className="InputId">
            <input
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <img
              src="/assets/person.png"
              alt="아이디 아이콘"
              className="lockicon"
            />
          </div>

          {/* 이메일 입력칸 */}
          <div className="InputEmail">
            <input
              placeholder="sky@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <img
              src="/assets/Email.png"
              alt="이메일 아이콘"
              className="emailicon"
            />
          </div>

          {/* 비밀번호 */}
          <div className="InputPwd">
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <img
              src="/assets/lock.png"
              alt="비밀번호 아이콘"
              className="lockicon"
            />
          </div>

          {/* 비밀번호 재입력 */}
          <div className="InputPwd">
            <input
              type="password"
              placeholder="비밀번호 재입력"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            <img
              src="/assets/lock.png"
              alt="비밀번호 아이콘"
              className="lockicon"
            />
          </div>

          <button className="JoinUserButton" onClick={handleRegister}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Join;
