import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- SIMPLIFIED YAHTZEE SCORING SYSTEM ---
// Only keep: Ones, Twos, Threes, Fours, Fives, Sixes, Three of a Kind, Four of a Kind, Full House, Small Straight, Large Straight, Yahtzee, Chance

const scoreCategories = [
  { name: "Ones", calc: dice => dice.filter(d => d === 1).length * 1, help: "Sum of all 1s" },
  { name: "Twos", calc: dice => dice.filter(d => d === 2).length * 2, help: "Sum of all 2s" },
  { name: "Threes", calc: dice => dice.filter(d => d === 3).length * 3, help: "Sum of all 3s" },
  { name: "Fours", calc: dice => dice.filter(d => d === 4).length * 4, help: "Sum of all 4s" },
  { name: "Fives", calc: dice => dice.filter(d => d === 5).length * 5, help: "Sum of all 5s" },
  { name: "Sixes", calc: dice => dice.filter(d => d === 6).length * 6, help: "Sum of all 6s" },
  {
    name: "Three of a Kind",
    calc: dice => {
      for (let i = 1; i <= 6; i++) {
        if (dice.filter(d => d === i).length >= 3) return dice.reduce((a, b) => a + b, 0);
      }
      return 0;
    },
    help: "At least three dice the same. Score: sum of all dice."
  },
  {
    name: "Four of a Kind",
    calc: dice => {
      for (let i = 1; i <= 6; i++) {
        if (dice.filter(d => d === i).length >= 4) return dice.reduce((a, b) => a + b, 0);
      }
      return 0;
    },
    help: "At least four dice the same. Score: sum of all dice."
  },
  {
    name: "Full House",
    calc: dice => {
      const counts = Array(7).fill(0);
      dice.forEach(d => counts[d]++);
      return (counts.includes(3) && counts.includes(2)) ? 25 : 0;
    },
    help: "Three of one number and two of another. Score: 25 points."
  },
  {
    name: "Small Straight",
    calc: dice => {
      const uniq = Array.from(new Set(dice)).sort();
      const straights = [
        [1,2,3,4],
        [2,3,4,5],
        [3,4,5,6]
      ];
      for (let s of straights) {
        if (s.every(n => uniq.includes(n))) return 30;
      }
      return 0;
    },
    help: "Any four sequential dice. Score: 30 points."
  },
  {
    name: "Large Straight",
    calc: dice => {
      const uniq = Array.from(new Set(dice)).sort().join("");
      return (uniq === "12345" || uniq === "23456") ? 40 : 0;
    },
    help: "Five sequential dice (1-2-3-4-5 or 2-3-4-5-6). Score: 40 points."
  },
  {
    name: "Yahtzee",
    calc: dice => (dice.every(d => d === dice[0]) ? 50 : 0),
    help: "All five dice the same. Score: 50 points."
  },
  {
    name: "Chance",
    calc: dice => dice.reduce((a, b) => a + b, 0),
    help: "Any combination. Score: sum of all dice."
  }
];

// --- END SIMPLIFIED SCORING ---

const diceUnicode = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const diceColors = ["", "#fbbf24", "#a78bfa", "#38bdf8", "#f472b6", "#34d399", "#f87171"];

const yahtzeeRules = [
  { name: "Ones–Sixes", desc: "Score the sum of dice showing that number." },
  { name: "Three of a Kind", desc: "At least three dice the same. Score: sum of all dice." },
  { name: "Four of a Kind", desc: "At least four dice the same. Score: sum of all dice." },
  { name: "Full House", desc: "Three of one number and two of another. Score: 25 points." },
  { name: "Small Straight", desc: "Any four sequential dice. Score: 30 points." },
  { name: "Large Straight", desc: "Five sequential dice. Score: 40 points." },
  { name: "Yahtzee", desc: "All five dice the same. Score: 50 points." },
  { name: "Chance", desc: "Any combination. Score: sum of all dice." }
];

const LEADERBOARD_KEY = "yahtzee_leaderboard_simple";

function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(LEADERBOARD_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLeaderboard(lb) {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb));
}

function rollDice(num = 5) {
  return Array.from({ length: num }, () => Math.ceil(Math.random() * 6));
}

