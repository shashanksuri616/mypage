import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnakeGame from "./SnakeGame";

const SnakeTab = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Side Tab Button */}
      <motion.button
        className="fixed left-2 top-1/2 z-50 bg-gradient-to-br from-purple-500 via-fuchsia-400 to-yellow-400 text-white shadow-xl rounded-full px-4 py-2 font-bold text-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        style={{ transform: "translateY(-50%)" }}
        onClick={() => setOpen(true)}
        initial={{ x: -80, opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        aria-label="Open Snake Game"
      >
        🐍 Snake
      </motion.button>

      {/* Side Drawer for Snake Game */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ pointerEvents: "auto" }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="relative bg-white dark:bg-gray-900 shadow-2xl h-full w-full max-w-md sm:max-w-lg p-4 flex flex-col"
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-purple-500"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <SnakeGame />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SnakeTab;