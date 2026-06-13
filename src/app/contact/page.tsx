import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Contact | Injustice Reform Network',
  description: 'Reach IRN for general inquiries, media requests, or crisis support. For civil rights incidents, use our encrypted CHRT tool.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <ContactContent />
      <Footer />
    </>
  );
}
