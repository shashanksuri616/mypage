import { motion } from 'framer-motion';

const certificates = [
  {
    name: "Deep Learning Specialization",
    org: "Coursera",
    img: "https://img-certificate-url.com/deep-learning.png",
    link: "#"
  },
  {
    name: "Linux Foundation Certified SysAdmin",
    org: "Linux Foundation",
    img: "https://img-certificate-url.com/linux-foundation.png",
    link: "#"
  },
  // Add more as needed
];

const Certificates = () => (
  <section className="py-24 px-6 bg-white relative">
    <h2 className="text-4xl font-bold mb-12 text-center">Certificates</h2>
    <div className="flex flex-wrap justify-center gap-10">
      {certificates.map((cert, i) => (
        <motion.a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          key={cert.name}
          className="block bg-gray-50 rounded-xl shadow-lg p-4 w-64 hover:shadow-xl transition"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <img src={cert.img} alt={cert.name} className="w-full h-36 object-contain mb-4 rounded" />
          <div className="font-semibold text-lg">{cert.name}</div>
          <div className="text-purple-600">{cert.org}</div>
        </motion.a>
      ))}
    </div>
  </section>
);

export default Certificates;