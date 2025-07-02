import { useState } from "react";

// Utility to roll dice
function rollDice(num = 5) {
  return Array.from({ length: num }, () => Math.ceil(Math.random() * 6));
}

const scoreCategories = [
  { name: "Ones", calc: dice => dice.filter(d => d === 1).length * 1 },
  { name: "Twos", calc: dice => dice.filter(d => d === 2).length * 2 },
  { name: "Threes", calc: dice => dice.filter(d => d === 3).length * 3 },
  { name: "Fours", calc: dice => dice.filter(d => d === 4).length * 4 },
  { name: "Fives", calc: dice => dice.filter(d => d === 5).length * 5 },
  { name: "Sixes", calc: dice => dice.filter(d => d === 6).length * 6 },
  {
    name: "Three of a Kind",
    calc: dice => {
      for (let i = 1; i <= 6; i++) {
        if (dice.filter(d => d === i).length >= 3) return dice.reduce((a, b) => a + b, 0);
      }
      return 0;
    }
  },
  {
    name: "Four of a Kind",
    calc: dice => {
      for (let i = 1; i <= 6; i++) {
        if (dice.filter(d => d === i).length >= 4) return dice.reduce((a, b) => a + b, 0);
      }
      return 0;
    }
  },
  {
    name: "Full House",
    calc: dice => {
      const counts = [1,2,3,4,5,6].map(i => dice.filter(d => d === i).length);
      return counts.includes(3) && counts.includes(2) ? 25 : 0;
    }
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
    }
  },
  {
    name: "Large Straight",
    calc: dice => {
      const uniq = Array.from(new Set(dice)).sort().join("");
      return uniq === "12345" || uniq === "23456" ? 40 : 0;
    }
  },
  {
    name: "Yahtzee",
    calc: dice => (dice.every(d => d === dice[0]) ? 50 : 0)
  },
  {
    name: "Chance",
    calc: dice => dice.reduce((a, b) => a + b, 0)
  }
];

const diceUnicode = ["", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

const SimpleGame = () => {
  const [dice, setDice] = useState(rollDice());
  const [held, setHeld] = useState([false, false, false, false, false]);
  const [rolls, setRolls] = useState(0);
  const [scores, setScores] = useState(Array(scoreCategories.length).fill(null));
  const [selectedCat, setSelectedCat] = useState(null);

  const canRoll = rolls < 3 && scores.some(s => s === null);

  const handleRoll = () => {
    if (!canRoll) return;
    setDice(dice.map((d, i) => held[i] ? d : Math.ceil(Math.random() * 6)));
    setRolls(rolls + 1);
  };

  const toggleHold = idx => {
    if (!canRoll) return;
    setHeld(held.map((h, i) => (i === idx ? !h : h)));
  };

  const handleScore = idx => {
    if (scores[idx] !== null) return;
    const newScores = [...scores];
    newScores[idx] = scoreCategories[idx].calc(dice);
    setScores(newScores);
    setDice(rollDice());
    setHeld([false, false, false, false, false]);
    setRolls(1);
    setSelectedCat(idx);
    setTimeout(() => setSelectedCat(null), 600);
  };

  const totalScore = scores.reduce((a, b) => a + (b || 0), 0);
  const gameOver = scores.every(s => s !== null);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Yahtzee Mini</h3>
      <div className="flex gap-3 mb-4">
        {dice.map((d, i) => (
          <button
            key={i}
            className={`text-4xl w-14 h-14 rounded-lg border-2 transition-all duration-200
              ${held[i] ? "border-purple-500 bg-purple-100 dark:bg-purple-900" : "border-gray-300 bg-white dark:bg-gray-800"}
            `}
            onClick={() => toggleHold(i)}
            disabled={!canRoll}
            aria-label={held[i] ? "Unhold die" : "Hold die"}
          >
            {diceUnicode[d]}
          </button>
        ))}
      </div>
      <button
        className="mb-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
        onClick={handleRoll}
        disabled={!canRoll}
      >
        {rolls === 0 ? "Start" : rolls < 3 ? "Roll" : "No Rolls Left"}
      </button>
      <div className="w-full max-w-xs">
        <table className="w-full text-sm mb-2">
          <tbody>
            {scoreCategories.map((cat, i) => (
              <tr key={cat.name}>
                <td className="py-1">{cat.name}</td>
                <td className="text-right">
                  {scores[i] !== null ? (
                    <span className="font-bold text-purple-600">{scores[i]}</span>
                  ) : (
                    <button
                      className={`px-2 py-0.5 rounded transition
                        ${selectedCat === i ? "bg-purple-200" : "hover:bg-purple-100 dark:hover:bg-purple-900"}
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
        <div className="text-right font-bold text-lg">
          Total: <span className="text-purple-700">{totalScore}</span>
        </div>
      </div>
      {gameOver && (
        <div className="mt-4 text-center">
          <div className="text-xl font-bold text-green-600">Game Over!</div>
          <div className="mb-2">Final Score: <span className="font-bold">{totalScore}</span></div>
          <button
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            onClick={() => {
              setScores(Array(scoreCategories.length).fill(null));
              setDice(rollDice());
              setHeld([false, false, false, false, false]);
              setRolls(0);
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleGame;