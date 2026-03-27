import type { APIRoute } from 'astro';
import { getAllBlogPosts, getAllScholarships, getAllOpportunities } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() || 'https://bangladesh2abroad.com').replace(/\/$/, '');

  const [blogPosts, scholarships, opportunities] = await Promise.all([
    getAllBlogPosts(),
    getAllScholarships(),
    getAllOpportunities(),
  ]);

  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const newsEntries: string[] = [];

  blogPosts.forEach(post => {
    const pubDate = new Date(post.data.publishDate);
    if (pubDate >= twoDaysAgo) {
      newsEntries.push(`
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <news:news>
          <news:publication>
            <news:name>Bangladesh to Abroad</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${pubDate.toISOString()}</news:publication_date>
          <news:title>${escapeXml(post.data.title)}</news:title>
        </news:news>
      </url>`);
    }
  });

  scholarships.forEach(item => {
    const pubDate = new Date(item.data.openDate);
    if (pubDate >= twoDaysAgo) {
      newsEntries.push(`
      <url>
        <loc>${baseUrl}/scholarships/${item.slug}</loc>
        <news:news>
          <news:publication>
            <news:name>Bangladesh to Abroad</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${pubDate.toISOString()}</news:publication_date>
          <news:title>${escapeXml(item.data.title)}</news:title>
        </news:news>
      </url>`);
    }
  });

  opportunities.forEach(item => {
    const pubDate = new Date(item.data.openDate);
    if (pubDate >= twoDaysAgo) {
      newsEntries.push(`
      <url>
        <loc>${baseUrl}/opportunities/${item.slug}</loc>
        <news:news>
          <news:publication>
            <news:name>Bangladesh to Abroad</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${pubDate.toISOString()}</news:publication_date>
          <news:title>${escapeXml(item.data.title)}</news:title>
        </news:news>
      </url>`);
    }
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsEntries.join('')}
</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
