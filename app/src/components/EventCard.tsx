import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import type { Event } from '@/types';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  delay?: number;
}

const statusConfig = {
  upcoming: { color: 'bg-green-500', text: 'Upcoming', pulse: true },
  ongoing: { color: 'bg-blue-500', text: 'Live Now', pulse: true },
  completed: { color: 'bg-gray-500', text: 'Completed', pulse: false },
  cancelled: { color: 'bg-red-500', text: 'Cancelled', pulse: false },
};

export function EventCard({ event, delay = 0 }: EventCardProps) {
  const capacityPercent = (event.registered / event.capacity) * 100;
  const status = statusConfig[event.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className={cn(
          'relative rounded-3xl overflow-hidden group',
          'backdrop-blur-xl bg-white/10 dark:bg-black/10',
          'border border-white/20',
          'cursor-pointer',
          'transition-all duration-300'
        )}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={cn(
              'flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full glass',
              status.pulse && 'relative'
            )}>
              {status.pulse && (
                <span className={cn(
                  'absolute inset-0 rounded-full animate-pulse-ring',
                  status.color
                )} />
              )}
              <span className={cn('relative flex items-center gap-2', status.pulse && 'z-10')}>
                <span className={cn('w-2 h-2 rounded-full', status.color)} />
                {status.text}
              </span>
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 text-xs font-medium rounded-full glass bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
              {event.type}
            </span>
          </div>

          {/* Society */}
          <div className="absolute bottom-4 left-4">
            <span className="text-sm text-white/80">{event.society}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-neon-cyan transition-colors line-clamp-1">
            {event.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {event.description}
          </p>

          {/* Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-neon-cyan" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-neon-cyan" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-neon-cyan" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{event.registered} / {event.capacity} registered</span>
              </div>
              <span className={cn(
                'text-xs font-medium',
                capacityPercent >= 90 ? 'text-red-500' : 'text-green-500'
              )}>
                {Math.round(capacityPercent)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  capacityPercent >= 90
                    ? 'bg-gradient-to-r from-red-500 to-red-400'
                    : 'bg-gradient-to-r from-neon-cyan to-neon-purple'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${capacityPercent}%` }}
                transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* CTA */}
          <motion.button
            className={cn(
              'w-full py-3 rounded-xl font-medium text-sm',
              'bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20',
              'border border-neon-cyan/30',
              'text-foreground',
              'flex items-center justify-center gap-2',
              'transition-all duration-300',
              'hover:from-neon-cyan/30 hover:to-neon-purple/30',
              'hover:border-neon-cyan/50',
              event.status === 'completed' || event.status === 'cancelled' ? 'opacity-50 cursor-not-allowed' : ''
            )}
            whileHover={event.status !== 'completed' && event.status !== 'cancelled' ? { scale: 1.02 } : undefined}
            whileTap={event.status !== 'completed' && event.status !== 'cancelled' ? { scale: 0.98 } : undefined}
            disabled={event.status === 'completed' || event.status === 'cancelled'}
          >
            {event.status === 'completed' ? 'Event Ended' : 
             event.status === 'cancelled' ? 'Cancelled' : 
             capacityPercent >= 100 ? 'Waitlist' : 'Register Now'}
            {event.status === 'upcoming' && capacityPercent < 100 && (
              <ArrowRight className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Gradient border glow on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div 
            className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-neon-cyan/60 via-neon-purple/40 to-neon-cyan/60"
            style={{ 
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
              maskComposite: 'xor', 
              WebkitMaskComposite: 'xor' 
            }} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
