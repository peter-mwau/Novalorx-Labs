// src/sections/Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
  Code,
  Users,
} from "lucide-react";
import { useInView } from "../hooks/useInView";
import { sampleProjects } from "../constants/projects";

/* ---------------- MiniIDE ---------------- */
function MiniIDE({
  snippets = [],
  typingSpeed = 24,
  pauseBetweenSnippets = 1400,
  pauseOnHover = true,
}) {
  const [display, setDisplay] = useState("");
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const mounted = useRef(true);
  const pausedRef = useRef(false);

  // Respect user pref for reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const m = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(!!(m && m.matches));
    onChange();
    m && m.addEventListener && m.addEventListener("change", onChange);
    return () => m && m.removeEventListener && m.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!snippets || snippets.length === 0) return;
    if (reducedMotion) {
      setDisplay(snippets[0].slice(0, Math.min(200, snippets[0].length)));
      return;
    }

    let timeoutId;
    const currentSnippet = snippets[snippetIndex];
    if (pausedRef.current) return;

    if (!isDeleting && charIndex <= currentSnippet.length) {
      // typing
      timeoutId = setTimeout(() => {
        if (!mounted.current) return;
        setDisplay(currentSnippet.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex > currentSnippet.length) {
      timeoutId = setTimeout(() => {
        if (!mounted.current) return;
        setIsDeleting(true);
      }, pauseBetweenSnippets);
    } else if (isDeleting && charIndex >= 0) {
      timeoutId = setTimeout(() => {
        if (!mounted.current) return;
        setDisplay(currentSnippet.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, Math.round(typingSpeed * 0.6));
    } else if (isDeleting && charIndex < 0) {
      timeoutId = setTimeout(() => {
        if (!mounted.current) return;
        setIsDeleting(false);
        setCharIndex(0);
        setSnippetIndex((s) => (s + 1) % snippets.length);
      }, 300);
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, snippetIndex, snippets, typingSpeed, pauseBetweenSnippets, reducedMotion]);

  const onMouseEnter = () => {
    if (!pauseOnHover) return;
    pausedRef.current = true;
  };
  const onMouseLeave = () => {
    if (!pauseOnHover) return;
    pausedRef.current = false;
    setCharIndex((c) => c);
  };

  const highlight = (text) => {
    const esc = (s) =>
      s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    let html = esc(text);

    // comments
    html = html.replace(/(\/\/.*?$)/gm, '<span class="ide-comment">$1</span>');
    html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="ide-comment">$1</span>');
    // strings
    html = html.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, '<span class="ide-string">$1</span>');
    // keywords (small set)
    html = html.replace(
      /\b(const|let|var|function|return|if|else|async|await|class|new|export|import|from|try|catch)\b/g,
      '<span class="ide-keyword">$1</span>'
    );
    // numbers
    html = html.replace(/\b([0-9]+)\b/g, '<span class="ide-number">$1</span>');
    return html;
  };

  return (
    <div
      className="max-w-lg w-full rounded-lg border border-white/8 bg-gradient-to-br from-black/60 to-black/40 p-3 shadow-lg shadow-black/30"
      aria-hidden="false"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400/90 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-[0_0_6px_rgba(234,179,8,0.45)]" />
          <span className="w-3 h-3 rounded-full bg-green-400/70 shadow-[0_0_6px_rgba(16,185,129,0.35)]" />
        </div>

        <div className="ml-auto text-xs text-white/60 px-2 py-0.5 rounded-md bg-white/2 border border-white/5">
          Mini IDE
        </div>
      </div>

      <div
        className="relative font-mono text-sm leading-5 text-white/90 px-3 py-2 rounded-md overflow-hidden"
        style={{
          minHeight: 120,
          background:
            "linear-gradient(180deg, rgba(10,14,20,0.45), rgba(3,6,10,0.25))",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
      >
        <pre
          aria-live="polite"
          className="whitespace-pre-wrap break-words"
          style={{ margin: 0 }}
          dangerouslySetInnerHTML={{
            __html:
              highlight(display) +
              `<span class="ide-cursor" aria-hidden="true">▌</span>`,
          }}
        />
      </div>

      <div className="mt-3 text-xs text-white/60 flex items-center justify-between">
        <div>Auto play • Demo</div>
        <div className="text-xs">Speed: <span className="text-white/80">fast</span></div>
      </div>

      <style jsx>{`
        .ide-comment { color: #6ee7b7; opacity: 0.95; } /* mint */
        .ide-string { color: #fb7185; } /* pink */
        .ide-keyword { color: #60a5fa; font-weight: 600; } /* blue */
        .ide-number { color: #f97316; } /* orange */
        .ide-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: ide-blink 1s steps(2) infinite;
          color: #34d3ff;
          text-shadow: 0 0 8px rgba(52, 211, 255, 0.9), 0 0 22px rgba(59, 130, 246, 0.6);
        }
        @keyframes ide-blink { 50% { opacity: 0 } 100% { opacity: 1 } }

        @media (prefers-reduced-motion: reduce) {
          .ide-cursor { animation: none; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ---------------- Projects ---------------- */
function Projects({ onNavigate }) {
  const [activeId, setActiveId] = useState(null);
  const [shotIdx, setShotIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Carousel state
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // adjust by breakpoint

  const openProject = (id) => {
    setIsAnimating(true);
    setActiveId(id);
    setShotIdx(0);
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeProject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveId(null);
      document.body.style.overflow = "unset";
      setIsAnimating(false);
    }, 200);
  };

  const active = sampleProjects.find((p) => p.id === activeId);

  const nextShot = () => {
    if (!active) return;
    setShotIdx((s) => (s + 1) % active.screenshots.length);
  };

  const prevShot = () => {
    if (!active) return;
    setShotIdx(
      (s) => (s - 1 + active.screenshots.length) % active.screenshots.length,
    );
  };

  const nextProject = () => {
    if (!active) return;
    const i = sampleProjects.findIndex((p) => p.id === active.id);
    const next = sampleProjects[(i + 1) % sampleProjects.length];
    openProject(next.id);
  };

  const prevProject = () => {
    if (!active) return;
    const i = sampleProjects.findIndex((p) => p.id === active.id);
    const prev =
      sampleProjects[(i - 1 + sampleProjects.length) % sampleProjects.length];
    openProject(prev.id);
  };

  const handleKeyDown = (e) => {
    if (!active) return;
    switch (e.key) {
      case "Escape":
        closeProject();
        break;
      case "ArrowLeft":
        prevShot();
        break;
      case "ArrowRight":
        nextShot();
        break;
      case "ArrowUp":
        prevProject();
        break;
      case "ArrowDown":
        nextProject();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  const [sectionRef, isInView] = useInView();

  // Update visibleCount on resize (for responsive cards per view)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // On scroll, update currentIndex for indicators
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children);
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearestIdx = 0;
      let nearestDist = Infinity;
      children.forEach((child, idx) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(childCenter - center);
        if (dist < nearestDist) {
          nearestIdx = idx;
          nearestDist = dist;
        }
      });
      setCurrentIndex(nearestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Carousel controls: scroll by one page (container width)
  const scrollByPage = (direction = "next") => {
    const el = carouselRef.current;
    if (!el) return;
    const page = el.clientWidth * 0.9; // scroll almost one visible page
    const left =
      direction === "next" ? el.scrollLeft + page : el.scrollLeft - page;
    el.scrollTo({ left, behavior: "smooth" });
  };

  // Optional: click indicator to center a card
  const centerIndex = (idx) => {
    const el = carouselRef.current;
    if (!el) return;
    const child = el.children[idx];
    if (!child) return;
    const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  };

  // snippets for the MiniIDE (realistic but short)
  const codeSnippets = [
    `// deploy: donation-contract.js
import { ethers } from "ethers";

async function deploy() {
  const Factory = await ethers.getContractFactory("Donation");
  const contract = await Factory.deploy();
  console.log("Deployed:", contract.address);
}`,
    `// api: analytics.js
export async function track(event) {
  await fetch("/api/track", { method: "POST", body: JSON.stringify(event) });
}`,
    `// infra: infra.tf
resource "aws_s3_bucket" "public_assets" {
  bucket = "nvx-assets-\${random_id.hex.hex}"
  acl    = "public-read"
}`,
  ];

  // go to contact section (SPA first, then DOM fallback, then /contact)
  const goToContact = () => {
    // Prefer single page navigation if provided
    if (typeof onNavigate === "function") {
      onNavigate("contacts");
      return;
    }

    // DOM fallbacks
    const el =
      document.getElementById("contacts") ||
      document.querySelector('[data-section="contacts"]') ||
      document.querySelector('[data-section="contact"]') ||
      document.getElementById("contact");

    if (el) {
      try {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof el.focus === "function") el.focus({ preventScroll: true });
      } catch (err) {
        // fallback
        window.open("/contact", "_self");
      }
      return;
    }

    // final fallback
    window.open("/contact", "_self");
  };

  return (
    <div
      ref={sectionRef}
      className={`w-full max-h-[90vh] overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar flex flex-col justify-start relative transition-opacity duration-700 bg-gradient-to-b from-gray-900/10 to-black/20 ${isInView ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="relative flex flex-col items-center justify-center w-full">
        <div className="w-full h-auto max-w-7xl py-45 flex flex-col gap-16 flex justify-center">

          {/* Header: left text + right mini IDE (responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Left: title, subtext, CTAs */}
            <div className="space-y-4 flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-400/20">
                  Selected projects
                </span>
                <div className="text-sm text-white/60">Case studies & demos</div>
              </div>

              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white/90">
                Projects — Real work that ships
              </h1>

              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                We build, ship and iterate — from Web3 dApps to AI systems and modern web platforms.
                Click any project to explore screenshots, tech stack, challenges and live demos.
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => window.scrollTo({ top: window.scrollY + 500, behavior: "smooth" })}
                  className="px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow"
                >
                  Explore projects
                </button>

                <button
                  onClick={() => goToContact()}
                  className="px-5 py-3 rounded-lg border border-white/10 text-white/90 hover:bg-white/5"
                >
                  Book a demo
                </button>
              </div>
            </div>

            {/* Right: Mini IDE */}
            <div className="flex justify-end md:justify-start">
              <div className="w-full md:w-[520px] lg:w-[640px]">
                <MiniIDE snippets={codeSnippets} typingSpeed={100} pauseBetweenSnippets={1200} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-center justify-center px-4 md:px-8">
          <div className="mt-12 mb-12 text-center text-white/80">
            <h3 id="extras-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Case Studies & Demos — Deep dives into our work
            </h3>
            <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
              Explore detailed case studies and live demos of our projects, showcasing our process, challenges and impact. Click any project card to dive in.
            </p>
          </div>

          {/* Carousel wrapper + controls (arrows aligned with dots at the bottom) */}
          <div className="relative h-auto max-w-7xl w-full flex flex-col items-center justify-start">
            {/* Carousel */}
            <div
              ref={carouselRef}
              className="w-full overflow-x-auto scroll-smooth no-scrollbar pb-6"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollSnapType: "x mandatory",
                display: "flex",
                gap: "1.25rem", // same as tailwind gap-6
              }}
            >
              {sampleProjects.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => openProject(p.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openProject(p.id);
                  }}
                  className="snap-start flex-shrink-0"
                  style={{
                    width:
                      visibleCount === 1
                        ? "100%"
                        : visibleCount === 2
                          ? "48%"
                          : "31%", // ~3 per view with gaps
                  }}
                >
                  <div
                    className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-white/40 shadow-lg shadow-black/30"
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <img
                        src={p.screenshots[0]}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                        <span className="text-xs font-medium text-white">{p.category}</span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {p.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${p.status === "Live"
                              ? "bg-green-500/20 text-green-300"
                              : p.status === "Completed"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-yellow-500/20 text-yellow-300"
                              }`}
                          >
                            {p.status}
                          </span>
                        </div>

                        <p className="text-sm text-white/70 mb-4">{p.short}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {p.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/80"
                            >
                              {t}
                            </span>
                          ))}
                          {p.tech.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/60">
                              +{p.tech.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{p.timeline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{p.team}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls row (arrows + dots) */}
            <div className="relative w-full mt-6 flex items-center justify-center">
              {/* Left arrow - placed to the left of dots and vertically centered in this row */}
              <button
                onClick={() => scrollByPage("prev")}
                aria-label="Previous"
                className="hidden md:flex items-center justify-center absolute left-4 z-20 w-10 h-10 rounded-full bg-cyan-300/80 hover:bg-cyan-400/90"
              >
                <ChevronLeft className="w-5 h-5 text-gray-900" />
              </button>

              {/* Dots centered */}
              <div className="flex items-center justify-center gap-3 px-10">
                {sampleProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => centerIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === i ? "bg-cyan-300 scale-110" : "bg-white/30"
                      }`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>

              {/* Right arrow - placed to the right */}
              <button
                onClick={() => scrollByPage("next")}
                aria-label="Next"
                className="hidden md:flex items-center justify-center absolute right-4 z-20 w-10 h-10 rounded-full bg-cyan-300/80 hover:bg-cyan-400/90"
              >
                <ChevronRight className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </div>

          {/* — Reach Out CTA */}
          <section className="w-full max-w-4xl mt-20 mb-10">
            <div className="w-full h-auto py-16 px-6 md:px-10 flex items-center justify-center">
              <div className="relative rounded-2xl p-8 md:p-10 bg-gradient-to-br from-white/4 to-black/30 border border-white/6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Left content */}
                  <div className="md:col-span-2">
                    <h4 className="text-2xl md:text-3xl font-extrabold text-white">
                      Ready to ship your next product?
                    </h4>
                    <p className="text-gray-300 mt-3 max-w-2xl">
                      Tell us about your idea and we’ll scope an achievable plan — prototypes, milestones, pricing and timeline.
                      We handle product, design, and engineering so you can focus on growth.
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-3 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-300" /> Fast replies (within 24 hours)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-300" /> Free scoping call
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-yellow-300" /> Fixed-price or retainers
                      </li>
                    </ul>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-col items-stretch gap-3 md:items-end">
                    <button
                      onClick={goToContact}
                      className="w-full md:w-auto px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold shadow-lg"
                    >
                      Let's talk — Book a call
                    </button>

                    <button
                      onClick={() => window.open("/contact", "_self")}
                      className="w-full md:w-auto px-6 py-3 rounded-full border border-white/10 text-white hover:bg-white/5"
                    >
                      Send a brief (contact)
                    </button>

                    <div className="mt-2 text-xs text-gray-400 text-center md:text-right">
                      Or email us at <button onClick={() => (window.location = "mailto:hello@yourdomain.com")} className="underline">hello@yourdomain.com</button>
                    </div>
                  </div>
                </div>

                {/* subtle bottom divider and micro-trust row */}
                <div className="mt-6 border-t border-white/6 pt-4 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-300/70" />
                      <div>Fast response</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/50" />
                      <div>Free scoping</div>
                    </div>
                  </div>

                  <div>Flexible engagement • NDAs available</div>
                </div>
              </div>
            </div>
          </section>

          {/* Project Detail Modal (unchanged) */}
          {active && (
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isAnimating ? "animate-fadeIn" : ""}`}
            >
              <div
                className="absolute inset-0 transition-opacity duration-300"
                onClick={closeProject}
              ></div>

              <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-gray-900/90 backdrop-blur-lg border rounded-3xl border-white/10 shadow-2xl transform transition-all duration-300">
                <button
                  onClick={closeProject}
                  className="absolute top-6 right-15 z-50 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8 ">
                  {/* Left Column - Images */}
                  <div className="space-y-6">
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                      <img
                        src={active.screenshots[shotIdx]}
                        alt={`${active.title} screenshot ${shotIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                      <button
                        onClick={prevShot}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextShot}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                        <span className="text-white text-sm">
                          {shotIdx + 1} / {active.screenshots.length}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {active.screenshots.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setShotIdx(index)}
                          className={`relative h-20 rounded-xl overflow-hidden transition-all duration-300 ${shotIdx === index
                            ? "ring-2 ring-blue-400 scale-105"
                            : "opacity-70 hover:opacity-100 hover:scale-105"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-15">
                      <div className="text-center p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-blue-300/20">
                        <Calendar className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                        <p className="text-xs text-white/60">Timeline</p>
                        <p className="text-sm font-semibold text-white">
                          {active.timeline}
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-blue-300/20">
                        <Users className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                        <p className="text-xs text-white/60">Team</p>
                        <p className="text-sm font-semibold text-white">
                          {active.team}
                        </p>
                      </div>
                      <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-blue-300/20">
                        <Code className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                        <p className="text-xs text-white/60">Status</p>
                        <p className="text-sm font-semibold text-white">
                          {active.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Details (unchanged) */}
                  <div className="overflow-y-auto no-scrollbar max-h-[calc(70vh-4rem)] pr-2">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 text-white/80 text-sm">
                          {active.category}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${active.status === "Live"
                            ? "bg-green-500/20 text-green-300"
                            : active.status === "Completed"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {active.status}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-300 mb-3">
                        {active.title}
                      </h3>
                      <p className="text-white/80 text-md mb-4">
                        {active.description}
                      </p>
                    </div>

                    {/* Detailed Description */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                        Project Overview
                      </h4>
                      <p className="text-md text-white/80">
                        {active.longDescription}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {active.details.map((detail, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-white/80"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {active.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Challenges & Solutions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/20">
                        <h5 className="font-semibold text-white mb-2">
                          Challenges
                        </h5>
                        <ul className="space-y-1">
                          {active.challenges.map((challenge, index) => (
                            <li key={index} className="text-sm text-white/70">
                              • {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/20">
                        <h5 className="font-semibold text-white mb-2">
                          Solutions
                        </h5>
                        <ul className="space-y-1">
                          {active.solutions.map((solution, index) => (
                            <li key={index} className="text-sm text-white/70">
                              • {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition-all duration-300 flex-1"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={active.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 flex-1"
                      >
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </a>
                    </div>

                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                      <button
                        onClick={prevProject}
                        className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm">Previous Project</span>
                      </button>
                      <button
                        onClick={nextProject}
                        className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        <span className="text-sm">Next Project</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {/* End Right Column */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animations + small CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Hide native scrollbar but keep touch support */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* small neon blink for header brand (subtle) */
        @keyframes neonBlink {
          0% { text-shadow: 0 0 6px rgba(34,211,238,0.7), 0 0 18px rgba(59,130,246,0.55); }
          50% { text-shadow: 0 0 14px rgba(34,211,238,0.95), 0 0 32px rgba(59,130,246,0.75); }
          100% { text-shadow: 0 0 6px rgba(34,211,238,0.7), 0 0 18px rgba(59,130,246,0.55); }
        }
      `}</style>
    </div>
  );
}

export default Projects;
