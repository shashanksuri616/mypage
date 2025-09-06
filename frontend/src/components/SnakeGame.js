import { useState, useEffect, useRef } from "react";

const BOARD_SIZE = 15;
const INITIAL_SNAKE = [
  { x: 7, y: 7 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

function getRandomFood(snake) {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(seg => seg.x === food.x && seg.y === food.y));
  return food;
}

const SPEEDS = [180, 120, 80, 50];
const SPEED_LABELS = ["Easy", "Normal", "Fast", "Insane"];

const COLORS = [
  "bg-purple-500",
  "bg-fuchsia-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-pink-400",
  "bg-red-400",
  "bg-indigo-400",
];

const EMOJIS = [
  "🟣", "🟪", "🟡", "🟩", "🔵", "🟫", "🟥", "🟦"
];

const FOOD_EMOJIS = ["🍪", "🍎", "🍉", "🍒", "🍋", "🍇", "🍓", "🥝"];

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem("snakeHighScore")) || 0);
  const [paused, setPaused] = useState(false);
  const [walls, setWalls] = useState(false);
  const [emojiMode, setEmojiMode] = useState(false);
  const [foodEmojiIdx, setFoodEmojiIdx] = useState(0);
  const [theme, setTheme] = useState("classic");
  const moveRef = useRef(direction);

  // Theme presets for more fun
  const THEMES = [
    { name: "Classic", colors: COLORS, emojis: EMOJIS, food: FOOD_EMOJIS },
    { name: "Ocean", colors: ["bg-blue-400", "bg-cyan-400", "bg-teal-400", "bg-indigo-400"], emojis: ["🌊", "🐟", "🐠", "🐬"], food: ["🐚", "🦀", "🦑", "🦞"] },
    { name: "Fire", colors: ["bg-red-500", "bg-orange-400", "bg-yellow-400"], emojis: ["🔥", "🧨", "🌶️"], food: ["🌽", "🍗", "🍖"] },
    { name: "Nature", colors: ["bg-green-400", "bg-lime-400", "bg-emerald-400"], emojis: ["🌱", "🍀", "🌲"], food: ["🍏", "🥦", "🥒"] },
  ];
  const currentTheme = THEMES.find(t => t.name.toLowerCase() === theme) || THEMES[0];

  useEffect(() => {
    moveRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (!running || gameOver || paused) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        let newHead = {
          x: prev[0].x + moveRef.current.x,
          y: prev[0].y + moveRef.current.y,
        };
        // Wall mode: game over if hit wall
        if (walls) {
          if (
            newHead.x < 0 ||
            newHead.x >= BOARD_SIZE ||
            newHead.y < 0 ||
            newHead.y >= BOARD_SIZE
          ) {
            setGameOver(true);
            setRunning(false);
            if (score > highScore) {
              setHighScore(score);
              localStorage.setItem("snakeHighScore", score);
            }
            return prev;
          }
        } else {
          // Wrap mode
          newHead.x = (newHead.x + BOARD_SIZE) % BOARD_SIZE;
          newHead.y = (newHead.y + BOARD_SIZE) % BOARD_SIZE;
        }
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          setRunning(false);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("snakeHighScore", score);
          }
          return prev;
        }
        let newSnake;
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(getRandomFood([newHead, ...prev]));
          setScore(s => s + 1);
          setFoodEmojiIdx(idx => (idx + 1) % currentTheme.food.length);
          newSnake = [newHead, ...prev];
        } else {
          newSnake = [newHead, ...prev.slice(0, -1)];
        }
        return newSnake;
      });
    }, SPEEDS[speedIdx]);
    return () => clearInterval(interval);
  }, [running, food, gameOver, speedIdx, score, highScore, paused, walls, currentTheme.food.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!running && !gameOver && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        setRunning(true);
      }
      if (gameOver && e.key === " ") {
        restart();
      }
      if (e.key === "p" || e.key === "P") {
        if (running && !gameOver) setPaused(p => !p);
      }
      if (!running || paused) return;
      setDirection(dir => {
        if (e.key === "ArrowUp" && dir.y !== 1) return { x: 0, y: -1 };
        if (e.key === "ArrowDown" && dir.y !== -1) return { x: 0, y: 1 };
        if (e.key === "ArrowLeft" && dir.x !== 1) return { x: -1, y: 0 };
        if (e.key === "ArrowRight" && dir.x !== -1) return { x: 1, y: 0 };
        return dir;
      });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [running, gameOver, paused]);

  const restart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setRunning(false);
    setPaused(false);
    setFoodEmojiIdx(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent">
        Snake Game
      </h2>
      <div className="flex items-center gap-4 mb-2 flex-wrap">
        <span className="font-semibold text-purple-700 dark:text-yellow-200">Speed:</span>
        {SPEED_LABELS.map((label, idx) => (
          <button
            key={label}
            className={`px-2 py-1 rounded-lg font-semibold text-sm transition-all border ${speedIdx === idx ? "bg-purple-500 text-white border-purple-700" : "bg-white dark:bg-gray-800 text-purple-700 dark:text-yellow-200 border-gray-300 dark:border-gray-700"}`}
            onClick={() => setSpeedIdx(idx)}
            disabled={running}
          >
            {label}
          </button>
        ))}
        <button
          className={`px-2 py-1 rounded-lg font-semibold text-sm transition-all border ${paused ? "bg-yellow-400 text-white border-yellow-600" : "bg-white dark:bg-gray-800 text-purple-700 dark:text-yellow-200 border-gray-300 dark:border-gray-700"}`}
          onClick={() => setPaused(p => !p)}
          disabled={!running || gameOver}
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <button
          className={`px-2 py-1 rounded-lg font-semibold text-sm transition-all border ${walls ? "bg-red-500 text-white border-red-700" : "bg-white dark:bg-gray-800 text-purple-700 dark:text-yellow-200 border-gray-300 dark:border-gray-700"}`}
          onClick={() => setWalls(w => !w)}
          disabled={running}
        >
          {walls ? "Walls: ON" : "Walls: OFF"}
        </button>
        <button
          className={`px-2 py-1 rounded-lg font-semibold text-sm transition-all border ${emojiMode ? "bg-blue-500 text-white border-blue-700" : "bg-white dark:bg-gray-800 text-purple-700 dark:text-yellow-200 border-gray-300 dark:border-gray-700"}`}
          onClick={() => setEmojiMode(e => !e)}
          disabled={running}
        >
          {emojiMode ? "Emoji: ON" : "Emoji: OFF"}
        </button>
        <select
          className="px-2 py-1 rounded-lg font-semibold text-sm border bg-white dark:bg-gray-800 text-purple-700 dark:text-yellow-200 border-gray-300 dark:border-gray-700 transition"
          value={theme}
          onChange={e => setTheme(e.target.value)}
          disabled={running}
          aria-label="Theme"
        >
          {THEMES.map(t => (
            <option key={t.name} value={t.name.toLowerCase()}>{t.name}</option>
          ))}
        </select>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1.5rem)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1.5rem)`,
          background: "linear-gradient(135deg, #ede9fe 60%, #fbbf24 100%)",
          borderRadius: 16,
          boxShadow: "0 4px 32px #a78bfa22",
          border: "2px solid #a78bfa",
          position: "relative",
        }}
        tabIndex={0}
      >
        {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
          const x = i % BOARD_SIZE, y = Math.floor(i / BOARD_SIZE);
          const isHead = snake[0].x === x && snake[0].y === y;
          const bodyIdx = snake.slice(1).findIndex(seg => seg.x === x && seg.y === y);
          const isBody = bodyIdx !== -1;
          const isFood = food.x === x && food.y === y;
          let cellColor = "bg-white/60 dark:bg-gray-800/60";
          if (isHead) cellColor = currentTheme.colors[0 % currentTheme.colors.length];
          else if (isBody) cellColor = currentTheme.colors[(bodyIdx + 1) % currentTheme.colors.length];
          else if (isFood) cellColor = currentTheme.colors[2 % currentTheme.colors.length];
          return (
            <div
              key={i}
              className={`w-6 h-6 sm:w-7 sm:h-7 border border-white/40 dark:border-gray-900/40 rounded flex items-center justify-center text-lg`}
              style={{
                boxShadow: isHead ? "0 0 8px #a78bfa" : isFood ? "0 0 8px #fbbf24" : undefined,
                transition: "background 0.1s"
              }}
            >
              {emojiMode
                ? isHead
                  ? currentTheme.emojis[0 % currentTheme.emojis.length]
                  : isBody
                  ? currentTheme.emojis[(bodyIdx + 1) % currentTheme.emojis.length]
                  : isFood
                  ? currentTheme.food[foodEmojiIdx % currentTheme.food.length]
                  : ""
                : ""}
            </div>
          );
        })}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white rounded-lg z-10">
            <div className="text-2xl font-bold mb-2">Game Over</div>
            <div className="mb-2">Score: {score}</div>
            <div className="mb-2">High Score: {highScore}</div>
            <button
              className="px-4 py-2 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-yellow-400 rounded-lg font-semibold mt-2"
              onClick={restart}
            >
              Restart
            </button>
            <div className="mt-2 text-sm text-gray-200">Press [Space] to restart</div>
          </div>
        )}
        {paused && running && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-lg z-10">
            <div className="text-2xl font-bold mb-2">Paused</div>
            <div className="mb-2">Score: {score}</div>
            <div className="mb-2">High Score: {highScore}</div>
            <div className="mt-2 text-sm text-gray-200">Press [P] or Pause to resume</div>
          </div>
        )}
      </div>
      <div className="mt-4 text-lg font-semibold text-purple-700 dark:text-yellow-200">
        Score: {score} &nbsp; | &nbsp; High Score: {highScore}
      </div>
      {!running && !gameOver && (
        <div className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
          Use arrow keys to start and control the snake! <br />
          Press <span className="font-bold">P</span> or Pause to pause/resume.<br />
          Walls mode: {walls ? "ON (snake dies at edge)" : "OFF (snake wraps around)"}<br />
          Emoji mode: {emojiMode ? "ON" : "OFF"}<br />
          Theme: <span className="font-bold">{currentTheme.name}</span>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;