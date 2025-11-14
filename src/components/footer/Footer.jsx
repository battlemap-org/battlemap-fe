import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, ClipboardList, User } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const menubar = [
    { icon: Home, path: '/bucheonmap' },
    { icon: Trophy, path: '/entirelevel' },
    { icon: ClipboardList, path: '/myoccupy' },
    { icon: User, path: '/profile' },
  ];

  return (
    <footer className="footer-container">
      {menubar.map(({ icon: Icon, path }) => (
        <NavLink
          key={path}
          to={path}

          className={({ isActive }) =>
            isActive ? 'footer-navlink active' : 'footer-navlink'
          }
        >
          <Icon size={36} />
        </NavLink>
      ))}
    </footer>
  );
};

export default Footer;