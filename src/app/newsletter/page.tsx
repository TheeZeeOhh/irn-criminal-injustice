import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import NewsletterStrip from '../components/NewsletterStrip';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'Newsletter | IRN' };

export default function NewsletterPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', color: '#E4A853', marginBottom: '1rem', textAlign: 'center' }}>The Dispatch</h1>
            <p style={{ color: '#bbb', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
              Subscribe to our encrypted mailing list for rapid-response action alerts, policy updates, and Hampton Roads accountability news.
            </p>
            <NewsletterStrip />

            <div style={{ marginTop: '5rem', borderTop: '1px solid #333', paddingTop: '3rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '2rem', textAlign: 'center' }}>Archive</h2>
              
              <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                <a href="/irn-criminal-injustice/irn-dispatch-vol01.html" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: '#111', borderRadius: '8px', border: '1px solid #333', textDecoration: 'none' }}>
                  <div>
                    <span style={{ color: '#E4A853', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vol. 01 • June 2026</span>
                    <h3 style={{ color: '#fff', fontSize: '1.25rem', marginTop: '0.5rem', marginBottom: '0' }}>The People's Intelligence Brief</h3>
                  </div>
                  <span style={{ color: '#E4A853' }}>Read →</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
