import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NumbersSectionProps {
  className?: string;
}

const stats = [
  { value: '6', label: 'Industries', sub: 'across our portfolio' },
  { value: '4', label: 'Active ventures', sub: 'with more in development' },
  { value: '2025', label: 'Founded', sub: 'headquartered in India' },
  { value: '∞', label: 'Long-term horizon', sub: 'we build to hold' },
];

const NumbersSection = ({ className = '' }: NumbersSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.fromTo(
            stat,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 65%',
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
      id="numbers-section"
      className={`relative py-[12vh] px-[6vw] bg-warm ${className}`}
    >
      {/* Micro label */}
      <div ref={headlineRef} className="mb-[8vh]">
        <span className="micro-label">The company at a glance</span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            ref={(el) => { statsRef.current[index] = el; }}
            className={`py-10 lg:py-16 ${
              index < stats.length - 1 ? 'lg:border-r border-b lg:border-b-0' : ''
            } border-[rgba(20,20,20,0.12)] ${
              index < 2 ? 'border-b lg:border-b-0' : ''
            }`}
          >
            <div className={`${index > 0 ? 'lg:pl-[3vw]' : ''}`}>
              <div className="font-['Montserrat'] font-bold text-[clamp(48px,5.5vw,88px)] text-[#141414] leading-[0.9] mb-3">
                {stat.value}
              </div>
              <div className="font-['Montserrat'] font-semibold text-[clamp(14px,1.1vw,18px)] text-[#141414] mb-1">
                {stat.label}
              </div>
              <div className="font-['Inter'] text-[13px] text-[#6F6F6F]">
                {stat.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NumbersSection;
