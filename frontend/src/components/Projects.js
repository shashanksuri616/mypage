import { motion } from 'framer-motion';

const projects = [
  {
    title: "Project One",
    desc: "UI/UX & Development",
    img: "https://source.unsplash.com/random/800x600?website,1",
  },
  {
    title: "Project Two",
    desc: "E-commerce Platform",
    img: "https://source.unsplash.com/random/800x600?website,2",
  },
  {
    title: "Project Three",
    desc: "Portfolio Website",
    img: "https://source.unsplash.com/random/800x600?website,3",
  },
];

const Projects = () => (
  <motion.section
    className="bg-gray-50 py-32 px-6 relative overflow-hidden"
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
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

    <h2 className="text-5xl font-bold mb-16 text-center relative z-10">Selected Work</h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
      {projects.map((proj, i) => (
        <motion.div
          key={proj.title}
          className="group relative overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 * i }}
        >
          <img
            src={proj.img}
            alt={proj.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold">{proj.title}</h3>
              <p className="text-sm mt-2">{proj.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

export default Projects;