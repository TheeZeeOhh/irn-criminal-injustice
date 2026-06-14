import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Chatbot from './components/Chatbot';
import Navigation from './components/Navigation';

const playfair = localFont({
  src: [
    { path: './fonts/PlayfairDisplay-Variable.woff2', weight: '400 900', style: 'normal' },
    { path: './fonts/PlayfairDisplay-Italic-Variable.woff2', weight: '400 900', style: 'italic' },
  ],
  variable: '--font-playfair',
});

const dmMono = localFont({
  src: [
    { path: './fonts/DMMono-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/DMMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/DMMono-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-dm-mono',
});

export const metadata: Metadata = {
  title: 'Injustice Reform Network',
  description: 'Building accountability infrastructure for Hampton Roads communities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable}`}>
      <head>
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navigation />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
