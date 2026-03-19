export default {
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'lastUpdated', title: 'Last Updated', type: 'date' },
    { name: 'area', title: 'Area', type: 'string' },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['study-guides', 'application-tips', 'country-guides', 'test-prep'] } },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] },
  ],
}
