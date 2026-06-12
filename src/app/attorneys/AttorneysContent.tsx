'use client';
import { motion, type Variants } from 'framer-motion';
import { MapPin, Phone, Mail, ExternalLink, Scale, Clock, DollarSign } from 'lucide-react';
import styles from './attorneys.module.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const attorneys = [
  {
    name: 'Attorney George Evans',
    title: 'Civil Rights & Criminal Defense',
    jurisdiction: ['Virginia'],
    regions: 'Hampton Roads, Newport News, Richmond',
    practiceAreas: ['Expungement & Record Sealing', 'Criminal Defense', 'Police Misconduct', 'Civil Rights'],
    fee: 'Free consultation · Sliding scale',
    languages: ['English'],
    phone: '804-602-9166',
    email: 'cirnpresident@gmail.com',
    irn: true,
    note: 'Lead attorney for IRN\'s expungement clinics. First point of contact for CJRRP referrals.',
  },
  {
    name: 'IRN Referral Network',
    title: 'Virginia — General Civil Rights',
    jurisdiction: ['Virginia'],
    regions: 'Statewide',
    practiceAreas: ['Police Misconduct', 'Wrongful Conviction', 'LGBTQ+ Rights', 'Housing Discrimination'],
    fee: 'Free consultation available',
    languages: ['English', 'Spanish'],
    email: 'cirnpresident@gmail.com',
    irn: true,
    note: 'IRN maintains a private referral list of Virginia civil rights attorneys. Contact us — we match you within 72 hours of CHRT intake.',
  },
  {
    name: 'IRN Maryland Bureau',
    title: 'Maryland — Civil Rights Referrals',
    jurisdiction: ['Maryland'],
    regions: 'Baltimore City, Baltimore County, Prince George\'s County',
    practiceAreas: ['Police Misconduct', 'Expungement', 'Housing', 'Immigration'],
    fee: 'Referral-based · varies by attorney',
    languages: ['English', 'Spanish'],
    email: 'cirnpresident@gmail.com',
    irn: true,
    note: 'IRN\'s Baltimore bureau connects clients with Maryland-licensed civil rights attorneys. File through CHRT to trigger referral.',
  },
  {
    name: 'IRN Mid-Atlantic Network',
    title: 'NC & DC — Expanding',
    jurisdiction: ['North Carolina', 'Washington DC'],
    regions: 'Charlotte, Durham, Raleigh · District of Columbia',
    practiceAreas: ['Civil Rights', 'Police Misconduct', 'Housing', 'Immigration'],
    fee: 'Referral-based',
    languages: ['English', 'Spanish'],
    email: 'cirnpresident@gmail.com',
    irn: true,
    note: 'IRN is building attorney partnerships in NC and DC. Contact us to get on the waitlist or to refer an attorney to our network.',
  },
];

export default function AttorneysContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Legal Referral Network
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Find Legal Help.
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            IRN connects people with civil rights attorneys across Virginia, Maryland, North Carolina, and DC.
            File through CHRT and receive an attorney referral within 72 hours.
          </motion.p>
          <motion.div className={styles.heroBadge} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <Scale size={14} aria-hidden="true" />
            IRN is not a law firm. Nothing here is legal advice or creates an attorney-client relationship.
          </motion.div>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="attorneys-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Our Network</span>
            <h2 id="attorneys-heading" className={styles.sectionTitle}>Attorney Referral Directory</h2>
            <p className={styles.sectionBody}>
              All attorneys in this directory have worked with IRN clients.
              <strong> File through <a href="/chrt" className={styles.link}>CHRT</a> to trigger a 72-hour referral</strong> — or contact us directly.
            </p>
          </motion.div>

          <div className={styles.grid}>
            {attorneys.map((atty, i) => (
              <motion.div key={atty.name} className={styles.card} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.attyName}>{atty.name}</h3>
                    <p className={styles.attyTitle}>{atty.title}</p>
                  </div>
                  {atty.irn && <span className={styles.irnBadge}>IRN Partner</span>}
                </div>

                <div className={styles.metaRow}>
                  <span className={styles.meta}><MapPin size={11} aria-hidden="true" />{atty.regions}</span>
                </div>

                <div className={styles.jurisdictions}>
                  {atty.jurisdiction.map(j => <span key={j} className={styles.jTag}>{j}</span>)}
                </div>

                <ul className={styles.areas}>
                  {atty.practiceAreas.map(a => <li key={a}><Scale size={10} aria-hidden="true" />{a}</li>)}
                </ul>

                <div className={styles.feeRow}>
                  <DollarSign size={12} aria-hidden="true" className={styles.feeIcon} />
                  <span className={styles.fee}>{atty.fee}</span>
                </div>

                {atty.note && <p className={styles.note}>{atty.note}</p>}

                <div className={styles.contacts}>
                  {atty.phone && (
                    <a href={`tel:${atty.phone.replace(/-/g, '')}`} className={styles.contactLink}>
                      <Phone size={12} aria-hidden="true" />{atty.phone}
                    </a>
                  )}
                  <a href={`mailto:${atty.email}`} className={styles.contactLink}>
                    <Mail size={12} aria-hidden="true" />{atty.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection} aria-labelledby="atty-cta-heading">
        <div className={styles.container}>
          <motion.div className={styles.ctaBlock} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 id="atty-cta-heading" className={styles.ctaTitle}>Need a referral now?</h2>
            <p className={styles.ctaBody}>File through CHRT — encrypted, anonymous — and IRN will connect you with an attorney within 72 hours.</p>
            <div className={styles.ctaActions}>
              <a href="/chrt" className={styles.btnPrimary}>File Through CHRT →</a>
              <a href="mailto:cirnpresident@gmail.com" className={styles.btnGhost}>Email IRN Directly</a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
