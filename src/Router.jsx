import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지 컴포넌트 임포트
import Onboarding from './pages/onboarding/Onboarding.jsx';
import Login from './pages/login/Login.jsx';
import Join from './pages/join/Join.jsx';
import Filter from './pages/filter/Filter.jsx';
import Profile from './pages/profile/Profile.jsx';
import Whereistoday from './pages/whereistoday/Whereistoday.jsx';
import Layout from './components/Layout.jsx';


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout(Footer)가 필요 없는 페이지들 */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/filter" element={<Filter />} />

        <Route element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/whereistoday" element={<Whereistoday />} />
          {/* 여기에 /ranking 등 Footer가 필요한 다른 페이지들도 추가하면 됩니다. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}