// src/sections/Projects.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Calendar,
  Code,
  Users,
} from "lucide-react";
import { useInView } from "../hooks/useInView";

const sampleProjects = [
  // Peter
  {
    id: 1,
    title: "OpenHeart Chain",
    category: "Web3 & Blockchain dApps",
    short:
      "Blockchain-powered donation system with end-to-end transparency, smart contract automation, and real-time tracking.",
    description:
      "Blockchain-powered donation system with end-to-end transparency, smart contract automation, and real-time tracking.",
    longDescription:
      "A decentralized charitable giving platform built on blockchain technology, enabling transparent campaign creation, multi-token donations, and real-time impact tracking. Revolutionize charitable giving with zero platform fees and complete trust.",
    screenshots: [
      "/openchain1.png",
      "/openchain2.png",
      "/openchain3.png",
      "/openchain4.png",
      "/openchain5.png",
      "/openchain6.png",
      "/openchain7.png",
      "/openchain8.png",
    ],
    details: [
      "Transparent Campaigns: Create and manage fundraising campaigns with full blockchain transparency",
      "Multi-Token Support: Accept donations in multiple tokens (USDC, WETH, WBTC) on Sepolia testnet",
      "No Platform Fees: 100% of donations go directly to beneficiaries",
      "Real-Time Tracking: Monitor campaign progress and donation impact instantly",
      "Admin Dashboard: Manage token permissions and platform settings with role-based access control",
      "Wallet Integration: Connect via MetaMask, Coinbase Wallet, Rainbow, or in-app web3 authentication",
      "Dark/Light Mode: Seamless theme switching for user preference",
      "Responsive Design: Works seamlessly on desktop and mobile devices",
    ],
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "React Router",
      "Solidity",
      "Ethers.js",
      "Hardhat",
      "OpenZeppelin",
    ],
    timeline: "3 months",
    team: "Solo Project",
    status: "Beta",
    link: "https://example.com",
    github: "https://github.com/peter-mwau/openHeart-chain.git",
    challenges: [
      "Designing a secure multisig approval system that balances decentralization with practical governance",
      "Implementing proper fund locking mechanisms that protect donors while allowing legitimate access to funds",
      "Creating a user-friendly interface that abstracts blockchain complexity without sacrificing transparency",
      "Ensuring gas efficiency while maintaining comprehensive audit trails",
      "Developing a robust evidence submission system that prevents fraud while being accessible to non-technical users",
    ],
    solutions: [
      "Successfully implementing a DAO-like governance model for campaign verification",
      "Creating a fully transparent donation tracking system where users can see exactly how their contributions are being used",
      "Building a secure smart contract architecture that protects funds until predetermined conditions are met",
      "Developing an intuitive user experience that makes blockchain donations accessible to everyone",
      "Establishing a complete accountability system with evidence requirements for fund utilization",
    ],
  },
  {
    id: 2,
    title: "ForenSure",
    category: "Web3 & Blockchain dApps",
    short:
      "Blockchain-powered digital forensics system ensuring secure and immutable tracking of evidence provenance.",
    description:
      "A blockchain-powered digital forensics system that ensures secure and immutable tracking of evidence provenance. By integrating advanced encryption techniques, ForenSure provides a tamper-proof chain of custody, enabling trusted data verification and seamless collaboration for investigators, auditors, and legal entities.",
    longDescription:
      "ForenSure is a blockchain-powered digital forensics system that ensures secure and immutable tracking of evidence provenance. By integrating advanced encryption techniques, ForenSure provides a tamper-proof chain of custody, enabling trusted data verification and seamless collaboration for investigators, auditors, and legal entities.",
    screenshots: [
      "/forensure1.png",
      "/forensure2.png",
      "/forensure3.png",
      "/forensure4.png",
      "/forensure5.png",
      "/forensure6.png",
    ],
    details: [
      "Secure and immutable tracking of evidence provenance",
      "Advanced encryption techniques for data integrity and confidentiality",
      "Tamper-proof chain of custody",
      "Trusted data verification",
      "Seamless collaboration for investigators, auditors, and legal entities",
      "Integration with Pinata for IPFS file storage",
      "Smart contract deployment on the SKALE network",
    ],
    tech: ["Vite + React", "Solidity", "Ethers.js", "IPFS", "Pinata", "SKALE"],
    timeline: "4 months",
    team: "3 Developers",
    status: "Completed",
    link: "https://shop-demo.example.com",
    github: "https://github.com/peter-mwau/ForenSure.git",
    challenges: [
      "Implementing secure evidence tracking on an immutable blockchain",
      "Ensuring data integrity and confidentiality with advanced encryption",
      "Creating a user-friendly interface for non-technical users",
      "Integrating IPFS for decentralized file storage",
      "Deploying smart contracts on the SKALE network",
    ],
    solutions: [
      "Developed a tamper-proof chain of custody using blockchain technology",
      "Utilized encryption techniques to protect sensitive evidence data",
      "Designed an intuitive UI for easy evidence management",
      "Integrated Pinata for seamless IPFS file storage",
      "Successfully deployed smart contracts on the SKALE network",
    ],
  },
  // Mike
  {
    "id": 3,
    "title": "Voice-to-Order AI System",
    "category": "Conversational AI & Automation",
    "short": "AI-powered voice system that automates restaurant orders and payments.",
    "description":
      "A real-time voice-to-order pipeline that handles customer calls, processes food orders, and manages payments without human intervention.",
    "longDescription":
      "Developed for AmigosGrill UK, this system replaces manual phone ordering with a conversational AI agent. The solution handles the entire customer journey—from answering calls to checking inventory and authorizing payments via Square POS. It includes a custom-built React dashboard that allows restaurant staff to track call analytics, conversion rates, and live order status in real-time.",
    "screenshots": [
      "/screenshot_dashboard_overview.png",
      "/screenshot_call_analytics.png",
      "/screenshot_pending_orders.png",
      "/screenshot_menu_management.png"
    ],
    "details": [
      "Real-time voice-to-order pipeline using Vapi and Twilio",
      "Custom Flask webhooks for order logic and inventory lookups",
      "Secure payment processing via Square POS API integration",
      "Live analytics dashboard tracking call duration and conversion rates",
      "Automated menu management and item blacklisting system",
      "Reduced manual employee handling time for phone orders",
      "Persistent data storage for order history using MongoDB"
    ],
    "tech": ["Python", "Flask", "React", "MongoDB", "Twilio", "Vapi", "Square API"],
    "timeline": "4 months",
    "team": "Solo Developer (Contract)",
    "status": "Completed",
    "link": "https://amigosgrill-demo.example.com",
    "github": "https://github.com/Mickmacha/voice-order-system",
    "challenges": [
      "Managing real-time voice latency and response accuracy",
      "Building logic for complex, customized food orders",
      "Ensuring secure and reliable POS payment synchronization"
    ],
    "solutions": [
      "Optimized Flask webhooks for low-latency voice interactions",
      "Created a custom API layer to handle menu variations and pricing",
      "Implemented robust error handling for transaction authorizations"
    ]
  },
  // Cliff
  {
    id: 4,
    title: "Machine Learning Model",
    category: "AI/ML",
    short: "Predictive model for customer churn using Python and scikit-learn.",
    description:
      "A machine learning model that predicts customer churn based on historical data and user behavior patterns.",
    longDescription:
      "This project involved developing a predictive model to identify customers at risk of churning. Using Python and scikit-learn, we processed large datasets, engineered relevant features, and trained various classification algorithms. The final model achieved high accuracy and was integrated into the company's CRM system to proactively address customer retention.",
    screenshots: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format",
    ],
    details: [
      "Data preprocessing and cleaning with Pandas",
      "Feature engineering to improve model accuracy",
      "Trained multiple classification algorithms (Logistic Regression, Random Forest, SVM)",
      "Deep learning model using TensorFlow and Keras",
      "Model evaluation using cross-validation and ROC-AUC",
      "Integrated model into CRM for real-time predictions",
      "Created visualizations with Matplotlib and Seaborn",
      "Automated retraining pipeline with Airflow",
      "Comprehensive documentation and reporting",
    ],
    tech: [
      "Python",
      "scikit-learn",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Airflow",
    ],
    timeline: "1 week",
    team: "1 Data Scientist",
    status: "Completed",
    link: "https://analytics-demo.example.com",
    github: "https://github.com/example/dashboard",
    challenges: [
      "Handling real-time data synchronization",
      "Creating responsive, interactive visualizations",
      "Managing large data sets efficiently",
    ],
    solutions: [
      "Implemented WebSocket for real-time updates",
      "Used D3.js for custom chart interactions",
      "Applied virtualization for large data rendering",
    ],
  },
  // Norman
  {
    id: 5,
    title: "Ecommerce Platform",
    category: "Web 2",
    short:
      "Ecommerce platform with user accounts, product listings, and payment integration.",
    description:
      "An ecommerce platform that allows users to browse products, manage accounts, and securely process payments through integrated gateways.",
    longDescription:
      "This ecommerce platform provides a seamless shopping experience with features like user account management, product browsing, shopping cart functionality, and secure payment processing. Built with React for the frontend and Node.js for the backend, it integrates popular payment gateways to ensure safe transactions. The platform is designed to be scalable and user-friendly, catering to both customers and administrators.",
    screenshots: [
      "/ecommerce1.png",
      "/ecommerce2.png",
      "/ecommerce3.png",
      "/ecommerce4.png",
      "/ecommerce5.png",
      "/ecommerce6.png",
      "/ecommerce7.png",
      "/ecommerce8.png",
    ],
    details: [
      "Modern Shopping Experience - Beautiful product catalog with advanced filtering",
      "Secure Checkout - Stripe integration for safe payments",
      "User Accounts - Registration, login, and profile management",
      "Dashboard - Real-time analytics and insights",
      "Brand, Category, Product Management - Manage product brands and manufacturers, Organize products with categories and subcategories and Full CRUD operations for products",
      "Transaction Management - Monitor payments and orders",
      "Row-Level Security - Secure data access with Supabase RLS",
    ],
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Node.js",
      "PostgreSQL",
    ],
    timeline: "Progressive",
    team: "1 Full-Stack Developer",
    status: "Development",
    link: "https://analytics-demo.shophub.com",
    github:
      "https://github.com/NORMTOSH/ShopHub---Modern-E-commerce-Platform.git",
    challenges: [
      "Handling real-time data synchronization",
      "Managing large data sets efficiently",
      "Implementing secure user authentication and authorization",
      "Integrating multiple payment gateways seamlessly",
      "Managing user roles and permissions",
      "Too many features to implement to syncronize at once",
    ],
    solutions: [
      "Unit and integration testing for critical components",
      "Implemented a payement gateway with the most payment options",
      "Role-based access control for user management",
    ],
  },
  {
    id: 6,
    title: "PhishGuard - Phishing Detection System",
    category: "web 2",
    short:
      "PhishGuard is a heuristic-based phishing detection tool designed to evaluate user-submitted URLs.",
    description:
      "PhishGuard analyzes user-submitted URLs using multiple heuristic security checks to detect potential phishing threats and assign a clear trust score.",
    longDescription:
      "PhishGuard is a heuristic-based phishing detection platform that helps users identify malicious and suspicious websites before they cause harm. The tool evaluates user-submitted URLs through multiple security checks—such as domain reputation analysis, SSL certificate validation, URL structure inspection, and blacklist verification—to generate a comprehensive trust score. All scan results are securely stored, allowing users to review scan history, track recurring threats, and make informed security decisions over time. PhishGuard is designed to enhance online safety through fast, transparent, and reliable phishing risk assessment.",
    screenshots: [
      "/phishguard1.png",
      "/phishguard2.png",
      "/phishguard3.png",
      "/phishguard4.png",
    ],
    details: [
      "Domain Rank validation (top-1M domains)",
      "WHOIS data retrieval (age, registration)",
      "HSTS support check",
      "IP-based URL detection",
      "URL structure evaluation (length, depth)",
      "On-page content analysis (e.g., onmouseover, right-click disabling)",
      "SSL/TLS certificate details fetching",
      "PhishTank API integration (to check against known phishing URLs)",
      "URL expansion/unshortening",
    ],
    tech: ["Python", "flusk", "mysql"],
    timeline: "1 week",
    team: "1 Developer",
    status: "Completed",
    link: "https://analytics-demo.example.com",
    github: "https://github.com/NORMTOSH/phishguard.git",
    challenges: [
      "Heuristic URL Analysis score computation",
      "Latest Databases for domain/IP reputation",
      "Efficiently handling URL unshortening and redirection",
    ],
    solutions: [
      "Divided the URL analysis into modular heuristic checks",
      "harnessed multiple threat intelligence APIs for up-to-date reputation data",
      "Implemented asynchronous requests to handle URL unshortening efficiently",
    ],
  },
];

