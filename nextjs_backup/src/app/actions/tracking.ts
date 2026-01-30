'use server';

import { auth } from '@/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';

export async function trackCategoryView(category: string) {
  const session = await auth();
  if (!session?.user?.email) return;
  
  try {
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (user) {
      if (!user.interactionProfile) {
        user.interactionProfile = { categoryScores: {}, totalReads: 0 };
      }
      
      const currentScore = user.interactionProfile.categoryScores.get(category) || 0;
      user.interactionProfile.categoryScores.set(category, currentScore + 1);
      user.interactionProfile.totalReads += 1;
      user.interactionProfile.lastActive = new Date();
      
      await user.save();
    }
  } catch (error) {
    console.error("Tracking error", error);
  }
}

export async function trackSkip(contentId: string, category: string) {
  const session = await auth();
  if (!session?.user?.email) return;
  
  try {
    await dbConnect();
    
    // Atomic update to avoid race conditions with other actions
    const update: any = {
      $addToSet: { skippedContentIds: contentId },
      $pull: { savedContentIds: contentId },
      $set: { 'interactionProfile.lastActive': new Date() }
    };

    // We can't easily do $inc and $set with Map in one update without knowing the key
    // but we can try to find the user first or just use a two-step process if needed.
    // However, to keep it simple and atomic for the arrays:
    await User.findOneAndUpdate(
      { email: session.user.email },
      update
    );

    // Update scores separately if needed, but the main thing is the blackholing
    const user = await User.findOne({ email: session.user.email });
    if (user && user.interactionProfile) {
      if (!user.interactionProfile.categoryScores) {
        user.interactionProfile.categoryScores = new Map();
      }
      const currentScore = user.interactionProfile.categoryScores.get(category) || 0;
      user.interactionProfile.categoryScores.set(category, Math.max(0, currentScore - 2));
      await user.save();
    }
    
    revalidatePath('/saved');
    revalidatePath('/history');
    revalidatePath('/home');
  } catch (error) {
    console.error("Skip Tracking error", error);
  }
}
