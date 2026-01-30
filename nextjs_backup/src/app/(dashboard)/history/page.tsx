import { auth } from '@/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Content from '@/models/Content';
import ContentCard from '@/components/ContentCard';
import { redirect } from 'next/navigation';
import { History } from 'lucide-react';

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  await dbConnect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = await User.findOne({ email: session.user.email });
  if (!user) redirect('/login');

  // Filter for items seen in the last 5 days
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  const skippedIds = user.skippedContentIds || [];
  const seenInLast5Days = user.seenContent?.filter((s: any) => 
    s.seenAt >= fiveDaysAgo && !skippedIds.includes(s.contentId)
  ) || [];
  const seenIds = seenInLast5Days.map((s: any) => s.contentId);
  const savedIds = user.savedContentIds || [];

  // Fetch items from Content collection
  const rawContent = await Content.find({
    _id: { $in: seenIds }
  });

  // Reorder according to the seenAt date from user record
  const seenContent = seenInLast5Days
    .map((s: any) => {
      const item = rawContent.find(c => c._id.toString() === s.contentId);
      if (!item) return null;
      return {
        ...item.toObject(),
        seenAt: s.seenAt
      };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => b.seenAt - a.seenAt);

  return (
    <div className="pt-4 pb-20 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Your Journey</h1>
        <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">History of Bites</p>
      </header>

      {seenContent.length > 0 ? (
        <div className="flex flex-col gap-4">
            {seenContent.map((item: any) => (
                <ContentCard
                    key={item._id.toString()}
                    id={item._id.toString()}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    tags={item.tags}
                    isSaved={savedIds.includes(item._id.toString())}
                    createdAt={item.createdAt}
                />
            ))}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">End of History</p>
            </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
            <div className="w-20 h-20 bg-accent-yellow/10 rounded-full flex items-center justify-center mb-6">
              <History className="w-10 h-10 text-accent-yellow" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Clean Slate!</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              You haven't seen any bites yet. Head over to Today and start discovering!
            </p>
        </div>
      )}
    </div>
  );
}
