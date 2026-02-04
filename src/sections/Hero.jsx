// src/sections/Hero.jsx
import { useState } from "react";
import { ChevronUp } from "lucide-react";

const Hero = ({ onNavigate }) => {
  const [navOpen, setNavOpen] = useState(false);

  const items = [
    { label: "SERVICES", section: "services" },
    { label: "PROJECTS", section: "projects" },
    { label: "TEAM", section: "team" },
    { label: "CONTACT", section: "contacts" },
  ];

  // helper classes for a less repaint-heavy overlay/drawer
  const overlayClass =
    "fixed inset-0 z-10 bg-black/40 transition-opacity duration-300 pointer-events-none";
  const drawerBaseClass =
    "fixed inset-x-0 bottom-0 z-20 bg-gray-900/90 border-t border-white/10 transition-transform duration-300";

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      // keep a small transform to ensure this section sits on its own layer when transitioning
      style={{ transform: "translateZ(0)", willChange: "opacity, transform" }}
    >
      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 text-center"
        style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white"
          style={{ letterSpacing: "0.35em", lineHeight: 1 }}
        >
          NOVALORX LABS
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 gap-3 sm:gap-0 w-full">
          <div className="hidden sm:block h-px bg-white w-32" />
          <p
            className="font-medium text-sm sm:text-base md:text-lg text-white px-4"
            style={{ letterSpacing: "0.35em" }}
          >
            Crafting Stellar Digital Experiences
          </p>
          <div className="hidden sm:block h-px bg-white w-32" />
        </div>

        {/* Desktop navbar — avoid backdrop-filter for perf; use translucent BG */}
        <nav
          className="hidden md:block absolute bottom-12 py-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.16)",
            borderRadius: 8,
            paddingLeft: 6,
            paddingRight: 6,
            transform: "translateZ(0)",
            willChange: "opacity, transform",
            backfaceVisibility: "hidden",
          }}
        >
          <ul className="flex items-center justify-center divide-x divide-white/20">
            {items.map((item) => (
              <li key={item.section} className="px-16">
                <button
                  onClick={() => onNavigate?.(item.section)}
                  className="uppercase tracking-widest font-medium text-white/80 hover:text-white transition"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile bottom button */}
      <button
        onClick={() => setNavOpen((v) => !v)}
        className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30
                   w-12 h-12 rounded-full
                   bg-gray-900/80 border border-white/20
                   flex items-center justify-center"
        aria-label="Toggle navigation"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        <ChevronUp
          className={`text-white transition-transform duration-300 ${navOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Overlay — always in DOM, toggled by opacity to avoid mount/unmount repaints */}
      <div
        className={overlayClass}
        style={{
          opacity: navOpen ? 1 : 0,
          pointerEvents: navOpen ? "auto" : "none",
          transform: "translateZ(0)",
        }}
        aria-hidden={!navOpen}
      />

      {/* Mobile nav drawer — always in DOM, sliding via transform */}
      <div
        className={drawerBaseClass}
        style={{
          transform: navOpen ? "translateY(0)" : "translateY(100%)",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        aria-hidden={!navOpen}
      >
        <ul className="flex flex-col items-center py-7 mb-15 space-y-6 border-b border-white/10">
          {items.map((item) => (
            <li key={item.section}>
              <button
                onClick={() => {
                  setNavOpen(false);
                  onNavigate?.(item.section);
                }}
                className="text-white uppercase tracking-widest text-sm"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hero;
