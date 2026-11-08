const API = "http://localhost:3001/api/games";

export const getGames = () => fetch(API).then((r) => r.json());

export const saveGame = (winner, board) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ winner, board: board.map((c) => c ?? "-").join("") }),
  }).then((r) => r.json());

export const deleteGame = (id) => fetch(`${API}/${id}`, { method: "DELETE" });