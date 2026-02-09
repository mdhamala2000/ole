import { useEffect, useState } from 'react';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Menu from '@/sections/Menu';
import Events from '@/sections/Events';
import Reviews from '@/sections/Reviews';
import Gallery from '@/sections/Gallery';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function MainWebsite() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Navigation scrollY={scrollY} scrollToSection={scrollToSection} />
      <main>
        <section id="home">
          <Hero scrollToSection={scrollToSection} />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="menu">
          <Menu />
        </section>
        <section id="events">
          <Events />
        </section>
        <section id="reviews">
          <Reviews />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
