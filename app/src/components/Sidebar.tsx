import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Sparkles, 
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/societies', label: 'Societies', icon: Users },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/ai', label: 'AI Assistant', icon: Sparkles },
];

const bottomItems = [
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/help', label: 'Help', icon: HelpCircle },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          'hidden lg:flex flex-col fixed left-0 top-0 h-screen z-40',
          'glass-strong border-r border-white/10',
          'transition-all duration-300'
        )}
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 h-20">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg gradient-text">SocietyHub</span>
              </motion.div>
            )}
          </AnimatePresence>
          {isCollapsed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center mx-auto"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-neon-cyan text-black flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden',
                      isActive
                        ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    )}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-gradient-to-b from-neon-cyan to-neon-purple"
                      />
                    )}
                    
                    <Icon className={cn(
                      'w-5 h-5 transition-colors',
                      isActive ? 'text-neon-cyan' : 'group-hover:text-neon-cyan'
                    )} />
                    
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-1.5 rounded-lg glass bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        {item.label}
                      </div>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Items */}
        <div className="p-3 border-t border-white/10">
          <ul className="space-y-2">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="flex items-center gap-3 px-3 py-3 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 group relative"
                  >
                    <Icon className="w-5 h-5 group-hover:text-neon-cyan transition-colors" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-1.5 rounded-lg glass bg-black/80 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        {item.label}
                      </div>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10 safe-area-pb">
        <ul className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    'flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300',
                    isActive
                      ? 'text-neon-cyan'
                      : 'text-muted-foreground'
                  )}
                >
                  <div className={cn(
                    'relative p-2 rounded-xl transition-all duration-300',
                    isActive && 'bg-neon-cyan/20'
                  )}>
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute inset-0 rounded-xl bg-neon-cyan/20"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
