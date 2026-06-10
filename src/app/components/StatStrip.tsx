'use client';
import styles from './StatStrip.module.css';
import { useCountUp } from '../hooks/useCountUp';
import { useIntersection } from '../hooks/useIntersection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import statsData from '../data/stats.json';

export default function StatStrip() {
  const [ref, isVisible] = useIntersection<HTMLDivElement>(0.1);

  return (
    <div className={styles.strip} ref={ref} role="region" aria-label="IRN impact data">
      <div className={styles.grid}>
        {statsData.impactStats.map((stat, i) => (
          <StatItem
            key={i}
            end={stat.value}
            label={stat.label}
            suffix={stat.suffix}
            visible={isVisible}
          />
        ))}
      </div>
    </div>
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
    <div className={styles.stat}>
      <span className={styles.value} aria-label={`${end}${suffix}`}>
        {shouldReduceMotion ? end : count}
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
