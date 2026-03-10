import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id: string;
  number: string;
  title: string;
  headline: string;
  body: string;
  cta: string;
  micro: string;
  image: string;
  layout: 'left' | 'right';
  className?: string;
}

const FeatureSection = ({
  id,
  number,
  title,
  headline,
  body,
  cta,
  micro,
  image,
  layout,
  className = '',
}: FeatureSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  const isLeftLayout = layout === 'left';

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
      if (isLeftLayout) {
        // Photo from left, text from right
        scrollTl.fromTo(
          photoRef.current,
          { x: '-50vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0
        );

        scrollTl.fromTo(
          hairlineRef.current,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, ease: 'none' },
          0.08
        );

        scrollTl.fromTo(
          textPanelRef.current,
          { x: '35vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.10
        );
      } else {
        // Text from left, photo from right
        scrollTl.fromTo(
          textPanelRef.current,
          { x: '-35vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        scrollTl.fromTo(
          photoRef.current,
          { x: '50vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, ease: 'none' },
          0.05
        );

        scrollTl.fromTo(
          hairlineRef.current,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, ease: 'none' },
          0.12
        );
      }

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%) - faster exit
      if (isLeftLayout) {
        scrollTl.fromTo(
          photoRef.current,
          { x: 0, opacity: 1 },
          { x: '-20vw', opacity: 0, ease: 'power2.in' },
          0.65
        );

        scrollTl.fromTo(
          textPanelRef.current,
          { x: 0, opacity: 1 },
          { x: '20vw', opacity: 0, ease: 'power2.in' },
          0.65
        );
      } else {
        scrollTl.fromTo(
          textPanelRef.current,
          { x: 0, opacity: 1 },
          { x: '-20vw', opacity: 0, ease: 'power2.in' },
          0.65
        );

        scrollTl.fromTo(
          photoRef.current,
          { x: 0, opacity: 1 },
          { x: '20vw', opacity: 0, ease: 'power2.in' },
          0.65
        );
      }

      scrollTl.fromTo(
        hairlineRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'center', ease: 'power2.in' },
        0.85
      );
    }, section);

    return () => ctx.revert();
  }, [isLeftLayout]);

  const photoPosition = isLeftLayout
    ? 'left-[6vw] w-[58vw]'
    : 'left-[36vw] w-[58vw]';

  const textPosition = isLeftLayout
    ? 'left-[68vw] w-[26vw]'
    : 'left-[6vw] w-[26vw]';

  const hairlinePosition = isLeftLayout
    ? 'left-[66vw]'
    : 'left-[34vw]';

  return (
    <section
      ref={sectionRef}
      id={`${id}-section`}
      className={`section-pinned bg-warm ${className}`}
    >
      {/* Photo card */}
      <div
        ref={photoRef}
        className={`absolute top-[12vh] ${photoPosition} h-[76vh] overflow-hidden`}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vertical hairline */}
      <div
        ref={hairlineRef}
        className={`absolute ${hairlinePosition} top-[16vh] h-[68vh] hairline`}
      />

      {/* Text panel */}
      <div
        ref={textPanelRef}
        className={`absolute top-[12vh] ${textPosition} h-[76vh] flex flex-col justify-between py-8`}
      >
        {/* Top micro label */}
        <span className="micro-label">
          {number} / {title}
        </span>

        {/* Main content */}
        <div>
          <h2 className="font-['Montserrat'] font-bold text-[clamp(28px,3vw,46px)] text-[#141414] leading-[1.05] mb-6">
            {headline}
          </h2>
          <p className="font-['Inter'] text-[14px] md:text-[15px] leading-[1.6] text-[#141414] mb-8">
            {body}
          </p>
          <a href="#" className="cta-link">
            {cta}
          </a>
        </div>

        {/* Bottom micro label */}
        <span className="micro-label">{micro}</span>
      </div>
    </section>
  );
};

export default FeatureSection;
