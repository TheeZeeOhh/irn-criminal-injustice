'use client';
import { motion } from 'framer-motion';
import styles from './about.module.css';

const values = [
  {
    num: '01',
    title: 'Abolition-Informed',
    body: "We don't ask institutions to police themselves better. We build the infrastructure communities need to replace them.",
  },
  {
    num: '02',
    title: 'Zero-Knowledge Architecture',
    body: 'Our CHRT tool encrypts on your device. We cannot be compelled to surrender what we do not hold.',
  },
  {
    num: '03',
    title: 'Accountability Journalism',
    body: 'Every FOIA request, every case file, every dispatch — published. Power hates witnesses.',
  },
  {
    num: '04',
    title: 'Intersectional Practice',
    body: 'Criminal legal, family policing, environmental, housing. The same communities face all of it. We work across all of it.',
  },
];

const team = [
  { name: 'Aziza Okoro', title: 'Executive Director', location: 'Hampton Roads, VA' },
  { name: '[Name withheld]', title: 'Maryland Bureau Director', location: 'Baltimore, MD' },
  { name: '[Name withheld]', title: 'Outreach Coordinator', location: 'Triangle, NC' },
];

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span
            className={styles.kicker}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Who We Are
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Rooted in Community.
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Abolition-informed. Community-led. Building the infrastructure our people need to hold institutions accountable.
          </motion.p>
        </div>
      </header>

      {/* Mission */}
      <section className={styles.section}>
        <div className={styles.containerWide}>
          <div className={styles.missionGrid}>
            <motion.div
              className={styles.pullQuoteCol}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className={styles.pullQuote}>
                &ldquo;Power hates witnesses. We are the witnesses.&rdquo;
              </blockquote>
            </motion.div>

            <div className={styles.missionText}>
              {[
                'IRN was founded in Hampton Roads, Virginia and is now active across VA, MD, NC, and DC. Our work is focused on dismantling the criminal legal system, family policing, and environmental injustice — and building community infrastructure to replace them.',
                'Our primary communities are LGBTQ+ people — especially Black trans people — formerly incarcerated individuals, unhoused populations, and families targeted by state surveillance. These communities are not separate. The same systems harm all of them.',
                'We work through direct mutual aid, accountability journalism (CHRT, FOIA), and policy advocacy — building the evidentiary record for systemic litigation. Every case file, every dispatch, every report is part of that record.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  className={styles.missionPara}
                  variants={reveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.containerWide}>
          <motion.h2
            className={styles.sectionLabel}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            What We Stand On
          </motion.h2>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                className={styles.valueCard}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <span className={styles.valueNum}>{v.num}</span>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueBody}>{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.section}>
        <div className={styles.containerWide}>
          <motion.h2
            className={styles.sectionLabel}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            The People
          </motion.h2>
          <div className={styles.teamList}>
            {team.map((member, i) => (
              <motion.div
                key={member.name + member.title}
                className={styles.teamCard}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <span className={styles.teamName}>{member.name}</span>
                <span className={styles.teamTitle}>{member.title}</span>
                <span className={styles.teamLocation}>{member.location}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.h2
            className={styles.ctaHeading}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Get involved.
          </motion.h2>
          <motion.div
            className={styles.ctaButtons}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <a href="/chrt" className={styles.btnPrimary}>
              File a Report via CHRT
            </a>
            <a href="/volunteer" className={styles.btnGhost}>
              Volunteer with IRN
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
