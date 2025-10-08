import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'La Cité Fleurie - Restaurant Pizzeria Lounge Bar à Onex',
  description: 'Restaurant - Pizzeria - Lounge Bar à Onex, Genève. Cuisines Italienne et Française, Pizza au feu de bois. Soirées musicales tous les vendredis et samedis.',
  keywords: 'restaurant, pizzeria, lounge bar, Onex, Genève, cuisine italienne, cuisine française, pizza feu de bois',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
