import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/onboarding/Onboarding.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
}
