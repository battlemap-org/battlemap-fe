import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/onboarding/Onboarding.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import Profile from "./pages/profile/Profile.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
