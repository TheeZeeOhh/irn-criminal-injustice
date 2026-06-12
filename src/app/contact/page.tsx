import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us | Injustice Reform Network',
  description: 'Get in touch with IRN for general inquiries or media requests.',
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero 
          kicker="Reach Out"
          title="Contact Us."
          subtitle="Get in touch with our team for general inquiries, media requests, or to report an incident securely."
        />
        <section className={styles.section}>
          <div className={styles.container} style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Name</label>
                <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: '#111', border: '1px solid #333', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Email</label>
                <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: '#111', border: '1px solid #333', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Message</label>
                <textarea rows={5} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', background: '#111', border: '1px solid #333', color: 'white' }}></textarea>
              </div>
              <button type="button" style={{ background: '#E4A853', color: '#000', padding: '1rem', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
                Send Message
              </button>
            </form>
            <p style={{ marginTop: '2rem', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
              Need to report a civil rights violation anonymously? <br />
              <a href="/irn-criminal-injustice/chrt" style={{ color: '#E4A853', textDecoration: 'underline' }}>Use our encrypted CHRT tool.</a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
