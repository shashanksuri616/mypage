import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnakeGame from "./SnakeGame";

const SnakeTab = () => {
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
      {/* Upgraded Floating Side Tab */}
      <motion.button
        className="fixed left-2 top-1/2 z-50 bg-gradient-to-br from-purple-500 via-fuchsia-400 to-yellow-400 text-white shadow-xl rounded-full px-6 py-4 font-bold text-lg flex items-center gap-3 hover:scale-110 active:scale-95 transition-all ring-2 ring-white/60 dark:ring-yellow-200/40"
        style={{ transform: "translateY(-50%)" }}
        onClick={() => setOpen(true)}
        initial={{ x: -100, opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ scale: 1.15, rotate: -4 }}
        aria-label="Open Snake Game"
      >
        <span className="text-3xl animate-bounce">🐍</span>
        <span className="hidden sm:inline font-extrabold tracking-wide drop-shadow">Snake</span>
      </motion.button>

      {/* Upgraded Side Drawer for Snake Game */}
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
              className="absolute inset-0 bg-black/50"
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              className="relative bg-white dark:bg-gray-900 shadow-2xl h-full w-full max-w-md sm:max-w-lg p-0 flex flex-col rounded-r-3xl"
              initial={{ x: -420 }}
              animate={{ x: 0 }}
              exit={{ x: -420 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{
                boxShadow: "0 8px 32px #a78bfa33",
                borderRight: "10px solid #a78bfa",
                overflow: "hidden",
              }}
            >
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-purple-500"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{ zIndex: 10, touchAction: "manipulation" }}
              >
                &times;
              </button>
              <div className="flex-1 flex items-center justify-center px-2 py-4 sm:p-6 bg-gradient-to-br from-purple-50 via-yellow-50 to-fuchsia-100 dark:from-gray-800 dark:via-gray-900 dark:to-purple-900">
                <SnakeGame />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SnakeTab;