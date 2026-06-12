import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'CHRT Portal | IRN' };

export default function ChrtPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px' }}>
          <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', color: '#E4A853', marginBottom: '1rem' }}>CHRT Secure Portal</h1>
            <p style={{ color: '#bbb', fontSize: '1.2rem', maxWidth: '800px', marginBottom: '2rem' }}>
              The Civil and Human Rights Tracker (CHRT) allows you to securely and anonymously document civil rights violations, systemic negligence, and wrongful convictions.
            </p>
            <div style={{ background: '#111', padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
              <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Initiate Secure Report</h2>
              <p style={{ color: '#888', marginBottom: '1.5rem' }}>This form uses client-side AES-256-GCM encryption. We cannot identify you unless you provide identifying information in your report payload.</p>
              <button style={{ background: '#D4A843', color: '#000', padding: '12px 24px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
                Open Encrypted Intake Form
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
