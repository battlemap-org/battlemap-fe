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
        bottom: 0,
        left: 0,
        width: '100%',
        height: 64,
        background: '#fff',
        borderTop: '1px solid #e5e7eb',
        zIndex: 1000,
      }}
    >
      <nav
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {menubar.map(({ icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            style={() => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#000',
            })}
          >
            <Icon size={36} style={{ color: '#000' }} />
          </NavLink>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;