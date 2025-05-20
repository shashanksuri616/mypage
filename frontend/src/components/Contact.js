import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setStatus('Message sent!');
      else setStatus('Something went wrong.');
    } catch {
      setStatus('Something went wrong.');
    }
  };
  return (
    <motion.section id="contact"
      className="bg-gray-900 py-32 px-6 text-white relative overflow-hidden"
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

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl font-bold mb-12 text-center">Get in Touch</h2>
        <p className="text-lg text-center mb-12">
          Have a question or want to work together? Feel free to reach out!
        </p>
        <motion.form
          className="grid grid-cols-1 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <input name="name" value={form.name} onChange={handleChange}
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input name="email" value={form.email} onChange={handleChange}
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea name="message" value={form.message} onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <motion.button
            type="submit"
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Message
          </motion.button>
        </motion.form>
        {status && <p className="mt-4 text-center">{status}</p>}
        <div className="mt-12 text-center">
          <p className="text-lg mb-4">Or connect with me on:</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300" aria-label="LinkedIn">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300" aria-label="GitHub">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-all duration-300" aria-label="Twitter">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
export default Contact;