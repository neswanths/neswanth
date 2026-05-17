"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  ChevronDown,
  CircleDot,
  Grid3x3,
  Minus,
  Moon,
  Network,
  Terminal,
} from "lucide-react";

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
    address: "github.com/neswanths/d-cloud",
    href: "https://github.com/neswanths/d-cloud",
    description:
      "Decentralized cloud storage on Holochain with Ed25519 identity, AES-256-GCM encryption, and 3-of-5 erasure coding.",
    preview: "dcloud",
  },
  {
    name: "SentinelMesh",
    address: "github.com/neswanths/sentinel-mesh",
    href: "https://github.com/neswanths/sentinel-mesh",
    description:
      "Bio-inspired distributed intrusion detection using Artificial Immune Systems theory, gossip consensus, and a 20-node mesh.",
    preview: "sentinel",
  },
  {
    name: "Vigil",
    address: "github.com/neswanths/vigil",
    href: "https://github.com/neswanths/vigil",
    description:
      "Agentic Market Intelligence Network with five specialized BDI agents, live state propagation, FastAPI, and React/Vite.",
    preview: "vigil",
  },
] as const;

const alsoBuilt = [
  {
    name: "Blinky",
    address: "chrome-extension://blinky",
    href: "https://github.com/neswanths",
    description:
      "Minimalist bookmark manager with a Chrome extension, FastAPI backend, OAuth2, JWT sessions, and persistent PostgreSQL sync.",
    stack: ["Chrome Extension", "FastAPI", "React", "PostgreSQL", "OAuth2"],
  },
];

function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const repeated = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {repeated.map((item, index) => (
          <span className="marquee-text" key={`${item}-${index}`}>
            {item}
            <span className="marquee-diamond">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function BrowserFrame({
  address,
  children,
}: {
  address: string;
  children: React.ReactNode;
}) {
  return (
    <div className="browser-frame">
      <div className="browser-top">
        <div className="traffic-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="address-bar">{address}</div>
      </div>
      <div className="browser-body">{children}</div>
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

  if (type === "sentinel") {
    return (
      <div className="preview preview-sentinel">
        <svg viewBox="0 0 520 300" role="img" aria-label="SentinelMesh network visualization">
          {[
            [72, 92, 184, 64],
            [184, 64, 286, 110],
            [286, 110, 420, 72],
            [132, 216, 286, 110],
            [286, 110, 366, 226],
            [72, 92, 132, 216],
            [420, 72, 366, 226],
            [184, 64, 132, 216],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
          {[
            [72, 92, "clean"],
            [184, 64, "watch"],
            [286, 110, "alert"],
            [420, 72, "clean"],
            [132, 216, "clean"],
            [366, 226, "watch"],
          ].map(([x, y, state], i) => (
            <circle className={`node ${state}`} key={i} cx={x} cy={y} r={state === "alert" ? 17 : 12} />
          ))}
        </svg>
        <div className="mesh-terminal">
          <span>negative selection active</span>
          <span>gossip consensus: 20 nodes</span>
          <strong>APT-class anomaly isolated</strong>
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
        <div className="fp-aspect">
          <BrowserFrame address={project.address}>
            <ProjectPreview type={project.preview} />
          </BrowserFrame>
        </div>
      </div>
      <div className="fp-text">
        <LiveBadge />
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <a href={project.href} target="_blank" rel="noreferrer">
          View project <ArrowRight size={16} strokeWidth={1.7} />
        </a>
      </div>
    </article>
  );
}

function FlipCard({ project }: { project: (typeof alsoBuilt)[number] }) {
  return (
    <article className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-face flip-front">
          <BrowserFrame address={project.address}>
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
          </BrowserFrame>
        </div>
        <div className="flip-face flip-back">
          <div>
            <span className="small-label">Chrome Extension - 2025</span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="tag-row">
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <a href={project.href} target="_blank" rel="noreferrer">
            View project <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [pastHero, setPastHero] = useState(false);
  const [heroMode, setHeroMode] = useState<"chaos" | "cleaned" | "minimal">("minimal");
  const [reveal, setReveal] = useState<{ x: number; y: number; active: boolean } | null>(null);

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

  const triggerReveal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setReveal({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      active: true,
    });
    window.setTimeout(() => setReveal(null), 780);
  };

  return (
    <>
      <nav className={`site-nav ${pastHero ? "nav-dark" : ""}`}>
        <a className="nav-logo" href="#top">
          Neswanth
        </a>
        <div>
          <a href="#work">Work</a>
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

        <Marquee
          items={[
            "AI/ML Researcher",
            "Building Agentic Systems",
            "Calisthenics & Boxing",
            "Chasing Hard Problems",
            "Anime & Deep Work",
            "First Principles Always",
          ]}
        />

        <div className="dark-world">
          <button
            className={`theme-toggle ${pastHero ? "visible" : ""}`}
            onClick={triggerReveal}
            aria-label="Reveal dark theme"
          >
            <Moon size={18} />
          </button>
          {reveal?.active ? (
            <div
              className="theme-reveal"
              style={{ "--x": `${reveal.x}px`, "--y": `${reveal.y}px` } as CSSVars}
            />
          ) : null}

          <section id="work" className="section work-section">
            <span className="section-label">Recently Shipped ▶</span>
            <div className="featured-stack">
              {featuredProjects.map((project, index) => (
                <FeaturedProject project={project} index={index} key={project.name} />
              ))}
            </div>

            <div className="also-built">
              <span className="section-label">Also Built ⁕</span>
              <div className="other-grid">
                {alsoBuilt.map((project) => (
                  <FlipCard project={project} key={project.name} />
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="section about-section">
            <div className="about-copy">
              <span className="section-label">About</span>
              <h2>I build things that go deep.</h2>
              <p>
                I am an AI/ML undergraduate building distributed systems, agentic networks, and
                competitive programming solutions from first principles.
              </p>
              <p>
                I care about research depth and shipping velocity in the same breath: understand the
                system, build the system, break it, then make it stronger.
              </p>
              <p>
                I train my body the same way I train my mind, with discipline and no shortcuts. The
                PhD path matters because I want to work on problems that matter, not just use what
                others built.
              </p>
            </div>
            <div className="stats-cluster">
              {[
                "2nd Place PRAJWALAN 2K26",
                "Top 8% Nationally - AlgoUniversity Tech Fellowship",
                "Codeforces Competitive Programmer",
                "Python, TypeScript, FastAPI, React, PyTorch, Rust, C++",
              ].map((item) => (
                <div className="stat-card" key={item}>
                  <CircleDot size={15} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <Marquee
            reverse
            items={[
              "Python",
              "TypeScript",
              "FastAPI",
              "React",
              "Next.js",
              "PyTorch",
              "Rust",
              "C++",
              "Holochain",
              "WebSockets",
              "D3.js",
              "PostgreSQL",
              "Docker",
            ]}
          />

          <section id="contact" className="section contact-section">
            <p>Let&apos;s build something that matters.</p>
            <div className="contact-links">
              <a href="mailto:neswanths@gmail.com">email</a>
              <a href="https://github.com/neswanths" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/neswanth" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <span>Neswanth</span>
        <strong>I go deep or I don&apos;t go at all.</strong>
        <small>© 2026</small>
      </footer>
    </>
  );
}
