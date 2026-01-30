import BottomNav from '@/components/BottomNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <header className="px-6 py-6 border-b border-gray-900 sticky top-0 bg-black/50 backdrop-blur-md z-30">
        <h2 className="text-xl font-black tracking-tighter">
          Bite<span className="text-accent-orange">Me</span>Daily
        </h2>
      </header>
      <main className="flex-1 pb-20 overflow-y-auto no-scrollbar">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
