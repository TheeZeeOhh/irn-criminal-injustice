import { Metadata } from 'next';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PressContent from './PressContent';

export const metadata: Metadata = { title: 'Press Kit | IRN' };

export default function PressPage() {
  return (
    <>
      <Nav />
      <PressContent />
      <Footer />
    </>
  );
}
