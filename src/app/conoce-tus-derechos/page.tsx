import type { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import KYRSpanishContent from './KYRSpanishContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://injusticereformnetwork.org'),
  title: 'Conoce Tus Derechos | Injustice Reform Network',
  description: 'Tus derechos durante encuentros con la policía, desalojos, disciplina escolar y más — Virginia, Maryland, Carolina del Norte y DC.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://injusticereformnetwork.org/conoce-tus-derechos/' },
};

export default function KYRSpanishPage() {
  return (
    <>
      <Nav />
      <KYRSpanishContent />
      <Footer />
    </>
  );
}
