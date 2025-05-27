import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const certificates = [
  {
    name: "Deep Learning Specialization",
    org: "Coursera",
    img: "https://img-certificate-url.com/deep-learning.png",
    link: "#",
    desc: "A comprehensive specialization covering neural networks, CNNs, RNNs, and more."
  },
  {
    name: "Linux Foundation Certified SysAdmin",
    org: "Linux Foundation",
    img: "https://img-certificate-url.com/linux-foundation.png",
    link: "#",
    desc: "Certification for advanced Linux system administration skills."
  },
  {
    name: "AWS Certified Solutions Architect",
    org: "Amazon Web Services",
    img: "https://img-certificate-url.com/aws-solutions-architect.png",
    link: "#",
    desc: "Credential for designing and deploying scalable systems on AWS."
  },
  {
    name: "Google Data Analytics Professional",
    org: "Google",
    img: "https://img-certificate-url.com/google-data-analytics.png",
    link: "#",
    desc: "Covers data cleaning, analysis, and visualization using Google tools."
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