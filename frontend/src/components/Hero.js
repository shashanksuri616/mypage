import { useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

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

const Hero = () => {
  const [hovered, setHovered] = useState(false);

  // Scroll-based animation
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white text-center relative overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 80 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
      }}
    >
      {/* Animated Background Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Main Content */}
      <motion.h1
        className="text-7xl font-extrabold tracking-tighter drop-shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 1 } },
        }}
      >
        I AM SURI SHASHANK
      </motion.h1>
      <motion.p
        className="mt-6 text-lg tracking-wide drop-shadow-md"
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } },
        }}
      >
        Creative Software Developer
      </motion.p>

      {/* Button with Framer Motion Hover/Tap */}
      <motion.button
        className="mt-12 border-2 border-white px-10 py-3 text-lg font-semibold transition-all duration-300 bg-transparent rounded-lg"
        whileHover={{
          scale: 1.08,
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0 8px 32px 0 rgba(255,255,255,0.2)",
        }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Explore Work
      </motion.button>

      {/* Floating Animated Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
    </motion.section>
  );
};

export default Hero;