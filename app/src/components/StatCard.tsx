import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Users, UserPlus, Calendar, TrendingUp as TrendIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  change: number;
  icon: string;
  delay?: number;
}

const iconMap: Record<string, React.ElementType> = {
  Users,
  UserPlus,
  Calendar,
  TrendingUp: TrendIcon,
};

function AnimatedNumber({ value }: { value: number }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (!hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [spring, value, hasAnimated]);

  return <motion.span>{display}</motion.span>;
}

export function StatCard({ label, value, change, icon, delay = 0 }: StatCardProps) {
  const Icon = iconMap[icon] || Users;
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <GlassCard className="p-6" hover glow>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-2">{label}</p>
            <h3 className="text-3xl font-bold text-foreground">
              <AnimatedNumber value={value} />
            </h3>
            <div className="flex items-center gap-1 mt-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.3, type: 'spring' }}
                className={cn(
                  'flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full',
                  isPositive
                    ? 'bg-green-500/20 text-green-500'
                    : 'bg-red-500/20 text-red-500'
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {Math.abs(change)}%
              </motion.div>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.2, type: 'spring' }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center"
          >
            <Icon className="w-5 h-5 text-neon-cyan" />
          </motion.div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
