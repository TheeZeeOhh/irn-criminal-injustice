'use client';

import { useState } from 'react';
import { Home, Zap, User, ChevronDown, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './panels.module.css';

interface Scenario {
  id: string;
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  rights: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'eviction',
    icon: Home,
    title: 'Eviction Notice',
    rights: [
      'In Virginia, you have 5 days to respond to an Unlawful Detainer after receiving it.',
      'You have the absolute right to a court hearing — the landlord cannot remove you without one.',
      'No landlord, sheriff, or constable can lock you out without a court order of possession.',
      'In Maryland (Baltimore), you have the right to a Failure to Pay Rent hearing and can pay rent owed before or at the hearing to stop eviction.',
      'Utility shutoff during an active eviction proceeding may be illegal — document any attempts immediately.',
      'Self-help evictions (changing locks, removing belongings, cutting utilities) are illegal in both Virginia and Maryland.',
    ],
  },
  {
    id: 'utility',
    icon: Zap,
    title: 'Utility Shutoff',
    rights: [
      'In Virginia and Maryland, utilities must provide at least 10 days written notice before disconnection for non-payment.',
      'If a household member has a documented medical necessity, you may qualify for a medical exception to disconnection.',
      'You have the right to enter a payment plan arrangement — utilities cannot refuse a reasonable plan.',
      'Emergency energy assistance programs exist: LIHEAP (Low Income Home Energy Assistance Program) is available year-round.',
      'Winter disconnection protections exist in Maryland — BGE and Pepco cannot shut off heat service November through March if you have applied for assistance.',
      'If utility service was shut off illegally, file a complaint with the Maryland PSC (410-767-8000) or Virginia SCC (1-800-552-7945) immediately.',
    ],
  },
  {
    id: 'police',
    icon: User,
    title: 'Police Encounter',
    rights: [
      'You have the right to remain silent — clearly state "I am invoking my right to remain silent."',
      'You have the right to refuse a search of your person, vehicle, or home without a warrant. Say clearly: "I do not consent to this search."',
      'You have the right to ask: "Am I being detained or am I free to go?" If free, calmly leave.',
      'If you are arrested, you have the right to an attorney. Say: "I want a lawyer" — do not answer further questions.',
      'In Maryland, the Anton\'s Law gives you the right to record police encounters in public spaces.',
      'Excessive force should be documented — photograph injuries immediately and file an internal affairs complaint.',
    ],
  },
];

export default function RightsPanel() {
  const [openId, setOpenId] = useState<string | null>('eviction');

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <p className={styles.panelEyebrow}>Emergency Rights Card</p>
        <h2 className={styles.panelTitle}>Know Your Rights Now</h2>
        <p className={styles.panelDesc}>
          Select your situation. Plain-language rights, ready to read or share.
        </p>
      </div>

      <div className={styles.rightsGrid}>
        {SCENARIOS.map(({ id, icon: Icon, title, rights }) => {
          const isOpen = openId === id;
          return (
            <div key={id} className={styles.scenarioCard}>
              <button
                className={styles.scenarioHeader}
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
                aria-controls={`scenario-body-${id}`}
              >
                <div className={styles.scenarioTitleWrap}>
                  <span className={styles.scenarioIcon}>
                    <Icon size={20} />
                  </span>
                  <span className={styles.scenarioTitle}>{title}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`${styles.scenarioChevron} ${isOpen ? styles.scenarioChevronOpen : ''}`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`scenario-body-${id}`}
                    className={styles.scenarioBody}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className={styles.rightsListLabel}>Your Rights</p>
                    <ul className={styles.rightsList}>
                      {rights.map((right) => (
                        <li key={right} className={styles.rightsItem}>
                          <span className={styles.rightsItemDot} aria-hidden="true" />
                          {right}
                        </li>
                      ))}
                    </ul>
                    <p className={styles.printHint}>
                      <Printer size={12} aria-hidden="true" />
                      Tip: Long-press or right-click to save or print this card for court.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
