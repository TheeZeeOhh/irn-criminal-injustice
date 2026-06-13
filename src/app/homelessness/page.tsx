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
import programs from '../data/homelessness-programs.json';
import styles from '../criminal-injustice/page.module.css'; // Reusing styles

const OG_DESCRIPTION =
  'IRN defends unhoused and housing-insecure individuals from criminalization and displacement, providing emergency stabilization and legal advocacy for marginalized communities.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://injusticereformnetwork.org'),
    title: 'Homelessness Prevention | Injustice Reform Network',
    description: OG_DESCRIPTION,
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://injusticereformnetwork.org/homelessness/',
    },
    openGraph: {
      type: 'website',
      url: 'https://injusticereformnetwork.org/homelessness/',
      title: 'Homelessness Prevention | Injustice Reform Network',
      description: OG_DESCRIPTION,
      images: [{ url: '/og/homelessness.jpg', width: 1200, height: 630 }],
      siteName: 'Injustice Reform Network',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Homelessness Prevention | IRN',
      description: OG_DESCRIPTION,
      images: ['/og/homelessness.jpg'],
    },
  };
}

const kyrItems = [
  {
    question: 'Can my landlord evict me without a court order?',
    answer:
      "No. In Virginia, self-help evictions—like changing the locks, removing your belongings, or cutting off utilities—are illegal. A landlord must go through the formal court process to evict you. If you are illegally locked out, you can file a Tenant's Assertion to seek immediate relief.",
  },
  {
    question: 'Can a shelter turn me away because of my gender identity?',
    answer:
      "Under federal rules (such as the Equal Access Rule for HUD-funded shelters), shelters cannot discriminate based on sexual orientation or gender identity, and must provide accommodations in accordance with your gender identity. If you face discrimination at a shelter, IRN can help document the violation and advocate on your behalf.",
  },
  {
    question: 'What are my rights if I am unhoused in a public space?',
    answer:
      'You have the right to exist in public spaces, though local ordinances unfortunately often criminalize sleeping or camping. You always have the right to remain silent and refuse a search of your personal belongings by police. Our legal empowerment workshops provide specific, actionable guidance on safely navigating street-level police encounters.',
  },
];

export default function HomelessnessPage() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main id="main-content" className={styles.main}>

        {/* 1. HERO */}
        <Hero 
          kicker="What We Do — Homelessness Prevention"
          title="Housing is a Human Right."
          subtitle="IRN defends unhoused and housing-insecure individuals from criminalization and displacement, providing emergency stabilization and legal advocacy for marginalized and LGBTQ+ communities."
        />

        {/* 2. MISSION STATEMENT */}
        <section className={styles.section} id="approach">
          <div className={styles.container} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <blockquote style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 'bold', color: '#E4A853', marginBottom: '2rem' }}>
              &ldquo;Housing instability is a gateway to criminalization, family policing, and incarceration. We cannot achieve systems-justice without aggressively protecting the fundamental right to safe, affordable housing.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* 3. PROGRAMS GRID */}
        <section className={`${styles.section} ${styles.programsSection}`} id="programs">
          <div className={styles.container}>
            <div className={styles.programsHeader}>
              <span className={styles.programsKicker}>Our Housing Programs</span>
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
            <h2 className={styles.kyrTitle}>Know Your Housing Rights</h2>
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
