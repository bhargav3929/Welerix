import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, ArrowUpRight, Briefcase, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CareersSectionProps {
  className?: string;
}

const openings = [
  {
    title: 'Social Media Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'We\'re looking for a sharp, creative social media manager to own our presence across LinkedIn, Instagram, X, and emerging platforms. You\'ll craft the narrative for a holding company building the future — not just schedule posts, but shape how the world sees Welerix and its ventures.',
    responsibilities: [
      'Own end-to-end social media strategy across all Welerix brands',
      'Create compelling content — copy, visuals, short-form video — that reflects our premium positioning',
      'Build and engage our community of founders, investors, and talent',
      'Track performance metrics and iterate based on data, not guesswork',
      'Collaborate with venture leads to amplify product launches and company milestones',
    ],
    requirements: [
      '2+ years managing social media for a brand, startup, or agency',
      'Strong copywriting skills — you can write for LinkedIn and Instagram in the same afternoon',
      'Eye for design and brand consistency',
      'Comfortable with analytics tools and reporting',
      'Bonus: experience in tech, startup, or holding company environments',
    ],
  },
];

const CareersSection = ({ className = '' }: CareersSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.1,
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

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="careers-section"
      className={`relative py-[14vh] px-[6vw] bg-warm ${className}`}
    >
      {/* Header */}
      <div ref={headlineRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-[8vh]">
        <div>
          <span className="micro-label block mb-6">Careers</span>
          <h2 className="font-['Montserrat'] font-bold text-[clamp(32px,3.4vw,54px)] text-[#141414] leading-[1.0]">
            Build with us
          </h2>
        </div>
        <p className="font-['Inter'] text-[15px] text-[#6F6F6F] max-w-[420px] mt-4 lg:mt-0">
          We're a small team doing big things. If you want to help shape industries
          — not just work at a company — we'd like to hear from you.
        </p>
      </div>

      {/* Job listings */}
      <div className="space-y-0">
        {openings.map((job, index) => (
          <div
            key={job.title}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="border-t border-[rgba(20,20,20,0.12)]"
          >
            {/* Job header — always visible */}
            <div
              className="group py-8 lg:py-10 cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-4 lg:gap-[4vw] items-start">
                {/* Left — title + meta */}
                <div>
                  <h3 className="font-['Montserrat'] font-bold text-[clamp(18px,1.5vw,24px)] text-[#141414] leading-[1.15] mb-3">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#6F6F6F]" />
                      <span className="font-['Inter'] text-[12px] text-[#6F6F6F]">{job.department}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#6F6F6F]" />
                      <span className="font-['Inter'] text-[12px] text-[#6F6F6F]">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#6F6F6F]" />
                      <span className="font-['Inter'] text-[12px] text-[#6F6F6F]">{job.type}</span>
                    </div>
                  </div>
                </div>

                {/* Center — short description */}
                <p className="font-['Inter'] text-[14px] md:text-[15px] leading-[1.65] text-[#6F6F6F]">
                  {job.description}
                </p>

                {/* Right — expand arrow */}
                <div className="hidden lg:flex items-center justify-center w-10 h-10 border border-[rgba(20,20,20,0.12)]">
                  <ChevronDown
                    className={`w-4 h-4 text-[#141414] transition-transform duration-300 ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Expanded details */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedIndex === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-10 lg:pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[6vw] lg:pl-0">
                {/* Responsibilities */}
                <div>
                  <h4 className="font-['Montserrat'] font-semibold text-[14px] text-[#141414] uppercase tracking-[0.1em] mb-5">
                    What you'll do
                  </h4>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D7A04D] mt-2 flex-shrink-0" />
                        <span className="font-['Inter'] text-[14px] leading-[1.6] text-[#6F6F6F]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="font-['Montserrat'] font-semibold text-[14px] text-[#141414] uppercase tracking-[0.1em] mb-5">
                    What we're looking for
                  </h4>
                  <ul className="space-y-3">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0E3A3A] mt-2 flex-shrink-0" />
                        <span className="font-['Inter'] text-[14px] leading-[1.6] text-[#6F6F6F]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Apply button */}
                  <a
                    href="mailto:bhargavcodes3@gmail.com?subject=Application: Social Media Manager"
                    className="group/btn inline-flex items-center gap-3 mt-8 px-8 py-4 bg-[#141414] text-white font-['Inter'] font-semibold text-[14px] hover:bg-[#D7A04D] hover:text-[#141414] transition-colors duration-300"
                  >
                    Apply now
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Bottom border */}
        <div className="border-t border-[rgba(20,20,20,0.12)]" />
      </div>

      {/* Bottom message */}
      <div className="mt-16 text-center">
        <p className="font-['Inter'] text-[14px] text-[#6F6F6F] mb-2">
          Don't see a role that fits? We're always open to exceptional people.
        </p>
        <a
          href="mailto:bhargavcodes3@gmail.com"
          className="cta-link"
        >
          Send us a note
        </a>
      </div>
    </section>
  );
};

export default CareersSection;
