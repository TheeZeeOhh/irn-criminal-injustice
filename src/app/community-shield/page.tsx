import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  Zap,
  FileWarning,
  ShieldCheck,
  Camera,
  MapPin,
  Clock,
  PhoneCall,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'CommunityShield — Crisis Navigation for Baltimore & Hampton Roads | IRN',
  description:
    'CommunityShield is the first tool built for people facing eviction, utility shutoffs, blight, and homelessness. Know your rights. Build your case. Get help fast. One-time $9.99.',
};

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: 'Eviction Notice at 5pm',
    desc: 'The courts close. You have no lawyer. The system counts on you not knowing your next move — or your deadline.',
  },
  {
    icon: Zap,
    title: 'Lights Shutoff. No Warning.',
    desc: 'Utility companies bury your rights in fine print. You have more legal protection than they want you to know.',
  },
  {
    icon: FileWarning,
    title: 'Blight Citation. No Explanation.',
    desc: 'City inspectors show up, issue fines, and leave. Without documentation, you are the problem — not the landlord.',
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Emergency Rights Card',
    desc: 'Instant, plain-language breakdowns of your rights in eviction, utility shutoff, and police encounter scenarios. Offline-ready.',
  },
  {
    icon: Camera,
    title: 'Evidence Locker',
    desc: 'Photograph damage, save notes, and build timestamped documentation that attorneys and advocates can use on your behalf.',
  },
  {
    icon: MapPin,
    title: 'Resource Radar',
    desc: 'Curated, real organizations for shelter, legal aid, food, health, and utility assistance in Baltimore and Hampton Roads.',
  },
  {
    icon: Clock,
    title: 'Deadline Tracker',
    desc: 'Add your response deadlines. Get a color-coded countdown so you never miss a court date, appeal window, or payment cutoff.',
  },
  {
    icon: PhoneCall,
    title: 'IRN Escalation Button',
    desc: 'Send your incident directly to IRN advocates. One form. One tap. Real people who fight for housing and civil rights.',
  },
];

export default function CommunityShieldLandingPage() {
  return (
    <main>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroLockup}>
          <div className={styles.heroEyebrow}>
            <ShieldCheck size={13} />
            CommunityShield by IRN
          </div>

          <h1 className={styles.heroHeadline}>
            The System Won&rsquo;t Wait for You.{' '}
            <em>Neither Should Your Rights.</em>
          </h1>

          <p className={styles.heroSub}>
            CommunityShield is the first tool built for people directly impacted by
            blight, eviction, and homelessness &mdash; not for lawyers, not for agencies.{' '}
            <strong>For you.</strong>
          </p>

          <Link href="/community-shield/purchase/" className={styles.heroCta}>
            Get CommunityShield &mdash; $9.99
            <ArrowRight size={16} />
          </Link>

          <p className={styles.heroMeta}>
            One-time payment. Yours forever. No subscription. Ever.
          </p>
        </div>

        <div className={styles.heroScroll} aria-hidden="true">
          <ChevronDown size={18} />
          scroll
        </div>
      </section>

      {/* ── Problem ─────────────────────────────────────────── */}
      <section className={styles.problemSection}>
        <div className={styles.problemInner}>
          <p className={styles.sectionEyebrow}>Why CommunityShield Exists</p>
          <h2 className={styles.sectionHeading}>
            Crisis doesn&rsquo;t come with office hours.
          </h2>
          <p className={styles.sectionLead}>
            The systems that control your housing, utilities, and safety were not
            designed with you in mind. CommunityShield was.
          </p>

          <div className={styles.problemGrid}>
            {PAIN_POINTS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.problemCard}>
                <div className={styles.problemIcon}>
                  <Icon size={28} />
                </div>
                <h3 className={styles.problemTitle}>{title}</h3>
                <p className={styles.problemDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={styles.sectionDivider} />

      {/* ── Features ────────────────────────────────────────── */}
      <section className={styles.section}>
        <p className={styles.sectionEyebrow}>What&rsquo;s Inside</p>
        <h2 className={styles.sectionHeading}>Five tools. One purpose.</h2>
        <p className={styles.sectionLead}>
          Built for the moment when everything is happening at once and you need
          answers, not waiting rooms.
        </p>

        <div className={styles.featuresGrid}>
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon size={22} />
              </div>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────── */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingInner}>
          <div className={styles.pricingBadge}>Simple, fair pricing</div>

          <div className={styles.pricingAmount}>
            <span className={styles.pricingSup}>$</span>9.99
          </div>

          <p className={styles.pricingMeta}>
            One time. No subscription. No data sold. No strings.
            <br />
            Unlock on any device. Keep it forever.
          </p>

          <div className={styles.pricingActions}>
            <Link href="/community-shield/purchase/" className={styles.btnEmber}>
              Get Access Now
              <ArrowRight size={15} />
            </Link>
            <Link href="/criminal-injustice/" className={styles.btnGhost}>
              Learn More About IRN
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ───────────────────────────────────────── */}
      <div className={styles.trustBar}>
        Built by IRN
        <span className={styles.trustDots}>·</span>
        Baltimore, MD &amp; Hampton Roads, VA
        <span className={styles.trustDots}>·</span>
        All proceeds fund civil rights advocacy
      </div>
    </main>
  );
}
