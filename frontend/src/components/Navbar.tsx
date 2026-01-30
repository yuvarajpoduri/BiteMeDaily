import { NavLink } from 'react-router-dom';
import { Home, History, LogOut, Brain } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <>
      {/* Dynamic Header */}
      <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center px-4 pt-4 pointer-events-none">
        <div className="w-full max-w-[460px] bg-black/50 backdrop-blur-md rounded-2xl p-2 px-4 flex items-center justify-between pointer-events-auto border border-white/5 shadow-2xl">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-orange rounded-xl flex items-center justify-center shadow-lg border border-white/20">
                 <Brain size={22} className="text-black" strokeWidth={2.5} />
              </div>
              <h1 className="text-xl font-black tracking-tighter text-white">
                Bite<span className="text-accent-orange">Me</span>Daily
              </h1>
           </div>
           <button 
             onClick={logout}
             className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-zinc-500 active:bg-red-500 active:text-white transition-all shadow-xl"
           >
             <LogOut size={18} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      {/* Modern Bottom Navigator */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-6 pointer-events-none">
        <nav className="w-full max-w-[420px] bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex items-center justify-between shadow-[0_25px_60px_rgba(0,0,0,0.8)] pointer-events-auto">
          <NavLink 
            to="/" 
            className="flex-1 flex justify-center"
          >
            {({ isActive }) => (
              <div className={`w-full max-w-[140px] flex flex-col items-center justify-center py-4 rounded-[2rem] transition-all duration-300 ${isActive ? 'bg-white text-black shadow-xl ring-4 ring-white/10' : 'text-zinc-600'}`}>
                <Home size={22} strokeWidth={isActive ? 3 : 2} />
                <span className={`text-[10px] font-black mt-1 uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 ${isActive ? 'h-auto opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
                  FEED
                </span>
              </div>
            )}
          </NavLink>

          <div className="w-px h-8 bg-white/5" />

          <NavLink 
            to="/history" 
            className="flex-1 flex justify-center"
          >
            {({ isActive }) => (
              <div className={`w-full max-w-[140px] flex flex-col items-center justify-center py-4 rounded-[2.5rem] transition-all duration-300 ${isActive ? 'bg-white text-black shadow-xl ring-4 ring-white/10' : 'text-zinc-600'}`}>
                <History size={22} strokeWidth={isActive ? 3 : 2} />
                <span className={`text-[10px] font-black mt-1 uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 ${isActive ? 'h-auto opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'}`}>
                  BRAIN
                </span>
              </div>
            )}
          </NavLink>
          
          {/* Subtle Glow Indent */}
          <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-20 h-2 bg-accent-orange/20 blur-xl rounded-full pointer-events-none" />
        </nav>
      </div>
    </>
  );
};

export default Navbar;
