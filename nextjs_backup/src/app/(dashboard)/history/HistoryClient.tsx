'use client';

import ContentCard from '@/components/ContentCard';
import { ContentItem } from '@/lib/data';
import { useState } from 'react';
import { Compass, Calendar, MapPin } from 'lucide-react';
import clsx from 'clsx';

export default function HistoryClient({ 
    initialContent, 
    savedIds 
}: { 
    initialContent: ContentItem[], 
    savedIds: string[] 
}) {
  const [activeTab, setActiveTab] = useState<'Century' | 'Region'>('Century');
  const [filterValue, setFilterValue] = useState<string>('All');

  // Extract unique filters
  const centuries = Array.from(new Set(initialContent.map(i => i.historyMetadata?.century).filter(Boolean))) as string[];
  const regions = Array.from(new Set(initialContent.map(i => i.historyMetadata?.region).filter(Boolean))) as string[];

  const filteredContent = initialContent.filter(item => {
     if (filterValue === 'All') return true;
     if (activeTab === 'Century') return item.historyMetadata?.century === filterValue;
     if (activeTab === 'Region') return item.historyMetadata?.region === filterValue;
     return true;
  });

  return (
    <div>
        {/* Sub-nav for History Dimensions */}
        <div className="flex items-center gap-4 px-4 mb-4 border-b border-gray-900 pb-2">
           <button 
             onClick={() => { setActiveTab('Century'); setFilterValue('All'); }}
             className={clsx("flex items-center gap-2 text-sm font-bold pb-2 border-b-2 transition-colors", 
                 activeTab === 'Century' ? "text-accent-yellow border-accent-yellow" : "text-gray-500 border-transparent"
             )}
            >
             <Calendar size={14} />
             By Era
           </button>
           <button 
             onClick={() => { setActiveTab('Region'); setFilterValue('All'); }}
             className={clsx("flex items-center gap-2 text-sm font-bold pb-2 border-b-2 transition-colors", 
                 activeTab === 'Region' ? "text-accent-yellow border-accent-yellow" : "text-gray-500 border-transparent"
             )}
            >
             <MapPin size={14} />
             By Region
           </button>
        </div>

        {/* Filter Pills */}
        <div className="flex overflow-x-auto gap-2 px-4 pb-4 no-scrollbar">
            <button 
                onClick={() => setFilterValue('All')} 
                className={clsx("whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold border", 
                  filterValue === 'All' ? "bg-accent-yellow text-black border-accent-yellow" : "bg-gray-900 text-gray-400 border-gray-800"
                )}
            >
                All {activeTab === 'Century' ? 'Eras' : 'Lands'}
            </button>
            {(activeTab === 'Century' ? centuries : regions).map(val => (
                 <button 
                    key={val}
                    onClick={() => setFilterValue(val)}
                    className={clsx("whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold border", 
                        filterValue === val ? "bg-accent-yellow text-black border-accent-yellow" : "bg-gray-900 text-gray-400 border-gray-800"
                    )}
                 >
                    {val}
                 </button>
            ))}
        </div>

      <div className="flex flex-col gap-6 px-1 mt-2">
         {filteredContent.map((item) => (
             <ContentCard
                key={item.id}
                {...item}
                isSaved={savedIds.includes(item.id)}
                previewMode={false} 
             />
         ))}
         
         {filteredContent.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <Compass className="w-12 h-12 mb-2 opacity-50" />
                <p className="text-sm">Lost in time? No records here.</p>
            </div>
         )}
      </div>
    </div>
  );
}
