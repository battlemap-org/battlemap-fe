import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout'; // 1. Layout을 import 합니다.
import Profile from './pages/profile/Profile';
// TODO: 나중에 홈페이지 컴포넌트도 만들어서 import 해야 합니다.
// import Home from './pages/home/Home'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 2. Layout Route가 다른 Route들을 감싸도록 구조를 변경합니다. */}
        <Route element={<Layout />}>
          {/* 이제 이 안에 있는 모든 페이지들은 Layout의 <Outlet />으로 들어갑니다. */}
          <Route path="/" element={<div>홈페이지입니다.</div>} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;