import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description:
    'Mentions légales et politique de confidentialité de La Cité des Vents SA, restaurant à Onex, Genève.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Mentions Légales | La Cité des Vents',
    description: 'Informations légales et politique de confidentialité.',
    url: '/mentions-legales',
    type: 'website',
  },
  alternates: {
    canonical: '/mentions-legales',
  },
};

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
