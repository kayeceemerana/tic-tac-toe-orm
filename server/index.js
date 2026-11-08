import express from "express";
import cors from "cors";
import { sequelize, Game } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// READ all games (newest first)
app.get("/api/games", async (req, res) => {
  const games = await Game.findAll({ order: [["createdAt", "DESC"]] });
  res.json(games);
});

// CREATE a game
app.post("/api/games", async (req, res) => {
  const { winner, board } = req.body;
  const game = await Game.create({ winner, board });
  res.status(201).json(game);
});

// DELETE a game
app.delete("/api/games/:id", async (req, res) => {
  await Game.destroy({ where: { id: req.params.id } });
  res.sendStatus(204);
});

// Create the table if it doesn't exist, then start
await sequelize.sync();
app.listen(3001, () => console.log("API running on http://localhost:3001"));