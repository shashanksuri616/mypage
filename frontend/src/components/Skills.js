import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Example data structure
const skills = [
  {
    name: "React",
    icon: "⚛️",
    pitch: "Built multiple SPAs and dashboards using React and hooks. Comfortable with advanced patterns and performance optimization.",
    certificates: [
      { name: "React Advanced", img: "/certificates/react-advanced.png", file: "/certificates/react-advanced.pdf" }
    ],
    projects: [
      { name: "Portfolio", link: "#projects", desc: "This portfolio site, built with React, Framer Motion, and Tailwind." }
    ]
  },
  {
    name: "Python",
    icon: "🐍",
    pitch: "Used Python for data science, automation, and backend APIs. Strong with pandas, NumPy, and Flask.",
    certificates: [
      { name: "Deep Learning Specialization", img: "/certificates/deep-learning.png", file: "/certificates/deep-learning.pdf" }
    ],
    projects: [
      { name: "ML Spark", link: "#projects", desc: "Award-winning ML project using Python and scikit-learn." }
    ]
  },
  // ...add more skills
];

const Skills = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="skills" className="py-24 px-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md text-black dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-12 text-center">Skills & Tech</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="relative flex flex-col items-center bg-white/30 dark:bg-gray-800/40 border-2 border-transparent hover:border-purple-400 shadow-xl rounded-2xl backdrop-blur-lg transition-colors duration-300 p-7 w-44 cursor-pointer group"
            whileHover={{ scale: 1.07 }}
            onClick={() => setOpen(i)}
            tabIndex={0}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setOpen(i); }}
            aria-expanded={open === i}
          >
            <span className="text-5xl mb-4 drop-shadow-lg">{skill.icon}</span>
            <span className="font-semibold text-lg">{skill.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-purple-500"
                onClick={() => setOpen(null)}
                aria-label="Close"
              >×</button>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{skills[open].icon}</span>
                <span className="font-bold text-2xl">{skills[open].name}</span>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-200">{skills[open].pitch}</p>
              {skills[open].certificates?.length > 0 && (
                <div className="mb-4">
                  <div className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Certificates:</div>
                  <div className="flex gap-4">
                    {skills[open].certificates.map(cert => (
                      <a key={cert.name} href={cert.file} target="_blank" rel="noopener noreferrer" className="block">
                        <img src={cert.img} alt={cert.name} className="w-20 h-20 object-contain rounded shadow border" />
                        <div className="text-xs text-center mt-1">{cert.name}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {skills[open].projects?.length > 0 && (
                <div>
                  <div className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Projects:</div>
                  <ul className="list-disc ml-6">
                    {skills[open].projects.map(proj => (
                      <li key={proj.name}>
                        <a href={proj.link} className="text-purple-600 dark:text-purple-300 underline" target="_blank" rel="noopener noreferrer">{proj.name}</a>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{proj.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;