# Bangladesh to Abroad

![Bangladesh to Abroad](https://api.dicebear.com/7.x/shapes/svg?seed=Bangladesh2Abroad&backgroundColor=059669)

## 🌍 About

Bangladesh to Abroad is a comprehensive platform designed to help Bangladeshi students discover and navigate international educational opportunities. Our mission is to provide well-organized, up-to-date information about scholarships, fellowships, internships, and educational resources worldwide.

## ✨ Features

- **Scholarship Database**: Extensive collection of government and university scholarships
- **Opportunity Tracker**: Updated listings of internships and fellowships
- **Educational Resources**: Country guides, test preparation, and application tips
- **Advanced Filtering**: Find opportunities by country, level of study, funding type, and more
- **Smart Search**: Quickly locate specific opportunities and resources
- **Mobile Responsive**: Optimized for all devices, from desktops to smartphones
- **Author Profiles**: Insights from experienced contributors
- **Interactive UI**: User-friendly interface with intuitive navigation
- **SEO Optimized**: Enhanced discoverability through search engines

## 🚀 Tech Stack

- **[Astro](https://astro.build/)**: Core framework for building the website
- **[React](https://reactjs.org/)**: For interactive components
- **[Tailwind CSS](https://tailwindcss.com/)**: For styling
- **[TypeScript](https://www.typescriptlang.org/)**: For type-safe code
- **[MDX](https://mdxjs.com/)**: For content management
- **[Giscus](https://giscus.app/)**: For comments system
- **[Fuse.js](https://fusejs.io/)**: For search functionality

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bangladesh-to-abroad.git
   cd bangladesh-to-abroad
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:4321`

## 📂 Project Structure

```
/
├── public/          # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── components/  # Reusable UI components
│   ├── content/     # MDX content (scholarships, opportunities, etc.)
│   ├── data/        # Static data (authors, etc.)
│   ├── layouts/     # Page layouts
│   ├── pages/       # Website pages
│   ├── scripts/     # Utility scripts
│   ├── styles/      # Global styles
│   └── config/      # Configuration files
└── package.json     # Project dependencies and scripts
```

## 📝 Content Management

Content is stored in MDX format in the `src/content` directory, organized into collections:

- **blog**: General blog posts
- **scholarships**: Scholarship opportunities
- **opportunities**: Internships and fellowships
- **resources**: Educational guides and resources

To add new content, create a new MDX file in the appropriate directory with the required frontmatter.

### Content Frontmatter Example (Scholarship)

```mdx
---
title: "Scholarship Title"
openDate: "2024-01-01"
deadline: "2024-03-31"
fundingType: "Full Fund"
country: "Country Name"
numberOfRecipients: "Number"
hostInstitution: "Institution Name"
levelOfStudy: "Master's"
officialLink: "https://example.com"
category: "government-scholarship"
tags: ["tag1", "tag2"]
author: "Author Name"
---

# Content goes here
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and passes all tests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- All contributors who have helped build and maintain this project
- The Astro team for their excellent framework
- The community for their support and feedback