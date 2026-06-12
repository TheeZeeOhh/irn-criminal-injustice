import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'Accessibility | IRN' };

export default function AccessibilityPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px' }}>
          <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', color: '#E4A853', marginBottom: '2rem' }}>Accessibility Statement</h1>
            <div style={{ color: '#bbb', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}>
                The Injustice Reform Network (IRN) is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards (WCAG 2.1 AA).
              </p>
              <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Our Measures</h2>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                <li>Built-in 'reduced-motion' support for users who prefer minimal animations.</li>
                <li>High-contrast text elements and semantic HTML5 structures.</li>
                <li>Full keyboard navigability across core features.</li>
                <li>8th-grade reading level targeting on all legal and rights-based documentation.</li>
              </ul>
              <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>Feedback</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                We welcome your feedback on the accessibility of IRN. Please let us know if you encounter accessibility barriers by emailing us at <a href="mailto:info@injusticereformnetwork.org" style={{ color: '#D4A843' }}>info@injusticereformnetwork.org</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
