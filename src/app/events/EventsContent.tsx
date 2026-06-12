'use client';
import { motion, type Variants } from 'framer-motion';
import { MapPin, Clock, CheckSquare, ExternalLink, CalendarDays, Scale } from 'lucide-react';
import styles from './events.module.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const whoShouldAttend = [
  'Prior arrests or charges',
  'Misdemeanor convictions',
  'Denied jobs due to record',
  'Told you didn\'t qualify before',
  'Certain felony convictions',
  'Denied housing due to record',
  'Returning citizens',
];

const everythingFree = [
  'Legal consultation',
  'Court filing fees covered',
  'Petition preparation',
  'No cost to you',
];

const upcomingEvents = [
  {
    title: 'Name & Gender Marker Legal Clinic',
    desc: 'Free legal assistance for document updates — name changes, gender marker corrections on IDs, birth certificates, and Social Security cards.',
    date: 'TBA — Summer 2026',
    location: 'Hampton Roads',
  },
  {
    title: 'Tenant Rights Town Hall',
    desc: 'Learn how to fight illegal evictions, demand repairs, and understand your rights under Virginia landlord-tenant law.',
    date: 'Oct 15, 2026',
    location: 'Virtual',
  },
  {
    title: 'Know Your Rights: Police Encounters',
    desc: 'Practical workshop on what to say, what not to say, and how to document interactions with law enforcement.',
    date: 'TBA — Fall 2026',
    location: 'Newport News',
  },
];

