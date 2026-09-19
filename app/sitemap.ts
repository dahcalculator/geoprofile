import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geopersona.example.com';
  const currentDate = new Date().toISOString();

  return [
    { url: siteUrl, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/privacy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${siteUrl}/cookies`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${siteUrl}/refund`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.2 },
  ];
}