import { auth } from '@/auth';
import ContentCard from '@/components/ContentCard';
import { getDailyContent } from '@/lib/content-service';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { redirect } from 'next/navigation';
import { CheckCheck, Sparkles } from 'lucide-react';
import SignOutButton from '@/components/SignOutButton';

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  await dbConnect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = await User.findOne({ email: session.user.email });
  if (!user) redirect('/login');

  const feedContent = await getDailyContent(user._id.toString());
  const savedIds: string[] = user?.savedContentIds || [];

  return (
    <div className="pt-4 pb-20 px-4">
      <header className="mb-8 flex items-center justify-between">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <Sparkles className="w-4 h-4 text-accent-yellow" />
             <p className="text-gray-400 text-xs uppercase tracking-wider font-bold">Today's Bites</p>
           </div>
           <h1 className="text-3xl font-bold text-white leading-tight">
             Hi, {user?.name?.split(' ')[0] || 'User'}
           </h1>
           <p className="text-gray-500 text-xs mt-1">{feedContent.length} {feedContent.length === 1 ? 'new thing' : 'new things'} for you to discover today.</p>
        </div>
        <div className="flex items-center gap-3">
          <SignOutButton />
        </div>
      </header>
      
      {feedContent.length > 0 ? (
        <div className="flex flex-col gap-4">
          {feedContent.map((item: any) => (
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
          
          <div className="mt-8 p-6 rounded-2xl bg-gray-900/50 border border-gray-800 text-center">
            <p className="text-gray-400 text-sm">That's all for today!</p>
            <p className="text-gray-500 text-xs mt-1">Come back tomorrow for more fresh bites.</p>
          </div>
        </div>
      ) : (
         <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
            <div className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center mb-6">
              <CheckCheck className="w-10 h-10 text-accent-green" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're All Caught Up!</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              You've devoured everything new in our library. We're brewing fresh bites for you. Check back tomorrow!
            </p>
        </div>
      )}
    </div>
  );
}
