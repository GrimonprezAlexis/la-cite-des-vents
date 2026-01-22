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
    default: "La Cité des Vents | Restaurant Pizzeria Lounge Bar à Onex, Genève",
    template: "%s | La Cité des Vents",
  },
  description:
    "Restaurant - Pizzeria - Lounge Bar à Onex, Genève. Cuisines Italienne et Française, Pizza au feu de bois. Soirées musicales tous les vendredis et samedis. Ouvert 7j/7.",
  keywords: [
    "restaurant Onex",
    "pizzeria Genève",
    "lounge bar Onex",
    "cuisine italienne Genève",
    "cuisine française Onex",
    "pizza feu de bois Genève",
    "restaurant Genève",
    "brunch Onex",
    "soirée musicale Genève",
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
    title: "La Cité des Vents | Restaurant Pizzeria Lounge Bar à Onex, Genève",
    description:
      "Restaurant - Pizzeria - Lounge Bar à Onex, Genève. Cuisines Italienne et Française, Pizza au feu de bois. Soirées musicales tous les vendredis et samedis.",
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
    title: "La Cité des Vents | Restaurant Pizzeria Lounge Bar à Onex",
    description:
      "Restaurant - Pizzeria - Lounge Bar à Onex, Genève. Pizza au feu de bois, cuisines italienne et française.",
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
  image: [`${siteUrl}/hero1.png`, `${siteUrl}/hero2.png`, `${siteUrl}/hero3.png`],
  "@id": siteUrl,
  url: siteUrl,
  telephone: "+41227971070",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Chemin de l'Echo 3",
    addressLocality: "Onex",
    postalCode: "1213",
    addressCountry: "CH",
    addressRegion: "Genève",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.1825,
    longitude: 6.0965,
  },
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d3cbc2" />
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
