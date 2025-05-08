import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  // Base URL from your site configuration
  const baseUrl = site?.toString() || 'https://bangladesh2abroad.com';
  
  // Get all resources
  const resources = await getCollection('resources');
  
  // Generate sitemap entries for resources
  const entries = resources.map(resource => {
    // Get lastmod from lastUpdated
    const lastmod = new Date(resource.data.lastUpdated).toISOString();
    
    // Set priority based on resource category
    let priority = '0.7';
    if (resource.data.category === 'country-guides') {
      priority = '0.8';
    } else if (resource.data.category === 'test-prep') {
      priority = '0.75';
    }
    
    return `
      <url>
        <loc>${baseUrl}/resources/${resource.slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
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