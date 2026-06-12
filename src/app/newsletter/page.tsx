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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
