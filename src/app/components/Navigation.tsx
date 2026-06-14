'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navigation() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b"
      style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--line)' }}
    >
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold tracking-widest text-[#D4A843] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
          IRN
        </Link>
      </div>
      <nav className="flex gap-8">
        <Link href="/" className="hover:text-[#D4A843] transition-colors uppercase text-sm tracking-wider font-semibold">Home</Link>
        <Link href="/surveillance-map" className="hover:text-[#D4A843] transition-colors uppercase text-sm tracking-wider font-semibold">Surveillance Map</Link>
        <Link href="/mutual-aid" className="hover:text-[#D4A843] transition-colors uppercase text-sm tracking-wider font-semibold">Mutual Aid</Link>
      </nav>
    </motion.header>
  );
}
