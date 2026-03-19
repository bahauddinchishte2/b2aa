import type { APIRoute } from 'astro';
import { getAllBlogPosts, getAllScholarships, getAllOpportunities } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site?.toString() || 'https://bangladesh2abroad.com').replace(/\/$/, '');

  const [blogPosts, scholarships, opportunities] = await Promise.all([
    getAllBlogPosts(),
    getAllScholarships(),
    getAllOpportunities(),
  ]);

  type FeedItem = { title: string; link: string; description: string; pubDate: string; category: string; author: string };
  const allItems: FeedItem[] = [];

  blogPosts.forEach(post => {
    allItems.push({
      title: post.data.title,
      link: `${baseUrl}/blog/${post.slug}`,
      description: post.data.excerpt || post.data.title,
      pubDate: new Date(post.data.publishDate).toUTCString(),
      category: 'Blog',
      author: post.data.author || 'Bangladesh to Abroad',
    });
  });

  scholarships.forEach(item => {
    allItems.push({
      title: item.data.title,
      link: `${baseUrl}/scholarships/${item.slug}`,
      description: `${item.data.title} - ${item.data.fundingType} scholarship in ${item.data.country} for ${item.data.levelOfStudy} students. Deadline: ${new Date(item.data.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      pubDate: new Date(item.data.openDate).toUTCString(),
      category: 'Scholarship',
      author: item.data.author || 'Bangladesh to Abroad',
    });
  });

  opportunities.forEach(item => {
    allItems.push({
      title: item.data.title,
      link: `${baseUrl}/opportunities/${item.slug}`,
      description: `${item.data.title} - ${item.data.category} opportunity in ${item.data.country} for ${item.data.levelOfStudy} students. Deadline: ${new Date(item.data.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      pubDate: new Date(item.data.openDate).toUTCString(),
      category: item.data.category === 'internship' ? 'Internship' : 'Fellowship',
      author: item.data.author || 'Bangladesh to Abroad',
    });
  });

  allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  const recentItems = allItems.slice(0, 50);

  const rssItems = recentItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
      <author>${item.author}</author>
    </item>`).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Bangladesh to Abroad - Scholarships, Opportunities &amp; Study Abroad</title>
    <link>${baseUrl}</link>
    <description>Latest scholarships, fellowships, internships and educational resources for Bangladeshi students looking to study and work abroad.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/images/og-image.jpeg</url>
      <title>Bangladesh to Abroad</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
};
