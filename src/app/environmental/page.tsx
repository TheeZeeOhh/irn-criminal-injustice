import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import ProgramCard from '../components/ProgramCard';
import StatStrip from '../components/StatStrip';
import Accordion from '../components/Accordion';
import GetInvolved from '../components/GetInvolved';
import NewsletterStrip from '../components/NewsletterStrip';
import Footer from '../components/Footer';
import StructuredData from '../components/StructuredData';
import { MissionSection } from '../components/MissionSection';
import programs from '../data/environmental-programs.json';
import styles from '../criminal-injustice/page.module.css'; // Reusing styles

const OG_DESCRIPTION =
  'IRN fights environmental racism, challenges toxic infrastructure, and builds resilience for marginalized communities disproportionately impacted by environmental injustice.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://injusticereformnetwork.org'),
    title: 'Environmental Injustice | Injustice Reform Network',
    description: OG_DESCRIPTION,
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://injusticereformnetwork.org/environmental/',
    },
    openGraph: {
      type: 'website',
      url: 'https://injusticereformnetwork.org/environmental/',
      title: 'Environmental Injustice | Injustice Reform Network',
      description: OG_DESCRIPTION,
      images: [{ url: '/og/environmental.jpg', width: 1200, height: 630 }],
      siteName: 'Injustice Reform Network',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Environmental Injustice | IRN',
      description: OG_DESCRIPTION,
      images: ['/og/environmental.jpg'],
    },
  };
}

const kyrItems = [
  {
    question: 'What are my rights regarding utility shutoffs in Virginia?',
    answer:
      'In Virginia, utility companies must provide written notice before disconnecting your service. There are seasonal protections and medical exemptions available if a shutoff would endanger the health of someone in your home. IRN can help you navigate the exemption process and connect you with emergency relief funds.',
  },
  {
    question: 'My apartment has mold or lead. What can I do?',
    answer:
      "Landlords are legally required to maintain a safe and habitable environment. You have the right to request repairs in writing. If the landlord fails to address severe hazards like mold or lead within a reasonable timeframe, you may have the right to file a rent escrow case or terminate your lease. IRN provides documentation support and attorney referrals to help enforce your tenant rights.",
  },
  {
    question: 'How can I report an environmental hazard in my neighborhood anonymously?',
    answer:
      'You can report illegal dumping, toxic emissions, and unsafe water through IRN’s Community Harm Reporting Tool (CHRT). CHRT uses end-to-end encryption to protect your identity, ensuring your report becomes part of a larger evidentiary record without exposing you to retaliation.',
  },
];

export default function EnvironmentalPage() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main id="main-content" className={styles.main}>

        {/* 1. HERO */}
        <Hero 
          kicker="What We Do — Environmental Injustice"
          title="Pollution is Not an Accident."
          subtitle="IRN fights environmental racism, challenges toxic infrastructure, and builds resilience for marginalized neighborhoods, unhoused populations, and LGBTQ+ communities disproportionately impacted by environmental harm."
        />

        {/* 2. MISSION STATEMENT */}
        <section className={styles.section} id="approach">
          <div className={styles.container} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <blockquote style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 'bold', color: '#E4A853', marginBottom: '2rem' }}>
              &ldquo;Environmental justice is systems-justice. We cannot protect our communities from criminalization without also protecting the air they breathe, the water they drink, and the neighborhoods they call home.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* 3. PROGRAMS GRID */}
        <section className={`${styles.section} ${styles.programsSection}`} id="programs">
          <div className={styles.container}>
            <div className={styles.programsHeader}>
              <span className={styles.programsKicker}>Our Environmental Programs</span>
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
            <h2 className={styles.kyrTitle}>Know Your Environmental Rights</h2>
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
              <Link
                href="/know-your-rights"
                className={styles.ghostCta}
                aria-label="Read the full Know Your Rights guide"
              >
                Read the Full Know Your Rights Guide →
              </Link>
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
