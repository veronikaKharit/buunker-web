import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateGame() {
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  const generateGameCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return code;
  };

  const handleCreateGame = () => {
    if (!playerName) {
      alert('Пожалуйста, введите имя');
      return;
    }

    const code = generateGameCode();
    const rooms = JSON.parse(localStorage.getItem('rooms')) || {};

    rooms[code] = {
      creator: playerName,
      players: [playerName],
      gameStarted: false,
    };

    localStorage.setItem('rooms', JSON.stringify(rooms));
    setPlayers([playerName]);  // Вставляем игрока
    setGameCode(code);  // Показываем код игры
    alert(`Комната создана! Код игры: ${code}`);
  };

  return (
    <div className="create-game-container">
      <h1>Создание игры</h1>
      <input
        type="text"
        placeholder="Ваше имя"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={handleCreateGame}>Создать комнату</button>
      {gameCode && (
        <div>
          <p>Код вашей комнаты: {gameCode}</p>
          <h3>Игроки:</h3>
          <ul>
            {players.map(player => <li key={player}>{player}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateGame;