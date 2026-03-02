import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { AnnouncementBanner } from "@/components/announcement-banner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lacitedesvents.ch";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Cité des Vents | Restaurant Pizzeria Lounge Bar au Lignon, Genève",
    template: "%s | La Cité des Vents",
  },
  description:
    "Restaurant Pizzeria Lounge Bar au Lignon (Vernier), Genève. Cuisines italienne et française, pizza au feu de bois, soirées musicales vendredi et samedi. Ouvert 7j/7 de 07h30 à minuit. Réservation au 022 797 10 70.",
  keywords: [
    "restaurant Le Lignon",
    "restaurant Vernier",
    "pizzeria Genève",
    "pizzeria Le Lignon",
    "lounge bar Le Lignon",
    "cuisine italienne Genève",
    "cuisine française Le Lignon",
    "pizza feu de bois Genève",
    "restaurant Genève",
    "brunch Le Lignon",
    "brunch Vernier",
    "soirée musicale Genève",
    "restaurant Châtelaine",
    "restaurant Aïre",
    "restaurant Meyrin",
    "La Cité des Vents",
  ],
  authors: [{ name: "La Cité des Vents" }],
  creator: "La Cité des Vents",
  publisher: "La Cité des Vents",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: siteUrl,
    siteName: "La Cité des Vents",
    title: "La Cité des Vents | Restaurant Pizzeria Lounge Bar au Lignon, Vernier - Genève",
    description:
      "Restaurant Pizzeria Lounge Bar au Lignon (Vernier), Genève. Cuisines italienne et française, pizza au feu de bois. Soirées musicales vendredi et samedi. Ouvert 7j/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "La Cité des Vents - Restaurant Pizzeria Lounge Bar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Cité des Vents | Restaurant Pizzeria Lounge Bar au Lignon, Vernier - Genève",
    description:
      "Restaurant Pizzeria Lounge Bar au Lignon (Vernier), Genève. Pizza au feu de bois, cuisines italienne et française. Ouvert 7j/7.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "restaurant",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "La Cité des Vents",
  image: [`${siteUrl}/citedesvents-exterieur.jpg`, `${siteUrl}/citedesvents-interieur2.jpg`, `${siteUrl}/citedesvents-interieur3.png`],
  "@id": siteUrl,
  url: siteUrl,
  telephone: "+41227971070",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3, rue de la Coupe Gordon-Bennett",
    addressLocality: "Le Lignon",
    postalCode: "1219",
    addressCountry: "CH",
    addressRegion: "Genève",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.2035,
    longitude: 6.1000,
  },
  areaServed: [
    { "@type": "City", name: "Vernier" },
    { "@type": "City", name: "Genève" },
    { "@type": "Place", name: "Le Lignon" },
    { "@type": "Place", name: "Aïre" },
    { "@type": "Place", name: "Châtelaine" },
    { "@type": "Place", name: "Meyrin" },
  ],
  description: "Restaurant Pizzeria Lounge Bar au Lignon (Vernier), Genève. Cuisines italienne et française, pizza au feu de bois, soirées musicales. Ouvert 7j/7.",
  currenciesAccepted: "CHF",
  paymentAccepted: "Cash, Credit Card, Debit Card, TWINT",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:30",
      closes: "00:00",
    },
  ],
  servesCuisine: ["Italian", "French", "Pizza"],
  acceptsReservations: "True",
  menu: `${siteUrl}/menu`,
  hasMenu: {
    "@type": "Menu",
    url: `${siteUrl}/menu`,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "150",
  },
  sameAs: ["https://www.facebook.com/p/La-Cit%C3%A9-Fleurie-100063631886817/"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d3cbc2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cité des Vents" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <AnnouncementBanner />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
