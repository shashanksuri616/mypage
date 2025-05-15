import { motion } from 'framer-motion';
const About = () => {
    return (
        <motion.section
        className="bg-white py-32 px-6 text-black relative overflow-hidden"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full blur-3xl opacity-30"></div>
  
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text Content */}
          <div>
            <h2 className="text-5xl font-bold mb-8" data-aos="fade-right">About Me</h2>
            <p className="text-lg leading-relaxed">
              Hi, I'm [Your Name], a passionate developer who loves crafting
              stunning, minimal, and impactful websites. I specialize in the MERN
              stack and enjoy creating creative web experiences that leave a
              lasting impression.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              With a strong focus on clean design and seamless functionality, I
              aim to bring ideas to life through code. Let's build something
              amazing together!
            </p>
          </div>
  
          {/* Visual/Placeholder */}
          <div className="relative">
            <div className="bg-gray-100 h-96 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-gray-400 text-xl">[Your Image Here]</span>
            </div>
          </div>
        </div>
      </motion.section>
    );
  };
  
  export default About;