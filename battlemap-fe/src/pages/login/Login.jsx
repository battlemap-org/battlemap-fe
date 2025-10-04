import React from "react";
import "./Login.css";
import "../../index.css";

// 나중에 api연결할 부분
// function LogIn() {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     console.log("아이디:", id, "비번:", password);
//     // 여기서 나중에 fetch/axios로 백엔드 연결
//   };

function LogIn() {
  return (
    //로그인 텍스트
    <div className="login-container">
      <div className="titleWrap">로그인</div>
      {/* 아이디입력칸 */}
      <div className="contentWrap">
        <div className="InputId">
          <input placeholder="아이디"></input>
          <img
            src="/assets/person.png"
            alt="아이디 아이콘"
            className="personicon"
          />
        </div>
        <div>
          <div className="InputPwd">
            <input type="password" placeholder="비밀번호" />
            <img
              src="/assets/lock.png"
              alt="비밀번호 아이콘"
              className="lockicon"
            />
          </div>
        </div>
        <div>
          {/* //onClick={handleLogin} 추가필요 */}
          <button className="LoginButton">로그인</button>
        </div>
        <hr className="slice"></hr>
        <div className="MakeUser">계정이 없으신가요? 계정을 만들어보세요</div>
        <div>
          {/* //onClick 버튼 추가 */}
          <button className="JoinUserButton">회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
