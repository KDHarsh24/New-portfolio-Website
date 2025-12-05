import React, { useEffect } from 'react';
import './utils/lenis.css';
import Cursor from './components/Cursor/Cursor';
import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Journey from './components/Journey/Journey';
import Contact from './components/Contact/Contact';
import SettingsWidget from './components/SettingsWidget/SettingsWidget';
import ScrollLine from './components/ScrollLine/ScrollLine';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll } from './utils/smoothScroll';
// import 'lenis/dist/lenis.css' // Commented out as we are using CDN fallback which might not need it or we add css manually

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      lenis.destroy();
    };
  }, []);

  // Removed global scroll animations to simplify scrolling
  return (
    <div className="body">
      <Cursor />
      <Preloader />
      <ScrollLine />
      <SettingsWidget />
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Journey />
      <Contact />
    </div>
  );
}

export default App;
