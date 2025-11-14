import axios from "axios";
import React, { useState } from "react";
import "../../index.css";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("http://3.39.56.40:8080/api/users/login", { id, pw })
      .then((res) => {
        console.log("로그인 응답 전체:", res.data);

        const success = res.data?.success;

        // 토큰 저장
        const token = success?.token;
        if (token) {
          localStorage.setItem("token", token);
          console.log("토큰 저장 완료:", token);
        } else {
          console.warn("서버 응답에 token이 없습니다.");
        }

        const userColor = success?.userColorCode;
        const myName = success?.name;

        if (userColor) {
          localStorage.setItem("userColor", userColor);
          console.log("userColor 저장 완료:", userColor);
        } else {
          console.warn("서버 응답에 userColorCode가 없습니다.");
        }

        if (myName) {
          localStorage.setItem("myName", myName);
          console.log("myName 저장 완료:", myName);
        } else {
          console.warn("서버 응답에 name이 없습니다.");
        }

        // userId (두 형태 모두 대응)
        const userId = success?.user_id || success?.userId;
        console.log("userId 변수에 최종 할당된 값:", userId);

        if (userId) {
          localStorage.setItem("userId", userId);
          console.log("userId 저장 완료:", userId);
        } else {
          console.warn(
            "서버 응답에 userId가 없습니다. Profile 페이지에서 충전이 작동하지 않을 수 있습니다."
          );
        }

        navigate("/whereistoday");
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
        alert("아이디 또는 비밀번호를 확인하세요!");
      });
  };

  const handleJoinClick = () => {
    navigate("/join");
  };

  return (
    <div className="login-container">
      <div className="titleWrap">로그인</div>

      <div className="contentWrap">
        <div className="InputId">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
          />
          <img
            src="/assets/person.png"
            alt="아이디 아이콘"
            className="personicon"
          />
        </div>

        <div className="InputPwd">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호"
          />
          <img
            src="/assets/lock.png"
            alt="비밀번호 아이콘"
            className="lockicon"
          />
        </div>

        <div>
          <button className="LoginButton" onClick={handleRegister}>
            로그인
          </button>
        </div>

        <hr className="slice" />

        <div className="MakeUser">계정이 없으신가요? 계정을 만들어보세요</div>

        <div>
          <button className="JoinUserButton" onClick={handleJoinClick}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
