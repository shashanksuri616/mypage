import { useState } from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: "2025",
    title: "Research Intern",
    org: "Cyber Guard 360",
    desc: "Built a Linux kernel module to safeguard data during ransomware attacks.",
  },
  {
    year: "2024",
    title: "LLM Lung Disease Detector",
    org: "Personal Project",
    desc: "Developed an LLM-powered lung disease detection tool.",
  },
  {
    year: "2023",
    title: "Diabetes Prediction App",
    org: "Personal Project",
    desc: "Created a mobile app for diabetes prediction using ML.",
  },
  // Add more as needed
];

const Timeline = () => (
  <section id="timeline" className="py-24 px-6 bg-gray-50 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
    <h2 className="text-4xl font-bold mb-12 text-center">Timeline</h2>
    <div className="max-w-3xl mx-auto">
      {timeline.map((item, i) => (
        <motion.div
          key={item.title}
          className="flex items-start mb-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: i * 0.12 }}
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
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Timeline;