import { useState } from "react";
import { motion } from 'framer-motion';

const Hero = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.section
      className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3 }}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 blur-3xl animate-pulse"></div>

      {/* Main Content */}
      
      <h1 className="text-7xl font-extrabold tracking-tighter drop-shadow-lg">
        I AM SURI SHASHANK
      </h1>
      <p className="mt-6 text-lg tracking-wide drop-shadow-md">
        Creative Software Developer
      </p>

      {/* Button with Hover Effect */}
      <button
        className={`mt-12 border-2 border-white px-10 py-3 text-lg font-semibold transition-all duration-300 ${
          hovered ? "bg-white text-black" : "hover:bg-white hover:text-black"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Explore Work
      </button>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
    
    </motion.section>
  );
};

export default Hero;