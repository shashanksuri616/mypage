import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Timeline", id: "timeline" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "Contact", id: "contact" },
];

const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-8 z-50 bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-lg transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4V2m0 20v-2m8-8h2M2 12H4m15.07-7.07l1.42-1.42M4.93 19.07l1.42-1.42m12.02 0l1.42 1.42M4.93 4.93L3.51 3.51M12 6a6 6 0 100 12 6 6 0 000-12z"/>
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>
        </svg>
      )}
    </button>
  );
};

const Navbar = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const [active, setActive] = useState(navItems[0].id);

  // Highlight nav item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 80) {
        setShow(true);
      } else if (currentY > lastScrollY.current) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollY.current = currentY;

      // Section highlight logic
      let found = navItems[0].id;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            found = item.id;
            break;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.nav
            key="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-6 inset-x-0 z-50 flex justify-center"
          >
            <div className="flex gap-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-full shadow-lg px-6 py-2 border border-gray-200 dark:border-gray-700">
              {navItems.map(item => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    document.getElementById(item.id).scrollIntoView({ behavior: "smooth" });
                    setActive(item.id);
                  }}
                  className={`px-4 py-2 rounded-full font-semibold transition-all focus:outline-none
                    ${active === item.id
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 shadow"
                      : "text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300"}
                  `}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <ThemeToggle />
    </>
  );
};

export default Navbar;