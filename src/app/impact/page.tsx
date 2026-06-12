import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ImpactContent from './ImpactContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Impact & Accountability Data | Injustice Reform Network',
  description: 'IRN by the numbers — cases documented, FOIA requests filed, families served, and the systemic patterns we have exposed across Virginia, Maryland, NC, and DC.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/impact/' },
};

export default function ImpactPage() {
  return (
    <>
      <Nav />
      <ImpactContent />
      <Footer />
    </>
  );
}
