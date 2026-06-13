'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search } from 'lucide-react';
import styles from './Nav.module.css';
import GlobalSearch from './GlobalSearch';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Handle hotkeys (Cmd+K / Ctrl+K or /) to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || 
                      target.tagName === 'TEXTAREA' || 
                      target.isContentEditable;
      if (isInput) return;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === '/') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="/irn-criminal-injustice/criminal-injustice" className={styles.logo} aria-label="Injustice Reform Network Home">
        <img src="/irn-criminal-injustice/logo.png" alt="" aria-hidden="true" style={{ height: '44px', width: 'auto' }} />
        <span className={styles.logoText}>IRN</span>
      </a>

      <div className={styles.links}>
        <a href="/irn-criminal-injustice/criminal-injustice" className={styles.link}>Home</a>
        <div className={styles.dropdown}>
          <button className={styles.link} aria-haspopup="true" aria-expanded="false">
            What We Do
          </button>
          <div className={styles.dropdownMenu}>
            <Link href="/criminal-injustice" className={`${styles.dropdownItem} ${styles.activeLink}`} aria-current="page">
              Criminal Injustice
            </Link>
            <Link href="/environmental" className={styles.dropdownItem}>Environmental Injustice</Link>
            <Link href="/family" className={styles.dropdownItem}>Family Policing & Reproductive Health</Link>
            <Link href="/homelessness" className={styles.dropdownItem}>Homelessness Prevention</Link>
          </div>
        </div>
        <Link href="/services" className={styles.link}>Services</Link>
        <Link href="/booking" className={styles.link}>Book Intake</Link>
        <Link href="/agents" className={styles.link}>AI Agents</Link>
        <Link href="/campaigns" className={styles.link}>Campaigns</Link>
        <Link href="/events" className={styles.link}>Events</Link>
        <Link href="/blog" className={styles.link}>Blog</Link>
        <Link href="/gallery" className={styles.link}>Gallery</Link>
        <Link href="/chapters" className={styles.link}>Chapters</Link>
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/contact" className={styles.link}>Contact</Link>
        <Link href="/newsletter" className={styles.link}>Newsletter</Link>
        <button 
          onClick={() => setSearchOpen(true)} 
          className={styles.link}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', border: 'none', background: 'none' }}
          aria-label="Open global search"
        >
          <Search size={16} /> Search
        </button>
      </div>

      <Link href="/donate" className={styles.donateBtn}>
        Donate
      </Link>

      <button 
        className={styles.mobileSearchBtn} 
        onClick={() => setSearchOpen(true)}
        aria-label="Open search"
      >
        <Search size={24} />
      </button>

      <button 
        className={styles.mobileMenuBtn} 
        onClick={() => setMobileOpen(true)}
        aria-label="Open mobile menu"
      >
        <Menu size={28} />
      </button>

      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`}>
        <button 
          className={styles.mobileCloseBtn}
          onClick={() => setMobileOpen(false)}
          aria-label="Close mobile menu"
        >
          <X size={32} />
        </button>
        <div className={styles.mobileLinks}>
          <a href="/irn-criminal-injustice/criminal-injustice" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</a>
          <div className={styles.mobileLink}>What We Do
            <div className={styles.mobileSublinks}>
              <Link href="/criminal-injustice" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>Criminal Injustice</Link>
              <Link href="/environmental" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>Environmental Injustice</Link>
              <Link href="/family" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>Family Policing & Reproductive Health</Link>
              <Link href="/homelessness" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>Homelessness Prevention</Link>
            </div>
          </div>
          <Link href="/services" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Services</Link>
          <Link href="/booking" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Book Intake</Link>
          <Link href="/agents" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>AI Agents</Link>
          <Link href="/campaigns" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Campaigns</Link>
          <Link href="/events" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Events</Link>
          <Link href="/blog" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link href="/gallery" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Gallery</Link>
          <Link href="/chapters" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Chapters</Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/newsletter" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Newsletter</Link>
          <button 
            className={styles.mobileLink} 
            onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', background: 'none' }}
          >
            <Search size={22} /> Search
          </button>
          <Link href="/donate" className={`${styles.donateBtn} mt-8 text-center`} onClick={() => setMobileOpen(false)} style={{display: 'block'}}>Donate</Link>
        </div>
      </div>
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}
