// src/sections/AboutUs.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, Users, Shield } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const containerStagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

// 🔥 Titles to rotate
const titles = [
  "About Novalorx Labs",
  "Product Engineering Studio",
  "Web3, AI & Mobile Experts",
  "We Build Scalable Digital Products",
  "Your Long-Term Tech Partner",
];

const metrics = [
  { label: "Years operating", value: "3+" },
  { label: "Projects delivered", value: "10+" },
  { label: "Avg. response time", value: "24 hrs" },
];

const team = [
  {
    name: "Peter Kyale",
    role: "Co-Founder & Web3 Lead",
    bio: "Leads blockchain strategy and development, focusing on scalable decentralized applications.",
  },
  {
    name: "Michael Kimani",
    role: "Co-Founder & ML & AI Lead",
    bio: "Specializes in machine learning solutions that drive intelligent product features and data insights.",
  },
  {
    name: "Norman Gitonga",
    role: "Co-Founder & Design Lead",
    bio: "Oversees user experience and interface design, ensuring products are intuitive and user-centric.",
  },
  {
    name: "Clifford Adoyo",
    role: "Co-Founder & Android Lead",
    bio: "Heads Android development, delivering high-performance mobile applications on the Android platform.",
  },
];

const caseStudies = [
  {
    title: "Marketplace Modernization",
    summary:
      "Delivered a modern, resilient marketplace with near real-time analytics and a 2x conversion improvement (client-reported).",
    link: "#",
  },
  {
    title: "AI-Powered Insights",
    summary:
      "Built an ML pipeline and dashboard that turned raw data into actionable metrics used by the executive team daily.",
    link: "#",
  },
  {
    title: "Mobile & Web Replatform",
    summary:
      "Replatformed legacy platform into a progressive web and native app while reducing infra cost and improving load times.",
    link: "#",
  },
];

