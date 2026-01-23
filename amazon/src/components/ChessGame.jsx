import React, { useState, useEffect } from 'react';
import './ChessGame.css';

const ChessGame = () => {
  const [board, setBoard] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [gameStatus, setGameStatus] = useState('playing');
  const [moveHistory, setMoveHistory] = useState([]);

  // Initialize chess board
  const initializeBoard = () => {
    const initialBoard = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Place pawns
    for (let i = 0; i < 8; i++) {
      initialBoard[1][i] = { type: 'pawn', color: 'black' };
      initialBoard[6][i] = { type: 'pawn', color: 'white' };
    }
    
    // Place rooks
    initialBoard[0][0] = { type: 'rook', color: 'black' };
    initialBoard[0][7] = { type: 'rook', color: 'black' };
    initialBoard[7][0] = { type: 'rook', color: 'white' };
    initialBoard[7][7] = { type: 'rook', color: 'white' };
    
    // Place knights
    initialBoard[0][1] = { type: 'knight', color: 'black' };
    initialBoard[0][6] = { type: 'knight', color: 'black' };
    initialBoard[7][1] = { type: 'knight', color: 'white' };
    initialBoard[7][6] = { type: 'knight', color: 'white' };
    
    // Place bishops
    initialBoard[0][2] = { type: 'bishop', color: 'black' };
    initialBoard[0][5] = { type: 'bishop', color: 'black' };
    initialBoard[7][2] = { type: 'bishop', color: 'white' };
    initialBoard[7][5] = { type: 'bishop', color: 'white' };
    
    // Place queens
    initialBoard[0][3] = { type: 'queen', color: 'black' };
    initialBoard[7][3] = { type: 'queen', color: 'white' };
    
    // Place kings
    initialBoard[0][4] = { type: 'king', color: 'black' };
    initialBoard[7][4] = { type: 'king', color: 'white' };
    
    return initialBoard;
  };

  useEffect(() => {
    setBoard(initializeBoard());
  }, []);

  const getPieceSymbol = (piece) => {
    if (!piece) return '';
    const symbols = {
      white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
      },
      black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
      }
    };
    return symbols[piece.color][piece.type];
  };

  const isValidMove = (from, to, piece, boardState) => {
    if (!piece) return false;
    
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const targetPiece = boardState[toRow][toCol];
    
    // Can't capture own pieces
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    // Basic movement validation (simplified)
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Forward move
        if (fromCol === toCol && !targetPiece) {
          if (toRow === fromRow + direction) return true;
          if (fromRow === startRow && toRow === fromRow + 2 * direction) return true;
        }
        // Diagonal capture
        if (colDiff === 1 && rowDiff === 1 && targetPiece && targetPiece.color !== piece.color) {
          return toRow === fromRow + direction;
        }
        return false;
        
      case 'rook':
        return (rowDiff === 0 || colDiff === 0) && isPathClear(from, to, boardState);
        
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        
      case 'bishop':
        return rowDiff === colDiff && isPathClear(from, to, boardState);
        
      case 'queen':
        return ((rowDiff === 0 || colDiff === 0) || (rowDiff === colDiff)) && isPathClear(from, to, boardState);
        
      case 'king':
        return rowDiff <= 1 && colDiff <= 1;
        
      default:
        return false;
    }
  };

  const isPathClear = (from, to, boardState) => {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;
    const rowStep = toRow === fromRow ? 0 : (toRow > fromRow ? 1 : -1);
    const colStep = toCol === fromCol ? 0 : (toCol > fromCol ? 1 : -1);
    
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
    
    while (currentRow !== toRow || currentCol !== toCol) {
      if (boardState[currentRow][currentCol]) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return true;
  };

  const handleSquareClick = (row, col) => {
    const piece = board[row][col];
    
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare;
      const selectedPiece = board[selectedRow][selectedCol];
      
      // If clicking on own piece, change selection
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
        return;
      }
      
      // Try to make a move
      if (isValidMove(selectedSquare, [row, col], selectedPiece, board)) {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = selectedPiece;
        newBoard[selectedRow][selectedCol] = null;
        
        setBoard(newBoard);
        setMoveHistory([...moveHistory, {
          from: selectedSquare,
          to: [row, col],
          piece: selectedPiece
        }]);
        
        // Switch player (for single player, we'll just toggle)
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        setSelectedSquare(null);
      } else {
        // Invalid move, clear selection or select new piece
        if (piece && piece.color === currentPlayer) {
          setSelectedSquare([row, col]);
        } else {
          setSelectedSquare(null);
        }
      }
    } else {
      // Select a piece
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
      }
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setSelectedSquare(null);
    setCurrentPlayer('white');
    setGameStatus('playing');
    setMoveHistory([]);
  };

  const getValidMoves = (square, piece, boardState) => {
    if (!piece) return [];
    
    const validMoves = [];
    const [row, col] = square;
    
    // Check all squares on the board
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (isValidMove(square, [r, c], piece, boardState)) {
          validMoves.push([r, c]);
        }
      }
    }
    
    return validMoves;
  };

  const getSquareClass = (row, col) => {
    let className = 'chess-square';
    className += (row + col) % 2 === 0 ? ' light' : ' dark';
    
    if (selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col) {
      className += ' selected';
    }
    
    return className;
  };

  const isValidMoveSquare = (row, col) => {
    if (!selectedSquare) return false;
    const [selectedRow, selectedCol] = selectedSquare;
    const selectedPiece = board[selectedRow][selectedCol];
    if (!selectedPiece) return false;
    
    const validMoves = getValidMoves(selectedSquare, selectedPiece, board);
    return validMoves.some(([r, c]) => r === row && c === col);
  };

  return (
    <section id="game" className="chess-game">
      <div className="chess-game-container">
        <div className="game-header">
          <h2 className="game-title">Chess Game</h2>
          <div className="game-info">
            <div className="turn-indicator">
              <p className="turn-label">Current Turn:</p>
              <p className={`current-player player-${currentPlayer}`}>
                {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} Player
              </p>
            </div>
            <button className="reset-button" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </div>
        
        <div className="chess-board">
          <div className="board-labels-row">
            <div className="label"></div>
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
              <div key={letter} className="board-label">{letter}</div>
            ))}
          </div>
          
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="chess-row">
              <div className="board-label">{8 - rowIndex}</div>
              {row.map((piece, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getSquareClass(rowIndex, colIndex)}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                >
                  {piece && (
                    <span className="chess-piece">
                      {getPieceSymbol(piece)}
                    </span>
                  )}
                  {isValidMoveSquare(rowIndex, colIndex) && (
                    <span className={`valid-move-indicator ${piece ? 'capture' : ''}`}></span>
                  )}
                </div>
              ))}
              <div className="board-label">{8 - rowIndex}</div>
            </div>
          ))}
          
          <div className="board-labels-row">
            <div className="label"></div>
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
              <div key={letter} className="board-label">{letter}</div>
            ))}
          </div>
        </div>
        
        {moveHistory.length > 0 && (
          <div className="move-history">
            <h3>Move History</h3>
            <div className="history-list">
              {moveHistory.slice(-10).map((move, index) => (
                <div key={index} className="history-item">
                  Move {index + 1}: {String.fromCharCode(97 + move.from[1])}{8 - move.from[0]} → {String.fromCharCode(97 + move.to[1])}{8 - move.to[0]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChessGame;
