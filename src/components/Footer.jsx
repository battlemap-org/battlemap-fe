import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, ClipboardList, User } from 'lucide-react';

function Footer() {
  const menuItems = [
    { icon: <Home size={24} />, path: '/map' },
    { icon: <Trophy size={24} />, path: '/ranking' },
    { icon: <ClipboardList size={24} />, path: '/result' },
    { icon: <User size={24} />, path: '/profile' },
  ];

  return (
    /* fixed bottom-0 클래스를 사용해 항상 화면 맨 아래에 고정시킵니다. */
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">
      <nav className="h-16 flex justify-around items-center">
        {menuItems.map(({ icon, path, label }) => (
          <NavLink
            key={path}
            to={path}
            /* NavLink의 isActive 속성을 사용해 현재 활성화된 페이지의 아이콘 색상을 변경합니다. */
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </footer>
  );
}

export default Footer;