import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/onboarding/Onboarding.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import Filter from "./pages/filter/Filter.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Whereistoday from "./pages/whereistoday/Whereistoday.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/whereistoday" element={<Whereistoday />} />
      </Routes>
    </BrowserRouter>
  );
}
