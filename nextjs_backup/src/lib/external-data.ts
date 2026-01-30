import { ContentItem } from './data';

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Fallback data in case APIs fail
const FALLBACK_NEWS: ContentItem[] = [
  {
    id: 'fb1',
    category: 'News',
    title: 'Offline Mode: API Limit Reached',
    description: 'We could not fetch live news right now. This usually happens if the API key is missing or quota is exceeded. Please check back later!',
    source: 'System',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    publishDate: new Date().toISOString().split('T')[0]
  }
];

export async function fetchLiveNews(): Promise<ContentItem[]> {
  // Use NewsAPI (requires key)
  // If no key, return fallback primarily to avoid crashes during demo if user didn't add key
  if (!NEWS_API_KEY) {
    console.warn("NEWS_API_KEY missing. Returning fallback news.");
    return FALLBACK_NEWS;
  }

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`, 
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) throw new Error('Failed to fetch news');

    const data = await res.json();
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.articles.map((article: any, index: number) => ({
      id: `news-${index}-${Date.now()}`, // Generate unique ID
      title: article.title,
      description: article.description || article.content || "No description available.",
      category: 'News', // Mapping all to News for this specific endpoint
      source: article.source.name,
      imageUrl: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      publishDate: article.publishedAt.split('T')[0],
      url: article.url // Keep url if we want to link out (optional)
    }));
  } catch (error) {
    console.error("News Fetch Error:", error);
    return FALLBACK_NEWS;
  }
}

export async function fetchHistoricalEvents(): Promise<ContentItem[]> {
  try {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    // Wikipedia On This Day API (Free, No Auth)
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/selected/${month}/${day}`,
      { next: { revalidate: 86400 } } // Cache for 24 hours
    );

    if (!res.ok) throw new Error('Failed to fetch history');

    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.selected.slice(0, 15).map((event: any, index: number) => ({
      id: `hist-${event.year}-${index}`,
      title: `${event.year}: ${event.text.split('.')[0]}`, // Short title
      description: event.pages?.[0]?.extract || event.text, // Accurate full text
      category: 'History Stories',
      source: 'Wikipedia Historical Archives',
      imageUrl: event.pages?.[0]?.thumbnail?.source || 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80',
      historyMetadata: {
        century: `${Math.ceil(event.year / 100)}th Century`,
        region: 'Global' // Wikipedia doesn't give region easily, defaulting to Global
      },
      publishDate: new Date().toISOString().split('T')[0] // Seen as "fresh" content for today
    }));

  } catch (error) {
    console.error("History Fetch Error:", error);
    return [
       {
        id: 'hist-fallback',
        category: 'History Stories',
        title: 'Time Machine Malfunction',
        description: 'Could not retrieve the archives. Verify your connection.',
        source: 'System',
        historyMetadata: { century: '21st Century', region: 'Server Room' }
       }
    ];
  }
}
