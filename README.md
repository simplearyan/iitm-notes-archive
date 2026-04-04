IITM Notes Archive

A fully responsive, offline-first viewer for IITM Data Science course materials. This project provides a clean, data-driven sidebar interface to easily navigate through course content, assignments, and quizzes saved locally using the SingleFileZ extension.

Features

Offline Access: View assignments, tables, and MathJax equations without an active internet connection.

Auto-Generated Navigation: A Node.js build script recursively scans your saved content and builds a nested, collapsible folder tree automatically.

Smart Icons: The UI automatically detects the type of content (Readings, Activity Questions, Graded Assignments, Quizzes) and injects the appropriate color-coded icons.

Responsive Design: Built with Tailwind CSS, featuring a collapsible desktop sidebar and a smooth off-canvas mobile drawer.

How to Update Content

Download your course pages using the SingleFileZ or SingleFile browser extension.

Drop the downloaded .html files into the appropriate nested folders inside the content/ directory (e.g., content/Term-Feb-to-May/Mathematics-II/Week 1/).

Run the sidebar generation script:

node scripts/generate-sidebar.js


Open index.html in your browser (or deploy to GitHub Pages) to view your updated notes!

Disclaimer

This is an unofficial, personal repository. This project is not affiliated with, endorsed by, or sponsored by the Indian Institute of Technology Madras (IITM). All course materials, questions, syllabus content, and related intellectual property belong exclusively to IITM and the respective course instructors. This tool was built solely for personal offline study organization.