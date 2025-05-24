import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Timeline from './components/Timeline';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

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
    <div>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Animated blurred blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 opacity-40 blur-3xl animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-emerald-400 via-cyan-400 to-indigo-400 opacity-30 blur-2xl animate-blob2" />
      </div>
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