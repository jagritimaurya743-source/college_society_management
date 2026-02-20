import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import type { Society } from '@/types';
import { cn } from '@/lib/utils';

interface SocietyCardProps {
  society: Society;
  delay?: number;
}

export function SocietyCard({ society, delay = 0 }: SocietyCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ['-20%', '120%']);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ['-20%', '120%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="perspective-1000"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'relative rounded-3xl overflow-hidden',
          'backdrop-blur-xl bg-white/10 dark:bg-black/10',
          'border border-white/20',
          'cursor-pointer group',
          'transition-shadow duration-300 hover:shadow-glow'
        )}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-neon-cyan/30 blur-3xl pointer-events-none"
          style={{
            left: glowX,
            top: glowY,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={society.image}
            alt={society.name}
            className="w-full h-full object-cover"
            style={{ transform: 'translateZ(20px)' }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full glass bg-white/20">
              {society.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-neon-cyan transition-colors">
            {society.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {society.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {society.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{society.memberCount} members</span>
            </div>
            <motion.div
              className="flex items-center gap-1 text-sm text-neon-cyan font-medium"
              whileHover={{ x: 4 }}
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Gradient border on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-neon-cyan/50 to-neon-purple/50" 
               style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor', WebkitMaskComposite: 'xor' }} />
        </div>
      </motion.div>
    </motion.div>
  );
}
