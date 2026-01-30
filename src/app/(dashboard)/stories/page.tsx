import { auth } from '@/auth';
import { mockedContent } from '@/lib/data';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import StoriesClient from './StoriesClient';

export default async function StoriesPage() {
  const session = await auth();
  await dbConnect();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = session?.user?.email ? await User.findOne({ email: session.user.email }) : null;
  const savedIds: string[] = user?.savedContentIds || [];

  return (
    <div className="pt-4 pb-4">
      <header className="mb-2 px-4">
        <h1 className="text-2xl font-bold text-accent-blue mb-1">Explore</h1>
        <p className="text-gray-400 text-sm">Deep dive into the archives.</p>
      </header>

      <StoriesClient initialContent={mockedContent} savedIds={savedIds} />
    </div>
  );
}