export default function EventsContent() {
  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.accentBar} aria-hidden="true" />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <motion.span className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            IRN Events
          </motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
            Community Education.<br />Direct Service.
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}>
            Free clinics, Know Your Rights workshops, and community organizing spaces
            across Hampton Roads and Baltimore.
          </motion.p>
        </div>
      </header>

      {/* FEATURED: EXPUNGEMENT CLINIC */}
      <section className={styles.featuredSection} aria-labelledby="clinic-heading">
        <div className={styles.container}>

          <motion.div className={styles.urgentBadge} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}>
            <span className={styles.urgentDot} aria-hidden="true" />
            Virginia's Clean Slate Law Takes Effect July 1, 2026
          </motion.div>

          <motion.div className={styles.featuredCard} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>

            {/* Left: details */}
            <div className={styles.featuredDetails}>
              <div className={styles.featuredHeaderRow}>
                <Scale size={20} className={styles.featuredIcon} aria-hidden="true" />
                <span className={styles.featuredLabel}>Featured Event</span>
              </div>
              <h2 id="clinic-heading" className={styles.featuredTitle}>
                Free Expungement &amp;<br />Record Sealing Clinic
              </h2>
              <p className={styles.featuredSubtitle}>
                Virginia's Clean Slate Law is here. If you've been told you don't qualify,
                denied a job or housing due to your record, or simply need help navigating
                the process — come in. <strong>Everything is free.</strong>
              </p>

              {/* Two clinic dates */}
              <div className={styles.clinicsGrid}>
                <div className={styles.clinicCard}>
                  <span className={styles.clinicBadge}>Clinic One — Launch Day</span>
                  <div className={styles.clinicDate}>July 1, 2026</div>
                  <p className={styles.clinicNote}>The first day the law is in effect</p>
                  <div className={styles.clinicDetail}><MapPin size={13} aria-hidden="true" /> Pearl Bailey Library → Circuit Clerk's Office</div>
                  <div className={styles.clinicDetail}><Clock size={13} aria-hidden="true" /> Same-Day Filing · 10:00 AM – 4:00 PM</div>
                </div>
                <div className={styles.clinicCard}>
                  <span className={styles.clinicBadge}>Clinic Two — Second Chance</span>
                  <div className={styles.clinicDate}>July 15, 2026</div>
                  <p className={styles.clinicNote}>3rd Wednesday of July</p>
                  <div className={styles.clinicDetail}><MapPin size={13} aria-hidden="true" /> Pearl Bailey Library → Circuit Clerk's Office</div>
                  <div className={styles.clinicDetail}><Clock size={13} aria-hidden="true" /> Same-Day Filing · 10:00 AM – 4:00 PM</div>
                </div>
              </div>

              {/* Who / What's free */}
              <div className={styles.checklistsRow}>
                <div className={styles.checklist}>
                  <h3 className={styles.checklistTitle}>Who Should Attend</h3>
                  <ul className={styles.checklistItems}>
                    {whoShouldAttend.map((item) => (
                      <li key={item}><CheckSquare size={13} aria-hidden="true" className={styles.checkIcon} />{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.checklist}>
                  <h3 className={styles.checklistTitle}>Everything Is Free</h3>
                  <ul className={styles.checklistItems}>
                    {everythingFree.map((item) => (
                      <li key={item}><CheckSquare size={13} aria-hidden="true" className={styles.checkIcon} style={{ color: 'var(--sage)' }} />{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Attorney + partners */}
              <div className={styles.attorneyRow}>
                <div>
                  <p className={styles.attorneyLabel}>Featuring</p>
                  <p className={styles.attorneyName}>Attorney George Evans</p>
                  <p className={styles.attorneyContact}>
                    <a href="tel:8046029166" className={styles.contactLink}>804-602-9166</a>
                    {' · '}
                    <a href="mailto:cirnpresident@gmail.com" className={styles.contactLink}>cirnpresident@gmail.com</a>
                  </p>
                </div>
                <div className={styles.partnerRow}>
                  <span className={styles.partnerLabel}>In Partnership With</span>
                  <span className={styles.partnerName}>Fighting 4 Freedom</span>
                  <span className={styles.partnerDivider}>·</span>
                  <span className={styles.partnerName}>Virginia Clean Slate</span>
                </div>
              </div>

              <div className={styles.featuredActions}>
                <a
                  href="https://law.lis.virginia.gov/vacode/title19.2/chapter23.2/section19.2-392.2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnGhost}
                >
                  Va. Code § 19.2-392.2 <ExternalLink size={12} aria-hidden="true" />
                </a>
                <a href="mailto:cirnpresident@gmail.com" className={styles.btnPrimary}>
                  Reserve Your Spot
                </a>
              </div>
            </div>

            {/* Right: flyer image */}
            <div className={styles.flyerWrap}>
              <img
                src="/irn-criminal-injustice/expungement-clinic-flyer.jpg"
                alt="Free Expungement & Record Sealing Clinic flyer — July 1 & July 15, 2026, Pearl Bailey Library"
                className={styles.flyerImg}
              />
            </div>

          </motion.div>
        </div>
      </section>

      {/* OTHER UPCOMING EVENTS */}
      <section className={styles.section} aria-labelledby="upcoming-heading">
        <div className={styles.container}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <span className={styles.sectionKicker}>Also Coming Up</span>
            <h2 id="upcoming-heading" className={styles.sectionTitle}>More IRN Events</h2>
          </motion.div>
          <div className={styles.eventsGrid}>
            {upcomingEvents.map((ev, i) => (
              <motion.div key={ev.title} className={styles.eventCard} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <CalendarDays size={18} className={styles.eventIcon} aria-hidden="true" />
                <h3 className={styles.eventTitle}>{ev.title}</h3>
                <p className={styles.eventDesc}>{ev.desc}</p>
                <div className={styles.eventMeta}>
                  <span className={styles.eventDate}>{ev.date}</span>
                  <span className={styles.eventLocation}><MapPin size={11} aria-hidden="true" /> {ev.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className={styles.container}>
          <motion.div className={styles.ctaBlock} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 id="cta-heading" className={styles.ctaTitle}>Stay in the Loop.</h2>
            <p className={styles.ctaBody}>Get notified about upcoming clinics, workshops, and organizing events.</p>
            <a href="/irn-criminal-injustice/newsletter" className={styles.btnPrimary}>Join the Newsletter</a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
