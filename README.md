# College Society Management System
https://react.dev/
https://www.typescriptlang.org/
https://vitejs.dev/
https://tailwindcss.com/
https://www.framer.com/motion/
A premium, production-ready SaaS frontend for managing college societies, events, and student engagement. Built with modern React, featuring stunning glassmorphism UI, smooth animations, and a fully responsive design.
 License 

 Status 
* Live Demo
* View Live Demo
* Features
* Design System
Glassmorphism UI - Frosted glass cards with backdrop-blur-xl
Dual Theme - Seamless light/dark mode with animated toggle
Neon Accents - Cyan (#00f5ff) and Purple (#a855f7) color scheme
Smooth Animations - 500ms transitions throughout
8px Grid System - Consistent spacing with Tailwind
# Core Components
Table
Copy
Component	Description
ThemeToggle	Animated Sun/Moon with rotation & glow effects
GlassCard	Reusable glassmorphism container
StatCard	Animated statistics with count-up numbers
SocietyCard	3D tilt effect on hover using Framer Motion
EventCard	Capacity bars with status pulse badges
Sidebar	Collapsible with smooth width animation
Navbar	Search, notifications (pulse), profile dropdown
# Pages
Dashboard - Analytics charts, recent activity, upcoming events
Societies - Filterable grid with 3D hover cards
Events - Event listings with animated capacity indicators
AI Assistant - Chat interface with sparkle animations & floating button
# Animations
Page transitions (fade + slide)
Card hover effects (scale 1.03 + lift)
3D perspective tilt on society cards
Floating chatbot with bounce + pulse ring
Count-up number animations
Gradient border glows on hover
# Tech Stack
Table
Copy
Technology	Purpose
React 18	UI Library
TypeScript	Type Safety
Vite	Build Tool
Tailwind CSS 3.4	Styling
Framer Motion	Animations
Recharts	Data Visualization
React Router v6	Routing
Lucide React	Icons
Context API	State Management
# Getting Started
Prerequisites
Node.js 18+
npm or yarn
Installation
bash
Copy
# Clone the repository
git clone https://github.com/yourusername/college-society-management.git
cd college-society-management

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
Environment Variables
env
Copy
# No environment variables required for frontend-only deployment
# API base URL can be configured in src/lib/api.ts
# Project Structure
plain
Copy
college-society-management/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ThemeToggle.tsx
│   │   ├── GlassCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── SocietyCard.tsx
│   │   ├── EventCard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── Layout.tsx
│   ├── context/            # React Context providers
│   │   └── ThemeContext.tsx
│   ├── data/               # Mock data
│   │   └── mockData.ts
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route pages (lazy loaded)
│   │   ├── Dashboard.tsx
│   │   ├── Societies.tsx
│   │   ├── Events.tsx
│   │   └── AI.tsx
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── App.tsx             # Main app component
│   ├── index.css           # Global styles
│   └── main.tsx            # Entry point
├── index.html
├── tailwind.config.js      # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json
└── package.json
# Customization
Tailwind Config
The project uses a custom Tailwind configuration with:
JavaScript
Copy
// tailwind.config.js
colors: {
  neon: {
    cyan: '#00f5ff',
    purple: '#a855f7',
  },
},
fontFamily: {
  inter: ['Inter', 'system-ui', 'sans-serif'],
},
borderRadius: {
  '3xl': '1.5rem',
},
boxShadow: {
  glow: '0 0 20px rgba(0, 245, 255, 0.3)',
  'glow-lg': '0 0 40px rgba(0, 245, 255, 0.4)',
}
Theme Toggle
The theme system uses CSS variables and persists to localStorage:
TypeScript
Copy
// Toggle between light/dark
const { theme, toggleTheme } = useTheme();

// Theme is applied to <html> element
<html class="dark"> // or "light"
# Key Features Explained
3D Tilt Cards (SocietyCard)
Uses Framer Motion's useMotionValue and useTransform for realistic 3D perspective on hover:
TypeScript
Copy
const x = useMotionValue(0);
const y = useMotionValue(0);
const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
Animated Stats (StatCard)
Count-up animation using Framer Motion springs:
TypeScript
Copy
const spring = useSpring(0, { duration: 2000, bounce: 0 });
const display = useTransform(spring, (current) => Math.floor(current));
Glassmorphism
Consistent glass effect across components:
css
Copy
.glass {
  @apply backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20;
}
🔧 Available Scripts
Table
Copy
Command	Description
npm run dev	Start development server
npm run build	Build for production
npm run preview	Preview production build
npm run lint	Run ESLint
npm run type-check	Run TypeScript checks
# Responsive Breakpoints
Table
Copy
Breakpoint	Width	Layout Changes
Mobile	< 640px	Bottom navigation, stacked cards
Tablet	640px - 1024px	2-column grids
Desktop	> 1024px	Full sidebar, 3-4 column grids
# Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
Code Style
Use TypeScript for all new files
Follow existing component patterns
Use cn() utility for className merging
Add Framer Motion for animations
Maintain 8px spacing grid
# Screenshots
Dashboard
Societies Grid
Events
AI Assistant
# License
This project is licensed under the MIT License - see the LICENSE file for details.
# Acknowledgments
Framer Motion for incredible animation library
Tailwind CSS for utility-first styling
Recharts for React chart components
Lucide for beautiful icons
@ Contact
For questions or feedback, please open an issue or contact:
Email: your.email@example.com
GitHub: @yourusername
