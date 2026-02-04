// src/sections/AboutUs.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // used to trigger framer animation per full title change
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    let timeout;

    const currentTitle = titles[titleIndex];

    // 🔥 Controls
    const typingSpeed = 85;
    const deletingSpeed = 45;
    const pauseAfterTyping = 1400;
    const pauseAfterDeleting = 500;

    if (!isDeleting && typedTitle.length < currentTitle.length) {
      timeout = setTimeout(() => {
        setTypedTitle(currentTitle.slice(0, typedTitle.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && typedTitle.length === currentTitle.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyping);
    } else if (isDeleting && typedTitle.length > 0) {
      timeout = setTimeout(() => {
        setTypedTitle(currentTitle.slice(0, typedTitle.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && typedTitle.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);

        // 🔥 trigger smooth motion transition
        setCycleKey((k) => k + 1);
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
          {/* Title animation wrapper */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={cycleKey}
              id="about-title"
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
            >
              {typedTitle}
              <span className="blinking-cursor">|</span>
            </motion.h1>
          </AnimatePresence>

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
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] 
             bg-gradient-to-b from-gray-900/90 to-black/80"
        >
          <div className="max-w-7xl mx-auto px-6 py-24 space-y-12 min-h-screen flex flex-col justify-center">

            {/* Section Header */}
            <motion.div variants={fadeIn} className="space-y-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                       bg-blue-500/10 text-blue-300 border border-blue-400/20">
                Our Expertise
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                What we do — product engineering & strategic partnerships
              </h2>

              <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
                We help startups and enterprises build digital products with clarity and speed.
                From early-stage validation to scalable systems, we design and engineer software
                that’s built to last.
              </p>
            </motion.div>

            {/* Services Grid */}
            <motion.div
              variants={containerStagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: <Check className="w-5 h-5" />,
                  title: "Product Development",
                  body: "We build modern web and mobile applications with scalable architecture and clean UI/UX.",
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: "Rapid Prototyping",
                  body: "Validate ideas quickly with clickable prototypes and MVPs in weeks — not months.",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Dedicated Teams",
                  body: "Small cross-functional squads that operate like an extension of your in-house team.",
                },
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "Security & Compliance",
                  body: "Secure-by-design development practices with NDA support, access controls, and best practices.",
                },
                {
                  icon: <Check className="w-5 h-5" />,
                  title: "AI & Data Solutions",
                  body: "Machine learning pipelines, dashboards, predictive insights, and AI-powered automation.",
                },
                {
                  icon: <Check className="w-5 h-5" />,
                  title: "Web3 Engineering",
                  body: "Smart contracts, tokenization, and blockchain-based systems with real-world product usability.",
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-6
                     hover:border-blue-400/40 hover:bg-white/10
                     shadow-lg shadow-black/30"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                          transition duration-300 blur-xl bg-blue-500/10" />

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-400/20">
                      {service.icon}
                    </div>

                    <div>
                      <h4 className="font-semibold text-white text-lg">
                        {service.title}
                      </h4>
                      <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                        {service.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 
                 bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Want to build something serious?
                </h4>
                <p className="text-gray-300 text-sm mt-1">
                  Let’s discuss your idea and map the fastest route to launch.
                </p>
              </div>

              <button
                onClick={() => onNavigate?.("contacts")}
                className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 
                   text-black font-semibold transition"
              >
                Talk to our team
              </button>
            </motion.div>

          </div>
        </motion.section>

        {/* Process */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="space-y-12 min-h-screen flex flex-col justify-center"
        >
          {/* Header */}
          <motion.div variants={fadeIn} className="space-y-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                            bg-purple-500/10 text-purple-300 border border-purple-400/20">
              Our Workflow
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Our process — predictable, transparent, iterative
            </h3>

            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
              We work in structured sprints with clear milestones, rapid feedback loops,
              and measurable delivery. Every step is designed to reduce risk and move fast.
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <motion.div
            variants={containerStagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                step: "01",
                title: "Discover",
                desc: "Workshops, research, problem framing, and KPI alignment so we build the right thing.",
              },
              {
                step: "02",
                title: "Design",
                desc: "UX flows, wireframes, and high-fidelity prototypes validated before development begins.",
              },
              {
                step: "03",
                title: "Build",
                desc: "Sprint-based engineering with testing, CI pipelines, code reviews, and predictable releases.",
              },
              {
                step: "04",
                title: "Scale",
                desc: "Performance optimization, observability, monitoring, deployment strategy, and growth support.",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6
                          hover:border-purple-400/30 hover:bg-white/10 shadow-lg shadow-black/30"
              >
                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl opacity-60" />

                <div className="relative z-10 flex items-start gap-5">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-purple-500/10 
                                  border border-purple-400/20 flex items-center justify-center">
                    <span className="text-purple-300 font-bold text-lg">{s.step}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-white font-semibold text-xl">
                      {s.title}
                    </h4>
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Mini CTA */}
          <motion.div
            variants={fadeIn}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row 
                      items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h4 className="text-lg font-semibold text-white">
                Weekly demos. Clear milestones. Zero ambiguity.
              </h4>
              <p className="text-gray-300 text-sm mt-1">
                We deliver progress you can see, track, and measure every sprint.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.("contacts")}
              className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 
                        text-black font-semibold transition"
            >
              Start a project
            </button>
          </motion.div>
        </motion.section>

        {/* Engagement Models */}
        <motion.section initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.25 }} variants={containerStagger}
          className="space-y-12 min-h-screen flex flex-col justify-center">

          {/* Header */}
          <motion.div variants={fadeIn} className="space-y-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                     bg-blue-500/10 text-blue-300 border border-blue-400/20">
              Engagement Models
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Flexible partnerships built around your goals
            </h3>

            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
              Whether you need a rapid prototype, a long-term engineering team, or a fixed-scope delivery —
              we structure engagements for speed, clarity, and measurable outcomes.
            </p>
          </motion.div>

          {/* Engagement Cards */}
          <motion.div
            variants={containerStagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Fixed Scope */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6
                 hover:border-blue-400/30 hover:bg-white/10 shadow-lg shadow-black/30"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl opacity-50" />

              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-semibold text-white">Fixed Scope</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Perfect for clear requirements and defined deliverables with a predictable timeline.
                </p>

                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Defined milestones & delivery date</li>
                  <li>• Best for MVPs & short builds</li>
                  <li>• Fixed cost agreement</li>
                </ul>
              </div>
            </motion.div>

            {/* Time & Material (Most Popular) */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-2xl border border-blue-500/40 bg-gradient-to-b 
                 from-blue-500/15 to-white/5 p-6 shadow-xl shadow-blue-500/10"
            >
              {/* Popular badge */}
              <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-semibold 
                      bg-blue-500 text-black">
                Most Popular
              </div>

              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl opacity-60" />

              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-semibold text-white">Time & Material</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ideal for evolving scope, experimentation, and continuous delivery.
                </p>

                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Weekly sprint delivery</li>
                  <li>• Flexible roadmap iteration</li>
                  <li>• Transparent billing & reporting</li>
                </ul>
              </div>
            </motion.div>

            {/* Dedicated Team */}
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6
                 hover:border-blue-400/30 hover:bg-white/10 shadow-lg shadow-black/30"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl opacity-50" />

              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-semibold text-white">Dedicated Team</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  A long-term engineering pod embedded into your product team for consistent execution.
                </p>

                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Engineers + designers + QA</li>
                  <li>• Long-term roadmap delivery</li>
                  <li>• Best for scaling companies</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Security & Compliance */}
          <motion.div
            variants={fadeIn}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl opacity-60" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-10">
              <div className="flex-1 space-y-4">
                <h4 className="text-2xl font-bold text-white">
                  Security & compliance
                </h4>

                <p className="text-gray-300 text-sm leading-relaxed">
                  We build systems that are secure by default. From access control to encryption,
                  we follow modern best practices and ensure your product is reliable and enterprise-ready.
                </p>

                <p className="text-gray-400 text-sm">
                  NDA support • Threat modeling • Secure deployments • Audit-ready practices
                </p>
              </div>

              <div className="flex-1">
                <ul className="text-gray-300 text-sm space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Secure coding practices & code reviews
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Automated tests, CI checks & static analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Environment isolation & secrets management
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    Encrypted storage and transport (TLS + AES standards)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    OWASP-aware development and vulnerability mitigation
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeIn}
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 
               p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h4 className="text-lg font-semibold text-white">
                Not sure which model fits you?
              </h4>
              <p className="text-gray-300 text-sm mt-1">
                We’ll recommend the best approach after a short scoping call.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.("contacts")}
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-black font-semibold transition"
            >
              Book a free call
            </button>
          </motion.div>
        </motion.section>


        {/* Case studies */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="space-y-12 min-h-screen flex flex-col justify-center"
        >
          {/* Header */}
          <motion.div variants={fadeIn} className="space-y-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                     bg-indigo-500/10 text-indigo-300 border border-indigo-400/20">
              Case Studies
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Selected work that delivered measurable impact
            </h3>

            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
              We don’t just build products — we build outcomes. Here are a few examples of
              systems we’ve shipped, modernized, and scaled.
            </p>
          </motion.div>

          {/* Case Study Cards */}
          <motion.div
            variants={containerStagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {caseStudies.map((c, i) => (
              <motion.article
                key={i}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 
                   bg-white/5 hover:bg-white/10 hover:border-indigo-400/30 
                   shadow-lg shadow-black/30 p-6"
              >
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full 
                        bg-indigo-500/15 blur-3xl opacity-60 group-hover:opacity-90 transition" />

                <div className="relative z-10 space-y-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-indigo-200 transition">
                    {c.title}
                  </h4>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {c.summary}
                  </p>

                  {/* Metrics Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300">
                      Product Delivery
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300">
                      Performance
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300">
                      Analytics
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 flex items-center justify-between">
                    <a
                      href={c.link}
                      className="text-sm text-indigo-300 hover:text-indigo-200 hover:underline transition"
                    >
                      Read case study →
                    </a>

                    <button
                      onClick={() => onNavigate?.("contacts")}
                      className="text-sm px-4 py-2 rounded-xl bg-white/5 border border-white/10 
                         hover:bg-indigo-500 hover:text-black hover:border-indigo-400 transition font-semibold"
                    >
                      Work with us
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeIn}
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
               p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h4 className="text-lg font-semibold text-white">
                Want results like this for your product?
              </h4>
              <p className="text-gray-300 text-sm mt-1">
                Let’s discuss your idea and map out the fastest path to shipping.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.("contacts")}
              className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 
                 text-black font-semibold transition"
            >
              Get a proposal
            </button>
          </motion.div>
        </motion.section>


        {/* Testimonials Slider */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="space-y-12 min-h-[60vh] flex flex-col justify-center"
        >
          <motion.div variants={fadeIn} className="space-y-4 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                     bg-pink-500/10 text-pink-300 border border-pink-400/20">
              Testimonials
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What our partners say
            </h3>
          </motion.div>

          {/* Carousel */}
          <motion.div
            className="relative overflow-hidden"
            variants={fadeIn}
          >
            <motion.div
              className="flex gap-6 w-max"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, repeatType: "loop", duration: 80, ease: "linear" }}
            >
              {/* Repeating Testimonials */}
              {Array(2)
                .fill(null)
                .map((_, repeatIdx) =>
                  [
                    {
                      text: "“Working with Novalorx Labs turned our idea into a product we’re proud of — they removed ambiguity, shipped quickly and helped us focus on metrics that matter.”",
                      author: "— Product Lead, Growing Marketplace",
                    },
                    {
                      text: "“The team at Novalorx Labs brought clarity and speed to our product launch. Exceptional collaboration!”",
                      author: "— CTO, FinTech Startup",
                    },
                    {
                      text: "“We trusted Novalorx Labs with our core platform, and they delivered beyond expectations — highly recommended.”",
                      author: "— Head of Engineering, E-commerce Enterprise",
                    },
                  ].map((t, i) => (
                    <motion.blockquote
                      key={`${repeatIdx}-${i}`}
                      className="min-w-[300px] md:min-w-[400px] bg-[rgba(255,255,255,0.05)] border border-white/10 p-6 rounded-xl shadow-lg"
                    >
                      <p className="text-gray-300 italic">{t.text}</p>
                      <footer className="mt-4 text-sm text-gray-400">{t.author}</footer>
                    </motion.blockquote>
                  ))
                )}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Trusted Logos */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="py-12 bg-[rgba(255,255,255,0.02)]"
        >
          <motion.div variants={fadeIn} className="text-center mb-6">
            <h4 className="text-lg font-semibold text-white">Trusted by</h4>
          </motion.div>

          <motion.div className="overflow-hidden relative">
            <motion.div
              className="flex gap-8 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, repeatType: "loop", duration: 15, ease: "linear" }}
            >
              {["Client A", "Client B", "Client C", "Client D", "Client E"].map((client, i) => (
                <div
                  key={i}
                  className="h-12 w-32 flex items-center justify-center bg-white/5 rounded text-gray-300 font-semibold"
                >
                  {client}
                </div>
              ))}
              {/* Repeat for seamless loop */}
              {["Client A", "Client B", "Client C", "Client D", "Client E"].map((client, i) => (
                <div
                  key={`repeat-${i}`}
                  className="h-12 w-32 flex items-center justify-center bg-white/5 rounded text-gray-300 font-semibold"
                >
                  {client}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="space-y-12 min-h-screen flex flex-col justify-center"
        >
          {/* Header */}
          <motion.div variants={fadeIn} className="space-y-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                     bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">
              Leadership
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Meet the team behind Novalorx Labs
            </h3>

            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
              We’re a small high-output team focused on building scalable products with
              strong design, engineering discipline, and modern delivery practices.
            </p>
          </motion.div>

          {/* Team Cards */}
          <motion.div
            variants={containerStagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 
                   bg-white/5 hover:bg-white/10 hover:border-emerald-400/30 
                   shadow-lg shadow-black/30 p-6"
              >
                {/* Glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full 
                        bg-emerald-500/15 blur-3xl opacity-50 group-hover:opacity-90 transition" />

                <div className="relative z-10 space-y-4">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 
                            flex items-center justify-center text-lg font-bold text-white">
                      {m.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div>
                      <div className="text-white font-semibold text-lg leading-tight">
                        {m.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {m.role}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {m.bio}
                  </p>

                  {/* Role Badge */}
                  <div className="pt-2">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold 
                             bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">
                      Core Leadership
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      onClick={() => onNavigate?.("contacts")}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 
                         hover:bg-emerald-500 hover:text-black hover:border-emerald-400 
                         transition font-semibold text-sm"
                    >
                      Connect with team
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeIn}
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 
               p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h4 className="text-lg font-semibold text-white">
                We build like a startup — deliver like an enterprise.
              </h4>
              <p className="text-gray-300 text-sm mt-1">
                Let’s discuss how our team can support your product roadmap.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.("contacts")}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 
                 text-black font-semibold transition"
            >
              Talk to leadership
            </button>
          </motion.div>
        </motion.section>


        {/* Final CTA + FAQ */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={containerStagger}
          className="space-y-12 mb-24 h-screen flex flex-col justify-center"
        >
          {/* CTA */}
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold">Ready to move forward?</h3>
            <p className="text-gray-300 text-lg">
              We start with a short scoping call to align on objectives, constraints and success metrics.
              After that we propose a discovery sprint or a rapid prototype — whichever best reduces risk
              and maximizes learning.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={() => onNavigate?.("contacts")}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                   rounded-xl text-black font-semibold shadow-lg transition-transform transform hover:scale-105"
              >
                Schedule scoping call
              </button>

              <button
                onClick={() => onNavigate?.("services")}
                className="px-8 py-3 border border-white/20 rounded-xl text-white font-semibold
                   hover:bg-white/5 transition-transform transform hover:scale-105"
              >
                Explore services
              </button>
            </div>
          </motion.div>

          {/* FAQ & Guarantees */}
          <motion.div
            variants={containerStagger}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto mt-12"
          >
            {/* FAQ */}
            <motion.div
              variants={fadeIn}
              className="p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h4 className="text-sm font-semibold mb-4">Common questions</h4>
              <ul className="text-gray-300 text-sm space-y-3">
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
            </motion.div>

            {/* Risk Reduction & Guarantees */}
            <motion.div
              variants={fadeIn}
              className="p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h4 className="text-sm font-semibold mb-4">Risk reduction & guarantees</h4>
              <ul className="text-gray-300 text-sm space-y-3">
                <li>• Predictable milestones & demos every sprint</li>
                <li>• Contract terms that align incentives</li>
                <li>• Free initial diagnostic & scoping session</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.section>

      </div>
    </section>
  );
}
