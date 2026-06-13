'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, ArrowRight, Lock, Scale } from 'lucide-react';
import styles from './InterventionDashboard.module.css';

export default function InterventionDashboard() {
  const steps = [
    {
      num: '01',
      icon: <Lock className={styles.stepIcon} size={32} />,
      title: 'Secure & Encrypt (CHRT)',
      desc: 'Log systemic misconduct anonymously. Client-side AES-256-GCM encryption ensures your evidence is locked before leaving your device.',
    },
    {
      num: '02',
      icon: <Scale className={styles.stepIcon} size={32} />,
      title: 'Analyze & Refer (CJRRP)',
      desc: 'Qualified cases of wrongful prosecution triggers our rapid response protocol, connecting you to pro bono civil rights attorneys within 72 hours.',
    },
    {
      num: '03',
      icon: <Users className={styles.stepIcon} size={32} />,
      title: 'Mobilize & Accompany',
      desc: 'We build public solidarity campaigns, provide trauma-informed court accompaniment, and monitor civil rights violations locally.',
    },
  ];

  return (
    <section className={styles.section} id="intervention-model">
      <div className={styles.container}>
        
        {/* Part 1: Featured Quote / Core Statement Banner */}
        <div className={styles.quoteWrapper}>
          <span className={styles.kicker}>Systemic Intervention</span>
          <blockquote className={styles.quoteText}>
            "The system was built this way. Documenting harm and fighting wrongful prosecution requires not just defense, but an intersectional infrastructure of solidarity."
          </blockquote>
          <cite className={styles.quoteAuthor}>— Injustice Reform Network</cite>
        </div>

        {/* Part 2: Interactive Mission Path */}
        <div className={styles.pipelineSection}>
          <h3 className={styles.pipelineTitle}>
            <Shield size={24} className={styles.stepIcon} /> Our Rapid Intervention Pipeline
          </h3>
          <div className={styles.pipelineGrid}>
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <span className={styles.stepNumber}>{step.num}</span>
                {step.icon}
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Part 3: Metrics & Actions Dashboard */}
        <div className={styles.actionSection}>
          
          {/* Action Card A: Get Support */}
          <motion.div 
            className={`${styles.actionCard} ${styles.actionCardEmber}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.cardHeader}>
              <div className={`${styles.cardKicker} ${styles.kickerEmber}`}>
                <Clock size={16} /> Legal Response Unit
              </div>
              <h4 className={styles.cardTitle}>Need Legal Intake & Representation?</h4>
              <p className={styles.cardDesc}>
                If you or a loved one is facing wrongful prosecution or systemic abuse in Virginia, Maryland, North Carolina, or DC, let us mobilize attorney resources.
              </p>
              
              <div className={styles.metricsRow}>
                <div className={styles.metricBadge}>
                  <span className={`${styles.metricVal} ${styles.metricValEmber}`}>72 Hours</span>
                  <span className={styles.metricLabel}>Attorneys Referral</span>
                </div>
                <div className={styles.metricBadge}>
                  <span className={`${styles.metricVal} ${styles.metricValEmber}`}>Pro Bono</span>
                  <span className={styles.metricLabel}>Qualifying Cases</span>
                </div>
              </div>
            </div>

            <Link href="/booking/" className={`${styles.btn} ${styles.btnEmber}`}>
              Book Intake Callback <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Action Card B: CHRT Report */}
          <motion.div 
            className={`${styles.actionCard} ${styles.actionCardGold}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.cardHeader}>
              <div className={`${styles.cardKicker} ${styles.kickerGold}`}>
                <Lock size={16} /> Secure Cryptography
              </div>
              <h4 className={styles.cardTitle}>Document Systemic Abuse Safely</h4>
              <p className={styles.cardDesc}>
                Use our decentralized, zero-knowledge CHRT system to securely report and encrypt evidence of police misconduct or corporate abuse.
              </p>

              <div className={styles.metricsRow}>
                <div className={styles.metricBadge}>
                  <span className={`${styles.metricVal} ${styles.metricValGold}`}>AES-256</span>
                  <span className={styles.metricLabel}>On-Device Cryptography</span>
                </div>
                <div className={styles.metricBadge}>
                  <span className={`${styles.metricVal} ${styles.metricValGold}`}>Zero-Knowledge</span>
                  <span className={styles.metricLabel}>Privacy Standard</span>
                </div>
              </div>
            </div>

            <Link href="/chrt/" className={`${styles.btn} ${styles.btnGold}`}>
              Launch CHRT Report <ArrowRight size={16} />
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
