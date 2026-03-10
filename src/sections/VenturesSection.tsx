import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VenturesSectionProps {
  className?: string;
}

const ventures = [
  {
    name: 'AI Job Platform',
    description: 'An intelligent automation platform that applies to 20 jobs a day on behalf of every candidate — roughly 600 applications a month. Students focus on learning; we handle the grind.',
    industry: 'Technology',
    status: 'Active',
  },
  {
    name: 'MyShaadhi Link',
    description: 'Cinematic, culturally authentic digital wedding invitations for Indian families — personalized guest links, live countdowns, RSVP tracking, and cinema-grade animations. One link replaces everything.',
    industry: 'Weddings & Events',
    status: 'Active',
  },
  {
    name: 'Logistics LMS',
    description: 'An end-to-end courier and shipment management system for logistics operators — real-time tracking, dispatch automation, delivery analytics, and fleet coordination in one dashboard.',
    industry: 'Logistics',
    status: 'Active',
  },
  {
    name: 'Sports SaaS Platform',
    description: 'A software platform built for the sports industry — managing teams, tournaments, athlete performance data, and fan engagement under one intelligent system.',
    industry: 'Sports Industry',
    status: 'Active',
  },
  {
    name: 'Coming soon',
    description: 'New ventures across tourism, investing, and beyond are in early development. We announce when we ship.',
    industry: 'Multiple',
    status: 'In development',
  },
];

const VenturesSection = ({ className = '' }: VenturesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 60%',
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
      id="ventures-section"
      className={`relative py-[14vh] px-[6vw] bg-warm ${className}`}
    >
      {/* Header */}
      <div ref={headlineRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-[8vh]">
        <div>
          <span className="micro-label block mb-6">Our ventures</span>
          <h2 className="font-['Montserrat'] font-bold text-[clamp(32px,3.4vw,54px)] text-[#141414] leading-[1.0]">
            What we're building
          </h2>
        </div>
        <p className="font-['Inter'] text-[15px] text-[#6F6F6F] max-w-[380px] mt-4 lg:mt-0">
          Each venture operates independently with its own team, brand, and roadmap — backed by the full resources of Welerix.
        </p>
      </div>

      {/* Venture cards */}
      <div className="space-y-0">
        {ventures.map((venture, index) => (
          <div
            key={venture.name}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group border-t border-[rgba(20,20,20,0.12)] py-8 lg:py-10 cursor-pointer"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-4 lg:gap-[4vw] items-start">
              {/* Left — name + tags */}
              <div>
                <h3 className="font-['Montserrat'] font-bold text-[clamp(18px,1.5vw,24px)] text-[#141414] leading-[1.15] mb-3 group-hover:text-[#D7A04D] transition-colors duration-300">
                  {venture.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#6F6F6F] border border-[rgba(20,20,20,0.15)] px-3 py-1">
                    {venture.industry}
                  </span>
                  <span className={`font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-1 ${
                    venture.status === 'Active'
                      ? 'text-[#0E3A3A] bg-[#0E3A3A]/8'
                      : 'text-[#6F6F6F] bg-[#6F6F6F]/8'
                  }`}>
                    {venture.status}
                  </span>
                </div>
              </div>

              {/* Center — description */}
              <p className="font-['Inter'] text-[14px] md:text-[15px] leading-[1.65] text-[#6F6F6F]">
                {venture.description}
              </p>

              {/* Right — arrow */}
              <div className="hidden lg:flex items-center justify-center w-10 h-10 border border-[rgba(20,20,20,0.12)] group-hover:border-[#D7A04D] group-hover:bg-[#D7A04D] transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 text-[#141414] group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>
        ))}
        {/* Bottom border */}
        <div className="border-t border-[rgba(20,20,20,0.12)]" />
      </div>
    </section>
  );
};

export default VenturesSection;
