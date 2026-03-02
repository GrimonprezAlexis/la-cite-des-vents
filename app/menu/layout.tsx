import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu | Pizzas feu de bois & cuisine italienne et française au Lignon',
  description:
    'Carte du restaurant La Cité des Vents au Lignon (Vernier), Genève : pizzas au feu de bois, plats italiens et français, desserts maison. Plats à emporter disponibles.',
  keywords: [
    'menu restaurant Le Lignon',
    'menu restaurant Vernier',
    'carte pizzeria Genève',
    'pizza feu de bois Genève',
    'pizza feu de bois Le Lignon',
    'plats italiens Genève',
    'plats français Le Lignon',
    'restaurant italien Vernier',
    'plats à emporter Le Lignon',
  ],
  openGraph: {
    title: 'Notre Menu | La Cité des Vents - Le Lignon',
    description:
      'Pizzas au feu de bois, plats italiens et français, desserts maison. Restaurant au Lignon (Vernier), Genève.',
    url: '/menu',
    type: 'website',
  },
  alternates: {
    canonical: '/menu',
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
