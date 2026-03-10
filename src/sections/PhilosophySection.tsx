import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PhilosophySectionProps {
  className?: string;
}

const principles = [
  {
    number: '01',
    title: 'Build to hold',
    body: 'We don\'t flip companies. Every venture in our portfolio is built with a decade-long horizon — designed to compound value, not chase exits.',
  },
  {
    number: '02',
    title: 'Technology as the backbone',
    body: 'Every industry we enter gets re-engineered with software, data, and automation at its core. Technology isn\'t a department — it\'s the foundation.',
  },
  {
    number: '03',
    title: 'Founder-led, always',
    body: 'Our ventures are run by operators who think like owners. We back conviction, give autonomy, and measure what matters — outcomes, not activity.',
  },
];

const PhilosophySection = ({ className = '' }: PhilosophySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const hairlineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Big statement entrance
      gsap.fromTo(
        statementRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Hairline
      gsap.fromTo(
        hairlineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Principles stagger
      principlesRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { x: '4vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 55%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy-section"
      className={`relative py-[14vh] px-[6vw] bg-warm ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 lg:gap-[5vw] items-start">
        {/* Left — big statement */}
        <div ref={statementRef} className="mb-16 lg:mb-0 lg:sticky lg:top-[20vh]">
          <span className="micro-label block mb-8">Our philosophy</span>
          <h2 className="font-['Montserrat'] font-bold text-[clamp(32px,3.4vw,54px)] text-[#141414] leading-[1.0] mb-6">
            We don't chase trends.<br />
            We build infrastructure<br />
            for the next era.
          </h2>
          <p className="font-['Inter'] text-[15px] md:text-[16px] leading-[1.65] text-[#6F6F6F] max-w-[480px]">
            Welerix exists to identify industries ripe for reinvention and build
            companies that lead the change — not follow it.
          </p>
        </div>

        {/* Hairline */}
        <div
          ref={hairlineRef}
          className="hidden lg:block hairline self-stretch"
        />

        {/* Right — principles */}
        <div className="space-y-12 lg:space-y-16">
          {principles.map((p, index) => (
            <div
              key={p.number}
              ref={(el) => { principlesRef.current[index] = el; }}
            >
              <span className="micro-label block mb-4">{p.number}</span>
              <h3 className="font-['Montserrat'] font-bold text-[clamp(20px,1.8vw,28px)] text-[#141414] leading-[1.1] mb-3">
                {p.title}
              </h3>
              <p className="font-['Inter'] text-[14px] md:text-[15px] leading-[1.65] text-[#6F6F6F] max-w-[420px]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
