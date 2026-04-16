import articlesData from '@/data/articles.json';

export default function sitemap() {
  const baseUrl = 'https://mset-biospectra.org';

  const staticRoutes = [
    '',
    '/about',
    '/archive',
    '/contact',
    '/editorial',
    '/guidelines',
    '/issue',
    '/submit',
    '/gallery'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const articleRoutes = articlesData.map((article) => ({
    url: `${baseUrl}/article/${article.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
