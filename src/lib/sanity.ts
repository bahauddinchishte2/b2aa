import { createClient } from '@sanity/client';

const projectId = import.meta.env.SANITY_PROJECT_ID || '2erh8e2c';
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';
const token = import.meta.env.SANITY_READ_TOKEN || '';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
});

export function sanityImageUrl(ref: string): string {
  if (!ref) return '';
  const [, id, dimensions, format] = ref.split('-');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
}
