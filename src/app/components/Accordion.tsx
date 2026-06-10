'use client';
import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';

interface AccordionProps {
  question: string;
  answer: string;
}

export default function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className={styles.accordionItem}>
      <button
        className={styles.accordionBtn}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        role="button"
      >
        <span>{question}</span>
        <ChevronDown
          className={`${styles.icon} ${isOpen ? styles.open : ''}`}
          size={24}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            className={styles.contentContainer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            role="region"
            aria-label={question}
          >
            <div className={styles.content}>{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
