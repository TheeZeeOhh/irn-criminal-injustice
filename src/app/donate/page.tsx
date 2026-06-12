import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import DonateContent from './DonateContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Donate | Injustice Reform Network',
  description:
    'Fund the resistance. Your contribution sustains our mutual aid, free legal clinics, and community defense programs.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/donate/' },
  openGraph: {
    type: 'website',
    url: 'https://injusticereformnetwork.org/donate/',
    title: 'Donate | Injustice Reform Network',
    description:
      'Fund IRN\'s free expungement clinics, Know Your Rights workshops, and civil rights documentation programs.',
    siteName: 'Injustice Reform Network',
  },
};

export default function DonatePage() {
  return (
    <>
      <Nav />
      <DonateContent />
      <Footer />
    </>
  );
}
