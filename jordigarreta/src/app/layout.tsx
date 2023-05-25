import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from "./components/Navigation/Navigation"
import { Footer } from "./components/Footer/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jordi Garreta | Creative Developer',
  description: 'Jordi Garreta portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true} >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}