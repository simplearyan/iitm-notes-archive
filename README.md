# 🎓 IITM Notes Archive: The High-Performance Course Hub

![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

A premium, data-driven digital archive for the **IITM Data Science Degree**. Built for speed, offline reliability, and effortless navigation.

## 🚀 The Vision
Tired of slow, clunky course viewers and searching through endless folders of saved pages? This project transforms your static **SingleFileZ** (`.u.zip.html`) saves into a lightning-fast, interactive Single Page Application.

> [!TIP]
> This archive is optimized for 0ms render delay by pre-compiling all styles and unzipping course payloads on the fly during deployment.

---

## ✨ Key Features

- ⚡ **Instant Load Times:** Swapped the Tailwind Play CDN for a statically compiled `main.css`, cutting boatloads of render-blocking time.
- 📂 **Auto-Generated Sidebar:** A smart Node.js engine recursively crawls your `content/` folder to build a beautiful, nested navigation tree.
- 🌓 **Modern Aesthetics:** A sleek, dark-themed dashboard with glassmorphism effects and dynamic course filtering.
- 📱 **Mobile First:** Fully responsive UI with a custom off-canvas navigation drawer and touch-optimized controls.
- 🛠️ **Automated CI/CD:** Powered by GitHub Actions. Just push your files, and the system automatically unzips, optimizes, and deploys.

---

## 🏗️ System Architecture

### 1. The Core (index.html)
A lightweight SPA using **Vanilla JS** for routing and **Tailwind CSS** for styling. It uses hash-based routing (`#dashboard`, `#file-path`) to maintain state without page reloads.

### 2. The Optimizer (Node.js)
- `scripts/optimize-for-prod.js`: Uses `7z` to extract high-density polyglot ZIP/HTML files into streamable directory structures.
- `scripts/generate-sidebar.js`: Generates a real-time JSON map of your entire course library.

### 3. The Pipeline (GitHub Actions)
Our custom `.github/workflows/deploy.yml` handles:
1. **Environment Setup:** Installs Node.js and specialized extraction tools (`7z`).
2. **Optimization Pass:** Unpacks all new SingleFileZ archives.
3. **Data Refresh:** Rebuilds the sidebar JSON map.
4. **Style Build:** Compiles the final production CSS.
5. **Direct Deploy:** Pushes the artifact directly to the GitHub Pages edge network.

---

## 🛠️ Getting Started: The "Drag & Drop" Workflow

1. **Capture Content:** Use the [SingleFileZ](https://github.com/gildas-lormeau/SingleFileZ) extension to save your course pages.
2. **Organize:** Drop your `.html` files into the `content/` folder. Use any nested structure you like (e.g., `Term/Course/Week/`).
3. **Push & Deploy:**
   ```bash
   git add .
   git commit -m "feat: add new course modules"
   git push origin main
   ```
4. **Sit Back:** Your GitHub Action will trigger, optimize your files, and update your live site in ~2 minutes.

---

## 🖨️ Automated PDF Conversion

This project includes a built-in PDF factory to turn your course modules into printable handouts.

### 🚀 Standard vs. ✨ v3 Ultra vs. 📐 v4 Compact
- **Standard:** Quick batch conversion of every file in a course directory.
- **v3 Ultra:** High-fidelity multi-page rendering. Supports long assignments with full layout unrolling.
- **v4 Compact:** Academic-grade efficiency. Removes UI clutter, fixes KaTeX math doubling, and optimizes spacing for printable handouts.

### 💻 Local Usage
```bash
# Generate Standard PDFs
npm run pdf

# Generate v3 Ultra PDFs
npm run v3-pdf

# Generate v4 Compact PDFs (Recommended for Handouts)
npm run v4-pdf
```

### ☁️ GitHub Actions Usage
You can trigger these manually from the **Actions** tab:
1. Select **📄 Standard Course PDF Generator 🛠️**, **🚀 v3 Ultra-High Quality PDF Generator ✨**, or **📐 v4 Compact Efficiency PDF Generator 📐**.
2. Click **Run workflow** and specify the course/week.
3. Download the PDFs from the workflow summary or find them in the `gh-pages` branch inside their respective folders (`v3-pdf/` or `v4-pdf/`).

---

## ⚖️ Disclaimer

This is an **unofficial, personal organization tool**. It is not affiliated with, endorsed by, or sponsored by the **Indian Institute of Technology Madras (IITM)**.

All course materials, questions, syllabus content, and related intellectual property belong exclusively to **IITM** and the respective instructors. This tool is designed purely for personal offline study and productivity purposes.

---

<p align="center">Made with ❤️ for the IITM BS community.</p>