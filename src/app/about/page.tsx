import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import StatStrip from '../components/StatStrip';
import Footer from '../components/Footer';
import styles from '../criminal-injustice/page.module.css';

export const metadata: Metadata = {
  title: 'About Us | Injustice Reform Network',
  description: 'Rooted in community. Learn about our history and commitment to abolition-informed systems justice.',
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <Hero 
          kicker="Who We Are"
          title="Rooted in Community."
          subtitle="Learn about our history, our team, and our commitment to abolition-informed systems justice for all marginalized people."
        />
        <section className={styles.section}>
          <div className={styles.container} style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              The <strong>Criminal Injustice Reform Network (CIRN / IRN)</strong> is a grassroots, systems-accountability organization based in Virginia. We focus on dismantling the intersecting harms of the criminal legal system, family policing, and environmental injustice.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Our work produces meaningful, intersectional impact for LGBTQ+ communities—particularly Black trans people and formerly incarcerated LGBTQ+ individuals—as well as unhoused populations and families targeted by state surveillance.
            </p>
            <p>
              Through direct mutual aid, policy advocacy, and rigorous documentation via our Community Harm Reporting Tool (CHRT), we build the infrastructure our communities need to hold institutions accountable.
            </p>
          </div>
        </section>
        <StatStrip />
      </main>
      <Footer />
    </>
  );
}
