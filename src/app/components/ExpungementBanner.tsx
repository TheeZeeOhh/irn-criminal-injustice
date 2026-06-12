'use client';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';
import styles from './ExpungementBanner.module.css';

export default function ExpungementBanner() {
  return (
    <aside className={styles.banner} aria-label="Upcoming event: Free Expungement Clinic">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.pill}>Free Clinic · July 1 &amp; 15, 2026</span>
          <p className={styles.title}>Free Expungement &amp; Record Sealing Clinic</p>
          <p className={styles.subtitle}>Virginia's Clean Slate Law takes effect July 1st. Same-day filing. No cost.</p>
          <div className={styles.details}>
            <span className={styles.detail}><MapPin size={12} aria-hidden="true" /> Pearl Bailey Library → Circuit Clerk's Office</span>
            <span className={styles.detail}><CalendarDays size={12} aria-hidden="true" /> 10:00 AM – 4:00 PM both dates</span>
          </div>
        </div>
        <a href="/irn-criminal-injustice/events" className={styles.cta} aria-label="Learn more about the Free Expungement Clinic">
          Learn More <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}
