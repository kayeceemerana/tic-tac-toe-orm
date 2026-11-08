import { useState } from "react";
import { saveGame } from "./api";
import GameHistory from "./GameHistory";
import "./App.css";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function getResult(board) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return board.every(Boolean) ? { winner: "Draw", line: [] } : null;
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [result, setResult] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  async function handleClick(i) {
    if (board[i] || result) return;

    const next = [...board];
    next[i] = xTurn ? "X" : "O";
    setBoard(next);
    setXTurn(!xTurn);

    const outcome = getResult(next);
    if (outcome) {
      setResult(outcome);
      await saveGame(outcome.winner, next);
      setRefreshKey((k) => k + 1);
    }
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setResult(null);
  }

  let statusText = `Next player: ${xTurn ? "X" : "O"}`;
  let statusClass = "status";
  if (result?.winner === "Draw") {
    statusText = "It's a draw!";
    statusClass += " draw";
  } else if (result) {
    statusText = `🎉 ${result.winner} wins!`;
    statusClass += " win";
  }

  return (
    <>
      <div className="card">
        <h1 className="title">Tic-Tac-Toe</h1>
        <div className={statusClass}>{statusText}</div>

        <div className="board">
          {board.map((cell, i) => (
            <button
              key={i}
              className={`cell ${cell ?? ""} ${
                result?.line.includes(i) ? "win" : ""
              }`}
              onClick={() => handleClick(i)}
              disabled={!!cell || !!result}
            >
              {cell}
            </button>
          ))}
        </div>

        <button className="btn-new" onClick={reset}>
          New Game
        </button>
      </div>

      <div className="card">
        <GameHistory refreshKey={refreshKey} />
      </div>
    </>
  );
}