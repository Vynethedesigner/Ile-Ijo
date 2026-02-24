/**
 * Ile Ijo - Main Application
 * High-fidelity one-page website
 */

import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Hero } from './sections/Hero/Hero';
import { About } from './sections/About/About';
import { Announcement } from './sections/Announcement/Announcement';

import { Events } from './sections/Events/Events';
import { Footer } from './sections/Footer/Footer';
import './styles/global.css';
import './styles/layout_fixes.css';

function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <>
      <div className="main-content">
        <Hero />
        <About />
        <Announcement />

        <Events />
      </div>
      <Footer />
    </>
  );
}

export default App;
