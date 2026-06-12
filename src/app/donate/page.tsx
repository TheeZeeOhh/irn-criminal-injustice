import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = {
  title: 'Donate | Injustice Reform Network',
  description: 'Fund the resistance. Your contribution sustains our mutual aid and legal defense programs.',
};

export default function DonatePage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero 
          kicker="Support Our Work"
          title="Fund the Resistance."
          subtitle="Your contribution sustains our rapid-response mutual aid, legal clinics, and community defense programs."
        />
        <section className={styles.section}>
          <div className={styles.container} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ padding: '3rem', border: '1px solid #333', borderRadius: '12px', background: 'linear-gradient(180deg, #16130F 0%, #111 100%)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#E4A853' }}>Make a Monthly Pledge</h2>
              <p style={{ color: '#bbb', marginBottom: '2rem' }}>Recurring donations allow us to plan long-term advocacy campaigns and ensure our emergency bail and housing funds are always solvent.</p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                <button style={{ padding: '1rem 2rem', border: '1px solid #E4A853', background: 'transparent', color: '#E4A853', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>$10</button>
                <button style={{ padding: '1rem 2rem', border: '1px solid #E4A853', background: '#E4A853', color: '#000', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>$25</button>
                <button style={{ padding: '1rem 2rem', border: '1px solid #E4A853', background: 'transparent', color: '#E4A853', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>$50</button>
                <button style={{ padding: '1rem 2rem', border: '1px solid #E4A853', background: 'transparent', color: '#E4A853', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Other</button>
              </div>

              <button type="button" style={{ width: '100%', padding: '1rem', background: '#E4A853', color: '#000', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', border: 'none' }}>
                Donate Securely
              </button>
            </div>
            <p style={{ marginTop: '2rem', color: '#888', fontSize: '0.9rem' }}>
              IRN is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
