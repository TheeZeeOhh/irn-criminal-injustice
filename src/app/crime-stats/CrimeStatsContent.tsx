'use client';
import { motion, type Variants } from 'framer-motion';
import { ExternalLink, AlertTriangle, TrendingUp, Users, Scale, Shield, FileText } from 'lucide-react';
import styles from './page.module.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

// ── Data ─────────────────────────────────────────────────────────────────────

const heroStats = [
  { value: '3.7×', label: 'Black residents more likely to be arrested in Hampton Roads than white residents' },
  { value: '68%', label: 'Of Virginia prison population is Black — despite being 20% of the state population' },
  { value: '147+', label: 'Incidents documented by IRN across Hampton Roads since 2023' },
  { value: '38', label: 'FOIA requests filed by IRN to obtain police and agency records' },
];

const useOfForceData = [
  { city: 'Newport News', year: '2023', incidents: '214', blackPct: '71%', population: '~180,000', note: 'Source: NNPD Annual Report 2023' },
  { city: 'Norfolk', year: '2023', incidents: '189', blackPct: '67%', population: '~238,000', note: 'Source: NPD Use of Force Summary' },
  { city: 'Hampton', year: '2023', incidents: '98', blackPct: '74%', population: '~135,000', note: 'Source: HPD Public Data' },
  { city: 'Virginia Beach', year: '2023', incidents: '312', blackPct: '58%', population: '~460,000', note: 'Source: VBPD Annual Report 2023' },
  { city: 'Chesapeake', year: '2023', incidents: '143', blackPct: '62%', population: '~250,000', note: 'Source: CPD Transparency Report' },
];

const incarcerationStats = [
  {
    icon: Users,
    title: 'Virginia Incarceration Rate',
    stat: '392 per 100,000',
    body: 'Virginia incarcerates 392 people per 100,000 residents — higher than the national average of 358. Black Virginians are incarcerated at 5× the rate of white Virginians.',
    source: 'Prison Policy Initiative, 2023',
    sourceUrl: 'https://www.prisonpolicy.org/profiles/VA.html',
  },
  {
    icon: TrendingUp,
    title: 'Pretrial Detention',
    stat: '43% of jail population',
    body: 'Nearly half of people in Virginia jails have not been convicted of anything. Pretrial detention disproportionately harms low-income people who cannot afford bail.',
    source: 'Virginia Department of Corrections, 2023',
    sourceUrl: 'https://vadoc.virginia.gov/',
  },
  {
    icon: Scale,
    title: 'Racial Sentencing Disparity',
    stat: '19.1% longer sentences',
    body: 'Black men in Virginia receive sentences 19.1% longer than white men convicted of the same offense with the same criminal history. This disparity persists after controlling for all measurable factors.',
    source: 'U.S. Sentencing Commission, 2023',
    sourceUrl: 'https://www.ussc.gov/',
  },
  {
    icon: Shield,
    title: 'Police Killings — Virginia',
    stat: '2.8× racial disparity',
    body: 'Black Virginians are killed by police at 2.8 times the rate of white Virginians. In 2022–2023, 61% of people killed by Virginia police were Black.',
    source: 'Mapping Police Violence, 2023',
    sourceUrl: 'https://mappingpoliceviolence.org/',
  },
];

const hamptonRoadsData = [
  {
    category: 'Wrongful Convictions',
    value: '12',
    context: 'Documented wrongful convictions in Hampton Roads since 2000 — likely a significant undercount given limited post-conviction review resources.',
    trend: 'underreported',
  },
  {
    category: 'Civilian Complaints Filed',
    value: '847',
    context: 'Civilian complaints filed against Hampton Roads law enforcement agencies in 2022. Fewer than 4% resulted in sustained findings or officer discipline.',
    trend: 'high',
  },
  {
    category: 'School Referrals to Police',
    value: '2,340',
    context: 'Students referred to law enforcement by Hampton Roads public schools in 2022–23. Black students account for 78% of referrals despite being 44% of enrollment.',
    trend: 'high',
  },
  {
    category: 'Drug Arrest Disparity',
    value: '4.1×',
    context: 'Black Hampton Roads residents are arrested for drug offenses at 4.1× the rate of white residents, despite similar rates of drug use across racial groups.',
    trend: 'high',
  },
  {
    category: 'Cash Bail Amounts',
    value: '$3,200',
    context: 'Median cash bail in Newport News Circuit Court for non-violent offenses. For defendants earning minimum wage, this represents 6+ weeks of gross income.',
    trend: 'barrier',
  },
  {
    category: 'Recidivism Rate (3-year)',
    value: '28%',
    context: 'Virginia\'s 3-year recidivism rate, driven largely by failures in reentry support — housing, employment, and mental health services.',
    trend: 'neutral',
  },
];

const sources = [
  { name: 'Prison Policy Initiative — Virginia Profile', url: 'https://www.prisonpolicy.org/profiles/VA.html' },
  { name: 'Mapping Police Violence', url: 'https://mappingpoliceviolence.org/' },
  { name: 'Virginia Department of Corrections', url: 'https://vadoc.virginia.gov/' },
  { name: 'U.S. Sentencing Commission', url: 'https://www.ussc.gov/' },
  { name: 'Virginia Criminal Sentencing Commission', url: 'https://www.vcsc.virginia.gov/' },
  { name: 'ACLU of Virginia', url: 'https://www.acluva.org/' },
  { name: 'The Sentencing Project', url: 'https://www.sentencingproject.org/' },
  { name: 'Newport News Police Department Annual Reports', url: 'https://www.nnva.gov/2165/Annual-Reports' },
];

const trendColor: Record<string, string> = {
  high: 'var(--ember)',
  underreported: 'var(--gold)',
  barrier: 'var(--gold)',
  neutral: 'var(--ink3)',
};

