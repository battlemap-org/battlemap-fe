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
      .post("http://3.35.246.97:8081/api/users/login", {
        id,
        pw,
      })
      .then((res) => {
        console.log("로그인 성공:", res.data);

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          console.log("localStorage에 토큰 저장 완료");
        }

        {/* [수정] user_id도 localStorage에 저장합니다. */}
        {/* (서버 응답에 userId 필드가 있다고 가정) */}
        if (res.data.userId) { 
          localStorage.setItem("userId", res.data.userId);
          console.log("localStorage에 userId 저장 완료");
        } else {
          // 서버가 userId를 주지 않으면 이 경고가 뜹니다.
          console.warn("서버 응답에 userId가 없습니다. Profile 페이지에서 충전이 작동하지 않을 수 있습니다.");
        }

        navigate("/whereistoday"); //성공하면 도시 선택으로 이동
      })
      .catch((err) => {
        console.error("로그인 실패:", err);
        alert("아이디 또는 비밀번호를 확인하세요!");
      });
  };
  const handleJoinClick = () => {
    navigate("/join"); // join 페이지로 이동
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
          ></input>
          <img
            src="/assets/person.png"
            alt="아이디 아이콘"
            className="personicon"
          />
        </div>
        <div>
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
        </div>
        <div>
          <button className="LoginButton" onClick={handleRegister}>
            로그인
          </button>
        </div>
        <hr className="slice"></hr>
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