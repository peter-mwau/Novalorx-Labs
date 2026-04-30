// src/sections/Services.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import servicesData from "../constants/services";
import { coder, cloud, ml, web3, mobile } from "../assets/images";
import {
  Code2,
  Cloud,
  Brain,
  Smartphone,
  X,
  ArrowRightFromLineIcon,
  BlocksIcon,
  Check,
  CheckCircle,
  CheckCircle2Icon,
} from "lucide-react";
import { BiRightArrowCircle } from "react-icons/bi";

// icon / image maps
const iconMap = {
  web2: Code2,
  web3: BlocksIcon,
  android: Smartphone,
  ai_ml: Brain,
  cloud: Cloud,
};
const imageMap = {
  web2: coder,
  web3: web3,
  android: mobile,
  ai_ml: ml,
  cloud: cloud,
};

// Normalize services: pick up new optional fields if present; use sensible defaults
const services = (servicesData.services || []).map((s) => {
  const techStack = s.tech_stack ? Object.values(s.tech_stack).flat() : [];
  return {
    id: s.id,
    title: s.name,
    description: s.description || "",
    image: imageMap[s.id] || "",
    imageKeyword: s.offerings?.[0] || s.tags?.[0] || s.name,
    techStack,
    offerings: s.offerings || [],
    tags: s.tags || [],
    useCases: s.use_cases || [],
    deliveryModel: s.delivery_model || [],
    icon: iconMap[s.id] || Code2,
    businessOutcomes: s.business_outcomes || s.outcomes || [], // what business impact to expect
    deliverables: s.deliverables || s.what_you_get || [],
    timeline: s.timeline || s.estimated_delivery || "", // e.g., "2–4 weeks"
    startingFrom: s.starting_from || s.pricing_start || "", // e.g., "$2,500"
    bestFor: s.best_for || s.ideal_clients || [],
    proofPoints: s.proof_points || s.case_studies || [], // small case study summaries
    processSteps: s.process_steps || [], // step-by-step workflow specific to service
    support: s.post_launch_support || s.maintenance_options || "", // post-launch options
    platforms: s.platforms || s.integrations || [], // AWS, Stripe, OpenAI...
    riskControls: s.risk_controls || s.quality_assurance || [], // QA, SLAs, audits
    packages: s.packages || [], // optional tiered packages (starter/growth/enterprise)
  };
});

// Duplicate for continuous carousel loop
const loopedServices = [...services, ...services];

// Use additional data moved into services.js
const additionalServices = servicesData.additionalServices || [];
const defaultPackages = servicesData.defaultPackages || [];

