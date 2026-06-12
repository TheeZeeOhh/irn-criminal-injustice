import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import NewsletterStrip from '../components/NewsletterStrip';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = {
  title: 'The Dispatch | Injustice Reform Network',
  description: 'Latest news, case studies, and policy analysis from IRN.',
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero 
          kicker="The Dispatch"
          title="Latest Updates."
          subtitle="Read the latest news, case studies, and policy analysis from the Injustice Reform Network."
        />
        <section className={styles.section}>
          <div className={styles.container}>
            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Policy Analysis</p>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>The Hidden Cost of Pretrial Detention</h3>
                <p style={{ color: '#bbb' }}>An analysis of how cash bail disproportionately harms LGBTQ+ individuals...</p>
              </div>
              <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Case Spotlight</p>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Accountability in Hampton Roads</h3>
                <p style={{ color: '#bbb' }}>How community documentation led to the dismissal of eight wrongful charges...</p>
              </div>
              <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Mutual Aid</p>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Launching the Trans Reentry Program</h3>
                <p style={{ color: '#bbb' }}>Why the 72 hours post-release are the most critical, and how we are responding...</p>
              </div>
            </div>
          </div>
        </section>
        <NewsletterStrip />
      </main>
      <Footer />
    </>
  );
}
