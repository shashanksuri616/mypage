import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility to roll dice
function rollDice(num = 5) {
  return Array.from({ length: num }, () => Math.ceil(Math.random() * 6));
}

// Helper for upper section bonus
function upperSectionTotal(scores) {
  return scores.slice(0, 6).reduce((a, b) => a + (b || 0), 0);
}

// Helper for Yahtzee bonus (multiple Yahtzees)
function yahtzeeBonus(dice, scores) {
  // If Yahtzee already scored with 50, and another Yahtzee is rolled, award 100 bonus
  const yahtzeeIdx = 12;
  if (scores[yahtzeeIdx] === 50 && dice.every(d => d === dice[0])) {
    return 100;
  }
  return 0;
}

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
      const counts = [1,2,3,4,5,6].map(i => dice.filter(d => d === i).length);
      return counts.includes(3) && counts.includes(2) ? 25 : 0;
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
    help: "Four sequential dice (e.g., 2-3-4-5). Score: 30 points."
  },
  {
    name: "Large Straight",
    calc: dice => {
      const uniq = Array.from(new Set(dice)).sort().join("");
      return uniq === "12345" || uniq === "23456" ? 40 : 0;
    },
    help: "Five sequential dice (1-2-3-4-5 or 2-3-4-5-6). Score: 40 points."
  },
  {
    name: "Yahtzee",
    calc: dice => (dice.every(d => d === dice[0]) ? 50 : 0),
    help: "All five dice the same. Score: 50 points. Additional Yahtzees: +100 bonus each."
  },
  {
    name: "Chance",
    calc: dice => dice.reduce((a, b) => a + b, 0),
    help: "Any combination. Score: sum of all dice."
  }
];

const diceUnicode = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const diceColors = ["", "#fbbf24", "#a78bfa", "#38bdf8", "#f472b6", "#34d399", "#f87171"];

const yahtzeeRules = [
  {
    name: "Upper Section (Ones–Sixes)",
    desc: "Score the sum of dice showing that number. If your total for these six categories is 63 or more, you earn a 35-point bonus."
  },
  {
    name: "Three of a Kind",
    desc: "At least three dice the same. Score: sum of all dice."
  },
  {
    name: "Four of a Kind",
    desc: "At least four dice the same. Score: sum of all dice."
  },
  {
    name: "Full House",
    desc: "Three of one number and two of another. Score: 25 points."
  },
  {
    name: "Small Straight",
    desc: "Four sequential dice (e.g., 2-3-4-5). Score: 30 points."
  },
  {
    name: "Large Straight",
    desc: "Five sequential dice (1-2-3-4-5 or 2-3-4-5-6). Score: 40 points."
  },
  {
    name: "Yahtzee",
    desc: "All five dice the same. Score: 50 points. Additional Yahtzees: +100 bonus each."
  },
  {
    name: "Chance",
    desc: "Any combination. Score: sum of all dice."
  }
];

function getBestCategory(dice, scores) {
  // Suggest the best available scoring option for the current dice
  let best = { idx: null, score: -1 };
  scoreCategories.forEach((cat, i) => {
    if (scores[i] === null) {
      const val = cat.calc(dice);
      if (val > best.score) best = { idx: i, score: val };
    }
  });
  return best.idx;
}

const LEADERBOARD_KEY = "yahtzee_leaderboard";

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

