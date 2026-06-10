'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Nav.module.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo} aria-label="Injustice Reform Network Home">
        IRN
      </Link>

      <div className={styles.links}>
        <Link href="/" className={styles.link}>Home</Link>
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
        <Link href="/campaigns" className={styles.link}>Campaigns</Link>
        <Link href="/events" className={styles.link}>Events</Link>
        <Link href="/blog" className={styles.link}>Blog</Link>
        <Link href="/gallery" className={styles.link}>Gallery</Link>
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/contact" className={styles.link}>Contact</Link>
      </div>

      <Link href="/donate" className={styles.donateBtn}>
        Donate
      </Link>

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
          <Link href="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
          <div className={styles.mobileLink}>What We Do
            <div className={styles.mobileSublinks}>
              <Link href="/criminal-injustice" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>Criminal Injustice</Link>
              <Link href="/environmental" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>Environmental Injustice</Link>
              <Link href="/family" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>Family Policing & Reproductive Health</Link>
              <Link href="/homelessness" className={styles.mobileSublink} onClick={() => setMobileOpen(false)}>Homelessness Prevention</Link>
            </div>
          </div>
          <Link href="/campaigns" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Campaigns</Link>
          <Link href="/events" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Events</Link>
          <Link href="/blog" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Blog</Link>
          <Link href="/gallery" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Gallery</Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/donate" className={`${styles.donateBtn} mt-8 text-center`} onClick={() => setMobileOpen(false)} style={{display: 'block'}}>Donate</Link>
        </div>
      </div>
    </nav>
  );
}
