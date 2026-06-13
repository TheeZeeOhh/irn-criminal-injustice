import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CampaignsContent from './CampaignsContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Campaigns | Injustice Reform Network',
  description:
    'IRN active campaigns — voting rights restoration, JFV legislative pipeline, mandatory reporting reform, and Virginia expungement clinics.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/campaigns/' },
};

export default function CampaignsPage() {
  return (
    <>
      <Nav />
      <CampaignsContent />
      <Footer />
    </>
  );
}
