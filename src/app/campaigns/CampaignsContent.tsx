'use client';
import { motion } from 'framer-motion';
import { Megaphone, FileText, Users } from 'lucide-react';
import styles from './campaigns.module.css';

const campaigns = [
  {
    category: 'Advocacy & Storytelling',
    title: 'Stories of Resilience: Formerly Incarcerated Women & Girls',
    description:
      'We are looking to interview formerly and currently incarcerated women and young girls to record stories of resilience, hope, and humanity. These testimonies support efforts toward legislative change and state budget appropriations.',
    linkText: 'Schedule an Interview / Share Story →',
    href: '/booking',
    image: '/stories-of-resilience.jpg',
  },
  {
    category: 'Voting Rights',
    title: 'No More Bars',
    description:
      'Restoring full civic participation for incarcerated and formerly incarcerated Virginians. Actively lobbying the General Assembly and filing amicus briefs.',
    linkText: 'Report Disenfranchisement →',
    href: '/chrt',
  },
  {
    category: 'Legislative',
    title: 'JFV Pipeline',
    description:
      'Translating CHRT harm reports into actionable local and state policy. Three bills in committee as of June 2026.',
    linkText: 'File a CHRT Report →',
    href: '/chrt',
  },
  {
    category: 'Education',
    title: 'End Mandatory Reporting',
    description:
      'Advocating for support over surveillance in schools and healthcare. Mandatory reporting disproportionately targets Black and LGBTQ+ families.',
    linkText: 'Learn More →',
    href: '/chrt',
  },
  {
    category: 'Clean Slate',
    title: 'Virginia Expungement Clinics',
    description:
      "Virginia's automatic record sealing law takes effect July 1, 2026. Free clinics across Hampton Roads and Northern VA.",
    linkText: 'See Clinic Dates →',
    href: '/events',
  },
];

const helpCards = [
  {
    Icon: Megaphone,
    title: 'Amplify',
    body: 'Share campaigns, write legislators, show up.',
    linkText: 'Get The Dispatch →',
    href: '/newsletter',
  },
  {
    Icon: FileText,
    title: 'Document',
    body: 'File a CHRT report. Every report strengthens our policy case.',
    linkText: 'Submit a Report →',
    href: '/chrt',
  },
  {
    Icon: Users,
    title: 'Organize',
    body: 'Join your regional chapter.',
    linkText: 'Find Your Chapter →',
    href: '/chapters',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
});

export default function CampaignsContent() {
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
            Take Action
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our Current Campaigns.
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From the courtroom to the General Assembly. We translate community harm into structural change.
          </motion.p>
        </div>
      </header>

      {/* Active Campaigns */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.h2 className={styles.sectionHeading} {...fadeUp(0)}>
            Active Campaigns
          </motion.h2>
          <div className={styles.campaignGrid}>
            {campaigns.map((c, i) => (
              <motion.div key={c.title} className={styles.campaignCard} {...fadeUp(i * 0.08)}>
                <div className={styles.cardMeta}>
                  <span className={styles.activeBadge}>Active</span>
                  <span className={styles.categoryTag}>{c.category}</span>
                </div>
                {c.image && (
                  <img src={c.image} alt={c.title} className={styles.cardImage} />
                )}
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.description}</p>
                <a href={c.href} className={styles.cardCta}>
                  {c.linkText}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <motion.h2 className={styles.sectionHeading} {...fadeUp(0)}>
            How to Help
          </motion.h2>
          <div className={styles.helpGrid}>
            {helpCards.map(({ Icon, title, body, linkText, href }, i) => (
              <motion.div key={title} className={styles.helpCard} {...fadeUp(i * 0.08)}>
                <Icon size={22} className={styles.helpIcon} aria-hidden="true" />
                <h3 className={styles.helpTitle}>{title}</h3>
                <p className={styles.helpBody}>{body}</p>
                <a href={href} className={styles.helpLink}>
                  {linkText}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Strip */}
      <div className={styles.bottomStrip}>
        <p className={styles.stripText}>Get new issues of The Dispatch as they drop.</p>
        <a href="/newsletter" className={styles.stripLink}>
          Subscribe →
        </a>
      </div>
    </main>
  );
}
