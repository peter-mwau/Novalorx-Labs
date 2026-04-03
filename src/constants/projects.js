// src/constants/Projects.js

export const sampleProjects = [
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
    link: "https://openheartchain.netlify.app/",
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
  {
    id: 7,
    title: "AutoPulse",
    category: "Web 2",
    short: "AutoPulse is a React + Vite automotive platform UI with pages for inventory, financing, trade-in, and contact workflows.",
    description:
      "AutoPulse is a React + Vite automotive platform UI that provides a seamless user experience for browsing inventory, applying for financing, managing trade-ins, and contacting dealerships. The platform features a modern design with intuitive navigation, allowing users to easily explore vehicle options, submit financing applications, and connect with dealership representatives.",
    longDescription:
      "AutoPulse is a comprehensive automotive platform UI built with React and Vite. It offers users an engaging interface to browse vehicle inventory, apply for financing, manage trade-ins, and contact dealerships. The platform is designed to provide a seamless user experience with features such as advanced search filters, interactive vehicle details pages, secure financing application forms, and a streamlined contact workflow. AutoPulse aims to enhance the car-buying journey by providing all necessary tools and information in one convenient location.",
    screenshots: [
      "/autopulse1.png",
      "/autopulse2.png",
      "/autopulse3.png",
    ],
    details: [
      "Inventory Browsing - Advanced search filters and interactive vehicle details",
      "Financing Application - Secure forms with real-time validation",
      "Trade-In Management - Streamlined process for submitting trade-in information",
      "Contact Workflow - Easy communication with dealership representatives",
      "Responsive Design - Optimized for desktop and mobile devices",
    ],
    tech: ["React", "Vite", "Tailwind CSS"],
    timeline: "2 weeks",
    team: "1 Developer",
    status: "Completed",
    link: "https://autopulsecars.netlify.app",
    github: "https://github.com/peter-mwau/AutoPulse.git",
    challenges: [
      "Designing an intuitive UI for complex automotive workflows",
      "Implementing real-time form validation for financing applications",
      "Ensuring responsive design across various devices",
    ],
    solutions: [
      "Utilized Tailwind CSS for rapid UI development and consistent styling",
      "Implemented custom validation logic with React hooks for real-time feedback",
      "Conducted thorough testing and optimization for mobile responsiveness",
    ],
  },
  {
    id: 8,
    title: "The Bazaar - Online Marketplace",
    category: "Web 3",
    short: "The Bazaar is a decentralized online marketplace built with React and Solidity.",
    description:
      "The Bazaar is a decentralized online marketplace that allows users to buy and sell goods using blockchain technology. Built with React for the frontend and Solidity for the smart contracts, The Bazaar provides a secure and transparent platform for peer-to-peer transactions.",
    longDescription:
      "The Bazaar is a decentralized online marketplace that leverages blockchain technology to facilitate secure and transparent peer-to-peer transactions. Users can browse listings, create their own listings, and complete purchases using cryptocurrency. The platform utilizes smart contracts to ensure trustless transactions, while the React frontend provides an intuitive user experience. The Bazaar aims to revolutionize e-commerce by eliminating intermediaries and empowering users to trade directly with one another.",
    screenshots: [
      "/bazaar1.png",
      "/bazaar2.png",
      "/bazaar3.png",
      "/bazaar4.png",
      "/bazaar5.png",
      "/bazaar6.png",
    ],
    details: [
      "Decentralized Marketplace - Peer-to-peer buying and selling",
      "Blockchain Integration - Secure transactions with smart contracts",
      "User-Friendly Interface - Intuitive design for seamless navigation",
      "Cryptocurrency Payments - Support for multiple cryptocurrencies",
      "Transparent Listings - Immutable records of transactions and listings",
    ],
    tech: ["React + Vite", "Solidity", "Ethers.js", "IPFS", "Chainlink"],
    timeline: "1 month",
    team: "1 Developer",
    status: "Beta",
    link: "https://the-bazaar-nft.netlify.app/",
    github: "https://github.com/peter-mwau/The_Bazaar.git",
    challenges: [
      "Designing a secure and user-friendly decentralized marketplace",
      "Implementing smart contracts for trustless transactions",
      "Ensuring seamless integration between the React frontend and Solidity backend",
    ],
    solutions: [
      "Utilized best practices in smart contract development to ensure security and reliability",
      "Implemented a clean and intuitive UI with React to enhance user experience",
      "Conducted thorough testing and optimization to ensure smooth interaction between frontend and backend components",
    ],
  }
];