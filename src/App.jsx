import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<div style={{padding:16}}>홈페이지입니다.</div>} />
          <Route path="/map" element={<div style={{padding:16}}>맛집 지도 페이지</div>} />
          <Route path="/archive" element={<div style={{padding:16}}>찜한 목록 페이지</div>} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
