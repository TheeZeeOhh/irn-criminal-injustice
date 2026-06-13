import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'About IRN | Injustice Reform Network',
  description: 'Rooted in Hampton Roads. IRN is an abolition-informed systems-accountability organization serving LGBTQ+ communities, Black trans people, and formerly incarcerated individuals across VA, MD, NC, and DC.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/about/' },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <AboutContent />
      <Footer />
    </>
  );
}
