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
  X
} from "lucide-react";

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

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

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
    className: "obj-dumbell float-4 hero-obj-tablet-hide",
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
    className: "obj-guitar float-4 hero-obj-tablet-hide",
    // Music cluster: placed top-right with vertical separation from boxing gloves.
    style: { top: "6%", right: "16vw", "--base-w": "clamp(48px, 4.6vw, 76px)", "--rot": "9deg" },
  },
  {
    src: "/objects/vinlandsaga-sticker.png",
    alt: "Vinland Saga sticker",
    className: "obj-vinland float-3 hero-obj-tablet-hide",
    style: { bottom: "8%", right: "16vw", "--base-w": "clamp(78px, 6.6vw, 118px)", "--rot": "7deg" },
  },
  {
    src: "/objects/whiplash-sticker.png",
    alt: "Whiplash sticker",
    className: "obj-whiplash float-4 hero-obj-tablet-hide",
    style: { bottom: "10%", left: "6vw", "--base-w": "clamp(82px, 6.8vw, 122px)", "--rot": "-18deg" },
  },
  {
    src: "/objects/cinema-sticker.png",
    alt: "Cinema ticket sticker",
    className: "obj-cinema float-2 hero-obj-tablet-hide",
    // Cinephile zone: adjacent to Whiplash, offset upward to avoid contact.
    style: { bottom: "31%", left: "3vw", "--base-w": "clamp(72px, 7vw, 128px)", "--rot": "-9deg" },
  },
  {
    src: "/objects/feymanbook-sticker.jpg",
    alt: "Feynman book sticker",
    className: "obj-feynman float-2 hero-obj-tablet-hide",
    style: { top: "62%", right: "6vw", "--base-w": "clamp(66px, 5.4vw, 96px)", "--rot": "2deg" },
  },
  {
    src: "/objects/radio-sticker.png",
    alt: "Radio sticker",
    className: "obj-radio float-1 hero-obj-tablet-hide",
    // Cultural shelf: bottom-right, kept below Feynman with a clear gap.
    style: { bottom: "3%", right: "5vw", "--base-w": "clamp(84px, 7.4vw, 136px)", "--rot": "-6deg" },
  },
  {
    src: "/objects/dollar-bill-sticker.png",
    alt: "Dollar bill sticker",
    className: "obj-dollar float-1 hero-obj-tablet-hide",
    style: { top: "30%", right: "17vw", "--base-w": "clamp(92px, 8vw, 144px)", "--rot": "-5deg" },
  },
  {
    src: "/objects/letscook-sticker.png",
    alt: "Let's Cook RV sticker",
    className: "obj-letscook float-3 hero-obj-tablet-hide",
    // Mid-right gap: between Vinland Saga and the controls, outside the protected center column.
    style: { bottom: "18%", right: "28vw", "--base-w": "clamp(72px, 6.2vw, 112px)", "--rot": "5deg" },
  },
];

const latestWin = "2nd Place - PRAJWALAN 2K26";

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

function TechBadge({ tech }: { tech: typeof TECH_STACK[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="
      group flex items-center gap-1.5 md:gap-2 px-2.5 py-[5px] md:py-[6px] 
      rounded-md border border-dashed border-black/15 bg-white/30
      shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)]
      hover:border-black/35 hover:scale-[1.02]
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

function TechStackSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTech = isExpanded ? TECH_STACK : TECH_STACK.slice(0, 11);

  return (
    <section id="tech-stack" className="py-16 w-full bg-[var(--bg)]">
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
                flex items-center gap-1 px-3 py-[5px] md:py-[6px] rounded-md
                border border-dashed border-[var(--accent-warm)]/30 bg-[var(--bg)]
                text-[12.5px] md:text-sm font-medium font-[family-name:var(--font-body)] text-[var(--accent-warm)]
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.06)]
                hover:bg-white/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer outline-none
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

const services = [
  {
    index: "01",
    title: "AI-Powered Features",
    body: "Your product, but smarter. I add AI to what you already have — so it understands your users, surfaces the right things, and handles work automatically.",
  },
  {
    index: "02",
    title: "Full-Stack Web Apps",
    body: "You have an idea. I build the whole thing — design, backend, frontend, everything. You get a product that works, not a prototype that needs finishing.",
  },
  {
    index: "03",
    title: "Agentic AI Systems",
    body: "The tasks your team does manually, every day — researching, deciding, following up. I build systems that handle those on their own.",
  },
] as const;

