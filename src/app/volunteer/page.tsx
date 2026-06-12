import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'Volunteer | IRN' };

export default function VolunteerPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px' }}>
          <div className={styles.container}>
            <h1 style={{ fontSize: '3rem', color: '#E4A853', marginBottom: '1rem' }}>Join the Network</h1>
            <p style={{ color: '#bbb', fontSize: '1.2rem', maxWidth: '800px', marginBottom: '2rem' }}>
              IRN is built by and for the community. We need advocates, organizers, legal observers, and logistical support. Fill out the intake form below to get started.
            </p>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px', background: '#111', padding: '2rem', borderRadius: '8px', border: '1px solid #333' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#ccc' }}>Name or Alias</label>
                <input type="text" required style={{ padding: '0.75rem', background: '#1a1a1a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#ccc' }}>Contact Info (Email or Signal Number)</label>
                <input type="text" required style={{ padding: '0.75rem', background: '#1a1a1a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#ccc' }}>How would you like to contribute?</label>
                <select style={{ padding: '0.75rem', background: '#1a1a1a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}>
                  <option>Legal Observation / Court Accompaniment</option>
                  <option>Community Organizing & Canvassing</option>
                  <option>Mutual Aid / Logistics</option>
                  <option>Research & FOIA Filing</option>
                  <option>Technical / Design</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: '#ccc' }}>Why do you want to organize with IRN?</label>
                <textarea rows={4} style={{ padding: '0.75rem', background: '#1a1a1a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}></textarea>
              </div>

              <button type="button" style={{ background: '#D4A843', color: '#000', padding: '12px 24px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
                Submit Interest
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