export default function AboutUs({ onNavigate }) {
  const [typedTitle, setTypedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    let timeout;

    const currentTitle = titles[titleIndex];

    // 🔥 Controls
    const typingSpeed = 85;
    const deletingSpeed = 45;
    const pauseAfterTyping = 1400;
    const pauseAfterDeleting = 600;

    if (!isDeleting && typedTitle.length < currentTitle.length) {
      // typing forward
      timeout = setTimeout(() => {
        setTypedTitle(currentTitle.slice(0, typedTitle.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && typedTitle.length === currentTitle.length) {
      // pause when full title typed
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyping);
    } else if (isDeleting && typedTitle.length > 0) {
      // deleting backward
      timeout = setTimeout(() => {
        setTypedTitle(currentTitle.slice(0, typedTitle.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && typedTitle.length === 0) {
      // move to next title after delete pause
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }, pauseAfterDeleting);
    }

    return () => clearTimeout(timeout);
  }, [typedTitle, isDeleting, titleIndex]);

  return (
    <section
      className="relative w-full h-screen overflow-auto text-white hide-scrollbar"
      style={{ transform: "translateZ(0)" }}
      aria-labelledby="about-title"
    >
      {/* hide-scrollbar styles */}
      <style>{`
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* blinking cursor */}
      <style>{`
        .blinking-cursor {
          display: inline-block;
          width: 1ch;
          animation: blink 1s step-end infinite;
          color: white;
        }
        @keyframes blink {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        {/* Header */}
        <motion.header
          initial="initial"
          animate="animate"
          variants={containerStagger}
          className="space-y-4 h-screen flex flex-col justify-center"
        >
          <motion.h1
            id="about-title"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
          >
            {typedTitle}
            <span className="blinking-cursor">|</span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-lg text-gray-300 max-w-3xl">
            Novalorx Labs was founded to build a different kind of product studio —
            one that puts outcomes before technology choices and partners with clients
            as an extension of their team. We focus on clarity, measurable impact, and
            predictable delivery.
          </motion.p>

          {/* Metrics row */}
          <motion.div variants={fadeIn} className="flex gap-6 mt-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="flex-1 bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-lg p-4 text-center"
              >
                <div className="text-2xl font-bold text-white">{m.value}</div>
                <div className="text-xs text-gray-400 mt-1">{m.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.header>

        {/* What we do */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={containerStagger}
          className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-b from-gray-900/90 to-black/80"
        >
          <div className="max-w-7xl mx-auto px-6 py-20 space-y-6 min-h-screen flex flex-col justify-center">
            <motion.h2 variants={fadeIn} className="text-2xl font-bold">
              What we do — product engineering & strategic partnerships
            </motion.h2>

            <motion.p variants={fadeIn} className="text-gray-300 max-w-3xl">
              We deliver end-to-end digital products: discovery & strategy, UX/UI design,
              scalable engineering, machine learning, and cloud-native operations.
              We partner with ambitious startups and enterprise teams to ship product
              features that move the needle.
            </motion.p>

            <motion.ul
              variants={containerStagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <Check className="w-5 h-5" />,
                  title: "NDA & Security-first",
                  body: "We sign NDAs and follow secure coding practices.",
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: "Rapid prototypes",
                  body: "Clickable prototypes in 1–3 weeks to validate direction.",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Dedicated teams",
                  body: "Small cross-functional pods aligned to outcomes.",
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "Operational excellence",
                  body: "Monitoring, SLAs and post-launch support options.",
                },
              ].map((b, i) => (
                <motion.li
                  key={i}
                  variants={fadeIn}
                  className="flex items-start gap-4 bg-white/5 border border-white/10 p-4 rounded-lg"
                >
                  <div className="p-2 rounded-md bg-white/10 text-blue-300">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{b.title}</h4>
                    <p className="text-gray-300 text-sm mt-1">{b.body}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>

        {/* Process */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={containerStagger}
          className="space-y-6 h-screen"
        >
          <motion.h3 variants={fadeIn} className="text-xl font-bold">
            Our process — predictable, transparent, iterative
          </motion.h3>

          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: "Discover", desc: "Problem framing, stakeholder workshops, and KPIs." },
              { step: "Design", desc: "Rapid UX explorations and validated prototypes." },
              { step: "Build", desc: "Engineering sprints, test-first and CI-driven delivery." },
              { step: "Scale", desc: "Observability, ops and growth engineering." },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-lg p-4"
              >
                <div className="text-sm text-blue-300 font-semibold mb-2">{s.step}</div>
                <div className="text-gray-300 text-sm">{s.desc}</div>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Engagement + Security */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={containerStagger}
          className="space-y-6 h-screen"
        >
          <motion.h3 variants={fadeIn} className="text-xl font-bold">
            Engagement models
          </motion.h3>

          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-white/6 bg-[rgba(255,255,255,0.02)]">
              <h4 className="font-semibold">Fixed scope</h4>
              <p className="text-gray-300 text-sm mt-2">
                Ideal for well-defined products and short engagements.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-white/6 bg-[rgba(255,255,255,0.02)]">
              <h4 className="font-semibold">Time & material</h4>
              <p className="text-gray-300 text-sm mt-2">
                Flexible delivery for evolving scope and R&D projects.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-white/6 bg-[rgba(255,255,255,0.02)]">
              <h4 className="font-semibold">Dedicated team</h4>
              <p className="text-gray-300 text-sm mt-2">
                Long-term partnership with a dedicated engineering pod.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-lg p-4"
          >
            <h4 className="font-semibold mb-2">Security & compliance</h4>
            <p className="text-gray-300 text-sm mb-3">
              OWASP-aware development, threat modeling during design, encrypted storage & transport,
              and scoped access controls. We sign NDAs and can support data handling agreements.
            </p>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Secure coding & code reviews</li>
              <li>• Automated tests, CI checks & static analysis</li>
              <li>• Environment isolation & secrets management</li>
            </ul>
          </motion.div>
        </motion.section>

        {/* Case studies */}
        <motion.section initial="initial" animate="animate" variants={containerStagger} className="space-y-6">
          <motion.h3 variants={fadeIn} className="text-2xl font-bold">
            Selected case studies
          </motion.h3>

          <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((c, i) => (
              <article
                key={i}
                className="rounded-lg border border-white/6 bg-[rgba(255,255,255,0.02)] p-5"
              >
                <h4 className="font-semibold text-white mb-2">{c.title}</h4>
                <p className="text-gray-300 text-sm mb-4">{c.summary}</p>

                <div className="flex items-center justify-between">
                  <a href={c.link} className="text-sm text-blue-300 hover:underline">
                    Read case study
                  </a>

                  <button
                    onClick={() => onNavigate?.("contacts")}
                    className="text-sm px-3 py-1 rounded bg-white/5 border border-white/6"
                  >
                    Talk to us
                  </button>
                </div>
              </article>
            ))}
          </motion.div>
        </motion.section>

        {/* Testimonials */}
        <motion.section initial="initial" animate="animate" variants={containerStagger} className="space-y-6">
          <motion.h3 variants={fadeIn} className="text-2xl font-bold">
            What our partners say
          </motion.h3>

          <motion.blockquote
            variants={fadeIn}
            className="bg-[rgba(255,255,255,0.02)] border border-white/6 p-6 rounded-lg"
          >
            <p className="text-gray-300 italic">
              “Working with Novalorx Labs turned our idea into a product we’re proud of — they removed ambiguity,
              shipped quickly and helped us focus on metrics that matter.”
            </p>
            <footer className="mt-4 text-sm text-gray-400">
              — Product Lead, Growing Marketplace
            </footer>
          </motion.blockquote>
        </motion.section>

        {/* Trusted logos */}
        <motion.section initial="initial" animate="animate" variants={containerStagger} className="space-y-4 h-screen">
          <motion.h4 variants={fadeIn} className="text-lg font-semibold">
            Trusted by
          </motion.h4>

          <motion.div variants={fadeIn} className="flex gap-4 items-center">
            <div className="h-8 bg-white/5 rounded px-3 flex items-center justify-center text-xs text-gray-300">
              Client A
            </div>
            <div className="h-8 bg-white/5 rounded px-3 flex items-center justify-center text-xs text-gray-300">
              Client B
            </div>
            <div className="h-8 bg-white/5 rounded px-3 flex items-center justify-center text-xs text-gray-300">
              Client C
            </div>
          </motion.div>
        </motion.section>

        {/* Team */}
        <motion.section initial="initial" animate="animate" variants={containerStagger} className="space-y-6 h-screen">
          <motion.h3 variants={fadeIn} className="text-2xl font-bold">
            Leadership & core team
          </motion.h3>

          <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/6 bg-[rgba(255,255,255,0.02)] p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-sm text-gray-300">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div>
                    <div className="font-semibold text-white">{m.name}</div>
                    <div className="text-sm text-gray-400">{m.role}</div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mt-4">{m.bio}</p>
              </div>
            ))}
          </motion.div>
        </motion.section>

        {/* Final CTA + FAQ */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={containerStagger}
          className="space-y-6 mb-24 h-screen"
        >
          <motion.h3 variants={fadeIn} className="text-2xl font-bold">
            Ready to move forward?
          </motion.h3>

          <motion.p variants={fadeIn} className="text-gray-300">
            We start with a short scoping call to align on objectives, constraints and success metrics.
            After that we propose a discovery sprint or a rapid prototype — whichever best reduces risk
            and maximizes learning.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate?.("contacts")}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-black font-semibold"
            >
              Schedule scoping call
            </button>

            <button
              onClick={() => onNavigate?.("services")}
              className="px-6 py-3 border border-white/10 rounded-lg text-white"
            >
              Explore services
            </button>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Common questions</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>
                  <strong>How long until a prototype?</strong> Usually 1–3 weeks depending on scope.
                </li>
                <li>
                  <strong>Do you sign NDAs?</strong> Yes — NDAs and data handling agreements on request.
                </li>
                <li>
                  <strong>Engagement models?</strong> Fixed-price, T&M, or dedicated teams — we recommend after scoping.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Risk reduction & guarantees</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Predictable milestones & demos every sprint</li>
                <li>• Contract terms that align incentives</li>
                <li>• Free initial diagnostic & scoping session</li>
              </ul>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
