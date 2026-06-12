import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'Press Kit | IRN' };

export default function PressPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px' }}>
          <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', color: '#E4A853', marginBottom: '1rem' }}>Press Kit</h1>
            <p style={{ color: '#bbb', fontSize: '1.2rem', maxWidth: '800px', marginBottom: '3rem' }}>
              Official resources, boilerplate copy, and media assets for the Injustice Reform Network.
            </p>

            <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div>
                <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Organization Boilerplate</h2>
                <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '1rem' }}>
                  The Injustice Reform Network (IRN) is a Hampton Roads-based advocacy organization dedicated to dismantling systemic injustice across criminal, environmental, and family policing systems. Through secure documentation, mutual aid, and legislative pressure, IRN builds power and protects marginalized communities from state violence.
                </p>
                <a href="mailto:press@injusticereformnetwork.org" style={{ color: '#D4A843', textDecoration: 'underline' }}>press@injusticereformnetwork.org</a>
              </div>

              <div>
                <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Media Assets</h2>
                <div style={{ background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
                  <img src="/irn-crest.png" alt="IRN Crest" style={{ width: '100px', height: '100px', marginBottom: '1rem' }} />
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="/irn-crest.png" download style={{ color: '#D4A843', fontSize: '0.9rem' }}>Download PNG</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
