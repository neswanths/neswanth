"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  ArrowRight,
  Award,
  ChevronDown,
  Grid3x3,
  Minus,
  Network,
  Terminal,
  Mail,
  Download,
  X,
  ArrowUp,
  Menu
} from "lucide-react";

/* ══════════════════════════════════════════════
   ICON COMPONENTS
   Custom SVG icons for social links.
   ══════════════════════════════════════════════ */

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5 0-1.4-.5-2.5-1.5-3.5.1-.3.6-1.7-.1-3.5 0 0-1.2-.4-3.9 1.4a12.3 12.3 0 0 0-7 0C6 2.7 4.8 3.1 4.8 3.1c-.7 1.8-.2 3.2-.1 3.5-1 1-1.5 2.1-1.5 3.5 0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function WhatsappIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );
}

/* ── CSSVars type — allows arbitrary CSS custom properties in style objects ── */
type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

/* ══════════════════════════════════════════════
   HERO FLOATING OBJECTS DATA
   Each entry defines a sticker/object that floats
   in the hero section with animation and position.
   ══════════════════════════════════════════════ */

const heroObjects = [
  {
    src: "/objects/spiderman-sticker.png",
    alt: "Spiderman sticker",
    className: "obj-spiderman float-1 hero-obj-tablet-show",
    style: { top: "28%", left: "5vw", "--base-w": "clamp(54px, 5vw, 72px)", "--rot": "-10deg" },
  },
  {
    src: "/objects/batman-sticker.png",
    alt: "Batman sticker",
    className: "obj-batman float-2",
    style: { top: "13%", left: "calc(50% + 20.5vw)", "--base-w": "clamp(38px, 3.2vw, 58px)", "--rot": "-8deg" },
  },
  {
    src: "/objects/boxinggloves-sticker.png",
    alt: "Boxing gloves sticker",
    className: "obj-boxing float-3 hero-obj-tablet-show",
    style: { top: "11%", right: "4vw", "--base-w": "clamp(76px, 7vw, 124px)", "--rot": "12deg" },
  },
  {
    src: "/objects/dumbell-sticker.png",
    alt: "Dumbbell sticker",
    className: "obj-dumbell float-4 max-lg:hidden",
    style: { top: "10%", left: "7vw", "--base-w": "clamp(70px, 6.4vw, 118px)", "--rot": "-10deg" },
  },
  {
    src: "/objects/music-sticker.png",
    alt: "Music sticker",
    className: "obj-music float-1 hero-obj-tablet-show",
    style: { top: "10%", left: "20vw", "--base-w": "clamp(52px, 4.7vw, 78px)", "--rot": "8deg" },
  },
  {
    src: "/objects/guitar-sticker.png",
    alt: "Guitar sticker",
    className: "obj-guitar float-4 max-lg:hidden",
    // Music cluster: placed top-right with vertical separation from boxing gloves.
    style: { top: "6%", right: "16vw", "--base-w": "clamp(48px, 4.6vw, 76px)", "--rot": "9deg" },
  },
  {
    src: "/objects/vinlandsaga-sticker.png",
    alt: "Vinland Saga sticker",
    className: "obj-vinland float-3 max-lg:hidden",
    style: { bottom: "8%", right: "16vw", "--base-w": "clamp(78px, 6.6vw, 118px)", "--rot": "7deg" },
  },
  {
    src: "/objects/whiplash-sticker.png",
    alt: "Whiplash sticker",
    className: "obj-whiplash float-4 max-lg:hidden",
    style: { bottom: "10%", left: "6vw", "--base-w": "clamp(82px, 6.8vw, 122px)", "--rot": "-18deg" },
  },
  {
    src: "/objects/cinema-sticker.png",
    alt: "Cinema ticket sticker",
    className: "obj-cinema float-2 max-lg:hidden",
    // Cinephile zone: adjacent to Whiplash, offset upward to avoid contact.
    style: { bottom: "31%", left: "3vw", "--base-w": "clamp(72px, 7vw, 128px)", "--rot": "-9deg" },
  },
  {
    src: "/objects/feymanbook-sticker.jpg",
    alt: "Feynman book sticker",
    className: "obj-feynman float-2 max-lg:hidden",
    style: { top: "62%", right: "6vw", "--base-w": "clamp(66px, 5.4vw, 96px)", "--rot": "2deg" },
  },
  {
    src: "/objects/radio-sticker.png",
    alt: "Radio sticker",
    className: "obj-radio float-1 max-lg:hidden",
    // Cultural shelf: bottom-right, kept below Feynman with a clear gap.
    style: { bottom: "3%", right: "5vw", "--base-w": "clamp(84px, 7.4vw, 136px)", "--rot": "-6deg" },
  },
  {
    src: "/objects/dollar-bill-sticker.png",
    alt: "Dollar bill sticker",
    className: "obj-dollar float-1 max-lg:hidden",
    style: { top: "30%", right: "17vw", "--base-w": "clamp(92px, 8vw, 144px)", "--rot": "-5deg" },
  },
  {
    src: "/objects/letscook-sticker.png",
    alt: "Let's Cook RV sticker",
    className: "obj-letscook float-3 max-lg:hidden",
    // Mid-right gap: between Vinland Saga and the controls, outside the protected center column.
    style: { bottom: "18%", right: "28vw", "--base-w": "clamp(72px, 6.2vw, 112px)", "--rot": "5deg" },
  },
];

/* ── Cleaned-mode position overrides for floating objects ── */
const CLEANED_POSITIONS: Record<string, Record<string, string>> = {
  "obj-batman": { top: "13%", left: "calc(50% + 20.5vw)" },
  "obj-dumbell": { top: "11%", left: "5vw" },
  "obj-music": { top: "15%", left: "17vw" },
  "obj-guitar": { top: "8%", left: "25vw" },
  "obj-boxing": { top: "26%", left: "23vw" },
  "obj-dollar": { top: "31%", left: "8vw" },
  "obj-spiderman": { top: "40%", left: "4vw" },
  "obj-vinland": { top: "67%", left: "18vw" },
  "obj-letscook": { top: "56%", left: "32vw" },
  "obj-whiplash": { top: "73%", left: "5vw" },
  "obj-cinema": { top: "79%", left: "12vw" },
  "obj-feynman": { top: "58%", left: "26vw" },
  "obj-radio": { top: "72%", left: "30vw" },
};

const CLEANED_SPECIAL: Record<string, Record<string, string>> = {
  "terminal-chip": { top: "42%", left: "17vw" },
  "luffy-card": { top: "62%", left: "13vw" },
  "latest-win": { top: "86%", left: "18vw" },
};

const latestWin = "2nd Place - PRAJWALAN 2K26";

/* ══════════════════════════════════════════════
   FEATURED PROJECTS DATA
   Each project shown in the work section with
   live iframe preview, description, and link.
   ══════════════════════════════════════════════ */

const featuredProjects = [
  {
    name: "D-Cloud",
    address: "https://d-cloud-public.vercel.app",
    href: "https://d-cloud-public.vercel.app",
    description:
      "Decentralized cloud storage that survives node failures — files stay recoverable even when parts of the network go down.",
    preview: "dcloud",
  },
  {
    name: "Vigil",
    address: "https://vigil-amin.vercel.app",
    href: "https://vigil-amin.vercel.app",
    description:
      "A network of AI agents that research markets, analyze competitors, and build strategy — autonomously. Real-time, no manual prompting.",
    preview: "vigil",
  },
  {
    name: "Blinky",
    address: "https://blinky-nst.vercel.app",
    href: "https://blinky-nst.vercel.app",
    description:
      "A bookmark manager that actually works across devices. Chrome extension, web app, everything stays in sync — instantly.",
    preview: "blinky",
  },
] as const;

/* ══════════════════════════════════════════════
   TECH STACK DATA
   Two tiers: visible top tier (core stack) and
   secondary tier shown on expand.
   ══════════════════════════════════════════════ */

const TECH_STACK = [
  // --- VISIBLE TOP TIER: Core AI & Primary Infrastructure Engine ---
  { name: 'Python', slug: 'python', color: '3776AB', fallback: 'Py' },
  { name: 'React', slug: 'react', color: '61DAFB', fallback: 'R' },
  { name: 'FastAPI', slug: 'fastapi', color: '009688', fallback: 'FA' },
  { name: 'LangGraph', slug: 'langchain', color: '1C3C3C', fallback: 'LG' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1', fallback: 'PS' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6', fallback: 'TS' },
  { name: 'WebSockets', slug: 'socketdotio', color: '010101', fallback: 'WS' },
  { name: 'Docker', slug: 'docker', color: '2496ED', fallback: 'D' },
  { name: 'Supabase', slug: 'supabase', color: '3FCF8E', fallback: 'SB' },
  { name: 'Redis', slug: 'redis', color: 'DC382D', fallback: 'R' },
  { name: 'Git', slug: 'git', color: 'F05032', fallback: 'G' },

  // --- SECONDARY TIER: Core Languages, Supporting Tools & Libraries ---
  { name: 'JavaScript (ES6+)', slug: 'javascript', color: 'F7DF1E', fallback: 'JS' },
  { name: 'Rust', slug: 'rust', color: '000000', fallback: 'R' },
  { name: 'C++', slug: 'cplusplus', color: '00599C', fallback: 'C++' },
  { name: 'C', slug: 'c', color: 'A8B9CC', fallback: 'C' },
  { name: 'Java', slug: 'oracle', color: 'E76F51', fallback: 'J' },
  { name: 'Upstash', slug: 'upstash', color: '00E6C3', fallback: 'U' },
  { name: 'D3.js', slug: 'd3', color: 'F9A03C', fallback: 'D3' },
  { name: 'React Flow', slug: 'react', color: 'FF0072', fallback: 'RF' },
  { name: 'Zustand', slug: 'react', color: '808080', fallback: 'Z' },
  { name: 'Vite', slug: 'vite', color: '646CFF', fallback: 'V' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '06B6D4', fallback: 'TW' },
  { name: 'Holochain', slug: 'holochain', color: '02D4E0', fallback: 'H' },
  { name: 'SQLite', slug: 'sqlite', color: '003B57', fallback: 'SQ' },
  { name: 'OAuth2', slug: 'auth0', color: 'EB5424', fallback: 'OA' },
  { name: 'JWT', slug: 'jsonwebtokens', color: '000000', fallback: 'JWT' }
];

