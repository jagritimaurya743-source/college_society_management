import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Plus } from 'lucide-react';
import { EventCard } from '@/components/EventCard';
import { GlassCard } from '@/components/GlassCard';
import { events } from '@/data/mockData';
import { cn } from '@/lib/utils';

const filters = ['All', 'Upcoming', 'Ongoing', 'Completed'];
const types = ['All Types', 'Workshop', 'Hackathon', 'Masterclass', 'Exhibition', 'Competition', 'Volunteering'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedType, setSelectedType] = useState('All Types');

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.society.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || 
                         event.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesType = selectedType === 'All Types' || event.type === selectedType;
    return matchesSearch && matchesFilter && matchesType;
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
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">
            Discover workshops, hackathons, and more
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-2xl',
              'glass text-foreground font-medium',
              'hover:bg-white/10 transition-all duration-300'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar className="w-4 h-4" />
            My Calendar
          </motion.button>
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
            Create Event
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col gap-4">
          {/* Search Row */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events, societies, or locations..."
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

          {/* Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap',
                    'transition-all duration-300',
                    selectedFilter === filter
                      ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                      : 'bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10'
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide sm:ml-auto">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap',
                    'transition-all duration-300',
                    selectedType === type
                      ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                      : 'bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10'
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filteredEvents.length}</span> events
        </p>
      </div>

      {/* Events Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredEvents.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            delay={index * 0.1}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
