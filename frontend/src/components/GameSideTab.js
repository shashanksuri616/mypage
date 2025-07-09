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
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <motion.div
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 sm:p-8 border border-purple-300 flex flex-col items-center"
              style={{
                width: "98vw",
                maxWidth: 480,
                height: "98vh",
                maxHeight: 700,
                margin: "0 auto",
              }}
              initial={{ scale: 0.92, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 40 }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameSideTab;