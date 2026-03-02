import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Réservation | Restaurant au Lignon, Vernier - Genève',
  description:
    'Réservez votre table à La Cité des Vents, restaurant pizzeria au Lignon (Vernier), Genève. Téléphone : 022 797 10 70. 3, rue de la Coupe Gordon-Bennett, 1219 Le Lignon. Ouvert 7j/7.',
  keywords: [
    'réservation restaurant Le Lignon',
    'réservation restaurant Vernier',
    'contact pizzeria Genève',
    'téléphone La Cité des Vents',
    'adresse restaurant Le Lignon',
    'réservation restaurant Genève',
    'restaurant Le Lignon réservation',
  ],
  openGraph: {
    title: 'Contact & Réservation | La Cité des Vents - Le Lignon',
    description:
      'Réservez votre table au Lignon (Vernier). Téléphone : 022 797 10 70. Ouvert 7j/7.',
    url: '/contact',
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
