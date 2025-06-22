import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timeline = [
  {
    year: "2025",
    title: "Research Intern",
    org: "Cyber Guard 360",
    desc: "Built a Linux kernel module to safeguard data during ransomware attacks.",
    projectId: null,
    details: "Worked on low-level kernel programming, implemented real-time monitoring, and collaborated with security experts to test the module in simulated attack environments."
  },
  {
    year: "2024",
    title: "LLM Lung Disease Detector",
    org: "Personal Project",
    desc: "Developed an LLM-powered lung disease detection tool.",
    projectId: "llm-lung",
    details: "Used large language models and medical datasets to build a tool that predicts lung diseases from X-ray images. Integrated explainable AI techniques for transparency."
  },
  {
    year: "2023",
    title: "Diabetes Prediction App",
    org: "Personal Project",
    desc: "Created a mobile app for diabetes prediction using ML.",
    projectId: "diabetes-app",
    details: "Designed and deployed a cross-platform app using React Native and TensorFlow.js. The app provides instant risk assessment and lifestyle recommendations."
  },
  {
    year: "2022",
    title: "ML Quest Hackathon (4th Place)",
    org: "IEEE CIS SBC, GHRCE",
    desc: "Identified fake job listings using ML. Placed 4th in a national hackathon.",
    projectId: "ml-quest",
    details: "Led a team to build a classifier for fake job postings. Used NLP, feature engineering, and ensemble models. Presented findings to industry judges."
  },
  {
    year: "2022",
    title: "ML Spark - Tvastr’25 (2nd Place)",
    org: "University of Hyderabad",
    desc: "Secured 2nd place in ML Spark at Tvastr’25 Analytics Fest.",
    projectId: "ml-spark",
    details: "Developed a predictive analytics solution for real-world business data. Collaborated with peers and presented at the University of Hyderabad."
  },
  {
    year: "2021",
    title: "Deep Learning Specialization",
    org: "Coursera",
    desc: "Completed Andrew Ng’s Deep Learning Specialization.",
    projectId: null,
    details: "Mastered neural networks, CNNs, RNNs, and sequence models. Applied concepts in several mini-projects and coursework."
  },
];

const Timeline = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="timeline" className="py-24 px-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md text-black dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-12 text-center">Timeline</h2>
      <div className="max-w-3xl mx-auto">
        {timeline.map((item, i) => (
          <motion.div
            key={item.title}
            className={`flex items-start mb-10 ${item.projectId ? "cursor-pointer group" : ""}`}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            onClick={() => {
              if (item.projectId) {
                const el = document.getElementById(item.projectId);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                  el.classList.add("ring-4", "ring-purple-400");
                  setTimeout(() => el.classList.remove("ring-4", "ring-purple-400"), 1200);
                }
              }
              setOpen(open === i ? null : i);
            }}
            tabIndex={0}
            onKeyDown={e => {
              if ((e.key === "Enter" || e.key === " ") && item.projectId) {
                const el = document.getElementById(item.projectId);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                  el.classList.add("ring-4", "ring-purple-400");
                  setTimeout(() => el.classList.remove("ring-4", "ring-purple-400"), 1200);
                }
                setOpen(open === i ? null : i);
              }
            }}
            aria-expanded={open === i}
          >
            <div className="flex flex-col items-center mr-6">
              <div className="w-4 h-4 bg-purple-500 rounded-full mb-1" />
              {i < timeline.length - 1 && (
                <div className="w-1 h-20 bg-purple-200" />
              )}
            </div>
            <div>
              <div className="text-lg font-bold">{item.year} — {item.title}</div>
              <div className="text-purple-600 font-semibold">{item.org}</div>
              <div className="text-gray-600">{item.desc}</div>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-3 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow text-sm text-gray-800 dark:text-gray-100 border border-purple-200 dark:border-purple-700"
                  >
                    {item.details}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;