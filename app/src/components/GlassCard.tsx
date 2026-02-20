import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  gradient = false,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-3xl overflow-hidden',
        'backdrop-blur-xl bg-white/10 dark:bg-black/10',
        'border border-white/20',
        hover && 'transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1',
        glow && 'hover:shadow-glow',
        gradient && 'gradient-border',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
