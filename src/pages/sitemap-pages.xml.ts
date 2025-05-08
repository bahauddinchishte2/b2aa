import type { APIRoute } from 'astro';

// Add all your static pages here
const staticPages = [
  '',
  'about',
  'blog',
  'resources',
  'resources/country-guides',
  'resources/test-prep',
  'resources/application-tips',
  'resources/study-guides',
  'scholarships/current',
  'scholarships/government',
  'scholarships/university',
  'scholarships/all',
  'opportunities/internships',
  'opportunities/fellowships',
  'opportunities/all',
  'opportunities/current'
];

export const GET: APIRoute = async ({ site }) => {
  // Base URL from your site configuration
  const baseUrl = site?.toString() || 'https://bangladesh2abroad.com';
  
  // Current date in W3C format (used for lastmod)
  const currentDate = new Date().toISOString();

  // Generate sitemap entries for each page
  const pages = staticPages.map(page => `
    <url>
      <loc>${baseUrl}/${page}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : page.includes('current') ? '0.9' : '0.8'}</priority>
    </url>
  `).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
};