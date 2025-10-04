import React from "react";
import "./Join.css";
import "../../index.css";
import { useNavigate } from "react-router-dom";

// 나중에 api연결할 부분
// function LogIn() {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     console.log("아이디:", id, "비번:", password);
//     // 여기서 나중에 fetch/axios로 백엔드 연결
//   };

function LogIn() {
  const navigate = useNavigate(); // 페이지 이동용 훅

  //회원가입 누르면 로그인으로 돌아감
  const handleJoin = () => {
    navigate("/login");
  };
  const backButton = () => {
    navigate("/login");
  };
  return (
    <div>
      {/* //로그인 텍스트 */}
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
            {/* value = {id} onChange={(e) => setImmediate(e.target.value)} */}
            <input placeholder="이름"></input>
            <img
              src="/assets/person.png"
              alt="이름 아이콘"
              className="lockicon"
            />
          </div>
          {/* 아이디입력칸 */}
          <div className="InputId">
            {/* value = {id} onChange={(e) => setImmediate(e.target.value)} */}
            <input placeholder="아이디"></input>
            <img
              src="/assets/person.png"
              alt="아이디 아이콘"
              className="lockicon"
            />
          </div>
          {/* 이메일 입력칸 */}
          <div className="InputEmail">
            {/* value = {id} onChange={(e) => setImmediate(e.target.value)} */}
            <input placeholder="sky@gmail.com"></input>
            <img
              src="/assets/Email.png"
              alt="이메일 아이콘"
              className="emailicon"
            />
          </div>

          <div>
            {/* value={password}
            onChange={(e) => setPassword(e.target.value)} */}
            <div className="InputPwd">
              <input type="password" placeholder="비밀번호 입력" />
              <img
                src="/assets/lock.png"
                alt="비밀번호 아이콘"
                className="lockicon"
              />
            </div>
          </div>

          <div>
            {/* value={password}
            onChange={(e) => setPassword(e.target.value)} */}
            <div className="InputPwd">
              <input type="password" placeholder="비밀번호 재입력" />
              <img
                src="/assets/lock.png"
                alt="비밀번호 아이콘"
                className="lockicon"
              />
            </div>

            <div>
              {/* //onClick 버튼 추가 및 회원가입누를 때 이동 페이지*/}
              <button className="JoinUserButton" onClick={handleJoin}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
