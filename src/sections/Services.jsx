// src/sections/Services.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import servicesData from "../constants/services";
import { coder, cloud, ml, web3, mobile } from "../assets/images";
import {
  Code2,
  Cloud,
  Brain,
  Smartphone,
  Terminal,
  X,
  ArrowRightFromLineIcon,
  BlocksIcon,
} from "lucide-react";

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
const services = servicesData.services.map((s) => {
  const techStack = s.tech_stack ? Object.values(s.tech_stack).flat() : [];
  return {
    id: s.id,
    title: s.name,
    description: s.description,
    image: imageMap[s.id] || "",
    imageKeyword: s.offerings?.[0] || s.tags?.[0] || s.name,
    techStack,
    offerings: s.offerings || [],
    tags: s.tags || [],
    useCases: s.use_cases || [],
    deliveryModel: s.delivery_model || [],
    icon: iconMap[s.id] || Code2,
  };
});
const loopedServices = [...services, ...services];

const Services = ({ onNavigate }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);

  const getImageUrl = (service) => {
    if (service.image && typeof service.image === "string" && service.image !== "") {
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

  // Tally embed script loader
  useEffect(() => {
    const ensureTally = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
        return;
      }
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
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
    <section className="relative w-full min-h-screen overflow-hidden text-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* Floating Sidebar Button */}
      <button
        onClick={() => setShowSidebar((v) => !v)}
        className="fixed right-4 top-1/2 z-50 bg-blue-300 hover:bg-blue-400 text-black p-3 rounded-full shadow-lg"
        title="View Service Details"
        style={{ transform: "translateZ(0)" }}
      >
        <Terminal className="w-5 h-5" />
      </button>

      {/* Sidebar Panel — replaced heavy backdrop-filter with translucent BG */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: showSidebar ? 0 : "100%" }}
        transition={{ duration: 0.35 }}
        className="fixed top-0 right-0 h-full w-80 z-60 p-6 overflow-y-auto"
        style={{
          backgroundColor: "rgba(17,24,39,0.86)", // dark translucent
          borderLeft: "1px solid rgba(255,255,255,0.04)",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
          contain: "paint", // isolate painting in supporting browsers
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-100 text-2xl font-bold text-center">Service Details</h3>
          <button onClick={() => setShowSidebar(false)} aria-label="Close details">
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {!selectedService && (
          <div className="text-sm text-gray-400 mb-4">
            Open any service card to view its offerings, tags, use cases and delivery model.
          </div>
        )}

        {selectedService && (
          <>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white mt-1">{selectedService.title}</h4>
              <p className="text-sm text-gray-300 mt-2">{selectedService.description}</p>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">Offerings</h5>
              <ul className="list-inside space-y-2 text-sm text-gray-200">
                {selectedService.offerings.length > 0 ? (
                  selectedService.offerings.map((o, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-cyan-300">•</span>
                      <span>{o}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No offerings listed.</li>
                )}
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">Tags</h5>
              <div className="flex flex-wrap gap-2">
                {selectedService.tags.length > 0 ? (
                  selectedService.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-blue-300">
                      {tag}
                    </span>
                  ))
                ) : (
                  <div className="text-gray-400">No tags.</div>
                )}
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">Use Cases</h5>
              <ul className="list-inside space-y-2 text-sm text-gray-200">
                {selectedService.useCases.length > 0 ? (
                  selectedService.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-cyan-300">•</span>
                      <span>{uc}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No use cases specified.</li>
                )}
              </ul>
            </div>

            {/* Delivery Model */}
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-blue-300 mb-2">Delivery Model</h5>
              <div className="flex flex-col gap-2">
                {selectedService.deliveryModel.length > 0 ? (
                  selectedService.deliveryModel.map((dm, i) => (
                    <span key={i} className="text-sm px-3 py-2 rounded-md bg-gray-800/60 border border-gray-700 text-gray-200">
                      {dm}
                    </span>
                  ))
                ) : (
                  <div className="text-gray-400">No delivery model listed.</div>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="relative mt-2 mb-16 h-28 sm:h-32 flex items-center justify-center">
          <h2 className="absolute inset-0 flex items-center justify-center text-center text-7xl sm:text-8xl md:text-9xl font-extrabold text-white/10 uppercase tracking-widest pointer-events-none select-none">
            Expertise
          </h2>

          <h3 className="text-gray-400 relative z-10 text-3xl md:text-4xl tracking-widest rounded-3xl">
            Our Features Services
          </h3>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-scroll no-scrollbar touch-none select-none"
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
                className="cursor-pointer flex-shrink-0 w-[320px] md:w-[360px] bg-[rgba(17,24,39,0.6)] border border-gray-700 rounded-xl overflow-hidden shadow-lg"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openModalFor(i);
                }}
                style={{ transform: "translateZ(0)" }}
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
                  <div className="w-12 h-12 mt-4 mb-6 flex items-center justify-center rounded-md bg-blue-300/10">
                    <Icon className="w-7 h-7 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                  <p className="text-sm text-blue-300 mt-4 hover:text-blue-300">
                    Learn More <ArrowRightFromLineIcon className="w-4 h-4 inline ml-1" />
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-blue-300/8 to-cyan-400/8 border border-blue-300/30 rounded-2xl p-8 md:p-12 overflow-hidden"
            style={{ transform: "translateZ(0)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Ideas Into Reality?
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Whether you need Web Development, Mobile Apps, AI/ML Solutions, or Cloud Infrastructure - we're here to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  data-tally-open="wLDjAq"
                  data-tally-width="600"
                  data-tally-emoji-text="👋"
                  data-tally-emoji-animation="wave"
                  data-tally-auto-close="3000"
                  className="group px-8 py-4 bg-blue-300 hover:bg-blue-400 text-black font-semibold rounded-full 
                           transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-300/50 flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRightFromLineIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    if (typeof onNavigate === "function") onNavigate("contacts");
                  }}
                  className="px-8 py-4 bg-transparent border-2 border-blue-300/50 hover:border-blue-300 text-blue-300 font-semibold rounded-full transition-all duration-300 hover:bg-blue-300/10"
                >
                  View Contact Info
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-6">
                ⚡ Quick response within 24 hours • 🔒 Free consultation • 💼 Flexible engagement models
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal — still in DOM, uses overlay + transform */}
      {showModal && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
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
            className="relative z-50 max-w-3xl w-full mx-4 md:mx-0 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
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

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedService.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedService.description}</p>
                </div>
                <button onClick={() => { closeModal(); setShowSidebar(false); }} aria-label="Close modal" className="ml-4">
                  <X className="w-6 h-6 text-gray-300" />
                </button>
              </div>

              <div className="mt-4">
                <h4 className="text-sm text-gray-400 mb-2">Relevant Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.techStack.map((t, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-800/60 border border-gray-700 text-blue-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    closeModal();
                    setShowSidebar(false);
                    if (typeof onNavigate === "function") onNavigate("contacts");
                  }}
                  aria-label="Get in touch"
                  className="px-4 py-2 rounded-full bg-blue-300 text-black font-medium"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Services;
