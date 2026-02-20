import { useState } from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { cn } from '@/lib/utils';

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
      </div>

      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Navbar */}
      <Navbar sidebarCollapsed={sidebarCollapsed} />

      {/* Main Content */}
      <motion.main
        className={cn(
          'pt-20 pb-24 lg:pb-8 px-4 lg:px-8 min-h-screen',
          'transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        )}
        initial={false}
        animate={{
          marginLeft: sidebarCollapsed ? 80 : 260,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
