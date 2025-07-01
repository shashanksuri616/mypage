import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: "llm-lung",
    title: "LLM Lung Disease Detector",
    desc: "AI-powered tool for lung disease detection from X-rays.",
    img: "/projects/llm-lung.png",
    details: "Built a deep learning app that predicts lung diseases from X-ray images using large language models and explainable AI. Integrated a user-friendly interface for doctors and patients.",
    tech: ["Python", "PyTorch", "Transformers", "Streamlit"],
    link: "https://github.com/shashanksuri616/llm-lung-disease-detector"
  },
  {
    id: "diabetes-app",
    title: "Diabetes Prediction App",
    desc: "Cross-platform app for diabetes risk prediction.",
    img: "/projects/diabetes-app.png",
    details: "Developed a React Native app using TensorFlow.js for instant diabetes risk assessment and lifestyle recommendations. Deployed for both Android and web.",
    tech: ["React Native", "TensorFlow.js", "Expo"],
    link: "https://github.com/shashanksuri616/diabetes-predictor"
  },
  {
    id: "ml-flood",
    title: "ML Flood Analysis",
    desc: "Satellite-based flood prediction and analysis.",
    img: "/projects/ml-flood.png",
    details: "Created ML models to predict and analyze flood risk using satellite data. Visualized results with interactive dashboards for researchers.",
    tech: ["Python", "scikit-learn", "Pandas", "Dash"],
    link: "https://github.com/shashanksuri616/flood-ml"
  },
  {
    id: "ml-quest",
    title: "Fake Job Detector (ML Quest Hackathon)",
    desc: "Placed 4th in national hackathon for fake job detection.",
    img: "/projects/ml-quest.png",
    details: "Led a team to build an NLP classifier for identifying fake job listings. Used feature engineering and ensemble models. Presented to industry judges.",
    tech: ["Python", "NLP", "scikit-learn"],
    link: "https://github.com/shashanksuri616/fake-job-detector"
  },
  {
    id: "ml-spark",
    title: "ML Spark - Tvastr’25",
    desc: "2nd place at Tvastr’25 Analytics Fest.",
    img: "/projects/ml-spark.png",
    details: "Developed a predictive analytics solution for business data. Collaborated with peers and presented at the University of Hyderabad.",
    tech: ["Python", "Pandas", "Visualization"],
    link: "https://github.com/shashanksuri616/ml-spark-tvastr25"
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    desc: "This interactive portfolio site.",
    img: "/projects/portfolio.png",
    details: "Designed and built this portfolio using React, Tailwind CSS, and Framer Motion. Features animated backgrounds, smooth navigation, and a modern UI.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/shashanksuri616/mypage"
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
              id={proj.id}
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
                <div className="flex flex-wrap gap-2 mt-3">
                  {proj.tech && proj.tech.map(t => (
                    <span key={t} className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded text-xs">{t}</span>
                  ))}
                </div>
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
              <div className="flex flex-wrap gap-2 mb-2">
                {selected.tech && selected.tech.map(t => (
                  <span key={t} className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded text-xs">{t}</span>
                ))}
              </div>
              <div className="text-gray-700 dark:text-gray-300">{selected.details}</div>
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                onClick={() => setSelected(null)}
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