import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ContactSection from '../sections/ContactSection';

interface BlogPost {
  slug: string;
  date: string;
  tag: string;
  title: string;
  image: string;
  imageAlt: string;
  content: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: 'myshaadhi-link-revolutionizing-indian-wedding-invitations',
    date: 'Mar 2025',
    tag: 'Weddings & Events',
    title: 'How MyShaadhi Link is replacing the WhatsApp forward with a cinematic wedding experience',
    image: '/blog_myshaadhi.jpg',
    imageAlt: 'MyShaadhi Link wedding invitation displayed on a smartphone with Indian wedding motifs',
    content: [
      'Indian weddings have evolved in every way — venues, fashion, food, photography — but invitations haven\'t kept up. Most couples today choose between printed cards that cost ₹50–200 each for 500+ guests, a static WhatsApp JPEG that gets lost in group chats, or generic digital builders designed for Western weddings that don\'t understand the difference between a Sangeet and a Reception.',

      'None of these feel like a premium, modern experience worthy of the most important day of a couple\'s life. That\'s why we built MyShaadhi Link.',

      '## It\'s an Experience, Not Just an Image',

      'A photo invitation is a flat JPEG. A video invitation is a passive 30-second clip. MyShaadhi Link creates a full interactive web experience that guests explore at their own pace — scroll through beautifully animated sections, view a live countdown ticking to the wedding day, browse a curated photo gallery, get one-tap Google Maps directions to every venue, RSVP directly from the invitation, and add events to their personal calendar.',

      'A video invitation ends after 30 seconds. Our invitation is a living, breathing experience that guests revisit multiple times before the wedding.',

      '## Personalization for Every Single Guest',

      'When a couple shares a photo or video invitation, every guest gets the exact same thing. With MyShaadhi Link, each guest receives a unique personalized link. The invitation greets them by name: "Dear Sharma Uncle, you are cordially invited..." WhatsApp share messages are pre-filled with the guest\'s name. This turns a mass broadcast into a personal touch — every guest feels individually invited, not just added to a group forward.',

      '## Culturally Authentic, Not Generic',

      'Most digital invitation platforms are built for Western weddings and slap on an "Indian" category with some generic marigold clipart. MyShaadhi Link templates are designed from the ground up for Indian wedding traditions — real temple gopuram motifs inspired by South Indian Dravidian architecture, kolam rangoli entrance animations, toran garland decorations, banana leaf elements, and baraat procession art.',

      'We don\'t just make "Indian-themed" invitations. We make invitations that an Indian grandmother would look at and say "Bagundi!" (Beautiful in Telugu).',

      '## Cinema-Grade Animations',

      'Our invitations use GSAP — the same animation engine powering Apple.com and Nike.com. Scroll-triggered reveals create a cinematic storytelling experience. Each template has a unique entrance animation: envelope opening, flower rain cascading down the screen, a sacred kolam pattern drawing itself, or an elegant wax seal breaking to reveal the invitation.',

      'The result: guests say "Wow, how did you make this?" — not "Oh, another WhatsApp forward."',

      '## Built-In RSVP Tracking',

      'With printed cards or photo invitations, couples have no idea who\'s actually coming. They call 200 people individually or just guess. MyShaadhi Link has integrated RSVP in every invitation — guests tap, submit their attendance and guest count, and couples receive real-time email notifications. This alone saves couples 20+ hours of phone calls and prevents ordering food for 500 when 800 show up.',

      '## One Link, Everything Included',

      'A typical Indian wedding requires sharing the invitation, venue address, event schedule, RSVP request, pre-wedding video, livestream link, and calendar event — that\'s 7 different messages. MyShaadhi Link consolidates all of this into a single beautiful link. One link shared on WhatsApp contains the full invitation with up to 8 event cards, embedded Google Maps, photo gallery, video player, livestream link, RSVP form, and add-to-calendar button.',

      'No more sending 7 different messages. One link. Done.',

      '## Five Template Styles',

      'We offer 5 distinct templates starting at ₹2,999 — South Indian (temple elegance with envelope opening), Classic (sacred heritage with kolam entrance), Royal Premium (grand with flower rain), Signature of Love (romantic with wax seal), and Minimalistic (modern earth-tone simplicity). Each has its own color palette, typography system, cultural elements, and unique entrance animation.',

      '## WhatsApp-Native Workflow',

      'We built for how Indians actually communicate — WhatsApp first. Couples send details via WhatsApp, we deliver the finished link via WhatsApp, guests receive and share via WhatsApp. The entire journey lives where Indian families already spend their time.',

      'Standard delivery in 2–4 days. Premium in 1–2 days. One-time payment, no subscription, unlimited revisions included. For context: printed cards take 1–2 weeks for design, printing, and distribution. We\'re faster and the result is infinitely more interactive.',

      'We didn\'t just digitize the wedding card — we reimagined the entire invitation experience for the WhatsApp generation of Indian families.',
    ],
  },
  {
    slug: 'ai-jobs-automation-600-applications-per-month',
    date: 'Mar 2025',
    tag: 'Technology',
    title: '600 job applications a month — without lifting a finger. Introducing our AI Jobs Automation platform.',
    image: '/blog_ai_jobs.jpg',
    imageAlt: 'AI jobs automation platform dashboard showing automated job applications',
    content: [
      'Job hunting is fundamentally broken. Every year, millions of students graduate and enter a job market where the process of actually finding work is more exhausting than the work itself. Tailoring resumes, writing cover letters, filling out the same form fields across dozens of portals, clicking "Apply" — only to hear nothing back. Repeat, every single day, for months.',

      'We believe nobody should spend 4 hours a day applying to jobs. That time is better spent learning, building skills, preparing for interviews — the things that actually land careers. So we\'re building a system that does the applying for you.',

      '## 20 Jobs a Day. 600 a Month. Automatically.',

      'Our AI platform applies to 20 jobs per day on behalf of every candidate. That\'s roughly 600 applications a month — each one matched to the candidate\'s profile, optimized for the role, and submitted without the candidate lifting a finger.',

      'This isn\'t spray-and-pray. The system analyzes job descriptions, matches them against the candidate\'s skills, experience, and preferences, and tailors each application accordingly. It\'s the difference between a human intern and a strategic career agent working around the clock.',

      '## How It Works',

      'Candidates create a profile once — their resume, skills, job preferences, target roles, preferred locations, salary expectations. The AI takes it from there. Every day, it scans thousands of open positions across job boards, company career pages, and recruitment platforms. It identifies the 20 best-fit opportunities, crafts tailored applications, and submits them.',

      'Candidates wake up each morning to a summary: here\'s what was applied for, here\'s why each role was selected, and here\'s the status of previous applications. They stay informed without doing the work.',

      '## Why This Matters for Students',

      'Students are the ones who suffer most from the broken hiring process. They have limited professional networks, no recruiter relationships, and often lack the experience to know which roles to target. They spend their final semester in a cycle of anxiety — applying, waiting, hearing nothing, applying more.',

      'Our platform levels the playing field. A first-generation college student gets the same volume and quality of applications as someone with family connections in the industry. The AI doesn\'t care about your last name or which college you went to — it matches skills to opportunities, period.',

      '## The Math That Changes Everything',

      'The average job seeker submits 100-200 applications before landing an offer. At 5-10 applications per day (the human maximum before burnout), that\'s 20-40 days of grueling work. Our platform does 600 applications in 30 days. That\'s 3-6x the volume with zero effort from the candidate.',

      'More applications means more callbacks. More callbacks means more interviews. More interviews means faster offers. The math is simple — and it favours the candidate who shows up everywhere.',

      '## Building the Future of Hiring',

      'This platform is our bet on a simple thesis: the job application process is a commodity that should be automated, so humans can focus on what actually matters — demonstrating their skills in interviews, building relationships, and choosing the right fit.',

      'We\'re not replacing recruiters. We\'re replacing the manual grind that sits between a talented person and their next opportunity. The future of hiring is one where finding a job is as effortless as ordering a cab — you tell the system what you want, and it handles the rest.',

      'We\'re launching soon. If you\'re a student, a recent graduate, or someone tired of the application treadmill — we\'re building this for you.',
    ],
  },
  {
    slug: 'why-we-are-building-a-holding-company',
    date: 'Feb 2025',
    tag: 'Company',
    title: 'Why we\'re building a holding company — not a startup',
    image: '/blog_holding_company.jpg',
    imageAlt: 'Abstract architectural visualization representing Welerix holding company structure',
    content: [
      'The startup playbook is well-known: raise money, grow fast, find product-market fit, raise more money, scale, exit. It\'s a proven model — for some types of businesses. But it\'s not the only model, and for what we\'re trying to build, it\'s the wrong one.',

      'Welerix is a holding company. We create, acquire, and operate businesses across multiple industries. We don\'t have a single product or a single market. We have a portfolio — and each venture in that portfolio is built to last, not built to sell.',

      '## The Problem with "Built to Exit"',

      'Most startups are designed from day one to be acquired or IPO\'d. Every decision — hiring, product, pricing, strategy — is filtered through the lens of "what makes us more attractive to a buyer?" This creates perverse incentives. You optimize for growth metrics over profitability. You take on dilutive funding rounds. You build for the next fundraise, not the next decade.',

      'We think the best businesses are the ones nobody wants to sell. Businesses that generate real cash flow, serve real customers, and compound value over time — not ones that burn capital hoping for a liquidity event that may never come.',

      '## The Holding Company Advantage',

      'A holding company structure gives us three things a traditional startup doesn\'t:',

      'First, diversification. If one venture hits a rough patch, the others keep generating. We\'re not one bad quarter away from death.',

      'Second, shared infrastructure. Legal, finance, design, technology — our ventures share resources that would cost each one millions to build independently. A startup with 10 employees can\'t afford a CFO. A holding company with 5 ventures can.',

      'Third, patience. We don\'t have venture investors expecting a 10x return in 7 years. We can let businesses grow at their natural pace, make decisions for the long term, and reinvest profits instead of chasing the next round.',

      '## What We Look For',

      'Every venture in our portfolio meets a simple criteria: it operates in a large market undergoing structural change, it can be significantly improved with technology, and it has the potential to generate sustainable cash flow within a reasonable timeline.',

      'We\'re not interested in moonshots that require 10 years and $100 million to validate. We\'re interested in real businesses that solve real problems — and we\'re willing to build them from scratch or acquire them if they already exist and are doing good work.',

      '## The Companies That Will Define the Next Era',

      'Look at the holding companies that shaped the last century — Tata Group, Berkshire Hathaway, Alphabet, LVMH. They didn\'t build one product. They built ecosystems. They entered industries early, operated with discipline, and let compounding do the work.',

      'That\'s our playbook. Not because we\'re trying to be Berkshire. But because we believe the operator who thinks in decades, builds across industries, and reinvests relentlessly will outperform the one chasing a single exit.',

      'Welerix is our vehicle for that belief. We\'re just getting started.',
    ],
  },
  {
    slug: 'six-industries-that-will-define-the-next-decade',
    date: 'Jan 2025',
    tag: 'Vision',
    title: 'The 6 industries we believe will define the next decade — and why we\'re building in all of them',
    image: '/blog_six_industries.jpg',
    imageAlt: 'Six illuminated pillars representing Welerix industry verticals against a dramatic sky',
    content: [
      'When we chose the six verticals for Welerix, we didn\'t throw darts at a board. Each industry was selected because it sits at the intersection of massive market size, structural disruption, and an opportunity to build something meaningfully better with technology at the core.',

      'Here\'s our thesis for each one.',

      '## 1. Technology',

      'This is our backbone. Every venture we build or acquire gets re-engineered with software, AI, and automation at its core. But technology is also a vertical in itself — we build standalone tech products that serve markets directly. Our AI jobs automation platform is the first example: using artificial intelligence to eliminate the manual grind of job applications for millions of students and job seekers.',

      'The next decade belongs to companies that don\'t just "use" AI but are fundamentally built on it. We intend to build several.',

      '## 2. Sports Industry',

      'Sports is no longer just about the game. It\'s a technology-driven entertainment, data, and media empire. From athlete performance analytics to fan engagement platforms, from tournament management to streaming infrastructure — the sports industry is being rebuilt from the ground up.',

      'We see an opportunity to build SaaS products that serve this ecosystem: tools for team management, tournament operations, performance tracking, and fan experiences. The global sports market is worth over $500 billion and growing. The software layer on top of it is still nascent.',

      '## 3. Tourism',

      'Post-pandemic tourism isn\'t just recovering — it\'s transforming. Travelers want personalized, experience-driven trips, not package holidays from a brochure. The infrastructure behind tourism — booking, logistics, local experiences, hospitality management — is ripe for technology-led disruption.',

      'India alone is projected to become the 4th largest domestic tourism market globally. We believe there\'s an enormous opportunity to build technology and services that serve this wave — and we\'re positioning to capture it.',

      '## 4. Weddings & Events',

      'The Indian wedding industry is worth over $130 billion annually — and growing. Yet most of it runs on WhatsApp forwards, phone calls, and manual coordination. We\'re already in this space with MyShaadhi Link, our cinematic digital invitation platform. But invitations are just the entry point.',

      'The broader opportunity spans event planning, vendor management, guest coordination, and post-event content. Every layer of the wedding experience can be made better with technology. We\'re starting with invitations and expanding from there.',

      '## 5. Logistics',

      'India\'s logistics costs are among the highest in the world as a percentage of GDP — nearly 14% compared to 8% in developed economies. The gap is inefficiency, and the fix is technology. Fleet management, route optimization, real-time tracking, automated dispatch — these are solved problems in theory but broken in practice for most small and mid-size logistics operators.',

      'We\'re building management software that brings enterprise-grade logistics capabilities to operators who currently run on spreadsheets and phone calls.',

      '## 6. Investing',

      'This is both a vertical and a meta-strategy. We don\'t just build ventures — we invest in and acquire them. Angel investing in early-stage companies, strategic acquisitions of businesses that fit our portfolio, and deploying capital where it compounds.',

      'Our investing approach is simple: we back founders and businesses we believe in, we bring operational support (not just capital), and we hold for the long term. We\'re not flipping companies. We\'re building a portfolio that grows in value every year.',

      '## Why All Six at Once?',

      'Because diversification isn\'t a weakness — it\'s a strategy. Each vertical operates independently, but together they create a resilient, compounding portfolio. When one industry faces headwinds, others provide stability. When one venture develops technology, others benefit from it.',

      'This is how the best holding companies in history were built — not by betting everything on one idea, but by building across industries with discipline, patience, and a long-term horizon.',

      'We\'re early. But we\'re building all six pillars simultaneously because we believe the next decade rewards those who start now.',
    ],
  },
];

const BlogPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-warm flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Montserrat'] font-bold text-[clamp(28px,3vw,44px)] text-[#141414] mb-4">
            Post not found
          </h1>
          <Link to="/" className="cta-link">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Top bar */}
      <nav className="fixed top-0 left-0 w-full z-[100]" style={{ backgroundColor: 'rgba(244, 242, 238, 0.92)', backdropFilter: 'blur(8px)' }}>
        <div className="flex items-center justify-between px-[6vw] py-5">
          <Link to="/" className="font-['Montserrat'] font-bold text-xl tracking-tight text-[#141414] hover:opacity-70 transition-opacity">
            Welerix
          </Link>
          <Link to="/" className="flex items-center gap-2 font-['Inter'] text-sm font-medium text-[#141414] hover:text-[#6F6F6F] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="bg-warm pt-[14vh] pb-[10vh]">
        {/* Header */}
        <div className="max-w-[760px] mx-auto px-[6vw]">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-['Inter'] text-[12px] text-[#6F6F6F]">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-[#D7A04D]" />
            <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#D7A04D]">{post.tag}</span>
          </div>

          <h1 className="font-['Montserrat'] font-bold text-[clamp(28px,3.4vw,50px)] text-[#141414] leading-[1.1] mb-10">
            {post.title}
          </h1>
        </div>

        {/* Hero image */}
        <div className="max-w-[960px] mx-auto px-[6vw] mb-12">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#E8E5E0]">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-full object-cover"
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
                      <div style="font-family: Inter; font-size: 12px; color: rgba(111,111,111,0.3); line-height: 1.5; max-width: 280px;">${post.imageAlt}</div>
                    </div>
                  `;
                  parent.appendChild(placeholder);
                }
              }}
            />
          </div>
        </div>

        {/* Body content */}
        <div className="max-w-[760px] mx-auto px-[6vw]">
          {post.content.map((block, index) => {
            if (block.startsWith('## ')) {
              return (
                <h2
                  key={index}
                  className="font-['Montserrat'] font-bold text-[clamp(20px,1.8vw,28px)] text-[#141414] leading-[1.15] mt-12 mb-5"
                >
                  {block.replace('## ', '')}
                </h2>
              );
            }
            return (
              <p
                key={index}
                className="font-['Inter'] text-[15px] md:text-[16px] leading-[1.75] text-[#3a3a3a] mb-6"
              >
                {block}
              </p>
            );
          })}

          {/* Back link */}
          <div className="mt-16 pt-10 border-t border-[rgba(20,20,20,0.12)]">
            <Link to="/" className="cta-link">
              Back to Welerix
            </Link>
          </div>
        </div>
      </article>

      {/* Footer / Contact */}
      <ContactSection />
    </div>
  );
};

export default BlogPage;
