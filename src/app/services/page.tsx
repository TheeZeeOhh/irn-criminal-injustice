import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../components/Nav';
import ProgramCard from '../components/ProgramCard';
import NewsletterStrip from '../components/NewsletterStrip';
import Footer from '../components/Footer';
import services from '../data/services.json';
import styles from './page.module.css';

const OG_DESCRIPTION =
  'IRN direct services: the No More Bars voting initiative, legal education and expungement clinics, fines and garnishment relief, the Youth Campaign & Policy School, and more. Book IRN for keynotes, trainings, and strategy.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL('https://injusticereformnetwork.org'),
    title: 'Services & Booking | Injustice Reform Network',
    description: OG_DESCRIPTION,
    robots: { index: true, follow: true },
    alternates: {
      canonical: 'https://injusticereformnetwork.org/services/',
    },
    openGraph: {
      type: 'website',
      url: 'https://injusticereformnetwork.org/services/',
      title: 'Services & Booking | Injustice Reform Network',
      description: OG_DESCRIPTION,
      images: [{ url: '/irn-crest.png', width: 1200, height: 1143 }],
      siteName: 'Injustice Reform Network',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Services & Booking | IRN',
      description: OG_DESCRIPTION,
      images: ['/irn-crest.png'],
    },
  };
}

const formats = [
  {
    name: 'Keynote Address',
    spec: '45–60 minutes + Q&A',
    desc: 'A full-room reckoning. Story, framework, and a concrete call to action your audience can act on Monday morning.',
  },
  {
    name: 'Workshop / Training',
    spec: 'Half-day or full-day',
    desc: 'Hands-on capacity building: rapid response protocols, non-carceral intake design, data sovereignty, accountability campaign strategy.',
  },
  {
    name: 'Panel & Moderation',
    spec: '60–90 minutes',
    desc: 'Speaker seats or moderation for convenings on justice reform, trans liberation, harm reduction, and community tech.',
  },
  {
    name: 'Strategy Consulting',
    spec: 'Scoped engagements',
    desc: 'Direct advisory for orgs and coalitions: program design, campaign architecture, and liberation-first technology audits.',
  },
];

const tiers = [
  {
    rate: 'Sliding Scale',
    who: 'Community & Grassroots',
    desc: "Mutual aid groups, grassroots collectives, and community spaces. We don't price out the people we organize with.",
  },
  {
    rate: 'Standard Honorarium',
    who: 'Nonprofits & Universities',
    desc: 'Mission-aligned institutions, schools, and conferences. Quoted on inquiry, scaled to scope and audience.',
  },
  {
    rate: 'Full Rate',
    who: 'Corporate & Government',
    desc: 'Full-rate engagements directly subsidize our sliding-scale work. Your budget funds the movement.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>

        {/* 1. HERO */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroInner}>
              <Image
                src="/irn-criminal-injustice/irn-crest.png"
                alt="Injustice Reform Network crest — shield with IRN monogram, crown, crossed swords, and laurel wreath"
                width={220}
                height={210}
                priority
                className={styles.crest}
              />
              <div>
                <span className={styles.kicker}>Direct Services</span>
                <h1 className={styles.heroTitle}>What We Do for the People</h1>
                <p className={styles.heroSub}>
                  Direct support, education, and advocacy that dismantle unjust legal
                  practices and remove barriers to justice — built by and for the
                  communities the system targets.
                </p>
                <p className={styles.motto}>Aequitas et justitia erit nobis victoriam!</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SERVICES GRID */}
        <section className={styles.section} id="services">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.kicker}>Our Services</span>
              <h2 className={styles.sectionTitle}>Six Ways We Show Up</h2>
            </div>
            <div className={styles.grid}>
              {services.map((service, i) => (
                <ProgramCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. BOOKING — FORMATS */}
        <section className={`${styles.section} ${styles.sectionDark}`} id="booking">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.kicker}>Bring IRN to Your People</span>
              <h2 className={styles.sectionTitle}>Speaking, Training & Strategy</h2>
              <p className={styles.sectionSub}>
                Keynotes, workshops, and movement strategy from organizers who build the
                infrastructure they speak about. Pick your container — we bring the fire.
              </p>
            </div>
            <div className={styles.formatGrid}>
              {formats.map((f) => (
                <div className={styles.formatCard} key={f.name}>
                  <h3 className={styles.formatName}>{f.name}</h3>
                  <span className={styles.formatSpec}>{f.spec}</span>
                  <p className={styles.formatDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. HONORARIA */}
        <section className={styles.section} id="honoraria">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.kicker}>Honoraria & Access</span>
              <h2 className={styles.sectionTitle}>Equity Is the Rate Card</h2>
            </div>
            <div className={styles.tierGrid}>
              {tiers.map((t) => (
                <div className={styles.tierCard} key={t.who}>
                  <span className={styles.tierRate}>{t.rate}</span>
                  <h3 className={styles.tierWho}>{t.who}</h3>
                  <p className={styles.tierDesc}>{t.desc}</p>
                </div>
              ))}
            </div>
            <p className={styles.included}>
              <strong>Every engagement includes:</strong> pre-event consultation · tailored
              content for your audience · accessible materials · post-event resource list.
              Fully equipped for virtual and hybrid events.
            </p>
          </div>
        </section>

        {/* 5. CTA */}
        <section className={styles.ctaStrip}>
          <div className={styles.container}>
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaTitle}>Book IRN</h2>
              <p className={styles.ctaText}>
                Send your event details — date, audience, format, and goals — and
                we&rsquo;ll schedule a 20-minute call to scope the engagement.
              </p>
              <Link href="/contact" className={styles.ctaBtn}>
                Start a Booking Inquiry →
              </Link>
            </div>
          </div>
        </section>

        {/* 6. NEWSLETTER */}
        <NewsletterStrip />

      </main>
      <Footer />
    </>
  );
}
