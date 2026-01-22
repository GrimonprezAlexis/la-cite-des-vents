import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Horaires d\'ouverture',
  description:
    'Horaires d\'ouverture de La Cité des Vents : ouvert 7j/7 de 07h30 à minuit. Restaurant Pizzeria Lounge Bar à Onex, Genève.',
  keywords: [
    'horaires restaurant Onex',
    'heures ouverture pizzeria Genève',
    'restaurant ouvert dimanche Genève',
    'brunch Onex horaires',
  ],
  openGraph: {
    title: 'Horaires d\'ouverture | La Cité des Vents',
    description:
      'Ouvert 7j/7 de 07h30 à minuit. Déjeuner, dîner et brunch à Onex.',
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
