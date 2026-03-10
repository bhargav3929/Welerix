import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsVisible(scrollY > heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [isVisible]);

  const scrollToSection = (sectionId: string) => {
    // Small delay to ensure all ScrollTriggers are initialized
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      // Find the ScrollTrigger associated with this element
      const triggers = ScrollTrigger.getAll();
      const targetTrigger = triggers.find(st => st.trigger === element);

      if (targetTrigger && targetTrigger.vars.pin) {
        // For pinned sections, scroll to the settle point (center of the pinned range)
        // The settle point is at 50% of the pinned scroll distance
        const settlePosition = targetTrigger.start + (targetTrigger.end ?? targetTrigger.start - targetTrigger.start) * 0.5;
        
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: settlePosition, autoKill: false },
          ease: 'power2.inOut',
        });
      } else {
        // For non-pinned sections (like Contact), scroll to the element's top
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset + rect.top;
        
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: scrollTop, autoKill: false },
          ease: 'power2.inOut',
        });
      }
    }, 50);
  };

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0, autoKill: false },
      ease: 'power2.inOut',
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] opacity-0 -translate-y-full"
      style={{
        backgroundColor: 'rgba(244, 242, 238, 0.92)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-center justify-between px-[6vw] py-5">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="font-['Montserrat'] font-bold text-xl tracking-tight text-[#141414] hover:opacity-70 transition-opacity"
        >
          Welerix
        </button>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: 'Verticals', id: 'mosaic-section' },
            { label: 'Ventures', id: 'ventures-section' },
            { label: 'Journal', id: 'news-section' },
            { label: 'Careers', id: 'careers-section' },
            { label: 'Contact', id: 'contact-section' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-['Inter'] text-sm font-medium text-[#141414] hover:text-[#6F6F6F] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
