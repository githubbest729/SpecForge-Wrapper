# SpecForge Wrapper

Local prompt engine and executive brief generator. Zero dependencies, works offline, nothing leaves your browser.

## Use

1. **Prompt staging:** paste a CV and job description, pick a format, click Generate Master Prompt, then copy it into your AI tool.
2. **Brief & PDF:** paste the AI output, check the A4 preview, click Generate Client PDF.
3. **Templates:** edit base instructions under Manage templates. They are stored in localStorage.

## Export a PDF

In the print dialog choose Save as PDF, paper size A4, margins None, and turn off headers and footers.

## Run locally

`npx serve .` (service workers need http://localhost or https).

## Deploy

- GitHub Pages: Settings, Pages, Source: GitHub Actions. The workflow in .github/workflows deploys on push to main.
- Netlify, Vercel or Cloudflare Pages: point at the repo root. Config files are included.

## Before launch

Replace example.com and example.github.io URLs, and fill in .well-known/assetlinks.json and apple-app-site-association if you wrap the app as TWA or iOS.

MIT licensed.
