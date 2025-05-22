import { useState } from 'react';
import { motion } from 'framer-motion';

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/surishashank/",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v4.73z"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/shashanksuri616",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/Shashank_E616",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.53 3H21.5l-7.06 8.06L22.5 21h-6.37l-5.01-6.13L5.5 21H1.5l7.5-8.58L1.5 3h6.5l4.62 5.66L17.53 3zm-1.13 15h2.13l-5.5-6.73-5.5 6.73h2.13l3.37-4.13 3.37 4.13z"/>
      </svg>
    ),
  },
  {
    name: "Gmail",
    url: "mailto:shashank.suri616@gmail.com",
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4v-9.99l8 6.99 8-6.99V18z"/>
      </svg>
    ),
  },
];

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
      className="bg-gray-900 py-32 px-6 text-white relative overflow-hidden bg-gray-50 dark:bg-gray-900 text-black dark:text-white"
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
          <div className="flex justify-center space-x-8">
            {socials.map(s => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-300"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;