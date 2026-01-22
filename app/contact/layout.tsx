import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Réservation',
  description:
    'Contactez La Cité des Vents pour une réservation ou une demande. Téléphone : 022 797 10 70. Adresse : Chemin de l\'Echo 3, 1213 Onex, Genève.',
  keywords: [
    'réservation restaurant Onex',
    'contact pizzeria Genève',
    'téléphone La Cité des Vents',
    'adresse restaurant Onex',
  ],
  openGraph: {
    title: 'Contact & Réservation | La Cité des Vents',
    description:
      'Réservez votre table ou contactez-nous. Téléphone : 022 797 10 70.',
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
