import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CrimeStatsContent from './CrimeStatsContent';

const OG_DESCRIPTION =
  'Hampton Roads crime statistics, police use-of-force data, incarceration rates, and racial disparities in the criminal justice system — documented by IRN.';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Crime Statistics & Data | Injustice Reform Network',
  description: OG_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/crime-stats/' },
  openGraph: {
    type: 'website',
    url: 'https://injusticereformnetwork.org/crime-stats/',
    title: 'Crime Statistics & Data | IRN',
    description: OG_DESCRIPTION,
    images: [{ url: '/og/criminal-injustice.jpg', width: 1200, height: 630 }],
    siteName: 'Injustice Reform Network',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crime Statistics & Data | IRN',
    description: OG_DESCRIPTION,
    images: ['/og/criminal-injustice.jpg'],
  },
};

export default function CrimeStatsPage() {
  return (
    <>
      <Nav />
      <CrimeStatsContent />
      <Footer />
    </>
  );
}
