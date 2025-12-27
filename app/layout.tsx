import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
   manifest: "/manifest.json",
   title: "Kiss Manager — Agence Social Media Premium",
    description:
      "Kiss Manager est une agence premium spécialisée en stratégie, création de contenu et gestion des réseaux sociaux. Nous transformons votre visibilité en résultats mesurables.",
    keywords: [
      "agence social media",
      "community management",
      "stratégie digitale",
      "gestion réseaux sociaux",
      "marketing digital Afrique",
      "agence social media Abidjan"
    ],
    authors: [{ name: "Kiss Manager" }],
    openGraph: {
      title: "Kiss Manager — Agence Social Media Premium",
      description:
        "Stratégie, création et performance sur les réseaux sociaux.",
      url: "https://kissmanager.vercel.app",
      siteName: "Kiss Manager",
      images: [
        {
          url: "/seo/og-image.png",
          width: 1200,
          height: 630,
          alt: "Kiss Manager — Agence Social Media"
        }
      ],
      locale: "fr_FR",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Kiss Manager — Agence Social Media Premium",
      description:
        "Stratégie, création et performance sur les réseaux sociaux.",
      images: ["/seo/og-image.png"]
    }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}