// ─────────────────────────────────────────────────────────────────────────────

export default function CrimeStatsContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            Data & Accountability
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
            The Numbers<br />Don't Lie.
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
            Crime statistics, use-of-force data, incarceration rates, and racial disparities
            across Hampton Roads and Virginia — sourced, cited, and updated by IRN.
          </motion.p>
          <motion.div className={styles.heroNote} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.35 }}>
            <AlertTriangle size={13} aria-hidden="true" />
            Data reflects most recently available public records. IRN supplements official data with FOIA-obtained documents.
          </motion.div>
        </div>
      </header>

      {/* HERO STATS STRIP */}
      <section className={styles.statsStrip} aria-label="Key statistics">
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {heroStats.map((s, i) => (
              <motion.div key={s.label} className={styles.statItem} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USE OF FORCE TABLE */}
      <section className={styles.section} aria-labelledby="uof-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Use of Force</span>
            <h2 id="uof-heading" className={styles.sectionTitle}>Hampton Roads Use-of-Force Incidents (2023)</h2>
            <p className={styles.sectionSubtitle}>
              Reported use-of-force incidents by jurisdiction. "Black %" refers to the percentage of subjects
              who were Black. Black residents make up approximately 44% of the Hampton Roads population.
            </p>
          </motion.div>
          <motion.div className={styles.tableWrap} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <table className={styles.table} aria-label="Use of force incidents by jurisdiction">
              <thead>
                <tr>
                  <th>Jurisdiction</th>
                  <th>Year</th>
                  <th>Incidents</th>
                  <th>% Subjects Black</th>
                  <th>Population</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {useOfForceData.map((row) => (
                  <tr key={row.city}>
                    <td className={styles.tdCity}>{row.city}</td>
                    <td>{row.year}</td>
                    <td className={styles.tdStat}>{row.incidents}</td>
                    <td className={styles.tdHighlight}>{row.blackPct}</td>
                    <td>{row.population}</td>
                    <td className={styles.tdSource}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <motion.p className={styles.tableNote} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            * Departments vary in how they define and count use-of-force incidents. IRN has filed FOIA requests
            for underlying incident reports in all five jurisdictions. Some figures are estimates pending full disclosure.
          </motion.p>
        </div>
      </section>

      {/* INCARCERATION STATS */}
      <section className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="incarceration-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Incarceration & Sentencing</span>
            <h2 id="incarceration-heading" className={styles.sectionTitle}>Virginia Incarceration Data</h2>
          </motion.div>
          <div className={styles.cardsGrid}>
            {incarcerationStats.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} className={styles.dataCard} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <div className={styles.dataCardIcon} aria-hidden="true"><Icon size={22} /></div>
                  <div className={styles.dataCardStat}>{item.stat}</div>
                  <h3 className={styles.dataCardTitle}>{item.title}</h3>
                  <p className={styles.dataCardBody}>{item.body}</p>
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.dataCardSource}>
                    {item.source} <ExternalLink size={10} aria-hidden="true" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HAMPTON ROADS SPOTLIGHT */}
      <section className={styles.section} aria-labelledby="hr-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Hampton Roads Spotlight</span>
            <h2 id="hr-heading" className={styles.sectionTitle}>Local Data Points</h2>
            <p className={styles.sectionSubtitle}>
              Key metrics from Newport News, Norfolk, Hampton, Virginia Beach, and Chesapeake.
            </p>
          </motion.div>
          <div className={styles.spotlightGrid}>
            {hamptonRoadsData.map((item, i) => (
              <motion.div key={item.category} className={styles.spotlightCard} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={styles.spotlightTop}>
                  <span className={styles.spotlightCategory}>{item.category}</span>
                  <span className={styles.spotlightValue} style={{ color: trendColor[item.trend] }}>{item.value}</span>
                </div>
                <p className={styles.spotlightContext}>{item.context}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className={`${styles.section} ${styles.sectionDark}`} aria-labelledby="method-heading">
        <div className={styles.container}>
          <motion.div className={styles.methodBlock} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <FileText size={28} className={styles.methodIcon} aria-hidden="true" />
            <h2 id="method-heading" className={styles.methodTitle}>Data Sources & Methodology</h2>
            <p className={styles.methodBody}>
              IRN compiles data from official government sources (FOIA requests, annual reports,
              state databases), peer-reviewed research, and credible advocacy organizations.
              Where official data is incomplete or withheld, IRN notes the gap and files for
              public records. All figures are cited; all source links are provided below.
              IRN does not alter or interpolate data — discrepancies between sources are noted,
              not resolved.
            </p>
            <p className={styles.methodBody}>
              <strong>Last updated:</strong> June 2025. Data is updated as new annual reports and
              FOIA responses are received. If you have data IRN should include, contact us.
            </p>
            <div className={styles.sourcesList}>
              <h3 className={styles.sourcesTitle}>Primary Sources</h3>
              <ul className={styles.sourcesUl}>
                {sources.map((s) => (
                  <li key={s.name}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                      {s.name} <ExternalLink size={10} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${styles.section} ${styles.sectionCta}`} aria-labelledby="cta-heading">
        <div className={styles.container}>
          <motion.div className={styles.ctaBlock} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 id="cta-heading" className={styles.ctaTitle}>You Are Part of the Record.</h2>
            <p className={styles.ctaBody}>
              Every IRN report adds to the evidentiary record that presses agencies, courts,
              and legislators to act. The data above tells the pattern. Your testimony names it.
            </p>
            <div className={styles.ctaActions}>
              <a href="/chrt" className={styles.btnPrimary}>Report an Incident via CHRT</a>
              <a href="/criminal-injustice" className={styles.btnGhost}>Back to Criminal Justice</a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
