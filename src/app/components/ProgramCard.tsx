'use client';
import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './ProgramCard.module.css';

interface ProgramCardProps {
  title: string;
  description: string;
  delay?: number;
}

export default function ProgramCard({ title, description, delay = 0 }: ProgramCardProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={styles.dot} aria-hidden="true" />
      <h3 className={styles.title}>{title}</h3>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={contentId}
            className={styles.descContainer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className={styles.desc}>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={styles.expanderBtn}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
      >
        {expanded ? 'Show less' : 'Learn more ↓'}
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        />
      </button>
    </motion.div>
  );
}
