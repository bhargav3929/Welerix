import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LeadershipSectionProps {
  className?: string;
}

const LeadershipSection = ({ className = '' }: LeadershipSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        quoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leadership-section"
      className={`relative py-[14vh] px-[6vw] bg-[#0E3A3A] ${className}`}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-[8vw]">
        {/* Left — founder info */}
        <div ref={contentRef}>
          <span className="micro-label block mb-8 !text-white/40">Leadership</span>

          <h2 className="font-['Montserrat'] font-bold text-[clamp(28px,2.8vw,44px)] text-white leading-[1.05] mb-3">
            Bhargav
          </h2>
          <p className="font-['Inter'] text-[15px] text-white/50 mb-8">
            Founder & CEO, Welerix Holdings
          </p>

          <p className="font-['Inter'] text-[14px] md:text-[15px] leading-[1.7] text-white/60 max-w-[460px]">
            Welerix was founded with a clear thesis: the best businesses of the next decade
            will be built by operators who understand technology deeply and think in
            decades, not quarters. We're here to prove that.
          </p>
        </div>

        {/* Right — quote / vision */}
        <div ref={quoteRef} className="flex flex-col justify-center">
          <div className="border-l-2 border-[#D7A04D] pl-8 lg:pl-10">
            <blockquote className="font-['Montserrat'] font-semibold text-[clamp(22px,2.2vw,34px)] text-white leading-[1.25] mb-6">
              "We're not building a portfolio.<br />
              We're building the companies<br />
              that will define the next era<br />
              of business."
            </blockquote>
            <cite className="font-['Inter'] text-[13px] text-[#D7A04D] not-italic tracking-wide">
              — Bhargav, Founder & CEO
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
