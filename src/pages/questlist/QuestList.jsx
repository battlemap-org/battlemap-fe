import React from 'react';
import './QuestList.css'; 
import Header from '../../components/header/Header';
import Footer from '../../components/Footer';

const questListData = [
  { id: 1, name: '퀘스트 1', points: 50 },
  { id: 2, name: '퀘스트 2', points: 50 },
  { id: 3, name: '퀘스트 3', points: 100 },
  { id: 4, name: '퀘스트 4', points: 150 },
  { id: 5, name: '퀘스트 5', points: 150 },
];

function QuestList() { 
  return (
    <>
      <Header />
      <div className="page-wrapper">d
        <nav className="navigation">
          <button className="back-button">
            {'<'}
          </button>
          <div className="title">퀘스트</div>
        </nav>

        <div className="location-info">
          <img src="/assets/location.png" alt="위치" />
          <span>분더커피바</span>
        </div>

        <div className="quest-list-container">
          {questListData.map((quest) => (
            <div className="quest-item" key={quest.id}>
              <span>{quest.name}</span>
              <div className="questlist-point">
                <img src="/assets/point.png" alt="포인트" />
                <span>{quest.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default QuestList;