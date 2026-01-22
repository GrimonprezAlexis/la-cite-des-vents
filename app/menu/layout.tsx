import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notre Menu',
  description:
    'Découvrez notre carte : pizzas au feu de bois, plats italiens et français, desserts maison. Restaurant La Cité des Vents à Onex, Genève.',
  keywords: [
    'menu restaurant Onex',
    'carte pizzeria Genève',
    'pizza feu de bois',
    'plats italiens Genève',
    'plats français Onex',
  ],
  openGraph: {
    title: 'Notre Menu | La Cité des Vents',
    description:
      'Découvrez notre carte : pizzas au feu de bois, plats italiens et français, desserts maison.',
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
