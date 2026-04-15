# 📚 Markdown Archive Module

A full-featured markdown documentation site built for IITM course materials, with automatic extraction from HTML archives, full-text search, and a responsive sidebar navigation.

## 🎯 Features

- ✅ **Auto-Extraction**: Converts SingleFileZ `.u.zip.html` archives to clean markdown
- ✅ **Full-Text Search**: Client-side search across all documents (Lunr.js)
- ✅ **Nested Navigation**: Organized sidebar with collapsible folders
- ✅ **Breadcrumb Navigation**: Easy path tracking and navigation
- ✅ **Rich Formatting**: 
  - KaTeX math support (inline and display)
  - Syntax-highlighted code blocks
  - Tables, lists, blockquotes, and more
- ✅ **Mobile-Responsive**: Off-canvas sidebar on mobile devices
- ✅ **Dark Theme**: Easy on the eyes with glassmorphism design
- ✅ **Dual Content Sources**: 
  - Auto-extracted markdown from archives
  - Hand-written study notes in manual folder
- ✅ **Zero-Server Architecture**: Fully static site, deployable on GitHub Pages

## 📁 Directory Structure

```
markdown/
├── index.html              # SPA entry point
├── index.json              # Auto-generated navigation tree + search index
├── .gitignore              # Ignore auto-generated files
├── README.md               # This file
│
├── assets/
│   ├── markdown.css        # Markdown content styling
│   └── (images auto-populated during extraction)
│
├── extracted/              # Auto-generated from archives
│   ├── .gitkeep
│   ├── Term-Feb-to-May/
│   │   ├── Mathematics-II/
│   │   │   ├── Week 1/
│   │   │   ├── Week 2/
│   │   │   └── ...
│   │   └── Statistics-II/
│   └── maths-2/
│
└── manual/                 # Hand-written study notes
    ├── GETTING_STARTED.md  # User guide
    └── (custom folders/files)
```

## 🚀 Quick Start

### Local Development

1. **Install dependencies** (first time only):
   ```bash
   npm install
   ```

2. **Extract markdown from archives**:
   ```bash
   npm run markdown:extract
   ```
   
3. **Generate search index**:
   ```bash
   npm run markdown:index
   ```

4. **Open in browser**:
   - Use a local server: `python -m http.server 8000`
   - Navigate to: `http://localhost:8000/markdown/index.html`

### Deployment

The site deploys automatically via GitHub Actions when you push to `main`:

```
main branch push
    ↓
deploy.yml workflow
    ↓
1. Extract markdown
2. Generate index
3. Inject data into HTML
4. Deploy to GitHub Pages → /markdown/
```

Live URL: https://simplearyan.github.io/iitm-notes-archive/markdown/

## 📝 Adding Content

### Option 1: Automatic Extraction (from archives)

Archives are automatically extracted during deployment. To manually trigger:

```bash
npm run markdown:extract
```

This scans `content/` for `.u.zip.html` files and converts them to markdown in `markdown/extracted/`.

### Option 2: Hand-Written Notes (manual)

Create markdown files directly in `markdown/manual/`:

```markdown
---
title: My Study Notes
date: 2024-01-15
tags: linear-algebra, matrices
---

# My Study Notes

## Matrix Multiplication

Here's how to multiply matrices...

$A \times B = C$
```

**File structure examples**:
- `markdown/manual/Quick-Reference/Linear-Algebra.md`
- `markdown/manual/Practice-Problems/Week-1.md`
- `markdown/manual/GETTING_STARTED.md`

## 🔧 Scripts

### Generate Index
```bash
npm run markdown:index
```
Scans `markdown/extracted/` and `markdown/manual/` to build:
- Navigation tree (nested folder structure)
- Search index (Lunr.js format)
- Breadcrumb mappings

**Output**: `markdown/index.json`

### Extract Markdown
```bash
npm run markdown:extract
```
Converts `.u.zip.html` SingleFileZ archives to markdown:
- Preserves HTML structure and converts to markdown syntax
- Extractsmath formulas (KaTeX → LaTeX)
- Saves images to `markdown/extracted/assets/`
- Mirrors folder structure from `content/`

### With GitHub Actions

**Automatic** (on every push):
- `.github/workflows/deploy.yml` - Full deployment pipeline

**Manual trigger**:
- `.github/workflows/extract-markdown.yml` - On-demand extraction
- Accessible from Actions tab → "Extract Markdown" → "Run workflow"

## 📋 Markdown Support

### Syntax Features

| Feature | Syntax | Notes |
|---------|--------|-------|
| **Heading** | `# Title` | h1-h6 supported |
| **Bold** | `**text**` | Strong emphasis |
| **Italic** | `*text*` | Emphasis |
| **Code** | `` `code` `` | Inline code |
| **Code Block** | ` ```python ` | Language highlighting |
| **Link** | `[text](url)` | Full URLs and relative paths |
| **Image** | `![alt](src)` | Images auto-resolved |
| **List** | `- item` or `1. item` | Unordered or ordered |
| **Blockquote** | `> text` | Quoted sections |
| **Table** | Standard markdown table | Multi-column layouts |
| **Horizontal Rule** | `---` | Visual separator |
| **Math (inline)** | `$E=mc^2$` | KaTeX rendering |
| **Math (display)** | `$$E=mc^2$$` | Centered equations |

### Example: Complete Markdown File

```markdown
---
title: Linear Algebra Basics
date: 2024-01-10
tags: mathematics, linear-algebra, vectors
---

