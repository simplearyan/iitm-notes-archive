---
title: Getting Started with Markdown
date: 2024-01-01
tags: guide, markdown, documentation
---

# Getting Started with Markdown Format

Welcome to the IITM Markdown Archive! This guide will help you understand how to use and contribute to the markdown documentation system.

## Overview

This site provides:
- **Extracted Markdown**: Automatically converted from course HTML archives
- **Manual Notes**: Hand-written markdown files for study notes
- **Full-text Search**: Quick access to all course materials
- **Organized Navigation**: Hierarchical sidebar for easy browsing

## Browsing Content

### Using the Sidebar
1. Click on course folders to expand them
2. Select a document to view it in the main content area
3. Use breadcrumbs at the top to navigate back

### Searching
1. Type in the search box (top of sidebar)
2. Results appear as you type
3. Click a result to jump to that document

### Navigation
- **Back Button**: Click "Home" in breadcrumbs to return to dashboard
- **Mobile**: Tap the hamburger menu (☰) to toggle sidebar

## Understanding the Structure

```
markdown/
├── extracted/          ← Auto-extracted from archives
│   └── Term-Feb-to-May/
│       ├── Mathematics-II/
│       │   ├── Week 1/
│       │   └── Week 2/
│       └── Statistics-II/
│
├── manual/             ← Hand-written study notes
│   ├── Quick-Notes/
│   └── Tutorials/
│
└── assets/             ← Shared images and resources
    └── (auto-populated)
```

## Creating Manual Markdown Files

### File Format
Each markdown file should start with YAML frontmatter:

```markdown
---
title: Your Document Title
date: 2024-01-01
tags: topic1, topic2, topic3
---

# Document Title

Your content here...
```

### Organization Tips
- **Mirror extracted structure** for consistency
- **Use descriptive titles** that appear in search
- **Add relevant tags** for better discoverability
- **Keep files under 500 lines** for readability

### Markdown Syntax Support

#### Math
- **Inline**: Wrap in single dollars $E = mc^2$
- **Display**: Wrap in double dollars $$E = mc^2$$

#### Code
Use triple backticks with language identifier:

```python
def hello_world():
    print("Hello, World!")
```

#### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

#### Images
```markdown
![Description](path/to/image.png)
```

*Note: relative paths are resolved from the document location*

## Building the Site Locally

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Extract Markdown
```bash
npm run markdown:extract
```

### Step 3: Generate Index
```bash
npm run markdown:index
```

### Step 4: Open in Browser
Open `/markdown/index.html` in your browser (use a local server)

## GitHub Actions Automation

### Automatic Deployment
Every push to `main` automatically:
1. ✅ Extracts markdown from all archives
2. ✅ Regenerates the search index
3. ✅ Injects updated data into the SPA
4. ✅ Deploys to `/markdown/` on GitHub Pages

### Manual Markdown Extraction
Trigger the extraction workflow from the Actions tab for on-demand extraction of specific courses.

## Viewing the Live Site

- **Markdown Archive**: https://simplearyan.github.io/iitm-notes-archive/markdown/
- **Main Archive**: https://simplearyan.github.io/iitm-notes-archive/

## Tips & Best Practices

### Writing
- Use clear, descriptive headings
- Break content into logical sections
- Include code examples where relevant
- Add proper formatting (bold, italic, etc.)

### Organization
- Keep related topics in the same folder
- Use consistent naming conventions
- Create index files for folder navigation (optional)

### Math & Formulas
- Use LaTeX syntax within $ delimiters
- Test complex formulas in a math renderer
- Keep formulas concise and readable

## Troubleshooting

### Search Not Working
- Ensure `markdown/index.json` exists
- Check browser console (F12) for errors
- Rebuild index: `npm run markdown:index`

### Images Not Displaying
- Check relative paths in markdown
- Verify images are in `markdown/extracted/assets/`
- Use forward slashes (/) in paths, not backslashes

### Math not rendering
- Use correct LaTeX syntax
- Check for missing $ delimiters
- Ensure KaTeX library loads properly

## Additional Resources

- [Markdown Syntax Guide](https://www.markdownguide.org/)
- [KaTeX Function Support](https://katex.org/docs/support_table.html)
- [Prism.js Supported Languages](https://prismjs.com/#supported-languages)

---

**Have questions?** Check the main repository README or open an issue on GitHub.
