'use client';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';
import { useCountUp } from '../hooks/useCountUp';
import { useIntersection } from '../hooks/useIntersection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import statsData from '../data/stats.json';

interface HeroProps {
  kicker?: string;
  title?: string;
  subtitle?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Hero({
  kicker = "What We Do — Criminal Justice Reform",
  title = "The System Was Built This Way.",
  subtitle = "IRN documents harm, fights wrongful prosecution, and builds the intersectional infrastructure needed to protect Black trans people, formerly incarcerated LGBTQ+ individuals, and marginalized communities from systemic abuse."
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [statRef, isStatVisible] = useIntersection<HTMLDivElement>(0.1);

  return (
    <section className={styles.hero} aria-label="Hero — Criminal Justice Reform">
      <div
        className={styles.bgImage}
        style={{ background: 'linear-gradient(160deg, #16130F 0%, #2A1B0F 50%, #1A0A04 100%)' }}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <motion.span
          className={styles.kicker}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={fadeUpVariants}
        >
          {kicker}
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={containerVariants}
        >
          {title.split(' ').map((word, i) => (
            <motion.span key={i} className={styles.word} variants={wordVariants}>
              {word}{' '}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={fadeUpVariants}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          variants={fadeUpVariants}
        >
          <Link
            href="/chrt"
            className={styles.primaryCta}
            aria-label="Report an incident through CHRT — Anonymous. Encrypted. IRN cannot be compelled to identify you."
          >
            Report an Incident →
          </Link>
          <a
            href="#approach"
            className={styles.ghostCta}
            aria-label="Learn about IRN's approach to criminal justice reform"
          >
            Learn Our Approach
          </a>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <ChevronDown size={32} />
      </div>

      <div className={styles.statBar} ref={statRef} role="region" aria-label="IRN impact statistics">
        <div className={styles.statInner}>
          {statsData.heroStats.map((stat, i) => (
            <StatItem
              key={i}
              end={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              visible={isStatVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  end,
  label,
  suffix,
  visible,
}: {
  end: number;
  label: string;
  suffix: string;
  visible: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const count = useCountUp(end, 2000, visible && !shouldReduceMotion);

  return (
    <div className={styles.statItem}>
      <span className={styles.statValue} aria-label={`${end}${suffix}`}>
        {shouldReduceMotion ? end : count}
        {suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}