const SimpleGame = () => {
  const [dice, setDice] = useState(rollDice());
  const [held, setHeld] = useState([false, false, false, false, false]);
  const [rolls, setRolls] = useState(0);
  const [scores, setScores] = useState(Array(scoreCategories.length).fill(null));
  const [selectedCat, setSelectedCat] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [yahtzeeBonuses, setYahtzeeBonuses] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [leaderboard, setLeaderboard] = useState(getLeaderboard());
  const [playerName, setPlayerName] = useState("");
  const diceRefs = useRef([null, null, null, null, null]);

  const canRoll = rolls < 3 && scores.some(s => s === null);

  const handleRoll = () => {
    if (!canRoll) return;
    setRolling(true);
    setTimeout(() => {
      setDice(dice.map((d, i) => held[i] ? d : Math.ceil(Math.random() * 6)));
      setRolls(rolls + 1);
      setRolling(false);
    }, 500); // 500ms animation
  };

  const toggleHold = idx => {
    if (!canRoll) return;
    setHeld(held.map((h, i) => (i === idx ? !h : h)));
  };

  const handleScore = idx => {
    if (scores[idx] !== null) return;
    let newScores = [...scores];
    let yahtzeeBonusPoints = 0;
    // Yahtzee bonus: if Yahtzee already scored and another Yahtzee is rolled, +100
    if (idx !== 12 && scores[12] === 50 && dice.every(d => d === dice[0])) {
      yahtzeeBonusPoints = 100;
      setYahtzeeBonuses(b => b + 100);
    }
    newScores[idx] = scoreCategories[idx].calc(dice);
    setScores(newScores);
    setDice(rollDice());
    setHeld([false, false, false, false, false]);
    setRolls(1);
    setSelectedCat(idx);
    setTimeout(() => setSelectedCat(null), 600);
    if (yahtzeeBonusPoints) {
      setTimeout(() => alert("Yahtzee Bonus! +100 points"), 300);
    }
    if (scores.filter(s => s !== null).length === scoreCategories.length - 1) {
      setTimeout(() => setShowSummary(true), 700);
    }
  };

  const handleRefresh = () => {
    setScores(Array(scoreCategories.length).fill(null));
    setDice(rollDice());
    setHeld([false, false, false, false, false]);
    setRolls(0);
    setSelectedCat(null);
    setYahtzeeBonuses(0);
    setShowSummary(false);
  };

  const upperTotal = upperSectionTotal(scores);
  const upperBonus = upperTotal >= 63 ? 35 : 0;
  const totalScore = scores.reduce((a, b) => a + (b || 0), 0) + upperBonus + yahtzeeBonuses;
  const gameOver = scores.every(s => s !== null);

  // Suggest best scoring category
  const bestCat = getBestCategory(dice, scores);

  // Suggest which dice to hold for best category (simple heuristic)
  function getSuggestedHolds() {
    if (rolls === 0) return [];
    if (bestCat == null) return [];
    const cat = scoreCategories[bestCat];
    if (["Ones","Twos","Threes","Fours","Fives","Sixes"].includes(cat.name)) {
      // Hold dice matching the number
      return dice.map(d => d === parseInt(cat.name[0]) ? true : false);
    }
    if (cat.name === "Yahtzee" || cat.name === "Three of a Kind" || cat.name === "Four of a Kind" || cat.name === "Full House") {
      // Hold the most common value
      let counts = [0,0,0,0,0,0,0];
      dice.forEach(d => counts[d]++);
      let maxVal = counts.indexOf(Math.max(...counts));
      return dice.map(d => d === maxVal);
    }
    if (cat.name === "Small Straight" || cat.name === "Large Straight") {
      // Hold unique dice in a straight
      let uniq = Array.from(new Set(dice));
      return dice.map(d => uniq.includes(d));
    }
    return [false, false, false, false, false];
  }
  const suggestedHolds = getSuggestedHolds();

  // Add score to leaderboard at game over
  useEffect(() => {
    if (gameOver && totalScore > 0) {
      setTimeout(() => setShowSummary(true), 700);
    }
    // eslint-disable-next-line
  }, [gameOver]);

  const handleAddToLeaderboard = () => {
    const name = playerName.trim() || "Anonymous";
    const newEntry = { name, score: totalScore, date: new Date().toISOString() };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Top 5
    setLeaderboard(updated);
    saveLeaderboard(updated);
    setPlayerName("");
    setShowSummary(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
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
      <div className="flex gap-3 mb-4">
        {dice.map((d, i) => (
          <button
            key={i}
            ref={el => diceRefs.current[i] = el}
            className={`text-5xl w-16 h-16 rounded-xl border-4 shadow transition-all duration-200 flex items-center justify-center
              ${held[i]
                ? "border-purple-500 bg-purple-100 dark:bg-purple-900 scale-110"
                : suggestedHolds[i]
                  ? "border-green-400 bg-green-50 dark:bg-green-900 scale-105 animate-pulse"
                  : "border-gray-300 bg-white dark:bg-gray-800 hover:border-purple-300"}
              ${canRoll ? "cursor-pointer" : "opacity-60"}
              ${rolling ? "animate-bounce" : ""}
            `}
            style={{
              color: diceColors[d],
              boxShadow: held[i] ? "0 0 0 4px #c4b5fd44" : undefined,
              transition: "transform 0.15s, box-shadow 0.15s"
            }}
            onClick={() => toggleHold(i)}
            disabled={!canRoll || rolling}
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
            Hold dice by clicking them. You get up to 3 rolls per turn. After rolling, select a category to score. Each category can be used only once.
            <br />
            <span className="text-green-700">Green-highlighted dice</span> are suggested holds for the best scoring option.
            <br />
            <span className="text-blue-700">Upper section bonus:</span> Score 63+ in Ones–Sixes for +35 points.
            <br />
            <span className="text-yellow-700">Yahtzee bonus:</span> After your first Yahtzee, each extra Yahtzee is +100 points!
          </div>
        </div>
      )}
      <div className="w-full max-w-xs bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-2 mb-2">
        <table className="w-full text-sm">
          <tbody>
            {scoreCategories.map((cat, i) => (
              <tr key={cat.name}>
                <td className="py-1 flex items-center gap-2">
                  {cat.name}
                  <span
                    className="text-gray-400 cursor-pointer"
                    title={cat.help}
                  >&#9432;</span>
                  {bestCat === i && canRoll === false && scores[i] === null && (
                    <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs animate-pulse">
                      Best
                    </span>
                  )}
                </td>
                <td className="text-right">
                  {scores[i] !== null ? (
                    <span className="font-bold text-purple-600">{scores[i]}</span>
                  ) : (
                    <button
                      className={`px-2 py-0.5 rounded transition
                        ${selectedCat === i ? "bg-purple-200" : "hover:bg-purple-100 dark:hover:bg-purple-900"}
                        ${bestCat === i && canRoll === false ? "ring-2 ring-green-400" : ""}
                      `}
                      onClick={() => handleScore(i)}
                      disabled={rolls === 0 || !canRoll}
                    >
                      Score ({cat.calc(dice)})
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between text-xs mt-2">
          <span>
            Upper Total: <span className="font-bold">{upperTotal}</span>
            {upperBonus > 0 && (
              <span className="ml-2 text-green-700 font-bold">+35 Bonus!</span>
            )}
          </span>
          <span>
            Yahtzee Bonus: <span className="font-bold">{yahtzeeBonuses}</span>
          </span>
        </div>
        <div className="text-right font-bold text-lg mt-2">
          Total: <span className="text-purple-700">{totalScore}</span>
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
      {/* Leaderboard */}
      <div className="w-full max-w-xs mb-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow p-3 text-xs text-gray-700 dark:text-gray-200">
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
      {/* Game Over Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              >
                &times;
              </button>
              <div className="text-2xl font-bold text-purple-700 mb-2">Game Over!</div>
              <div className="mb-2 text-lg">Final Score: <span className="font-bold">{totalScore}</span></div>
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                {upperBonus > 0 && <div>Upper Section Bonus: +35</div>}
                {yahtzeeBonuses > 0 && <div>Yahtzee Bonuses: +{yahtzeeBonuses}</div>}
              </div>
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