import type { APIRoute } from 'astro';
import { getAllScholarships } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() || 'https://bangladesh2abroad.com').replace(/\/$/, '');
  const scholarships = await getAllScholarships();

  const entries = scholarships.map(item => {
    const lastmod = item.data.openDate
      ? new Date(item.data.openDate).toISOString()
      : new Date().toISOString();

    const isOpen = new Date(item.data.deadline) >= new Date();
    const priority = isOpen ? '0.9' : '0.6';
    const changefreq = isOpen ? 'daily' : 'monthly';

    return `
      <url>
        <loc>${baseUrl}/scholarships/${item.slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `;
  }).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${entries}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
};
