import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import SnakeBackground from "./SnakeBackground"; // Assuming this is the correct path to your SnakeBackground component

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
    <motion.section id = "hero"
      ref={ref}
      className="
  min-h-screen h-screen flex flex-col justify-center items-center
  bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400
  dark:bg-gradient-to-br dark:from-emerald-900 dark:via-indigo-900 dark:to-black
  text-white text-center relative overflow-hidden transition-colors duration-500
"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
      }}
    >
      {/* Animated Background Overlay */}
      <SnakeBackground />

      {/* Floating Animated Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl pointer-events-none"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />

      {/* Main Content */}
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold tracking-tighter drop-shadow-lg mb-4"
        variants={textVariants}
        custom={1}
      >
        Hi, I'm Suri Shashank
      </motion.h1>
      <motion.p
        className="mt-2 text-xl md:text-2xl tracking-wide drop-shadow-md mb-8"
        variants={textVariants}
        custom={2}
      >
        <span className="bg-white/20 px-3 py-1 rounded-lg">
          Creative Developer, Problem Solver, & Anti-Resume Enthusiast
        </span>
      </motion.p>
      <motion.div
        className="flex flex-col md:flex-row gap-6 justify-center items-center"
        variants={textVariants}
        custom={3}
      >
        {/* <motion.a
          href="D:/College/Anti_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.08,
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0 8px 32px 0 rgba(255,255,255,0.2)",
          }}
          whileTap={{ scale: 0.97 }}
          className="border-2 border-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 bg-transparent"
        >
          More on Me
        </motion.a> */}
        <motion.button
          className="border-2 border-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 bg-transparent"
          whileHover={{
            scale: 1.08,
            backgroundColor: "#fff",
            color: "#000",
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
          className="border-2 border-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 bg-transparent"
          whileHover={{
            scale: 1.08,
            backgroundColor: "#fff",
            color: "#000",
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
        className="mt-12 text-lg italic text-white/80"
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