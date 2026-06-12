import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = { title: 'Know Your Rights | IRN' };

export default function KYRPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <section className={styles.section} style={{ paddingTop: '150px' }}>
          <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '3rem', color: '#E4A853', margin: 0 }}>Know Your Rights: Virginia</h1>
              <button style={{ border: '1px solid #D4A843', background: 'transparent', color: '#D4A843', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Printable PDF
              </button>
            </div>
            
            <p style={{ color: '#bbb', fontSize: '1.2rem', maxWidth: '800px', marginBottom: '3rem' }}>
              A comprehensive guide to your rights during encounters with law enforcement, landlords, and state agencies in the Commonwealth of Virginia.
            </p>

            <div style={{ display: 'grid', gap: '2rem' }}>
              <div style={{ background: '#111', padding: '2rem', borderLeft: '4px solid #D4A843', borderRadius: '4px' }}>
                <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Police Encounters & Stops</h2>
                <p style={{ color: '#bbb', marginBottom: '1rem', lineHeight: 1.6 }}>
                  If you are stopped by the police in Virginia, you have the right to remain silent. You do not have to answer questions about where you are going, where you have been, or what you are doing. 
                </p>
                <p style={{ color: '#bbb', marginBottom: '1rem', lineHeight: 1.6 }}>
                  <strong>Key Phrase:</strong> "Am I free to go?" If the officer says yes, leave calmly. If they say no, you are being detained. State clearly: "I am going to remain silent. I would like to speak to an attorney."
                </p>
                <p style={{ color: '#bbb', lineHeight: 1.6 }}>
                  Virginia law (as of recent changes) restricts officers from stopping you solely for certain minor infractions like loud exhaust or smelling marijuana, though context matters. Never consent to a search of your person or vehicle. Say: "I do not consent to a search."
                </p>
              </div>

              <div style={{ background: '#111', padding: '2rem', borderLeft: '4px solid #D4A843', borderRadius: '4px' }}>
                <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Tenants & Eviction Defense</h2>
                <p style={{ color: '#bbb', marginBottom: '1rem', lineHeight: 1.6 }}>
                  Self-help evictions (where a landlord changes the locks, turns off utilities, or removes your property without a court order) are illegal in Virginia. Only a Sheriff can execute a Writ of Eviction after a court hearing.
                </p>
                <p style={{ color: '#bbb', lineHeight: 1.6 }}>
                  If you receive a 5-Day Pay or Quit notice, you have rights. You may be able to invoke the right of redemption by paying all amounts owed plus fees prior to the court date. Contact our rapid response team if you face an illegal lockout.
                </p>
              </div>

              <div style={{ background: '#111', padding: '2rem', borderLeft: '4px solid #D4A843', borderRadius: '4px' }}>
                <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Protesting & Recording Police</h2>
                <p style={{ color: '#bbb', marginBottom: '1rem', lineHeight: 1.6 }}>
                  You have the First Amendment right to record police officers performing their duties in public spaces, as long as you do not physically interfere with their actions.
                </p>
                <p style={{ color: '#bbb', lineHeight: 1.6 }}>
                  If an officer orders you to stop recording, remain calm. You may state: "I have a constitutional right to record." If they demand your phone, do not physically resist, but clearly state you do not consent to a search of your device. Always lock your phone with a passcode, not a fingerprint/face ID, when protesting.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