/* ── TechBadge
    Individual tech stack badge with icon fallback.
    Uses simpleicons CDN for logos. ── */
function TechBadge({ tech }: { tech: typeof TECH_STACK[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="
      tech-badge-item
      group flex items-center gap-1.5 md:gap-2 px-2.5 py-[5px] md:py-[6px] 
      rounded-md border border-dashed border-black/15 bg-white/30
      shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]
      hover:border-black/35 hover:scale-[1.02]
      dark:border-white/10 dark:bg-white/5 dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.02)]
      dark:hover:border-white/20 dark:hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.04)]
      transition-all duration-300 ease-out cursor-pointer select-none
    ">
      {imgError ? (
        <span className="text-xs font-mono font-bold text-[var(--ink-muted)] group-hover:text-[var(--ink)]">
          {tech.fallback}
        </span>
      ) : (
        <img
          src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
          alt=""
          className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      )}
      <span className="text-[12.5px] md:text-sm font-medium text-[var(--ink-muted)] group-hover:text-[var(--ink)] transition-colors duration-300 font-[family-name:var(--font-body)]">
        {tech.name}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TECH STACK SECTION
   Expandable grid of technology badges.
   Shows top 11 by default, rest on expand.
   ══════════════════════════════════════════════ */
function TechStackSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTech = isExpanded ? TECH_STACK : TECH_STACK.slice(0, 11);

  return (
    <section id="tech-stack" className="order-5 py-16 w-full bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto px-4 md:px-0 flex flex-col">
        {/* Top Header Row with Conditional Less Button */}
        <div className="w-full flex justify-between items-end pb-2">
          <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-display)] italic text-[var(--ink)] tracking-tight">
            my tech stack.
          </h2>
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs md:text-sm font-[family-name:var(--font-body)] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors duration-300 cursor-pointer outline-none pb-0.5"
            >
              less ^
            </button>
          )}
        </div>

        {/* Tag Container */}
        <div className="w-full flex flex-wrap gap-2.5 md:gap-3.5">
          {visibleTech.map((tech) => (
            <TechBadge key={tech.name} tech={tech} />
          ))}
          {/* Inline More Button positioned precisely after Git when collapsed */}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="
                tech-stack-more-btn
                flex items-center gap-1 px-3 py-[5px] md:py-[6px] rounded-md
                border border-dashed border-[var(--accent-warm)]/30 bg-[var(--bg)]
                text-[12.5px] md:text-sm font-medium font-[family-name:var(--font-body)] text-[var(--accent-warm)]
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)]
                hover:bg-white/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer outline-none
                dark:hover:bg-white/10
              "
            >
              more v
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

const resumeUrl = "https://drive.google.com/file/d/1OHsZ1Q35jMyAAsumpkp_dEHf4ZGXzcUX/view?usp=drive_link";

const socialLinks = [
  { label: "Email", href: "mailto:neswanths@gmail.com", icon: <Mail size={20} /> },
  { label: "GitHub", href: "https://github.com/neswanths", icon: <GithubIcon size={20} /> },
  { label: "LinkedIn", href: "https://linkedin.com/in/neswanth", icon: <LinkedinIcon size={20} /> },
  { label: "Instagram", href: "https://instagram.com/neswanths", icon: <InstagramIcon size={20} /> },
];

/* ══════════════════════════════════════════════
   SERVICES DATA & SECTION
   Three service offerings with expandable modal
   for detailed description.
   ══════════════════════════════════════════════ */

const services = [
  {
    index: "01",
    title: "AI-Powered Features",
    body: "Your product already has users. I make it intelligent enough to keep them.",
    subline: "Think: search that understands intent, not keywords.",
    expandedBody: "Most products add AI as a feature. The better move is making it the layer that makes everything else work better — surfacing what users actually need before they ask, handling repetitive judgment calls in the background, getting more accurate the longer it runs.\n\nIn practice: a RAG pipeline that lets your users query your own product's data in plain English. A recommendation layer that learns from behavior instead of guessing. An AI assistant that sits inside your existing UI and handles the questions your support team answers fifty times a day.\n\nThe goal isn't an AI feature. It's a product that feels like it understands the person using it."
  },
  {
    index: "02",
    title: "Full-Stack Web Apps",
    body: "You have an idea. I build the version that survives production.",
    subline: "Think: auth, deployment, edge cases — handled before they're your problem.",
    expandedBody: "Most freelancers build until it works locally, then hand it off. I build for what happens at 3AM when something breaks and you don't have an engineer on call.\n\nIn practice: full auth flows, database design that doesn't become a problem at scale, deployment pipelines that don't need babysitting. Vigil and Blinky are both live — you can use them right now.\n\nDesign, backend, frontend, auth, database, deployment. One person accountable for the whole thing."
  },
  {
    index: "03",
    title: "Agentic AI Systems",
    body: "Your team makes the same decisions every day. I build systems that make them — and act on them.",
    subline: "Think: lead research that runs overnight and lands in your inbox ready to act on.",
    expandedBody: "Research, outreach, monitoring, follow-up — these aren't creative tasks. They're patterns. And patterns can be delegated to systems that don't sleep, don't forget, and don't need to be told twice.\n\nIn practice: a competitor monitoring agent that surfaces signals before your team would have noticed. An outreach pipeline that researches, personalizes, and follows up without a human in the middle. A market intelligence system where five specialized agents coordinate in real time and hand you conclusions, not raw data.\n\nNo human bottleneck. Just decisions, made and acted on."
  },
] as const;

type ServiceCard = (typeof services)[number];

/* ── ServicesSection
    Dark card grid with modal expansion.
    Locks body scroll when modal is open. ── */
