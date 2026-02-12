# Novalorx Labs Website

<div align="center">

![Novalorx Labs](public/Novalorx_mini_logo.svg)

**Crafting Stellar Digital Experiences**

_A Product Engineering Studio building scalable digital products for startups and enterprises._

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.1-0055FF?style=flat-square)](https://www.framer.com/motion/)

</div>

---

## About Novalorx Labs

Novalorx Labs is a product engineering studio founded to build a different kind of product studio — one that puts outcomes before technology choices and partners with clients as an extension of their team. We focus on clarity, measurable impact, and predictable delivery.

### Key Metrics

- **3+ Years** operating
- **10+ Projects** delivered
- **24 hrs** average response time

---

## Our Services

### Core Services

- **Product Development** — Modern web and mobile applications with scalable architecture
- **Web3 Engineering** — Smart contracts, tokenization, and blockchain-based systems
- **AI & Data Solutions** — Machine learning pipelines, dashboards, predictive insights
- **Mobile Development** — Native and cross-platform mobile applications
- **Cloud Infrastructure** — Scalable, secure cloud architecture and DevOps

### Additional Services

- **Rapid Prototyping** — Validate ideas quickly with MVPs in weeks
- **Dedicated Teams** — Cross-functional squads embedded with your team
- **Security & Compliance** — Secure-by-design development practices

---

## Website Structure

### Sections

| Section      | File                        | Description                                                           |
| ------------ | --------------------------- | --------------------------------------------------------------------- |
| **Hero**     | `src/sections/Hero.jsx`     | Landing page with animated title and navigation                       |
| **About Us** | `src/sections/AboutUs.jsx`  | Company overview, services, process, case studies, testimonials, team |
| **Services** | `src/sections/Services.jsx` | Carousel of services with detailed sidebar modals                     |
| **Projects** | `src/sections/Projects.jsx` | Portfolio showcase with project details and screenshots               |
| **Team**     | `src/sections/Team.jsx`     | Leadership team profiles                                              |
| **Contacts** | `src/sections/Contacts.jsx` | Contact form and information                                          |
| **Navbar**   | `src/components/Navbar.jsx` | Responsive navigation component                                       |
| **Footer**   | `src/components/Footer.jsx` | Site footer with links                                                |

### Components

| Component           | Location                                  | Purpose                     |
| ------------------- | ----------------------------------------- | --------------------------- |
| **BackgroundLayer** | `src/backgrounds/BackgroundLayer.jsx`     | 3D animated background      |
| **WebThreeRareBg**  | `src/backgrounds/WebThreeRareBg-dark.jsx` | Three.js background effects |
| **useInView**       | `src/hooks/useInView.js`                  | Intersection observer hook  |

---

## Tech Stack

### Core Technologies

- **React 18.3** — UI library
- **Vite 5.4** — Build tool and dev server
- **Tailwind CSS 3.4** — Utility-first CSS framework
- **Framer Motion 11.1** — Animation library
- **Lucide React** — Icon set

### Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "vite": "^5.4.1",
  "@vitejs/plugin-react": "^4.3.1",
  "tailwindcss": "^3.4.3",
  "framer-motion": "^11.1.7",
  "lucide-react": "^0.378.0"
}
```

---

## Leadership Team

| Name               | Role                      | Bio                                                                                         |
| ------------------ | ------------------------- | ------------------------------------------------------------------------------------------- |
| **Peter Kyale**    | Co-Founder & Web3 Lead    | Leads blockchain strategy and development, focusing on scalable decentralized applications  |
| **Michael Kimani** | Co-Founder & ML & AI Lead | Specializes in machine learning solutions that drive intelligent product features           |
| **Norman Gitonga** | Co-Founder & Design Lead  | Oversees user experience and interface design, ensuring intuitive and user-centric products |
| **Clifford Adoyo** | Co-Founder & Android Lead | Heads Android development, delivering high-performance mobile applications                  |

---

## Features

### UI/UX Features

- **Animated Hero Section** — Typewriter effect with rotating titles
- **Smooth Page Transitions** — Framer Motion animations throughout
- **Responsive Design** — Mobile-first approach with breakpoints
- **Glassmorphism UI** — Modern translucent card designs
- **Interactive Carousels** — Services and projects showcase
- **Detail Modals** — In-depth project and service information

### Technical Features

- **Intersection Observer** — Scroll-triggered animations
- **Reduced Motion Support** — Accessibility for motion-sensitive users
- **Keyboard Navigation** — Full keyboard accessibility
- **Semantic HTML** — Proper ARIA labels and landmarks
- **Performance Optimized** — Will-change transforms, GPU acceleration

### Engagement Models

- **Fixed Scope** — Defined deliverables with predictable timeline
- **Time & Material** — Flexible roadmap with weekly sprints
- **Dedicated Team** — Long-term engineering pod embedded in your team

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/peter-mwau/Novalorx-Labs.git
cd novalorx-labs

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

## Project Structure

```
Novalorx-Labs/
├── public/
│   ├── sounds/          # Audio files
│   └── images/          # Static images and logos
├── src/
│   ├── assets/
│   │   ├── images/      # Component images
│   │   └── planets/     # 3D planet assets
│   ├── backgrounds/     # Background components
│   ├── components/      # Reusable UI components
│   ├── constants/       # Data files (projects, services, teams)
│   ├── hooks/           # Custom React hooks
│   ├── lottie/          # Lottie animation files
│   ├── pages/           # Page components
│   ├── sections/        # Section components
│   ├── App.css          # Global styles
│   ├── App.jsx          # Main app component
│   ├── index.css        # Tailwind imports
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json
```

---

## Contact

**Novalorx Labs** — Crafting Stellar Digital Experiences

- 📧 Email: [hello@novalorx.com](mailto:hello@novalorx.com)
- 🌐 Website: [https://novalorx.com](https://novalorx.com)
- 📍 Location: Kenya

---

## License

This project is proprietary software. All rights reserved.

---

<div align="center">

**Built with ❤️ by Novalorx Labs**

</div>
