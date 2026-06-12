import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import NewsletterStrip from '../components/NewsletterStrip';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = {
  title: 'Campaigns | Injustice Reform Network',
  description: 'Join IRN in fighting for structural accountability. Sign petitions, contact legislators, and participate in direct actions.',
};

export default function CampaignsPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero 
          kicker="Take Action"
          title="Our Current Campaigns."
          subtitle="Join us in fighting for structural accountability. Sign petitions, contact legislators, and participate in direct actions."
        />
        <section className={styles.section}>
          <div className={styles.container}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Active Legislative Efforts</h2>
            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                <h3 style={{ color: '#E4A853', marginBottom: '1rem' }}>No More Bars Voting Initiative</h3>
                <p>Restoring civic participation for incarcerated and formerly incarcerated people.</p>
              </div>
              <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                <h3 style={{ color: '#E4A853', marginBottom: '1rem' }}>JFV Legislative Pipeline</h3>
                <p>Translating community harm reports into actionable local and state policies.</p>
              </div>
              <div style={{ padding: '2rem', border: '1px solid #333', borderRadius: '8px' }}>
                <h3 style={{ color: '#E4A853', marginBottom: '1rem' }}>End Mandatory Reporting</h3>
                <p>Advocating for support over surveillance in our schools and healthcare systems.</p>
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
