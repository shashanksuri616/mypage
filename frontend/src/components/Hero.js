import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
//import SnakeBackground from "./SnakeBackground";

const floatingVariants = {
  animate: {
    y: [0, 20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * i,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const Hero = () => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      id="hero"
      ref={ref}
      className="
        min-h-[90vh] h-auto flex flex-col justify-center items-center
        bg-gradient-to-br from-[#3b0764] via-[#9333ea] to-[#f59e42]
        dark:bg-gradient-to-br dark:from-[#022c22] dark:via-[#312e81] dark:to-[#000]
        text-white text-center relative overflow-hidden transition-colors duration-500
        px-2 sm:px-4 md:px-8
        py-10 sm:py-16
      "
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
      }}
    >
      {/* Animated Snake Background <SnakeBackground />*/}

      {/* Floating Animated Elements */}
      <motion.div
        className="absolute top-4 left-2 w-10 h-10 xs:w-14 xs:h-14 sm:top-10 sm:left-10 sm:w-20 sm:h-20 bg-white/30 dark:bg-white/10 rounded-full blur-xl pointer-events-none"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-6 right-2 w-14 h-14 xs:w-20 xs:h-20 sm:bottom-20 sm:right-20 sm:w-32 sm:h-32 bg-white/20 dark:bg-white/5 rounded-full blur-2xl pointer-events-none"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />

      {/* Main Content */}
      <motion.h1
        className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)] mb-3 sm:mb-4"
        variants={textVariants}
        custom={1}
        style={{
          textShadow: "0 2px 16px rgba(0,0,0,0.35), 0 1px 0 #fff"
        }}
      >
        Hi, I'm <span className="text-[#fbbf24] dark:text-[#a3e635]">Suri Shashank</span>
      </motion.h1>
      <motion.p
        className="mt-2 text-sm xs:text-base sm:text-lg md:text-xl tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.25)] mb-6 sm:mb-8"
        variants={textVariants}
        custom={2}
      >
        <span className="bg-white/30 dark:bg-black/30 px-2 py-1 xs:px-3 xs:py-1 rounded-lg text-black dark:text-white shadow">
          Creative Developer, Problem Solver, & Anti-Resume Enthusiast
        </span>
      </motion.p>
      <motion.div
        className="flex flex-col xs:flex-row gap-3 xs:gap-6 justify-center items-center w-full max-w-xs sm:max-w-md mx-auto"
        variants={textVariants}
        custom={3}
      >
        <motion.button
          className="w-full xs:w-auto border-2 border-white px-4 py-2 xs:px-8 xs:py-3 text-base xs:text-lg font-semibold rounded-lg transition-all duration-300 bg-white/20 dark:bg-white/10 text-white hover:text-[#3b0764] dark:hover:text-[#a3e635] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#fbbf24] dark:focus:ring-[#a3e635]"
          whileHover={{
            scale: 1.08,
            backgroundColor: "#fff",
            color: "#3b0764",
            boxShadow: "0 8px 32px 0 rgba(255,255,255,0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => handleScroll("about")}
        >
          More on me
        </motion.button>
        <motion.button
          className="w-full xs:w-auto border-2 border-white px-4 py-2 xs:px-8 xs:py-3 text-base xs:text-lg font-semibold rounded-lg transition-all duration-300 bg-white/20 dark:bg-white/10 text-white hover:text-[#3b0764] dark:hover:text-[#a3e635] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#fbbf24] dark:focus:ring-[#a3e635]"
          whileHover={{
            scale: 1.08,
            backgroundColor: "#fff",
            color: "#3b0764",
            boxShadow: "0 8px 32px 0 rgba(255,255,255,0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => handleScroll("projects")}
        >
          Explore Work
        </motion.button>
      </motion.div>

      {/* Fun Interactive Tagline */}
      <motion.p
        className="mt-6 xs:mt-10 text-xs xs:text-sm sm:text-lg italic text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.18)] px-2"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span role="img" aria-label="sparkles">✨</span> Not your average portfolio. Not your average developer. <span role="img" aria-label="rocket">🚀</span>
      </motion.p>
    </motion.section>
  );
};

export default Hero;