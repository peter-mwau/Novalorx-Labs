// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import AboutUs from "../sections/AboutUs";
import Services from "../sections/Services";
import Projects from "../sections/Projects";
import Team from "../sections/Team";
import Contacts from "../sections/Contacts";

function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [prevSection, setPrevSection] = useState(null);
  const transitionMs = 700;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 🔊 background audio ref
  const bgAudioRef = useRef(null);
  const audioStartedRef = useRef(false);

  // scroll / swipe control refs
  const isAnimating = useRef(false); // locks while a transition is in progress
  const wheelAccum = useRef(0);
  const lastWheelTime = useRef(0);
  const touchStartY = useRef(null);
  const sectionOrder = [
    "hero",
    "about",
    "services",
    "projects",
    "team",
    "contacts",
  ];

  // detect reduced motion preference
  useEffect(() => {
    const mq =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(Boolean(mq.matches));
    const handler = (e) => setPrefersReducedMotion(Boolean(e.matches));
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  // 🔊 Background audio autoplay on first user interaction
  useEffect(() => {
    const tryPlayAudio = async () => {
      if (audioStartedRef.current) return;

      const audio = bgAudioRef.current;
      if (!audio) return;

      try {
        audio.volume = 0.15; // adjust volume here
        audio.loop = true;

        await audio.play();
        audioStartedRef.current = true;
      } catch {
        // autoplay blocked until user interacts (normal browser behavior)
      }
    };

    // Try immediately (may fail if browser blocks autoplay)
    tryPlayAudio();

    // Then retry after first user interaction
    const events = ["click", "touchstart", "keydown", "wheel"];
    events.forEach((ev) =>
      window.addEventListener(ev, tryPlayAudio, { passive: true }),
    );

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, tryPlayAudio));
    };
  }, []);

  const handleNavigate = (to) => {
    if (to === activeSection) return;
    setPrevSection(activeSection);
    setActiveSection(to);

    // fallback clearing handled elsewhere (transitionend effect)
    if (prefersReducedMotion || transitionMs === 0) {
      window.setTimeout(() => setPrevSection(null), transitionMs + 50);
    }
  };

  // helper: find nearest scrollable ancestor (overflow:auto/scroll)
  const findScrollableAncestor = (el, rootContainer) => {
    let cur = el;
    while (cur && cur !== document.body && cur !== rootContainer) {
      try {
        const style = window.getComputedStyle(cur);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          cur.scrollHeight > cur.clientHeight
        ) {
          return cur;
        }
      } catch {
        // ignore (SVG, non-HTMLElements)
      }
      cur = cur.parentNode;
    }
    return null;
  };

  const canScroll = (el, dir) => {
    if (!el) return false;
    // dir: >0 means scroll down (content moves up), <0 means scroll up
    if (dir > 0) {
      return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    } else {
      return el.scrollTop > 1;
    }
  };

  // compute neighbor section index with bounds
  const getAdjacentSection = (dir) => {
    const idx = sectionOrder.indexOf(activeSection);
    if (idx === -1) return null;
    const next = idx + dir;
    if (next < 0 || next >= sectionOrder.length) return null;
    return sectionOrder[next];
  };

  // wheel handler
  useEffect(() => {
    if (prefersReducedMotion) return; // respect reduced motion preference

    const rootContainer =
      document.querySelector(".home-scroll-root") || document.body;
    const threshold = 60; // accumulate deltaY until threshold
    const cooldown = transitionMs + 150; // lock duration after navigation

    const onWheel = (e) => {
      // if animation in progress, ignore
      if (isAnimating.current) return;

      // If pointer is inside a scrollable element that can still scroll in this direction, don't navigate
      const scrollable = findScrollableAncestor(e.target, rootContainer);
      const dir = Math.sign(e.deltaY || 0); // 1 = down, -1 = up
      if (scrollable && canScroll(scrollable, dir)) {
        wheelAccum.current = 0;
        return;
      }

      // throttle rapid successive events: reset if pauses > 200ms
      const now = performance.now();
      if (now - lastWheelTime.current > 250) {
        wheelAccum.current = 0;
      }
      lastWheelTime.current = now;

      wheelAccum.current += e.deltaY;

      // require a reasonable accumulated scroll (avoid accidental small scrolls)
      if (Math.abs(wheelAccum.current) >= threshold) {
        const direction = wheelAccum.current > 0 ? 1 : -1;
        const target = getAdjacentSection(direction);
        if (target) {
          isAnimating.current = true;
          handleNavigate(target);
          // unlock after a cooldown to match transition duration
          window.setTimeout(() => {
            isAnimating.current = false;
          }, cooldown);
        }
        wheelAccum.current = 0;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { passive: true });
    };
  }, [activeSection, prefersReducedMotion]); // rebind when activeSection changes

  // touch (swipe) handler for mobile
  useEffect(() => {
    if (prefersReducedMotion) return;

    const rootContainer =
      document.querySelector(".home-scroll-root") || document.body;
    const threshold = 50; // swipe px threshold
    const cooldown = transitionMs + 150;

    const onTouchStart = (e) => {
      if (isAnimating.current) return;
      touchStartY.current = e.touches?.[0]?.clientY ?? null;
    };

    const onTouchMove = (e) => {
      if (isAnimating.current) return;
      if (touchStartY.current == null) return;
      const y = e.touches?.[0]?.clientY ?? 0;
      const delta = touchStartY.current - y; // positive -> swipe up (go next)
      // if pointer is inside scrollable area that can still scroll, ignore
      const scrollable = findScrollableAncestor(e.target, rootContainer);
      const dir = Math.sign(delta);
      if (scrollable && canScroll(scrollable, dir)) {
        return;
      }

      if (Math.abs(delta) > threshold) {
        const direction = delta > 0 ? 1 : -1;
        const target = getAdjacentSection(direction);
        if (target) {
          isAnimating.current = true;
          handleNavigate(target);
          window.setTimeout(() => {
            isAnimating.current = false;
          }, cooldown);
        }
        touchStartY.current = null;
      }
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeSection, prefersReducedMotion]);

  // When activeSection changes, wait for the **new** section to finish its opacity transition.
  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPrevSection(null);
      return;
    }

    const el = document.querySelector(`[data-section="${activeSection}"]`);
    if (!el) {
      window.setTimeout(() => setPrevSection(null), transitionMs + 150);
      return;
    }

    let cleared = false;
    const onTransitionEnd = (ev) => {
      if (ev.propertyName !== "opacity") return;
      if (cleared) return;
      cleared = true;
      setPrevSection(null);
      el.removeEventListener("transitionend", onTransitionEnd);
    };

    const fallback = setTimeout(() => {
      if (cleared) return;
      cleared = true;
      setPrevSection(null);
      try {
        el.removeEventListener("transitionend", onTransitionEnd);
      } catch {
        // ignore error
      }
    }, transitionMs + 200);

    el.addEventListener("transitionend", onTransitionEnd);

    return () => {
      clearTimeout(fallback);
      try {
        el.removeEventListener("transitionend", onTransitionEnd);
      } catch {
        // ignore error
      }
    };
  }, [activeSection, prefersReducedMotion, transitionMs]);

  const sections = {
    hero: { Component: Hero },
    about: { Component: AboutUs },
    services: { Component: Services },
    projects: { Component: Projects },
    team: { Component: Team },
    contacts: { Component: Contacts },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden home-scroll-root">
      {/* 🔊 Background Sound */}
      <audio ref={bgAudioRef} src="/sounds/sacred.mp3" preload="auto" />

      {/* Navbar */}
      {activeSection !== "hero" && (
        <div className="relative z-50">
          <Navbar
            activeSection={activeSection}
            setActiveSection={handleNavigate}
          />
        </div>
      )}

      {/* Sections: opacity-only transitions */}
      <div className="relative z-10 h-screen w-full">
        {Object.entries(sections).map(([key, section]) => {
          const { Component } = section;
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
