'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Share2, Info, Maximize2, X, BookmarkCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { toggleSaveContent } from '@/app/actions';
import { trackCategoryView, trackSkip } from '@/app/actions/tracking';
import { markAsSeen } from '@/app/actions/seen';
import { useRouter } from 'next/navigation';

const categoryConfig: Record<string, { color: string }> = {
  'Tech Tips': { color: 'text-accent-blue border-accent-blue bg-accent-blue/10' },
  'Concepts Simplified': { color: 'text-accent-yellow border-accent-yellow bg-accent-yellow/10' },
  'Shortcuts & Tools': { color: 'text-accent-orange border-accent-orange bg-accent-orange/10' },
  'Health & Focus': { color: 'text-accent-green border-accent-green bg-accent-green/10' },
  'Useful Facts': { color: 'text-accent-blue border-accent-blue bg-accent-blue/10' },
  'Daily Fixes': { color: 'text-accent-yellow border-accent-yellow bg-accent-yellow/10' },
  'History Stories': { color: 'text-accent-orange border-accent-orange bg-accent-orange/10' },
  Default: { color: 'text-gray-500 border-gray-500 bg-gray-500/10' }
};

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  source?: string;
  isSaved?: boolean;
  createdAt?: string | Date;
  previewMode?: boolean;
}

export default function ContentCard({ 
  id, 
  title, 
  description, 
  category, 
  tags,
  source, 
  isSaved = false, 
  createdAt,
  previewMode = false,
}: ContentCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const [expanded, setExpanded] = useState(false); 
  const [mounted, setMounted] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [skipMessage, setSkipMessage] = useState('');
  const router = useRouter();

  const getSillyTime = (date?: string | Date) => {
    if (!date) return 'Spawned in the void';
    const now = new Date();
    const then = new Date(date);
    const diffInMs = now.getTime() - then.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 5) return 'Just hatched 🐣';
    if (diffInMins < 60) return `${diffInMins} minutes of wisdom old`;
    if (diffInHours < 24) return `Slow-cooked for ${diffInHours} hours`;
    if (diffInDays === 1) return 'Survived since yesterday';
    if (diffInDays < 7) return `Aging like fine milk (${diffInDays} days)`;
    return 'Basically ancient history';
  };

  const skipLabels = ['NEXT.', 'MEH.', 'BORING.', 'NAH.', 'UGH.', 'WHATEVER.', 'BYE BITCH.', 'TOO SMART.', 'NOPE.'];
  const sassyComments = [
    "Ouch, that hurt my feelings.",
    "Fine, stay uneducated.",
    "Your loss, honestly.",
    "I bet you're fun at parties.",
    "Error 404: User interest not found.",
    "Moving on... drama queen.",
    "Deleting from memory... zip!",
    "Okay, Einstein."
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Seed for styling consistency (Computed only on client to avoid mismatch)
  const daySeed = mounted ? new Date().toISOString().split('T')[0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  
  // Random skip label based on ID to keep it consistent for one card but different across cards
  const skipLabel = mounted ? skipLabels[id.length % skipLabels.length] : 'SKIP';

  const config = categoryConfig[category] || categoryConfig.Default;

  const handleSaveToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const previousState = saved;
    setSaved(!saved); 
    await toggleSaveContent(id, previousState); 
  };

  const handleExpand = () => {
    if (!expanded && !isSkipping) {
      setExpanded(true);
      trackCategoryView(category);
      markAsSeen(id); 
    }
  };

  const handleSkip = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSkipping(true);
    setSkipMessage(sassyComments[Math.floor(Math.random() * sassyComments.length)]);
    
    // Give time for the "sassy" animation
    setTimeout(async () => {
        await trackSkip(id, category);
        router.refresh();
    }, 800);
  };

  // Fun styling for the description: highlights some words randomly (simulated)
  const renderStyledDescription = (text: string) => {
    const words = text.split(' ');
    return words.map((word, i) => {
      // Pick some words to highlight based on some "silly" logic
      const isFun = word.length > 7 || i % 7 === 0;
      const colors = ['text-accent-orange', 'text-accent-green', 'text-accent-yellow', 'text-accent-blue'];
      const color = colors[Math.abs(daySeed + i) % colors.length];
      
      return (
        <span 
          key={i} 
          className={clsx(
            isFun ? `${color} font-black italic underline decoration-2 underline-offset-4` : "text-gray-300 font-medium",
            "inline-block mr-1.5 leading-relaxed tracking-wide transition-all cursor-default"
          )}
        >
          {word}
        </span>
      );
    });
  };

  return (
    <>
      <motion.div 
        layoutId={`card-${id}`}
        onClick={handleExpand}
        initial={false}
        animate={isSkipping ? { 
            x: [0, -20, 500], 
            rotate: [0, -10, 45],
            opacity: 0 
        } : { x: 0, rotate: 0, opacity: 1 }}
        transition={isSkipping ? { duration: 0.6, ease: "backIn" } : { type: "spring", damping: 20 }}
        className={clsx(
            "w-full bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden active:scale-[0.98] transition-transform cursor-pointer relative",
            expanded ? "fixed inset-x-4 top-[10%] bottom-[10%] z-50 bg-[#0a0a0a] shadow-2xl border-gray-700" : ""
        )}
      >
        <AnimatePresence>
            {isSkipping && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-center"
                >
                    <p className="text-xl font-black italic text-accent-orange uppercase tracking-tighter leading-none">
                        {skipMessage}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="p-5 flex flex-col h-full">
           <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
               <div className={clsx("px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest", config.color)}>
                 {category}
               </div>
               <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tight italic">
                 {mounted ? getSillyTime(createdAt) : '...'}
               </span>
             </div>
             {expanded && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                  className="p-1.5 bg-gray-900 rounded-full text-gray-400"
                >
                  <X size={18} />
                </button>
             )}
           </div>

           <h3 className={clsx(
             "font-bold text-white leading-tight mb-2",
             expanded ? "text-2xl tracking-tighter" : "text-lg line-clamp-2"
           )}>
             {title}
           </h3>

           {expanded ? (
              <div className="flex-1 overflow-y-auto no-scrollbar py-2">
                <div className="text-base leading-relaxed mb-6 whitespace-pre-wrap">
                  {renderStyledDescription(description)}
                </div>
                
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {source && (
                  <div className="mt-auto pt-4 border-t border-gray-800">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Source</p>
                    <p className="text-sm text-gray-400 font-medium italic">"{source}"</p>
                  </div>
                )}
              </div>
           ) : (
              <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed font-mono">
                {description}
              </p>
           )}

           <div className={clsx(
             "flex items-center justify-between pt-3 mt-auto",
             expanded ? "border-t border-gray-800" : ""
           )}>
             <div className="flex items-center gap-4">
               <button 
                 onClick={handleSaveToggle}
                 className="flex items-center gap-1.5 text-xs font-bold text-gray-400 active:scale-90 transition-transform"
               >
                 <Bookmark className={clsx("w-4 h-4", saved ? "fill-accent-yellow text-accent-yellow" : "")} />
                 {saved ? "SAVED" : "SAVE"}
               </button>

               {!expanded && (
                 <button 
                   onClick={handleSkip}
                   className="text-[10px] font-bold text-gray-600 transition-colors"
                 >
                   {skipLabel}
                 </button>
               )}
             </div>
             
             <div className="flex items-center gap-4">
                <button className="text-gray-400 active:scale-90 transition-transform">
                  <Share2 className="w-4 h-4" />
                </button>
                {!expanded && <Maximize2 className="w-4 h-4 text-gray-600" />}
             </div>
           </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}
