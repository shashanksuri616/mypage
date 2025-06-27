import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificates = [
  {
    name: "Deep Learning Specialization",
    org: "Coursera",
    img: "/certificates/deep-learning.png",
    link: "/certificates/deep-learning.pdf",
    desc: "A comprehensive specialization covering neural networks, CNNs, RNNs, and more. Completed Andrew Ng’s Deep Learning Specialization with hands-on projects.",
    skills: ["Python", "TensorFlow", "Neural Networks"],
    year: "2021"
  },
  {
    name: "Linux Foundation Certified SysAdmin",
    org: "Linux Foundation",
    img: "/certificates/linux-foundation.png",
    link: "/certificates/linux-foundation.pdf",
    desc: "Certification for advanced Linux system administration skills. Demonstrated proficiency in shell scripting, networking, and troubleshooting.",
    skills: ["Linux", "Shell Scripting", "System Admin"],
    year: "2022"
  },
  {
    name: "ML Quest Hackathon (4th Place)",
    org: "IEEE CIS SBC, GHRCE",
    img: "/certificates/ml-quest-hackathon.png",
    link: "/certificates/ml-quest-hackathon.pdf",
    desc: "Identified fake job listings using ML. Placed 4th in a national hackathon. Led a team, built a classifier, and presented findings to industry judges.",
    skills: ["Machine Learning", "NLP", "Teamwork"],
    year: "2022"
  },
  {
    name: "ML Spark - Tvastr’25 (2nd Place)",
    org: "University of Hyderabad",
    img: "/certificates/ml-spark-tvastr25.png",
    link: "/certificates/ml-spark-tvastr25.pdf",
    desc: "Secured 2nd place in ML Spark at Tvastr’25 Analytics Fest. Developed a predictive analytics solution for real-world business data.",
    skills: ["Analytics", "Python", "Presentation"],
    year: "2022"
  },
  {
    name: "Microsoft Azure Fundamentals",
    org: "Microsoft",
    img: "/certificates/azure-fundamentals.png",
    link: "/certificates/Azure.pdf",
    desc: "Certified in Microsoft Azure Fundamentals, demonstrating foundational knowledge of cloud services and Azure best practices.",
    skills: ["Azure", "Cloud", "DevOps"],
    year: "2023"
  },
  {
    name: "Google Data Analytics Professional",
    org: "Google",
    img: "/certificates/google-data-analytics.png",
    link: "/certificates/google-data-analytics.pdf",
    desc: "Covers data cleaning, analysis, and visualization using Google tools. Completed hands-on projects with real datasets.",
    skills: ["Data Analysis", "Google Sheets", "Visualization"],
    year: "2023"
  },
];

const popupVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.9, y: 40, transition: { duration: 0.2 } }
};

const Certificates = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certificates" className="py-24 px-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md text-black dark:text-white transition-colors duration-300">
      <h2 className="text-4xl font-bold mb-12 text-center">Certificates</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {certificates.map((cert, i) => (
          <motion.a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            key={cert.name}
            className="block bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl transition-colors duration-300 p-4 w-64 cursor-pointer"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              scale: 1.06,
              boxShadow: "0 8px 32px 0 rgba(124,58,237,0.15)",
              zIndex: 2
            }}
            transition={{ duration: 0.5, delay: i * 0.12, type: "spring" }}
            onClick={e => {
              e.preventDefault();
              setSelected(cert);
            }}
          >
            <img src={cert.img} alt={cert.name} className="w-full h-36 object-contain mb-4 rounded" />
            <div className="font-semibold text-lg">{cert.name}</div>
            <div className="text-purple-600">{cert.org}</div>
            <div className="text-xs text-gray-500 mt-1">{cert.year}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {cert.skills.map(skill => (
                <span key={skill} className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded text-xs">{skill}</span>
              ))}
            </div>
          </motion.a>
        ))}
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
              <img src={selected.img} alt={selected.name} className="w-full h-40 object-contain mb-4 rounded" />
              <div className="font-bold text-xl mb-2">{selected.name}</div>
              <div className="text-purple-600 mb-2">{selected.org}</div>
              <div className="text-xs text-gray-500 mb-2">{selected.year}</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {selected.skills.map(skill => (
                  <span key={skill} className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-0.5 rounded text-xs">{skill}</span>
                ))}
              </div>
              <div className="text-gray-700 dark:text-gray-300">{selected.desc}</div>
              <a
                href={selected.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
              >
                View Certificate
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;