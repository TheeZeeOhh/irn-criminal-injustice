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
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: '#111', borderRadius: '8px' }}>
                <div>
                  <h3 style={{ color: '#E4A853' }}>Name & Gender Marker Legal Clinic</h3>
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
