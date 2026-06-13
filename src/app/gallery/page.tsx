import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Gallery | Injustice Reform Network',
  description: 'Community in action. Photos and media from IRN campaigns, workshops, rallies, and direct action across VA, MD, NC, and DC.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/gallery/' },
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <GalleryContent />
      <Footer />
    </>
  );
}
