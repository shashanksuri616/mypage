// GameSideTab.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SimpleGame from "./SimpleGame";

const GameSideTab = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Side Tab */}
      <button
        className="fixed right-0 top-1/2 z-50 bg-purple-600 text-white px-3 py-2 rounded-l-lg shadow-lg hover:bg-purple-700 transition"
        style={{ transform: "translateY(-50%)" }}
        onClick={() => setOpen(true)}
        aria-label="Open Game"
      >
        🎮
      </button>

      {/* Floating Game Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-1/2 right-8 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-purple-300"
            style={{ width: 340, height: 420, transform: "translateY(-50%)" }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
          >
            <button
              className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-purple-500"
              onClick={() => setOpen(false)}
              aria-label="Close Game"
            >
              &times;
            </button>
            <SimpleGame />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameSideTab;