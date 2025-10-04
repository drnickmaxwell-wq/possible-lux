PREVIEW PACK (Additive-only)
============================

What this is
------------
- A small set of files that create an additive-only preview route at `/preview/lux`.
- It does NOT modify your existing homepage, header, footer, or brand copy.
- It imports your existing `StickyHeader` and `Footer` so the preview uses your real header/footer.

How to use
----------
1. Unzip or upload the files into the root of your repo on GitHub (Upload files).
2. Commit to a new branch or to the branch you use for previews.
3. Vercel will build a preview. Open `<your-preview-url>/preview/lux`.
4. Review. When happy, we can make a tiny, controlled swap to the homepage.

Important
---------
- These files are additive. If you already have files with the same path, they will be overwritten when you upload — but these are safe components intended to be added if missing.
- If you prefer, create a new branch (e.g. `preview-pack`) and upload there to test safely.

Files included:
- app/preview/lux/page.tsx
- components/effects/brand-gradient.tsx
- components/layout/hero-video-minimal.tsx
- components/layout/hero-video-split.tsx
- components/layout/hero.tsx
- components/ui/ThemeSwitch.tsx

If you want, I can now zip these for you to download.
