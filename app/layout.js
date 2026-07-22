import './globals.css'
import { Space_Grotesk, Source_Sans_3 } from 'next/font/google'
import Navbar from '../components/Navbar'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata = {
  title: 'Book Discovery',
  description: 'Discover and save books with the Open Library API.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${sourceSans.variable}`}>
      <body className="font-body bg-background text-primary">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  )
}