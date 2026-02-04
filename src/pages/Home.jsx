// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Services from "../sections/Services";
import Projects from "../sections/Projects";
import Team from "../sections/Team";
import Contacts from "../sections/Contacts";

function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [prevSection, setPrevSection] = useState(null);
  const transitionMs = 700;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setPrefersReducedMotion(Boolean(mq.matches));
    const handler = (e) => setPrefersReducedMotion(Boolean(e.matches));
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  const handleNavigate = (to) => {
    if (to === activeSection) return;
    setPrevSection(activeSection);
    setActiveSection(to);

    // we'll clear prevSection on transitionend (see effect below)
    if (prefersReducedMotion || transitionMs === 0) {
      // fallback: clear after transitionMs
      window.setTimeout(() => setPrevSection(null), transitionMs + 50);
    }
  };

  const sections = {
    hero: { Component: Hero },
    services: { Component: Services },
    projects: { Component: Projects },
    team: { Component: Team },
    contacts: { Component: Contacts },
  };

  // When activeSection changes, wait for the **new** section to finish its opacity transition.
  useEffect(() => {
    if (prefersReducedMotion) {
      // immediate fallback
      setPrevSection(null);
      return;
    }

    // find the new active DOM node
    // we mark each section wrapper with data-section="{key}"
    const el = document.querySelector(`[data-section="${activeSection}"]`);
    if (!el) {
      // safety fallback
      window.setTimeout(() => setPrevSection(null), transitionMs + 150);
      return;
    }

    let cleared = false;
    const onTransitionEnd = (ev) => {
      // only respond to opacity finishing
      if (ev.propertyName !== "opacity") return;
      if (cleared) return;
      cleared = true;
      setPrevSection(null);
      el.removeEventListener("transitionend", onTransitionEnd);
    };

    // in case transitionend doesn't fire (some browser edge-cases), fallback
    const fallback = setTimeout(() => {
      if (cleared) return;
      cleared = true;
      setPrevSection(null);
      el.removeEventListener("transitionend", onTransitionEnd);
    }, transitionMs + 200);

    el.addEventListener("transitionend", onTransitionEnd);

    return () => {
      clearTimeout(fallback);
      try { el.removeEventListener("transitionend", onTransitionEnd); } catch {}
    };
  }, [activeSection, prefersReducedMotion, transitionMs]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* No background here — background is provided by BackgroundLayer (portal) */}

      {/* Navbar */}
      {activeSection !== "hero" && (
        <div className="relative z-50">
          <Navbar activeSection={activeSection} setActiveSection={handleNavigate} />
        </div>
      )}

      {/* Sections: opacity-only transitions */}
      <div className="relative z-10 h-screen w-full">
        {Object.entries(sections).map(([key, { Component }]) => {
          const isActive = activeSection === key;
          const isPrev = prevSection === key;
          const visible = isActive || isPrev;

          const transitionClass = prefersReducedMotion
            ? "transition-none"
            : "transition-opacity duration-700 ease-out";

          return (
            <div
              key={key}
              data-section={key} /* used by effect above */
              className={`absolute inset-0 ${transitionClass}`}
              style={{
                zIndex: isActive ? 40 : isPrev ? 30 : 10,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                transform: "translateZ(0)", // GPU layer
                willChange: "opacity",
                visibility: visible ? "visible" : "hidden",
              }}
              aria-hidden={!visible}
            >
              <Component onNavigate={handleNavigate} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
