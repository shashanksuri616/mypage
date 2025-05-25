import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const [showResume, setShowResume] = useState(false);
  return (
    <motion.section id="about"
      className="py-32 px-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md text-black dark:text-white transition-colors duration-300"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative Background */}
      <motion.div
        className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full blur-3xl opacity-30 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold mb-8">About Me</h2>
          <p className="text-lg leading-relaxed">
            Hi, I’m Suri Shashank, a Computer Science and Data Science enthusiast with a knack for building intelligent and impactful software. I specialize in full-stack development using the MERN stack and have a strong foundation in Machine Learning, Deep Learning, and Linux kernel modules. Whether it's crafting sleek user interfaces, securing data at the system level, or deploying ML models in mobile apps, I thrive at the intersection of technology and innovation.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Currently, I'm a Research Intern at Cyber Guard 360, where I’m building a Linux kernel module to safeguard data during ransomware attacks. I've also developed real-world applications like a diabetes prediction app, an LLM-powered lung disease detector, and SAR image flood analysis using generative AI. I'm always hungry to learn, quick to adapt, and passionate about turning bold ideas into working code.
          </p>
        </motion.div>

        {/* Visual/Placeholder */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="bg-gray-100 h-96 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            {/* Replace with your image */}
            <img
              src="https://avatars.githubusercontent.com/u/placeholder"
              alt="Suri Shashank"
              className="object-cover h-full w-full"
              style={{ filter: "grayscale(0.2)" }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="text-gray-400 text-xl absolute">[Your Image Here]</span>
          </div>
        </motion.div>
      </div>
      {/* View Resume Button */}
      <div className="flex justify-center mt-12 relative z-10">
        <motion.button
          className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-all"
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
              className="bg-white rounded-lg shadow-2xl p-4 max-w-3xl w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                className="absolute top-2 right-4 text-2xl text-gray-600 hover:text-red-500"
                onClick={() => setShowResume(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <iframe
                src="http://localhost:5000/resume"
                title="Resume"
                className="w-full h-[70vh] rounded"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default About;