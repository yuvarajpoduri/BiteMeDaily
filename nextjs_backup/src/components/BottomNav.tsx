'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Layers, Bookmark, Hourglass } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();

  const links = [
    { name: 'Today', href: '/home', icon: Home, color: 'text-accent-orange' },
    { name: 'History', href: '/history', icon: Hourglass, color: 'text-accent-yellow' },
    { name: 'Saved', href: '/saved', icon: Bookmark, color: 'text-accent-green' },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-black/90 backdrop-blur-md border-t border-gray-800 flex items-center justify-around pb-safe">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="relative flex flex-col items-center justify-center w-full h-full"
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className={clsx("absolute top-0 w-12 h-1 rounded-full", link.color.replace('text-', 'bg-'))}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            <LinkIcon
              className={clsx(
                "w-6 h-6 transition-colors duration-200",
                isActive ? link.color : "text-gray-500"
              )}
            />
            <span className={clsx("text-[10px] mt-1 font-medium", isActive ? "text-white" : "text-gray-500")}>
              {link.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
