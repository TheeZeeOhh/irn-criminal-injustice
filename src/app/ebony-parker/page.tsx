import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import EbonyParkerContent from './EbonyParkerContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Case of Dr. Ebony Parker | Injustice Reform Network',
  description: 'All eight charges dismissed. June 2026. IRN documented this case from intake through vindication. Download the one-pager for press and organizers.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/ebony-parker/' },
};

export default function EbonyParkerPage() {
  return (
    <>
      <Nav />
      <EbonyParkerContent />
      <Footer />
    </>
  );
}
