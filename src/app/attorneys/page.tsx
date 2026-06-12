import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AttorneysContent from './AttorneysContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Attorney Referral Network | Injustice Reform Network',
  description: 'Civil rights attorneys in Virginia, Maryland, North Carolina, and DC who work with IRN. Free consultations and sliding-scale fees available.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/attorneys/' },
};

export default function AttorneysPage() {
  return (
    <>
      <Nav />
      <AttorneysContent />
      <Footer />
    </>
  );
}
