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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
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
          <button className="LoginButton">로그인</button>
        </div>
        <hr className="slice"></hr>
        <div className="MakeUser">계정이 없으신가요? 계정을 만들어보세요</div>
        <div>
          <button className="JoinUserButton">회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
