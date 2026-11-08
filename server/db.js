import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // file created automatically
  logging: false,
});

// Table: Games (id, createdAt, updatedAt are added automatically)
export const Game = sequelize.define("Game", {
  winner: { type: DataTypes.STRING, allowNull: false }, // "X", "O" or "Draw"
  board: { type: DataTypes.STRING, allowNull: false },  // e.g. "XOX-O-..."
});