type ServiceCard = (typeof services)[number];

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
    <section id="services" className="bg-[var(--bg)] py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1180px] px-5 md:px-8">
        <div className="mb-16 max-w-2xl text-left">
          <h2 className="font-[var(--font-display)] text-5xl font-normal italic leading-none text-[var(--ink)] md:text-6xl">
            what I build.
          </h2>
          

          <p className="mt-5 font-[var(--font-body)] text-base leading-relaxed text-[var(--ink-muted)]">
            The work I take on. The problems I solve.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <button
              type="button"
              key={service.index}
              onClick={() => setActiveCard(service)}
              className="flex h-full min-h-[340px] cursor-pointer flex-col rounded-2xl border border-white/10 bg-[var(--bg-dark)] p-8 text-left shadow-[0_28px_80px_rgba(15,14,12,0.18)] outline-none transition-all duration-300 ease-out group-hover:opacity-40 hover:!opacity-100 hover:-translate-y-2 hover:border-[rgba(196,145,90,0.35)] hover:shadow-[0_0_30px_rgba(196,145,90,0.15),0_34px_90px_rgba(15,14,12,0.24)] focus-visible:!opacity-100 focus-visible:-translate-y-2 focus-visible:ring-2 focus-visible:ring-[var(--accent-warm)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)] md:p-10"
              aria-label={`Open ${service.title}`}
            >
              <span className="font-mono text-sm font-medium tracking-[0.16em] text-[var(--accent-warm)]">
                {service.index}
              </span>
              <div className="mt-12">
                <h3 className="mb-4 font-[var(--font-display)] text-3xl font-normal italic leading-tight text-[#f7f4ef]">
                  {service.title}
                </h3>
                <p className="font-[var(--font-body)] text-[0.96rem] leading-[1.65] text-white/70">
                  {service.body}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCard ? (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-50 cursor-default bg-black/40 backdrop-blur-md"
              aria-label="Close service details"
              onClick={() => setActiveCard(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              className="fixed inset-0 z-50 m-auto flex h-fit max-h-[80vh] w-[calc(100vw_-_2rem)] max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-dark)] p-8 text-left shadow-[0_0_70px_rgba(196,145,90,0.18),0_40px_120px_rgba(0,0,0,0.45)] md:p-10"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="absolute right-5 top-5 inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-warm)]"
                aria-label="Close service details"
                onClick={() => setActiveCard(null)}
              >
                <X size={18} />
              </button>

              <span className="font-mono text-sm font-medium tracking-[0.16em] text-[var(--accent-warm)]">
                {activeCard.index}
              </span>
              <div className="mt-10 pr-8">
                <h3 id="service-modal-title" className="font-[var(--font-display)] text-4xl font-normal italic leading-none text-[#f7f4ef] md:text-5xl">
                  {activeCard.title}
                </h3>
                <p className="mt-8 max-w-xl font-[var(--font-body)] text-lg leading-[1.65] text-white/70">
                  {activeCard.body}
                </p>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

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
    <div className="fp-aspect" style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: "8px", overflow: "hidden", background: "linear-gradient(135deg, #1a1814 0%, #2d2922 100%)", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
      <div style={{ height: "32px", background: "#2a2a2a", display: "flex", alignItems: "center", padding: "0 12px", gap: "6px", flexShrink: 0 }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
        <div style={{ flex: 1, height: "18px", background: "#3a3a3a", borderRadius: "4px", margin: "0 8px", display: "flex", alignItems: "center", paddingLeft: "8px", fontSize: "10px", color: "#888", fontFamily: "monospace" }}>
          {project.address}
        </div>
      </div>
      <div className="iframe-content" style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {hasLiveIframe && status !== "error" && (
          <iframe
            src={project.href}
            style={{ position: "absolute", top: 0, left: 0, width: "200%", height: "200%", border: "none", transform: "scale(0.5)", transformOrigin: "top left", pointerEvents: "none" }}
            loading="lazy"
            title={project.name}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
          />
        )}
        {(!hasLiveIframe || status === "error") && (
          <ProjectPreview type={project.preview} />
        )}
        <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }} />
      </div>
    </div>
  );
}

