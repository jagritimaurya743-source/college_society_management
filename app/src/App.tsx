import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/Layout';
// App component

// Lazy load pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Societies = lazy(() => import('@/pages/Societies'));
const Events = lazy(() => import('@/pages/Events'));
const AI = lazy(() => import('@/pages/AI'));

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-12 h-12 rounded-full border-2 border-neon-cyan/20 border-t-neon-cyan" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-neon-purple/20 border-b-neon-purple"
          animate={{ rotate: -720 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}

// Animated routes
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/societies"
            element={
              <PageTransition>
                <Suspense fallback={<PageLoader />}>
                  <Societies />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/events"
            element={
              <PageTransition>
                <Suspense fallback={<PageLoader />}>
                  <Events />
                </Suspense>
              </PageTransition>
            }
          />
          <Route
            path="/ai"
            element={
              <PageTransition>
                <Suspense fallback={<PageLoader />}>
                  <AI />
                </Suspense>
              </PageTransition>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
