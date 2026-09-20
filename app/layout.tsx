import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GeoPersona Analytics | Empirical Telemetry & Workforce Demographics',
  description:
    'Real-time IP-conditioned macroeconomic workforce simulation and residential benchmarks for Nigeria, United States, United Kingdom, and Australia.',
  keywords: [
    'Demographic Telemetry',
    'IP Intelligence',
    'Workforce Synthesis',
    'Nigeria Real Estate',
    'US Market Real Estate',
    'UK Property Benchmarks',
    'Australia Demographics',
  ],
  authors: [{ name: 'Black Technologies Nigeria Multi-Solutions Ltd' }],
  openGraph: {
    title: 'GeoPersona Analytics',
    description: 'Empirical Locality & Regional Workforce Modeling Engine',
    type: 'website',
    locale: 'en_US',
    siteName: 'GeoPersona',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org WebApplication markup for search engine discovery */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'GeoPersona Analytics',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'All',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}