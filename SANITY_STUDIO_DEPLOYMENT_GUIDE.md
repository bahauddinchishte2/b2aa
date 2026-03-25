# Sanity Studio Deployment Guide

## How Local Changes Get to Your Live Studio

> This guide covers one specific topic: how to take changes you make locally on your computer and push them to the live Sanity Studio at `bangladeshtoabroad.sanity.studio`. For the broader Sanity + Astro integration, see `SANITY_DEVELOPER_SETUP_NOTES.md`.

---

## Table of Contents

1. [The Two Separate Deployments](#the-two-separate-deployments)
2. [How Local Studio Connects to Your Live Studio](#how-local-studio-connects-to-your-live-studio)
3. [How npx sanity deploy Works](#how-npx-sanity-deploy-works)
4. [Full Workflow -- From Clone to Live](#full-workflow----from-clone-to-live)
5. [Where to Run the Command](#where-to-run-the-command)
6. [Important Things to Know](#important-things-to-know)

---

## The Two Separate Deployments

This project has **two completely independent deployments**. It is essential to understand that they are not the same thing.

| | Sanity Studio | Astro Website |
|---|---|---|
| What it is | The editor interface where content is created | The public-facing website visitors see |
| Where it lives | `bangladeshtoabroad.sanity.studio` | `bangladeshtoabroad.com` (or your Netlify URL) |
| Its own repo | Yes -- a separate GitHub repo | Yes -- this repo |
| How it deploys | `npx sanity deploy` from your terminal | Push to GitHub, Netlify auto-builds |
| Connected to GitHub auto-deploy | No | Yes |

The critical point: **pushing to GitHub does NOT update the Sanity Studio.** The Studio was never connected to GitHub auto-deploy. It deploys directly from your terminal to Sanity's own servers using a single command.

They share one thing only: the Sanity cloud database where content data is stored. But their code and deployment pipelines are completely separate.

---

## How Local Studio Connects to Your Live Studio

There is no manual configuration needed when you run `npx sanity deploy`. The connection is already built into a single config file inside the Studio repo.

When you open the Sanity Studio repo, there is a file called `sanity.config.js` (or `sanity.config.ts`) at its root. This is what it looks like for this project:

```js
export default defineConfig({
  name: 'default',
  title: 'Bangladesh to Abroad',
  projectId: '2erh8e2c',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [scholarship, opportunity, blogPost, resource],
  },
})
```

These three values are what connect everything:

| Value | What it does |
|---|---|
| `projectId: '2erh8e2c'` | The unique ID of your Sanity project on Sanity's cloud. This is how Sanity knows WHICH project to push to. |
| `dataset: 'production'` | Which dataset (content database) this Studio manages. |
| `studioHost: 'bangladeshtoabroad'` | The subdomain for the live Studio URL. This becomes `bangladeshtoabroad.sanity.studio`. This is either in the config or was set interactively the very first time you ran `npx sanity deploy`. |

When you run `npx sanity deploy`, the CLI automatically reads this config file. You never need to type the project ID or URL into the command itself.

---

## How npx sanity deploy Works

Here is exactly what happens internally when you run `npx sanity deploy`:

```
Your local Sanity Studio folder
  (contains sanity.config.js with projectId: '2erh8e2c')
        |
        | Step 1: CLI reads sanity.config.js
        | Finds projectId, dataset, studioHost
        |
        | Step 2: Builds the Studio
        | Compiles all your schema files and UI code
        | into a static bundle
        |
        | Step 3: Authenticates
        | Uses your Sanity login session
        | (from when you ran `npx sanity login`)
        |
        | Step 4: Uploads to Sanity's servers
        | Pushes the built bundle to Sanity's hosting
        | under project ID 2erh8e2c
        |
        v
Sanity's hosting servers
        |
        v
https://bangladeshtoabroad.sanity.studio  (live and updated)
```

The whole process typically takes 1 to 3 minutes. When it finishes, your live Studio URL is immediately updated. No Netlify involved. No GitHub involved. Just your terminal talking directly to Sanity's servers.

---

## Full Workflow -- From Clone to Live

Follow these steps every time you want to update the Studio schema (add/remove fields, change validation, etc.):

**Step 1: Clone the Sanity Studio repo**

```bash
git clone <your-sanity-studio-repo-url>
cd <studio-folder-name>
```

**Step 2: Install dependencies**

```bash
npm install
```

Only needed the first time after cloning, or if package dependencies have changed.

**Step 3: Make your schema changes**

Open the schema files in your IDE. The schemas for this project are:

- `schemas/scholarship.js` -- scholarship fields
- `schemas/opportunity.js` -- opportunity fields
- `schemas/blogPost.js` -- blog post fields
- `schemas/resource.js` -- resource fields

Edit the fields you want to add, remove, or modify.

**Step 4: Test locally (recommended)**

```bash
npm run dev
```

This starts a local preview of the Studio at `http://localhost:3333`. Check that your schema changes look correct before deploying. Press `Ctrl+C` to stop when done.

**Step 5: Deploy to live**

```bash
npx sanity deploy
```

The CLI reads your config, builds the Studio, and pushes it to `bangladeshtoabroad.sanity.studio`. Watch the terminal output -- it will confirm when the deployment is complete.

**Step 6: Verify**

Open `https://bangladeshtoabroad.sanity.studio` in your browser and confirm your changes are live.

**Step 7: Update the Astro website (if the new field needs to appear on the site)**

If you added a new field and want the website to display it, you also need to update the Astro repo separately:

1. Open this Astro website repo
2. Add the field name to the relevant GROQ query in `src/lib/sanity-queries.ts`
3. Add it to the TypeScript interface in the same file
4. Update `src/lib/content.ts` normalizer if needed
5. Use the field in the relevant layout/page component
6. Push to GitHub -- Netlify will auto-deploy the updated website

See `SANITY_DEVELOPER_SETUP_NOTES.md` for more detail on each of these steps.

---

## Where to Run the Command

You can run `npx sanity deploy` from any of these places -- they all work identically:

- **VS Code terminal** (Terminal menu > New Terminal) -- most convenient since you are already in the editor
- **WebStorm terminal** -- same as above
- **Mac Terminal app** -- the built-in terminal
- **iTerm2 or any other terminal emulator** -- all fine

The only requirement is that your terminal's current directory must be the Sanity Studio folder (the one containing `sanity.config.js`). If you are in the wrong folder, the command will either fail or warn you.

---

## Important Things to Know

**You never type the URL into the command.**
`npx sanity deploy` is the entire command. The Studio URL is determined automatically from `studioHost` in your config file. There are no extra flags or parameters needed.

**The first deploy is slightly different.**
The very first time `npx sanity deploy` was ever run for this project, the CLI asked interactively for a `studioHost` name. The name `bangladeshtoabroad` was chosen at that point and became the permanent subdomain. All subsequent deploys just reuse that same name automatically from the config. You will never be asked to choose the name again.

**You must be logged in to Sanity.**
If you get an authentication error, run `npx sanity login` first. This opens a browser window to log in with your Sanity account. Once logged in, you can run `npx sanity deploy` again.

**Deploying the Studio does NOT affect your content data.**
Your content (scholarships, blog posts, etc.) lives in the Sanity cloud database separately from the Studio UI code. Deploying a new version of the Studio only updates the editor interface. Your existing content is completely untouched.

**Schema reference copies exist in this Astro repo.**
The files `src/content/scholarship.ts`, `src/content/blogPost.ts`, etc. in this Astro repo are reference copies of the Sanity schemas. They exist here for developer reference only -- they are not the real schemas and are not used at build time. The authoritative schemas live in the Sanity Studio repo. If you update the real schemas in the Studio repo, update these reference copies too so the documentation stays accurate.

**The Studio repo URL should be recorded.**
If you ever need to update the Studio and have forgotten where the repo is, the Sanity project ID is `2erh8e2c`. You can find the connected repo through your GitHub account or by logging into `sanity.io` and checking the project settings.
