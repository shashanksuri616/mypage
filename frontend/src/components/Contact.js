const Contact = () => {
    return (
      <section className="bg-gray-900 py-32 px-6 text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full blur-3xl opacity-30"></div>
  
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-12 text-center" >Get in Touch</h2>
          <p className="text-lg text-center mb-12">
            Have a question or want to work together? Feel free to reach out!
          </p>
  
          {/* Contact Form */}
          <form className="grid grid-cols-1 gap-6" data-aos="fade-up">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Send Message
            </button>
          </form>
  
          {/* Social Media Links */}
          <div className="mt-12 text-center">
            <p className="text-lg mb-4">Or connect with me on:</p>
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Contact;