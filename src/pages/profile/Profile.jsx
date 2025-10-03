import React from 'react';

// Header는 프로필 페이지의 일부입니다.
const Header = () => {
  return (
    <header className="w-full h-16 flex justify-center items-center border-b border-gray-200">
      <img src="/assets/logo_clean.png" alt="Battlemap 로고" className="h-8" />
    </header>
  );
};

function Profile() {
  return (
    // 이 div가 Layout의 main 영역을 꽉 채우도록 flex 구조를 만듭니다.
    <div className="flex flex-col h-full">
      <Header />

      {/* 이 main이 Header를 제외한 남은 공간을 모두 차지합니다. */}
      <main className="flex-grow p-4">
        <h1 className="text-2xl font-bold">프로필</h1>
        <p>여기에 본문 내용을 채워주세요.</p>
        <p>내용이 짧아도 Footer는 아래에 붙어있을 거예요.</p>
      </main>
    </div>
  );
}

export default Profile;