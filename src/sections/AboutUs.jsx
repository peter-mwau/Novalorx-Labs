// src/sections/AboutUs.jsx
import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
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
      className="relative w-full h-screen overflow-auto text-white hide-scrollbar bg-gradient-to-b from-gray-900/10 to-black/20"
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

          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-300 max-w-3xl"
          >
            Novalorx Labs was founded to build a different kind of product
            studio — one that puts outcomes before technology choices and
            partners with clients as an extension of their team. We focus on
            clarity, measurable impact, and predictable delivery.
          </motion.p>

          {/* Metrics row */}
          <motion.div variants={fadeIn} className="flex gap-6 mt-4">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="flex-1 bg-[rgba(255,255,255,0.02)] border border-white/6 rounded-lg p-4 text-center shadow-lg shadow-black/30"
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
          className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        >
          <div className="max-w-7xl mx-auto px-6 py-24 space-y-12 min-h-screen flex flex-col justify-center">
            {/* Section Header */}
            <motion.div variants={fadeIn} className="space-y-4">
              <span
                className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                       bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
              >
                Our Expertise
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                What we do — product engineering & strategic partnerships
              </h2>

              <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
                We help startups and enterprises build digital products with
                clarity and speed. From early-stage validation to scalable
                systems, we design and engineer software that’s built to last.
              </p>
            </motion.div>

            {/* Services Grid */}
            <motion.div
              variants={containerStagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="#ffffff"
                        fillRule="evenodd"
                        d="M464 144c8.837 0 16 7.163 16 16v304c0 8.836-7.163 16-16 16H160c-8.837 0-16-7.164-16-16V160c0-8.837 7.163-16 16-16zm-52 68H212v200h200zm493.333 87.686c6.248 6.248 6.248 16.379 0 22.627l-181.02 181.02c-6.248 6.248-16.378 6.248-22.627 0l-181.019-181.02c-6.248-6.248-6.248-16.379 0-22.627l181.02-181.02c6.248-6.248 16.378-6.248 22.627 0zm-84.853 11.313L713 203.52L605.52 311L713 418.48zM464 544c8.837 0 16 7.164 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V560c0-8.836 7.163-16 16-16zm-52 68H212v200h200zm452-68c8.837 0 16 7.164 16 16v304c0 8.837-7.163 16-16 16H560c-8.837 0-16-7.163-16-16V560c0-8.836 7.163-16 16-16zm-52 68H612v200h200z"
                      />
                    </svg>
                  ),
                  title: "Product Development",
                  body: "We build modern web and mobile applications with scalable architecture and clean UI/UX.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                    >
                      <g fill="#ffffff" fillRule="evenodd" clipRule="evenodd">
                        <path d="M23.983 21.154c-.14-.999-1.418-2.077-2.047-2.516l-.67-.47c-.678-.509-.428-.738-.828-.738c0-.999.13-1.927.13-2.796v-1.198c0-.39-.08-.799-.14-1.198a40 40 0 0 0-.569-2.766a.39.39 0 0 0-.58-.279a.38.38 0 0 0-.179.39c.07 1.057.07 1.996.11 2.845c0 .639 0 1.258.11 1.887c.11.998.3 1.996.48 3.135h-1.928c-1.198-.05-2.406-.18-3.604-.26c-.819-.05-1.628-.08-2.436-.1c-.999 0-1.947 0-2.916.11c-1.447.11-2.875.3-4.323.48a.34.34 0 1 0 0 .678H7.47c1.427 0 2.845 0 4.283.08c.859 0 1.717.05 2.586.07s1.737 0 2.606 0c.998 0 2.057-.08 3.065-.18l.749.59l.669.518q.544.394.998.89l-4.123-.36h-4.074c-1.997 0-4.064.12-6.09.12c-1.678.06-3.375.289-5.062.349H1.278a5 5 0 0 1 .74-1.268l.678-.61l.999-.658a.34.34 0 0 0 .14-.46a.34.34 0 0 0-.36-.15l.14-1.836c.07-.909.18-1.807.25-2.726c.07-.918.15-1.817.15-2.746c-.11-2.336-.2-1.238.998-1.437l2.366-.43a.39.39 0 0 0-.16-.758l-2.306.2c-.18 0-.999-.07-1.398 0a.78.78 0 0 0-.53.299a1.5 1.5 0 0 0-.199.609c-.07.48 0 1.228 0 1.497c0 .919-.1 1.838-.11 2.746c-.01.909 0 1.837.07 2.756l.09 2.226l-.49.3l-.808.659A5.6 5.6 0 0 0 .1 20.964a1.74 1.74 0 0 0 .63 1.997c.334.22.712.367 1.108.43q.765.105 1.537.08l3.275.139c2.855 0 5.711.17 8.557.18c1.237 0 2.476 0 3.714-.13l2.066-.32l1.278-.33l.849-.359a1.37 1.37 0 0 0 .869-1.497m-1.318.609l-.7.26l-1.167.259l-1.917.18h-2.426c-3.265 0-6.53-.2-9.795-.17H3.365q-.689.06-1.378 0a2 2 0 0 1-.709-.23a.85.85 0 0 1-.299-.998v-.07q1.033.15 2.077.18c1.677.06 3.384 0 5.052 0H12.2c1.997-.05 4.064-.19 6.09-.26h4.623a.528.528 0 0 1-.27.849z" />
                        <path d="M9.416 6.986q.522.484 1.128.859a.389.389 0 1 0 .509-.59q-.405-.36-.749-.778a.87.87 0 0 1-.18-.42l.17-.259c.18-.276.424-.505.71-.669a3.6 3.6 0 0 1 1.067-.42l.43-.07s-.08.1-.11.16a9 9 0 0 0-.998 2.477a2 2 0 0 0 .499 1.917l.769.788a2 2 0 0 0 1.996.52a9.2 9.2 0 0 0 2.486-1.079c.08 0 .15-.11.23-.15l-.09.51a3.6 3.6 0 0 1-.42 1.068c-.167.3-.403.557-.688.749l-.26.17a.87.87 0 0 1-.419-.18a8 8 0 0 1-.779-.749a.39.39 0 0 0-.589.51q.375.604.859 1.128c.196.189.436.326.699.399c.184.04.375.04.559 0a2 2 0 0 0 .639-.25c.468-.278.85-.678 1.108-1.158a4 4 0 0 0 .24-1.488l-.08-.998a1 1 0 0 1 0-.18a9.4 9.4 0 0 0 1.777-1.617a7.6 7.6 0 0 0 1.588-3.415a6 6 0 0 0 0-1.657c-.016-.5-.202-.98-.53-1.358a2.2 2.2 0 0 0-1.258-.53a6.5 6.5 0 0 0-1.637.09a7.7 7.7 0 0 0-3.355 1.678a9.7 9.7 0 0 0-1.627 1.817H13l-.998-.12a4.1 4.1 0 0 0-1.558.3c-.502.254-.918.65-1.198 1.138q-.172.289-.24.62c-.04.18-.04.367 0 .548c.081.259.221.495.41.69m5.99-4.153a6.66 6.66 0 0 1 2.896-1.278q.525-.09 1.058-.07c.245-.02.49.039.699.17c.14.216.203.472.18.728q.035.547-.05 1.089a6.34 6.34 0 0 1-1.199 2.915a8.9 8.9 0 0 1-2.416 2.197c-.67.46-1.403.82-2.176 1.068a1.22 1.22 0 0 1-1.198-.21l-.81-.768a1.28 1.28 0 0 1-.219-1.258A8 8 0 0 1 13.26 5.25a9.1 9.1 0 0 1 2.176-2.396zM8.168 10.86q.141.104.31.16l-.08.11a7.8 7.8 0 0 0-1 1.547c-.138.353-.166.74-.079 1.108a.65.65 0 0 0 .17.27a.7.7 0 0 0 .27.17c.408.13.848.116 1.247-.04a7.7 7.7 0 0 0 1.538-.999l.11-.08q.058.17.16.32a.91.91 0 0 0 1.178.43c.423-.222.744-.597.898-1.049c.109-.32.15-.66.12-.998q-.054-.65-.19-1.288a.37.37 0 0 0-.439-.32a.38.38 0 0 0-.33.43q.084.59.09 1.187c.002.223-.039.443-.12.65c0 .09-.22.17-.319.26l-.05-.66a.64.64 0 0 0-.789-.44l-.28.1l-.728.42c-.24.15-.59.4-.998.6h-.05q.274-.518.609-1L9.825 11q.06-.13.1-.27a.3.3 0 0 0 0-.09a.56.56 0 0 0-.47-.698l-.718.04s0-.05-.06 0s0 .1 0 .09s.27-.33.42-.39c.208-.088.432-.135.658-.14q.597.001 1.188.08a.34.34 0 0 0 .39-.29a.35.35 0 0 0-.33-.429q-.634-.134-1.278-.2a2.7 2.7 0 0 0-.998.11a1.9 1.9 0 0 0-.999.879a.91.91 0 0 0 .44 1.168" />
                      </g>
                    </svg>
                  ),
                  title: "Rapid Prototyping",
                  body: "Validate ideas quickly with clickable prototypes and MVPs in weeks — not months.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M1.874 17.625a2.625 2.625 0 1 0 5.25 0a2.625 2.625 0 0 0-5.25 0" />
                        <path d="M8.249 23.25a4.25 4.25 0 0 0-7.5 0m16.125-5.625a2.625 2.625 0 1 0 5.25 0a2.625 2.625 0 0 0-5.25 0" />
                        <path d="M23.249 23.25a4.25 4.25 0 0 0-7.5 0M9.374 3.375a2.625 2.625 0 1 0 5.25 0a2.625 2.625 0 0 0-5.25 0m5.874 4.875a4.27 4.27 0 0 0-6.5 0m.302 11.457a8.28 8.28 0 0 0 5.944-.018M6.348 6a8.22 8.22 0 0 0-2.6 6c0 .253.015.5.038.75m16.425 0c.022-.248.038-.5.038-.75a8.22 8.22 0 0 0-2.6-6" />
                      </g>
                    </svg>
                  ),
                  title: "Dedicated Teams",
                  body: "Small cross-functional squads that operate like an extension of your in-house team.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffffff"
                        d="M12 19.9q2.425-.75 4.05-2.962T17.95 12H12V4.144L6.404 6.221q-.193.077-.298.231Q6 6.606 6 6.798v4.733q0 .194.05.469H12zm0 .942q-.136 0-.287-.025t-.28-.075Q8.48 19.617 6.74 16.926T5 11.1V6.817q0-.51.295-.923t.755-.6l5.385-2q.292-.106.565-.106t.566.106l5.384 2q.46.187.755.6t.295.923V11.1q0 3.135-1.74 5.826t-4.693 3.816q-.13.05-.28.075t-.287.025"
                      />
                    </svg>
                  ),
                  title: "Security & Compliance",
                  body: "Secure-by-design development practices with NDA support, access controls, and best practices.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 4.5a3 3 0 0 0-2.567 4.554a3.001 3.001 0 0 0 0 5.893M7 4.5a2.5 2.5 0 0 1 5 0v15a2.5 2.5 0 0 1-5 0a3 3 0 0 1-2.567-4.553M7 4.5c0 .818.393 1.544 1 2m-3.567 8.447A3 3 0 0 1 6 13.67m13.25-8.92L17 7h-2m3.5-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0m.75 14.5L17 17h-2m3.5 2.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0m.75-7.25H15m3.5 0a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0"
                      />
                    </svg>
                  ),
                  title: "AI & Data Solutions",
                  body: "Machine learning pipelines, dashboards, predictive insights, and AI-powered automation.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#ffffff"
                        d="M.889.775S0 1.29 0 2.315V7.44s0 3.079 2.666 4.618c.817.472 1.384.508 1.777.334c.394.628.96 1.246 1.778 1.718c2.666 1.54 2.668-1.539 2.668-1.539V7.447c0-1.027.888-1.539.888-1.539l3.557-2.054s.89-.514 1.777 0c.89.513 0 1.027 0 1.027L11.56 6.934l1.775 1.025l3.559-2.055c.052-.03.912-.495 1.773.002c.89.514 0 1.026 0 1.026l-3.555 2.054s-.888.514-.888 1.54v5.124s0 1.028-.889.514c-.89-.513-.89-1.539-.89-1.539l-1.778-1.027s.001 3.08 2.668 4.619s2.666-1.54 2.666-1.54v-5.126c0-1.026.889-1.537.889-1.537l4.445-2.569s1.776-1.025-.889-2.564c-.819-.474-1.552-.704-2.177-.797c-.164-.357-.565-.776-1.377-1.24c-2.667-1.523-5.332-.016-5.332-.016L8.004 4.881s-.89.514-.89 1.539v5.125s0 1.027-.89.514c-.889-.514-.89-1.54-.89-1.54V5.396q0-.096.01-.188c.097-.902.879-1.353.879-1.353L4.445 2.828l-.004.002c-.052.03-.884.544-.884 1.537v5.125s-.002 1.027-.891.514c-.89-.514-.889-1.54-.889-1.54V3.343c0-1.026.889-1.54.889-1.54L.889.776zm9.78 8.735v2.053l1.778 1.025v-2.053zm8.442 2.183c-.666.005-1.332.389-1.332 1.909c0 3.039 2.666 4.619 2.666 4.619l.889.513s.89.514.89 1.54s-.89.513-.89.513l-3.555-2.053v2.053l3.555 2.053S24 24.379 24 21.3c0-3.077-1.777-4.105-1.777-4.105l-1.778-1.025s-.888-.514-.888-1.54c0-1.028.888-.515.888-.515L24 16.168v-2.053l-3.555-2.05s-.667-.376-1.334-.372"
                      />
                    </svg>
                  ),
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
                     hover:border-cyan-400/40 hover:bg-white/10
                     shadow-lg shadow-black/30"
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                          transition duration-300 blur-xl bg-cyan-500/10"
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
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
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 
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
          className="space-y-14 min-h-screen flex flex-col justify-center"
        >
          {/* Header */}
          <motion.div
            variants={fadeIn}
            className="space-y-5 text-center md:text-left"
          >
            <span
              className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                 bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
            >
              Our Workflow
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Our process — predictable, transparent, iterative
            </h3>

            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed mx-auto md:mx-0">
              We work in structured sprints with clear milestones, rapid
              feedback loops, and measurable delivery. Every step is designed to
              reduce risk and move fast.
            </p>
          </motion.div>

          {/* Timeline Wrapper */}
          <motion.div
            variants={containerStagger}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Vertical Timeline Line (Desktop only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-white/10 to-transparent" />

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
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7
                   hover:border-cyan-400/30 hover:bg-white/10 shadow-lg shadow-black/30
                   ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}
              >
                {/* Glow Effect */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl opacity-70" />
                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl opacity-40" />

                {/* Timeline Dot (Desktop only) */}
                <div
                  className={`hidden md:block absolute top-10 w-4 h-4 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/30
                      ${i % 2 === 0 ? "-right-2" : "-left-2"}`}
                >
                  <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-md animate-pulse" />
                </div>

                <div className="relative z-10 flex items-start gap-5">
                  {/* Step Number */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl bg-cyan-500/10 
                       border border-cyan-400/20 flex items-center justify-center"
                  >
                    <span className="text-cyan-300 font-bold text-lg">
                      {s.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-white font-semibold text-xl sm:text-2xl">
                      {s.title}
                    </h4>
                    <p className="text-gray-300 text-sm sm:text-base mt-2 leading-relaxed">
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
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 
               flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            {/* CTA Glow */}
            <div className="absolute -top-20 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl opacity-70" />

            <div className="relative z-10">
              <h4 className="text-lg sm:text-xl font-semibold text-white">
                Weekly demos. Clear milestones. Zero ambiguity.
              </h4>
              <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-xl">
                We deliver progress you can see, track, and measure every sprint
                — so your team always stays aligned.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.("contacts")}
              className="relative z-10 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600
                 hover:from-cyan-600 hover:to-cyan-700 text-black font-semibold transition
                 shadow-lg shadow-cyan-500/20 hover:scale-[1.03]"
            >
              Start a project
            </button>
          </motion.div>
        </motion.section>

        {/* Engagement Models */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerStagger}
          className="space-y-12 min-h-screen flex flex-col justify-center"
        >
          {/* Header */}
          <motion.div variants={fadeIn} className="space-y-4">
            <span
              className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                     bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
            >
              Engagement Models
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Flexible partnerships built around your goals
            </h3>

            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
              Whether you need a rapid prototype, a long-term engineering team,
              or a fixed-scope delivery — we structure engagements for speed,
              clarity, and measurable outcomes.
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
                 hover:border-cyan-400/30 hover:bg-white/10 shadow-lg shadow-black/30"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl opacity-50" />

              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-semibold text-white">
                  Fixed Scope
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Perfect for clear requirements and defined deliverables with a
                  predictable timeline.
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
              className="relative overflow-hidden rounded-2xl border border-cyan-500/40 bg-gradient-to-b 
                 from-cyan-500/15 to-white/5 p-6 shadow-xl shadow-cyan-500/10"
            >
              {/* Popular badge */}
              <div
                className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-semibold 
                      bg-cyan-500 text-black"
              >
                Most Popular
              </div>

              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl opacity-60" />
              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-semibold text-white">
                  Time & Material
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Ideal for evolving scope, experimentation, and continuous
                  delivery.
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
                 hover:border-cyan-400/30 hover:bg-white/10 shadow-lg shadow-black/30"
            >
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl opacity-50" />

              <div className="relative z-10 space-y-4">
                <h4 className="text-xl font-semibold text-white">
                  Dedicated Team
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  A long-term engineering pod embedded into your product team
                  for consistent execution.
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
                  We build systems that are secure by default. From access
                  control to encryption, we follow modern best practices and
                  ensure your product is reliable and enterprise-ready.
                </p>

                <p className="text-gray-400 text-sm">
                  NDA support • Threat modeling • Secure deployments •
                  Audit-ready practices
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
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
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
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold transition"
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
            <span
              className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                     bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
            >
              Case Studies
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Selected work that delivered measurable impact
            </h3>

            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
              We don’t just build products — we build outcomes. Here are a few
              examples of systems we’ve shipped, modernized, and scaled.
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
                   bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 
                   shadow-lg shadow-black/30 p-6"
              >
                {/* Glow */}
                <div
                  className="absolute -top-20 -right-20 w-72 h-72 rounded-full 
                        bg-cyan-500/15 blur-3xl opacity-60 group-hover:opacity-90 transition"
                />

                <div className="relative z-10 space-y-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-cyan-200 transition">
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
                      className="text-sm text-cyan-300 hover:text-cyan-200 hover:underline transition"
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
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
               p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <h4 className="text-lg font-semibold text-white">
                Want results like this for your product?
              </h4>
              <p className="text-gray-300 text-sm mt-1">
                Let’s discuss your idea and map out the fastest path to
                shipping.
              </p>
            </div>

            <button
              onClick={() => onNavigate?.("contacts")}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 
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
          <motion.div
            variants={fadeIn}
            className="space-y-4 text-center max-w-3xl mx-auto"
          >
            <span
              className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                     bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
            >
              Testimonials
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What our partners say
            </h3>
          </motion.div>

          {/* Carousel */}
          <motion.div className="relative overflow-hidden" variants={fadeIn}>
            <motion.div
              className="flex gap-6 w-max"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 80,
                ease: "linear",
              }}
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
                      <footer className="mt-4 text-sm text-gray-400">
                        {t.author}
                      </footer>
                    </motion.blockquote>
                  )),
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
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 15,
                ease: "linear",
              }}
            >
              {["Client A", "Client B", "Client C", "Client D", "Client E"].map(
                (client, i) => (
                  <div
                    key={i}
                    className="h-12 w-32 flex items-center justify-center bg-white/5 rounded text-gray-300 font-semibold"
                  >
                    {client}
                  </div>
                ),
              )}
              {/* Repeat for seamless loop */}
              {["Client A", "Client B", "Client C", "Client D", "Client E"].map(
                (client, i) => (
                  <div
                    key={`repeat-${i}`}
                    className="h-12 w-32 flex items-center justify-center bg-white/5 rounded text-gray-300 font-semibold"
                  >
                    {client}
                  </div>
                ),
              )}
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
            <span
              className="inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold 
                     bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
            >
              Leadership
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Meet the team behind Novalorx Labs
            </h3>

            <p className="text-gray-300 max-w-3xl text-lg leading-relaxed">
              We’re a small high-output team focused on building scalable
              products with strong design, engineering discipline, and modern
              delivery practices.
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
                   bg-white/5 hover:bg-white/10 hover:border-cyan-400/30 
                   shadow-lg shadow-black/30 p-6"
              >
                {/* Glow */}
                <div
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full 
                        bg-cyan-500/15 blur-3xl opacity-50 group-hover:opacity-90 transition"
                />

                <div className="relative z-10 space-y-4">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 
                            flex items-center justify-center text-lg font-bold text-white"
                    >
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
                      <div className="text-sm text-gray-400">{m.role}</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {m.bio}
                  </p>

                  {/* Role Badge */}
                  <div className="pt-2">
                    <span
                      className="inline-flex px-3 py-1 rounded-full text-xs font-semibold 
                             bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
                    >
                      Core Leadership
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      onClick={() => onNavigate?.("contacts")}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 shadow border border-white/10 
                         hover:bg-cyan-500 hover:text-black hover:border-cyan-400 
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
            className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
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
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 
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
          <motion.div
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center space-y-4"
          >
            <h3 className="text-3xl sm:text-4xl font-extrabold">
              Ready to move forward?
            </h3>
            <p className="text-gray-300 text-lg">
              We start with a short scoping call to align on objectives,
              constraints and success metrics. After that we propose a discovery
              sprint or a rapid prototype — whichever best reduces risk and
              maximizes learning.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={() => onNavigate?.("contacts")}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 
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
                  <strong>How long until a prototype?</strong> Usually 1–3 weeks
                  depending on scope.
                </li>
                <li>
                  <strong>Do you sign NDAs?</strong> Yes — NDAs and data
                  handling agreements on request.
                </li>
                <li>
                  <strong>Engagement models?</strong> Fixed-price, T&M, or
                  dedicated teams — we recommend after scoping.
                </li>
              </ul>
            </motion.div>

            {/* Risk Reduction & Guarantees */}
            <motion.div
              variants={fadeIn}
              className="p-6 bg-[rgba(255,255,255,0.03)] border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <h4 className="text-sm font-semibold mb-4">
                Risk reduction & guarantees
              </h4>
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
