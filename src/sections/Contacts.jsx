// src/sections/Contacts.jsx
import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Clock2Icon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function Contacts() {
  const [time, setTime] = useState(new Date());
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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

  const getRotation = (value, max) => (value / max) * 360;

  const rings = [
    { label: "Year", value: time.getFullYear(), max: 100 },
    { label: "Month", value: time.getMonth() + 1, max: 12 },
    { label: "Day", value: time.getDate(), max: 31 },
    { label: "Hour", value: time.getHours(), max: 24 },
    { label: "Minute", value: time.getMinutes(), max: 60 },
    { label: "Second", value: time.getSeconds(), max: 60 },
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative min-h-screen text-white overflow-hidden">

      {/* Floating Social Icons (hidden on small screens) */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-4">
        {[Github, Linkedin, Twitter].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-11 h-11 flex items-center justify-center rounded-full
                       bg-gray-900/70 border border-cyan-400/30
                       hover:bg-cyan-400 hover:text-black
                       transition-all duration-300"
            aria-label={`social-${i}`}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-20 flex-col gap-4">
        {[Phone, Mail, FaWhatsapp].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-11 h-11 flex items-center justify-center rounded-full
                       bg-gray-900/70 border border-cyan-400/30
                       hover:bg-cyan-400 hover:text-black
                       transition-all duration-300"
            aria-label={`social-left-${i}`}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      {/* Page content container — header + main area that fills viewport */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-h-[calc(90vh-4rem)] flex flex-col">
        {/* Header (fixed-ish height) */}
        <div className="relative mt-8 mb-16 h-28 sm:h-32 flex items-center justify-center">
          {/* Background text */}
          <h2
            className="absolute inset-0 flex items-center justify-center text-center text-7xl sm:text-8xl md:text-9xl font-extrabold text-white/10 uppercase tracking-widest
                        pointer-events-none select-none"
          >
            Our Contact
          </h2>

          {/* Foreground text */}
          <h3 className="text-gray-400 relative z-10 text-3xl md:text-4xl tracking-widest backdrop-blur-sm rounded-3xl">
            Get in Touch
          </h3>
        </div>

        {/* Main area — ONLY scrollable on small screens; fixed (no scroll) on md+ */}
        <div
          className="flex-1 w-full flex flex-col lg:flex-row gap-6 items-stretch
                        overflow-auto md:overflow-hidden"
        >
          {/* Left column: compact rings + contact info (1/3 width on lg) */}
          <div className="lg:w-1/3 flex flex-col gap-4 p-2">
            {/* Compact time rings row (wrap if needed) */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {rings.map((ring, i) => {
                const rotation = getRotation(ring.value % ring.max, ring.max);
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 border border-gray-700 bg-gray-900/40 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle
                          cx="50"
                          cy="50"
                          r="48"
                          stroke="#111827"
                          strokeWidth="3"
                          fill="none"
                        />
                        <g
                          style={{
                            transform: `rotate(${rotation}deg)`,
                            transformOrigin: "50% 50%",
                            transition: "transform 0.6s linear",
                          }}
                        >
                          {[...Array(Math.min(ring.max, 8))].map((_, n) => (
                            <rect
                              key={n}
                              x="48"
                              y="6"
                              width="4"
                              height="6"
                              fill="#60a5fa"
                              transform={`rotate(${(360 / Math.min(ring.max, 8)) * n} 50 50)`}
                            />
                          ))}
                        </g>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-blue-300 font-semibold text-sm">
                        {String(ring.value).slice(-2)}
                      </div>
                    </div>
                    <span className="mt-1 text-[10px] text-gray-400">
                      {ring.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Contact Info box */}
            <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-gray-700 mt-2 flex-1">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Contact Information
              </h3>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Mail className="text-blue-300" />
                  <span>hello@nyota.tech</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-blue-300" />
                  <span>+254 700 123 456</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-blue-300" />
                  <span>Nairobi, Kenya</span>
                </div>

                <div className="pt-4 border-t border-gray-800 mt-4 text-xs text-gray-400">
                  <p className="mb-2 flex items-start gap-2">
                    <Clock2Icon className="mt-1 text-blue-300" />{" "}
                    <span>Office Hours: Mon–Fri, 9:00–17:00 (EAT)</span>
                  </p>
                  <p className="mt-2">
                    We typically reply within 1–2 business days. For urgent
                    matters use the phone/WhatsApp number above.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: form — takes remaining width and becomes vertically scrollable on small screens if needed */}
          <div className="lg:col-span-2 lg:w-2/3 p-2 flex flex-col">
            <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 md:p-6 h-full flex flex-col">
              <div className="mb-2">
                <h3 className="text-2xl font-semibold text-blue-300 mb-3">
                  Send a Message
                </h3>

                {/* Inputs arranged horizontally on md+ to save vertical space */}
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                >
                  <div className="md:col-span-1">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:border-blue-300 outline-none text-sm"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:border-blue-300 outline-none text-sm"
                    />
                  </div>

                  {/* Message spans full width but is shorter */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:border-blue-300 outline-none text-sm resize-vertical"
                    />
                  </div>

                  {/* Buttons area — aligned to the right on larger screens */}
                  <div className="md:col-span-2 flex items-center justify-between gap-3 mt-1">
                    <div className="text-sm text-gray-400 hidden md:block">
                      Prefer email?{" "}
                      <a
                        href="mailto:hello@nyota.tech"
                        className="text-blue-300 underline"
                      >
                        hello@nyota.tech
                      </a>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        type="submit"
                        className="bg-blue-300 text-black font-semibold px-4 md:px-6 py-2 rounded-lg hover:bg-blue-200 transition text-sm"
                      >
                        Send Message
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setForm({ name: "", email: "", message: "" });
                        }}
                        className="px-3 py-2 rounded-md border border-gray-700 text-gray-200 text-sm"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Professional CTA for Quotation */}
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <div className="bg-gradient-to-r from-blue-300/10 to-cyan-400/10 rounded-xl p-4 md:p-6 border border-blue-300/20">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-blue-300 mb-2">
                        Need a Custom Project Quote?
                      </h4>
                      <p className="text-sm text-gray-300">
                        Get a detailed quotation tailored to your project
                        requirements. Fill out our quick form and we'll get back
                        to you within 24 hours.
                      </p>
                    </div>
                    <button
                      data-tally-open="gDGZ5K"
                      data-tally-layout="modal"
                      data-tally-overlay="1"
                      data-tally-emoji-text="👋"
                      data-tally-emoji-animation="tada"
                      className="group flex-shrink-0 bg-blue-300 hover:bg-blue-400 text-black font-semibold 
                               px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105
                               shadow-lg hover:shadow-blue-300/50 flex items-center gap-2"
                    >
                      <span>Request Quote</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* small footer row (visible on small screens) */}
              <div className="mt-auto text-xs text-gray-400 md:hidden pt-4">
                Prefer email?{" "}
                <a
                  href="mailto:hello@nyota.tech"
                  className="text-blue-300 underline"
                >
                  hello@nyota.tech
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Small bottom spacing so footer isn't flush with viewport bottom */}
        <div className="h-6" />
      </div>
    </section>
  );
}

export default Contacts;
