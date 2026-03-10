import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import MosaicSection from './sections/MosaicSection';
import NumbersSection from './sections/NumbersSection';
import PhilosophySection from './sections/PhilosophySection';
import VenturesSection from './sections/VenturesSection';
import LeadershipSection from './sections/LeadershipSection';
import NewsSection from './sections/NewsSection';
import CareersSection from './sections/CareersSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Get all pinned ScrollTriggers after they're created
      const setupGlobalSnap = () => {
        const pinned = ScrollTrigger.getAll()
          .filter(st => st.vars.pin)
          .sort((a, b) => a.start - b.start);

        const maxScroll = ScrollTrigger.maxScroll(window);
        if (!maxScroll || pinned.length === 0) return;

        const pinnedRanges = pinned.map(st => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              // Check if we're in a pinned section (with small buffer)
              const inPinned = pinnedRanges.some(
                r => value >= r.start - 0.03 && value <= r.end + 0.03
              );
              if (!inPinned) return value;

              // Find nearest section center
              const target = pinnedRanges.reduce(
                (closest, r) =>
                  Math.abs(r.center - value) < Math.abs(closest - value)
                    ? r.center
                    : closest,
                pinnedRanges[0]?.center ?? 0
              );
              return target;
            },
            duration: { min: 0.12, max: 0.28 },
            delay: 0,
            ease: 'power2.out',
          },
        });
      };

      // Delay to allow all section ScrollTriggers to initialize
      setTimeout(setupGlobalSnap, 150);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative">
        {/* Hero */}
        <HeroSection className="z-10" />

        {/* Six Verticals Mosaic */}
        <MosaicSection className="z-20" />

        {/* By the Numbers */}
        <NumbersSection className="z-30" />

        {/* Philosophy */}
        <PhilosophySection className="z-40" />

        {/* Our Ventures */}
        <VenturesSection className="z-50" />

        {/* Leadership */}
        <LeadershipSection className="z-[60]" />

        {/* News & Insights */}
        <NewsSection className="z-[70]" />

        {/* Careers */}
        <CareersSection className="z-[75]" />

        {/* Contact */}
        <ContactSection className="z-[80]" />
      </main>
    </div>
  );
}

export default App;
