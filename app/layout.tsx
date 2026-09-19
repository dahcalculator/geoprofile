import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import ConsentBanner from '@/components/ConsentBanner';
import StructuredData from '@/components/StructuredData';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#020617',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://geopersona.example.com'),
  title: {
    default: 'GeoPersona Analytics | Regional Demographic & ISP Telemetry Profiling',
    template: '%s | GeoPersona Analytics',
  },
  description: 'Enterprise macroeconomic demographic modeling, regional workforce sector analysis, ISP telecom market telemetry, and verifiable steganographic watermarking.',
  keywords: ['Demographic Profiling', 'Workforce Analytics', 'ISP Telemetry', 'Synthetic Persona Validation'],
  authors: [{ name: 'Black Technologies Nigeria Multi-Solutions Ltd' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
        <StructuredData />
        <div className="flex-1">
          {children}
        </div>
        <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 GeoPersona Analytics • Black Technologies Nigeria Multi-Solutions Ltd</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-slate-200 transition">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-200 transition">Terms</Link>
              <Link href="/cookies" className="hover:text-slate-200 transition">Cookies</Link>
              <Link href="/refund" className="hover:text-slate-200 transition">Refunds</Link>
            </div>
          </div>
        </footer>
        <ConsentBanner />
      </body>
    </html>
  );
}