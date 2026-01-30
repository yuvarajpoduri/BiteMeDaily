import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ScrollText, Search, Archive, Heart, Clock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import API_BASE_URL from '../config';

const API_URL = `${API_BASE_URL}/content`;

const History = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [savedForeverIds, setSavedForeverIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/history`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setHistory(response.data.history);
        setSavedForeverIds(response.data.savedForeverIds);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user.token]);

  const filteredHistory = history.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const savedForever = filteredHistory.filter(item => savedForeverIds.includes(item._id));
  const recentItems = filteredHistory.filter(item => !savedForeverIds.includes(item._id));

  const handleToggleSave = async (contentId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const res = await axios.post(`${API_URL}/save-forever`, { contentId }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSavedForeverIds(res.data.savedForeverIds);
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
       <Archive size={48} className="text-zinc-800 animate-bounce mb-4" />
       <p className="text-gray-600 font-black uppercase tracking-[0.4em] text-xs">ARCHIVE SEARCH...</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="px-2">
        <h1 className="text-5xl font-black tracking-tighter mb-10 mt-2">
          Brain <span className="text-accent-orange">History</span>
        </h1>
        
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={24} />
          <input 
            type="text" 
            placeholder="Search your bites..."
            className="w-full bg-zinc-900 border border-white/5 rounded-[2rem] py-7 pl-16 pr-6 text-white text-xl focus:outline-none focus:border-accent-orange transition-none font-black placeholder:text-zinc-800 shadow-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl p-6 flex items-center justify-center"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-card p-10 max-w-[440px] w-full border-white/10 bg-zinc-900 shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[85vh] no-scrollbar"
              onClick={e => e.stopPropagation()}
            >
               <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-orange bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    {selectedItem.category}
                  </span>
                  <button 
                    onClick={(e) => handleToggleSave(selectedItem._id, e)}
                    className={`p-4 rounded-2xl transition-none ${savedForeverIds.includes(selectedItem._id) ? 'bg-accent-orange text-black' : 'bg-white/5 text-gray-400'}`}
                  >
                    <Heart size={20} fill={savedForeverIds.includes(selectedItem._id) ? "currentColor" : "none"} strokeWidth={3} />
                  </button>
               </div>
               <h2 className="text-4xl font-black mb-8 leading-tight tracking-tighter">{selectedItem.title}</h2>
               <div className="space-y-6 text-xl font-bold text-zinc-300 leading-relaxed mb-10">
                 {selectedItem.description.split('\n').filter(Boolean).map((p: string, i: number) => (
                   <p key={i} className="p-5 rounded-[2rem] border border-white/5" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>{p}</p>
                 ))}
               </div>
               <button 
                 onClick={() => setSelectedItem(null)}
                 className="w-full bg-white text-black font-black py-7 rounded-[2.5rem] text-xl shadow-xl active:scale-[0.98] transition-all"
               >
                 GOT IT!
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {savedForever.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="px-2 flex items-center gap-3">
             <Heart size={18} fill="#FF6B00" className="text-accent-orange" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">IMMORTAL BITES</h2>
          </div>
          <div className="flex flex-col gap-4 px-2">
            {savedForever.map((item, index) => (
              <HistoryCard key={item._id} item={item} isSaved={true} onToggleSave={handleToggleSave} index={index} onSelect={() => setSelectedItem(item)} />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-6">
        <div className="px-2 flex items-center gap-3">
           <Clock size={18} className="text-zinc-700" />
           <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">TEMPORARY MEMORY (5D)</h2>
        </div>
        
        {recentItems.length === 0 && savedForever.length === 0 ? (
          <div className="text-center py-24 px-10">
            <ScrollText className="mx-auto mb-6 text-zinc-800" size={48} />
            <p className="text-zinc-600 font-black text-xl tracking-tighter uppercase">Memory Bank Empty</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-2">
            {recentItems.map((item, index) => (
              <HistoryCard key={item._id} item={item} isSaved={false} onToggleSave={handleToggleSave} index={index + savedForever.length} onSelect={() => setSelectedItem(item)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const HistoryCard = ({ item, isSaved, onToggleSave, index, onSelect }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.03 }}
    onClick={onSelect}
    className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden cursor-pointer active:bg-zinc-800/50 shadow-lg"
  >
    <div className="flex items-center justify-between mb-6 relative z-10">
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent-blue py-1.5 px-3 bg-white/5 border border-white/5 rounded-full">
        {item.category}
      </span>
      <button 
        onClick={(e) => onToggleSave(item._id, e)}
        className={`p-4 rounded-2xl transition-none ${isSaved ? 'bg-accent-orange text-black' : 'bg-white/5 text-zinc-700'}`}
      >
        <Heart size={18} fill={isSaved ? "currentColor" : "none"} strokeWidth={3} />
      </button>
    </div>
    <h3 className="text-3xl font-black mb-4 leading-tight tracking-tighter relative z-10">{item.title}</h3>
    
    <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
      <span className="text-[10px] text-zinc-700 font-black uppercase tracking-[0.4em]">
        {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
      </span>
      <div className="flex items-center gap-2 text-accent-orange font-black text-[9px] tracking-widest">
         DEVOUR <ChevronRight size={12} strokeWidth={4} />
      </div>
    </div>
  </motion.div>
);

export default History;
