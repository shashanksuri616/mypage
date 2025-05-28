import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: "Project One",
    desc: "UI/UX & Development",
    img: "https://via.placeholder.com/400x200?text=Project+One",
    details: "A modern UI/UX project with a focus on accessibility and performance.",
    link: "#"
  },
  {
    title: "Project Two",
    desc: "E-commerce Platform",
    img: "https://via.placeholder.com/400x200?text=Project+Two",
    details: "A scalable e-commerce platform with payment integration and admin dashboard.",
    link: "#"
  },
  {
    title: "Project Three",
    desc: "Portfolio Website",
    img: "https://via.placeholder.com/400x200?text=Project+Three",
    details: "A personal portfolio website built with React, Tailwind, and Framer Motion.",
    link: "#"
  },
  {
    title: "Project Four",
    desc: "ML Flood Analysis",
    img: "https://via.placeholder.com/400x200?text=Project+Four",
    details: "Machine learning models for flood prediction and analysis using satellite data.",
    link: "#"
  },
  {
    title: "Project Five",
    desc: "LLM Lung Disease Detector",
    img: "https://via.placeholder.com/400x200?text=Project+Five",
    details: "A deep learning app for detecting lung diseases from X-ray images.",
    link: "#"
  },
  {
    title: "Project Six",
    desc: "Diabetes Prediction App",
    img: "https://via.placeholder.com/400x200?text=Project+Six",
    details: "A web app that predicts diabetes risk using user input and ML models.",
    link: "#"
  },
];

const popupVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.9, y: 40, transition: { duration: 0.2 } }
};

const Projects = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-24 px-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md text-black dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              className="group block bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl transition-colors duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px 0 rgba(124,58,237,0.12)",
                zIndex: 2
              }}
              transition={{ duration: 0.6, delay: i * 0.08, type: "spring" }}
              onClick={() => setSelected(proj)}
            >
              <img src={proj.img} alt={proj.title} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{proj.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{proj.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={popupVariants}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            >
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-purple-500"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <img src={selected.img} alt={selected.title} className="w-full h-40 object-cover mb-4 rounded" />
              <div className="font-bold text-xl mb-2">{selected.title}</div>
              <div className="text-purple-600 mb-2">{selected.desc}</div>
              <div className="text-gray-700 dark:text-gray-300">{selected.details}</div>
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
              >
                View Project
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;