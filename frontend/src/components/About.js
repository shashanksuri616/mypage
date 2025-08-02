import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [showResume, setShowResume] = useState(false);
  return (
    <motion.section id="about"
      className="py-20 sm:py-32 px-2 sm:px-6 bg-gradient-to-br from-[#ede9fe]/70 via-[#f3e8ff]/60 to-[#fbbf24]/10 dark:from-[#18122b]/80 dark:via-[#312e81]/70 dark:to-[#000]/60 backdrop-blur-lg text-black dark:text-white transition-colors duration-300 relative"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Background */}
      <motion.div
        className="absolute top-0 left-0 w-28 h-28 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-tr from-yellow-300 to-purple-400 rounded-full blur-3xl opacity-20 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-yellow-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Hi, I’m <span className="font-semibold text-purple-700 dark:text-purple-200">Suri Shashank</span>, a Computer Science and Data Science enthusiast with a knack for building intelligent and impactful software. I specialize in full-stack development using the <span className="font-semibold text-fuchsia-600 dark:text-fuchsia-300">MERN stack</span> and have a strong foundation in <span className="font-semibold text-yellow-600 dark:text-yellow-300">Machine Learning</span>, <span className="font-semibold text-yellow-600 dark:text-yellow-300">Deep Learning</span>, and <span className="font-semibold text-purple-600 dark:text-purple-300">Linux kernel modules</span>. Whether it's crafting sleek user interfaces, securing data at the system level, or deploying ML models in mobile apps, I thrive at the intersection of technology and innovation.
          </p>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed">
            Currently, I'm a <span className="font-semibold text-purple-700 dark:text-purple-200">Research Intern at Cyber Guard 360</span>, where I’m building a Linux kernel module to safeguard data during ransomware attacks. I've also developed real-world applications like a <span className="font-semibold text-fuchsia-600 dark:text-fuchsia-300">diabetes prediction app</span>, an <span className="font-semibold text-yellow-600 dark:text-yellow-300">LLM-powered lung disease detector</span>, and <span className="font-semibold text-purple-600 dark:text-purple-300">SAR image flood analysis using generative AI</span>. I'm always hungry to learn, quick to adapt, and passionate about turning bold ideas into working code.
          </p>
        </motion.div>

        {/* Visual/Placeholder */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="bg-gray-100 dark:bg-gray-800 h-56 sm:h-96 rounded-lg shadow-lg flex items-center justify-center overflow-hidden relative">
            {/* Replace with your image */}
            <img
              src="https://avatars.githubusercontent.com/u/placeholder"
              alt="Suri Shashank"
              className="object-cover h-full w-full"
              style={{ filter: "grayscale(0.2)" }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="text-gray-400 text-lg sm:text-xl absolute">[Your Image Here]</span>
          </div>
        </motion.div>
      </div>
      {/* View Resume Button */}
      <div className="flex justify-center mt-10 sm:mt-12 relative z-10">
        <motion.button
          className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-yellow-400 text-white font-semibold rounded-lg shadow-lg hover:brightness-110 transition-all text-base sm:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowResume(true)}
        >
          View My Resume
        </motion.button>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-2 sm:p-4 w-[98vw] max-w-lg sm:max-w-3xl max-h-[90vh] flex flex-col relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-2 right-4 text-2xl text-gray-600 dark:text-gray-300 hover:text-red-500"
                onClick={() => setShowResume(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <iframe
                src="https://3z8rdttd-5000.inc1.devtunnels.ms/resume"
                title="Resume"
                className="w-full h-[60vh] sm:h-[70vh] rounded"
                style={{ minHeight: 320 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default About;