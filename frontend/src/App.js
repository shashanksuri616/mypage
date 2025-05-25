import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Timeline from './components/Timeline';
import Navbar from './components/Navbar';
import { useEffect, useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles


const BlobBackground = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Top Left Blob - mostly white/gray with a hint of accent */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-gray-900 dark:to-purple-900 opacity-25 blur-3xl animate-blob transition-transform duration-1000"
        style={{
          transform: `translate(${position.x * 60}px, ${position.y * 60}px)`,
        }}
      />

      {/* Bottom Right Blob - mostly neutral, slight accent */}
      <div
        className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] bg-gradient-to-tr from-white via-gray-200 to-blue-100 dark:from-black dark:via-gray-800 dark:to-indigo-900 opacity-15 blur-2xl animate-blob2 transition-transform duration-1000"
        style={{
          transform: `translate(${position.x * -60}px, ${position.y * -60}px)`,
        }}
      />
    </div>
  );
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    gsap.from('.fade-in', {
      opacity: 10,
      y: 50,
      duration: 100,
      scrollTrigger: {
        trigger: '.fade-in',
        start: 'top 80%',
      },
    });
  }, []);

  return (
    //   <div className="fixed inset-0 -z-10 pointer-events-none">
    //     <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
    //       {/* Top Left Blob */}
    //       <div
    //         className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-40 blur-3xl animate-blob transition-transform duration-1000"
    //         style={{
    //           transform: `translate(${position.x * 0.1}px, ${position.y * 0.1}px)`,
    //         }}
    //       />

    //       {/* Bottom Right Blob */}
    //       <div
    //         className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] bg-gradient-to-tr from-emerald-400 via-cyan-400 to-indigo-400 opacity-30 blur-2xl animate-blob2 transition-transform duration-1000"
    //         style={{
    //           transform: `translate(${position.x * -0.1}px, ${position.y * -0.1}px)`,
    //         }}
    //       />
    //     </div>
    //   </div>
    <div>
      <BlobBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Certificates />
      <Contact />
    </div>
  );
}

export default App;