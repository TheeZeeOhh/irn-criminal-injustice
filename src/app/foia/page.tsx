import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import FOIAContent from './FOIAContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'FOIA Request Generator | Injustice Reform Network',
  description: 'Generate a ready-to-send FOIA request letter for Virginia or Maryland agencies. Free, no account required.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/foia/' },
};

export default function FOIAPage() {
  return (
    <>
      <Nav />
      <FOIAContent />
      <Footer />
    </>
  );
}
