import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Photo panel entrance
      loadTl.fromTo(
        photoRef.current,
        { opacity: 0, x: '-6vw' },
        { opacity: 1, x: 0, duration: 0.9 },
        0
      );

      // Hairline entrance
      loadTl.fromTo(
        hairlineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.7, transformOrigin: 'center' },
        0.2
      );

      // Content blocks stagger entrance
      const contentElements = [
        headlineRef.current,
        subheadlineRef.current,
        bodyRef.current,
        ctaRef.current,
        microRef.current,
      ];

      loadTl.fromTo(
        contentElements,
        { opacity: 0, x: '6vw' },
        { opacity: 1, x: 0, duration: 0.7, stagger: 0.08 },
        0.3
      );

      // Scroll-driven animation with shorter distance for snappier transitions
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(photoRef.current, { opacity: 1, x: 0 });
            gsap.set([headlineRef.current, subheadlineRef.current, bodyRef.current, ctaRef.current, microRef.current], { opacity: 1, x: 0, y: 0 });
            gsap.set(hairlineRef.current, { scaleY: 1 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold at visible state (already animated on load)
      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%) - faster exit
      scrollTl.fromTo(
        photoRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.65
      );

      scrollTl.fromTo(
        [headlineRef.current, subheadlineRef.current],
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, ease: 'power2.in' },
        0.65
      );

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current, microRef.current],
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.68
      );

      scrollTl.fromTo(
        hairlineRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'center', ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToMosaic = () => {
    setTimeout(() => {
      const element = document.getElementById('mosaic-section');
      if (!element) return;

      // Find the ScrollTrigger associated with this element
      const triggers = ScrollTrigger.getAll();
      const targetTrigger = triggers.find(st => st.trigger === element);

      if (targetTrigger && targetTrigger.vars.pin) {
        // For pinned sections, scroll to the settle point (center of the pinned range)
        const settlePosition = targetTrigger.start + ((targetTrigger.end ?? targetTrigger.start) - targetTrigger.start) * 0.5;
        
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: settlePosition, autoKill: false },
          ease: 'power2.inOut',
        });
      } else {
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

  return (
    <section
      ref={sectionRef}
      className={`section-pinned bg-warm ${className}`}
    >
      {/* Left photo panel */}
      <div
        ref={photoRef}
        className="absolute left-0 top-0 w-[56vw] h-full overflow-hidden"
      >
        <img
          src="/hero_building.jpg"
          alt="Modern architecture"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vertical hairline */}
      <div
        ref={hairlineRef}
        className="absolute left-[56vw] top-[10vh] h-[80vh] hairline"
      />

      {/* Right content panel */}
      <div className="absolute left-[56vw] top-0 w-[44vw] h-full flex flex-col justify-center px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-2">
          <h1 className="font-['Montserrat'] font-bold text-[clamp(44px,5vw,78px)] text-[#141414] leading-[0.95]">
            Welerix
          </h1>
        </div>

        {/* Subheadline */}
        <div ref={subheadlineRef} className="mb-10">
          <h2 className="font-['Montserrat'] font-semibold text-[clamp(24px,2.5vw,38px)] text-[#141414] leading-[1.1]">
            Building businesses that<br />shape the future
          </h2>
        </div>

        {/* Body copy */}
        <p
          ref={bodyRef}
          className="font-['Inter'] text-[15px] md:text-[16px] leading-[1.6] text-[#141414] max-w-[30vw] mb-10"
        >
          We create, acquire, and scale ventures across technology, sports,
          tourism, weddings, logistics, and investing — each one built
          to define what comes next.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mb-16">
          <button onClick={scrollToMosaic} className="cta-link">
            Explore our ventures
          </button>
        </div>

        {/* Micro label */}
        <span ref={microRef} className="micro-label">
          Six verticals &middot; One vision
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
