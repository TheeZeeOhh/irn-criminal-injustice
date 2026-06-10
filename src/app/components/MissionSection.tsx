'use client';
import { motion, type Variants } from 'framer-motion';
import { Scale, FileSearch, Landmark } from 'lucide-react';
import styles from './MissionSection.module.css';

const commitments = [
  {
    icon: Scale,
    title: 'Direct Support',
    desc: 'Legal education, fines relief, and case management for people most targeted by the criminal legal system.',
  },
  {
    icon: FileSearch,
    title: 'Documentation',
    desc: 'CHRT-powered incident tracking, FOIA requests, and pattern analysis that builds the evidentiary record.',
  },
  {
    icon: Landmark,
    title: 'Advocacy',
    desc: 'JFV legislative pipeline, DOJ complaints, and coalition building to hold institutions accountable.',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' as const },
  }),
};

export function MissionSection() {
  return (
    <section className={styles.section} id="approach">
      <div className={styles.inner}>
        <motion.div
          className={styles.quoteWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          custom={0}
          variants={fadeUp}
        >
          <blockquote className={styles.pullquote}>
            &ldquo;The Injustice Reform Network is dedicated to combating inequities within the
            criminal justice system. We advocate for individuals affected by wrongful convictions
            and unjust legal or administrative practices.&rdquo;
          </blockquote>
        </motion.div>

        <div className={styles.commitments}>
          {commitments.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                className={styles.commitment}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                custom={i + 1}
                variants={fadeUp}
              >
                <Icon size={24} className={styles.commitmentIcon} aria-hidden="true" />
                <div className={styles.commitmentText}>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