function ProjectPreview({ type }: { type: (typeof featuredProjects)[number]["preview"] }) {
  if (type === "dcloud") {
    return (
      <div className="preview preview-dcloud">
        <div className="hash-panel">
          <span>ed25519://node-alpha</span>
          <strong>AES-256-GCM</strong>
          <code>sha256: 8f4c 91da e2b7 40aa</code>
        </div>
        <div className="chunk-grid">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} style={{ "--delay": `${i * 0.08}s` } as CSSVars} />
          ))}
        </div>
        <div className="recovery-line">
          <span />
          <p>3-of-5 recovery stable</p>
        </div>
      </div>
    );
  }


  if (type === "blinky") {
    return (
      <div className="preview preview-blinky">
        <div className="bookmark-list">
          <span />
          <span />
          <span />
        </div>
        <div className="bookmark-card">
          <strong>Blinky</strong>
          <p>save less, find faster</p>
        </div>
      </div>
    );
  }

  return (
    <div className="preview preview-vigil">
      <div className="vigil-sidebar">
        <span />
        <span />
        <span />
      </div>
      <div className="vigil-main">
        <div className="signal-row">
          <strong>Market Signal</strong>
          <span>confidence 0.91</span>
        </div>
        <div className="agent-grid">
          {["Scout", "Analyst", "Strategist", "Risk", "Writer"].map((agent, index) => (
            <div key={agent} style={{ "--delay": `${index * 0.12}s` } as CSSVars}>
              <span />
              {agent}
            </div>
          ))}
        </div>
        <div className="chart-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function LiveBadge() {
  return (
    <span className="live-badge">
      <span />
      LIVE
    </span>
  );
}

function FeaturedProject({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <article className={`fp-row ${reversed ? "fp-reverse" : ""}`}>
      <div className="fp-image">
        <IframePreview project={project} />
      </div>
      <div className="fp-text">
        <div><LiveBadge /></div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <a href={project.href} target="_blank" rel="noreferrer">
          View project <ArrowRight size={14} strokeWidth={1.5} />
        </a>
      </div>
    </article>
  );
}



/* ── research data array — add more entries here ── */
const researchEntries = [
  {
    domain: "ARTIFICIAL IMMUNE SYSTEMS",
    title: "SentinelMesh",
    frontBody:
      "A security system that detects network attacks the way your immune system detects disease — no central authority, 20 nodes, self-organising threat response.",
    tags: ["AIS", "APT", "MESH"],
    theoryBasis: "Negative Selection",
    backBody:
      "Detectors trained on self-traffic reject anomalies. Gossip-based consensus propagates threat signals across all 20 nodes. No central authority — the mesh decides.",
    result: "APT-class lateral movement isolated.",
    githubUrl: "https://github.com/neswanths/sentinel-mesh",
  },
];

