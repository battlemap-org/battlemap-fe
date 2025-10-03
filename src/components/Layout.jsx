import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout() {
  return (
    // 이 div가 전체적인 '틀' 역할을 합니다.
    <div className="flex flex-col h-screen">
      {/* 본문 내용이 들어올 자리 */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer는 항상 아래에 붙어있게 됩니다. */}
      <Footer />
    </div>
  );
}

export default Layout;