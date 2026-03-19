# Sanity CMS - Developer Setup Notes

## Bangladesh2Abroad Project

This document records every decision, configuration detail, and architectural choice made when integrating Sanity CMS into the Bangladesh2Abroad Astro.js website. Use this as a reference when revisiting the project, onboarding a new developer, or debugging content issues.

---

## Table of Contents

1. [Why Sanity Was Chosen](#why-sanity-was-chosen)
2. [Project Details](#project-details)
3. [API CDN Configuration (Cost Optimization)](#api-cdn-configuration-cost-optimization)
4. [Environment Variables](#environment-variables)
5. [Sanity Studio (Separate Repo)](#sanity-studio-separate-repo)
6. [Content Architecture - Dual Source System](#content-architecture---dual-source-system)
7. [Schema Definitions](#schema-definitions)
8. [How Content Flows from Sanity to the Website](#how-content-flows-from-sanity-to-the-website)
9. [PortableText Rendering](#portabletext-rendering)
10. [Image Handling](#image-handling)
11. [Content Priority / Deduplication Logic](#content-priority--deduplication-logic)
12. [Key Files Reference](#key-files-reference)
13. [Common Tasks](#common-tasks)
14. [Things to Keep in Mind](#things-to-keep-in-mind)

---

## Why Sanity Was Chosen

- The site needed a headless CMS so non-technical editors can publish scholarships, opportunities, blog posts, and resources without touching code.
- Sanity has a generous free tier (the "Free" plan includes 100K API CDN requests/month and 500K asset bandwidth).
- The Astro.js site is statically generated (SSG), so Sanity data is fetched only at build time, not on every page visit. This keeps API usage extremely low.
- Sanity's GROQ query language is powerful and lets us fetch exactly the fields we need, reducing payload size.

---

## Project Details

| Detail | Value |
|---|---|
| Sanity Project ID | `2erh8e2c` |
| Dataset | `production` |
| API Version | `2024-01-01` |
| Sanity Studio | Separate repository (deployed independently) |
| Client Library | `@sanity/client` (v7.18.0) |

---

## API CDN Configuration (Cost Optimization)

This was one of the most important decisions. The Sanity client is configured with:

```typescript
useCdn: true
```

### Why `useCdn: true`?

- **Cost savings**: CDN requests are significantly cheaper than direct API requests. On Sanity's free plan, you get 100K CDN requests/month vs a much smaller allowance for non-CDN requests.
- **Faster responses**: CDN serves cached responses from edge locations, so build times are faster.
- **No downside for us**: Since we are building a static site (SSG), we only fetch data at build time. We do NOT need real-time data. The CDN cache delay (typically a few seconds to minutes) is irrelevant because we rebuild the site when content changes.

### When would you turn CDN off?

Only if you switch to SSR (server-side rendering) and need absolutely real-time data on every request. For this project, that is not the case and `useCdn: true` should stay.

### Read Token

A read token (`SANITY_READ_TOKEN`) is configured. This was needed because:
- It allows access to the API even if the dataset is set to private.
- Combined with `useCdn: true`, authenticated CDN requests are cached per-token, so you still get CDN benefits.

---

## Environment Variables

Stored in `.env` at the project root:

| Variable | Purpose |
|---|---|
| `SANITY_PROJECT_ID` | Your Sanity project identifier |
| `SANITY_DATASET` | Which dataset to read from (we use `production`) |
| `SANITY_API_VERSION` | Locks the API to a specific version to prevent breaking changes |
| `SANITY_READ_TOKEN` | Authentication token for reading content (keep this secret, never expose in client-side code) |

The Sanity client code (`src/lib/sanity.ts`) has fallback defaults hardcoded for project ID, dataset, and API version. This means the site will still work even if the `.env` file is missing those values (but the token must be present for authenticated requests).

---

## Sanity Studio (Separate Repo)

The Sanity Studio (the editing interface where you create/edit content) lives in a **separate repository**, not inside this Astro project. This was intentional:

- Keeps the website codebase clean and focused on rendering.
- Studio can be deployed independently (e.g., on Vercel, Netlify, or Sanity's own hosting).
- Studio updates (adding new fields, changing validation) don't require a website redeploy.

The schema definition files in `src/content/` (scholarship.ts, opportunity.ts, blogPost.ts, resource.ts) in THIS project are reference copies of the Sanity schemas. They exist here so developers can understand the data shape without switching repos, and they were used during initial setup. **The authoritative schemas live in the Sanity Studio repo.**

---

## Content Architecture - Dual Source System

This is the most important architectural decision to understand. The site pulls content from **two sources simultaneously**:

### Source 1: Sanity CMS (Primary)
Content created and managed through the Sanity Studio editor. Fetched via GROQ queries at build time.

### Source 2: Local MDX Files (Fallback/Legacy)
Markdown files stored in `src/content/` directories. These were the original content before Sanity was set up.

### How They Work Together

The content layer (`src/lib/content.ts`) merges both sources with this logic:

1. Fetch all items from Sanity.
2. Fetch all items from local MDX files.
3. **Sanity wins on duplicates**: If a Sanity item and an MDX item have the same slug, only the Sanity version is kept.
4. MDX items with unique slugs (not in Sanity) are included alongside Sanity items.

This means:
- You can gradually migrate content from MDX to Sanity without breaking anything.
- Old MDX content stays live until you create a Sanity version with the same slug, at which point the Sanity version automatically takes over.
- If Sanity fetch fails (network error, etc.), the `try/catch` in query functions returns an empty array, and the site falls back to MDX-only content.

### Content Types

| Type | MDX Directory | Sanity Document Type | Categories |
|---|---|---|---|
| Scholarships | `src/content/scholarships/` | `scholarship` | government-scholarship, university-scholarship |
| Opportunities | `src/content/opportunities/` | `opportunity` | internship, fellowship |
| Blog Posts | `src/content/blog/` | `blogPost` | (flexible string) |
| Resources | `src/content/resources/` | `resource` | study-guides, application-tips, country-guides, test-prep |

---

## Schema Definitions

All four content types follow a similar pattern. Here is what each schema contains:

### Scholarship / Opportunity (nearly identical)
- `title` (string, required)
- `slug` (slug, auto-generated from title)
- `openDate` (date)
- `deadline` (date)
- `lastUpdated` (date)
- `fundingType` (string: "Full Fund" | "Full Tuition" | "Partial Fund")
- `country` (string)
- `numberOfRecipients` (string)
- `hostInstitution` (string)
- `levelOfStudy` (string: "Bachelor's" | "Master's" | "PhD")
- `officialLink` (url)
- `category` (string: varies by type)
- `tags` (array of strings)
- `author` (string)
- `excerpt` (text)
- `featuredImage` (image with hotspot)
- `body` (array of blocks + images - this is Sanity's rich text format)

### Blog Post
- `title`, `slug`, `publishDate`, `excerpt`, `author`, `category`, `tags`, `featuredImage`, `body`

### Resource
- `title`, `slug`, `description`, `lastUpdated`, `area`, `category`, `tags`, `author`, `featuredImage`, `body`

---

## How Content Flows from Sanity to the Website

```
Sanity Studio (editor creates content)
        |
        v
Sanity Cloud (stores data in dataset "production")
        |
        v
API CDN (cached, useCdn: true)
        |
        v
Build Time: src/lib/sanity-queries.ts (GROQ queries fetch data)
        |
        v
src/lib/content.ts (normalizes Sanity + MDX data, deduplicates)
        |
        v
Page files (e.g., src/pages/scholarships/[...slug].astro)
        |
        v
Layout components render metadata
        |
        v
PortableText.astro renders Sanity rich text body
   OR
<Content /> renders MDX body (depending on source)
        |
        v
Static HTML output
```

### Page Rendering Pattern

Every dynamic page (e.g., `[...slug].astro`) follows this exact pattern:

1. `getStaticPaths()` calls `getAllXxx()` to get all items from both sources, generating a page for each.
2. In the page body, `getXxxContent(slug)` fetches the specific item (Sanity first, then MDX fallback).
3. Conditional rendering checks `source`:
   - If `source === 'sanity'` and `sanityBody` exists: render `<PortableText value={sanityBody} />`
   - If `source === 'mdx'` and `render` exists: render `<Content />` (Astro's MDX renderer)

---

## PortableText Rendering

Sanity stores rich text as "Portable Text" - a JSON array of blocks. We built a custom `PortableText.astro` component (not using any external library) that handles:

- **Text blocks**: paragraphs, headings (h1-h4), blockquotes
- **Inline marks**: bold, italic, underline, strikethrough, code, links
- **Lists**: ordered (numbered) and unordered (bullet) lists
- **Images**: inline images within the body content
- **HTML escaping**: all text content is escaped to prevent XSS

The component outputs into a `<div class="prose prose-lg max-w-none">` which uses Tailwind Typography for consistent styling.

---

## Image Handling

Sanity images are referenced by asset `_ref` strings. The `sanityImageUrl()` function in `src/lib/sanity.ts` converts these references to CDN URLs:

```
Input:  image-abc123-800x600-jpg
Output: https://cdn.sanity.io/images/2erh8e2c/production/abc123-800x600.jpg
```

The function parses the reference format: `image-{id}-{dimensions}-{format}` and constructs the CDN URL. Images are served directly from Sanity's CDN (cdn.sanity.io), no additional image processing or hosting needed.

---

## Content Priority / Deduplication Logic

When the same slug exists in both Sanity and MDX:

1. All Sanity items are fetched and normalized first.
2. A Set of Sanity slugs is created.
3. MDX items are filtered: only items whose slug is NOT in the Sanity slug Set are included.
4. The final array is `[...sanityItems, ...mdxItemsNotInSanity]`.

This means **Sanity always takes priority**. To "override" an MDX article, just create a Sanity document with the same slug.

---

## Key Files Reference

| File | Purpose |
|---|---|
| `src/lib/sanity.ts` | Sanity client setup (project ID, CDN config, token, image URL helper) |
| `src/lib/sanity-queries.ts` | All GROQ queries + TypeScript interfaces for Sanity document types |
| `src/lib/content.ts` | Dual-source content layer: merges Sanity + MDX, normalizes data, handles deduplication |
| `src/components/PortableText.astro` | Custom renderer for Sanity's Portable Text (rich text body content) |
| `src/content/config.ts` | Astro content collection definitions (Zod schemas for MDX frontmatter validation) |
| `src/content/scholarship.ts` | Sanity schema definition for scholarships (reference copy) |
| `src/content/opportunity.ts` | Sanity schema definition for opportunities (reference copy) |
| `src/content/blogPost.ts` | Sanity schema definition for blog posts (reference copy) |
| `src/content/resource.ts` | Sanity schema definition for resources (reference copy) |
| `src/scripts/migrate-content.js` | One-time migration script that moved MDX files from blog/ to scholarships/ and opportunities/ based on category |

---

## Common Tasks

### Adding a new content item
Just create it in Sanity Studio. On the next site build, it will appear automatically.

### Updating an existing MDX item via Sanity
Create a new document in Sanity Studio with the exact same slug as the MDX file. The Sanity version will automatically replace the MDX version.

### Rebuilding the site to pick up new Sanity content
Trigger a new build/deploy. Since we use SSG, the site fetches fresh data from Sanity's CDN at build time.

### Adding a new field to a content type
1. Add the field in the Sanity Studio schema (in the Studio repo).
2. Deploy the updated Studio.
3. Update the GROQ query field list in `src/lib/sanity-queries.ts`.
4. Update the TypeScript interface in the same file.
5. Update the normalizer function in `src/lib/content.ts` if the field needs to be exposed.
6. Use the new field in page/layout components.

### Checking API usage
Go to sanity.io > Project > Usage tab to monitor CDN requests and bandwidth.

---

## Things to Keep in Mind

1. **Always keep `useCdn: true`** unless you have a very specific reason to change it. This is the single biggest cost optimization.

2. **The read token is a secret.** It's in `.env` and accessed via `import.meta.env` (server-side only in Astro). It never reaches the browser.

3. **Sanity schemas in this repo are reference copies only.** The real schemas live in the Sanity Studio repository. If you change schemas, change them in the Studio repo first, then update the reference copies here for documentation.

4. **GROQ queries select specific fields** (not `*`). This reduces response payload size and API bandwidth usage. If you add new fields to a schema, you must explicitly add them to the field projection in the query.

5. **Error handling**: All Sanity fetch functions are wrapped in try/catch and return empty arrays or null on failure. This ensures the site builds even if Sanity is unreachable (falling back to MDX content only).

6. **The slug format matters.** Sanity slugs are stored as `{ current: "my-slug" }`. The GROQ queries use `"slug": slug.current` to flatten this. The normalizer also handles both `string` and `{ current: string }` formats defensively.

7. **No webhook/auto-rebuild is configured yet.** After publishing content in Sanity, you need to manually trigger a site rebuild. Consider adding a Sanity webhook that triggers a build on your hosting platform (Vercel, Netlify, etc.) for automatic deploys on content change.

8. **The migration script** (`src/scripts/migrate-content.js`) was a one-time utility to reorganize MDX files from a flat `blog/` directory into separate `scholarships/` and `opportunities/` directories based on their category frontmatter. It does not need to be run again.

9. **Sanity's API version is locked to `2024-01-01`**. This prevents breaking changes from newer API versions. Only update this if you have tested against a newer version.

10. **Images from Sanity are served from cdn.sanity.io.** They are not downloaded or processed by Astro. This keeps build times fast and avoids storing images in the repo.
