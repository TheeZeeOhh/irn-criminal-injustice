'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './impact.module.css';

/* ── DATA ─────────────────────────────────────────────── */

const stats = [
  { num: '—', label: 'Incidents Documented', sub: 'via CHRT (launch pending)' },
  { num: '—', label: 'FOIA Requests Filed', sub: 'Virginia & Maryland, 2024–26' },
  { num: '—', label: 'Cases Tracked', sub: 'active legal support pipeline' },
  { num: '2',  label: 'Ordinances Introduced', sub: 'Baltimore + Newport News CSE Act' },
  { num: '7',  label: 'Organizations in Coalition', sub: 'IRN + 6 affiliate orgs' },
];

const programs = [
  {
    title: 'CHRT — Community Harm Reporting Tool',
    tag: 'Anonymous Incident Reporting',
    metrics: [
      { k: 'System status', v: 'In development' },
      { k: 'Encryption', v: 'AES-256-GCM client-side' },
      { k: 'Subpoena posture', v: 'Technical Incapacity' },
      { k: 'Reports since launch', v: '—' },
    ],
    note: 'CHRT is a zero-knowledge system. IRN cannot be compelled to identify reporters because we do not possess identifying information.',
    link: null,
  },
  {
    title: 'FOIA Campaign',
    tag: 'Public Records Accountability',
    metrics: [
      { k: 'Agencies', v: 'Newport News PD · Hampton Sheriff · VSP · Norfolk Schools' },
      { k: 'Requests filed', v: '—' },
      { k: 'Fulfilled', v: '—' },
      { k: 'Pending / Appealing', v: '—' },
    ],
    note: null,
    link: { href: '/reports/', label: 'View FOIA Tracker →' },
  },
  {
    title: 'Policy & Legislative',
    tag: 'Community Safety & Equity Act',
    metrics: [
      { k: 'Ordinances introduced', v: 'Baltimore City · Newport News' },
      { k: 'Coalition partners', v: '—' },
      { k: 'Public comments', v: '—' },
      { k: 'Status', v: 'Active' },
    ],
    note: null,
    link: { href: '/campaigns/', label: 'View Campaigns →' },
  },
  {
    title: 'Know Your Rights',
    tag: 'Community Legal Education',
    metrics: [
      { k: 'Wallet cards printed', v: '—' },
      { k: 'Languages', v: 'EN · ES' },
      { k: 'Trainings held', v: '—' },
      { k: 'Attendees', v: '—' },
    ],
    note: null,
    link: { href: '/know-your-rights/', label: 'KYR Resources →' },
  },
  {
    title: 'Legal Support Network',
    tag: 'Attorney Referrals',
    metrics: [
      { k: 'Vetted attorneys', v: '6 (directory live)' },
      { k: 'Referrals made', v: '—' },
      { k: 'States covered', v: 'MD · VA · DC' },
      { k: 'Partners', v: 'ACLU-MD · ACLU-VA · Legal Aid' },
    ],
    note: null,
    link: { href: '/attorneys/', label: 'Attorney Directory →' },
  },
  {
    title: 'NAACP Accountability Campaign',
    tag: 'Pat Hines / Virginia State Conference',
    metrics: [
      { k: 'Grievance filed', v: 'Yes' },
      { k: 'Status', v: 'Active' },
      { k: 'Communities', v: 'Petersburg · Newport News' },
      { k: 'Documentation', v: 'On file' },
    ],
    note: null,
    link: null,
  },
];

const foiaBars = [
  { agency: 'Newport News PD', pct: 80, color: 'gold' },
  { agency: 'Hampton Sheriff', pct: 55, color: 'gold' },
  { agency: 'Virginia State Police', pct: 35, color: 'ember' },
  { agency: 'Norfolk Public Schools', pct: 20, color: 'dim' },
];

const timeline = [
  {
    date: '2024',
    tag: 'Founding',
    title: 'IRN Founded, Baltimore',
    body: 'Aziza Okoro establishes the Injustice Reform Network in Baltimore to document systemic harm and build community accountability infrastructure.',
  },
  {
    date: '2024–25',
    tag: 'Infrastructure',
    title: 'CHRT Architecture & Project Sanctuary Built',
    body: 'Zero-knowledge encrypted harm reporting system designed. AES-256-GCM client-side encryption architecture finalized. Project Sanctuary framework established.',
  },
  {
    date: '2025',
    tag: 'Policy',
    title: 'Community Safety & Equity Act Drafted',
    body: 'IRN drafts the Community Safety & Equity Act in partnership with Baltimore City and Newport News council allies. Coalition formation begins.',
  },
  {
    date: '2025',
    tag: 'Legal',
    title: 'Ebony Parker Case — Judge Robinson Ruling',
    body: 'IRN provides legal navigation support in the Ebony Parker case. Judge Robinson issues ruling. Case documents preserved in IRN archive.',
  },
  {
    date: '2025',
    tag: 'Accountability',
    title: 'NAACP Grievance Filed Against Pat Hines',
    body: 'IRN files formal grievance against Pat Hines with the NAACP Virginia State Conference, documenting harm to Petersburg and Newport News communities.',
  },
  {
    date: '2026',
    tag: 'Digital Infrastructure',
    title: 'IRN.org Rebuilt — New Site Launched',
    body: 'Full rebuild of the IRN web presence: CHRT portal, FOIA tracker, attorney directory, KYR resources, and campaign infrastructure go live.',
  },
];

const geoCards = [
  { city: 'Baltimore City', detail: 'Founding chapter · policy, legal support, CHRT pilot' },
  { city: 'Newport News / Hampton Roads', detail: 'CSE Act · FOIA campaign · NAACP accountability' },
  { city: 'Virginia Statewide', detail: 'VSP FOIA · coalition coordination · KYR distribution' },
  { city: 'Maryland Statewide', detail: 'ACLU-MD partnership · reentry support · legal referrals' },
  { city: 'North Carolina & DC', detail: 'Affiliate organizing · cross-state coalition support' },
];

