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
    console.log("서버로 보낼 ID:", id); // <-- 확인용
    console.log("서버로 보낼 PW:", pw); // <-- 확인용
    axios
      .post("http://3.39.56.40:8080/api/users/login", {
        id,
        pw,
      })
      .then((res) => {
        console.log("로그인 응답 전체:", res.data);

        const success = res.data?.success;
        // --- 디버깅 로그 추가 ---
        console.log("success 객체 자체:", success);
        // ----------------------

        const token = success?.token;
        if (token) {
          localStorage.setItem("token", token);
          console.log("localStorage에 토큰 저장 완료:", token);
        } else {
          console.warn("서버 응답에 token이 없습니다.");
        }

        // --- 여기가 핵심 디버깅 ---
        console.log("success.user_id 값 (그대로):", success.user_id);
        console.log("success?.user_id 값 (optional):", success?.user_id);
        console.log("success?.userId 값 (camelCase):", success?.userId);
        // ----------------------

        const userId = success?.user_id || success?.userId;

        // --- 최종 변수 값 확인 ---
        console.log("userId 변수에 최종 할당된 값:", userId);
        // ----------------------

        if (userId) {
          // <-- 여기서 false가 되는지 확인
          localStorage.setItem("userId", userId);
          console.log("localStorage에 userId 저장 완료:", userId);
        } else {
          console.warn(
            // <-- 이 로그가 뜨는지 확인
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
    navigate("/join"); // join 페이지로 이동
  };

  return (
    <div className="login-container">
      <div className="titleWrap">로그인</div>{" "}
      <div className="contentWrap">
        {" "}
        <div className="InputId">
          {" "}
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
          ></input>{" "}
          <img
            src="/assets/person.png"
            alt="아이디 아이콘"
            className="personicon"
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <div className="InputPwd">
            {" "}
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호"
            />{" "}
            <img
              src="/assets/lock.png"
              alt="비밀번호 아이콘"
              className="lockicon"
            />{" "}
          </div>{" "}
        </div>{" "}
        <div>
          {" "}
          <button className="LoginButton" onClick={handleRegister}>
            로그인{" "}
          </button>{" "}
        </div>
        <hr className="slice"></hr>{" "}
        <div className="MakeUser">계정이 없으신가요? 계정을 만들어보세요</div>{" "}
        <div>
          {" "}
          <button className="JoinUserButton" onClick={handleJoinClick}>
            회원가입{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default LogIn;
