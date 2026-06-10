'use client';
import { motion } from 'framer-motion';
import { FileText, ClipboardList, Scale, Megaphone, CheckCircle } from 'lucide-react';
import styles from './CaseTimeline.module.css';

const timelineNodes = [
  {
    id: 'intake',
    icon: ClipboardList,
    date: 'June 2, 2026',
    title: 'Intake',
    desc: 'Incident report submitted securely via CHRT portal.',
    active: false,
  },
  {
    id: 'documentation',
    icon: FileText,
    date: 'June 3, 2026',
    title: 'Documentation',
    desc: 'IRN investigators collect evidence, FOIA records, and witness statements.',
    active: false,
  },
  {
    id: 'referral',
    icon: Scale,
    date: 'June 5, 2026',
    title: 'Attorney Referral',
    desc: 'Case matched with a specialized civil rights attorney from our network.',
    active: false,
  },
  {
    id: 'solidarity',
    icon: Megaphone,
    date: 'June 10, 2026',
    title: 'Solidarity Statement',
    desc: 'Public mobilization and narrative defense campaign launched.',
    active: false,
  },
  {
    id: 'vindication',
    icon: CheckCircle,
    date: 'June 24, 2026',
    title: 'Vindication',
    desc: 'All charges dismissed. Full accountability achieved.',
    active: true,
  },
];

export default function CaseTimeline() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.timeline} role="list">
        {timelineNodes.map((node, index) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              className={`${styles.node} ${node.active ? styles.active : ''}`}
              role="listitem"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                <Icon size={24} />
              </div>
              <div className={styles.date}>{node.date}</div>
              <h3 className={styles.title}>{node.title}</h3>
              <p className={styles.desc}>{node.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
