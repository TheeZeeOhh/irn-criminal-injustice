import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ChaptersContent from './ChaptersContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Chapters & Locations | Injustice Reform Network',
  description:
    'IRN operates across Virginia, Maryland, North Carolina, and Washington DC — delivering civil rights documentation, free legal clinics, and community defense where communities need it most.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/chapters/' },
  openGraph: {
    type: 'website',
    url: 'https://injusticereformnetwork.org/chapters/',
    title: 'Chapters & Locations | Injustice Reform Network',
    description:
      'IRN chapters in Virginia, Maryland, North Carolina, and DC. Find your local chapter.',
    siteName: 'Injustice Reform Network',
  },
};

export default function ChaptersPage() {
  return (
    <>
      <Nav />
      <ChaptersContent />
      <Footer />
    </>
  );
}
