import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.section
      className="bg-white py-32 px-6 text-black relative overflow-hidden"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
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

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold mb-8">About Me</h2>
          <p className="text-lg leading-relaxed">
            Hi, I'm Suri Shashank, a creative developer who loves building
            unique, minimal, and impactful web experiences. I specialize in the MERN stack and enjoy solving real-world problems with code.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            I focus on clean design and seamless functionality, always aiming to bring ideas to life in a memorable way. Let's create something amazing together!
          </p>
        </motion.div>

        {/* Visual/Placeholder */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="bg-gray-100 h-96 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            {/* Replace with your image */}
            <img
              src="https://avatars.githubusercontent.com/u/placeholder"
              alt="Suri Shashank"
              className="object-cover h-full w-full"
              style={{ filter: "grayscale(0.2)" }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="text-gray-400 text-xl absolute">[Your Image Here]</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;