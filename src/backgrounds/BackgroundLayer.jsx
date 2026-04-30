// src/backgrounds/BackgroundLayer.jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import WebThreeRareBG from "./WebThreeRareBg-dark";

const BackgroundLayer = () => {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState(null);
  const containerRef = useRef(null);
  const parallaxRef = useRef({
    tx: 0,
    ty: 0,
    targetX: 0,
    targetY: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const rafRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // create container once
    if (!containerRef.current && typeof document !== "undefined") {
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.inset = "0";
      el.style.zIndex = "0";
      el.style.pointerEvents = "none";
      el.style.backgroundColor = "#0b0f14"; // fallback base color
      el.style.transform = "translateZ(0)";
      el.style.willChange = "transform";
      el.style.backfaceVisibility = "hidden";
      containerRef.current = el;
    }

    const container = containerRef.current;
    document.body.prepend(container);

    setContainer(container);
    setMounted(true);

    // cleanup on unmount
    return () => {
      if (container && container.parentNode)
        container.parentNode.removeChild(container);
      setMounted(false);
    };
  }, []);

  // Parallax loop (runs only inside portal)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let mounted = true;

    const onMove = (ev) => {
      const e = ev.touches?.[0] ?? ev;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5 || 0;
      const y = (e.clientY - r.top) / r.height - 0.5 || 0;
      parallaxRef.current.targetX = x * 12;
      parallaxRef.current.targetY = y * 8;
    };
    const onLeave = () => {
      parallaxRef.current.targetX = 0;
      parallaxRef.current.targetY = 0;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const tick = () => {
      const s = parallaxRef.current;
      s.tx += (s.targetX - s.tx) * 0.12;
      s.ty += (s.targetY - s.ty) * 0.12;
      s.offsetX *= 0.86;
      s.offsetY *= 0.86;

      const tx = Math.round((s.tx + s.offsetX) * 100) / 100;
      const ty = Math.round((s.ty + s.offsetY) * 100) / 100;

      if (el && mounted) {
        // only transform; do NOT change opacity/filters here
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // render the BG inside the pre-created container via portal (only after container is created)
  if (!mounted || !container) {
    return null;
  }

  return createPortal(
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        transform: "translate3d(0,0,0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      <WebThreeRareBG />
    </div>,
    container,
  );
};

export default BackgroundLayer;
