import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import GetInvolved from '../components/GetInvolved';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = {
  title: 'Events | Injustice Reform Network',
  description: 'Attend town halls, Know Your Rights workshops, and community organizing spaces.',
};

export default function EventsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero 
          kicker="Get Involved"
          title="Upcoming Events."
          subtitle="Attend town halls, Know Your Rights workshops, and community organizing spaces."
        />
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Calendar</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>

              {/* ── FEATURED: Expungement/Sealing Kickoff ── */}
              <div style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(200,98,42,0.15), rgba(212,168,67,0.08))', borderRadius: '8px', border: '1px solid rgba(200,98,42,0.4)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8622A', animation: 'pulse 2s infinite' }}></span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8622A', fontWeight: 600 }}>Urgent · New Law Takes Effect July 1st</span>
                </div>
                <h3 style={{ color: '#E4A853', fontSize: '1.4rem', lineHeight: 1.3, marginBottom: '0.75rem' }}>
                  Expungement &amp; Sealing Law Kickoff
                </h3>
                <p style={{ color: '#ddd', marginBottom: '1rem', lineHeight: 1.6 }}>
                  <strong style={{ color: '#fff' }}>JULY 1st the new expungement/sealing law takes effect!</strong> Are you ready? Need more information? We&apos;re here to help. Join us for the official kickoff to learn what this means for your record, your rights, and your future.
                </p>
                <p style={{ color: '#bbb', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                  📜 <a href="https://law.lis.virginia.gov/vacode/title19.2/chapter23.2/section19.2-392.2/" target="_blank" rel="noopener noreferrer" style={{ color: '#E4A853', textDecoration: 'underline' }}>Read the full statute — Va. Code § 19.2-392.2</a>
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ color: '#aaa' }}>
                    <p style={{ fontWeight: 600, color: '#fff' }}>📅 June 20, 2026</p>
                    <p style={{ fontSize: '0.9rem' }}>Hampton Roads</p>
                  </div>
                  <a href="https://www.eventbrite.com/e/expungement-sealing-kickoff-tickets" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 28px', background: '#C8622A', color: '#fff', fontWeight: 700, borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Register on Eventbrite →
                  </a>
                </div>
              </div>

              {/* ── Existing Events ── */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#111', borderRadius: '8px' }}>
                <div>
                  <h3 style={{ color: '#E4A853' }}>Name &amp; Gender Marker Legal Clinic</h3>
                  <p style={{ marginTop: '0.5rem', color: '#bbb' }}>Free legal assistance for document updates.</p>
                </div>
                <div style={{ textAlign: 'right', color: '#888' }}>
                  <p>Next Saturday</p>
                  <p>Hampton Roads</p>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#111', borderRadius: '8px' }}>
                <div>
                  <h3 style={{ color: '#E4A853' }}>Tenant Rights Town Hall</h3>
                  <p style={{ marginTop: '0.5rem', color: '#bbb' }}>Learn how to fight illegal evictions and demand repairs.</p>
                </div>
                <div style={{ textAlign: 'right', color: '#888' }}>
                  <p>Oct 15, 2026</p>
                  <p>Virtual</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
