import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/index.css'
import '@/styles/theme.css'
import { ThemeProvider } from '@/context/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { DirectionProvider } from '@/context/direction-provider'
import { FontProvider } from '@/context/font-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Shadcn Admin - Next.js',
  description: 'Admin dashboard built with Next.js and Shadcn UI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme='system'
          storageKey='shadcn-admin-theme'
        >
          <FontProvider>
            <DirectionProvider>
              {children}
              <Toaster duration={5000} />
            </DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
