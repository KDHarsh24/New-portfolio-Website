import React, { useEffect } from 'react';
import Cursor from './components/Cursor/Cursor';
import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import Projects from './components/Projects/Projects';
import Journey from './components/Journey/Journey';
import Contact from './components/Contact/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Removed global scroll animations to simplify scrolling
  return (
    <div className="body">
      <Cursor />
      <Preloader />
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <Journey />
      <Contact />
    </div>
  );
}

export default App;
