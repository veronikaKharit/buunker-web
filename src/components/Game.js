import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Списки для генерации характеристик
const GENDERS = ['Мужской', 'Женский'];
const BODY_TYPES = ['Худощавое', 'Спортивное', 'Полное', 'Мускулистое', 'Хрупкое'];
const TRAITS = ['Добрый', 'Хитрый', 'Честный', 'Эгоистичный', 'Альтруист', 'Лидер', 'Оптимист', 'Пессимист'];
const PROFESSIONS = ['Врач', 'Инженер', 'Учитель', 'Военный', 'Фермер', 'Программист', 'Ученый', 'Повар'];
const HEALTH_STATUSES = ['Здоров', 'Астма', 'Диабет', 'Аллергия', 'Сердечное заболевание', 'Инвалидность'];
const HOBBIES = ['Чтение', 'Садоводство', 'Кулинария', 'Охота', 'Рыбалка', 'Спорт', 'Музыка', 'Рисование'];
const PHOBIAS = ['Арахнофобия', 'Клаустрофобия', 'Акрофобия', 'Агорафобия', 'Авиафобия', 'Никтофобия'];
const INVENTORY_ITEMS = ['Генератор', 'Аптечка', 'Запас воды', 'Семена растений', 'Оружейный набор', 'Научное оборудование'];
const BACKPACK_ITEMS = ['Фонарик', 'Нож', 'Рация', 'Компас', 'Карта', 'Книга выживания'];
const ADDITIONAL_INFO = ['Бывший заключенный', 'Экстрасенс', 'Ученый-вирусолог', 'Бывший военный', 'Выживальщик'];
const SPECIAL_ABILITIES = ['Медицинские знания', 'Боевая подготовка', 'Сельскохозяйственные навыки', 'Технические навыки', 'Лидерские качества'];

// Генератор случайных элементов из массива
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Генерация характеристик для игрока
const generatePlayerTraits = () => ({
  gender: getRandomElement(GENDERS),
  bodyType: getRandomElement(BODY_TYPES),
  trait: getRandomElement(TRAITS),
  profession: getRandomElement(PROFESSIONS),
  health: getRandomElement(HEALTH_STATUSES),
  hobby: getRandomElement(HOBBIES),
  phobia: getRandomElement(PHOBIAS),
  inventory: getRandomElement(INVENTORY_ITEMS),
  backpack: getRandomElement(BACKPACK_ITEMS),
  additionalInfo: getRandomElement(ADDITIONAL_INFO),
  specialAbility: getRandomElement(SPECIAL_ABILITIES),
});

// Данные об апокалипсисе
const DISASTER = {
  title: "Ядерная зима",
  description: "Глобальный ядерный конфликт привел к ядерной зиме. Поверхность Земли покрыта радиоактивными осадками, температура упала до -50°C. Солнечный свет почти не проникает через плотные облака пепла."
};

// Данные о бункере
const BUNKER = {
  size: "150 кв. метров",
  duration: "5 лет",
  foodSupply: "Консервированные продукты на 3 года",
  features: "Система очистки воздуха, гидропонная ферма, генератор на геотермальной энергии"
};

function Game() {
  const [gameCode, setGameCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerTraits, setPlayerTraits] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // Обработчик событий хранилища
  const handleStorageChange = (e) => {
    if (e.key === 'rooms') {
      loadRoomData();
    }
  };

  const loadRoomData = () => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const player = params.get("player");
    
    setGameCode(code);
    setPlayerName(player);
    const rooms = JSON.parse(localStorage.getItem('rooms')) ||  {};
    const room = rooms[code];
    
    if (room) {
      setPlayers(room.players);
      setGameStarted(room.gameStarted);
      
      // Если игра начата, но состояние не обновилось
      if (room.gameStarted && !gameStarted) {
        setGameStarted(true);
        // Генерация характеристик для игроков
        generateTraitsForPlayers(room.players);
      }
    }
  };

  // Генерация характеристик для всех игроков
  const generateTraitsForPlayers = (playersList) => {
    const traits = {};
    playersList.forEach(player => {
      traits[player] = generatePlayerTraits();
    });
    setPlayerTraits(traits);
  };

  useEffect(() => {
    loadRoomData();
    
    // Слушаем изменения в localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Проверяем обновления каждую секунду
    const interval = setInterval(loadRoomData, 1000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location, navigate]);

  // Если игра еще не начата
  if (!gameStarted) {
    return (
      <div className="game-container">
        <h1>Ожидание начала игры</h1>
        <p>Комната: {gameCode}</p>
        <p>Ваше имя: {playerName}</p>
        <h3>Игроки в комнате ({players.length}):</h3>
        <ul className="players-list">
          {players.map((player, index) => (
            <li key={index} className={player === playerName ? "current-player" : ""}>
              {player} {player === playerName && "(Вы)"}
            </li>
          ))}
        </ul>
        <p>Ожидаем, когда создатель начнет игру...</p>
      </div>
    );
  }

  // Список характеристик для таблицы
  const traitsList = [
    { key: 'gender', label: 'Пол' },
    { key: 'bodyType', label: 'Телосложение' },
    { key: 'trait', label: 'Человеческая черта' },
    { key: 'profession', label: 'Профессия' },
    { key: 'health', label: 'Здоровье' },
    { key: 'hobby', label: 'Хобби / Увлечение' },
    { key: 'phobia', label: 'Фобия / Страх' },
    { key: 'inventory', label: 'Крупный инвентарь' },
    { key: 'backpack', label: 'Рюкзак' },
    { key: 'additionalInfo', label: 'Дополнительное сведение' },
    { key: 'specialAbility', label: 'Спец. возможность' }
  ];

  // Игра началась - показываем основной интерфейс
  return (
    <div className="game-container">
      <h1>Игра "Бункер" началась!</h1>
      
      <div className="disaster-info">
        <h2>Катаклизм: {DISASTER.title}</h2>
        <p>{DISASTER.description}</p>
      </div>
      
      <div className="bunker-info">
        <h2>Бункер</h2>
        <p><strong>Размер:</strong> {BUNKER.size}</p>
        <p><strong>Время нахождения:</strong> {BUNKER.duration}</p>
        <p><strong>Количество еды:</strong> {BUNKER.foodSupply}</p>
        <p><strong>Особенности:</strong> {BUNKER.features}</p>
      </div>
      
      <div className="game-info">
        <p>Код комнаты: <span className="highlight">{gameCode}</span></p>
        <p>Ваше имя: <span className="highlight">{playerName}</span></p>
      </div>
      
      <div className="traits-table-container">
        <h2>Характеристики игроков</h2>
        <table className="traits-table">
          <thead>
            <tr>
              <th>Характеристика</th>
              {players.map((player, index) => (
                <th key={index} className={player === playerName ? "current-player" : ""}>
                  {player} {player === playerName && "(Вы)"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {traitsList.map((trait) => (
              <tr key={trait.key}>
                <td>{trait.label}</td>
                {players.map((player) => (
                  <td key={`${trait.key}-${player}`}>
                    {playerTraits[player]?.[trait.key]||'Загрузка...'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default Game;