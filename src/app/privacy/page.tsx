import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'Privacy Policy | IRN' };

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px' }}>
          <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', color: '#E4A853', marginBottom: '2rem' }}>Privacy Policy & Data Security</h1>
            <div style={{ color: '#bbb', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}><strong>Last Updated: June 12, 2026</strong></p>
              <p style={{ marginBottom: '1.5rem' }}>
                The Injustice Reform Network (IRN) operates on a zero-knowledge architecture principle. We exist to protect marginalized communities from systemic retaliation, and our data policies reflect this mandate.
              </p>
              <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Do Not Collect</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                We do not track IP addresses. We do not use third-party analytics cookies. Our CHRT portal employs client-side AES-256-GCM encryption before data leaves your device, meaning we cannot be compelled to surrender identifying information we do not possess.
              </p>
              <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>2. Voluntary Information</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                If you voluntarily provide contact information (e.g., via our secure booking platform, newsletter signup, or donation portal), it is compartmentalized. Booking information is securely transmitted to advocates and purged upon resolution of the case, unless explicit consent for retention is granted.
              </p>
              <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. Data Disclosures</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                We guarantee <strong>zero voluntary disclosures</strong> to law enforcement agencies. Data is aggregated and anonymized strictly for the purposes of systemic litigation, legislative advocacy (e.g., DOJ complaints, Virginia General Assembly bills), and community defense.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
