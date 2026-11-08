# Tic-Tac-Toe with ORM

A tic-tac-toe game built with React (Vite). Every finished game is saved to a
SQLite database using the Sequelize ORM through an Express API.

## Tech stack
- React + Vite (frontend)
- Express (API)
- Sequelize ORM + SQLite (database)

## How to run
```bash
npm install
npm install sequelize sqlite3 express cors
node server/index.js   # terminal 1: API on http://localhost:3001
npm run dev            # terminal 2: React app
```

## Features
- Playable tic-tac-toe with winner highlight
- Game history saved to the database (Create, Read, Delete)
