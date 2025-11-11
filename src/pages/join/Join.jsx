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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

  const handleRegister = () => {
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=]).{8,}$/;
    if (!pwRegex.test(pw)) {
      alert("비밀번호는 영문, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.");
      return;
    }

    if (pw !== confirmPw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post("http://3.39.56.40:8080/api/users/register", {
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
        if (err.response && err.response.status === 409) {
          setModalMessage("이미 존재하는 아이디 또는 이메일입니다.");
          setShowModal(true);
        } else {
          alert("회원가입 실패: " + err.message);
        }
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

      {/* ✅ 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            {modalMessage}
            <button onClick={() => setShowModal(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Join;
