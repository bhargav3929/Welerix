import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MosaicSectionProps {
  className?: string;
}

const MosaicSection = ({ className = '' }: MosaicSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);

  const industries = [
    { name: 'Technology', image: '/mosaic_tech.jpg' },
    { name: 'Sports Industry', image: '/mosaic_sports.jpg' },
    { name: 'Tourism', image: '/mosaic_tourism.jpg' },
    { name: 'Weddings & Events', image: '/mosaic_weddings.jpg' },
    { name: 'Logistics', image: '/mosaic_logistics.jpg' },
    { name: 'Investing', image: '/mosaic_investing.jpg' },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0%-30%) - faster entrance
      // Headline block entrance
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Mosaic tiles stagger entrance - tighter stagger
      tilesRef.current.forEach((tile, index) => {
        if (tile) {
          scrollTl.fromTo(
            tile,
            { y: '16vh', opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, ease: 'none' },
            0.05 + index * 0.03
          );
        }
      });

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%) - faster exit
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.65
      );

      tilesRef.current.forEach((tile) => {
        if (tile) {
          scrollTl.fromTo(
            tile,
            { y: 0, opacity: 1 },
            { y: '-12vh', opacity: 0, ease: 'power2.in' },
            0.68
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mosaic-section"
      className={`section-pinned bg-warm ${className}`}
    >
      {/* Left headline block */}
      <div
        ref={headlineRef}
        className="absolute left-[6vw] top-[18vh] w-[26vw]"
      >
        <h2 className="font-['Montserrat'] font-bold text-[clamp(34px,3.6vw,56px)] text-[#141414] leading-[0.95] mb-4">
          Six verticals
        </h2>
        <p className="font-['Inter'] text-[16px] md:text-[18px] text-[#6F6F6F] leading-[1.5]">
          Six industries. One mission — build what the future demands.
        </p>
      </div>

      {/* Mosaic grid */}
      <div className="absolute left-[36vw] top-[10vh] w-[58vw] h-[80vh]">
        <div className="grid grid-cols-3 grid-rows-2 gap-[2.2vw] h-full">
          {industries.map((industry, index) => (
            <div
              key={industry.name}
              ref={(el) => { tilesRef.current[index] = el; }}
              className="relative overflow-hidden group cursor-pointer"
            >
              <img
                src={industry.image}
                alt={industry.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              {/* Label */}
              <span className="absolute bottom-4 left-4 font-['Inter'] text-[13px] font-medium text-white tracking-wide">
                {industry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MosaicSection;
