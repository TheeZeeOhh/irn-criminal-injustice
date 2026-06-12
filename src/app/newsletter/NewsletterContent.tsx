'use client';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import styles from './newsletter.module.css';

const issues = [
  {
    vol: 'Vol. 01 · No. 01',
    date: 'June 2026',
    title: 'The People\'s Intelligence Brief',
    desc: 'Priority briefing, Case File 001 Newport News, The Watchlist (11 agencies), IRN OS v2, field notes from Baltimore.',
    href: '/irn-dispatch-vol01.html',
  },
];

export default function NewsletterContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            The Dispatch
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            The People&apos;s<br />Intelligence Brief.
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Case files, accountability reports, policy updates, and field notes from Hampton Roads to Baltimore.
            Because power hates witnesses.
          </motion.p>
        </div>
      </header>

      {/* SUBSCRIBE */}
      <section className={styles.subscribeSection} aria-labelledby="subscribe-heading">
        <div className={styles.container}>
          <motion.div className={styles.subscribeCard} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 id="subscribe-heading" className={styles.subscribeTitle}>Subscribe to The Dispatch</h2>
            <p className={styles.subscribeBody}>New issues drop when there&apos;s something worth saying. No spam. Unsubscribe anytime.</p>

            {/* Buttondown embed form */}
            <form
              action="https://buttondown.com/api/emails/embed-subscribe/irn"
              method="post"
              target="popupwindow"
              onSubmit={() => window.open('https://buttondown.com/irn', 'popupwindow')}
              className={styles.bdForm}
            >
              <div className={styles.bdInputRow}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className={styles.bdInput}
                  aria-label="Email address"
                />
                <button type="submit" className={styles.bdSubmit}>
                  Subscribe <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
              <input type="hidden" value="1" name="embed" />
              <p className={styles.bdNote}>
                Powered by <a href="https://buttondown.com" target="_blank" rel="noopener noreferrer" className={styles.bdLink}>Buttondown</a>.
                IRN does not sell or share your email.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className={styles.archiveSection} aria-labelledby="archive-heading">
        <div className={styles.container}>
          <span className={styles.sectionKicker}>Archive</span>
          <h2 id="archive-heading" className={styles.sectionTitle}>Past Issues</h2>

          <div className={styles.issueList}>
            {issues.map((issue, i) => (
              <motion.a
                key={issue.vol}
                href={issue.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.issueCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <FileText size={18} className={styles.issueIcon} aria-hidden="true" />
                <div className={styles.issueContent}>
                  <div className={styles.issueMeta}>
                    <span className={styles.issueVol}>{issue.vol}</span>
                    <span className={styles.issueDate}>{issue.date}</span>
                  </div>
                  <h3 className={styles.issueTitle}>{issue.title}</h3>
                  <p className={styles.issueDesc}>{issue.desc}</p>
                </div>
                <ArrowRight size={18} className={styles.issueArrow} aria-hidden="true" />
              </motion.a>
            ))}
          </div>

          <p className={styles.archiveNote}>Vol. 02 in production — subscribe above to get it first.</p>
        </div>
      </section>
    </main>
  );
}
