import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import EbonyParkerContent from './EbonyParkerContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://theezeeohh.github.io'),
  title: 'Case of Dr. Ebony Parker | Injustice Reform Network',
  description: 'All eight charges dismissed. June 2026. IRN documented this case from intake through vindication — 18 months of evidence-grounded advocacy that proved the system can be beaten.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://theezeeohh.github.io/irn-criminal-injustice/ebony-parker/',
  },
  openGraph: {
    type: 'article',
    url: 'https://theezeeohh.github.io/irn-criminal-injustice/ebony-parker/',
    title: 'All 8 Charges Dismissed: The Case of Dr. Ebony Parker',
    description: 'IRN documented this case from intake through vindication. 18 months. 8 charges. 0 convictions. Here\'s what disciplined, evidence-grounded advocacy looks like.',
    siteName: 'Injustice Reform Network',
    images: [
      {
        url: 'https://theezeeohh.github.io/irn-criminal-injustice/og/criminal-injustice.jpg',
        width: 1200,
        height: 630,
        alt: 'Case of Dr. Ebony Parker — All 8 charges dismissed, June 2026 — Injustice Reform Network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@IRNetwork',
    creator: '@IRNetwork',
    title: 'All 8 Charges Dismissed: The Case of Dr. Ebony Parker',
    description: 'IRN documented this case from intake through vindication. 18 months. 8 charges. 0 convictions.',
    images: ['https://theezeeohh.github.io/irn-criminal-injustice/og/criminal-injustice.jpg'],
  },
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