# Linear Algebra Basics

## What is a Vector?

A vector is a mathematical object with both **magnitude** and **direction**.

### Mathematical Definition

In mathematics, a vector in $\mathbb{R}^n$ can be written as:

$$\vec{v} = \begin{pmatrix} v_1 \\ v_2 \\ \vdots \\ v_n \end{pmatrix}$$

### Example Code

```python
import numpy as np

# Create a vector
v = np.array([1, 2, 3])
print(v)
```

### Key Properties

| Property | Definition |
|----------|-----------|
| Length | $\|\vec{v}\| = \sqrt{v_1^2 + v_2^2 + \cdots}$ |
| Dot Product | $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + \cdots$ |

> **Tip**: Always normalize vectors for calculations involving angles.

---

Further reading: [Khan Academy Vectors](https://www.khanacademy.org/)
```

## 🔍 Search Features

- **Full-Text Search**: Searches titles, content, and tags
- **Real-Time Filtering**: Results update as you type
- **Result Snippets**: Shows context around matches
- **Keyboard Shortcut**: Press `Ctrl+K` (or `Cmd+K`) to focus search

## 🎨 Styling

### Tailwind CSS Integration
- Compiled from `src/input.css`
- Located at `assets/main.css`
- Dark theme with indigo/blue accents
- Mobile-first responsive design

### Markdown Content Styling
- Custom styles in `markdown/assets/markdown.css`
- Prose-like typography for readability
- Code blocks with syntax highlighting
- Responsive tables and images
- Math rendering via KaTeX

### Customization

Edit `markdown/assets/markdown.css` to customize:
- Heading sizes and colors
- Code block backgrounds
- Math font rendering
- Light/dark theme colors

## 🔗 Integration with Main Archive

This markdown site coexists with the main IITM-Pages archive:

| Site | URL | Purpose |
|------|-----|---------|
| **Markdown Archive** | `https://github.com/simpleary/iitm-notes-archive/markdown/` | Clean markdown documentation |
| **Main Archive** | `https://github.com/simpleary/iitm-notes-archive/` | Raw HTML course materials |

Both deploy to the same `gh-pages` branch, different subdirectories.

## 📊 Generated Files

### index.json Structure

```json
{
  "version": "1.0",
  "timestamp": "2024-01-15T10:30:00Z",
  "stats": {
    "totalFiles": 150,
    "extractedFiles": 120,
    "manualFiles": 30
  },
  "navigation": [
    {
      "type": "folder",
      "name": "Course Materials",
      "path": "extracted",
      "children": [
        {
          "type": "file",
          "name": "Vectors",
          "path": "extracted/Term-Feb-to-May/Mathematics-II/L1.1_Vectors",
          "source": "extracted"
        }
      ]
    }
  ],
  "search": {
    "documents": [
      {
        "id": "extracted/Term-Feb-to-May/Mathematics-II/L1.1_Vectors",
        "title": "Vectors",
        "path": "extracted/Term-Feb-to-May/Mathematics-II/L1.1_Vectors",
        "content": "...",
        "snippet": "..."
      }
    ]
  },
  "breadcrumbs": {
    "extracted/Math": ["Course Materials", "Mathematics-II"]
  }
}
```

## ⚙️ Configuration Options

### Extract Script (`extract-markdown.js`)
- **Auto-detect**: Scans all subdirectories for `.u.zip.html`
- **No CLI args**: Processes entire `content/` directory
- **Image handling**: Extracts to `markdown/extracted/assets/`

### Index Generator (`generate-markdown-index.js`)
- **Auto-discover**: Scans both `extracted/` and `manual/` folders
- **Frontmatter**: Reads YAML frontmatter for metadata
- **Search optimization**: Full-text indexing with Lunr.js

### SPA (`index.html`)
- **Hash routing**: Navigate via `#file-path` URLs
- **No server needed**: Works on GitHub Pages or local file
- **Responsive**: Breakpoint at 768px (md)

## 🐛 Troubleshooting

### Images Not Loading
- Ensure `extract-markdown.js` ran successfully
- Check images are in `markdown/extracted/assets/`
- Verify relative paths in markdown (use forward slashes)

### Search Not Working
- Rebuild index: `npm run markdown:index`
- Check `markdown/index.json` exists and is valid JSON
- Open browser DevTools (F12) → Console for errors

### Math Not Rendering
- Use correct LaTeX syntax: `$...$` (inline) or `$$...$$` (display)
- Test formulas in [KaTeX Demo](https://katex.org/)
- Ensure delimiters aren't escaped

### Sidebar Not Loading
- Check browser console for JavaScript errors
- Verify `markdown/index.json` was generated
- Clear browser cache and reload

## 📚 Related Documentation

- **Main README**: See `../../README.md` for overall project info
- **User Guide**: See `manual/GETTING_STARTED.md` for end-user docs
- **Build Workflows**: See `.github/workflows/` for CI/CD setup

## 📝 License

Same as main IITM-Pages project. See LICENSE in root directory.

## 🤝 Contributing

To improve the markdown archive:

1. Create or edit markdown files in `manual/` folder
2. Test locally: `npm run markdown:index` then open in browser
3. Push to GitHub (workflows handle deployment)

Or submit content for extraction from the archive system.

---

**Questions?** Open an issue on GitHub or check GETTING_STARTED.md for common questions.
