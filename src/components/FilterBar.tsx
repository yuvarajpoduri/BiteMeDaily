'use client';

import { useState } from 'react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
}

export default function FilterBar({ categories, activeCategory, onSelect }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 sticky top-0 z-30 pt-2 bg-black/95 backdrop-blur-xl pb-2 border-b border-gray-900">
      <div className="flex items-center justify-between px-4 mb-2">
         <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Filtered By: <span className="text-white">{activeCategory}</span></span>
         <button 
           onClick={() => setIsOpen(!isOpen)}
           className="p-2 bg-gray-900 rounded-full text-accent-blue"
         >
            <Filter size={16} />
         </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: 'auto', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="overflow-hidden px-4"
           >
              <div className="flex flex-wrap gap-2 pb-4">
                 <button 
                    onClick={() => { onSelect('All'); setIsOpen(false); }}
                    className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-bold border",
                        activeCategory === 'All' 
                            ? "bg-white text-black border-white" 
                            : "bg-black text-gray-400 border-gray-800"
                    )}
                 >
                    All
                 </button>
                 {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => { onSelect(cat); setIsOpen(false); }}
                        className={clsx(
                            "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                            activeCategory === cat 
                                ? "bg-accent-blue/10 text-accent-blue border-accent-blue" 
                                : "bg-black text-gray-400 border-gray-800"
                        )}
                    >
                        {cat}
                    </button>
                 ))}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