const SimpleGame = () => {
  const [dice, setDice] = useState(rollDice());
  const [held, setHeld] = useState([false, false, false, false, false]);
  const [rolls, setRolls] = useState(0);
  const [scores, setScores] = useState(Array(scoreCategories.length).fill(null));
  const [selectedCat, setSelectedCat] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard());
  const [playerName, setPlayerName] = useState("");
  const [lastSelected, setLastSelected] = useState(null);

  // Only allow rolling if not all categories are filled and less than 3 rolls
  const canRoll = rolls < 3 && scores.some(s => s === null);

  // Remember last selected category for score summary
  useEffect(() => {
    if (selectedCat !== null) setLastSelected(selectedCat);
  }, [selectedCat]);

  // Calculate total score using only filled categories
  const totalScore = scores.reduce((a, b) => a + (b || 0), 0);

  // Game over if all categories are filled
  const gameOver = scores.every(s => s !== null);

  // Suggest best category (highest score for current dice)
  function getBestCategory() {
    let best = { idx: null, score: -1 };
    scoreCategories.forEach((cat, i) => {
      if (scores[i] === null) {
        const val = cat.calc(dice);
        if (val > best.score) best = { idx: i, score: val };
      }
    });
    return best.idx;
  }
  const bestCat = getBestCategory();

  // Hold suggestion: highlight dice that help with bestCat
  function getSuggestedHolds() {
    if (rolls === 0 || bestCat == null) return [false, false, false, false, false];
    const cat = scoreCategories[bestCat];
    if (["Ones","Twos","Threes","Fours","Fives","Sixes"].includes(cat.name)) {
      return dice.map(d => d === parseInt(cat.name[0]) ? true : false);
    }
    if (cat.name === "Yahtzee" || cat.name === "Three of a Kind" || cat.name === "Four of a Kind" || cat.name === "Full House") {
      let counts = [0,0,0,0,0,0,0];
      dice.forEach(d => counts[d]++);
      let maxVal = counts.indexOf(Math.max(...counts));
      return dice.map(d => d === maxVal);
    }
    if (cat.name === "Small Straight" || cat.name === "Large Straight") {
      let uniq = Array.from(new Set(dice));
      return dice.map(d => uniq.includes(d));
    }
    return [false, false, false, false, false];
  }
  const suggestedHolds = getSuggestedHolds();

  // Roll dice
  const handleRoll = () => {
    if (!canRoll) return;
    setDice(dice.map((d, i) => held[i] ? d : Math.ceil(Math.random() * 6)));
    setRolls(rolls + 1);
  };

  // Hold/unhold dice
  const toggleHold = idx => {
    if (!canRoll) return;
    setHeld(held.map((h, i) => (i === idx ? !h : h)));
  };

  // Score selection
  const handleScore = idx => {
    if (scores[idx] !== null) return;
    const newScores = [...scores];
    newScores[idx] = scoreCategories[idx].calc(dice);
    setScores(newScores);
    setDice(rollDice());
    setHeld([false, false, false, false, false]);
    setRolls(0);
    setSelectedCat(idx);
    setTimeout(() => setSelectedCat(null), 600);
    if (newScores.every(s => s !== null)) setTimeout(() => setShowSummary(true), 700);
  };

  // Restart game
  const handleRefresh = () => {
    setScores(Array(scoreCategories.length).fill(null));
    setDice(rollDice());
    setHeld([false, false, false, false, false]);
    setRolls(0);
    setSelectedCat(null);
    setShowSummary(false);
    setLastSelected(null);
  };

  // Save to leaderboard
  const handleAddToLeaderboard = () => {
    const name = playerName.trim() || "Anonymous";
    const newEntry = { name, score: totalScore, date: new Date().toISOString() };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setLeaderboard(updated);
    saveLeaderboard(updated);
    setPlayerName("");
    setShowSummary(false);
  };

  // Prevent background scroll when summary popup is open
  useEffect(() => {
    if (showSummary) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSummary]);

  return (
    <div className="flex flex-col items-center w-full h-full px-2 sm:px-0">
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="text-2xl font-bold mb-2 text-purple-700 dark:text-purple-300 flex-1 text-center">🎲 Yahtzee Mini</h3>
        <button
          className="ml-auto px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 transition text-sm"
          onClick={handleRefresh}
          aria-label="Restart Game"
        >
          ⟳ Restart
        </button>
      </div>
      <div className="flex gap-2 sm:gap-3 mb-4 flex-wrap justify-center">
        {dice.map((d, i) => (
          <button
            key={i}
            className={`
              text-3xl sm:text-5xl w-12 h-12 sm:w-16 sm:h-16
              rounded-xl border-4 shadow flex items-center justify-center
              transition-all duration-200
              ${held[i]
                ? "border-purple-500 bg-purple-100 dark:bg-purple-900 scale-110"
                : suggestedHolds[i]
                  ? "border-green-400 bg-green-50 dark:bg-green-900 scale-105 animate-pulse"
                  : "border-gray-300 bg-white dark:bg-gray-800 hover:border-purple-300"}
              ${canRoll ? "cursor-pointer" : "opacity-60"}
            `}
            style={{
              color: diceColors[d],
              boxShadow: held[i] ? "0 0 0 4px #c4b5fd44" : undefined,
            }}
            onClick={() => toggleHold(i)}
            disabled={!canRoll}
            aria-label={held[i] ? "Unhold die" : "Hold die"}
          >
            {diceUnicode[d]}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <button
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50 shadow"
          onClick={handleRoll}
          disabled={!canRoll}
        >
          {rolls === 0 ? "Start" : rolls < 3 ? `Roll (${3 - rolls} left)` : "No Rolls Left"}
        </button>
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          Rolls: <span className="font-bold">{rolls}</span> / 3
        </span>
        <button
          className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-lg font-semibold text-xs hover:bg-purple-200 dark:hover:bg-purple-800 transition"
          onClick={() => setShowHelp(h => !h)}
        >
          {showHelp ? "Hide Help" : "Show Help"}
        </button>
      </div>
      {showHelp && (
        <div className="w-full max-w-xs mb-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow p-3 text-xs text-gray-700 dark:text-gray-200">
          <ul className="list-disc pl-5 space-y-1">
            {yahtzeeRules.map(rule => (
              <li key={rule.name}>
                <span className="font-bold">{rule.name}:</span> {rule.desc}
              </li>
            ))}
          </ul>
          <div className="mt-2 text-[11px] text-gray-500">
            Hold dice by tapping them. You get up to 3 rolls per turn. After rolling, select a category to score. Each category can be used only once.
            <br />
            <span className="text-green-700">Green-highlighted dice</span> are suggested holds for the best scoring option.
          </div>
        </div>
      )}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-2 mb-2 overflow-x-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        <table className="w-full text-xs sm:text-sm">
          <tbody>
            {scoreCategories.map((cat, i) => (
              <tr key={cat.name}>
                <td className="py-1 flex items-center gap-2 whitespace-nowrap">
                  {cat.name}
                  <span
                    className="text-gray-400 cursor-pointer"
                    title={cat.help}
                    tabIndex={0}
                    role="button"
                    aria-label={`Help: ${cat.help}`}
                    onTouchStart={e => e.target.click()}
                  >&#9432;</span>
                  {bestCat === i && !canRoll && scores[i] === null && (
                    <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs animate-pulse">
                      Best
                    </span>
                  )}
                </td>
                <td className="text-right whitespace-nowrap">
                  {scores[i] !== null ? (
                    <span className="font-bold text-purple-600">{scores[i]}</span>
                  ) : (
                    <button
                      className={`px-2 py-0.5 rounded transition
                        ${selectedCat === i ? "bg-purple-200" : "hover:bg-purple-100 dark:hover:bg-purple-900"}
                        ${bestCat === i && !canRoll ? "ring-2 ring-green-400" : ""}
                      `}
                      onClick={() => handleScore(i)}
                      disabled={rolls === 0 || !canRoll}
                      style={{
                        touchAction: "manipulation",
                      }}
                    >
                      Score ({cat.calc(dice)})
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col sm:flex-row justify-between text-xs mt-2 gap-2">
          <span>
            Total: <span className="font-bold">{totalScore}</span>
          </span>
        </div>
      </div>
      {gameOver && (
        <div className="mt-4 text-center">
          <div className="text-xl font-bold text-green-600">Game Over!</div>
          <div className="mb-2">Final Score: <span className="font-bold">{totalScore}</span></div>
          <button
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            onClick={handleRefresh}
          >
            Play Again
          </button>
        </div>
      )}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow p-3 text-xs text-gray-700 dark:text-gray-200">
        <div className="font-bold text-purple-700 mb-1 text-center">🏆 Leaderboard</div>
        <ol className="list-decimal pl-5 space-y-1">
          {leaderboard.length === 0 && <li className="text-gray-400">No scores yet</li>}
          {leaderboard.map((entry, i) => (
            <li key={i}>
              <span className="font-semibold">{entry.name}</span>
              <span className="mx-2 text-purple-700">{entry.score}</span>
              <span className="text-gray-400 text-[10px]">{new Date(entry.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ol>
      </div>
      <AnimatePresence>
        {showSummary && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ touchAction: "none" }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-purple-500"
                onClick={() => setShowSummary(false)}
                aria-label="Close"
                style={{ zIndex: 10, touchAction: "manipulation" }}
              >
                &times;
              </button>
              <div className="text-2xl font-bold text-purple-700 mb-2">Game Over!</div>
              <div className="mb-2 text-lg">Final Score: <span className="font-bold">{totalScore}</span></div>
              <div className="mb-4">
                <input
                  className="px-2 py-1 rounded border border-gray-300 dark:bg-gray-800 dark:text-gray-100 mr-2"
                  placeholder="Your name"
                  value={playerName}
                  maxLength={12}
                  onChange={e => setPlayerName(e.target.value)}
                />
                <button
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded"
                  onClick={handleAddToLeaderboard}
                >
                  Save Score
                </button>
              </div>
              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                onClick={handleRefresh}
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SimpleGame;