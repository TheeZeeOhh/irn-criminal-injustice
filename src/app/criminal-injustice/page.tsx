import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import ProgramCard from '../components/ProgramCard';
import CaseTimeline from '../components/CaseTimeline';
import CHRTExplainer from '../components/CHRTExplainer';
import StatStrip from '../components/StatStrip';
import Accordion from '../components/Accordion';
import GetInvolved from '../components/GetInvolved';
import NewsletterStrip from '../components/NewsletterStrip';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import { MissionSection } from '../components/MissionSection';
import CommercialEmbed from '../components/CommercialEmbed';
import programs from '../data/programs.json';
import styles from './page.module.css';

const OG_DESCRIPTION =
  'IRN documents civil rights incidents, fights wrongful convictions, and builds accountability infrastructure for Hampton Roads communities. Report anonymously through CHRT.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://injusticereformnetwork.org'),
    title: 'Criminal Justice Reform | Injustice Reform Network',
    description: OG_DESCRIPTION,
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://injusticereformnetwork.org/criminal-injustice/',
    },
    openGraph: {
      type: 'website',
      url: 'https://injusticereformnetwork.org/criminal-injustice/',
      title: 'Criminal Justice Reform | Injustice Reform Network',
      description: OG_DESCRIPTION,
      images: [{ url: '/og/criminal-injustice.jpg', width: 1200, height: 630 }],
      siteName: 'Injustice Reform Network',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Criminal Justice Reform | IRN',
      description: OG_DESCRIPTION,
      images: ['/og/criminal-injustice.jpg'],
    },
  };
}

const kyrItems = [
  {
    question: 'What are my rights during a police encounter in Virginia?',
    answer:
      'In Virginia, you have the right to remain silent and are not required to answer questions beyond identifying yourself in specific circumstances. You may refuse consent to a search. If you are detained, you have the right to ask whether you are free to go. If you are arrested, clearly and calmly invoke your right to an attorney before speaking further. IRN delivers Know Your Rights workshops covering these rights in detail — at an 8th-grade reading level with no legal jargon.',
  },
  {
    question: 'What is a Manifestation Determination Review and when do I need one?',
    answer:
      "A Manifestation Determination Review (MDR) is a required meeting that must happen within 10 school days whenever a school proposes to remove a student with a disability for more than 10 consecutive days, or for a pattern of short-term removals. The team reviews whether the behavior was caused by, or had a direct and substantial relationship to, the student\u2019s disability. If it was, the removal is a change of placement and different legal protections apply. IRN provides accompaniment and rights education at MDR meetings.",
  },
  {
    question: 'Can IRN represent me in court?',
    answer:
      'IRN is not a law firm and does not provide legal representation. IRN is not an attorney and nothing on this site creates an attorney-client relationship. What IRN does: document your case, connect you with civil rights attorneys through our referral network, provide trauma-informed accompaniment, and issue solidarity statements. If your situation triggers the CJRRP, an attorney referral follows within 72 hours of intake.',
  },
  {
    question: 'What happens to my data when I report through CHRT?',
    answer:
      'CHRT is built on a zero-knowledge architecture. Client-side AES-256-GCM encryption means your report is encrypted before it ever leaves your device. A decentralized identifier (DID) links your reports without identifying you. IRN does not possess unencrypted identifying information and therefore cannot be compelled to produce it. Your account. Your data. Your choice.',
  },
];

export default function CriminalInjusticePage() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main id="main-content" className={styles.main}>

        {/* 1. HERO */}
        <Hero />

        {/* 1.5 COMMERCIAL */}
        <CommercialEmbed />

        {/* 2. MISSION STATEMENT (#approach) */}
        <MissionSection />

        {/* 3. PROGRAMS GRID */}
        <section className={`${styles.section} ${styles.programsSection}`} id="programs">
          <div className={styles.container}>
            <div className={styles.programsHeader}>
              <span className={styles.programsKicker}>Our Programs</span>
              <h2 className={styles.programsTitle}>Seven Ways We Intervene</h2>
            </div>
            <div className={styles.programsGrid}>
              {programs.map((program, i) => (
                <ProgramCard
                  key={program.id}
                  title={program.title}
                  description={program.description}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 4. CASE SPOTLIGHT */}
        <section className={`${styles.section} ${styles.sectionDark}`} id="case-spotlight">
          <div className={styles.container}>
            <span className={styles.spotlightKicker}>
              Case Study · Hampton Roads, Virginia · June 2026
            </span>
            <h2 className={styles.spotlightTitle}>What Accountability Looks Like</h2>
            <p className={styles.spotlightNarrative}>
              In June 2026, Circuit Court Judge Rebecca Robinson dismissed all eight criminal
              charges against Dr. Ebony Parker, ruling that no criminal act had occurred. IRN
              documented this case from intake through vindication — proof that disciplined,
              evidence-grounded advocacy works.
            </p>
            <CaseTimeline />
            <div className={styles.spotlightCtaWrapper}>
              <p className={styles.spotlightCtaText}>
                If this happened to you or someone you know —
              </p>
              <a
                href="/chrt"
                className={styles.spotlightCtaBtn}
                aria-label="Report through CHRT — anonymous, encrypted civil rights documentation tool"
              >
                Report Through CHRT →
              </a>
              <p className={styles.spotlightCtaPrivacy}>
                Anonymous. Encrypted. IRN cannot be compelled to identify you.
              </p>
              <p className={styles.spotlightNote}>
                Individual names used with consent. IRN never identifies reporters without
                explicit authorization.
              </p>
            </div>
          </div>
        </section>

        {/* 5. HOW DOCUMENTATION WORKS */}
        <section className={styles.section} id="documentation">
          <div className={styles.container}>
            <span className={styles.sectionKicker}>How It Works</span>
            <h2 className={styles.sectionTitle}>From Report to Legislation</h2>
          </div>
          <CHRTExplainer />
        </section>

        {/* 6. KNOW YOUR RIGHTS TEASER */}
        <section className={`${styles.section} ${styles.sectionTextured}`} id="know-your-rights">
          <div className={styles.container}>
            <h2 className={styles.kyrTitle}>Know What You&apos;re Entitled To</h2>
            <div className={styles.kyrAccordion}>
              {kyrItems.map((item) => (
                <Accordion
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
            <div className={styles.kyrCtaWrapper}>
              <a
                href="/know-your-rights"
                className={styles.ghostCta}
                aria-label="Read the full Know Your Rights guide"
              >
                Read the Full Know Your Rights Guide →
              </a>
            </div>
          </div>
        </section>

        {/* 7. IMPACT DATA STRIP */}
        <StatStrip />

        {/* 8. GET INVOLVED */}
        <GetInvolved />


        {/* 10. NEWSLETTER */}
        <NewsletterStrip />

      </main>
      <Footer />
    </>
  );
}
