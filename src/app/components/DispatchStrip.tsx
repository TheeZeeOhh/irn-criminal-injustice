'use client';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Newspaper } from 'lucide-react';
import styles from './DispatchStrip.module.css';

export default function DispatchStrip() {
  return (
    <section className={styles.wrapper} aria-labelledby="dispatch-heading">
      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
        >
          <div className={styles.kicker}>
            <Newspaper size={14} aria-hidden="true" />
            The People&apos;s Intelligence Brief
          </div>
          <h2 id="dispatch-heading" className={styles.title}>
            The Dispatch is Live.
          </h2>
          <p className={styles.body}>
            Vol. 01 · June 2026 — case files, accountability reports, policy
            updates, and field notes from Hampton Roads to Baltimore. Because
            power hates witnesses.
          </p>
          <a
            href="/dispatch-vol01.html"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            aria-label="Read The Dispatch Vol. 01 — IRN's People's Intelligence Brief, June 2026"
          >
            <FileText size={20} aria-hidden="true" />
            Read Vol. 01
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <p className={styles.note}>
            Vol. 02 in production — subscribe below to get it first.
          </p>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, delay: 0.12 }}
          aria-hidden="true"
        >
          <div className={styles.cover}>
            <div className={styles.coverMast}>THE DISPATCH</div>
            <div className={styles.coverSub}>The People&apos;s Intelligence Brief</div>
            <div className={styles.coverLine} />
            <div className={styles.coverVol}>Vol. 01 · No. 01 · June 2026</div>
            <div className={styles.coverOrg}>Injustice Reform Network</div>
            <div className={styles.coverTagline}>Because power hates witnesses.</div>
            <div className={styles.coverLine} />
            <ul className={styles.coverToc}>
              <li>Priority Briefing · Red Alert</li>
              <li>Case File 001 · Newport News</li>
              <li>The Watchlist · 11 Agencies</li>
              <li>The Illusion of Power — Book Release</li>
              <li>IRN OS v2 · Full-Stack CJRRP</li>
              <li>By the Numbers · 1.7M Children</li>
              <li>Field Notes · Baltimore Bureau</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
