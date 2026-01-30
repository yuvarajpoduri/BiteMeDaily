import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Check, X, Sparkles, Brain, ScrollText, Clock, Bookmark, Heart } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/content';

const Dashboard = () => {
  const { user } = useAuth();
  const [currentContent, setCurrentContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const [message, setMessage] = useState('');
  const [seenCount, setSeenCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/daily`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      if (response.data.limitReached) {
        setLimitReached(true);
        setMessage(response.data.message);
      } else if (response.data.noMoreContent) {
        setMessage(response.data.message);
      } else {
        setCurrentContent(response.data.content);
        setSeenCount(response.data.seenCount);
        setIsSaved(false);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleRead = async () => {
    try {
      await axios.post(`${API_URL}/read`, { contentId: currentContent._id }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchContent();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleSkip = async () => {
    try {
      await axios.post(`${API_URL}/skip`, { contentId: currentContent._id }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchContent();
    } catch (error) {
      console.error('Error skipping:', error);
    }
  };

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await axios.post(`${API_URL}/save-forever`, { contentId: currentContent._id }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setIsSaved(res.data.savedForeverIds.includes(currentContent._id));
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Brain size={64} className="text-accent-orange" />
      </motion.div>
      <p className="text-zinc-500 font-black tracking-[0.2em] text-sm text-center uppercase">Feeding your brain...</p>
    </div>
  );

  if (limitReached || message) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-8"
      >
        <div className="w-24 h-24 bg-accent-orange/10 rounded-full flex items-center justify-center mb-8 border border-accent-orange/20">
          <Clock className="text-accent-orange" size={48} />
        </div>
        <h2 className="text-4xl font-black mb-6 tracking-tighter leading-tight">BRAIN FULL!</h2>
        <p className="text-zinc-400 text-lg leading-relaxed mb-10 font-medium max-w-xs mx-auto">
          {message}
        </p>
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-[3rem] w-full shadow-2xl">
           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">STORAGE: {seenCount}/8 BITES</p>
        </div>
      </motion.div>
    );
  }

  if (!currentContent) return <div className="text-center py-20 text-zinc-500">No Bites Left Today.</div>;

  const highlightColors = [
    'rgba(255, 107, 0, 0.15)',
    'rgba(0, 209, 255, 0.15)',
    'rgba(0, 255, 148, 0.15)',
    'rgba(255, 214, 0, 0.15)',
    'rgba(147, 112, 219, 0.15)'
  ];

  const CatchyText = ({ text, idx }: { text: string, idx: number }) => {
    const words = text.split(' ');
    const fonts = ['Lexend', 'Outfit'];
    return (
      <p 
        className="p-6 rounded-[2.5rem] font-bold mb-8 leading-relaxed text-xl shadow-sm border border-white/5"
        style={{ 
          fontFamily: fonts[idx % fonts.length],
          backgroundColor: highlightColors[idx % highlightColors.length],
          backgroundImage: `linear-gradient(135deg, ${highlightColors[idx % highlightColors.length]} 0%, rgba(255,255,255,0.02) 100%)`
        }}
      >
        {words.map((word, wIdx) => {
          const isSpecial = Math.random() > 0.88;
          const specialColor = highlightColors[(wIdx + idx) % highlightColors.length].replace('0.15', '1');
          return (
            <span 
              key={wIdx} 
              style={{ 
                color: isSpecial ? specialColor : 'inherit',
                fontSize: isSpecial ? '1.05em' : 'inherit'
              }}
              className={isSpecial ? "font-black tracking-tight" : ""}
            >
              {word}{' '}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3 text-white">
          HOT <span className="text-accent-orange italic uppercase">Bite</span> <Sparkles size={24} className="text-accent-yellow animate-pulse" />
        </h2>
        <div className="bg-zinc-900 border border-white/5 px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl">
           <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] whitespace-nowrap">
            {seenCount + 1} / 8 LOADED
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentContent._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass-card p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative border-white/10 bg-zinc-900/40 min-h-[500px] flex flex-col"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-accent-orange" />
               <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">
                {currentContent.category}
               </span>
            </div>
            <button 
              onClick={handleToggleSave}
              className={`p-4 rounded-2xl transition-all active:scale-90 ${isSaved ? 'bg-accent-orange text-black font-black' : 'bg-white/5 text-zinc-600'}`}
            >
              {isSaved ? <Heart size={20} fill="currentColor" strokeWidth={3} /> : <Bookmark size={20} />}
            </button>
          </div>
          
          <h1 className="text-4xl font-black leading-tight mb-12 tracking-tighter text-white">
            {currentContent.title}
          </h1>

          <div className="flex flex-col flex-1">
            <div className="space-y-4 mb-12">
              {currentContent.description.split('\n').filter(Boolean).map((para: string, idx: number) => (
                <CatchyText key={idx} text={para} idx={idx} />
              ))}
            </div>

            {currentContent.historyMetadata && (
              <div className="mb-12 p-8 bg-zinc-900/80 border border-white/5 rounded-[3rem] flex items-center gap-6 shadow-inner">
                <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center border border-white/5 shadow-xl">
                  <ScrollText className="text-accent-yellow" size={32} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-600 mb-2">TIMELINE & ORIGIN</p>
                  <p className="text-2xl font-black text-white leading-none tracking-tight">
                    {currentContent.historyMetadata.century} <span className="text-zinc-800 mx-2">•</span> {currentContent.historyMetadata.region}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-6 mt-auto">
              <button
                onClick={handleRead}
                className="w-full bg-white text-black font-black text-2xl py-8 rounded-[3rem] flex items-center justify-center gap-4 shadow-[0_25px_50px_-10px_rgba(255,255,255,0.15)] active:scale-[0.96] transition-all ring-offset-4 ring-offset-black"
              >
                <div className="w-10 h-10 bg-black/5 rounded-full flex items-center justify-center">
                  <Check size={28} strokeWidth={4} />
                </div>
                I'M SMARTER!
              </button>
              
              <div className="grid grid-cols-2 gap-5">
                <button
                  onClick={handleSkip}
                  className="bg-zinc-800/40 backdrop-blur border border-white/5 text-zinc-500 font-bold py-7 rounded-[2.5rem] flex items-center justify-center gap-3 active:bg-zinc-800 active:scale-95 transition-all"
                >
                  <X size={20} strokeWidth={4} />
                  SKIP THIS
                </button>
                <button
                  onClick={handleRead}
                  className="bg-zinc-800/40 backdrop-blur border border-white/5 text-zinc-700 font-black py-7 rounded-[2.5rem] text-[11px] uppercase tracking-tighter px-4 text-center leading-tight active:scale-95 transition-all"
                >
                  ALREADY <br/> READ
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
