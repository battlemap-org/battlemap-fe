import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <main style={{ flex: 1, paddingBottom: 84 /* footer 높이 + 여유 */ }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

<<<<<<< Updated upstream
export default Layout;
=======
export default Layout;
>>>>>>> Stashed changes
