// schema.org JSON-LD builders. Paths are resolved against the site URL.
const SITE_URL = 'https://edle-pferde.com';
const SITE_NAME = 'Trakehner Gestüt Pichl';

const absolute = (path: string) => new URL(path, SITE_URL).href;

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function newsArticleSchema(article: { headline: string; path: string; image: string; datePublished: Date; description: string }) {
  const organization = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absolute('/android-chrome-512x512.png'),
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.description,
    image: [absolute(article.image)],
    datePublished: article.datePublished.toISOString(),
    mainEntityOfPage: absolute(article.path),
    author: organization,
    publisher: organization,
  };
}
