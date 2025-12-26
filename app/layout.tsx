import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kiss Manager - Expertise en Réseaux Sociaux',
  description: 'Agence d\'expertise en réseaux sociaux spécialisée en community management, stratégie réseaux sociaux, consulting et formation.',
  keywords: 'community management, stratégie réseaux sociaux, consulting, formation, agence marketing, réseaux sociaux',
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