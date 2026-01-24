import React, { useState } from 'react';
import './Tutorials.css';

const Tutorials = () => {
  const [activeTab, setActiveTab] = useState('basics');

  const tutorialContent = {
    basics: {
      title: 'Chess Basics',
      content: [
        'Chess is played on an 8x8 board with 64 squares.',
        'Each player starts with 16 pieces: 8 pawns, 2 rooks, 2 knights, 2 bishops, 1 queen, and 1 king.',
        'The goal is to checkmate your opponent\'s king.',
        'White always moves first.',
        'Each piece moves in a specific way - learn the movement patterns!'
      ]
    },
    pieces: {
      title: 'Piece Movements',
      content: [
        'Pawn: Moves forward one square (two on first move), captures diagonally.',
        'Rook: Moves horizontally or vertically any number of squares.',
        'Knight: Moves in an L-shape (2 squares in one direction, 1 square perpendicular).',
        'Bishop: Moves diagonally any number of squares.',
        'Queen: Moves in any direction (horizontal, vertical, diagonal) any number of squares.',
        'King: Moves one square in any direction. Cannot move into check.'
      ]
    },
    rules: {
      title: 'Important Rules',
      content: [
        'Check: When the king is under attack and must move or be protected.',
        'Checkmate: When the king is in check and cannot escape.',
        'Castling: Special move involving the king and rook (under certain conditions).',
        'En passant: Special pawn capture move.',
        'Promotion: When a pawn reaches the opposite end, it can become any piece (usually a queen).'
      ]
    }
  };

  return (
    <section id="tutorials" className="tutorials">
      <div className="tutorials-container">
        <h2 className="tutorials-title">Chess Tutorials</h2>
        
        <div className="tutorials-tabs">
          <button
            className={`tutorial-tab ${activeTab === 'basics' ? 'active' : ''}`}
            onClick={() => setActiveTab('basics')}
          >
            Basics
          </button>
          <button
            className={`tutorial-tab ${activeTab === 'pieces' ? 'active' : ''}`}
            onClick={() => setActiveTab('pieces')}
          >
            Pieces
          </button>
          <button
            className={`tutorial-tab ${activeTab === 'rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('rules')}
          >
            Rules
          </button>
        </div>

        <div className="tutorial-content">
          <h3 className="tutorial-content-title">
            {tutorialContent[activeTab].title}
          </h3>
          <ul className="tutorial-list">
            {tutorialContent[activeTab].content.map((item, index) => (
              <li key={index} className="tutorial-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Tutorials;
