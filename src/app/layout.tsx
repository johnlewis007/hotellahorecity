import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ChatWidget from '@/components/common/ChatWidget';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

export const metadata: Metadata = {
  title: 'Hotel Lahore City | Comfortable Stay in Lahore',
  description: 'Hotel Lahore City - Affordable rooms with modern facilities in the heart of Lahore. Near Lakshmi Chowk and Montgomery Park.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
