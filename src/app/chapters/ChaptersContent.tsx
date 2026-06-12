'use client';
import { motion, type Variants } from 'framer-motion';
import { MapPin, Phone, Mail, ExternalLink, Scale, Users, Shield } from 'lucide-react';
import styles from './chapters.module.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const chapters = [
  {
    state: 'Virginia',
    abbr: 'VA',
    status: 'Headquarters',
    regions: ['Hampton Roads', 'Newport News', 'Norfolk', 'Chesapeake', 'Virginia Beach'],
    focus: [
      'Criminal justice documentation & CHRT intake',
      'Free expungement & record sealing clinics',
      'Know Your Rights workshops',
      'LGBTQ+ civil rights advocacy',
    ],
    contact: {
      phone: '804-602-9166',
      email: 'cirnpresident@gmail.com',
    },
    lawNote: 'Virginia Clean Slate Law takes effect July 1, 2026 — automatic sealing for eligible records.',
    active: true,
  },
  {
    state: 'Maryland',
    abbr: 'MD',
    regions: ['Baltimore City', 'Baltimore County', 'Prince George\'s County'],
    focus: [
      'Field reporting & case documentation',
      'Baltimore Bureau dispatches',
      'Rapid-response mutual aid',
      'Coalition building',
    ],
    contact: {
      email: 'cirnpresident@gmail.com',
    },
    lawNote: 'Maryland Second Chance Act — expungement eligibility expanded for nonviolent offenses.',
    active: true,
  },
  {
    state: 'North Carolina',
    abbr: 'NC',
    regions: ['Charlotte', 'Durham', 'Raleigh', 'Greensboro'],
    focus: [
      'Know Your Rights outreach',
      'Civil rights incident documentation',
      'Referral network expansion',
    ],
    contact: {
      email: 'cirnpresident@gmail.com',
    },
    lawNote: 'NC Expunction Reform — multiple pathways for nonviolent felony and misdemeanor expunctions.',
    active: false,
    comingSoon: true,
  },
  {
    state: 'Washington DC',
    abbr: 'DC',
    regions: ['District of Columbia', 'Prince George\'s County MD', 'Northern Virginia'],
    focus: [
      'Federal policy advocacy',
      'DOJ complaint coordination',
      'Congressional liaison',
      'National coalition partnerships',
    ],
    contact: {
      email: 'cirnpresident@gmail.com',
    },
    lawNote: 'DC Youth Rehabilitation Act — broad second-chance relief for offenses committed under age 25.',
    active: false,
    comingSoon: true,
  },
];

const rights = [
  {
    state: 'Virginia',
    highlights: [
      'Right to remain silent in all encounters',
      'No obligation to consent to searches',
      'Public defender right upon arrest',
      'Clean Slate: automatic sealing begins July 1, 2026',
    ],
  },
  {
    state: 'Maryland',
    highlights: [
      'Right to film police in public spaces',
      'Maryland Declaration of Rights Art. 22 — self-incrimination protection',
      'Expungement available for acquittals and many nonviolent charges',
      'Body-worn camera law: footage requestable within 14 days',
    ],
  },
  {
    state: 'North Carolina',
    highlights: [
      'James Byrd Jr. Hate Crimes Act coverage',
      'NCGS § 15A-148 — expunction for wrongful conviction',
      'NC CROWN Act — natural hair discrimination protection',
    ],
  },
  {
    state: 'Washington DC',
    highlights: [
      'DC Human Rights Act — broadest anti-discrimination law in the US',
      'Youth Rehabilitation Act — second chances for under-25 convictions',
      'Right to record police: OAG enforcement',
      'Police Complaints Board — civilian oversight',
    ],
  },
];