/* ── BAR CHART (animated on scroll) ──────────────────── */

function FoiaBarChart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          barRefs.current.forEach((bar, i) => {
            if (!bar) return;
            const pct = foiaBars[i].pct;
            bar.style.transition = `width 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s`;
            bar.style.width = `${pct}%`;
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.barSection} ref={sectionRef}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Data Visualization</span>
        <h2 className={styles.sectionTitle}>FOIA Requests by Agency</h2>
        <p className={styles.sectionSub}>
          Relative volume of requests filed per agency. Counts pending — this visualization uses placeholder proportions pending FOIA tracker launch.
        </p>

        <div className={styles.barChart}>
          {foiaBars.map((row, i) => (
            <div key={row.agency} className={styles.barRow}>
              <span className={styles.barLabel}>{row.agency}</span>
              <span className={styles.barTrack}>
                <span
                  ref={el => { barRefs.current[i] = el; }}
                  className={`${styles.barFill} ${styles[`barFill_${row.color}`]}`}
                  style={{ width: 0 }}
                />
              </span>
              <span className={styles.barCount}>—</span>
            </div>
          ))}
        </div>

        <p className={styles.barNote}>
          Proportions are illustrative placeholders. Actual counts will populate when FOIA tracker goes live.{' '}
          <Link href="/reports/" className={styles.inlineLink}>View full tracker →</Link>
        </p>
      </div>
    </section>
  );
}

/* ── PAGE ─────────────────────────────────────────────── */

export default function ImpactContent() {
  return (
    <div id="main-content">

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Accountability Report</span>
          <h1 className={styles.heroTitle}>
            The Work,{' '}
            <span className={styles.gold}>Documented</span>
          </h1>
          <div className={styles.goldRule} aria-hidden="true" />
          <p className={styles.heroSub}>
            Transparency isn&apos;t an option — it&apos;s the infrastructure. Every program,
            every request, every case is logged here because the communities we serve
            deserve to see the receipts.
          </p>
        </div>
      </section>

      {/* DATA NOTE */}
      <div className={styles.dataBanner}>
        <div className={styles.container}>
          <p className={styles.dataBannerText}>
            <strong>Data integrity note:</strong> IRN launched in 2024. Many metrics
            show &ldquo;—&rdquo; because CHRT and formal intake systems are still in deployment.
            Placeholder dashes represent real programs with real infrastructure — not
            empty commitments. Questions about our data?{' '}
            <a href="mailto:data@injusticereformnetwork.org" className={styles.emberLink}>
              data@injusticereformnetwork.org
            </a>
          </p>
        </div>
      </div>

      {/* STATS BAND */}
      <section className={styles.statsBand}>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statCell}>
              <p className={styles.statNum}>{s.num}</p>
              <p className={styles.statLabel}>{s.label}</p>
              <p className={styles.statSub}>{s.sub}</p>
            </div>
          ))}
        </div>
        <div className={styles.container}>
          <p className={styles.statsFooter}>
            Data last reviewed: June 2026{' '}
            <span className={styles.statsFooterDot}>·</span>{' '}
            <Link href="/reports/" className={styles.inlineLink}>Full FOIA tracker →</Link>
          </p>
        </div>
      </section>

      {/* PROGRAM BREAKDOWN */}
      <section className={styles.programsSection}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Program Breakdown</span>
          <h2 className={styles.sectionTitle}>Six Active Programs</h2>
          <div className={styles.programGrid}>
            {programs.map((p) => (
              <div key={p.title} className={styles.programCard}>
                <div className={styles.programCardHeader}>
                  <p className={styles.programTitle}>{p.title}</p>
                  <p className={styles.programTag}>{p.tag}</p>
                </div>
                <div className={styles.programMetrics}>
                  {p.metrics.map((m) => (
                    <div key={m.k} className={styles.metricRow}>
                      <span className={styles.metricKey}>{m.k}</span>
                      <span className={styles.metricVal}>{m.v}</span>
                    </div>
                  ))}
                </div>
                {p.note && (
                  <p className={styles.programNote}>{p.note}</p>
                )}
                {p.link && (
                  <Link href={p.link.href} className={styles.programLink}>
                    {p.link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAR CHART */}
      <FoiaBarChart />

      {/* TIMELINE */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>IRN History</span>
          <h2 className={styles.sectionTitle}>How We Got Here</h2>
          <div className={styles.timeline}>
            {timeline.map((item) => (
              <div key={item.title} className={styles.tlItem}>
                <div className={styles.tlDate}>
                  <span className={styles.tlDateNum}>{item.date}</span>
                  <span className={styles.tlTag}>{item.tag}</span>
                </div>
                <div className={styles.tlLine} aria-hidden="true" />
                <div className={styles.tlContent}>
                  <p className={styles.tlTitle}>{item.title}</p>
                  <p className={styles.tlBody}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEOGRAPHY */}
      <section className={styles.geoSection}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Where We Work</span>
          <h2 className={styles.sectionTitle}>Active Geographies</h2>
          <div className={styles.geoGrid}>
            {geoCards.map((g) => (
              <div key={g.city} className={styles.geoCard}>
                <p className={styles.geoCity}>{g.city}</p>
                <p className={styles.geoDetail}>{g.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaStrip}>
        <div className={styles.container}>
          <p className={styles.ctaText}>This work runs on community support.</p>
          <div className={styles.ctaActions}>
            <Link href="/donate/" className={styles.btnGold}>Donate →</Link>
            <Link href="/volunteer/" className={styles.btnOutline}>Volunteer →</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
