import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import Impact from '@/components/sections/Impact';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Certifications from '@/components/sections/Certifications';
import Workshop from '@/components/sections/Workshop';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Impact />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Certifications />
      <Workshop />
      <Contact />
    </main>
  );
}