function ResearchCard({
  entry,
}: {
  entry: (typeof researchEntries)[number];
}) {
  return (
    <div className="flip-wrapper-research h-[320px]">
      <div className="flip-card-research">
        {/* ── Front face ── */}
        <div
          className="flip-face-research flex flex-col rounded-xl bg-[#ffffff] p-6"
        >
          {/* domain label — small-caps muted */}
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            {entry.domain}
          </span>

          {/* title — large serif italic */}
          <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-normal italic leading-tight text-[var(--ink)]">
            {entry.title}
          </h3>

          {/* body */}
          <p className="mt-3 flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--ink-muted)]">
            {entry.frontBody}
          </p>

          {/* tag chips */}
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-black/8 bg-[#f5f3ef] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--ink-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Back face ── */}
        <div
          className="flip-face-research flip-back-research flex flex-col rounded-xl bg-[#faf9f7] p-6"
        >
          {/* theory basis label */}
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            Theory basis
          </span>

          {/* framework name — serif italic */}
          <h4 className="mt-2 font-[family-name:var(--font-display)] text-xl font-normal italic text-[var(--ink)]">
            {entry.theoryBasis}
          </h4>

          {/* mechanism body */}
          <p className="mt-3 flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--ink-muted)]">
            {entry.backBody}
          </p>

          {/* result */}
          <span className="mt-auto text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
            Result
          </span>
          <p className="mt-1 font-[family-name:var(--font-body)] text-sm text-[var(--ink)]">
            {entry.result}
          </p>

          {/* github link — plain inline, matches "View project →" style */}
          <a
            href={entry.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-1.5 text-[0.8rem] font-semibold tracking-[0.04em] text-[var(--ink)] no-underline transition-colors duration-200 hover:text-[var(--accent-warm)]"
          >
            View →
          </a>
        </div>
      </div>
    </div>
  );
}

function ResearchSection() {
  return (
    <section id="research" className="bg-[var(--bg)] min-h-screen pt-24 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto w-full max-w-[1280px] px-8">
        {/* heading block — mirrors the Projects heading exactly */}
        <div className="pb-12">
          {/* section label — same as "Projects" */}
          <h2 className="font-[family-name:var(--font-display)] text-5xl font-normal italic leading-none text-[var(--ink)] md:text-6xl">
            Research
          </h2>

          {/* thin divider — matches the Projects section border */}
          <hr className="mt-8 border-0 border-t border-[var(--border)]" />
        </div>

        {/* card grid: 3 → 2 → 1 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {researchEntries.map((entry, i) => (
            <ResearchCard key={i} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [pastHero, setPastHero] = useState(false);
  const [heroMode, setHeroMode] = useState<"chaos" | "cleaned" | "minimal">("minimal");
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.86);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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



  return (
    <>
      <nav className={`site-nav ${pastHero ? "nav-dark" : ""}`}>
        <a className="nav-logo" href="#top">
          Neswanth
        </a>
        <div>
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section id="top" className={`hero hero-${heroMode}`}>
          <div className="hero-objects">
            {heroObjects.map((object) => (
              <div
                className={`obj-container hero-obj ${object.className}`}
                key={object.src}
                style={object.style as CSSVars}
              >
                <Image
                  src={object.src}
                  alt={object.alt}
                  width={240}
                  height={240}
                  loading="lazy"
                  sizes="(max-width: 768px) 96px, 160px"
                />
              </div>
            ))}

            <div
              className="obj-container hero-obj terminal-chip float-3 hero-obj-tablet-hide"
              style={{ top: "47%", right: "18vw", "--base-w": "clamp(142px, 10vw, 182px)", "--rot": "2deg" } as CSSVars}
            >
              <div className="chip-title">
                <Terminal size={14} />
                agent-lab
              </div>
              <code>
                &gt; training agent<span className="cursor" />
              </code>
            </div>

            <div
              className="obj-container hero-obj luffy-card float-2 hero-obj-tablet-hide"
              style={{ top: "43%", left: "13vw", "--base-w": "clamp(58px, 4.5vw, 78px)", "--rot": "-3deg" } as CSSVars}
            >
              <div className="thought-bubble">Let&apos;s ship</div>
              <Image
                src="/objects/luffy-sticker.png"
                alt="Luffy sticker"
                width={220}
                height={220}
                loading="lazy"
                sizes="120px"
              />
            </div>

            <div
              className="obj-container hero-obj award-chip latest-win float-2 hero-obj-tablet-show"
              style={{ bottom: "3%", left: "23vw", "--base-w": "clamp(204px, 15vw, 258px)", "--rot": "-2deg" } as CSSVars}
            >
              <div>
                <Award size={18} />
                <span>Latest Win</span>
              </div>
              <strong>{latestWin}</strong>
            </div>
          </div>

          <div className="hero-center">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <h1 className="hero-title">Neswanth</h1>
              <p className="hero-role">AI RESEARCHER &amp; BUILDER</p>
              <div className="avatar-orbit" aria-label="Neswanth avatar">
                <span className="avatar-ring ring-one" />
                <span className="avatar-ring ring-two" />
                <Image
                  src="/objects/avatar.png"
                  alt="Neswanth cartoon avatar"
                  width={190}
                  height={190}
                  priority
                  className="avatar-image"
                  sizes="190px"
                />
              </div>
              <p className="hero-tagline">
                <span>Chasing things that matter. </span>
                <span>Building things that last.</span>
              </p>
            </motion.div>
          </div>

          <div className="hero-controls">
            <div className="hero-mode-btn-container">
              <button
                className={`hero-mode-btn ${heroMode === "chaos" ? "active" : ""}`}
                aria-label="Chaos mode"
                onClick={() => setHeroMode("chaos")}
              >
                <Network size={20} />
              </button>
              <button
                className={`hero-mode-btn hero-mobile-hide ${heroMode === "cleaned" ? "active" : ""}`}
                aria-label="Cleaned-up mode"
                onClick={() => setHeroMode("cleaned")}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                className={`hero-mode-btn ${heroMode === "minimal" ? "active" : ""}`}
                aria-label="Minimal mode"
                onClick={() => setHeroMode("minimal")}
              >
                <Minus size={20} />
              </button>
            </div>
            <div className="hero-mode-label">
              {heroMode === "chaos" ? "chaos mode" : heroMode === "cleaned" ? "cleaned-up mode" : "minimal mode"}
            </div>
          </div>

          <a href="#work" className="scroll-indicator" aria-label="Scroll to work">
            <ChevronDown size={15} />
            scroll
          </a>
        </section>



        <section id="about" className="section about-section">
          <div className="about-copy">
            <p className="about-greeting">Hey, I&apos;m Neswanth Pasupuleti.</p>
            <p>
              AI undergraduate working at the intersection of research and production &mdash; from multi-agent systems to full-stack products.
            </p>
            <p>
              I build from first principles, ship fast, and go deep enough that the work can stand on its own.
            </p>
            <p className="about-status">
              Open to freelance work and research collaborations.
            </p>
          </div>
          <div className="about-separator" aria-hidden="true" />
          <p className="about-signoff">&mdash; Ships at 2am. Lifts at 6pm.</p>
        </section>

        <section id="work" style={{ paddingBottom: "0", background: "transparent" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", paddingTop: "6rem", paddingBottom: "3rem" }}>
            <h2 className="font-[family-name:var(--font-display)] text-5xl font-normal italic leading-none text-[var(--ink)] md:text-6xl">
              Projects
            </h2>
          </div>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {featuredProjects.map((project, index) => (
                <FeaturedProject project={project} index={index} key={project.name} />
              ))}
            </div>
          </div>
        </section>

        <ResearchSection />
        <ServicesSection />

        <TechStackSection />

        {/* Let's Connect Section */}
        <section id="contact" className="lets-connect-section">
          <div className="lets-connect-inner">
            <h2 className="lets-connect-heading">Let&apos;s Build</h2>
            <p className="lets-connect-subtext">
              Have a project in mind or just want to chat about technology? I&apos;d love to hear from you and discuss how we can work together.
            </p>

            <div className="lets-connect-card">
              <h3>Ready to start something amazing?</h3>
              <p className="availability-line">
                I&apos;m currently available for freelance work and exciting opportunities. Let&apos;s bring your ideas to life!
              </p>
              <div className="lets-connect-actions">
                <a href="mailto:neswanths@gmail.com" className="btn-primary">
                  <Mail size={16} /> Send Message
                </a>
                <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                  <Download size={16} /> Resume
                </a>
              </div>
              <div className="lets-connect-socials">
                {socialLinks.map((link) => (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    aria-label={link.label}
                    key={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-main">
          <div className="footer-col footer-brand">
            <span className="footer-name">Neswanth</span>
            <p className="footer-tagline">
              Applied AI Engineer focused on building reliable, scalable applications.
            </p>
            <div className="footer-social-icons">
              <a href="https://github.com/neswanths" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon size={18} /></a>
              <a href="https://linkedin.com/in/neswanth" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
              <a href="https://instagram.com/neswanths" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#top">Home</a></li>
              <li><a href="#work">Projects</a></li>
              <li><a href="#tech-stack">Skills</a></li>
              <li><a href="#contact">Blog</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Discover More</h4>
            <ul>
              <li><a href="#about">Experience</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Let&apos;s Build</h4>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="footer-resume-link">
              Download Resume
            </a>
            <a href="mailto:neswanths@gmail.com" className="footer-icon-btn" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            © 2026 Neswanth. All rights reserved. &nbsp;·&nbsp;
            <a href="mailto:neswanths@gmail.com"><Mail size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px' }} />neswanths@gmail.com</a>
          </span>
          <span className="footer-collab">Always open to collaborate</span>
        </div>
      </footer>
    </>
  );
}

