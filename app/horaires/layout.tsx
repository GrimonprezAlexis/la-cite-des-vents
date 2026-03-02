import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Horaires d\'ouverture | Restaurant au Lignon, Vernier',
  description:
    'Horaires d\'ouverture de La Cité des Vents, restaurant pizzeria au Lignon (Vernier), Genève. Ouvert 7j/7 de 07h30 à minuit. Déjeuner, dîner, brunch et soirées musicales.',
  keywords: [
    'horaires restaurant Le Lignon',
    'horaires restaurant Vernier',
    'heures ouverture pizzeria Genève',
    'restaurant ouvert dimanche Genève',
    'restaurant ouvert dimanche Vernier',
    'brunch Le Lignon horaires',
    'brunch Vernier',
    'restaurant ouvert midi Le Lignon',
  ],
  openGraph: {
    title: 'Horaires d\'ouverture | La Cité des Vents - Le Lignon',
    description:
      'Ouvert 7j/7 de 07h30 à minuit. Déjeuner, dîner et brunch au Lignon (Vernier), Genève.',
    url: '/horaires',
    type: 'website',
  },
  alternates: {
    canonical: '/horaires',
  },
};

export default function HorairesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
