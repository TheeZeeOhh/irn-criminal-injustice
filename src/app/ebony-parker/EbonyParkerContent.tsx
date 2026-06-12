'use client';
import { motion } from 'framer-motion';
import { Download, Scale, CheckCircle, FileText } from 'lucide-react';
import styles from './ebony.module.css';

const timeline = [
  { date: 'Fall 2024', label: 'Initial Contact', desc: 'Dr. Ebony Parker contacts IRN following what she describes as a targeted campaign of false accusations and institutional harassment.' },
  { date: 'Winter 2024', label: 'CHRT Intake', desc: 'IRN opens a formal CHRT intake. Incident documentation begins. Pattern analysis identifies eight separate allegations with no evidentiary basis.' },
  { date: 'Spring 2025', label: 'Documentation Phase', desc: 'IRN conducts field interviews, FOIA requests, and evidence cataloguing. Attorney referral made through IRN\'s civil rights network.' },
  { date: 'Summer 2025', label: 'Attorney Engagement', desc: 'Civil rights attorney engages on the case. IRN provides documented evidentiary record as foundation for legal defense.' },
  { date: 'Fall 2025', label: 'Preliminary Hearings', desc: 'Preliminary hearings begin in Circuit Court. IRN provides solidarity statement and court accompaniment.' },
  { date: 'Spring 2026', label: 'Trial Preparation', desc: 'IRN documentation used as part of defense preparation. Community support network organized.' },
  { date: 'June 2026', label: 'All Charges Dismissed', desc: 'Circuit Court Judge Rebecca Robinson dismisses all eight criminal charges against Dr. Ebony Parker. Ruling: no criminal act had occurred.', outcome: true },
];

export default function EbonyParkerContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Case Study · Hampton Roads, Virginia
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            The Case of<br />Dr. Ebony Parker
          </motion.h1>
          <motion.div className={styles.verdict} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>
            <CheckCircle size={18} aria-hidden="true" className={styles.verdictIcon} />
            <span>All 8 charges dismissed — June 2026 · Circuit Court Judge Rebecca Robinson</span>
          </motion.div>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            IRN documented this case from intake through vindication — proof that disciplined, evidence-grounded advocacy works.
            Name used with explicit consent. IRN never identifies reporters without authorization.
          </motion.p>
          <motion.div className={styles.heroActions} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }}>
            <button className={styles.btnPrimary} onClick={() => window.print()}>
              <Download size={15} aria-hidden="true" /> Download One-Pager (Print)
            </button>
            <a href="/chrt" className={styles.btnGhost}>
              Report Your Case →
            </a>
          </motion.div>
        </div>
      </header>

      {/* SUMMARY */}
      <section className={styles.summarySection}>
        <div className={styles.container}>
          <div className={styles.summaryGrid}>
            <motion.div className={styles.summaryCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Scale size={20} className={styles.summaryIcon} aria-hidden="true" />
              <span className={styles.summaryNum}>8</span>
              <span className={styles.summaryLabel}>Charges Filed</span>
            </motion.div>
            <motion.div className={styles.summaryCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <CheckCircle size={20} className={styles.summaryIconGreen} aria-hidden="true" />
              <span className={styles.summaryNum}>8</span>
              <span className={styles.summaryLabel}>Charges Dismissed</span>
            </motion.div>
            <motion.div className={styles.summaryCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <FileText size={20} className={styles.summaryIconGold} aria-hidden="true" />
              <span className={styles.summaryNum}>18+</span>
              <span className={styles.summaryLabel}>Months Documented</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className={styles.timelineSection} aria-labelledby="timeline-heading">
        <div className={styles.container}>
          <span className={styles.sectionKicker}>Case Timeline</span>
          <h2 id="timeline-heading" className={styles.sectionTitle}>From Intake to Vindication</h2>

          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <motion.div
                key={item.date}
                className={`${styles.timelineItem} ${item.outcome ? styles.timelineOutcome : ''}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <div className={styles.timelineDot} aria-hidden="true">
                  {item.outcome && <CheckCircle size={14} />}
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <span className={styles.timelineDate}>{item.date}</span>
                    <span className={styles.timelineLabel}>{item.label}</span>
                  </div>
                  <p className={styles.timelineDesc}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IRN DID */}
      <section className={styles.irnSection} aria-labelledby="irn-heading">
        <div className={styles.container}>
          <span className={styles.sectionKicker}>IRN's Role</span>
          <h2 id="irn-heading" className={styles.sectionTitle}>What Accountability Looks Like</h2>
          <div className={styles.irnGrid}>
            {[
              { title: 'Documentation', body: 'CHRT intake, field interviews, evidence cataloguing, and FOIA requests built an evidentiary record that formed the foundation of the legal defense.' },
              { title: 'Attorney Referral', body: 'IRN connected Dr. Parker with a civil rights attorney within 72 hours of intake through the IRN referral network.' },
              { title: 'Court Accompaniment', body: 'IRN provided solidarity presence and trauma-informed accompaniment at preliminary and final hearings.' },
              { title: 'Solidarity Statement', body: 'IRN issued a public solidarity statement supporting Dr. Parker, helping build community awareness and counter the false narrative.' },
            ].map((item, i) => (
              <motion.div key={item.title} className={styles.irnCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}>
                <h3 className={styles.irnCardTitle}>{item.title}</h3>
                <p className={styles.irnCardBody}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} aria-labelledby="ep-cta-heading">
        <div className={styles.container}>
          <motion.div className={styles.ctaBlock} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 id="ep-cta-heading" className={styles.ctaTitle}>If this happened to you —</h2>
            <p className={styles.ctaBody}>Report through CHRT. Anonymous. Encrypted. IRN cannot be compelled to identify you.</p>
            <a href="/chrt" className={styles.btnPrimary}>Report Through CHRT →</a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
