import React from 'react';
import { Settings, UserCircle, Flag, ScrollText, Coffee } from 'lucide-react';

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
          <UserCircle size={120} style={{ color: '#000' }} strokeWidth={1} />
          <div
            style={{
              marginLeft: 16,
              height: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700 }}>{userName}</div>
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
        <hr style={{ border: '1px solid #e5e7eb', marginBottom: 24 }} />

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            현 시즌 점령 현황
          </div>
          <div style={{ fontSize: 18, color: '#374151', marginBottom: 2 }}>
            - 리그 순위: <span style={{ fontWeight: 600 }}>4위</span>
          </div>
          <div style={{ fontSize: 18, color: '#374151' }}>
            - 포인트: <span style={{ fontWeight: 600 }}>1550p</span>
          </div>
        </div>

        {/* 박스 3개 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 8,
            marginBottom: 8,
          }}
        >
          {/* 박스 1 */}
          <div
            style={{
              flex: 1,
              background: '#f3f4f6',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1 / 1',
            }}
          >
            <Flag size={52} style={{ color: '#374151' }} />
            <span style={{ marginTop: 8, fontWeight: 600 }}>7개</span>
          </div>

          {/* 박스 2 */}
          <div
            style={{
              flex: 1,
              background: '#f3f4f6',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1 / 1',
            }}
          >
            <ScrollText size={52} style={{ color: '#374151' }} />
            <span style={{ marginTop: 8, fontWeight: 600 }}>125개</span>
          </div>

          {/* 박스 3 */}
          <div
            style={{
              flex: 1,
              background: '#f3f4f6',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1 / 1',
            }}
          >
            <Coffee size={52} style={{ color: '#374151' }} />
            <span style={{ marginTop: 8, fontWeight: 600 }}>카페인 중독자</span>
          </div>
        </div>

        {/* 박스 하단 텍스트 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'center',
            color: '#44474bff',
            fontSize: 13,
            marginBottom: 24,
          }}
        >
          <span style={{ flex: 1 }}>총 점령 수</span>
          <span style={{ flex: 1 }}>총 퀘스트 수</span>
          <span style={{ flex: 1 }}>많이 활동한 카테고리</span>
        </div>

        {/* 그래프 이미지 */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <img
            src="/assets/graph.png"
            alt="활동 그래프"
            style={{
              width: '100%',
              maxWidth: 400,
              height: 'auto',
              borderRadius: 12,
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default Profile;
