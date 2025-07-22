// GameSideTab.js
import { useState, useEffect } from "react"; // <-- Add useEffect import
import { motion, AnimatePresence } from "framer-motion";
import SimpleGame from "./SimpleGame";

const GameSideTab = () => {
  const [open, setOpen] = useState(false);

  // Prevent background scroll when game popup is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
            style={{ background: "rgba(0,0,0,0.25)", touchAction: "none" }}
          >
            <motion.div
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-purple-300 flex flex-col items-center overflow-y-auto"
              style={{
                width: "96vw",
                maxWidth: "420px",
                height: "96vh",
                maxHeight: "620px",
                margin: "0 auto",
                boxSizing: "border-box",
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
                padding: "1.5rem",
              }}
              initial={{ scale: 0.92, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 40 }}
            >
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-purple-500"
                onClick={() => setOpen(false)}
                aria-label="Close Game"
                style={{ zIndex: 10, touchAction: "manipulation" }}
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