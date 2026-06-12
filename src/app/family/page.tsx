import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import ProgramCard from '../components/ProgramCard';
import StatStrip from '../components/StatStrip';
import Accordion from '../components/Accordion';
import GetInvolved from '../components/GetInvolved';
import NewsletterStrip from '../components/NewsletterStrip';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import programs from '../data/family-programs.json';
import styles from '../criminal-injustice/page.module.css'; // Reusing styles

const OG_DESCRIPTION =
  'IRN defends Black, Brown, and LGBTQ+ families from the punitive child welfare system, fighting for reproductive autonomy and abolition-informed family defense.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://injusticereformnetwork.org'),
    title: 'Family Policing & Reproductive Health | Injustice Reform Network',
    description: OG_DESCRIPTION,
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://injusticereformnetwork.org/family/',
    },
    openGraph: {
      type: 'website',
      url: 'https://injusticereformnetwork.org/family/',
      title: 'Family Policing & Reproductive Health | Injustice Reform Network',
      description: OG_DESCRIPTION,
      images: [{ url: '/og/family.jpg', width: 1200, height: 630 }],
      siteName: 'Injustice Reform Network',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Family Policing | IRN',
      description: OG_DESCRIPTION,
      images: ['/og/family.jpg'],
    },
  };
}

const kyrItems = [
  {
    question: 'Do I have to let CPS into my home?',
    answer:
      'In Virginia, unless a CPS investigator has a court order or there is a demonstrable, immediate emergency (exigent circumstances), you do not have to let them into your home. You have the right to speak to an attorney before answering questions or allowing an interview with your child.',
  },
  {
    question: 'Can my child be removed because of my gender identity or sexual orientation?',
    answer:
      "No. Discrimination based on gender identity or sexual orientation in custody or child welfare proceedings is unlawful. However, systemic bias exists. IRN supports queer and trans parents fighting biased assumptions about their fitness to parent and helps navigate the legal protections available.",
  },
  {
    question: 'What are my rights regarding gender-affirming care?',
    answer:
      'You have the right to bodily autonomy and to make healthcare decisions without state interference. If you or your child face barriers, coercion, or discrimination in accessing reproductive or gender-affirming healthcare, IRN can document the harm and connect you with specialized legal resources.',
  },
];

export default function FamilyPage() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main id="main-content" className={styles.main}>

        {/* 1. HERO */}
        <Hero 
          kicker="What We Do — Family Policing & Reproductive Health"
          title="Families Belong Together."
          subtitle="IRN defends marginalized families from the punitive child welfare system, fighting for reproductive autonomy and providing abolition-informed family defense for Black, Brown, and LGBTQ+ communities."
        />

        {/* 2. MISSION STATEMENT */}
        <section className={styles.section} id="approach">
          <div className={styles.container} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <blockquote style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 'bold', color: '#E4A853', marginBottom: '2rem' }}>
              &ldquo;The family regulation system often punishes poverty and identity rather than protecting children. We believe safety comes from community support, economic resources, and bodily autonomy—not surveillance and separation.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* 3. PROGRAMS GRID */}
        <section className={`${styles.section} ${styles.programsSection}`} id="programs">
          <div className={styles.container}>
            <div className={styles.programsHeader}>
              <span className={styles.programsKicker}>Our Defense Programs</span>
              <h2 className={styles.programsTitle}>How We Intervene</h2>
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

        {/* 4. KNOW YOUR RIGHTS TEASER */}
        <section className={`${styles.section} ${styles.sectionTextured}`} id="know-your-rights">
          <div className={styles.container}>
            <h2 className={styles.kyrTitle}>Know Your Family Rights</h2>
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

        {/* 5. IMPACT DATA STRIP */}
        <StatStrip />

        {/* 6. GET INVOLVED */}
        <GetInvolved />

        {/* 7. NEWSLETTER */}
        <NewsletterStrip />

      </main>
      <Footer />
    </>
  );
}
