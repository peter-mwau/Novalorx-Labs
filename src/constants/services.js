// src/data/services.js
export const company = "Nyota Digital Solutions";

export const services = [
  {
    id: "web2",
    name: "Web2 Applications",
    description:
      "We design and build fast, secure, and scalable web applications tailored to your business needs.",

    // What we do (offerings)
    offerings: [
      "Business & personal websites",
      "Progressive Web Apps (PWAs)",
      "E-commerce platforms",
      "Admin dashboards & portals",
      "API development & integrations",
    ],

    // What the client receives (deliverables)
    deliverables: [
      "Responsive UI design (mobile-first)",
      "Full-stack web application (frontend + backend)",
      "Admin dashboard with roles & permissions",
      "Database design + optimization",
      "API documentation (Postman/Swagger)",
      "Deployment to cloud hosting (AWS/Vercel/DigitalOcean)",
      "Testing + bug-fix cycle before launch",
      "Training + handover documentation",
    ],

    // Business value (outcomes)
    business_outcomes: [
      "Launch your platform faster with a clear MVP roadmap",
      "Automate manual processes and reduce operational overhead",
      "Improve customer trust with secure authentication & data handling",
      "Increase conversions through optimized UX + performance",
      "Enable future scaling with modular architecture",
    ],

    // Timeline estimate
    timeline: "2–6 weeks (depending on scope)",

    // Pricing estimate
    starting_from: "From $1,200 (MVP websites) / $3,500+ (web platforms)",

    // Ideal client fit
    best_for: [
      "SMEs digitizing operations",
      "Startups building MVPs",
      "NGOs and schools building portals",
      "Businesses needing dashboards & automation",
    ],

    // Proof points (mini case studies)
    proof_points: [
      {
        title: "Business Management Dashboard",
        summary: "Built a web dashboard with reporting, invoicing, and user roles.",
        metric: "Reduced manual reporting time by 60%",
      },
      {
        title: "E-commerce Store + Payments",
        summary: "Developed a scalable online store with inventory and checkout system.",
        metric: "Enabled 24/7 online sales operations",
      },
    ],

    // Process steps
    process_steps: [
      "Discovery & scoping call (requirements + goals)",
      "Wireframes + UI design approval",
      "Development in weekly sprint cycles",
      "QA testing + performance optimization",
      "Deployment + monitoring setup",
      "Post-launch support & maintenance plan",
    ],

    // Support model
    post_launch_support:
      "30-day bug fix warranty included. Optional monthly maintenance plan for updates, hosting, and improvements.",

    // Integrations / platforms
    platforms: [
      "Stripe",
      "PayPal",
      "M-Pesa API",
      "Google Maps",
      "Firebase",
      "Twilio SMS",
      "SendGrid Email",
    ],

    // Risk controls
    risk_controls: [
      "Weekly progress demos and sprint check-ins",
      "Automated testing + QA checklist",
      "Performance audits (Lighthouse)",
      "Security best practices (OWASP-ready)",
      "Deployment rollback strategy",
      "Backup and database recovery plan",
    ],

    // Engagement model
    engagement: ["Fixed price project", "Time & materials (T&M)", "Monthly retainer"],

    // Communication expectations
    communication: ["Weekly demo call", "Daily progress updates via WhatsApp/Slack", "Trello/Jira task board"],

    // Packages
    packages: [
      {
        name: "Starter (Landing / Website)",
        summary: "Perfect for small businesses launching online presence.",
        price: "$1,200+",
        features: [
          "Responsive website (up to 5 pages)",
          "SEO-ready setup",
          "Contact form + integrations",
          "Deployment + hosting setup",
        ],
      },
      {
        name: "Growth (Business Web App)",
        summary: "Best for companies needing dashboards and automation.",
        price: "$3,500+",
        features: [
          "Full-stack web app",
          "Authentication + roles",
          "Admin dashboard",
          "Database + APIs",
          "Deployment + documentation",
        ],
      },
      {
        name: "Enterprise (Custom Platform)",
        summary: "Advanced systems with scaling and security focus.",
        price: "Custom Quote",
        features: [
          "Microservices-ready architecture",
          "Advanced analytics + reporting",
          "Cloud scaling & monitoring",
          "Security reviews + audit logs",
          "Ongoing support SLA",
        ],
      },
    ],

    // Tech stack
    tech_stack: {
      frontend: ["React", "Next.js", "Vue", "Tailwind CSS"],
      backend: ["Node.js", "Django", "Laravel"],
      database: ["PostgreSQL", "MySQL", "MongoDB"],
      tools: ["Vite", "Webpack", "Postman"],
    },

    tags: ["web development", "web apps", "ecommerce", "frontend", "backend"],

    use_cases: [
      "Online stores",
      "Company websites",
      "School portals",
      "NGO dashboards",
      "Custom business systems",
    ],

    delivery_model: [
      "Custom development",
      "Maintenance & support",
      "Ongoing feature updates",
    ],
  },

  {
    id: "web3",
    name: "Web3 & Blockchain DApps",
    description:
      "We build decentralized applications and blockchain systems that are secure, transparent, and scalable.",

    offerings: [
      "Smart contract development",
      "Decentralized applications (DApps)",
      "NFT platforms & marketplaces",
      "Token creation & tokenomics design",
      "Wallet integrations & blockchain APIs",
    ],

    deliverables: [
      "Smart contract development + testing suite",
      "DApp frontend + wallet integration",
      "Backend services (indexing + APIs if needed)",
      "Deployment to mainnet/testnet",
      "Gas optimization and security checks",
      "Tokenomics + contract architecture documentation",
      "Admin tools for monitoring transactions",
    ],

    business_outcomes: [
      "Launch trustless systems with transparent transaction history",
      "Reduce fraud and improve auditability through blockchain",
      "Create digital ownership via NFTs or token-based systems",
      "Enable decentralized identity and verification flows",
      "Build scalable DeFi or marketplace infrastructure",
    ],

    timeline: "3–8 weeks (depending on complexity)",

    starting_from: "From $4,000 (basic DApp) / $8,000+ (full platform)",

    best_for: [
      "Startups launching Web3 products",
      "Fintech innovation teams",
      "NFT creators and digital marketplaces",
      "Communities building DAOs",
    ],

    proof_points: [
      {
        title: "NFT Marketplace Prototype",
        summary: "Built minting + listing + wallet connect flow with metadata storage.",
        metric: "Minting workflow completed in under 2 seconds",
      },
      {
        title: "Token Launch + Vesting Contract",
        summary: "Developed ERC20 token with vesting schedule and admin controls.",
        metric: "Secure vesting + release schedule automation",
      },
    ],

    process_steps: [
      "Discovery (token model + user flow planning)",
      "Smart contract architecture design",
      "Development + testing + gas optimization",
      "Frontend integration with wallet + UI",
      "Deployment + verification on chain explorers",
      "Security review + optional audit support",
    ],

    post_launch_support:
      "Includes post-launch contract monitoring support. Optional maintenance for upgrades, UI improvements, and governance tooling.",

    platforms: [
      "MetaMask",
      "WalletConnect",
      "IPFS",
      "Alchemy",
      "Infura",
      "The Graph",
      "Chainlink Oracles",
    ],

    risk_controls: [
      "Test-driven smart contract development",
      "Reentrancy and exploit protection review",
      "Gas optimization pass",
      "Deployment checklist + rollback plan",
      "Multi-sig setup support for admin control",
      "Optional external audit preparation",
    ],

    engagement: ["Fixed price DApp build", "Consulting & architecture support", "Dedicated Web3 team"],

    communication: ["Weekly demo calls", "Transparent GitHub repo access", "Project board tracking"],

    packages: [
      {
        name: "Starter (Smart Contract + Token)",
        summary: "For teams needing a token or contract foundation.",
        price: "$4,000+",
        features: [
          "ERC20 / NFT smart contract",
          "Unit tests + deployment script",
          "Contract verification on explorer",
          "Documentation + handover",
        ],
      },
      {
        name: "Growth (DApp MVP)",
        summary: "For startups launching a full DApp prototype.",
        price: "$8,000+",
        features: [
          "Smart contracts + frontend",
          "Wallet integration",
          "Metadata storage (IPFS)",
          "Deployment + QA",
        ],
      },
      {
        name: "Enterprise (Full Web3 Platform)",
        summary: "For DeFi/NFT platforms needing scaling and security.",
        price: "Custom Quote",
        features: [
          "Advanced contract suite",
          "Backend indexing services",
          "Security hardening + monitoring",
          "Multi-sig + governance tooling",
          "Ongoing SLA support",
        ],
      },
    ],

    tech_stack: {
      blockchain: ["Ethereum", "Polygon", "Solana", "BNB Chain"],
      smart_contracts: ["Solidity", "Rust"],
      frontend: ["React", "Next.js", "Web3.js", "Ethers.js"],
      backend: ["Node.js", "Hardhat", "Foundry"],
      storage: ["IPFS", "Filecoin", "Arweave"],
    },

    tags: ["web3", "blockchain", "smart contracts", "dapps", "crypto", "NFT"],

    use_cases: [
      "DeFi platforms",
      "NFT marketplaces",
      "Decentralized identity (DID)",
      "Token-based systems",
      "DAO platforms",
    ],

    delivery_model: [
      "Smart contract audits",
      "End-to-end DApp builds",
      "Blockchain consulting",
    ],
  },

  {
    id: "android",
    name: "Android Applications",
    description:
      "We develop high-performance Android apps with modern design, offline support, and seamless backend integration.",

    offerings: [
      "Native Android apps",
      "Business & productivity apps",
      "E-commerce mobile apps",
      "API integrations",
      "App deployment & Play Store publishing",
    ],

    deliverables: [
      "Android app (Kotlin/Java) with clean architecture",
      "Modern UI design (Material Design / Jetpack Compose)",
      "Offline-first support (Room/SQLite)",
      "Authentication + secure storage",
      "Backend API integration",
      "Push notifications setup",
      "Play Store deployment support",
      "QA testing + device compatibility checks",
    ],

    business_outcomes: [
      "Improve customer engagement with mobile-first experiences",
      "Enable offline workflows for field teams",
      "Automate orders, logistics, and reporting",
      "Increase retention through push notifications",
      "Expand reach through Play Store distribution",
    ],

    timeline: "3–7 weeks",

    starting_from: "From $2,500 (MVP) / $5,000+ (full production app)",

    best_for: [
      "SMEs needing mobile access for customers",
      "Logistics and delivery businesses",
      "Schools and NGOs building community apps",
      "Fintech and payment solutions",
    ],

    proof_points: [
      {
        title: "Offline Delivery App",
        summary: "Built Android app for drivers with offline syncing and GPS tracking.",
        metric: "Reduced failed deliveries by improving route visibility",
      },
      {
        title: "Customer Service Mobile App",
        summary: "Created Android app with ticketing and push notifications.",
        metric: "Improved response time by 40%",
      },
    ],

    process_steps: [
      "Requirements gathering + UI planning",
      "Wireframes and user flow approval",
      "App development in iterative milestones",
      "Backend integration + authentication setup",
      "Testing on multiple devices",
      "Deployment + Play Store publishing support",
    ],

    post_launch_support:
      "Includes 30-day bug fix warranty. Maintenance plans available for version upgrades, feature improvements, and Play Store compliance.",

    platforms: ["Firebase", "Google Maps", "M-Pesa API", "Stripe", "OneSignal", "Twilio"],

    risk_controls: [
      "Crash monitoring + analytics setup",
      "Performance profiling and optimization",
      "Play Store publishing compliance checks",
      "Secure token storage best practices",
      "Automated testing for critical features",
    ],

    engagement: ["Fixed-price app build", "Dedicated Android developer", "Monthly support retainer"],

    communication: ["Weekly progress demo", "Test builds shared via APK/TestFlight-style rollout", "Issue tracking via Trello"],

    packages: [
      {
        name: "Starter (MVP App)",
        summary: "Perfect for validating a product idea quickly.",
        price: "$2,500+",
        features: [
          "Core screens + basic UI",
          "API integration",
          "Authentication",
          "Play Store deployment support",
        ],
      },
      {
        name: "Growth (Business App)",
        summary: "For companies needing offline and scalable features.",
        price: "$5,000+",
        features: [
          "Offline-first database support",
          "Push notifications",
          "Admin backend integration",
          "Performance tuning",
        ],
      },
      {
        name: "Enterprise (Custom Mobile Platform)",
        summary: "Advanced apps with security, analytics and monitoring.",
        price: "Custom Quote",
        features: [
          "Advanced roles and permissions",
          "Device management support",
          "Crash analytics + monitoring",
          "SLA support plan",
        ],
      },
    ],

    tech_stack: {
      languages: ["Kotlin", "Java"],
      frameworks: ["Android SDK", "Jetpack Compose"],
      backend: ["Firebase", "Node.js", "Django"],
      databases: ["Room", "SQLite", "Firestore"],
    },

    tags: ["android", "mobile apps", "kotlin", "java", "mobile development"],

    use_cases: [
      "Customer mobile apps",
      "Internal business tools",
      "School & NGO apps",
      "Fintech apps",
      "Logistics & delivery apps",
    ],

    delivery_model: [
      "Custom app development",
      "App maintenance",
      "Performance optimization",
    ],
  },

  {
    id: "ai_ml",
    name: "AI & Machine Learning Applications",
    description:
      "We build intelligent systems using machine learning and AI to automate, predict, and enhance business operations.",

    offerings: [
      "Machine learning models",
      "AI-powered web & mobile apps",
      "Natural Language Processing (NLP)",
      "Computer vision systems",
      "Chatbots & virtual assistants",
    ],

    deliverables: [
      "Custom AI model development + training pipeline",
      "Data cleaning + preprocessing workflow",
      "Model evaluation report (accuracy/precision/recall)",
      "API endpoint integration (FastAPI/Flask)",
      "Deployment containerization (Docker)",
      "Dashboard or interface to monitor predictions",
      "Documentation + handover for retraining",
    ],

    business_outcomes: [
      "Automate repetitive work and reduce human workload",
      "Detect fraud, anomalies, or risks early",
      "Improve customer service with AI chatbots",
      "Generate business insights through predictive analytics",
      "Improve decision-making using real-time intelligence",
    ],

    timeline: "2–8 weeks (depending on data availability)",

    starting_from: "From $3,000 (prototype) / $7,000+ (production ML system)",

    best_for: [
      "Companies with large datasets needing automation",
      "Fintech & fraud prevention systems",
      "Customer support teams needing chatbots",
      "Organizations needing document processing",
    ],

    proof_points: [
      {
        title: "Customer Support Chatbot",
        summary: "Built NLP chatbot integrated with web app and FAQ knowledge base.",
        metric: "Reduced support load by 35%",
      },
      {
        title: "Document Processing Automation",
        summary: "Created OCR + extraction pipeline for scanned forms.",
        metric: "Processed 1,000+ documents/day automatically",
      },
    ],

    process_steps: [
      "Data audit and feasibility review",
      "Prototype model training and baseline evaluation",
      "Iteration and improvement with validation metrics",
      "Deployment as API for integration",
      "Monitoring drift and retraining plan",
      "Production rollout + support",
    ],

    post_launch_support:
      "Includes model monitoring and performance review. Optional retraining plan and continuous improvement support.",

    platforms: ["OpenAI API", "Google Vision", "AWS SageMaker", "HuggingFace", "LangChain"],

    risk_controls: [
      "Dataset bias review and validation",
      "Model accuracy reporting and benchmarking",
      "Explainability checks (where required)",
      "Deployment with rollback versioning",
      "Monitoring model drift over time",
    ],

    engagement: ["Prototype + MVP delivery", "AI integration consulting", "Monthly AI improvement retainer"],

    communication: ["Weekly progress review", "Shared model evaluation reports", "Milestone-based delivery"],

    packages: [
      {
        name: "Starter (AI Prototype)",
        summary: "For testing feasibility and proving AI value quickly.",
        price: "$3,000+",
        features: [
          "Baseline ML model",
          "Dataset processing pipeline",
          "Accuracy report",
          "Prototype API endpoint",
        ],
      },
      {
        name: "Growth (Production AI Integration)",
        summary: "For businesses ready to deploy AI into operations.",
        price: "$7,000+",
        features: [
          "Production model deployment",
          "API integration into web/mobile",
          "Monitoring + logging",
          "Documentation + handover",
        ],
      },
      {
        name: "Enterprise (AI Platform)",
        summary: "For organizations needing scalable AI systems with monitoring.",
        price: "Custom Quote",
        features: [
          "Model versioning system",
          "Dashboards for performance monitoring",
          "Continuous retraining pipeline",
          "SLA support + scaling",
        ],
      },
    ],

    tech_stack: {
      languages: ["Python"],
      frameworks: ["TensorFlow", "PyTorch", "Scikit-learn"],
      data_tools: ["Pandas", "NumPy", "OpenCV"],
      deployment: ["FastAPI", "Flask", "Docker"],
    },

    tags: ["AI", "machine learning", "data science", "automation", "intelligent systems"],

    use_cases: [
      "Fraud detection",
      "Recommendation systems",
      "Document processing",
      "Customer support bots",
      "Predictive analytics",
    ],

    delivery_model: [
      "Model development",
      "AI integration",
      "Ongoing model improvement",
    ],
  },

  {
    id: "cloud",
    name: "Cloud, DevOps & AWS Services",
    description:
      "We help businesses deploy, scale, and automate their systems using modern cloud infrastructure and DevOps practices.",

    offerings: [
      "Cloud hosting & migration",
      "Docker containerization",
      "CI/CD pipeline setup",
      "Server automation",
      "System monitoring & optimization",
    ],

    deliverables: [
      "Cloud infrastructure setup (AWS/GCP/Azure)",
      "Docker containerization + deployment pipeline",
      "CI/CD automation (GitHub Actions/GitLab CI)",
      "Monitoring + alerting dashboards (Grafana/CloudWatch)",
      "Load balancing + scaling configuration",
      "Backup + disaster recovery setup",
      "Infrastructure documentation and handover",
    ],

    business_outcomes: [
      "Reduce downtime and improve system reliability",
      "Deploy faster using automated CI/CD pipelines",
      "Improve security through infrastructure best practices",
      "Lower hosting costs with scaling optimization",
      "Enable growth-ready infrastructure for high traffic",
    ],

    timeline: "1–4 weeks (depending on complexity)",

    starting_from: "From $1,500 (setup) / $3,000+ (migration + automation)",

    best_for: [
      "Startups scaling traffic",
      "Businesses migrating to cloud hosting",
      "Teams needing DevOps automation",
      "Organizations requiring monitoring and uptime",
    ],

    proof_points: [
      {
        title: "Cloud Migration + Scaling Setup",
        summary: "Migrated backend services to AWS with monitoring and CI/CD.",
        metric: "Reduced deployment time from hours to minutes",
      },
      {
        title: "Docker + CI/CD Automation",
        summary: "Containerized application and implemented automated deployment pipeline.",
        metric: "Enabled daily safe deployments",
      },
    ],

    process_steps: [
      "Infrastructure audit and assessment",
      "Cloud architecture planning",
      "Containerization and deployment setup",
      "CI/CD pipeline automation",
      "Monitoring + alerts configuration",
      "Handover documentation + training",
    ],

    post_launch_support:
      "Ongoing infrastructure support available with monitoring, cost optimization, and scaling improvements.",

    platforms: [
      "AWS EC2",
      "AWS S3",
      "AWS RDS",
      "CloudFront",
      "Google Cloud Run",
      "Azure App Services",
      "DigitalOcean",
    ],

    risk_controls: [
      "Infrastructure as Code (Terraform/CloudFormation)",
      "Backup and disaster recovery plans",
      "Security hardening (IAM, firewall rules, SSL)",
      "Uptime monitoring + alerts",
      "Deployment rollback configuration",
      "Cost monitoring + budget alerts",
    ],

    engagement: ["Cloud setup project", "Monthly DevOps retainer", "Dedicated DevOps engineer"],

    communication: ["Weekly review + performance report", "Incident response support options", "Documentation and training"],

    packages: [
      {
        name: "Starter (Cloud Setup)",
        summary: "For teams needing basic deployment and hosting setup.",
        price: "$1,500+",
        features: [
          "Server setup + deployment",
          "SSL + domain setup",
          "Basic monitoring",
          "Backup configuration",
        ],
      },
      {
        name: "Growth (DevOps Automation)",
        summary: "For teams needing CI/CD and automated deployments.",
        price: "$3,000+",
        features: [
          "Docker containerization",
          "CI/CD pipeline",
          "Monitoring dashboards",
          "Performance optimization",
        ],
      },
      {
        name: "Enterprise (Cloud Scaling & SLA)",
        summary: "For organizations requiring reliability, scaling, and uptime guarantees.",
        price: "Custom Quote",
        features: [
          "Load balancing + auto scaling",
          "Disaster recovery strategy",
          "Security reviews",
          "SLA support plan",
        ],
      },
    ],

    tech_stack: {
      cloud_providers: ["AWS", "Google Cloud", "Azure"],
      containers: ["Docker", "Kubernetes"],
      ci_cd: ["GitHub Actions", "GitLab CI", "Jenkins"],
      infrastructure: ["Terraform", "CloudFormation", "Ansible"],
      monitoring: ["Prometheus", "Grafana", "CloudWatch"],
    },

    tags: ["cloud", "devops", "aws", "automation", "infrastructure"],

    use_cases: [
      "High-traffic web apps",
      "Microservices systems",
      "Enterprise deployments",
      "Disaster recovery systems",
      "Scalable startups",
    ],

    delivery_model: [
      "Cloud setup",
      "Ongoing infrastructure management",
      "Performance optimization",
    ],
  },
];

export const global_tags = [
  "custom software",
  "web development",
  "blockchain",
  "AI",
  "mobile apps",
  "cloud services",
  "enterprise solutions",
  "startup solutions",
];

// default export for convenience
export default { company, services, global_tags };
