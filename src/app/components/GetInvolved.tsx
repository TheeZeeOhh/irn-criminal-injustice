'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldAlert, Users, HeartHandshake, ArrowRight } from 'lucide-react';
import styles from './GetInvolved.module.css';

export default function GetInvolved() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.rule} />
      <div className={styles.inner}>
        <motion.div 
          className={styles.left}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.kicker}>Join the Work</div>
          <h2 className={styles.title}>There Are Many Ways to Stand With Us.</h2>
          <p className={styles.body}>
            Whether you volunteer, donate, report an incident, or spread the word — every form of support strengthens the community&apos;s ability to document and resist.
          </p>
        </motion.div>

        <motion.div 
          className={styles.right}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link
              href="/chrt"
              className={`${styles.card} ${styles.cardPrimary}`}
              aria-label="Report an incident through CHRT — Anonymous. Encrypted. IRN cannot be compelled to identify you."
            >
              <div className={styles.cardContent}>
                <ShieldAlert size={28} aria-hidden="true" />
                <div>
                  <span className={styles.cardText}>Report an Incident</span>
                  <span className={styles.cardPrivacy}>
                    Anonymous. Encrypted. IRN cannot be compelled to identify you.
                  </span>
                </div>
              </div>
              <ArrowRight size={24} aria-hidden="true" />
            </Link>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link
              href="/contact"
              className={`${styles.card} ${styles.cardSecondary}`}
              aria-label="Volunteer with IRN"
            >
              <div className={styles.cardContent}>
                <Users size={28} aria-hidden="true" />
                <div>
                  <span className={styles.cardText}>Volunteer</span>
                  <span className={styles.cardDesc}>Join IRN&apos;s organizing and documentation network.</span>
                </div>
              </div>
              <ArrowRight size={24} aria-hidden="true" />
            </Link>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link
              href="/donate"
              className={`${styles.card} ${styles.cardTertiary}`}
              aria-label="Donate to IRN"
            >
              <div className={styles.cardContent}>
                <HeartHandshake size={28} aria-hidden="true" />
                <div>
                  <span className={styles.cardText}>Donate</span>
                  <span className={styles.cardDesc}>Fund documentation, advocacy, and direct support.</span>
                </div>
              </div>
              <ArrowRight size={24} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
