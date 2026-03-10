import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowRight, Download, User, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

const CONTACT_EMAIL = 'bhargavcodes3@gmail.com';

const ContactSection = ({ className = '' }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { x: '8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      bottomCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: '6vh', opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.12,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Welerix Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const bottomCards = [
    {
      icon: Download,
      title: 'Download the portfolio overview',
      description: 'Complete holdings report',
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Request: Portfolio Overview')}`,
    },
    {
      icon: User,
      title: 'Request an introduction',
      description: 'Schedule a meeting',
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Request: Introduction / Meeting')}`,
    },
    {
      icon: Lock,
      title: 'Investor login',
      description: 'Secure portal access',
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Request: Investor Portal Access')}`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className={`relative min-h-screen bg-teal py-[8vh] px-[6vw] ${className}`}
    >
      {/* Background grid pattern */}
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

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[8vw] mb-20">
        {/* Left column - Headline */}
        <div ref={headlineRef}>
          <h2 className="font-['Montserrat'] font-bold text-[clamp(34px,4vw,58px)] text-white leading-[0.95] mb-6">
            Let's shape<br />what's next
          </h2>
          <p className="font-['Inter'] text-[15px] md:text-[16px] leading-[1.6] text-white/70 mb-12 max-w-[400px]">
            Whether you're a founder, investor, or partner — we'd like to hear from you.
          </p>

          {/* Contact details */}
          <div className="space-y-4">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 group">
              <Mail className="w-5 h-5 text-gold" />
              <span className="font-['Inter'] text-[14px] text-white/90 group-hover:text-gold transition-colors">
                bhargavcodes3@gmail.com
              </span>
            </a>
            <a href="tel:+919553132929" className="flex items-center gap-3 group">
              <Phone className="w-5 h-5 text-gold" />
              <span className="font-['Inter'] text-[14px] text-white/90 group-hover:text-gold transition-colors">
                +91 95531 32929
              </span>
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="font-['Inter'] text-[14px] text-white/90">
                Hyderabad, India
              </span>
            </div>
          </div>
        </div>

        {/* Right column - Form */}
        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-['Inter'] text-[12px] font-medium text-white/60 uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 font-['Inter'] text-[15px] text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block font-['Inter'] text-[12px] font-medium text-white/60 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 font-['Inter'] text-[15px] text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block font-['Inter'] text-[12px] font-medium text-white/60 uppercase tracking-wider mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-3 font-['Inter'] text-[15px] text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
                placeholder="Your company"
              />
            </div>

            <div>
              <label className="block font-['Inter'] text-[12px] font-medium text-white/60 uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-3 font-['Inter'] text-[15px] text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors resize-none"
                placeholder="Tell us about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className="group flex items-center gap-3 mt-8 px-8 py-4 bg-gold text-[#141414] font-['Inter'] font-semibold text-[14px] hover:bg-white transition-colors"
            >
              {isSubmitted ? 'Opening mail client...' : 'Send message'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/10">
        {bottomCards.map((card, index) => (
          <a
            key={card.title}
            href={card.href}
            ref={(el) => { bottomCardsRef.current[index] = el as unknown as HTMLDivElement; }}
            className="group cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center border border-white/20 group-hover:border-gold transition-colors">
                <card.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-['Inter'] font-medium text-[14px] text-white group-hover:text-gold transition-colors mb-1">
                  {card.title}
                </h3>
                <p className="font-['Inter'] text-[12px] text-white/50">
                  {card.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 pt-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="font-['Montserrat'] font-bold text-xl text-white">
            Welerix
          </div>
          <div className="flex flex-wrap gap-6 md:gap-10">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map((link) => (
              <a
                key={link}
                href="#"
                className="font-['Inter'] text-[12px] text-white/50 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="font-['Inter'] text-[12px] text-white/40">
            &copy; 2025 Welerix Holdings. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
