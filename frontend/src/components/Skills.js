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

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  hover: {
    scale: 1.07,
    boxShadow: "0 8px 32px 0 rgba(124,58,237,0.18)",
    borderColor: "rgba(139,92,246,0.7)",
    transition: { type: "spring", stiffness: 300, damping: 18 }
  }
};

const Skills = () => (
  <section id="skills" className="py-24 px-6 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md text-black dark:text-white transition-colors duration-300">
    <h2 className="text-4xl font-bold mb-12 text-center">Skills & Tech</h2>
    <div className="flex flex-wrap justify-center gap-8">
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          className="relative flex flex-col items-center bg-white/30 dark:bg-gray-800/40 border-2 border-transparent hover:border-purple-400 shadow-xl rounded-2xl backdrop-blur-lg transition-colors duration-300 p-7 w-44 cursor-pointer group"
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          whileHover="hover"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.08 }}
        >
          <span className="text-5xl mb-4 drop-shadow-lg">{skill.icon}</span>
          <span className="font-semibold text-lg">{skill.name}</span>
          {/* Tooltip */}
          <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-20">
            {skill.name}
          </span>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;