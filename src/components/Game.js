import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Game() {
  const [gameCode, setGameCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    setGameCode(code);

    const rooms = JSON.parse(localStorage.getItem('rooms')) || {};
    const room = rooms[code];

    if (room) {
      setPlayers(room.players);
      setGameStarted(room.gameStarted);
    }
  }, [location]);

  const startGame = () => {
    const rooms = JSON.parse(localStorage.getItem('rooms')) || {};
    const room = rooms[gameCode];

    if (room.players.length < 2) {
      alert("Необходимо хотя бы 2 игрока для начала игры.");
      return;
    }

    room.gameStarted = true;
    localStorage.setItem('rooms', JSON.stringify(rooms));
    setGameStarted(true);
    alert('Игра началась!');
  };

  return (
    <div>
      <h1>Игра началась!</h1>
      <p>Комната: {gameCode}</p>
      <h3>Список игроков:</h3>
      <ul>
        {players.map(player => <li key={player}>{player}</li>)}
      </ul>
      {gameStarted ? (
        <button disabled>Игра уже началась</button>
      ) : (
        <button onClick={startGame}>Начать игру</button>
      )}
    </div>
  );
}

export default Game;