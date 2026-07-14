import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ruixen AI — Build Something Amazing',
  description: 'Build something amazing — just start typing below. Ruixen AI helps you generate code, launch apps, and create UI components.',
  keywords: ['AI', 'chat', 'code generation', 'UI components', 'Ruixen'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
