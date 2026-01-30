import Content from '../models/Content.js';
import User from '../models/User.js';
import { simulateDailyRefresh } from '../utils/newsSimulator.js';

export const getDailyContent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const todayStr = new Date().toISOString().split('T')[0];
    
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const seenToday = user.seenContent.filter(item => {
      const seenTime = new Date(item.seenAt).getTime();
      return seenTime >= startOfToday.getTime();
    });

    const seenCount = seenToday.length;

    if (seenCount >= 8) {
      return res.json({
        limitReached: true,
        message: "Your brain is full for today! 🧠 Visit tomorrow for fresh bites.",
        seenCount
      });
    }

    const getCandidates = async () => {
      const currentExcluded = new Set([
        ...user.seenContent.map(i => i.contentId.toString()),
        ...user.skippedContentIds.map(id => id.toString())
      ]);
      return await Content.find({
        _id: { $nin: Array.from(currentExcluded) },
        publishDate: todayStr 
      }).limit(20);
    };

    let candidates = await getCandidates();

    // If TODAY'S news is running low (< 4), generate more or fall back
    if (candidates.length < 4) {
      console.log(`[DailyFeed] Low on fresh bites (${candidates.length}), checking fallback...`);
      
      const fExcl = new Set([
        ...user.seenContent.map(i => i.contentId.toString()),
        ...user.skippedContentIds.map(id => id.toString())
      ]);

      // Fallback search: any content the user hasn't seen/skipped yet
      const fallback = await Content.find({
        _id: { $nin: Array.from(fExcl) }
      }).sort({ createdAt: -1 }).limit(10);

      candidates = [...candidates, ...fallback];

      // If STILL low after fallback, generate new stuff
      if (candidates.length < 2) {
        console.log(`[DailyFeed] Total exhaust! Generating fresh news...`);
        await simulateDailyRefresh();
        candidates = await getCandidates();
      }
    }

    if (candidates.length === 0) {
      return res.json({
        message: "You've devoured everything in our fridge! 🍎 Check back later for fresh bites.",
        noMoreContent: true
      });
    }

    // Light AI: Score based on preferences
    const scoredCandidates = candidates.map(item => {
      const score = user.interactionProfile.categoryScores.get(item.category) || 0;
      return { item, score: score + (Math.random() * 4) }; 
    });

    const bestContent = scoredCandidates.sort((a, b) => b.score - a.score)[0].item;
    console.log(`[DailyFeed] Serving fresh bite: ${bestContent.title}`);

    res.json({
      content: bestContent,
      seenCount,
      remainingToday: 8 - seenCount
    });

  } catch (error) {
    console.error('[GetDailyContent Error]:', error);
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { contentId } = req.body;
    const cidStr = contentId.toString();

    const alreadyRead = user.seenContent.some(item => item.contentId.toString() === cidStr);

    if (!alreadyRead) {
      const content = await Content.findById(contentId);
      if (!content) return res.status(404).json({ message: "Content not found" });

      const currentScore = user.interactionProfile.categoryScores.get(content.category) || 0;
      user.interactionProfile.categoryScores.set(content.category, currentScore + 1);
      
      user.seenContent.push({ contentId: cidStr, seenAt: new Date() });
      user.interactionProfile.totalReads += 1;
      await user.save();
      console.log(`[Read] User ${user.email} read ${content.title}`);
    }

    res.json({ message: "Added to your brain's historical archives! 🧠📜" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const skipContent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { contentId } = req.body;
    const cidStr = contentId.toString();

    if (!user.skippedContentIds.map(id => id.toString()).includes(cidStr)) {
      const content = await Content.findById(contentId);
      if (!content) return res.status(404).json({ message: "Content not found" });

      const currentScore = user.interactionProfile.categoryScores.get(content.category) || 0;
      user.interactionProfile.categoryScores.set(content.category, currentScore - 0.5);

      user.skippedContentIds.push(cidStr);
      await user.save();
      console.log(`[Skip] User ${user.email} skipped ${content.title}`);
    }

    res.json({ message: "Skipped! Not every bite is for everyone. 🧀" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReadHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // 5 days ago timestamp
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // Filter seen content IDs that are within the last 5 days
    const recentSeenIds = user.seenContent
      .filter(item => new Date(item.seenAt) >= fiveDaysAgo)
      .map(item => item.contentId);

    // Combine with forever saved IDs
    const historyIds = [...new Set([...recentSeenIds, ...user.savedForeverIds])];
    
    const history = await Content.find({
      _id: { $in: historyIds }
    }).sort({ createdAt: -1 });

    res.json({
      history,
      savedForeverIds: user.savedForeverIds
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleSaveForever = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { contentId } = req.body;

    if (user.savedForeverIds.includes(contentId)) {
      user.savedForeverIds = user.savedForeverIds.filter(id => id !== contentId);
    } else {
      user.savedForeverIds.push(contentId);
    }

    await user.save();
    res.json({ 
      savedForeverIds: user.savedForeverIds,
      message: user.savedForeverIds.includes(contentId) ? "Saved forever! This bite is now immortal. 🧛‍♂️" : "Unsieved! It's back to being mortal. 🍎"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
