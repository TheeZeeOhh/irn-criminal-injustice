import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'Terms of Service | IRN' };

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px' }}>
          <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', color: '#E4A853', marginBottom: '2rem' }}>Terms of Service</h1>
            <div style={{ color: '#bbb', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1.5rem' }}><strong>Last Updated: June 12, 2026</strong></p>
              <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>1. No Legal Representation</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                The Injustice Reform Network (IRN) is an advocacy and mutual aid organization. We are not a law firm. Using our site, submitting a report via CHRT, or booking an intake does not create an attorney-client relationship. All legal clinics and referrals are conducted through external, independently licensed attorneys in the Virginia bar.
              </p>
              <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>2. Use of Resources</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Our Know Your Rights materials, templates, and guides are provided for educational purposes only. They do not constitute formal legal advice.
              </p>
              <h2 style={{ color: '#fff', marginTop: '2rem', marginBottom: '1rem' }}>3. CHRT Usage Restrictions</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                The CHRT portal is intended for documenting systemic abuses and requesting assistance. It is not an emergency response system. If you are experiencing an immediate physical emergency, contact an emergency service provider.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
