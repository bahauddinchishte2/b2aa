import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  // Base URL from your site configuration
  const baseUrl = site?.toString() || 'https://bangladesh2abroad.com';
  
  // Current date in W3C format (used for lastmod)
  const currentDate = new Date().toISOString();

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${baseUrl}/sitemap-pages.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemap-blog.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${baseUrl}/sitemap-resources.xml</loc>
        <lastmod>${currentDate}</lastmod>
      </sitemap>
    </sitemapindex>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
};