import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import EventsContent from './EventsContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Events | Injustice Reform Network',
  description:
    'Free Expungement & Record Sealing Clinic — July 1 & July 15, 2026. Pearl Bailey Library, Newport News. Same-day filing. Everything free.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/events/' },
  openGraph: {
    type: 'website',
    url: 'https://injusticereformnetwork.org/events/',
    title: 'Events | Injustice Reform Network',
    description: 'Free Expungement & Record Sealing Clinic — July 1 & 15, 2026. Pearl Bailey Library → Circuit Clerk. Same-day filing. No cost.',
    images: [{ url: '/expungement-clinic-flyer.jpg', width: 1080, height: 1080 }],
    siteName: 'Injustice Reform Network',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Expungement Clinic | IRN',
    description: 'July 1 & July 15, 2026 — Pearl Bailey Library. Same-day filing. Everything free.',
    images: ['/expungement-clinic-flyer.jpg'],
  },
};

export default function EventsPage() {
  return (
    <>
      <Nav />
      <EventsContent />
      <Footer />
    </>
  );
}
