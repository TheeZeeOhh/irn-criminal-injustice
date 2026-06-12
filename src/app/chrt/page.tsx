import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ChrtForm from './ChrtForm';

const OG_DESCRIPTION =
  "CHRT is IRN's encrypted, zero-knowledge incident reporting tool. AES-256-GCM client-side encryption. No name required. IRN cannot be compelled to identify you.";

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'CHRT — Community Harm Reporting Tool | Injustice Reform Network',
  description: OG_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/chrt/' },
  openGraph: {
    type: 'website',
    url: 'https://injusticereformnetwork.org/chrt/',
    title: 'CHRT — Community Harm Reporting Tool | IRN',
    description: OG_DESCRIPTION,
    images: [{ url: '/og/chrt.jpg', width: 1200, height: 630 }],
    siteName: 'Injustice Reform Network',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHRT — Community Harm Reporting Tool | IRN',
    description: OG_DESCRIPTION,
    images: ['/og/chrt.jpg'],
  },
};

export default function ChrtPage() {
  return (
    <>
      <Nav />
      <ChrtForm />
      <Footer />
    </>
  );
}
