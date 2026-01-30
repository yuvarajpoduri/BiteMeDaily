'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { registerUser } from '@/actions/auth-actions';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await registerUser(null, formData);

      if (result.success) {
        router.push('/login');
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err) {
       console.error(err);
       setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-accent-orange/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-accent-blue/20 rounded-full blur-[80px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2 tracking-tighter">
            Bite<span className="text-accent-orange">Me</span>Daily
          </h1>
          <p className="text-gray-400">Join the hunger for knowledge.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="space-y-2">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-orange transition-colors"
            />
          </div>
          
          <div className="space-y-2">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-orange transition-colors"
            />
          </div>
          
          <div className="space-y-2">
             <input
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={6}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-orange transition-colors"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 text-sm">
          Already one of us?{' '}
          <Link href="/login" className="text-accent-orange font-medium">
            Log in here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
