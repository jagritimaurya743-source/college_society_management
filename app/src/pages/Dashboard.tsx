import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ArrowRight, Calendar, TrendingUp, Users, Sparkles } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { GlassCard } from '@/components/GlassCard';
import { stats, monthlyData, categoryData, activities, events } from '@/data/mockData';
import { cn } from '@/lib/utils';

const COLORS = ['#00f5ff', '#a855f7', '#22c55e', '#f59e0b', '#ef4444'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">Jordan</span>!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your societies today.
          </p>
        </div>
        <motion.button
          className={cn(
            'flex items-center gap-2 px-5 py-3 rounded-2xl',
            'bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20',
            'border border-neon-cyan/30 text-foreground font-medium',
            'hover:from-neon-cyan/30 hover:to-neon-purple/30 transition-all duration-300',
            'hover-glow'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-4 h-4 text-neon-cyan" />
          AI Recommendations
        </motion.button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Growth Overview</h3>
                <p className="text-sm text-muted-foreground">Societies, events, and members over time</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span>+24%</span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorSocieties" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="societies" 
                    stroke="#00f5ff" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorSocieties)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="events" 
                    stroke="#a855f7" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorEvents)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        {/* Pie Chart */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6 h-full">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Society Categories</h3>
              <p className="text-sm text-muted-foreground">Distribution by interest area</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {categoryData.map((entry, index) => (
                <div key={`cat-${index}`} className="flex items-center gap-1.5">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-xs text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <button className="text-sm text-neon-cyan hover:underline flex items-center gap-1">
                View all
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors"
                >
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium text-neon-cyan">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <button className="text-sm text-neon-cyan hover:underline flex items-center gap-1">
                View all
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                    <span className="text-lg font-bold text-neon-cyan">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate group-hover:text-neon-cyan transition-colors">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.registered}/{event.capacity}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
