'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import styles from './impact.module.css';

const stats = [
  { num: 147, suffix: '+', label: 'Incidents documented\n2024–2026' },
  { num: 38, suffix: '', label: 'FOIA requests filed\nacross 4 jurisdictions' },
  { num: 6, suffix: '', label: 'Cases resolved\n2025–2026' },
  { num: 72, suffix: 'hr', label: 'CJRRP emergency\nresponse window' },
  { num: 100, suffix: '%', label: 'Reporter anonymity\nmaintained — zero disclosures' },
  { num: 4, suffix: '', label: 'States & DC\nactive chapters' },
];

const foiaRequests = [
  { id: 'FOIA-26-042', agency: 'Newport News Police Department', date: '2026-04-12', status: 'Fulfilled', desc: 'Use of force policies regarding minors' },
  { id: 'FOIA-26-089', agency: "Hampton Sheriff's Office", date: '2026-05-01', status: 'Pending', desc: 'Eviction enforcement protocols and dispatch logs' },
  { id: 'FOIA-26-101', agency: 'Virginia State Police', date: '2026-05-15', status: 'Appealing', desc: 'Arrest demographics data 2024–2025' },
  { id: 'FOIA-26-112', agency: 'Norfolk Public Schools', date: '2026-06-02', status: 'Pending', desc: 'Manifestation Determination Review (MDR) outcome statistics' },
  { id: 'FOIA-26-118', agency: 'Baltimore City Police Department', date: '2026-06-05', status: 'Pending', desc: 'Body camera footage policy and compliance audit' },
  { id: 'FOIA-26-127', agency: 'Prince George\'s County Sheriff', date: '2026-06-10', status: 'Pending', desc: 'Use of restraints during pretrial detention 2024–2026' },
];

const programs = [
  { title: 'Trans Reentry Support', body: 'Dedicated reentry navigation for trans people leaving incarceration. The 72 hours post-release are highest risk — we provide immediate stabilization.' },
  { title: 'Community Bail & Release Navigation', body: 'Rapid release support reducing pretrial detention exposure for LGBTQ+ people facing misgendering, healthcare denial, and isolation.' },
  { title: 'Trauma-Informed Legal Navigation', body: 'Legal navigation that integrates trauma-informed practice, reducing case attrition for survivors and marginalized individuals in hostile courts.' },
  { title: 'LGBTQ+ Youth Diversion', body: 'Pre-arrest and pre-adjudication diversion programming. Early diversion is the highest-leverage intervention against long-term criminalization.' },
  { title: 'Fines, Costs & Garnishment Relief', body: 'Court fines trap people in poverty cycles. IRN identifies relief pathways and documents predatory fee patterns to drive legislative change.' },
  { title: 'Know Your Rights Education', body: 'Workshops covering police encounters, pretrial detention, and tenant rights — across VA, MD, NC, and DC.' },
  { title: 'CHRT Harm Reporting', body: 'Zero-knowledge encrypted reporting portal. We cannot be compelled to identify reporters — building an undeniable record of systemic abuse.' },
];

const principles = [
  { title: 'Zero Voluntary Disclosures', body: 'IRN has never voluntarily provided identifying information to any law enforcement agency. Our CHRT architecture ensures we cannot be compelled to — we do not possess it.' },
  { title: 'Client-Side Encryption', body: 'All CHRT submissions are encrypted on your device using AES-256-GCM before reaching our servers. The decryption key never leaves your browser.' },
  { title: 'Public FOIA Tracker', body: 'Every Freedom of Information Act request we file is publicly logged here. Transparency about our accountability work is non-negotiable.' },
  { title: 'No Analytics Surveillance', body: 'We do not track IP addresses or use third-party analytics cookies. We cannot sell what we do not collect.' },
];

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.round(p * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCell({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(num);
  return (
    <div className={styles.statCell}>
      <p className={styles.statNum}>
        <span ref={ref}>{count}</span>{suffix}
      </p>
      <p className={styles.statLabel}>{label.replace('\n', ' ')}</p>
    </div>
  );
}

function badgeClass(status: string) {
  if (status === 'Fulfilled') return styles.badgeFulfilled;
  if (status === 'Appealing') return styles.badgeAppealing;
  return styles.badgePending;
}

export default function ImpactContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            IRN Accountability
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            Impact & Data
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Every number here represents a person, a case, or a demand for accountability.
            We publish our data because power hates witnesses.
          </motion.p>
        </div>
      </header>

      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statGrid}>
            {stats.map((s) => (
              <StatCell key={s.label} num={s.num} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.foiaSection}>
        <div className={styles.container}>
          <span className={styles.sectionKicker}>FOIA Tracker</span>
          <h2 className={styles.sectionTitle}>Active Requests & Outcomes</h2>
          <p className={styles.sectionBody}>
            Every Freedom of Information Act request IRN files is logged here. Agencies are on notice.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.th}>ID</th>
                  <th className={styles.th}>Agency</th>
                  <th className={styles.th}>Filed</th>
                  <th className={styles.th}>Subject</th>
                  <th className={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {foiaRequests.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <td className={`${styles.td} ${styles.tdId}`}>{r.id}</td>
                    <td className={`${styles.td} ${styles.tdAgency}`}>{r.agency}</td>
                    <td className={styles.td}>{r.date}</td>
                    <td className={styles.td}>{r.desc}</td>
                    <td className={styles.td}>
                      <span className={`${styles.badge} ${badgeClass(r.status)}`}>{r.status}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.programsSection}>
        <div className={styles.container}>
          <span className={styles.sectionKicker}>Programs</span>
          <h2 className={styles.sectionTitle}>What We Run</h2>
          <p className={styles.sectionBody}>
            Seven active programs across criminal justice, housing, healthcare, and education — all free, all confidential.
          </p>
          <div className={styles.programGrid}>
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                className={styles.programCard}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <p className={styles.programTitle}>{p.title}</p>
                <p className={styles.programBody}>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.transparencySection}>
        <div className={styles.container}>
          <span className={styles.sectionKicker}>Data & Privacy</span>
          <h2 className={styles.sectionTitle}>Our Transparency Commitments</h2>
          <p className={styles.sectionBody}>
            We document systemic power. We protect individual people. These two things require the same foundation: radical transparency about what we collect, what we publish, and what we refuse to hand over.
          </p>
          <div className={styles.principles}>
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                className={styles.principle}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <span className={styles.principleNum}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className={styles.principleTitle}>{p.title}</p>
                  <p className={styles.principleBody}>{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.containerNarrow}>
          <motion.h2
            className={styles.ctaTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Add your case to the record.
          </motion.h2>
          <motion.p
            className={styles.ctaBody}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every encrypted report strengthens the evidentiary record for systemic litigation and policy change.
            Your identity stays yours.
          </motion.p>
          <motion.div
            className={styles.ctaActions}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="/chrt" className={styles.btnPrimary}>
              <FileText size={14} aria-hidden="true" /> File a Report
            </a>
            <a href="/blog" className={styles.btnGhost}>
              <ArrowRight size={14} aria-hidden="true" /> Read the Dispatch
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
