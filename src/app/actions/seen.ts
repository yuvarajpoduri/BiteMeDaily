'use server';

import { auth } from '@/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';

export async function markAsSeen(contentId: string) {
  const session = await auth();
  if (!session?.user?.email) return;

  try {
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    
    const isAlreadySeen = user?.seenContent?.some((s: any) => s.contentId === contentId);

    if (user && !isAlreadySeen) {
        user.seenContent.push({ contentId, seenAt: new Date() });
        await user.save();
        revalidatePath('/history');
    }
  } catch (error) {
    console.error("Tracking Seen error", error);
  }
}
