'use client';

import ContentCard from '@/components/ContentCard';
import FilterBar from '@/components/FilterBar';
import { ContentItem } from '@/lib/data';
import { useState } from 'react';

// Client component wrapper for Stories to handle state
export default function StoriesClient({ 
    initialContent, 
    savedIds 
}: { 
    initialContent: ContentItem[], 
    savedIds: string[] 
}) {
  const [filter, setFilter] = useState('All');

  // Logic: 
  // - Show everything (EXCEPT History, as that's moved to another tab per user request)
  // - Filter based on selection
  const visibleContent = initialContent.filter(item => {
     if (item.category === 'History Stories') return false; // Explicitly excluded for new tab
     if (filter === 'All') return true;
     return item.category === filter;
  });

  const categories = Array.from(new Set(initialContent
    .filter(c => c.category !== 'History Stories')
    .map(c => c.category)
  ));

  return (
    <>
      <FilterBar categories={categories} activeCategory={filter} onSelect={setFilter} />
      
      <div className="flex flex-col gap-6 px-1">
         {visibleContent.map((item) => (
             <ContentCard
                key={item.id}
                {...item}
                isSaved={savedIds.includes(item.id)}
                previewMode={false} // Full cards as requested "display everthing info in card"
             />
         ))}
         
         {visibleContent.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-10">No stories found in this category.</p>
         )}
      </div>
    </>
  );
}
