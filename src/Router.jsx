import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 컴포넌트 임포트
import Onboarding from "./pages/onboarding/Onboarding.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import Filter from "./pages/filter/Filter.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Whereistoday from "./pages/whereistoday/Whereistoday.jsx";
import PickCafe from "./pages/pickCafe/PickCafe.jsx";
import QuestList from "./pages/questlist/QuestList.jsx";
import Bucheonmap from "./pages/bucheonmap/Bucheonmap.jsx";
import Entirelevel from "./pages/entirelevel/Entirelevel.jsx";
// 1. Footer가 포함된 올바른 Layout 컴포넌트를 임포트합니다.
import Layout from "./components/Layout.jsx";
import StatusModal from "./components/statusmodal/StatusModal.jsx";
import Myoccupy from "./pages/myoccupy/Myoccupy.jsx";

// 2. 기존 Router.jsx 파일에 있던 불필요한 Layout 함수는 제거합니다.

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout(Footer)가 필요 없는 페이지들 */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/whereistoday" element={<Whereistoday />} />
        {/* 3. Layout(Footer)가 필요한 페이지들을 그룹으로 묶습니다.
          <Layout />을 element로 사용하는 부모 Route를 만들고,
          그 안에 자식 Route들을 정의하면 됩니다.
          이제 여기에 포함된 모든 페이지는 Layout 컴포넌트의 <Outlet /> 위치에 렌더링되어
          자동으로 Footer를 가지게 됩니다.
        */}
        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/entirelevel" element={<Entirelevel />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/pickCafe" element={<PickCafe />} />
          <Route path="/questlist" element={<QuestList />} />
          <Route path="/bucheonmap" element={<Bucheonmap />} />
          <Route path="/statusModal" element={<StatusModal />} />
          <Route path="/myoccupy" element={<Myoccupy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
