import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import BookingSystem from '../components/BookingSystem';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = {
  title: 'Book an Intake | Injustice Reform Network',
  description: 'Book a free, confidential intake consultation or Know Your Rights workshop with our advocacy team.',
};

export default function BookingPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero 
          kicker="Get Support"
          title="Book an Intake."
          subtitle="Schedule a free, confidential consultation with our community advocates. We prioritize your privacy and security."
        />
        <section className={styles.section}>
          <div className={styles.container}>
            <BookingSystem />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
