import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Grid3X3, List } from 'lucide-react';
import { SocietyCard } from '@/components/SocietyCard';
import { GlassCard } from '@/components/GlassCard';
import { societies } from '@/data/mockData';
import { cn } from '@/lib/utils';

const categories = ['All', 'Technology', 'Design', 'Arts', 'Business', 'Academic', 'Social', 'Entertainment'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Animation variants

export default function Societies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSocieties = societies.filter((society) => {
    const matchesSearch = society.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         society.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || society.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Societies</h1>
          <p className="text-muted-foreground mt-1">
            Discover and join amazing student communities
          </p>
        </div>
        <motion.button
          className={cn(
            'flex items-center gap-2 px-5 py-3 rounded-2xl',
            'bg-gradient-to-r from-neon-cyan to-neon-purple',
            'text-white font-medium',
            'hover:shadow-glow-lg transition-all duration-300'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4" />
          Create Society
        </motion.button>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search societies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'w-full py-3 pl-12 pr-4 rounded-2xl',
                'bg-white/5 border border-white/10',
                'text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:border-neon-cyan/50 focus:ring-2 focus:ring-neon-cyan/20',
                'transition-all duration-300'
              )}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap',
                  'transition-all duration-300',
                  selectedCategory === category
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                    : 'bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-3 rounded-xl transition-all duration-300',
                viewMode === 'grid'
                  ? 'bg-neon-cyan/20 text-neon-cyan'
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10'
              )}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-3 rounded-xl transition-all duration-300',
                viewMode === 'list'
                  ? 'bg-neon-cyan/20 text-neon-cyan'
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10'
              )}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filteredSocieties.length}</span> societies
        </p>
      </div>

      {/* Societies Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          'grid gap-6',
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        )}
      >
        {filteredSocieties.map((society, index) => (
          <SocietyCard
            key={society.id}
            society={society}
            delay={index * 0.08}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredSocieties.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No societies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
