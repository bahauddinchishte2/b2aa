import { sanityClient, sanityImageUrl } from './sanity';

export interface SanityScholarship {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
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
  body?: any[];
  featuredImage?: { asset: { _ref: string } };
}

export interface SanityOpportunity {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
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
  body?: any[];
  featuredImage?: { asset: { _ref: string } };
}

export interface SanityBlogPost {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  publishDate: string;
  featuredImage?: { asset: { _ref: string } };
  excerpt: string;
  author: string;
  tags: string[];
  category: string;
  body?: any[];
}

export interface SanityResource {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  description: string;
  lastUpdated: string;
  area: string;
  category: 'study-guides' | 'application-tips' | 'country-guides' | 'test-prep';
  tags: string[];
  author: string;
  body?: any[];
}

const scholarshipFields = `
  _id,
  _type,
  title,
  "slug": slug.current,
  lastUpdated,
  openDate,
  deadline,
  fundingType,
  country,
  numberOfRecipients,
  hostInstitution,
  levelOfStudy,
  officialLink,
  category,
  tags,
  author,
  body,
  featuredImage
`;

const opportunityFields = scholarshipFields;

const blogFields = `
  _id,
  _type,
  title,
  "slug": slug.current,
  publishDate,
  featuredImage,
  excerpt,
  author,
  tags,
  category,
  body
`;

const resourceFields = `
  _id,
  _type,
  title,
  "slug": slug.current,
  description,
  lastUpdated,
  area,
  category,
  tags,
  author,
  body
`;

export async function getScholarships(): Promise<SanityScholarship[]> {
  try {
    const results = await sanityClient.fetch(
      `*[_type == "scholarship"] | order(deadline desc) { ${scholarshipFields} }`
    );
    return results || [];
  } catch {
    return [];
  }
}

export async function getScholarshipBySlug(slug: string): Promise<SanityScholarship | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "scholarship" && slug.current == $slug][0] { ${scholarshipFields} }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getOpportunities(): Promise<SanityOpportunity[]> {
  try {
    const results = await sanityClient.fetch(
      `*[_type == "opportunity"] | order(deadline desc) { ${opportunityFields} }`
    );
    return results || [];
  } catch {
    return [];
  }
}

export async function getOpportunityBySlug(slug: string): Promise<SanityOpportunity | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "opportunity" && slug.current == $slug][0] { ${opportunityFields} }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  try {
    const results = await sanityClient.fetch(
      `*[_type == "blogPost"] | order(publishDate desc) { ${blogFields} }`
    );
    return results || [];
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0] { ${blogFields} }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getResources(): Promise<SanityResource[]> {
  try {
    const results = await sanityClient.fetch(
      `*[_type == "resource"] | order(lastUpdated desc) { ${resourceFields} }`
    );
    return results || [];
  } catch {
    return [];
  }
}

export async function getResourceBySlug(slug: string): Promise<SanityResource | null> {
  try {
    return await sanityClient.fetch(
      `*[_type == "resource" && slug.current == $slug][0] { ${resourceFields} }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export function getFeaturedImageUrl(doc: { featuredImage?: { asset: { _ref: string } } }): string {
  if (!doc.featuredImage?.asset?._ref) return '';
  return sanityImageUrl(doc.featuredImage.asset._ref);
}
