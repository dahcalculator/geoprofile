export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GeoPersona Analytics',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    description: 'Enterprise demographic workforce modeling, ISP infrastructure metrics, and data integrity verification.',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Black Technologies Nigeria Multi-Solutions Ltd',
      url: 'https://geopersona.example.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abuja',
        addressRegion: 'Federal Capital Territory',
        addressCountry: 'NG',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}