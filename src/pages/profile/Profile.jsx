import React from 'react';
import { Settings, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header
      style={{
        position: 'relative',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 16px',
        background: '#fff',
      }}
    >
      <img
        src="/assets/logo_clean.png"
        alt="Battlemap 로고"
        style={{ height: 48, width: 'auto' }}
      />
      <div style={{ position: 'absolute', right: 16 }}>
        <Settings size={30} style={{ color: '#000' }} strokeWidth={1.5} />
      </div>
    </header>
  );
};

function Profile() {
  const userName = '사용자 이름'; 
  const points = 2650;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Header />

      <main style={{ padding: 16, background: '#fff' }}>
        {/* 프로필 영역 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <UserCircle size={100} style={{ color: '#000' }} strokeWidth={1} />
          <div
            style={{
              marginLeft: 16,
              height: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>{userName}</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: '#6b7280',
              }}
            >
              <span>사용 가능 포인트</span>
              <span
                style={{
                  background: '#FDE68A',
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontWeight: 600,
                }}
              >
                P {points}
              </span>
            </div>

            <button
              style={{
                marginTop: 8,
                background: '#5E936C',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                alignSelf: 'flex-start',
              }}
            >
              보유 쿠폰
            </button>
          </div>
        </div>

        {/* 구분선 */}
        <hr style={{ border: '1px solid #e5e7eb' }} />
        {/* 이하 추가 컨텐츠... */}
      </main>
    </div>
  );
}

export default Profile;