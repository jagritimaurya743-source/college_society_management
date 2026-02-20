import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  LogOut, 
  User, 
  Settings
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { currentUser } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface NavbarProps {
  sidebarCollapsed: boolean;
}

const notifications = [
  {
    id: '1',
    title: 'New event registration',
    message: 'Sarah Johnson registered for AI Workshop',
    time: '2 min ago',
    unread: true,
  },
  {
    id: '2',
    title: 'Event reminder',
    message: 'Design Systems Masterclass starts in 1 hour',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: '3',
    title: 'Society update',
    message: 'Tech Innovators posted a new announcement',
    time: '3 hours ago',
    unread: false,
  },
];

export function Navbar({ sidebarCollapsed }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-30 h-20',
        'glass-strong border-b border-white/10',
        'transition-all duration-300',
        sidebarCollapsed ? 'lg:left-20' : 'lg:left-64'
      )}
      style={{ left: 0 }}
    >
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <motion.div
            className={cn(
              'relative flex items-center',
              'rounded-2xl overflow-hidden',
              'transition-all duration-300',
              searchFocused ? 'ring-2 ring-neon-cyan/50' : ''
            )}
            animate={{ 
              backgroundColor: searchFocused ? 'rgba(0, 245, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)' 
            }}
          >
            <Search className={cn(
              'absolute left-4 w-5 h-5 transition-colors',
              searchFocused ? 'text-neon-cyan' : 'text-muted-foreground'
            )} />
            <input
              type="text"
              placeholder="Search societies, events, or people..."
              className={cn(
                'w-full py-3 pl-12 pr-4 bg-transparent',
                'text-sm text-foreground placeholder:text-muted-foreground',
                'focus:outline-none'
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className={cn(
                'relative w-12 h-12 rounded-2xl glass flex items-center justify-center',
                'hover-glow transition-all duration-300',
                showNotifications && 'ring-2 ring-neon-cyan/50'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-foreground" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 animate-pulse-ring" />
                </>
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'absolute right-0 top-full mt-2 w-80',
                    'glass-strong rounded-3xl overflow-hidden',
                    'border border-white/20 shadow-soft-lg'
                  )}
                >
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <button className="text-xs text-neon-cyan hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          'p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer',
                          notification.unread && 'bg-neon-cyan/5'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <span className="w-2 h-2 rounded-full bg-neon-cyan mt-1.5 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-white/10">
                    <button className="w-full py-2 text-sm text-neon-cyan hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <motion.button
              onClick={() => setShowProfile(!showProfile)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-2xl glass',
                'hover:bg-white/10 transition-all duration-300',
                showProfile && 'ring-2 ring-neon-cyan/50'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-neon-cyan/30"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium leading-tight">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </div>
              <ChevronDown className={cn(
                'w-4 h-4 text-muted-foreground transition-transform',
                showProfile && 'rotate-180'
              )} />
            </motion.button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'absolute right-0 top-full mt-2 w-64',
                    'glass-strong rounded-3xl overflow-hidden',
                    'border border-white/20 shadow-soft-lg'
                  )}
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-neon-cyan/30"
                      />
                      <div>
                        <p className="font-semibold">{currentUser.name}</p>
                        <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-left">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-left">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Settings</span>
                    </button>
                  </div>
                  <div className="p-2 border-t border-white/10">
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors text-left text-red-500">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
