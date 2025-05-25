import { motion } from 'framer-motion';

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Node.js", icon: "🟩" },
  { name: "Python", icon: "🐍" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Linux", icon: "🐧" },
  { name: "Machine Learning", icon: "🤖" },
  // Add more as needed
];

const Skills = () => (
  <section id="skills" className="py-24 px-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md text-black dark:text-white transition-colors duration-300">
    <h2 className="text-4xl font-bold mb-12 text-center">Skills & Tech</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          className="flex flex-col items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl transition-colors duration-300 p-6 w-40 "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        >
          <span className="text-4xl mb-3">{skill.icon}</span>
          <span className="font-semibold text-lg">{skill.name}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;