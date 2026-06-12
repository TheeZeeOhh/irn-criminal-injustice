'use client';
import { motion } from 'framer-motion';
import styles from './CHRTExplainer.module.css';

const steps = [
  {
    step: 'STEP 01',
    title: 'YOU REPORT ANONYMOUSLY',
    desc: 'No name. No address. A decentralized identifier (DID) links your reports without identifying you. Client-side AES-256-GCM encryption means IRN cannot be compelled to produce what it does not possess.',
    visual: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="40" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="45" y="45" width="30" height="30" rx="4" fill="var(--ember)" />
        <path d="M60 20 L60 10 M60 110 L60 100 M20 60 L10 60 M110 60 L100 60" stroke="var(--gold)" strokeWidth="2" />
      </svg>
    )
  },
  {
    step: 'STEP 02',
    title: 'IRN DOCUMENTS AND ACTS',
    desc: 'Your report enters IRN\'s civil rights database. If it triggers the CJRRP, an attorney referral and solidarity statement follow within 72 hours.',
    visual: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="30" width="80" height="60" rx="2" stroke="var(--ink2)" strokeWidth="2" />
        <path d="M30 45 H90 M30 60 H70 M30 75 H90" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="90" cy="90" r="15" fill="var(--bg)" stroke="var(--ember)" strokeWidth="4" />
        <path d="M85 90 L88 93 L95 85" stroke="var(--ember)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    step: 'STEP 03',
    title: 'DATA BECOMES LEGISLATION',
    desc: <>Documented patterns become testimony, FOIA requests, DOJ complaints, and Virginia General Assembly evidence through IRN's JFV legislative partnership. <br /><br /><a href="/campaigns" style={{color: '#D4A843', fontWeight: 500, textDecoration: 'underline'}}>View the Newport News Community Safety & Equity Act kit →</a></>,
    visual: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 100 L40 60 L60 80 L100 20" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="100" cy="20" r="6" fill="var(--ember)" />
        <circle cx="60" cy="80" r="4" fill="var(--ink2)" />
        <circle cx="40" cy="60" r="4" fill="var(--ink2)" />
        <circle cx="20" cy="100" r="4" fill="var(--ink2)" />
      </svg>
    )
  }
];

export default function CHRTExplainer() {
  return (
    <div className={styles.wrapper}>
      {steps.map((item, index) => (
        <div key={item.step}>
          <motion.div 
            className={styles.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.textCol}>
              <div className={styles.kicker}>{item.step}</div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
            <div className={styles.visualCol}>
              {item.visual}
            </div>
          </motion.div>
          {index < steps.length - 1 && <div className={styles.divider} />}
        </div>
      ))}
    </div>
  );
}
