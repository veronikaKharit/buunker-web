import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinGame() {
  const [playerName, setPlayerName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleJoinGame = () => {
    const rooms = JSON.parse(localStorage.getItem('rooms')) || {};
    const room = rooms[gameCode];

    if (!room) {
      setErrorMessage("Комната с таким кодом не найдена.");
      return;
    }

    if (room.password !== password) {
      setErrorMessage("Неверный пароль.");
      return;
    }

    if (room.players.includes(playerName)) {
      setErrorMessage("Вы уже в этой игре.");
      return;
    }

    room.players.push(playerName);
    localStorage.setItem('rooms', JSON.stringify(rooms));
    alert(`${playerName}, вы зашли в комнату с кодом: ${gameCode}. Ожидаем остальных игроков.`);
    navigate(`/game?code=${gameCode}`);
  };

  return (
    <div className="welcome-container">
      <h1>Войти в игру</h1>
      <input
        type="text"
        placeholder="Ваше имя"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Код игры"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleJoinGame}>Войти в игру</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default JoinGame;