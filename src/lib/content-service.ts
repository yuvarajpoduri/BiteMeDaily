import dbConnect from './db';
import Content from '@/models/Content';
import User from '@/models/User';
import { mockedContent } from './data';

export async function seedContentIfNeeded() {
  await dbConnect();
  const count = await Content.countDocuments();
  if (count === 0) {
    console.log('Seeding content...');
    // Add a default last_shown_at to staggered dates to avoid all appearing at once
    const contents = mockedContent.map((item, index) => {
      const { id, ...rest } = item;
      return {
        _id: id,
        ...rest,
        last_shown_at: new Date(Date.now() - (index * 86400000)) // staggered days
      };
    });
    await Content.insertMany(contents);
    console.log('Seeding complete.');
  }
}

export async function getDailyContent(userId: string) {
  await dbConnect();
  await seedContentIfNeeded();

  const user = await User.findById(userId);
  if (!user) return [];

  const seenIds = user.seenContent?.map((s: any) => s.contentId) || [];
  const skippedIds = user.skippedContentIds || [];
  
  // Combine all IDs we want to hide from initial "new" pool
  const hiddenIds = [...new Set([...seenIds, ...skippedIds])];
  
  // 1. Find content NOT seen or skipped by the user
  let pool = await Content.find({
    _id: { $nin: hiddenIds }
  })
  .sort({ last_shown_at: 1 }) 
  .limit(20);

  // 2. Only if the "new" pool is tiny, bring back some "seen" repeats (NOT skipped)
  if (pool.length < 3) {
    const aWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const repeats = await Content.find({
      _id: { $nin: [...skippedIds, ...pool.map(p => p._id.toString())] }, // No skipped, no already in pool
      last_shown_at: { $lt: aWeekAgo }
    })
    .sort({ last_shown_at: 1 })
    .limit(10);
    
    // Merge repeats into pool
    for (const r of repeats) {
       pool.push(r);
    }
  }

  // 3. User Personalization / Scoring
  const scores = user.interactionProfile?.categoryScores || new Map();
  const daySeed = new Date().toISOString().split('T')[0].split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const sorted = pool.sort((a, b) => {
    const scoreA = scores.get(a.category) || 0;
    const scoreB = scores.get(b.category) || 0;
    const randA = Math.sin(daySeed + a._id.toString().length) * 2;
    const randB = Math.sin(daySeed + b._id.toString().length) * 2;
    return (scoreB + randB) - (scoreA + randA);
  });

  // Limit to 6 max, but return fewer if pool is smaller
  return sorted.slice(0, 6);
}

export async function markContentAsSeen(userId: string, contentId: string) {
  await dbConnect();
  await User.findByIdAndUpdate(userId, {
    $addToSet: { seenContent: { contentId, seenAt: new Date() } },
    $inc: { 'interactionProfile.totalReads': 1 }
  });
  
  // Also update last_shown_at for the content
  await Content.findByIdAndUpdate(contentId, {
    last_shown_at: new Date()
  });
}

export async function toggleSaveContent(userId: string, contentId: string) {
  await dbConnect();
  const user = await User.findById(userId);
  if (!user) return;

  const isSaved = user.savedContentIds.includes(contentId);
  if (isSaved) {
    await User.findByIdAndUpdate(userId, {
      $pull: { savedContentIds: contentId }
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedContentIds: contentId }
    });
  }
}
