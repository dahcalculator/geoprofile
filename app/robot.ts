import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://geopersona.example.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/covert-audit', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/llms.txt', '/'],
        disallow: ['/covert-audit', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}