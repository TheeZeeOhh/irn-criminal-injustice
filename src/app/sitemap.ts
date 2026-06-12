import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://injusticereformnetwork.org';
  const lastModified = new Date();

  // All active routes on the site
  const routes = [
    '',
    '/criminal-injustice',
    '/environmental',
    '/homelessness',
    '/family',
    '/about',
    '/services',
    '/campaigns',
    '/events',
    '/gallery',
    '/contact',
    '/donate',
    '/booking',
    '/newsletter',
    '/reports',
    '/know-your-rights',
    '/volunteer',
    '/press',
    '/privacy',
    '/terms',
    '/accessibility'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '' || route === '/criminal-injustice' ? 1 : 0.8,
  }));
}
