import { auth } from '@/auth';
import ContentCard from '@/components/ContentCard';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Content from '@/models/Content';
import { redirect } from 'next/navigation';
import { BookmarkX } from 'lucide-react';

export default async function SavedPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  await dbConnect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = await User.findOne({ email: session.user.email });
  if (!user) redirect('/login');

  const savedIds: string[] = user?.savedContentIds || [];

  const savedContent = await Content.find({
    _id: { $in: savedIds }
  }).sort({ updatedAt: -1 });

  return (
    <div className="pt-4 pb-20 px-4">
      <header className="mb-8">
         <h1 className="text-3xl font-bold text-white mb-1">My Stash</h1>
         <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Saved for Later</p>
      </header>

      {savedContent.length > 0 ? (
        <div className="flex flex-col gap-4">
            {savedContent.map((item: any) => (
                <ContentCard
                    key={item._id.toString()}
                    id={item._id.toString()}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    tags={item.tags}
                    isSaved={true}
                    createdAt={item.createdAt}
                />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mb-6">
              <BookmarkX className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Nothing Saved</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Find something interesting on your Daily feed and save it to see it here!
            </p>
        </div>
      )}
    </div>
  );
}
