const Projects = () => {
    return (
      <section className="bg-gray-50 py-32 px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full blur-3xl opacity-30"></div>
  
        <h2 className="text-5xl font-bold mb-16 text-center relative z-10">Selected Work</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
          {/* Project Card 1 */}
          <div className="group relative overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg" data-aos="zoom-in">
            <img
              src="yourproject1.jpg"
              alt="Project 1"
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold">Project One</h3>
                <p className="text-sm mt-2">UI/UX & Development</p>
              </div>
            </div>
          </div>
  
          {/* Project Card 2 */}
          <div className="group relative overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg" data-aos="zoom-in">
            <img
              src="yourproject2.jpg"
              alt="Project 2"
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold">Project Two</h3>
                <p className="text-sm mt-2">E-commerce Platform</p>
              </div>
            </div>
          </div>
  
          {/* Project Card 3 */}
          <div className="group relative overflow-hidden border-2 border-gray-200 rounded-lg shadow-lg" data-aos="zoom-in">
            <img
              src="yourproject3.jpg"
              alt="Project 3"
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold">Project Three</h3>
                <p className="text-sm mt-2">Portfolio Website</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Projects;