import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    featuredImage: z.string().optional(),
    excerpt: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    category: z.string()
  }),
});

const scholarshipCollection = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string().optional(),
    openDate: z.string(),
    deadline: z.string(),
    fundingType: z.enum(['Full Fund', 'Full Tuition', 'Partial Fund']),
    country: z.string(),
    numberOfRecipients: z.string(),
    hostInstitution: z.string(),
    levelOfStudy: z.enum(['Bachelor\'s', 'Master\'s', 'PhD']),
    officialLink: z.string().url(),
    category: z.enum(['government-scholarship', 'university-scholarship']),
    tags: z.array(z.string()),
    author: z.string(),
  }),
});

const opportunityCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string().optional(),
    openDate: z.string(),
    deadline: z.string(),
    fundingType: z.enum(['Full Fund', 'Full Tuition', 'Partial Fund']),
    country: z.string(),
    numberOfRecipients: z.string(),
    hostInstitution: z.string(),
    levelOfStudy: z.enum(['Bachelor\'s', 'Master\'s', 'PhD']),
    officialLink: z.string().url(),
    category: z.enum(['internship', 'fellowship']),
    tags: z.array(z.string()),
    author: z.string(),
  }),
});

const resourceCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.string(),
    area: z.string(),
    category: z.enum(['study-guides', 'application-tips', 'country-guides', 'test-prep']),
    tags: z.array(z.string()),
    author: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'scholarships': scholarshipCollection,
  'opportunities': opportunityCollection,
  'resources': resourceCollection,
};