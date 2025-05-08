import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  // Base URL from your site configuration
  const baseUrl = site?.toString() || 'https://bangladesh2abroad.com';
  
  // Get all blog posts
  const blogPosts = await getCollection('blog');
  
  // Generate sitemap entries for blog posts
  const entries = blogPosts.map(post => {
    // Safely get dates - using publishDate which is available in blog posts
    const publishDate = post.data.publishDate;
    
    // Ensure we have a valid date
    const lastmod = publishDate ? new Date(publishDate).toISOString() : new Date().toISOString();
    
    // Default priority
    let priority = '0.7';
    
    return `
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
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