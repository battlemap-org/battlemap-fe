import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/onboarding/Onboarding.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </BrowserRouter>
  );
}
