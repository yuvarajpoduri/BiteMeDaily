'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="p-2 bg-gray-900 rounded-full text-gray-400 transition-colors"
      title="Sign Out"
    >
      <LogOut size={18} />
    </button>
  );
}
