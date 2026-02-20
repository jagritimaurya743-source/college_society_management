import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Calendar, 
  Users, 
  TrendingUp,
  X,
  MessageCircle
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: Lightbulb, text: 'Suggest societies for me', color: 'text-yellow-500' },
  { icon: Calendar, text: 'What events are this week?', color: 'text-blue-500' },
  { icon: Users, text: 'Find study groups', color: 'text-green-500' },
  { icon: TrendingUp, text: 'Show trending activities', color: 'text-purple-500' },
];

const sampleResponses: Record<string, string> = {
  'Suggest societies for me': 'Based on your interests in technology and design, I recommend:\n\n1. **Tech Innovators** - Perfect for AI and web development\n2. **Design Studio** - Great for UI/UX skills\n3. **Photography Club** - Creative outlet with editing workshops',
  'What events are this week?': 'Here are the top events this week:\n\n• **AI Workshop** - March 15, 2:00 PM\n• **Design Systems Masterclass** - March 18, 10:00 AM\n• **Campus Cleanup Drive** - March 20, 9:00 AM',
  'Find study groups': 'I found these active study groups:\n\n• **CS Study Circle** - 45 members\n• **Design Critique Group** - 32 members\n• **Startup Founders** - 28 members',
  'Show trending activities': 'Trending this week:\n\n🔥 Spring Hackathon registration up 156%\n📸 Photo exhibition had 87 attendees\n🚀 3 new societies formed this month',
};

// Sparkle Component
function Sparkle({ delay = 0, size = 4 }: { delay?: number; size?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: [0, 1, 0], 
        scale: [0, 1, 0],
        rotate: [0, 180, 360]
      }}
      transition={{ 
        duration: 2, 
        delay, 
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <Sparkles className={`w-${size} h-${size} text-neon-cyan`} />
    </motion.div>
  );
}

// Floating Chatbot Button
function FloatingChatbot({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50',
        'w-14 h-14 rounded-full',
        'bg-gradient-to-r from-neon-cyan to-neon-purple',
        'flex items-center justify-center',
        'shadow-glow-lg hover:shadow-glow',
        'transition-shadow duration-300'
      )}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer ring pulse */}
      <span className="absolute inset-0 rounded-full bg-neon-cyan/30 animate-pulse-ring" />
      <span className="absolute inset-0 rounded-full bg-neon-cyan/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
      
      <MessageCircle className="w-6 h-6 text-white relative z-10" />
      
      {/* Notification dot */}
      {!isOpen && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background" />
      )}
    </motion.button>
  );
}

// Chat Interface
function ChatInterface({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. I can help you discover societies, find events, and answer questions about campus life. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string = input) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = sampleResponses[content] || 
        "I'm still learning! Try asking about societies, events, study groups, or trending activities.";
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'fixed bottom-24 lg:bottom-24 right-4 lg:right-8 z-50',
            'w-[calc(100vw-2rem)] sm:w-96',
            'glass-strong rounded-3xl overflow-hidden',
            'border border-white/20 shadow-soft-lg',
            'flex flex-col max-h-[70vh]'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex gap-3',
                  message.type === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  message.type === 'user' ? 'bg-neon-cyan/20' : 'bg-gradient-to-br from-neon-cyan to-neon-purple'
                )}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-neon-cyan" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={cn(
                  'max-w-[80%] p-3 rounded-2xl text-sm',
                  message.type === 'user' 
                    ? 'bg-neon-cyan/20 text-foreground rounded-br-md'
                    : 'bg-white/5 text-foreground rounded-bl-md'
                )}>
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('**') ? 'font-semibold mt-2' : ''}>
                      {line.replace(/\*\*/g, '')}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/5 p-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 rounded-full bg-muted-foreground"
                  />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length < 3 && (
            <div className="p-4 border-t border-white/10">
              <p className="text-xs text-muted-foreground mb-2">Quick prompts:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.text}
                    onClick={() => handleSend(prompt.text)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs',
                      'bg-white/5 hover:bg-white/10 transition-colors',
                      'border border-white/10'
                    )}
                  >
                    <prompt.icon className={cn('w-3 h-3', prompt.color)} />
                    {prompt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className={cn(
                  'flex-1 py-3 px-4 rounded-2xl',
                  'bg-white/5 border border-white/10',
                  'text-sm text-foreground placeholder:text-muted-foreground',
                  'focus:outline-none focus:border-neon-cyan/50',
                  'transition-all duration-300'
                )}
              />
              <motion.button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={cn(
                  'p-3 rounded-2xl',
                  'bg-gradient-to-r from-neon-cyan to-neon-purple',
                  'text-white',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-all duration-300'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AI() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-4"
        >
          <Sparkles className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm text-neon-cyan font-medium">Powered by AI</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Your Personal <span className="gradient-text">AI Assistant</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover societies, find events, and get personalized recommendations tailored to your interests.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickPrompts.map((prompt, index) => (
          <motion.div
            key={prompt.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6 h-full cursor-pointer relative overflow-visible"
              hover
              glow
              onClick={() => setChatOpen(true)}
            >
              {/* Sparkles */}
              <Sparkle delay={index * 0.3} size={4} />
              <Sparkle delay={index * 0.3 + 0.5} size={3} />
              
              <div className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center mb-4',
                'bg-gradient-to-br from-white/10 to-white/5'
              )}>
                <prompt.icon className={cn('w-6 h-6', prompt.color)} />
              </div>
              <h3 className="font-semibold mb-2">{prompt.text}</h3>
              <p className="text-sm text-muted-foreground">
                Click to ask the AI about this topic
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main AI Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard className="p-8 relative overflow-hidden">
          {/* Background sparkles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-4 h-4 text-neon-cyan/50" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 text-center max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center mx-auto mb-6">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Ready to help you explore</h2>
            <p className="text-muted-foreground mb-6">
              Our AI analyzes your interests and activity to suggest the perfect societies and events for you. Start a conversation to get personalized recommendations.
            </p>
            <motion.button
              onClick={() => setChatOpen(true)}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-2xl',
                'bg-gradient-to-r from-neon-cyan to-neon-purple',
                'text-white font-medium',
                'hover:shadow-glow-lg transition-all duration-300'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" />
              Start Chat
            </motion.button>
          </div>
        </GlassCard>
      </motion.div>

      {/* How it Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { step: '01', title: 'Share Interests', desc: 'Tell the AI what you\'re passionate about' },
          { step: '02', title: 'Get Recommendations', desc: 'Receive personalized society and event suggestions' },
          { step: '03', title: 'Connect', desc: 'Join communities that match your interests' },
        ].map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-center"
          >
            <span className="text-5xl font-bold gradient-text opacity-50">{item.step}</span>
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot onClick={() => setChatOpen(!chatOpen)} isOpen={chatOpen} />
      <ChatInterface isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </motion.div>
  );
}
