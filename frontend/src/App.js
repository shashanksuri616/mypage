import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BlobBackground = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Top Left Blob */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-gradient-to-br from-white via-gray-100 to-purple-100 dark:from-black dark:via-gray-900 dark:to-purple-900 opacity-25 blur-3xl animate-blob transition-transform duration-1000"
        style={{
          transform: `translate(${position.x * 60}px, ${position.y * 60}px)`,
        }}
      />
      {/* Bottom Right Blob */}
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
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.fade-in', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.fade-in',
        start: 'top 80%',
      },
    });
  }, []);

  return (
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