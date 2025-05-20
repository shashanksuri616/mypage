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
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Certificates />
      <Timeline />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;