export default function ChaptersContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            Where We Work
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
            Mid-Atlantic.<br />Community-Rooted.
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
            IRN operates across Virginia, Maryland, North Carolina, and Washington DC —
            delivering civil rights documentation, free legal clinics, and direct advocacy
            where communities need it most.
          </motion.p>

          <motion.div className={styles.statRow} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }}>
            <div className={styles.stat}><span className={styles.statNum}>4</span><span className={styles.statLabel}>States + DC</span></div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}><span className={styles.statNum}>2</span><span className={styles.statLabel}>Active Chapters</span></div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}><span className={styles.statNum}>2</span><span className={styles.statLabel}>Chapters Expanding</span></div>
          </motion.div>
        </div>
      </header>

      {/* CHAPTERS GRID */}
      <section className={styles.section} aria-labelledby="chapters-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Our Chapters</span>
            <h2 id="chapters-heading" className={styles.sectionTitle}>Find Your Chapter</h2>
          </motion.div>

          <div className={styles.chaptersGrid}>
            {chapters.map((ch, i) => (
              <motion.div
                key={ch.state}
                className={`${styles.chapterCard} ${ch.comingSoon ? styles.chapterComingSoon : ''}`}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className={styles.chapterHeader}>
                  <div className={styles.chapterStateWrap}>
                    <span className={styles.chapterAbbr}>{ch.abbr}</span>
                    <div>
                      <h3 className={styles.chapterState}>{ch.state}</h3>
                      {ch.status && <span className={styles.hqBadge}>{ch.status}</span>}
                      {ch.comingSoon && <span className={styles.soonBadge}>Expanding 2026</span>}
                    </div>
                  </div>
                </div>

                <div className={styles.chapterRegions}>
                  <MapPin size={12} aria-hidden="true" className={styles.regionIcon} />
                  <span>{ch.regions.join(' · ')}</span>
                </div>

                <ul className={styles.focusList}>
                  {ch.focus.map((f) => (
                    <li key={f}><Shield size={11} aria-hidden="true" />{f}</li>
                  ))}
                </ul>

                <div className={styles.lawNote}>{ch.lawNote}</div>

                <div className={styles.chapterContact}>
                  {ch.contact.phone && (
                    <a href={`tel:${ch.contact.phone.replace(/-/g, '')}`} className={styles.contactLink}>
                      <Phone size={12} aria-hidden="true" />{ch.contact.phone}
                    </a>
                  )}
                  <a href={`mailto:${ch.contact.email}`} className={styles.contactLink}>
                    <Mail size={12} aria-hidden="true" />{ch.contact.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHTS BY STATE */}
      <section className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="rights-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Know Your Rights</span>
            <h2 id="rights-heading" className={styles.sectionTitle}>Key Protections by State</h2>
            <p className={styles.sectionBody}>
              Laws vary significantly across states. These highlights are not legal advice —
              they are starting points. For your situation, use{' '}
              <a href="/irn-criminal-injustice/know-your-rights" className={styles.inlineLink}>IRN's full KYR guide</a>{' '}
              or <a href="/irn-criminal-injustice/chrt" className={styles.inlineLink}>file through CHRT</a>.
            </p>
          </motion.div>

          <div className={styles.rightsGrid}>
            {rights.map((r, i) => (
              <motion.div key={r.state} className={styles.rightsCard} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h3 className={styles.rightsState}>{r.state}</h3>
                <ul className={styles.rightsList}>
                  {r.highlights.map((h) => (
                    <li key={h}><Scale size={11} aria-hidden="true" className={styles.scaleIcon} />{h}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className={styles.container}>
          <motion.div className={styles.ctaBlock} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <Users size={32} className={styles.ctaIcon} aria-hidden="true" />
            <h2 id="cta-heading" className={styles.ctaTitle}>Don't see your city?</h2>
            <p className={styles.ctaBody}>
              IRN is expanding. If you're an organizer in a state not yet listed,
              reach out — we provide resources, training, and infrastructure to
              launch new chapters.
            </p>
            <div className={styles.ctaActions}>
              <a href="mailto:cirnpresident@gmail.com?subject=Chapter%20Inquiry" className={styles.btnPrimary}>
                Inquire About a Chapter
              </a>
              <a href="/irn-criminal-injustice/chrt" className={styles.btnGhost}>
                Report an Incident
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
