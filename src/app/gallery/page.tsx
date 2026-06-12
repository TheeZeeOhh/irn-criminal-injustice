import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = {
  title: 'Gallery | Injustice Reform Network',
  description: 'Community in action. Photos and media from our campaigns.',
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero 
          kicker="Media"
          title="Community in Action."
          subtitle="Photos and media from our workshops, rallies, and direct action campaigns."
        />
        <section className={styles.section}>
          <div className={styles.container}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div style={{ aspectRatio: '1', background: '#1a1a1a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>Image 1</div>
              <div style={{ aspectRatio: '1', background: '#1a1a1a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>Image 2</div>
              <div style={{ aspectRatio: '1', background: '#1a1a1a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>Image 3</div>
              <div style={{ aspectRatio: '1', background: '#1a1a1a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>Image 4</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
