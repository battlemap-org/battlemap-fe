import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, ClipboardList, User } from 'lucide-react';

const Footer = () => {
  const menubar = [
    { icon: Home, path: '/' },
    { icon: Trophy, path: '/ranking' },
    { icon: ClipboardList, path: '/result' },
    { icon: User, path: '/profile' },
  ];

  return (
    <footer
      style={{
        position: 'fixed',
        // 1. 화면 하단 고정을 위한 'bottom: 0'만 남겼습니다.
        bottom: 0,
        
        // 2. 제가 임의로 추가했던 left, right, margin, maxWidth 속성을 모두 삭제했습니다.
        //    이제 보내주신 원본 코드처럼 동작합니다.
        width: '100%',
        height: 64,
        background: '#fff',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      {menubar.map(({ icon: Icon, path }) => (
        <NavLink
          key={path}
          to={path}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#000',
          }}
        >
          <Icon size={36} style={{ color: '#000' }} />
        </NavLink>
      ))}
    </footer>
  );
};

export default Footer;