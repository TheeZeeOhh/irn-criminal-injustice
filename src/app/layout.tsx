import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Criminal Injustice | Injustice Reform Network',
  description: 'Documenting and fighting systemic injustice in Hampton Roads.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={\`\${inter.variable} \${playfair.variable}\`} suppressHydrationWarning>
      <body className="font-sans bg-navy text-cream antialiased pb-24">
        {children}
      </body>
    </html>
  );
}
