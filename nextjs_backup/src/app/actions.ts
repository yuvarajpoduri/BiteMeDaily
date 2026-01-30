'use server';

import { auth } from '@/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';

export async function toggleSaveContent(contentId: string, currentState: boolean) {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
        return { error: "User not found" };
    }

    if (currentState) {
      // It was saved, so remove it
      // Filter out specific ID safely
      user.savedContentIds = user.savedContentIds.filter((id: string) => id !== contentId);
    } else {
      // It was not saved, so add it
      if (!user.savedContentIds.includes(contentId)) {
        user.savedContentIds.push(contentId);
      }
    }

    await user.save();
    revalidatePath('/saved');
    revalidatePath('/home'); // Optional, mainly for sync
    return { success: true, saved: !currentState };
  } catch (error) {
    console.error("Save error:", error);
    return { error: "Failed to save" };
  }
}
