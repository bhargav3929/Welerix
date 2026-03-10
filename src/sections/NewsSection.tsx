import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface NewsSectionProps {
  className?: string;
}

const articles = [
  {
    slug: 'myshaadhi-link-revolutionizing-indian-wedding-invitations',
    date: 'Mar 2025',
    tag: 'Weddings & Events',
    title: 'How MyShaadhi Link is replacing the WhatsApp forward with a cinematic wedding experience',
    excerpt: 'Indian weddings evolved in every way — except invitations. We built MyShaadhi Link to change that. One link replaces printed cards, WhatsApp JPEGs, and scattered Google Maps messages with a full interactive experience: personalized guest greetings, live countdowns, RSVP tracking, cinema-grade GSAP animations, and culturally authentic templates designed from the ground up for Indian ceremonies — from kolam rangoli entrances to temple gopuram motifs.',
    image: '/blog_myshaadhi.jpg',
    imageAlt: 'MyShaadhi Link wedding invitation displayed on a smartphone with Indian wedding motifs',
  },
  {
    slug: 'ai-jobs-automation-600-applications-per-month',
    date: 'Mar 2025',
    tag: 'Technology',
    title: '600 job applications a month — without lifting a finger. Introducing our AI Jobs Automation platform.',
    excerpt: 'Job hunting is broken. Students spend hours every day tailoring resumes, writing cover letters, and clicking "Apply" — only to hear nothing back. We\'re building an AI system that applies to 20 jobs per day on behalf of every candidate. That\'s roughly 600 applications a month, each one matched and optimized. While students focus on learning and interviews, our platform handles the grind. This is how we\'re helping the next generation land careers faster.',
    image: '/blog_ai_jobs.jpg',
    imageAlt: 'AI jobs automation platform dashboard showing automated job applications',
  },
  {
    slug: 'why-we-are-building-a-holding-company',
    date: 'Feb 2025',
    tag: 'Company',
    title: 'Why we\'re building a holding company — not a startup',
    excerpt: 'Startups are designed to be sold. We\'re building companies designed to last. Welerix operates as a holding company because we believe the best businesses compound over decades, not quarters. Each venture runs independently with its own team and brand, but shares the infrastructure, capital, and long-term thinking that comes from being part of something larger. This is our thesis — and why we think the holding company model is the future for ambitious operators.',
    image: '/blog_holding_company.jpg',
    imageAlt: 'Abstract architectural visualization representing Welerix holding company structure',
  },
  {
    slug: 'six-industries-that-will-define-the-next-decade',
    date: 'Jan 2025',
    tag: 'Vision',
    title: 'The 6 industries we believe will define the next decade — and why we\'re building in all of them',
    excerpt: 'Technology, sports, tourism, weddings, logistics, and investing — these aren\'t random picks. Each one represents a trillion-dollar market undergoing fundamental shifts. AI is rewriting how work gets done. Sports is becoming a tech-driven entertainment empire. The wedding industry is going digital. Tourism is being reshaped post-pandemic. We break down our thesis for each vertical and what we\'re building to capture the opportunity.',
    image: '/blog_six_industries.jpg',
    imageAlt: 'Six illuminated pillars representing Welerix industry verticals against a dramatic sky',
  },
];

const NewsSection = ({ className = '' }: NewsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
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
            { y: 50, opacity: 0 },
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
      id="news-section"
      className={`relative py-[14vh] px-[6vw] bg-warm ${className}`}
    >
      {/* Header */}
      <div ref={headlineRef} className="mb-[8vh]">
        <span className="micro-label block mb-6">News & insights</span>
        <h2 className="font-['Montserrat'] font-bold text-[clamp(32px,3.4vw,54px)] text-[#141414] leading-[1.0]">
          From the journal
        </h2>
      </div>

      {/* Articles grid — 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
        {articles.map((article, index) => (
          <Link
            key={article.slug}
            to={`/blog/${article.slug}`}
            ref={(el) => { cardsRef.current[index] = el as unknown as HTMLDivElement; }}
            className="group cursor-pointer block"
          >
            {/* Image placeholder */}
            <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden bg-[#E8E5E0]">
              <img
                src={article.image}
                alt={article.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.placeholder-text')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'placeholder-text absolute inset-0 flex items-center justify-center p-6';
                    placeholder.innerHTML = `
                      <div class="text-center">
                        <div style="font-family: Montserrat; font-weight: 700; font-size: 14px; color: rgba(111,111,111,0.4); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Add image</div>
                        <div style="font-family: Inter; font-size: 12px; color: rgba(111,111,111,0.3); line-height: 1.5; max-width: 280px;">${article.imageAlt}</div>
                      </div>
                    `;
                    parent.appendChild(placeholder);
                  }
                }}
              />
            </div>

            {/* Date + tag */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-['Inter'] text-[12px] text-[#6F6F6F]">
                {article.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D7A04D]" />
              <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D7A04D]">
                {article.tag}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-['Montserrat'] font-bold text-[clamp(17px,1.3vw,22px)] text-[#141414] leading-[1.3] mb-4 group-hover:text-[#D7A04D] transition-colors duration-300">
              {article.title}
            </h3>

            {/* Excerpt */}
            <p className="font-['Inter'] text-[13px] md:text-[14px] leading-[1.65] text-[#6F6F6F] mb-6 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Read more */}
            <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
              <span className="font-['Inter'] text-[13px] font-medium text-[#141414]">
                Read more
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#141414]" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