// --- (Use the same sampleProjects array as in your original file) ---
// For the replacement file paste the exact sampleProjects content you already have.

function Projects() {
  const [activeId, setActiveId] = useState(null);
  const [shotIdx, setShotIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Carousel state
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // adjust by breakpoint

  const openProject = (id) => {
    setIsAnimating(true);
    setActiveId(id);
    setShotIdx(0);
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeProject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveId(null);
      document.body.style.overflow = "unset";
      setIsAnimating(false);
    }, 200);
  };

  const active = sampleProjects.find((p) => p.id === activeId);

  const nextShot = () => {
    if (!active) return;
    setShotIdx((s) => (s + 1) % active.screenshots.length);
  };

  const prevShot = () => {
    if (!active) return;
    setShotIdx(
      (s) => (s - 1 + active.screenshots.length) % active.screenshots.length,
    );
  };

  const nextProject = () => {
    if (!active) return;
    const i = sampleProjects.findIndex((p) => p.id === active.id);
    const next = sampleProjects[(i + 1) % sampleProjects.length];
    openProject(next.id);
  };

  const prevProject = () => {
    if (!active) return;
    const i = sampleProjects.findIndex((p) => p.id === active.id);
    const prev =
      sampleProjects[(i - 1 + sampleProjects.length) % sampleProjects.length];
    openProject(prev.id);
  };

  const handleKeyDown = (e) => {
    if (!active) return;
    switch (e.key) {
      case "Escape":
        closeProject();
        break;
      case "ArrowLeft":
        prevShot();
        break;
      case "ArrowRight":
        nextShot();
        break;
      case "ArrowUp":
        prevProject();
        break;
      case "ArrowDown":
        nextProject();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  const [sectionRef, isInView, blur] = useInView();

  // Update visibleCount on resize (for responsive cards per view)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // On scroll, update currentIndex for indicators
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      // find the item nearest to center
      const children = Array.from(el.children);
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearestIdx = 0;
      let nearestDist = Infinity;
      children.forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(childCenter - center);
        if (dist < nearestDist) {
          nearestIdx = idx;
          nearestDist = dist;
        }
      });
      setCurrentIndex(nearestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // run once to set initial index
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Carousel controls: scroll by one page (container width)
  const scrollByPage = (direction = "next") => {
    const el = carouselRef.current;
    if (!el) return;
    const page = el.clientWidth * 0.9; // scroll almost one visible page
    const left =
      direction === "next" ? el.scrollLeft + page : el.scrollLeft - page;
    el.scrollTo({ left, behavior: "smooth" });
  };

  // Optional: click indicator to center a card
  const centerIndex = (idx) => {
    const el = carouselRef.current;
    if (!el) return;
    const child = el.children[idx];
    if (!child) return;
    // center child
    const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <div
      ref={sectionRef}
      className={`w-full min-h-screen flex flex-col items-center justify-start py-20 relative overflow-hidden transition-opacity duration-1000 ${isInView ? "opacity-100" : "opacity-0"
        }`}
    >



      <div className="relative z-10 max-w-6xl w-full px-4 md:px-6">
        {/* Header */}
        <div className="relative mt-4 mb-16 h-28 sm:h-32 flex items-center justify-center">
          {/* Background text */}
          <h2
            className="absolute inset-0 flex items-center justify-center text-center text-7xl sm:text-8xl md:text-9xl font-extrabold text-white/10 uppercase tracking-widest
                        pointer-events-none select-none"
          >
            Projects
          </h2>

          <h2
            className="
    relative
    text-3xl sm:text-4xl font-extrabold tracking-widest rotate-[270deg]
    text-cyan-300
    drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]
    drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]
  "
            style={{
              animation: "neonBlink 2.2s infinite",
            }}
          >
            {/* Glow aura behind text */}
            <span
              className="
      absolute inset-0
      text-cyan-400 opacity-40 blur-lg
    "
              style={{
                animation: "neonBlink 2.2s infinite",
              }}
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
    "
              style={{
                animation: "glowPulse 1.5s infinite",
              }}
            />
          </h2>


          {/* Foreground text */}
          <h3
            className="text-gray-400 relative z-10 text-3xl md:text-4xl tracking-widest backdrop-blur-sm rounded-3xl">
            Our Featured Work
          </h3>
        </div>

        {/* Carousel wrapper + arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollByPage("prev")}
            aria-label="Previous"
            className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-blue-400/40 hover:bg-blue-500/60 ml-2"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="w-full overflow-x-auto scroll-smooth no-scrollbar pb-6"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              display: "flex",
              gap: "1.25rem", // same as tailwind gap-6
            }}
          >
            {sampleProjects.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => openProject(p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openProject(p.id);
                }}
                className="snap-start flex-shrink-0"
                style={{
                  width:
                    visibleCount === 1
                      ? "100%"
                      : visibleCount === 2
                        ? "48%"
                        : "31%", // ~3 per view with gaps
                }}
              >
                <div
                  className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-white/40"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={p.screenshots[0]}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                      <span className="text-xs font-medium text-white">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                          {p.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${p.status === "Live"
                              ? "bg-green-500/20 text-green-300"
                              : p.status === "Completed"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                        >
                          {p.status}
                        </span>
                      </div>

                      <p className="text-sm text-white/70 mb-4">{p.short}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tech.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tech.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/60">
                            +{p.tech.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{p.timeline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{p.team}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollByPage("next")}
            aria-label="Next"
            className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-blue-400/40 hover:bg-blue-500/60 mr-2"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Dots (desktop) */}
          <div className="hidden md:flex items-center justify-center gap-2 mt-4">
            {sampleProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => centerIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? "bg-blue-400 scale-125" : "bg-white/30"
                  }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Project Detail Modal */}
        {active && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isAnimating ? "animate-fadeIn" : ""
              }`}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
              onClick={closeProject}
            ></div>

            <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden  shadow-2xl transform transition-all duration-300">
              <button
                onClick={closeProject}
                className="absolute top-6 right-15 z-50 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
                {/* Left Column - Images */}
                <div className="space-y-6">
                  <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                    <img
                      src={active.screenshots[shotIdx]}
                      alt={`${active.title} screenshot ${shotIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    <button
                      onClick={prevShot}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextShot}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                      <span className="text-white text-sm">
                        {shotIdx + 1} / {active.screenshots.length}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {active.screenshots.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setShotIdx(index)}
                        className={`relative h-20 rounded-xl overflow-hidden transition-all duration-300 ${shotIdx === index
                            ? "ring-2 ring-blue-400 scale-105"
                            : "opacity-70 hover:opacity-100 hover:scale-105"
                          }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-15">
                    <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-blue-300/20">
                      <Calendar className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                      <p className="text-xs text-white/60">Timeline</p>
                      <p className="text-sm font-semibold text-white">
                        {active.timeline}
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-blue-300/20">
                      <Users className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                      <p className="text-xs text-white/60">Team</p>
                      <p className="text-sm font-semibold text-white">
                        {active.team}
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-blue-300/20">
                      <Code className="w-5 h-5 text-blue-300 mx-auto mb-2" />
                      <p className="text-xs text-white/60">Status</p>
                      <p className="text-sm font-semibold text-white">
                        {active.status}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Details (unchanged) */}
                <div className="overflow-y-auto max-h-[calc(70vh-4rem)] pr-2">
                  {/* ... the rest of your details remain unchanged - copy from original file */}
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 text-sm">
                        {active.category}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${active.status === "Live"
                            ? "bg-green-500/20 text-green-300"
                            : active.status === "Completed"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                      >
                        {active.status}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-300 mb-3">
                      {active.title}
                    </h3>
                    <p className="text-white/80 text-md mb-4">
                      {active.description}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                      Project Overview
                    </h4>
                    <p className="text-md text-white/80">
                      {active.longDescription}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {active.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-white/80"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {active.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/20">
                      <h5 className="font-semibold text-white mb-2">
                        Challenges
                      </h5>
                      <ul className="space-y-1">
                        {active.challenges.map((challenge, index) => (
                          <li key={index} className="text-sm text-white/70">
                            • {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl backdrop-blur-md bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/20">
                      <h5 className="font-semibold text-white mb-2">
                        Solutions
                      </h5>
                      <ul className="space-y-1">
                        {active.solutions.map((solution, index) => (
                          <li key={index} className="text-sm text-white/70">
                            • {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8">
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition-all duration-300 flex-1"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 flex-1"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                  </div>

                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                    <button
                      onClick={prevProject}
                      className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="text-sm">Previous Project</span>
                    </button>
                    <button
                      onClick={nextProject}
                      className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <span className="text-sm">Next Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* End Right Column */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Hide native scrollbar but keep touch support */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Projects;