function ServicesSection() {
  const [activeCard, setActiveCard] = useState<ServiceCard | null>(null);

  useEffect(() => {
    if (!activeCard) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveCard(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCard]);

  return (
    <section id="services" className="order-4 bg-[var(--bg)] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1180px] px-5 md:px-8">
        {/* ── Section heading ── */}
        <div className="mb-16 max-w-2xl text-left">
          <h2 className="font-[var(--font-display)] text-5xl font-normal italic leading-none text-[var(--ink)] md:text-6xl">
            what I build.
          </h2>

          <p className="mt-5 font-[var(--font-body)] text-base leading-relaxed text-[var(--ink-muted)]">
            The work I take on. The problems I solve.
          </p>
        </div>

        {/* ── Service cards grid ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <button
              type="button"
              key={service.index}
              onClick={() => setActiveCard(service)}
              className="service-card-dark flex h-full min-h-[280px] md:min-h-[340px] cursor-pointer flex-col rounded-2xl border border-white/10 bg-[var(--bg-dark)] p-7 md:p-10 text-left text-[#f4eee2] shadow-[0_28px_80px_rgba(15,14,12,0.18)] outline-none transition-all duration-300 ease-out group-hover:opacity-40 hover:!opacity-100 hover:-translate-y-2 hover:border-[rgba(196,145,90,0.35)] hover:shadow-[0_0_30px_rgba(196,145,90,0.15),0_34px_90px_rgba(15,14,12,0.24)] focus-visible:!opacity-100 focus-visible:-translate-y-2 focus-visible:ring-2 focus-visible:ring-[var(--accent-warm)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
              aria-label={`Open ${service.title}`}
            >
              <span className="font-mono text-sm font-medium tracking-[0.16em] text-[#C45C26]">
                {service.index}
              </span>
              <div className="mt-12 flex-1">
                <h3 className="mb-4 font-[var(--font-display)] text-3xl font-normal italic leading-tight service-card-title">
                  {service.title}
                </h3>
                <p className="font-[var(--font-body)] text-[0.96rem] leading-[1.65] service-card-body">
                  {service.body}
                </p>
                <p className="mt-3 font-[var(--font-body)] text-[0.8rem] italic leading-relaxed service-card-body opacity-60">
                  {service.subline}
                </p>
              </div>
              <div className="mt-6 flex justify-start">
                <span className="inline-flex w-fit items-center gap-1.5 text-[0.8rem] font-semibold tracking-[0.04em] text-white/50 no-underline transition-colors duration-200 group-hover:text-[var(--accent-warm)]">
                  Learn more →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Service detail modal ── */}
      <AnimatePresence>
        {activeCard ? (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              className="fixed inset-0 z-[150] cursor-default bg-black/40 backdrop-blur-md"
              aria-label="Close service details"
              onClick={() => setActiveCard(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            />
            {/* Modal */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              className="service-card-dark fixed inset-0 z-[150] m-auto flex h-fit max-h-[80vh] w-[calc(100vw_-_2rem)] max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e1c1a] p-8 text-left text-[#f4eee2] shadow-[0_0_70px_rgba(196,145,90,0.18),0_40px_120px_rgba(0,0,0,0.45)] md:p-10"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close button */}
              <button
                type="button"
                className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-warm)]"
                aria-label="Close service details"
                onClick={() => setActiveCard(null)}
              >
                <X size={18} />
              </button>

              <div className="mt-10 pr-8 flex-1 overflow-y-auto">
                <h3 id="service-modal-title" className="font-[var(--font-display)] text-4xl font-normal italic leading-none service-card-title md:text-5xl">
                  {activeCard.title}
                </h3>
                <p className="mt-8 mb-10 max-w-xl font-[var(--font-body)] text-lg leading-[1.65] service-card-body whitespace-pre-wrap">
                  {activeCard.expandedBody}
                </p>
              </div>
              <div className="mt-auto pt-6 border-t border-white/10 flex justify-center">
                <a 
                  href="https://wa.me/919392280525" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-warm)] px-6 py-3 font-semibold text-white transition-transform duration-200 hover:scale-[1.02]"
                >
                  Book a Call <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════════════════
   IFRAME PREVIEW
   Live iframe preview of projects inside a
   simulated browser chrome. Falls back to
   static ProjectPreview on error/timeout.
   ══════════════════════════════════════════════ */
function IframePreview({ project }: { project: (typeof featuredProjects)[number] }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const hasLiveIframe = true;

  useEffect(() => {
    if (!hasLiveIframe) return;
    const timer = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "error" : prev));
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasLiveIframe]);

  return (
    <div className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-[#1a1814] to-[#2d2922] shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col h-[200px] sm:h-[240px] md:h-auto md:aspect-[16/10]">
      {/* ── Browser chrome bar ── */}
      <div className="h-8 bg-[#2a2a2a] flex items-center px-3 gap-1.5 shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 h-[18px] bg-[#3a3a3a] rounded mx-2 flex items-center pl-2 text-[10px] text-[#888] font-mono">
          {project.address}
        </div>
      </div>
      {/* ── Content area: iframe or static preview ── */}
      <div className="flex-1 relative overflow-hidden">
        {hasLiveIframe && status !== "error" && (
          <iframe
            src={project.href}
            className="absolute top-0 left-0 w-[200%] h-[200%] border-none scale-50 origin-top-left pointer-events-none"
            loading="lazy"
            title={project.name}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
          />
        )}
        {(!hasLiveIframe || status === "error") && (
          <ProjectPreview type={project.preview} />
        )}
        {/* Clickable overlay to open project link */}
        <a href={project.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-[2] cursor-pointer" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PROJECT PREVIEW CARDS
   Static fallback previews for each project,
   styled to match the project's visual identity.
   ══════════════════════════════════════════════ */
function ProjectPreview({ type }: { type: (typeof featuredProjects)[number]["preview"] }) {
  /* ── D-Cloud preview — hash panel + chunk grid + recovery status ── */
  if (type === "dcloud") {
    return (
      <div className="absolute inset-0 overflow-hidden grid gap-6 p-7 bg-[radial-gradient(circle_at_78%_18%,rgba(196,145,90,0.22),transparent_32%),linear-gradient(135deg,#0a0f0d,#15100c_55%,#0a0a09)] grid-cols-[0.9fr_1.1fr] max-md:grid-cols-1">
        {/* Hash panel — hidden on mobile */}
        <div className="flex justify-center flex-col border border-[rgba(196,145,90,0.18)] rounded-[10px] bg-black/[0.18] p-[18px] max-md:hidden">
          <span className="text-[rgba(244,238,226,0.48)] font-mono text-[11px]">ed25519://node-alpha</span>
          <strong className="my-3.5 text-[#f4eee2] font-[family-name:var(--font-display)] text-[34px] italic font-normal leading-none">AES-256-GCM</strong>
          <code className="text-[rgba(244,238,226,0.48)] font-mono text-[11px]">sha256: 8f4c 91da e2b7 40aa</code>
        </div>
        {/* Chunk grid — animated glowing blocks */}
        <div className="grid content-center grid-cols-5 gap-2.5">
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              key={i}
              className="aspect-square border border-[rgba(196,145,90,0.2)] rounded-md bg-[rgba(196,145,90,0.13)] animate-[chunkGlow_2.2s_ease-in-out_infinite]"
              style={{ "--delay": `${i * 0.08}s`, animationDelay: `${i * 0.08}s` } as CSSVars}
            />
          ))}
        </div>
        {/* Recovery status line */}
        <div className="absolute right-7 bottom-[22px] left-7 flex items-center gap-3">
          <span className="w-[9px] h-[9px] rounded-full bg-[#22c55e]" />
          <p className="text-[rgba(244,238,226,0.56)] text-[12px] tracking-[0.08em] uppercase">3-of-5 recovery stable</p>
        </div>
      </div>
    );
  }

  /* ── Blinky preview — bookmark list + card ── */
  if (type === "blinky") {
    return (
      <div className="absolute inset-0 overflow-hidden grid items-center bg-[radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.18),transparent_28%),linear-gradient(135deg,#11130f,#19120d)] grid-cols-[0.8fr_1.2fr] gap-4 p-5 max-md:grid-cols-1">
        {/* Placeholder bookmark rows */}
        <div className="flex flex-col gap-3">
          <span className="h-[42px] border border-[rgba(244,238,226,0.08)] rounded-lg bg-white/[0.04]" />
          <span className="h-[42px] border border-[rgba(244,238,226,0.08)] rounded-lg bg-white/[0.04]" />
          <span className="h-[42px] border border-[rgba(244,238,226,0.08)] rounded-lg bg-white/[0.04]" />
        </div>
        {/* Featured bookmark card */}
        <div className="border border-[rgba(196,145,90,0.22)] rounded-xl bg-[rgba(196,145,90,0.12)] p-[22px]">
          <strong className="font-[family-name:var(--font-display)] text-[42px] italic font-normal">Blinky</strong>
          <p className="text-[rgba(244,238,226,0.56)] text-[12px]">save less, find faster</p>
        </div>
      </div>
    );
  }

  /* ── Vigil preview — sidebar + signal row + agent grid + chart ── */
  return (
    <div className="absolute inset-0 overflow-hidden grid bg-[linear-gradient(135deg,#0c0f16,#15100f)] grid-cols-[74px_1fr] max-md:grid-cols-1">
      {/* Sidebar navigation */}
      <div className="flex flex-col gap-3.5 border-r border-[rgba(244,238,226,0.08)] bg-white/[0.03] p-[22px]">
        <span className="w-[30px] h-[30px] rounded-lg bg-[rgba(196,145,90,0.14)]" />
        <span className="w-[30px] h-[30px] rounded-lg bg-[rgba(196,145,90,0.14)]" />
        <span className="w-[30px] h-[30px] rounded-lg bg-[rgba(196,145,90,0.14)]" />
      </div>
      {/* Main content area */}
      <div className="flex flex-col p-[26px] gap-5">
        {/* Signal row — confidence score */}
        <div className="flex items-center justify-between border border-[rgba(244,238,226,0.09)] rounded-[10px] bg-white/[0.035] p-[14px_16px] max-md:flex-col max-md:items-start max-md:gap-1.5">
          <strong className="font-[family-name:var(--font-display)] text-[28px] italic font-normal">Market Signal</strong>
          <span className="text-[#86efac] font-mono text-[11px]">confidence 0.91</span>
        </div>
        {/* Agent grid — 5 AI agents with glow animation */}
        <div className="grid grid-cols-5 gap-2.5 max-md:grid-cols-2">
          {["Scout", "Analyst", "Strategist", "Risk", "Writer"].map((agent, index) => (
            <div
              key={agent}
              className="flex flex-col min-h-[90px] max-md:min-h-[58px] justify-between border border-[rgba(244,238,226,0.09)] rounded-[10px] bg-white/[0.035] text-[rgba(244,238,226,0.72)] text-[11px] p-3 animate-[agentGlow_2.6s_ease-in-out_infinite]"
              style={{ "--delay": `${index * 0.12}s`, animationDelay: `${index * 0.12}s` } as CSSVars}
            >
              <span className="w-[22px] h-[22px] rounded-full bg-[#c4915a]" />
              {agent}
            </div>
          ))}
        </div>
        {/* Chart bars */}
        <div className="flex h-[90px] items-end gap-3 pt-2">
          <i className="block flex-1 rounded-t-[10px] bg-gradient-to-b from-[rgba(56,189,248,0.8)] to-[rgba(196,145,90,0.18)]" style={{ height: "48%" }} />
          <i className="block flex-1 rounded-t-[10px] bg-gradient-to-b from-[rgba(56,189,248,0.8)] to-[rgba(196,145,90,0.18)]" style={{ height: "82%" }} />
          <i className="block flex-1 rounded-t-[10px] bg-gradient-to-b from-[rgba(56,189,248,0.8)] to-[rgba(196,145,90,0.18)]" style={{ height: "62%" }} />
        </div>
      </div>
    </div>
  );
}

/* ── LiveBadge
    Green pulsing "LIVE" indicator for deployed projects ── */
function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-[0.4rem] border border-[rgba(34,197,94,0.25)] rounded-full bg-[rgba(34,197,94,0.1)] text-[#16a34a] px-[0.65rem] py-[0.2rem] text-[0.68rem] font-semibold tracking-[0.06em] uppercase dark:bg-[rgba(34,197,94,0.1)] dark:border-[rgba(34,197,94,0.2)] dark:text-[#86efac]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-[pulseDot_2s_ease-in-out_infinite]" />
      LIVE
    </span>
  );
}

/* ── DownloadBadge
    Amber "DOWNLOAD" indicator for downloadable projects ── */
function DownloadBadge() {
  return (
    <span className="inline-flex items-center gap-[0.4rem] border border-[rgba(245,158,11,0.25)] rounded-full bg-[rgba(245,158,11,0.1)] text-[#d97706] px-[0.65rem] py-[0.2rem] text-[0.68rem] font-semibold tracking-[0.06em] uppercase dark:bg-[rgba(245,158,11,0.1)] dark:border-[rgba(245,158,11,0.2)] dark:text-[#fbbf24]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
      DOWNLOAD
    </span>
  );
}

/* ── FeaturedProject
    Alternating image/text grid row for each project.
    Reverses column order on odd indices. ── */
function FeaturedProject({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <article
      className={`
        grid gap-0 border-t border-[var(--border)] min-h-[340px] bg-transparent
        transition-colors duration-300 hover:bg-[rgba(28,26,23,0.02)]
        last:border-b last:border-[var(--border)]
        dark:border-[var(--border)] dark:hover:bg-[rgba(240,235,227,0.02)]
        max-[900px]:grid-cols-1 max-[900px]:min-h-0
        ${reversed ? "grid-cols-[45%_55%]" : "grid-cols-[55%_45%]"}
      `}
    >
      {/* Project preview image */}
      <div className={`flex items-center justify-center p-8 max-md:p-[1.25rem_1.25rem_0] ${reversed ? "max-[900px]:order-1 order-2" : "max-[900px]:order-1"}`}>
        <IframePreview project={project} />
      </div>
      {/* Project description text */}
      <div className={`flex flex-col justify-center p-[2.5rem_3rem] gap-5 max-md:p-[1.5rem_1.25rem_2rem] max-md:gap-[0.85rem] ${reversed ? "max-[900px]:order-2 order-1" : "max-[900px]:order-2"}`}>
        <div>
          {project.name === "D-Cloud" ? <DownloadBadge /> : <LiveBadge />}
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] italic font-normal text-[var(--ink)] tracking-[-0.02em] leading-none m-0 max-md:text-[clamp(1.7rem,7vw,2.4rem)] dark:text-[var(--ink)]">
          {project.name}
        </h3>
        <p className="max-w-[360px] text-[var(--ink-muted)] text-[0.95rem] leading-[1.65] m-0 max-md:text-[0.88rem] max-md:max-w-full dark:text-[var(--ink-muted)]">
          {project.description}
        </p>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 text-[var(--ink)] text-[0.8rem] font-semibold tracking-[0.04em] mt-2 border-none p-0 dark:text-[var(--ink)]"
        >
          View project <ArrowRight size={14} strokeWidth={1.5} />
        </a>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════
   RESEARCH DATA & SECTION
   Flip-card research entries with front/back faces.
   ══════════════════════════════════════════════ */

const researchEntries = [
  {
    domain: "ARTIFICIAL IMMUNE SYSTEMS",
    title: "SentinelMesh",
    frontBody:
      "A security system that detects network attacks the way your immune system detects disease — no central authority, 20 nodes, self-organising threat response.",
    tags: [], // Tags removed per instructions
    theoryBasis: "Negative Selection",
    backBody:
      "Detectors trained on self-traffic reject anomalies. Gossip-based consensus propagates threat signals across all 20 nodes. No central authority — the mesh decides.",
    result: "Modelled on NSA-class threat detection. 20-node mesh. No central authority.",
    githubUrl: "https://github.com/neswanths/sentinel-mesh",
  },
  {
    domain: "ACTIVE RESEARCH THREADS",
    title: "What's Next",
    frontBody: "1. Agent learning in non-stationary environments: how agents adapt when everything around them, including other agents, is also adapting.\n\n2. Computer vision: grounding abstract reasoning in perception and spatial understanding.",
    tags: [],
    theoryBasis: "Current Focus",
    backBody: "Training and optimization: the machinery behind how large models learn efficiently — scaling, convergence, what actually matters.",
    result: "These are signal areas, not products.",
    githubUrl: null, // No CTA for this card
  }
];

/* ── ResearchCard
    3D flip card with front (overview) and back (theory) faces.
    Uses CSS flip mechanics from globals.css. ── */
function ResearchCard({
  entry,
}: {
  entry: (typeof researchEntries)[number];
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="flip-wrapper-research h-full min-h-[300px] sm:min-h-[320px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-research h-full ${isFlipped ? "is-flipped" : ""}`}>
        {/* ── Front face ── */}
        <div
          className="flip-face-research flex flex-col rounded-xl bg-[#ffffff] p-6 dark:bg-[#1b1916]"
        >
          {/* Domain label — small-caps muted */}
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            {entry.domain}
          </span>

          {/* Title — large serif italic */}
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-normal italic leading-tight text-[var(--ink)]">
            {entry.title}
          </h3>

          {/* Body */}
          <p className="mt-3 flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--ink-muted)] whitespace-pre-wrap">
            {entry.frontBody}
          </p>

          {/* Result or tags area */}
          <div className="mt-auto pt-4">
            {entry.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="research-tag rounded-md border border-black/8 bg-[#f5f3ef] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)] dark:bg-[rgba(232,227,220,0.04)] dark:border-[rgba(232,227,220,0.1)] dark:text-[var(--ink-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : entry.title === "SentinelMesh" ? (
               <span className="block text-[10px] font-medium leading-relaxed text-[var(--ink-muted)] opacity-80">
                 Modelled on NSA-class threat detection. 20-node mesh. No central authority.
               </span>
            ) : null}
          </div>
        </div>

        {/* ── Back face ── */}
        <div
          className="flip-face-research flip-back-research flex flex-col rounded-xl bg-[#faf9f7] p-6 dark:bg-[#171512]"
        >
          {/* Theory basis label */}
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            Theory basis
          </span>

          {/* Framework name — serif italic */}
          <h4 className="mt-2 font-[family-name:var(--font-display)] text-xl font-normal italic text-[var(--ink)]">
            {entry.theoryBasis}
          </h4>

          {/* Mechanism body */}
          <p className="mt-3 flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--ink-muted)]">
            {entry.backBody}
          </p>

          {/* Result */}
          <span className="mt-auto text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            Result
          </span>
          <p className="mt-1 font-[family-name:var(--font-body)] text-sm text-[var(--ink)]">
            {entry.result}
          </p>

          {/* GitHub link — only show if url exists */}
          {entry.githubUrl && (
            <a
              href={entry.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-fit items-center gap-1.5 text-[0.8rem] font-semibold tracking-[0.04em] text-[var(--ink)] no-underline transition-colors duration-200 hover:text-[var(--accent-warm)]"
            >
              View →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   RESEARCH SECTION
   Grid of flip-card research entries.
   ══════════════════════════════════════════════ */
function ResearchSection() {
  return (
    <section id="research" className="order-3 bg-[var(--bg)] min-h-screen pt-16 pb-16 md:pt-24 md:pb-24 lg:pt-32 lg:pb-32">
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
        {/* Heading block — mirrors the Projects heading */}
        <div className="pb-12">
          <h2 className="font-[family-name:var(--font-display)] text-5xl font-normal italic leading-none text-[var(--ink)] md:text-6xl">
            Research
          </h2>

          {/* Thin divider */}
          <hr className="mt-8 border-0 border-t border-[var(--border)]" />
        </div>

        {/* Card grid: 3 → 2 → 1 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchEntries.map((entry, i) => (
            <ResearchCard key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SunIcon — light mode indicator ── */
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/* ── MoonIcon — dark mode indicator ── */
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   BACK TO TOP BUTTON
   Floating button that appears after scrolling.
   Smoothly scrolls to top on click.
   ══════════════════════════════════════════════ */
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group absolute bottom-16 right-5 md:bottom-24 md:right-10 w-11 h-11 rounded-full bg-[var(--cream-soft)] border border-[var(--border)] text-[var(--ink)] flex items-center justify-center cursor-pointer z-[99] shadow-[0_4px_16px_rgba(28,26,23,0.05)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[var(--accent-warm)] hover:text-white hover:border-[var(--accent-warm)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(196,92,38,0.18)]"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
          {/* Tooltip with caret — appears on hover via group-hover */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 translate-x-1.5 bg-[var(--ink)] text-[var(--bg)] px-3 py-1.5 rounded-lg font-[family-name:var(--font-body)] text-[11px] font-medium tracking-[0.03em] whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[var(--border)] group-hover:opacity-100 group-hover:translate-x-0 after:content-[''] after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-[5px] after:border-solid after:border-transparent after:border-l-[var(--ink)]">
            back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
   Root layout containing nav, hero, all sections,
   and footer. Manages theme, scroll state, and
   hero mode transitions.
   ══════════════════════════════════════════════ */
export default function Portfolio() {
  const [pastHero, setPastHero] = useState(false);
  const [heroMode, setHeroMode] = useState<"chaos" | "cleaned" | "minimal">("minimal");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const applyTheme = (isDark: boolean) => {
        setTheme(isDark ? "dark" : "light");
        if (isDark) document.documentElement.setAttribute("data-theme", "dark");
        else document.documentElement.removeAttribute("data-theme");
      };

      if (savedTheme === "dark" || savedTheme === "light") {
        applyTheme(savedTheme === "dark");
      } else {
        applyTheme(mediaQuery.matches);
      }

      const listener = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem("theme")) {
          applyTheme(e.matches);
        }
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } catch (e) {}
  }, []);

  // Word animation trigger — adds processed class to enable opacity transition
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector('.hero-headline')?.classList.add('word-animation-processed');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  /* ── Theme toggle handler ── */
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try { localStorage.setItem("theme", next); } catch(e) {}
  };

  /* ── Scroll-based nav state — dark nav after hero ── */
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.86);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Force minimal mode on mobile ── */
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const enforceMobileMinimal = () => {
      if (mobileQuery.matches) {
        setHeroMode("minimal");
      }
    };

    enforceMobileMinimal();
    mobileQuery.addEventListener("change", enforceMobileMinimal);
    return () => mobileQuery.removeEventListener("change", enforceMobileMinimal);
  }, []);

  /* ── Compute cleaned-mode style overrides for hero objects ── */
  const getCleanedObjectStyle = (
    originalStyle: Record<string, string>,
    classNames: string
  ): CSSVars => {
    if (heroMode !== "cleaned") return originalStyle as CSSVars;

    // Find matching cleaned position key from classNames
    for (const key of Object.keys(CLEANED_POSITIONS)) {
      if (classNames.includes(key)) {
        const pos = CLEANED_POSITIONS[key];
        // Remove right/bottom from original, apply cleaned position
        const cleaned: Record<string, string | number> = {
          "--base-w": originalStyle["--base-w"],
          "--rot": originalStyle["--rot"],
          ...pos,
        };
        return cleaned as CSSVars;
      }
    }

    // No match found — just pass through
    return originalStyle as CSSVars;
  };

  const navDarkClasses = pastHero
    ? theme === "dark"
      ? "border-[var(--border)] bg-[rgba(20,18,16,0.55)] text-[var(--ink)] backdrop-blur-lg"
      : "border-[var(--border)] bg-[rgba(247,244,239,0.65)] text-[var(--ink)] backdrop-blur-lg"
    : "border-transparent bg-transparent";

  return (
    <>
      {/* ══════════════════════════════════════════════
          NAVIGATION BAR
          Fixed top nav with logo, links, theme toggle,
          and mobile hamburger menu.
          ══════════════════════════════════════════════ */}
      <nav
        className={`
          fixed top-0 inset-x-0 z-[500] flex items-center justify-between
          px-[2.5rem] py-[1.2rem] border-b
          text-[var(--ink)] transition-all duration-[450ms]
          max-md:px-[1.25rem] max-md:py-[0.9rem]
          ${navDarkClasses}
        `}
      >
        {/* Logo */}
        <a
          className="font-[family-name:var(--font-display)] text-[1.05rem] italic tracking-[-0.01em]"
          href="#top"
        >
          Neswanth
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {["work", "services", "about", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="text-current text-[0.78rem] font-[550] tracking-[0.06em] uppercase opacity-[0.72] transition-opacity duration-200 hover:opacity-100"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>

          {/* Theme toggle button */}
          <button
            className="bg-transparent border-none cursor-pointer text-current opacity-[0.72] p-1 flex items-center justify-center transition-all duration-200 hover:opacity-100 hover:scale-110 [&_svg]:w-[18px] [&_svg]:h-[18px]"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            type="button"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Mobile hamburger */}
          <button
            className="block md:hidden p-2 text-[var(--ink)]"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[600] bg-[var(--bg)] p-6 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-[family-name:var(--font-display)] text-2xl italic font-normal text-[var(--ink)]">Neswanth</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[var(--ink)]"
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-xl font-medium text-[var(--ink)] uppercase tracking-wider">
              <a href="#work" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
            <div className="mt-auto pb-8">
              <button
                className="bg-transparent border-none cursor-pointer text-current opacity-[0.72] p-1 flex items-center justify-center transition-all duration-200 hover:opacity-100 hover:scale-110 [&_svg]:w-[18px] [&_svg]:h-[18px] gap-3 text-sm font-medium text-[var(--ink)] uppercase tracking-wider"
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
              >
                {theme === "light" ? (
                  <>
                    <MoonIcon /> Dark Mode
                  </>
                ) : (
                  <>
                    <SunIcon /> Light Mode
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          MAIN CONTENT
          All sections rendered in flex column with
          Tailwind order classes for visual ordering.
          ══════════════════════════════════════════════ */}
      <main className="flex flex-col overflow-x-hidden">

        {/* ══════════════════════════════════════════════
            HERO SECTION
            Three modes: chaos (objects everywhere),
            cleaned (objects organized left), and
            minimal (two-column headline + avatar).
            ══════════════════════════════════════════════ */}
        <section
          id="top"
          className={`
            relative overflow-hidden bg-[var(--bg)] transition-colors duration-300
            ${heroMode === "minimal"
              ? "min-[900px]:h-screen min-[900px]:min-h-[720px] min-[900px]:flex min-[900px]:flex-row min-[900px]:items-stretch max-[899px]:min-h-screen max-[899px]:flex max-[899px]:flex-col"
              : "h-screen min-h-[720px]"
            }
            max-md:min-h-[680px]
          `}
        >
          {/* ── Hero floating objects layer ── */}
          <div className={`
            absolute inset-0 z-[6] max-md:hidden
            ${heroMode === "minimal" ? "opacity-0 pointer-events-none" : ""}
          `}>
            {heroObjects.map((object) => {
              const isCleaned = heroMode === "cleaned";
              const objStyle = isCleaned
                ? getCleanedObjectStyle(object.style as unknown as Record<string, string>, object.className)
                : (object.style as CSSVars);

              return (
                <div
                  className={`obj-container hero-obj ${object.className} ${isCleaned ? "opacity-95" : ""}`}
                  key={object.src}
                  style={isCleaned ? {
                    ...objStyle,
                    width: `calc(var(--base-w) * 0.68)`,
                  } : objStyle}
                >
                  <Image
                    src={object.src}
                    alt={object.alt}
                    width={240}
                    height={240}
                    loading="lazy"
                    sizes="(max-width: 768px) 96px, 160px"
                    className="w-full h-auto pointer-events-none"
                  />
                </div>
              );
            })}

            {/* ── Terminal chip — code snippet floating object ── */}
            <div
              className="obj-container hero-obj terminal-chip float-3 hero-obj-tablet-hide border border-white/[0.09] rounded-lg font-mono p-[12px_14px] bg-[#1a1814] text-[#c4a882] shadow-[0_8px_24px_rgba(0,0,0,0.2)] dark:bg-[#141210] dark:border-[rgba(232,227,220,0.08)] dark:text-[#c4a882]"
              style={heroMode === "cleaned"
                ? { ...CLEANED_SPECIAL["terminal-chip"], "--base-w": "clamp(142px, 10vw, 182px)", "--rot": "2deg", width: `calc(var(--base-w) * 0.68)`, transform: `rotate(var(--rot)) scale(var(--tab-scl))` } as CSSVars
                : { top: "47%", right: "18vw", "--base-w": "clamp(142px, 10vw, 182px)", "--rot": "2deg", transform: `rotate(var(--rot)) scale(var(--tab-scl))` } as CSSVars
              }
            >
              <div className="flex items-center gap-[7px] mb-2 text-[rgba(244,238,226,0.46)] text-[11px] tracking-[0.04em]">
                <Terminal size={14} />
                agent-lab
              </div>
              <code className="text-[#f4eee2] text-[12px]">
                &gt; training agent<span className="cursor" />
              </code>
            </div>

            {/* ── Luffy card — sticker with thought bubble ── */}
            <div
              className="obj-container hero-obj luffy-card float-2 hero-obj-tablet-hide"
              style={heroMode === "cleaned"
                ? { ...CLEANED_SPECIAL["luffy-card"], "--base-w": "clamp(58px, 4.5vw, 78px)", "--rot": "-3deg", width: `calc(var(--base-w) * 0.68)`, transform: `rotate(var(--rot)) scale(var(--tab-scl))` } as CSSVars
                : { top: "43%", left: "13vw", "--base-w": "clamp(58px, 4.5vw, 78px)", "--rot": "-3deg", transform: `rotate(var(--rot)) scale(var(--tab-scl))` } as CSSVars
              }
            >
              {/* Thought bubble with ::after tail via Tailwind */}
              <div className="absolute -top-[34px] left-1/2 z-[2] -translate-x-1/2 rotate-[2deg] whitespace-nowrap border border-[rgba(26,24,20,0.12)] rounded-2xl bg-white/[0.84] text-[#1a1814] px-2.5 py-1.5 font-[family-name:var(--font-display)] text-lg italic leading-none shadow-[0_8px_22px_rgba(0,0,0,0.12)] backdrop-blur-[10px] dark:bg-[rgba(36,32,24,0.92)] dark:border-[rgba(240,235,227,0.08)] dark:text-[var(--ink)] after:content-[''] after:absolute after:right-[22px] after:-bottom-1.5 after:w-3 after:h-3 after:border-r after:border-b after:border-[rgba(26,24,20,0.12)] after:bg-white/[0.84] after:rotate-45">
                Let&apos;s ship
              </div>
              <Image
                src="/objects/luffy-sticker.png"
                alt="Luffy sticker"
                width={220}
                height={220}
                loading="lazy"
                sizes="120px"
                className="w-full h-auto"
              />
            </div>

            {/* ── Award chip — latest hackathon win ── */}
            <div
              className="obj-container hero-obj award-chip latest-win float-2 hero-obj-tablet-show border border-white/[0.09] rounded-lg font-[family-name:var(--font-body)] p-[13px_15px] bg-white/[0.84] text-[var(--ink)] backdrop-blur-[14px] dark:bg-[rgba(31,29,25,0.92)] dark:border-[rgba(232,227,220,0.08)] dark:text-[var(--ink)]"
              style={heroMode === "cleaned"
                ? { ...CLEANED_SPECIAL["latest-win"], "--base-w": "clamp(204px, 15vw, 258px)", "--rot": "-2deg", width: `calc(var(--base-w) * 0.68)`, transform: `rotate(var(--rot)) scale(var(--tab-scl))` } as CSSVars
                : { bottom: "3%", left: "23vw", "--base-w": "clamp(204px, 15vw, 258px)", "--rot": "-2deg", transform: `rotate(var(--rot)) scale(var(--tab-scl))` } as CSSVars
              }
            >
              <div className="flex items-center gap-[7px]">
                <Award size={18} />
                <span className="text-[rgba(26,24,20,0.52)] text-[11px] font-bold tracking-[0.08em] uppercase dark:text-[var(--ink-muted)]">Latest Win</span>
              </div>
              <strong className="block mt-[5px] text-[13px] leading-[1.35]">{latestWin}</strong>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              HERO LEFT COLUMN (minimal mode only)
              Contains headline, CTAs. Hidden in chaos/cleaned.
              Two-column on desktop ≥900px, stacked on mobile.
              ══════════════════════════════════════════════ */}
          {heroMode === "minimal" && (
            <div className="
              hidden min-[900px]:flex
              absolute top-0 left-0 w-[58%] h-full flex-col justify-center items-start z-20 pointer-events-auto
              max-[899px]:flex max-[899px]:relative max-[899px]:w-full max-[899px]:h-auto max-[899px]:flex-col max-[899px]:justify-center max-[899px]:items-center max-[899px]:text-center max-[899px]:px-6 max-[899px]:py-12 max-[899px]:min-h-screen
              min-[769px]:max-[899px]:px-12 min-[769px]:max-[899px]:pt-[120px] min-[769px]:max-[899px]:pb-8
              max-md:px-6 max-md:py-12
              min-[900px]:pl-[clamp(48px,5.5vw,96px)]
            ">
              <div className="flex flex-col items-start max-[899px]:items-center max-[899px]:text-center">
                {/* ── Hero headline with word-by-word animation ── */}
                <h1 className="hero-headline font-['Inter',system-ui,sans-serif] font-black leading-[0.95] tracking-[-0.02em] text-[var(--ink)] m-0 not-italic text-[clamp(42px,5vw,80px)] max-md:text-[clamp(32px,9.5vw,48px)] max-md:text-center min-[769px]:max-[899px]:text-center min-[769px]:max-[899px]:text-[clamp(42px,7vw,64px)]">
                  {/* Screen reader accessible full text */}
                  <span className="sr-only">AI freelance and research where depth and delivery aren&apos;t a tradeoff.</span>
                  <span className="animate-word" style={{ transitionDelay: '310ms' }}>AI</span>
                  <span className="animate-space"> </span>
                  <a href="#services" className="animate-word-link">
                    <span className="animate-word border-b-4 border-[#C45C26] pb-1 transition-colors duration-200 hover:border-white" style={{ transitionDelay: '137ms' }}>freelance</span>
                  </a>
                  <span className="animate-space"> </span><br />
                  <span className="animate-word" style={{ transitionDelay: '180.182ms' }}>and</span>
                  <span className="animate-space"> </span>
                  <a href="#research" className="animate-word-link">
                    <span className="animate-word border-b-4 border-[#C45C26] pb-1 transition-colors duration-200 hover:border-white" style={{ transitionDelay: '218.009ms' }}>research</span>
                  </a>
                  <span className="animate-space"> </span><br />
                  <span className="animate-word" style={{ transitionDelay: '265ms' }}>where</span>
                  <span className="animate-space"> </span>
                  <span className="animate-word" style={{ transitionDelay: '219ms' }}>depth</span>
                  <span className="animate-space"> </span>
                  <span className="animate-word" style={{ transitionDelay: '100ms' }}>and</span>
                  <span className="animate-space"> </span>
                  <span className="animate-word" style={{ transitionDelay: '412ms' }}>delivery</span>
                  <span className="animate-space"> </span><br />
                  <span className="animate-word" style={{ transitionDelay: '147ms' }}>aren&apos;t</span>
                  <span className="animate-space"> </span>
                  <span className="animate-word" style={{ transitionDelay: '430ms' }}>a tradeoff.</span>
                </h1>

                {/* ── CTA buttons ── */}
                <div className="flex items-center gap-4 mt-12 max-md:mt-10 max-md:flex-col max-md:w-full max-md:items-center max-md:gap-3.5 min-[769px]:max-[899px]:flex-row min-[769px]:max-[899px]:w-auto">
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-3 rounded-xl font-semibold text-[0.9rem] leading-[1.1] bg-[#C45C26] text-[#F5F0E8] border-none cursor-pointer no-underline font-[family-name:var(--font-body)] transition-all duration-200 hover:opacity-90 hover:-translate-y-px max-md:w-full max-md:max-w-[260px] max-md:min-h-[48px] max-md:text-[0.9rem] min-[769px]:max-[899px]:w-auto"
                  >
                    See My Work →
                  </a>
                  <a
                    href="mailto:neswanths@gmail.com"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-8 py-3 rounded-xl font-semibold text-[0.9rem] leading-[1.1] bg-transparent text-[var(--ink)] border-[1.5px] border-[var(--ink)] cursor-pointer no-underline font-[family-name:var(--font-body)] max-md:w-full max-md:max-w-[260px] max-md:min-h-[48px] max-md:text-[0.9rem] min-[769px]:max-[899px]:w-auto"
                  >
                    Book a Call
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              HERO RIGHT COLUMN
              Contains avatar, name, role, tagline.
              Full-width absolute in chaos/cleaned modes,
              42% width on right in minimal desktop mode.
              ══════════════════════════════════════════════ */}
          <div className={`
            ${heroMode === "minimal"
              ? "relative min-[900px]:w-[42%] min-[900px]:h-full min-[900px]:flex min-[900px]:flex-col min-[900px]:justify-start min-[900px]:items-start min-[900px]:ml-auto min-[900px]:pt-[clamp(72px,9vh,120px)] min-[900px]:pr-[clamp(32px,4vw,64px)] min-[900px]:z-20 max-[899px]:relative max-[899px]:w-full max-[899px]:h-auto max-[899px]:flex max-[899px]:flex-col max-[899px]:items-center max-[899px]:px-6 max-[899px]:pb-16 max-[899px]:pt-8 min-[769px]:max-[899px]:px-12 min-[769px]:max-[899px]:pb-20"
              : "absolute inset-0"
            }
          `}>
            {/* ── Hero center content block ── */}
            <div className={`
              ${heroMode === "minimal"
                ? "relative w-full max-w-none pointer-events-auto"
                : heroMode === "cleaned"
                  ? "absolute top-[44.5%] left-[65%] -translate-x-1/2 -translate-y-1/2 w-[min(66vw,840px)] z-[18] pointer-events-none"
                  : "absolute top-[44.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,760px)] z-[18] pointer-events-none"
              }
            `}>
              <motion.div
                className={`
                  flex flex-col items-center gap-0 text-center
                  ${heroMode === "minimal"
                    ? "transform-none items-center text-left w-full"
                    : heroMode === "cleaned"
                      ? "scale-105 origin-center"
                      : ""
                  }
                `}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* ── Hero title ── */}
                <h1 className={`
                  mb-4 text-[var(--ink)] font-[family-name:var(--font-display)] italic font-normal tracking-[-0.03em] leading-[0.96] whitespace-nowrap transition-colors duration-300
                  ${heroMode === "minimal"
                    ? "text-[clamp(48px,5.5vw,80px)] max-md:text-[clamp(38px,11vw,58px)]"
                    : "text-[clamp(58px,7.8vw,104px)] max-md:text-[clamp(54px,17vw,84px)]"
                  }
                `}>
                  Neswanth
                </h1>

                {/* ── Role subtitle ── */}
                <p className={`
                  text-[var(--ink-muted)] text-[12px] font-semibold tracking-[0.16em]
                  max-md:text-[10px] max-md:tracking-[0.12em]
                  ${heroMode === "minimal"
                    ? "mb-[80px] max-md:mb-7"
                    : "mb-[58px]"
                  }
                `}>
                  AI BUILDER &amp; RESEARCHER
                </p>

                {/* ── Avatar with animated rings ── */}
                <div
                  className={`
                    relative grid place-items-center mx-auto mt-0.5
                    after:content-[''] after:absolute after:border after:border-[rgba(51,51,51,0.1)] after:rounded-full
                    dark:after:border-[rgba(240,235,227,0.06)]
                    ${heroMode === "minimal"
                      ? "w-[260px] h-[260px] after:w-[245px] after:h-[245px] max-md:w-[200px] max-md:h-[200px] max-md:after:w-[220px] max-md:after:h-[220px]"
                      : "w-[240px] h-[240px] after:w-[272px] after:h-[272px] max-lg:w-[220px] max-lg:h-[220px] max-lg:after:w-[245px] max-lg:after:h-[245px] max-md:w-[220px] max-md:h-[220px] max-md:after:w-[245px] max-md:after:h-[245px]"
                    }
                  `}
                  aria-label="Neswanth avatar"
                >
                  {/* Ping ring */}
                  <span className={`
                    absolute rounded-full pointer-events-none border border-[rgba(51,51,51,0.22)] animate-[avatarPing_2.6s_cubic-bezier(0,0,0.2,1)_infinite]
                    dark:border-[rgba(240,235,227,0.12)]
                    ${heroMode === "minimal"
                      ? "w-[218px] h-[218px] max-md:w-[175px] max-md:h-[175px]"
                      : "w-[210px] h-[210px] max-lg:w-[190px] max-lg:h-[190px] max-md:w-[184px] max-md:h-[184px]"
                    }
                  `} />
                  {/* Pulse ring */}
                  <span className={`
                    absolute rounded-full pointer-events-none border border-[rgba(0,106,148,0.18)] animate-[avatarPulse_3.2s_ease-in-out_infinite]
                    dark:border-[rgba(196,145,90,0.15)]
                    ${heroMode === "minimal"
                      ? "w-[278px] h-[278px] max-md:w-[220px] max-md:h-[220px]"
                      : "w-[270px] h-[270px] max-lg:w-[242px] max-lg:h-[242px] max-md:w-[242px] max-md:h-[242px]"
                    }
                  `} />
                  {/* Avatar image */}
                  <Image
                    src="/objects/avatar.png"
                    alt="Neswanth cartoon avatar"
                    width={190}
                    height={190}
                    priority
                    className={`
                      relative z-[2] border-4 border-white/75 rounded-full object-cover object-center shadow-[0_24px_60px_rgba(28,26,23,0.18)]
                      dark:border-[rgba(240,235,227,0.1)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)]
                      ${heroMode === "minimal"
                        ? "w-[196px] h-[196px] max-md:w-[156px] max-md:h-[156px]"
                        : "w-[190px] h-[190px] max-lg:w-[170px] max-lg:h-[170px] max-md:w-[160px] max-md:h-[160px]"
                      }
                    `}
                    sizes="190px"
                  />
                </div>

                {/* ── Tagline — different content per mode ── */}
                {heroMode === "minimal" ? (
                  <p className="mt-[72px] font-[family-name:var(--font-body)] text-[0.75rem] not-italic font-semibold tracking-[0.12em] uppercase text-[rgba(90,75,60,0.6)] leading-[1.4] dark:text-[rgba(210,195,175,0.5)] max-md:mt-5 max-md:text-[0.68rem]">
                    — Ships at 2AM. Lifts at 6PM.
                  </p>
                ) : (
                  <p className="max-w-[520px] mt-[58px] text-[var(--ink)] font-[family-name:var(--font-display)] text-[clamp(19px,2vw,26px)] italic leading-[1.14] max-md:max-w-[340px] max-md:text-[20px]">
                    <span className="block">Chasing things that matter. </span>
                    <span className="block">Building things that last.</span>
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              HERO MODE CONTROLS
              Bottom-right buttons to switch between chaos,
              cleaned, and minimal hero layouts.
              Hidden on mobile.
              ══════════════════════════════════════════════ */}
          <div className="absolute bottom-4 z-30 flex flex-col items-end gap-2 right-[clamp(20px,2.5vw,40px)] max-md:hidden">
            <div className="inline-flex gap-[5px]">
              {/* Chaos mode button */}
              <button
                className={`
                  group grid w-9 h-9 cursor-pointer border border-black/[0.07] rounded-[9px]
                  bg-white/60 text-[var(--ink)] place-items-center backdrop-blur-[8px]
                  transition-all duration-[250ms] hover:-translate-y-0.5
                  dark:bg-[#242018] dark:border-[rgba(240,235,227,0.08)] dark:text-[var(--ink)] dark:hover:bg-[#2e2820]
                  max-md:w-8 max-md:h-8
                  ${heroMode === "chaos" ? "bg-[rgba(26,24,20,0.13)] dark:bg-[#2e2820] dark:border-[rgba(240,235,227,0.14)]" : ""}
                `}
                aria-label="Chaos mode"
                onClick={() => {
                  setHeroMode("chaos");
                  if (theme === "dark") {
                    setTheme("light");
                    document.documentElement.removeAttribute("data-theme");
                    try { localStorage.removeItem("theme"); } catch(e) {}
                  }
                }}
              >
                <Network size={16} />
                <span className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[var(--ink)] text-[var(--bg)] text-[10px] font-semibold tracking-[0.08em] uppercase rounded-md whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1/2 group-hover:-translate-y-0.5 dark:bg-[#f0ebe3] dark:text-[#0f0d0a]">
                  chaos mode
                </span>
              </button>

              {/* Cleaned mode button — hidden on mobile */}
              <button
                className={`
                  group grid w-9 h-9 cursor-pointer border border-black/[0.07] rounded-[9px]
                  bg-white/60 text-[var(--ink)] place-items-center backdrop-blur-[8px]
                  transition-all duration-[250ms] hover:-translate-y-0.5
                  dark:bg-[#242018] dark:border-[rgba(240,235,227,0.08)] dark:text-[var(--ink)] dark:hover:bg-[#2e2820]
                  max-md:hidden
                  ${heroMode === "cleaned" ? "bg-[rgba(26,24,20,0.13)] dark:bg-[#2e2820] dark:border-[rgba(240,235,227,0.14)]" : ""}
                `}
                aria-label="Cleaned-up mode"
                onClick={() => {
                  setHeroMode("cleaned");
                  if (theme === "dark") {
                    setTheme("light");
                    document.documentElement.removeAttribute("data-theme");
                    try { localStorage.removeItem("theme"); } catch(e) {}
                  }
                }}
              >
                <Grid3x3 size={16} />
                <span className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[var(--ink)] text-[var(--bg)] text-[10px] font-semibold tracking-[0.08em] uppercase rounded-md whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1/2 group-hover:-translate-y-0.5 dark:bg-[#f0ebe3] dark:text-[#0f0d0a]">
                  cleaned-up mode
                </span>
              </button>

              {/* Minimal mode button */}
              <button
                className={`
                  group grid w-9 h-9 cursor-pointer border border-black/[0.07] rounded-[9px]
                  bg-white/60 text-[var(--ink)] place-items-center backdrop-blur-[8px]
                  transition-all duration-[250ms] hover:-translate-y-0.5
                  dark:bg-[#242018] dark:border-[rgba(240,235,227,0.08)] dark:text-[var(--ink)] dark:hover:bg-[#2e2820]
                  max-md:w-8 max-md:h-8
                  ${heroMode === "minimal" ? "bg-[rgba(26,24,20,0.13)] dark:bg-[#2e2820] dark:border-[rgba(240,235,227,0.14)]" : ""}
                `}
                aria-label="Minimal mode"
                onClick={() => setHeroMode("minimal")}
              >
                <Minus size={16} />
                <span className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[var(--ink)] text-[var(--bg)] text-[10px] font-semibold tracking-[0.08em] uppercase rounded-md whitespace-nowrap opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1/2 group-hover:-translate-y-0.5 dark:bg-[#f0ebe3] dark:text-[#0f0d0a]">
                  minimal mode
                </span>
              </button>
            </div>
          </div>

          {/* ── Scroll indicator — bouncing arrow at bottom ── */}
          {!(heroMode === "minimal") && (
            <a
              href="#work"
              className="absolute bottom-[2%] left-1/2 z-30 inline-flex items-center gap-[0.45rem] -translate-x-1/2 text-[rgba(26,24,20,0.55)] text-[0.68rem] font-semibold tracking-[0.08em] uppercase animate-[scrollBounce_2s_ease-in-out_infinite] dark:text-[rgba(240,235,227,0.35)] max-md:hidden"
              aria-label="Scroll to work"
            >
              <ChevronDown size={15} />
              scroll
            </a>
          )}
        </section>

        {/* ══════════════════════════════════════════════
            ABOUT SECTION
            Personal introduction, status, and signoff.
            Vertically centered on desktop.
            ══════════════════════════════════════════════ */}
        <section
          id="about"
          className="order-1 flex flex-col items-center justify-center gap-4 py-20 md:min-h-screen pt-[clamp(88px,12vh,132px)] pb-[clamp(28px,5vh,44px)] text-center max-md:min-h-0 max-md:pt-[clamp(72px,12vh,110px)] max-md:pb-[clamp(48px,8vh,80px)]"
        >
          <div className="w-full max-w-[600px] mx-auto">
            {/* Greeting */}
            <p className="mt-0 mb-5 text-[var(--ink)] font-[family-name:var(--font-display)] text-[clamp(1.65rem,3.3vw,2.45rem)] italic font-normal leading-[1.14]">
              Hey, I&apos;m Neswanth Pasupuleti.
            </p>
            {/* Bio paragraph 1 */}
            <p className="max-w-[600px] mx-auto mt-4 text-[var(--ink)] font-[family-name:var(--font-display)] text-[clamp(1.05rem,1.55vw,1.22rem)] font-normal leading-[1.78]">
              AI undergraduate working at the intersection of research and production &mdash; from multi-agent systems to full-stack products.
            </p>
            {/* Bio paragraph 2 */}
            <p className="max-w-[600px] mx-auto mt-4 text-[var(--ink)] font-[family-name:var(--font-display)] text-[clamp(1.05rem,1.55vw,1.22rem)] font-normal leading-[1.78]">
              I build from first principles, ship fast, and go deep enough that the work can stand on its own.
            </p>
            {/* Status line — availability */}
            <p className="w-[min(calc(100vw-40px),680px)] max-w-none mt-8 text-[var(--ink)] font-[family-name:var(--font-body)] text-[clamp(0.6rem,1.35vw,1.14rem)] font-[720] tracking-[0.1em] leading-[1.35] text-center uppercase [font-variant-caps:all-small-caps] whitespace-normal max-md:text-[clamp(0.6rem,3.2vw,0.85rem)] max-md:tracking-[0.06em] max-md:px-1">
              Open to freelance work and research collaborations.
            </p>
          </div>
          {/* Separator */}
          <div className="w-12 h-px bg-current text-[var(--ink-muted)] opacity-[0.28]" aria-hidden="true" />
          {/* Signoff */}
          <p className="mt-0.5 text-[var(--ink-muted)] font-[family-name:var(--font-body)] text-[0.68rem] font-[650] tracking-[0.18em] leading-[1.6] text-center uppercase [font-variant-caps:all-small-caps]">
            &mdash; Chasing things that matter.
          </p>
        </section>

        {/* ══════════════════════════════════════════════
            PROJECTS SECTION
            Featured project rows with live previews.
            ══════════════════════════════════════════════ */}
        <section id="work" className="order-2 pb-0 bg-transparent">
          {/* Section heading */}
          <div className="max-w-[1280px] mx-auto px-8 pt-[clamp(3rem,8vh,6rem)] pb-12">
            <h2 className="font-[family-name:var(--font-display)] text-5xl font-normal italic leading-none text-[var(--ink)] md:text-6xl">
              Projects
            </h2>
          </div>
          {/* Project rows */}
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col gap-0">
              {featuredProjects.map((project, index) => (
                <FeaturedProject project={project} index={index} key={project.name} />
              ))}
            </div>
          </div>
        </section>

        <ResearchSection />
        <ServicesSection />
        <TechStackSection />

        {/* ══════════════════════════════════════════════
            CONTACT SECTION
            CTA card with messaging links and socials.
            ══════════════════════════════════════════════ */}
        <section
          id="contact"
          className="order-6 flex flex-col items-center text-center pt-[100px] pb-20 bg-[var(--bg)] dark:bg-[var(--bg)] max-md:pt-[72px] max-md:pb-[60px]"
        >
          <div className="w-full max-w-[800px] px-5 flex flex-col items-center">
            {/* Heading */}
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] font-bold text-[var(--ink)] mb-4 tracking-[-0.02em] dark:text-[var(--ink)]">
              Let&apos;s Build
            </h2>
            {/* Subtext */}
            <p className="text-[var(--ink-muted)] text-base max-w-[620px] mb-12 leading-[1.6] dark:text-[var(--ink-muted)] max-md:text-[0.92rem] max-md:mb-8">
              Have a project in mind or just want to chat about technology? I&apos;d love to hear from you and discuss how we can work together.
            </p>

            {/* ── Dark CTA card ── */}
            <div className="bg-[#1a1f2e] rounded-3xl p-14 max-md:p-7 w-full flex flex-col items-center gap-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:bg-[#181613] dark:border dark:border-[rgba(232,227,220,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <h3 className="text-white font-[family-name:var(--font-display)] text-[clamp(1.6rem,3vw,2.15rem)] font-bold leading-[1.2] dark:text-[var(--ink)] max-[480px]:text-[1.4rem]">
                Ready to start something amazing?
              </h3>
              <p className="text-white/70 text-base max-w-[500px] text-center leading-[1.6] dark:text-[var(--ink-muted)]">
                I&apos;m currently available for freelance work and exciting opportunities. Let&apos;s bring your ideas to life!
              </p>

              {/* Action buttons */}
              <div className="flex gap-4 mt-3 mb-4 flex-wrap justify-center max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:w-full max-[480px]:gap-2.5">
                <a
                  href="https://wa.me/919392280525"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl font-semibold text-[0.9rem] leading-[1.1] transition-all duration-200 cursor-pointer bg-white text-[var(--bg-dark)] hover:bg-[var(--bg)] hover:-translate-y-0.5 dark:bg-[#f0ebe3] dark:text-[#1a1612] dark:hover:bg-white max-md:px-2.5 max-md:text-[0.82rem] max-[480px]:w-full"
                >
                  <WhatsappIcon size={16} /> Quick chat
                </a>
                <a
                  href="mailto:neswanths@gmail.com"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl font-semibold text-[0.9rem] leading-[1.1] transition-all duration-200 cursor-pointer bg-transparent text-white border border-white/30 hover:bg-white/10 hover:-translate-y-0.5 dark:text-[var(--ink)] dark:border-[rgba(240,235,227,0.18)] dark:hover:bg-[rgba(240,235,227,0.05)] max-md:px-2.5 max-md:text-[0.82rem] max-[480px]:w-full"
                >
                  <Mail size={16} /> Email Me
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl font-semibold text-[0.9rem] leading-[1.1] transition-all duration-200 cursor-pointer bg-transparent text-white border border-white/30 hover:bg-white/10 hover:-translate-y-0.5 dark:text-[var(--ink)] dark:border-[rgba(240,235,227,0.18)] dark:hover:bg-[rgba(240,235,227,0.05)] max-md:px-2.5 max-md:text-[0.82rem] max-[480px]:w-full"
                >
                  <Download size={16} /> Resume
                </a>
              </div>

              {/* Social links */}
              <div className="flex gap-6 items-center justify-center max-md:gap-4">
                {socialLinks.map((link) => (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    aria-label={link.label}
                    key={link.label}
                    className="text-white/60 transition-all duration-200 flex items-center justify-center hover:text-white hover:-translate-y-0.5 dark:text-[var(--ink-muted)] dark:hover:text-[var(--ink)]"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════
          FOOTER
          Copyright, tagline, social links, and
          back-to-top button.
          ══════════════════════════════════════════════ */}
      <footer className="relative bg-[var(--bg)] border-t border-[rgba(28,26,23,0.1)] text-[var(--ink)] font-[family-name:var(--font-body)] flex w-full items-center justify-between px-6 py-8 md:px-12 md:py-6 max-h-[80px] transition-colors duration-300 dark:bg-[var(--bg)] dark:border-[var(--border)]">
        <div className="text-sm font-medium text-[var(--ink-muted)] flex-1 text-left">
          © 2026 Neswanth
        </div>
        <div className="text-sm font-medium text-[var(--ink-muted)] flex-1 text-center hidden md:block">
          Always open to collaborate.
        </div>
        
        <div className="flex items-center justify-end gap-5 flex-1">
          <a href="https://github.com/neswanths" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href="https://linkedin.com/in/neswanth" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
            <LinkedinIcon size={18} />
          </a>
          <a href="https://instagram.com/neswanths" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
            <InstagramIcon size={18} />
          </a>
          <a href="mailto:neswanths@gmail.com" aria-label="Email" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
            <Mail size={18} />
          </a>
        </div>

        <BackToTop />
      </footer>
    </>
  );
}
