
# ⚙️ SpecForge Wrapper

![Version](https://img.shields.io/badge/version-2.0-blue) ![Architecture](https://img.shields.io/badge/architecture-local--first-success) ![Tech](https://img.shields.io/badge/tech-Vanilla_JS-orange)

SpecForge Wrapper is an offline, zero-dependency Prompt Engine and PDF Staging Application built specifically for Executive Search Founders and their Associates. It bridges the gap between raw candidate data and polished, AI-generated client deliverables without exposing proprietary workflows to external API integrations.

## 🎯 Purpose & Real-World Application

The core bottleneck in executive search operations is repetitive prompt engineering and document formatting. SpecForge Wrapper eliminates this by localizing the "house style." 

Instead of typing out instructions for every candidate, the app instantly wraps raw CVs and Job Descriptions into highly optimized system prompts. Once the AI generates the brief, the app's secondary engine instantly parses the Markdown output into a perfectly formatted, client-ready A4 PDF. 

## 🏗️ System Architecture

SpecForge Wrapper operates 100% in the browser. No external databases, no API calls, and zero data leaves your local machine.

*   **Frontend Engine:** Vanilla HTML5, CSS3, and ES6+ JavaScript.
*   **Data Persistence:** Utilizes `localStorage` (Schema v2) to save custom prompt templates, executive voice rules, and active workflow sessions.
*   **Offline Layer (PWA):** A cache-first Service Worker (`sw.js`) intercepts network requests, ensuring the application functions perfectly on a flight or offline.
*   **Print Engine:** An aggressively optimized `@media print` CSS stylesheet overrides the dark UI, enforces A4 dimensions, strips margins, and renders Markdown tables and hierarchies for native browser PDF export.

## ⚙️ Core Workflow & Functions

| Phase | Feature | Operational Function |
| :--- | :--- | :--- |
| **1. Ingest** | **Session Memory** | Paste Candidate CVs and Job Descriptions. Save the combination as a named session to reload active searches instantly. |
| **2. Wrap** | **Template Engine** | Select a format (e.g., *Executive Brief*, *Market Intelligence*). The app wraps the raw text in strict "house style" instructions to prevent AI hallucination. |
| **3. Handoff** | **1-Click AI Triggers** | Use the `Ctrl/Cmd + Enter` shortcut, then click **Copy & Open Claude/ChatGPT** to instantly hand off the master prompt to your preferred LLM. |
| **4. Format** | **Markdown Parser** | Paste the AI's output back into the app. The right-hand panel instantly parses the Markdown into a clean, hierarchical document. |
| **5. Deliver** | **PDF Generator** | Toggle the configurable "Confidential Header," click Generate, and export a flawless A4 PDF ready for client inbox delivery. |

## 🚀 Run Locally

```bash
# Using Node.js
npx serve .

# OR using native Python
python3 -m http.server 8080

```

*Note: Service workers require `localhost` or HTTPS to function properly.*

## 🌍 Deploy

**GitHub Pages:** Push to `main`, then navigate to your repository's *Settings → Pages → Source: GitHub Actions*. The included `.github/workflows/deploy.yml` will automatically publish the site.

**Vercel / Netlify / Cloudflare Pages:** Import the repository. There is no build step required; the publish directory is the repository root. Configuration files (`vercel.json`, `netlify.toml`, and `_headers`) are pre-included.

## 🖨️ Exporting the Perfect PDF

When you click **Generate Client PDF**, the browser's native print dialog will open. To ensure the styling works exactly as engineered, configure the following settings:

1. **Destination:** Save as PDF
2. **Paper Size:** A4
3. **Margins:** None
4. **Headers and Footers:** OFF (The app generates its own dynamic confidential headers on the page).

## ⚠️ Pre-Launch Checklist

* Replace `example.com` and `example.github.io` URLs in `robots.txt`, `sitemap.xml`, and `.well-known/security.txt`.
* If wrapping the app as an Android TWA or iOS app, fill in `.well-known/assetlinks.json` and `apple-app-site-association`.

## ⚖️ License

MIT License

```

```
