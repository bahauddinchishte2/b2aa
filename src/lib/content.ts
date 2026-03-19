import { getCollection } from 'astro:content';
import {
  getScholarships,
  getScholarshipBySlug,
  getOpportunities,
  getOpportunityBySlug,
  getBlogPosts,
  getBlogPostBySlug,
  getResources,
  getResourceBySlug,
  getFeaturedImageUrl,
  type SanityScholarship,
  type SanityOpportunity,
  type SanityBlogPost,
  type SanityResource,
} from './sanity-queries';

export interface NormalizedScholarship {
  slug: string;
  source: 'sanity' | 'mdx';
  data: {
    title: string;
    lastUpdated?: string;
    openDate: string;
    deadline: string;
    fundingType: 'Full Fund' | 'Full Tuition' | 'Partial Fund';
    country: string;
    numberOfRecipients: string;
    hostInstitution: string;
    levelOfStudy: "Bachelor's" | "Master's" | "PhD";
    officialLink: string;
    category: 'government-scholarship' | 'university-scholarship';
    tags: string[];
    author: string;
  };
  sanityBody?: any[];
  render?: () => Promise<{ Content: any }>;
}

export interface NormalizedOpportunity {
  slug: string;
  source: 'sanity' | 'mdx';
  data: {
    title: string;
    lastUpdated?: string;
    openDate: string;
    deadline: string;
    fundingType: 'Full Fund' | 'Full Tuition' | 'Partial Fund';
    country: string;
    numberOfRecipients: string;
    hostInstitution: string;
    levelOfStudy: "Bachelor's" | "Master's" | "PhD";
    officialLink: string;
    category: 'internship' | 'fellowship';
    tags: string[];
    author: string;
  };
  sanityBody?: any[];
  render?: () => Promise<{ Content: any }>;
}

export interface NormalizedBlogPost {
  slug: string;
  source: 'sanity' | 'mdx';
  data: {
    title: string;
    publishDate: string;
    featuredImage?: string;
    excerpt: string;
    author: string;
    tags: string[];
    category: string;
  };
  sanityBody?: any[];
  render?: () => Promise<{ Content: any }>;
}

export interface NormalizedResource {
  slug: string;
  source: 'sanity' | 'mdx';
  data: {
    title: string;
    description: string;
    lastUpdated: string;
    area: string;
    category: 'study-guides' | 'application-tips' | 'country-guides' | 'test-prep';
    tags: string[];
    author: string;
  };
  sanityBody?: any[];
  render?: () => Promise<{ Content: any }>;
}

function normalizeSanityScholarship(s: SanityScholarship): NormalizedScholarship {
  return {
    slug: typeof s.slug === 'string' ? s.slug : s.slug?.current || '',
    source: 'sanity',
    data: {
      title: s.title,
      lastUpdated: s.lastUpdated,
      openDate: s.openDate,
      deadline: s.deadline,
      fundingType: s.fundingType,
      country: s.country,
      numberOfRecipients: s.numberOfRecipients,
      hostInstitution: s.hostInstitution,
      levelOfStudy: s.levelOfStudy,
      officialLink: s.officialLink,
      category: s.category,
      tags: s.tags || [],
      author: s.author,
    },
    sanityBody: s.body,
  };
}

function normalizeSanityOpportunity(o: SanityOpportunity): NormalizedOpportunity {
  return {
    slug: typeof o.slug === 'string' ? o.slug : o.slug?.current || '',
    source: 'sanity',
    data: {
      title: o.title,
      lastUpdated: o.lastUpdated,
      openDate: o.openDate,
      deadline: o.deadline,
      fundingType: o.fundingType,
      country: o.country,
      numberOfRecipients: o.numberOfRecipients,
      hostInstitution: o.hostInstitution,
      levelOfStudy: o.levelOfStudy,
      officialLink: o.officialLink,
      category: o.category,
      tags: o.tags || [],
      author: o.author,
    },
    sanityBody: o.body,
  };
}

function normalizeSanityBlogPost(p: SanityBlogPost): NormalizedBlogPost {
  return {
    slug: typeof p.slug === 'string' ? p.slug : p.slug?.current || '',
    source: 'sanity',
    data: {
      title: p.title,
      publishDate: p.publishDate,
      featuredImage: getFeaturedImageUrl(p),
      excerpt: p.excerpt,
      author: p.author,
      tags: p.tags || [],
      category: p.category,
    },
    sanityBody: p.body,
  };
}

function normalizeSanityResource(r: SanityResource): NormalizedResource {
  return {
    slug: typeof r.slug === 'string' ? r.slug : r.slug?.current || '',
    source: 'sanity',
    data: {
      title: r.title,
      description: r.description,
      lastUpdated: r.lastUpdated,
      area: r.area,
      category: r.category,
      tags: r.tags || [],
      author: r.author,
    },
    sanityBody: r.body,
  };
}

