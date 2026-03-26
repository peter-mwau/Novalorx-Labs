// src/sections/Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
  Code,
  Users,
  X,
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

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const m =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(!!(m && m.matches));
    onChange();
    m && m.addEventListener && m.addEventListener("change", onChange);
    return () =>
      m && m.removeEventListener && m.removeEventListener("change", onChange);
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
      timeoutId = setTimeout(
        () => {
          if (!mounted.current) return;
          setDisplay(currentSnippet.slice(0, charIndex));
          setCharIndex((c) => c - 1);
        },
        Math.round(typingSpeed * 0.6),
      );
    } else if (isDeleting && charIndex < 0) {
      timeoutId = setTimeout(() => {
        if (!mounted.current) return;
        setIsDeleting(false);
        setCharIndex(0);
        setSnippetIndex((s) => (s + 1) % snippets.length);
      }, 300);
    }

    return () => clearTimeout(timeoutId);
  }, [
    charIndex,
    isDeleting,
    snippetIndex,
    snippets,
    typingSpeed,
    pauseBetweenSnippets,
    reducedMotion,
  ]);

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

    html = html.replace(/(\/\/.*?$)/gm, '<span class="ide-comment">$1</span>');
    html = html.replace(
      /(\/\*[\s\S]*?\*\/)/g,
      '<span class="ide-comment">$1</span>',
    );
    html = html.replace(
      /("[^"]*"|'[^']*'|`[^`]*`)/g,
      '<span class="ide-string">$1</span>',
    );
    html = html.replace(
      /\b(const|let|var|function|return|if|else|async|await|class|new|export|import|from|try|catch)\b/g,
      '<span class="ide-keyword">$1</span>',
    );
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
        <div className="text-xs">
          Speed: <span className="text-white/80">fast</span>
        </div>
      </div>

      <style jsx>{`
        .ide-comment {
          color: #6ee7b7;
          opacity: 0.95;
        }
        .ide-string {
          color: #fb7185;
        }
        .ide-keyword {
          color: #60a5fa;
          font-weight: 600;
        }
        .ide-number {
          color: #f97316;
        }
        .ide-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: ide-blink 1s steps(2) infinite;
          color: #34d3ff;
          text-shadow:
            0 0 8px rgba(52, 211, 255, 0.9),
            0 0 22px rgba(59, 130, 246, 0.6);
        }
        @keyframes ide-blink {
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ide-cursor {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------------- Projects ---------------- */
function Projects({ onNavigate }) {
  const [activeProject, setActiveProject] = useState(null);
  const [shotIdx, setShotIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const projectsPerPage = 3;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(sampleProjects.length / projectsPerPage),
  );

  const selectProject = (project) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProject(project);
      setShotIdx(0);
      setIsTransitioning(false);
    }, 300);
  };

  const closeProject = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProject(null);
      setShotIdx(0);
      setIsTransitioning(false);
    }, 300);
  };

  const nextShot = () => {
    if (!activeProject) return;
    setShotIdx((s) => (s + 1) % activeProject.screenshots.length);
  };

  const prevShot = () => {
    if (!activeProject) return;
    setShotIdx(
      (s) =>
        (s - 1 + activeProject.screenshots.length) %
        activeProject.screenshots.length,
    );
  };

  const nextProject = () => {
    if (!activeProject) return;
    const i = sampleProjects.findIndex((p) => p.id === activeProject.id);
    const next = sampleProjects[(i + 1) % sampleProjects.length];
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProject(next);
      setShotIdx(0);
      setIsTransitioning(false);
    }, 300);
  };

  const prevProject = () => {
    if (!activeProject) return;
    const i = sampleProjects.findIndex((p) => p.id === activeProject.id);
    const prev =
      sampleProjects[(i - 1 + sampleProjects.length) % sampleProjects.length];
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveProject(prev);
      setShotIdx(0);
      setIsTransitioning(false);
    }, 300);
  };

  const [sectionRef, isInView] = useInView();

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

  const goToContact = () => {
    if (typeof onNavigate === "function") {
      onNavigate("contacts");
      return;
    }

    const el =
      document.getElementById("contacts") ||
      document.querySelector('[data-section="contacts"]') ||
      document.querySelector('[data-section="contact"]') ||
      document.getElementById("contact");

    if (el) {
      try {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        if (typeof el.focus === "function") el.focus({ preventScroll: true });
      } catch {
        window.open("/contact", "_self");
      }
      return;
    }

    window.open("/contact", "_self");
  };

  const startIndex = (page - 1) * projectsPerPage;
  const pageProjects = sampleProjects.slice(
    startIndex,
    startIndex + projectsPerPage,
  );

  return (
    <div
      ref={sectionRef}
      className={`w-full max-h-[90vh] overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar flex flex-col justify-start relative transition-opacity duration-700 bg-gradient-to-b from-gray-900/10 to-black/20 ${
        isInView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center w-full">
        <div className="w-full h-auto max-w-7xl py-45 flex flex-col gap-16 justify-center">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center w-[90%] justify-center mx-auto">
            <div className="space-y-4 flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-400/20">
                  Selected projects
                </span>
                <div className="text-sm text-white/60">
                  Case studies & demos
                </div>
              </div>

              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white/90">
                Projects — Real work that ships
              </h1>

              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                We build, ship and iterate — from Web3 dApps to AI systems and
                modern web platforms. Click any project to explore screenshots,
                tech stack, challenges and live demos.
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: window.scrollY + 500,
                      behavior: "smooth",
                    })
                  }
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

            <div className="flex justify-end md:justify-start">
              <div className="w-full md:w-[520px] lg:w-[640px]">
                <MiniIDE
                  snippets={codeSnippets}
                  typingSpeed={100}
                  pauseBetweenSnippets={1200}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col items-center justify-center px-4 md:px-8">
          <div className="mt-12 mb-12 text-center text-white/80">
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Case Studies & Demos — Deep dives into our work
            </h3>
            <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
              Explore detailed case studies and live demos of our projects,
              showcasing our process, challenges and impact. Click any project
              card to dive in.
            </p>
          </div>

          <div className="relative h-auto max-w-7xl w-full flex flex-col items-center justify-start">
            {/* Projects Grid - with smooth transition to split view */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                activeProject
                  ? "opacity-0 scale-95 pointer-events-none absolute inset-0"
                  : "opacity-100 scale-100 relative"
              }`}
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pageProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => selectProject(project)}
                    className="group text-left relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-white/40 shadow-lg shadow-black/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <div className="relative h-48 overflow-hidden rounded-t-2xl">
                      <img
                        src={project.screenshots[0]}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                        <span className="text-xs font-medium text-white">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          {project.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            project.status === "Live"
                              ? "bg-green-500/20 text-green-300"
                              : project.status === "Completed"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <p className="text-sm text-white/70 mb-4">
                        {project.short}
                      </p>

                      <div className="flex items-center justify-between text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{project.timeline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{project.team}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="w-full mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className="px-3 py-2 rounded-lg border border-white/15 text-white/80 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                        pageNumber === page
                          ? "bg-cyan-400 text-black"
                          : "bg-white/10 text-white/80 hover:bg-white/20"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={page === totalPages}
                  className="px-3 py-2 rounded-lg border border-white/15 text-white/80 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/5"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Split View - with smooth transition from grid */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                activeProject
                  ? "opacity-100 scale-100 relative"
                  : "opacity-0 scale-95 pointer-events-none absolute inset-0"
              }`}
            >
              {activeProject && (
                <div className="w-full mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Main Content */}
                  <div className="lg:col-span-8 xl:col-span-9 rounded-3xl bg-gray-900/80 backdrop-blur-lg border border-white/10 shadow-2xl p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={closeProject}
                          className="px-4 py-2 rounded-full border border-white/20 text-white/85 hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Back to all projects
                        </button>
                      </div>

                      <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                        <img
                          src={activeProject.screenshots[shotIdx]}
                          alt={`${activeProject.title} screenshot ${shotIdx + 1}`}
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
                            {shotIdx + 1} / {activeProject.screenshots.length}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        {activeProject.screenshots.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setShotIdx(index)}
                            className={`relative h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                              shotIdx === index
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

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-blue-300/20">
                          <Calendar className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                          <p className="text-xs text-white/60">Timeline</p>
                          <p className="text-sm font-semibold text-white">
                            {activeProject.timeline}
                          </p>
                        </div>
                        <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-blue-300/20">
                          <Users className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                          <p className="text-xs text-white/60">Team</p>
                          <p className="text-sm font-semibold text-white">
                            {activeProject.team}
                          </p>
                        </div>
                        <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-blue-300/20">
                          <Code className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                          <p className="text-xs text-white/60">Status</p>
                          <p className="text-sm font-semibold text-white">
                            {activeProject.status}
                          </p>
                        </div>
                      </div>

                      <div className="overflow-y-auto no-scrollbar max-h-[520px] pr-1">
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 rounded-full backdrop-blur-lg bg-white/10 border border-white/20 text-white/80 text-sm">
                              {activeProject.category}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                activeProject.status === "Live"
                                  ? "bg-green-500/20 text-green-300"
                                  : activeProject.status === "Completed"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : "bg-yellow-500/20 text-yellow-300"
                              }`}
                            >
                              {activeProject.status}
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-300 mb-3">
                            {activeProject.title}
                          </h3>
                          <p className="text-white/80 text-md mb-4">
                            {activeProject.description}
                          </p>
                          <div className="mb-4 rounded-xl border border-cyan-400/20 bg-cyan-500/5 px-4 py-3">
                            <p className="text-xs uppercase tracking-wide text-cyan-200/80 mb-1">
                              Hosted Site
                            </p>
                            <a
                              href={activeProject.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 break-all"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>{activeProject.link}</span>
                            </a>
                          </div>
                        </div>

                        <div className="mb-8">
                          <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                            Project Overview
                          </h4>
                          <p className="text-md text-white/80">
                            {activeProject.longDescription}
                          </p>
                        </div>

                        <div className="mb-8">
                          <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {activeProject.details.map((detail, index) => (
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

                        <div className="mb-8">
                          <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {activeProject.tech.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/20">
                            <h5 className="font-semibold text-white mb-2">
                              Challenges
                            </h5>
                            <ul className="space-y-1">
                              {activeProject.challenges.map(
                                (challenge, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-white/70"
                                  >
                                    • {challenge}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                          <div className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/20">
                            <h5 className="font-semibold text-white mb-2">
                              Solutions
                            </h5>
                            <ul className="space-y-1">
                              {activeProject.solutions.map(
                                (solution, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-white/70"
                                  >
                                    • {solution}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                          <a
                            href={activeProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition-all duration-300 flex-1"
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span>Live Demo</span>
                          </a>
                          <a
                            href={activeProject.github}
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
                    </div>
                  </div>

                  {/* Sidebar with other projects */}
                  <div className="lg:col-span-4 xl:col-span-3 rounded-3xl bg-gradient-to-br from-white/5 to-black/30 border border-white/10 p-4 max-h-[920px] overflow-y-auto no-scrollbar">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-3">
                      Other Projects
                    </h4>
                    <div className="flex flex-col gap-3">
                      {sampleProjects
                        .filter((p) => p.id !== activeProject.id)
                        .map((project) => (
                          <button
                            key={project.id}
                            onClick={() => {
                              setIsTransitioning(true);
                              setTimeout(() => {
                                setActiveProject(project);
                                setShotIdx(0);
                                setIsTransitioning(false);
                              }, 300);
                            }}
                            className="w-full text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all p-3"
                          >
                            <div className="flex gap-3">
                              <img
                                src={project.screenshots[0]}
                                alt={project.title}
                                className="w-20 h-16 rounded-lg object-cover shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-sm font-semibold text-white truncate">
                                    {project.title}
                                  </p>
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${
                                      project.status === "Live"
                                        ? "bg-green-500/20 text-green-300"
                                        : project.status === "Completed"
                                          ? "bg-blue-500/20 text-blue-300"
                                          : "bg-yellow-500/20 text-yellow-300"
                                    }`}
                                  >
                                    {project.status}
                                  </span>
                                </div>
                                <p className="text-xs text-white/60 mt-1 line-clamp-2">
                                  {project.short}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reach Out CTA */}
          <section className="w-full max-w-4xl mt-20 mb-10">
            <div className="w-full h-auto py-16 px-6 md:px-10 flex items-center justify-center">
              <div className="relative rounded-2xl p-8 md:p-10 bg-gradient-to-br from-white/4 to-black/30 border border-white/6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <h4 className="text-2xl md:text-3xl font-extrabold text-white">
                      Ready to ship your next product?
                    </h4>
                    <p className="text-gray-300 mt-3 max-w-2xl">
                      Tell us about your idea and we'll scope an achievable plan
                      — prototypes, milestones, pricing and timeline. We handle
                      product, design, and engineering so you can focus on
                      growth.
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-3 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-300" />{" "}
                        Fast replies (within 24 hours)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-300" />{" "}
                        Free scoping call
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-yellow-300" />{" "}
                        Fixed-price or retainers
                      </li>
                    </ul>
                  </div>

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
                      Or email us at{" "}
                      <button
                        onClick={() =>
                          (window.location = "mailto:hello@yourdomain.com")
                        }
                        className="underline"
                      >
                        hello@yourdomain.com
                      </button>
                    </div>
                  </div>
                </div>

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
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes neonBlink {
          0% {
            text-shadow:
              0 0 6px rgba(34, 211, 238, 0.7),
              0 0 18px rgba(59, 130, 246, 0.55);
          }
          50% {
            text-shadow:
              0 0 14px rgba(34, 211, 238, 0.95),
              0 0 32px rgba(59, 130, 246, 0.75);
          }
          100% {
            text-shadow:
              0 0 6px rgba(34, 211, 238, 0.7),
              0 0 18px rgba(59, 130, 246, 0.55);
          }
        }
      `}</style>
    </div>
  );
}

export default Projects;
