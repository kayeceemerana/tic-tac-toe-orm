import { useEffect, useState } from "react";
import { getGames, deleteGame } from "./api";

export default function GameHistory({ refreshKey }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(setGames);
  }, [refreshKey]);

  const remove = async (id) => {
    await deleteGame(id);
    setGames((g) => g.filter((x) => x.id !== id));
  };

  return (
    <div>
      <h3 className="history-title">📜 Game History</h3>

      {games.length === 0 ? (
        <p className="empty">No games yet. Play one!</p>
      ) : (
        <ul className="history-list">
          {games.map((g) => (
            <li key={g.id} className="history-item">
              <span className="history-id">#{g.id}</span>
              <span className="history-time">
                {new Date(g.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span className={`badge ${g.winner}`}>
                {g.winner === "Draw" ? "Draw" : `${g.winner} won`}
              </span>
              <button
                className="btn-delete"
                onClick={() => remove(g.id)}
                title="Delete"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}