export async function getAllScholarships(): Promise<NormalizedScholarship[]> {
  const [sanityItems, mdxItems] = await Promise.all([
    getScholarships(),
    getCollection('scholarships'),
  ]);

  const sanityNormalized = sanityItems.map(normalizeSanityScholarship);
  const sanitySlugs = new Set(sanityNormalized.map(s => s.slug));

  const mdxNormalized: NormalizedScholarship[] = mdxItems
    .filter(m => !sanitySlugs.has(m.slug))
    .map(m => ({
      slug: m.slug,
      source: 'mdx' as const,
      data: m.data as NormalizedScholarship['data'],
      render: () => m.render(),
    }));

  return [...sanityNormalized, ...mdxNormalized];
}

export async function getScholarshipContent(slug: string): Promise<NormalizedScholarship | null> {
  const sanityItem = await getScholarshipBySlug(slug);
  if (sanityItem) return normalizeSanityScholarship(sanityItem);

  const mdxItems = await getCollection('scholarships');
  const mdxItem = mdxItems.find(m => m.slug === slug);
  if (mdxItem) {
    return {
      slug: mdxItem.slug,
      source: 'mdx',
      data: mdxItem.data as NormalizedScholarship['data'],
      render: () => mdxItem.render(),
    };
  }
  return null;
}

export async function getAllOpportunities(): Promise<NormalizedOpportunity[]> {
  const [sanityItems, mdxItems] = await Promise.all([
    getOpportunities(),
    getCollection('opportunities'),
  ]);

  const sanityNormalized = sanityItems.map(normalizeSanityOpportunity);
  const sanitySlugs = new Set(sanityNormalized.map(s => s.slug));

  const mdxNormalized: NormalizedOpportunity[] = mdxItems
    .filter(m => !sanitySlugs.has(m.slug))
    .map(m => ({
      slug: m.slug,
      source: 'mdx' as const,
      data: m.data as NormalizedOpportunity['data'],
      render: () => m.render(),
    }));

  return [...sanityNormalized, ...mdxNormalized];
}

export async function getOpportunityContent(slug: string): Promise<NormalizedOpportunity | null> {
  const sanityItem = await getOpportunityBySlug(slug);
  if (sanityItem) return normalizeSanityOpportunity(sanityItem);

  const mdxItems = await getCollection('opportunities');
  const mdxItem = mdxItems.find(m => m.slug === slug);
  if (mdxItem) {
    return {
      slug: mdxItem.slug,
      source: 'mdx',
      data: mdxItem.data as NormalizedOpportunity['data'],
      render: () => mdxItem.render(),
    };
  }
  return null;
}

export async function getAllBlogPosts(): Promise<NormalizedBlogPost[]> {
  const [sanityItems, mdxItems] = await Promise.all([
    getBlogPosts(),
    getCollection('blog'),
  ]);

  const sanityNormalized = sanityItems.map(normalizeSanityBlogPost);
  const sanitySlugs = new Set(sanityNormalized.map(s => s.slug));

  const mdxNormalized: NormalizedBlogPost[] = mdxItems
    .filter(m => !sanitySlugs.has(m.slug))
    .map(m => ({
      slug: m.slug,
      source: 'mdx' as const,
      data: {
        ...m.data,
        featuredImage: m.data.featuredImage || undefined,
      } as NormalizedBlogPost['data'],
      render: () => m.render(),
    }));

  return [...sanityNormalized, ...mdxNormalized];
}

export async function getBlogPostContent(slug: string): Promise<NormalizedBlogPost | null> {
  const sanityItem = await getBlogPostBySlug(slug);
  if (sanityItem) return normalizeSanityBlogPost(sanityItem);

  const mdxItems = await getCollection('blog');
  const mdxItem = mdxItems.find(m => m.slug === slug);
  if (mdxItem) {
    return {
      slug: mdxItem.slug,
      source: 'mdx',
      data: {
        ...mdxItem.data,
        featuredImage: mdxItem.data.featuredImage || undefined,
      } as NormalizedBlogPost['data'],
      render: () => mdxItem.render(),
    };
  }
  return null;
}

export async function getAllResources(): Promise<NormalizedResource[]> {
  const [sanityItems, mdxItems] = await Promise.all([
    getResources(),
    getCollection('resources'),
  ]);

  const sanityNormalized = sanityItems.map(normalizeSanityResource);
  const sanitySlugs = new Set(sanityNormalized.map(s => s.slug));

  const mdxNormalized: NormalizedResource[] = mdxItems
    .filter(m => !sanitySlugs.has(m.slug))
    .map(m => ({
      slug: m.slug,
      source: 'mdx' as const,
      data: m.data as NormalizedResource['data'],
      render: () => m.render(),
    }));

  return [...sanityNormalized, ...mdxNormalized];
}

export async function getResourceContent(slug: string): Promise<NormalizedResource | null> {
  const sanityItem = await getResourceBySlug(slug);
  if (sanityItem) return normalizeSanityResource(sanityItem);

  const mdxItems = await getCollection('resources');
  const mdxItem = mdxItems.find(m => m.slug === slug);
  if (mdxItem) {
    return {
      slug: mdxItem.slug,
      source: 'mdx',
      data: mdxItem.data as NormalizedResource['data'],
      render: () => mdxItem.render(),
    };
  }
  return null;
}