const Services = ({ onNavigate }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  const getImageUrl = (service) => {
    if (
      service.image &&
      typeof service.image === "string" &&
      service.image !== ""
    ) {
      return service.image;
    }
    const keyword = encodeURIComponent(service.imageKeyword || service.title);
    return `https://source.unsplash.com/800x450/?${keyword}`;
  };

  // Continuous auto-scroll (raf)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const baseSpeed = 0.6;
    const maxMultiplier = 3.0;
    const speedRef = { current: baseSpeed };
    let rafId = null;
    const getHalfWidth = () => el.scrollWidth / 2 || 0;

    const loop = () => {
      if (el.scrollWidth > el.clientWidth && !pausedRef.current) {
        el.scrollLeft += speedRef.current;
        const half = getHalfWidth();
        if (el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft <= 0) el.scrollLeft += half;
      }
      rafId = requestAnimationFrame(loop);
    };

    let rect = null;
    const onPointerMove = (e) => {
      rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const normalized = (x / rect.width - 0.5) * 2;
      speedRef.current = baseSpeed * (1 + normalized * maxMultiplier);
    };
    const onPointerLeave = () => (speedRef.current = baseSpeed);
    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      rect = el.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const normalized = (x / rect.width - 0.5) * 2;
      speedRef.current = baseSpeed * (1 + normalized * maxMultiplier);
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onPointerLeave);

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onPointerLeave);
    };
  }, []);

  // Pause autoplay when modal opens & ESC close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };
    pausedRef.current = !!showModal;
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);

  const openModalFor = (index) => {
    const idx = index % services.length;
    setSelectedService(services[idx]);
    setShowSidebar(true);
    setShowModal(true);
    pausedRef.current = true;
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
    pausedRef.current = false;
  };

  // Tally embed script loader (kept)
  useEffect(() => {
    const ensureTally = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
        return;
      }
      const existingScript = document.querySelector(
        'script[src="https://tally.so/widgets/embed.js"]',
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          window.Tally?.loadEmbeds();
        });
        return;
      }
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      script.onload = () => window.Tally?.loadEmbeds();
      document.head.appendChild(script);
    };
    ensureTally();
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden text-white bg-gradient-to-b from-gray-900/10 to-black/20">
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}

        @keyframes cyberBlink {
          0%, 100% { opacity: 0.25; }
          10% { opacity: 0.9; }
          20% { opacity: 0.3; }
          35% { opacity: 1; }
          50% { opacity: 0.4; }
          70% { opacity: 0.95; }
          85% { opacity: 0.2; }
        }

        @keyframes cyberPulse {
          0%, 100% {
            transform: rotate(270deg) scale(1);
            filter: brightness(1);
          }
          10% {
            transform: rotate(270deg) scale(1.02);
            filter: brightness(1.4);
          }
          20% {
            transform: rotate(270deg) scale(0.99);
            filter: brightness(0.9);
          }
          40% {
            transform: rotate(270deg) scale(1.03);
            filter: brightness(1.6);
          }
          60% {
            transform: rotate(270deg) scale(1);
            filter: brightness(1.1);
          }
          80% {
            transform: rotate(270deg) scale(1.01);
            filter: brightness(1.3);
          }
        }

        @keyframes cyberLine {
          0%, 100% {
            opacity: 0.4;
            transform: translateX(-50%) scaleX(0.8);
          }
          20% {
            opacity: 1;
            transform: translateX(-50%) scaleX(1.3);
          }
          40% {
            opacity: 0.2;
            transform: translateX(-50%) scaleX(0.6);
          }
          60% {
            opacity: 1;
            transform: translateX(-50%) scaleX(1.4);
          }
          80% {
            opacity: 0.5;
            transform: translateX(-50%) scaleX(1);
          }
        }

        .animate-cyberBlink {
          animation: cyberBlink 2.5s infinite;
        }

        .animate-cyberPulse {
          animation: cyberPulse 3s infinite;
        }

        .animate-cyberLine {
          animation: cyberLine 2s infinite;
        }
      `}</style>

      {/* Floating Sidebar Button */}
      <div className="fixed -right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-36">
        <h2
          className="
            relative
            text-3xl sm:text-4xl font-extrabold tracking-widest
            text-cyan-300
            drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]
            drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]
            animate-cyberPulse
          "
        >
          {/* Glow aura behind text */}
          <span
            className="
              absolute inset-0
              text-cyan-400 opacity-40 blur-lg
              drop-shadow-[0_0_30px_rgba(34,211,238,1)]
              animate-cyberBlink
            "
            aria-hidden="true"
          >
            NORVALOX
          </span>
          NORVALOX
          {/* Cyberpunk underglow line */}
          <span
            className="
            absolute left-1/2 -bottom-4 -translate-x-1/2
            w-24 sm:w-32 h-[3px]
            bg-gradient-to-r from-transparent via-cyan-400 to-transparent
            blur-md opacity-90
            shadow-[0_0_25px_rgba(34,211,238,1)]
            animate-cyberLine
          "
          />
        </h2>

        <button
          onClick={() => setShowSidebar((v) => !v)}
          className="bg-cyan-300 hover:bg-cyan-400 text-black p-2 rounded-full shadow-lg"
          title="View Service Details"
          style={{ transform: "translateZ(0)" }}
        >
          <BiRightArrowCircle className="w-9 h-9" />
        </button>
      </div>

      {/* Sidebar Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: showSidebar ? 0 : "100%" }}
        transition={{ duration: 0.35 }}
        className="fixed top-0 right-0 max-h-[90vh] w-90 z-60 p-6 overflow-y-auto no-scrollbar mb-20 bg-gray-900 rounded-lg shadow-2xl"
        style={{
          backgroundColor: "rgba(17,24,39,0.86)",
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
          contain: "paint",
        }}
        aria-hidden={!showSidebar}
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-gray-100 text-2xl font-bold text-center">
            Service Details
          </h3>
          <button
            onClick={() => setShowSidebar(false)}
            aria-label="Close details"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {!selectedService && (
          <div className="text-sm text-gray-400 mb-4">
            Open any service card to view its offerings, deliverables, outcomes,
            timeline, and more.
          </div>
        )}

        {selectedService && (
          <>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white mt-1">
                {selectedService.title}
              </h4>
              <p className="text-sm text-gray-300 mt-2">
                {selectedService.description}
              </p>
            </div>

            {/* quick meta row */}
            <div className="mb-8 flex flex-col gap-2">
              {selectedService.startingFrom && (
                <div className="text-sm text-gray-300">
                  <strong>Starts from:</strong> {selectedService.startingFrom}
                </div>
              )}
              {selectedService.timeline && (
                <div className="text-sm text-gray-300">
                  <strong>Typical timeline:</strong> {selectedService.timeline}
                </div>
              )}
              {selectedService.bestFor &&
                selectedService.bestFor.length > 0 && (
                  <div className="text-sm text-gray-300">
                    <strong>Best for:</strong>{" "}
                    {selectedService.bestFor.join(", ")}
                  </div>
                )}
            </div>

            {/* Deliverables */}
            <div className="mb-8">
              <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                Deliverables
              </h5>
              <ul className="list-inside space-y-2 text-sm text-gray-200">
                {selectedService.deliverables.length > 0 ? (
                  selectedService.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-cyan-300">•</span>
                      <span>{d}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">
                    Deliverables will be defined during scoping.
                  </li>
                )}
              </ul>
            </div>

            {/* Business outcomes */}
            <div className="mb-8">
              <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                Business outcomes
              </h5>
              <ul className="list-inside space-y-2 text-sm text-gray-200">
                {selectedService.businessOutcomes.length > 0 ? (
                  selectedService.businessOutcomes.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-emerald-300">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">
                    We’ll define measurable outcomes in the discovery phase.
                  </li>
                )}
              </ul>
            </div>

            {/* Proof / case points */}
            <div className="mb-8">
              <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                Proof points
              </h5>
              <div className="text-sm text-gray-200 space-y-2">
                {selectedService.proofPoints.length > 0 ? (
                  selectedService.proofPoints.map((p, i) => (
                    <div key={i} className="bg-gray-800/40 p-3 rounded-md">
                      <div className="text-xs text-gray-300 font-semibold">
                        {p.title || `Case study ${i + 1}`}
                      </div>
                      {p.summary && (
                        <div className="text-sm text-gray-200 mt-1">
                          {p.summary}
                        </div>
                      )}
                      {p.metric && (
                        <div className="text-xs text-gray-400 mt-1">
                          Result: {p.metric}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400">
                    No public case studies listed for this offering.
                  </div>
                )}
              </div>
            </div>

            {/* Process steps */}
            <div className="mb-8">
              <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                Our approach
              </h5>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-200">
                {selectedService.processSteps.length > 0 ? (
                  selectedService.processSteps.map((ps, i) => (
                    <li key={i}>{ps}</li>
                  ))
                ) : (
                  <>
                    <li>Discovery call to align on goals and constraints</li>
                    <li>Design & architecture</li>
                    <li>Iterative sprints with weekly demos</li>
                    <li>QA, security review & launch</li>
                  </>
                )}
              </ol>
            </div>

            {/* Tech stack & platforms */}
            <div className="mb-8">
              <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                Tech & platforms
              </h5>
              <div className="flex flex-wrap gap-2">
                {selectedService.techStack.length > 0 ? (
                  selectedService.techStack.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-cyan-300"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <div className="text-gray-400">
                    Tech stack discussed in scoping.
                  </div>
                )}
              </div>

              {selectedService.platforms &&
                selectedService.platforms.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedService.platforms.map((p, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-cyan-800/60 border border-gray-600 text-gray-200"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
            </div>

            {/* Risk controls */}
            <div className="mb-8">
              <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                Risk reduction
              </h5>
              <ul className="text-sm text-gray-200 space-y-2">
                {selectedService.riskControls.length > 0 ? (
                  selectedService.riskControls.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-300">•</span>
                      <span>{r}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">
                    We include testing, code reviews, and deployment safeguards
                    as standard.
                  </li>
                )}
              </ul>
            </div>

            {/* Packages (optional) */}
            {selectedService.packages &&
              selectedService.packages.length > 0 && (
                <div className="mb-8">
                  <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                    Packages
                  </h5>
                  <div className="space-y-3">
                    {selectedService.packages.map((pkg, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-md bg-gray-800/40 border border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-200 font-semibold pb-4">
                              {pkg.name}
                            </div>
                            {pkg.summary && (
                              <div className="text-xs text-gray-400 pb-4">
                                {pkg.summary}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => onNavigate?.("contacts")}
                            className="px-3 py-1 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium transition-colors"
                          >
                            Request quote
                          </button>
                        </div>
                        {pkg.features && (
                          <ul className="text-sm text-gray-200 mt-2 list-inside">
                            {pkg.features.map((f, k) => (
                              <li key={k}>• {f}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Post-launch support */}
            <div className="mb-8">
              <h5 className="text-sm font-semibold text-cyan-300 mb-2">
                Support & Maintenance
              </h5>
              <div className="text-sm text-gray-200">
                {selectedService.support
                  ? selectedService.support
                  : "We offer 30 days post-launch support and customizable maintenance plans."}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mt-2 mb-16">
              <button
                onClick={() => {
                  closeModal();
                  setShowSidebar(false);
                  if (onNavigate) onNavigate("contacts");
                }}
                className="px-4 py-2 rounded-full bg-cyan-300 hover:bg-cyan-400 text-black font-medium"
              >
                Request a quote
              </button>

              <button
                onClick={() => {
                  closeModal();
                  setShowSidebar(false);
                  if (onNavigate) onNavigate("contacts");
                }}
                className="px-4 py-2 rounded-full bg-transparent border border-cyan-300 text-cyan-300 hover:bg-cyan-300/10 transition-all duration-300"
              >
                Book a scoping call
              </button>
            </div>
          </>
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 py-24 px-4 md:px-8 lg:px-16 w-full max-w-7xl mx-auto max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="relative h-screen flex flex-col items-center justify-center text-center">
          {/* --- Intro: placed just above the Carousel --- */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-10"
          >
            {/* Hero / Intro */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="relative mb-16 h-28 sm:h-32 flex items-center justify-center">
                <h3 className="absolute inset-0 flex items-center justify-center text-center text-5xl sm:text-6xl md:text-7xl font-extrabold text-white/70 uppercase tracking-widest pointer-events-none select-none">
                  Our Services
                </h3>
              </div>
              <p className="inline-block text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-semibold border border-cyan-400/20">
                Product engineering studio
              </p>

              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Build fast. Ship measurable outcomes. Scale with confidence.
              </h1>

              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                We partner with startups and enterprises to design, build and
                operate products that users love and businesses rely on. Our
                teams combine product strategy, design and engineering to
                deliver clear outcomes and predictable delivery.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate?.("contacts")}
                  className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow"
                >
                  Schedule scoping call
                </button>

                <button
                  onClick={() => onNavigate?.("case-studies")}
                  className="px-6 py-3 rounded-full border border-white/10 text-gray-200 hover:bg-white/5"
                >
                  See case studies
                </button>
              </div>

              <div className="mt-26 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-300">
                <div className="flex items-start gap-3 backdrop-blur-md bg-gray-800/40 p-3 rounded-md shadow-lg shadow-black/30">
                  <div className="text-cyan-300 mt-1">
                    <CheckCircle2Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Outcome-focused
                    </div>
                    <div className="text-xs text-gray-400">
                      KPIs & measurable impact
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 backdrop-blur-md bg-gray-800/40 p-3 rounded-md shadow-lg shadow-black/30">
                  <div className="text-cyan-300 mt-1">
                    <CheckCircle2Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Security-first
                    </div>
                    <div className="text-xs text-gray-400">
                      OWASP-aware & deployment safeguards
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 backdrop-blur-md bg-gray-800/40 p-3 rounded-md shadow-lg shadow-black/30">
                  <div className="text-cyan-300 mt-1">
                    <CheckCircle2Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Transparent process
                    </div>
                    <div className="text-xs text-gray-400">
                      Weekly demos & milestone tracking
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Carousel */}
        <div className="relative h-screen w-full flex flex-col md:flex-row md:items-center">
          <div className="relative z-10 px-4 md:px-0 md:absolute md:left-0 md:right-0 md:transform md:top-1/8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-left">
              Our Services — Designed for startups and enterprises
            </h2>
            <p className="mt-3 text-gray-300 max-w-2xl text-left">
              Below is a carousel of our core services. Click any card to see
              details, outcomes, timelines and more.
            </p>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-scroll no-scrollbar touch-none select-none mt-6 md:mt-0"
            aria-label="Services carousel"
            style={{
              willChange: "scroll-position, transform",
              transform: "translateZ(0)",
            }}
          >
            {loopedServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <article
                  key={`${service.id}-${i}`}
                  onClick={() => openModalFor(i)}
                  className="cursor-pointer flex-shrink-0 w-[420px] md:w-[460px] h-auto bg-[rgba(17,24,39,0.6)] border border-gray-700 rounded-xl overflow-hidden shadow-lg"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openModalFor(i);
                  }}
                  style={{ transform: "translateZ(0)" }}
                  aria-label={`Open details for ${service.title}`}
                >
                  <div className="h-40 md:h-44 bg-gray-800">
                    <img
                      src={getImageUrl(service)}
                      alt={service.title}
                      className="w-full h-full object-cover aspect-[16/9]"
                      loading="lazy"
                      decoding="async"
                      fetchpriority="low"
                      width="800"
                      height="450"
                      style={{ display: "block" }}
                    />
                  </div>

                  <div className="p-6">
                    <div className="w-12 h-12 mt-4 mb-6 flex items-center justify-center rounded-md bg-cyan-300/10">
                      <Icon className="w-7 h-7 text-cyan-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {service.description}
                    </p>

                    <p className="text-sm text-cyan-300 mt-8 hover:text-cyan-300 flex items-center gap-2">
                      Learn More{" "}
                      <ArrowRightFromLineIcon className="w-4 h-4 inline ml-1" />
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Additional Services — modernized */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-12 py-12"
          aria-labelledby="extras-heading"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8 text-center">
              <h3
                id="extras-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              >
                Extras — Additional & Complimentary Services
              </h3>
              <p className="text-gray-200 mt-3 max-w-2xl mx-auto">
                Complementary services that accelerate adoption, reduce
                time-to-value and increase product-market fit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {additionalServices.map((s) => (
                <motion.article
                  key={s.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white/5 to-white/3 border border-white/6 shadow-lg shadow-black/30 backdrop-blur-md"
                  role="region"
                  aria-labelledby={`extras-${s.id}-title`}
                >
                  {/* Top */}
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-300 mb-4">
                      {/* icon / emoji — replace with real icons if desired */}
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 12h18M12 3v18"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <h4
                      id={`extras-${s.id}-title`}
                      className="font-semibold text-lg text-white"
                    >
                      {s.title}
                    </h4>
                    <div className="text-xs text-gray-400 mt-1">
                      {s.subtitle}
                    </div>

                    <p className="text-sm text-gray-300 mt-4 leading-relaxed">
                      {s.blurb}
                    </p>
                  </div>

                  {/* Meta + CTA */}
                  <div className="mt-6">
                    {/* quick metadata row — replace values if you have them */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <div className="inline-flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Fast turnarounds</span>
                      </div>

                      <span className="h-2 w-px bg-white/6 mx-2" />

                      <div className="inline-flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-cyan-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M12 6v6l4 2"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Est. 1–2 weeks</span>
                      </div>
                    </div>

                    {/* tags / ideal-for */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-cyan-300">
                        Consult
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-gray-300">
                        Design
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onNavigate?.("contacts")}
                        aria-label={`Book consult for ${s.title}`}
                        className="px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium shadow"
                      >
                        Book consult
                      </button>

                      <button
                        onClick={() => onNavigate?.("services")}
                        aria-label={`Learn more about ${s.title}`}
                        className="px-3 py-2 text-sm rounded-full border border-white/10 text-gray-200 hover:bg-white/5"
                      >
                        Learn more
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Optional: small trust line or micro-case row below cards */}
            <div className="mt-10 text-center text-sm text-gray-400">
              <span>
                Trusted by teams building digital products • Free initial
                consultation • 24h response time
              </span>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-blue-300/8 to-cyan-400/8 border border-blue-300/30 rounded-2xl p-8 md:p-12 overflow-hidden shadow-lg shadow-black/30"
            style={{ transform: "translateZ(0)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Ideas Into Reality?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Whether you need Web Development, Mobile Apps, AI/ML Solutions,
                or Cloud Infrastructure - we're here to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    if (typeof onNavigate === "function")
                      onNavigate("contacts");
                  }}
                  className="px-8 py-4 bg-transparent border-2 border-cyan-300/50 hover:border-cyan-300 text-cyan-300 font-semibold rounded-full transition-all duration-300 hover:bg-cyan-300/10"
                >
                  View Contact Info
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                Quick response within 24 hours • Free consultation • Flexible
                engagement models
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center max-h-[90vh]"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => {
                closeModal();
                setShowSidebar(false);
              }}
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative z-50 max-w-4xl w-full mx-4 md:mx-0 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{ transform: "translateZ(0)", contain: "paint" }}
            >
              <div className="h-56 bg-gray-800">
                <img
                  src={getImageUrl(selectedService)}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  decoding="async"
                  loading="lazy"
                  width="1200"
                  height="600"
                />
              </div>

              <div className="p-6 md:p-8 relative flex-1 overflow-y-auto no-scrollbar">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedService.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {selectedService.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      closeModal();
                      setShowSidebar(false);
                    }}
                    aria-label="Close modal"
                    className="ml-4"
                  >
                    <X className="w-6 h-6 text-gray-300" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm text-cyan-400 mb-4">
                      Relevant Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.techStack.length > 0 ? (
                        selectedService.techStack.map((t, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-blue-300"
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <div className="text-gray-400">
                          Tech stack will be scoped with you.
                        </div>
                      )}
                    </div>

                    <div className="mt-8">
                      <h4 className="text-sm text-cyan-400 mb-4">
                        Deliverables
                      </h4>
                      <ul className="list-inside space-y-2 text-sm text-gray-200">
                        {selectedService.deliverables.length > 0 ? (
                          selectedService.deliverables.map((d, i) => (
                            <li key={i}>• {d}</li>
                          ))
                        ) : (
                          <li className="text-gray-400">
                            Deliverables defined after scoping.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-cyan-400 mb-4">
                      Outcomes & Timeline
                    </h4>
                    <div className="text-sm text-gray-200">
                      {selectedService.businessOutcomes.length > 0 ? (
                        <ul className="list-inside space-y-2 mb-3">
                          {selectedService.businessOutcomes.map((b, i) => (
                            <li key={i}>• {b}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-gray-400 mb-2">
                          Outcomes defined in discovery.
                        </div>
                      )}

                      <div className="text-gray-300">
                        <strong>Typical timeline:</strong>{" "}
                        {selectedService.timeline || "TBD"}
                      </div>
                      {selectedService.startingFrom && (
                        <div className="text-gray-300">
                          <strong>Starting from:</strong>{" "}
                          {selectedService.startingFrom}
                        </div>
                      )}
                    </div>

                    <div className="mt-8">
                      <h4 className="text-sm text-cyan-400 mb-4">Support</h4>
                      <div className="text-sm text-gray-200">
                        {selectedService.support ||
                          "30 days bug-fix warranty + optional maintenance plans."}
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal CTAs */}
                <div className="mt-10 mb-6 flex gap-3">
                  {selectedService.proofPoints &&
                    selectedService.proofPoints.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          // optional: navigate to a case study page if you have one
                          if (onNavigate) onNavigate("case-studies");
                        }}
                        className="px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-500 text-black font-medium"
                      >
                        View case study
                      </button>
                    )}

                  <button
                    type="button"
                    onClick={() => {
                      closeModal();
                      setShowSidebar(false);
                      if (onNavigate) onNavigate("contacts");
                    }}
                    className="px-4 py-2 rounded-full bg-transparent border border-cyan-300 text-cyan-300"
                  >
                    Book scoping call
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
