import { useEffect, useState, useCallback } from 'react';
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
import ScrollFloat from './components/ScrollFloat';
import GameSideTab from './components/GameSideTab';

const BlobBackground = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setPosition({ x, y });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Top Left Blob */}
      <div
        className="absolute top-[-18%] left-[-18%] w-[60vw] h-[60vw] bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 opacity-30 blur-3xl animate-blob transition-transform duration-1000"
        style={{
          transform: `translate(${position.x * 60}px, ${position.y * 60}px) scale(1.05)`,
        }}
      />
      {/* Bottom Right Blob */}
      <div
        className="absolute bottom-[-15%] right-[-15%] w-[50vw] h-[50vw] bg-gradient-to-tr from-gray-800 via-indigo-800 to-purple-900 opacity-20 blur-2xl animate-blob2 transition-transform duration-1000"
        style={{
          transform: `translate(${position.x * -60}px, ${position.y * -60}px) scale(1.1)`,
        }}
      />
      {/* Center Accent Blob */}
      <div
        className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] bg-gradient-to-tl from-purple-700 via-indigo-800 to-gray-900 opacity-10 blur-2xl animate-blob3 transition-transform duration-1000"
        style={{
          transform: `translate(-50%, -50%) scale(${1 + (position.x + position.y) * 0.03})`,
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
    ScrollTrigger.batch('.fade-in', {
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        overwrite: true,
        ease: "power2.out"
      }),
      onLeave: batch => gsap.to(batch, { opacity: 0, y: 50, overwrite: true }),
      onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, duration: 1, overwrite: true }),
      onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 50, overwrite: true }),
      start: 'top 80%',
    });
    // Clean up ScrollTrigger on unmount
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <div>
      <BlobBackground />
      {/*<ScrollFloat/>*/}
      <GameSideTab/>
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