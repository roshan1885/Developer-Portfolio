import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { WithThemeProvider } from './with-theme';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Roshan B. | Backend Developer & Creative Technologist',
  description: 'Portfolio of Roshan B., a backend-first full-stack developer specializing in scalable systems, AI automation, and creative technology.',
  keywords: ['developer', 'backend', 'full-stack', 'portfolio', 'web development', 'AI', 'machine learning'],
  authors: [{ name: 'Roshan B.' }],
  creator: 'Roshan B.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://roshan.is-a.dev',
    siteName: 'Roshan B. Portfolio',
    title: 'Roshan B. | Backend Developer & Creative Technologist',
    description: 'Portfolio of Roshan B., a backend-first full-stack developer specializing in scalable systems, AI automation, and creative technology.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roshan B. | Backend Developer & Creative Technologist',
    description: 'Portfolio of Roshan B., a backend-first full-stack developer.',
    creator: '@roshan_b08',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} ${spaceGrotesk.variable} font-body antialiased`}>
        <WithThemeProvider>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
        {children}
        </WithThemeProvider>
      </body>
    </html>
  );
}

