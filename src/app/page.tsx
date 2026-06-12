import { Metadata } from 'next';
import SplashContent from './SplashContent';

export const metadata: Metadata = {
  title: 'Injustice Reform Network | Welcome',
};

export default function SplashPage() {
  return <SplashContent />;
}
