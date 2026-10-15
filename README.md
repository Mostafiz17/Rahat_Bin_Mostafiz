# Rahat Bin Mostafiz · Portfolio

Personal portfolio site for **Rahat Bin Mostafiz** · Software Engineer & Video Editor, Dhaka, Bangladesh.

**Stack:** React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · Framer Motion · Lenis (smooth scroll)
**Fonts:** DM Sans (body/UI) + Helvetica (display) · only these two
**Build output:** a single self-contained `dist/index.html` (via `vite-plugin-singlefile`)

```bash
npm install     # install dependencies
npm run dev     # local dev server
npm run build   # production build → dist/
npm run preview # preview the production build
```

---

## 🚨 Read this before you publish

The site is visually finished, but it currently ships with **placeholder content that will embarrass you or cost you leads** if it goes live as-is. These are not style opinions, they are real problems:

| # | Issue | Where | Why it matters |
|---|-------|-------|----------------|
| 1 | **Video links are a Rickroll** | `src/data/projects.ts` → `embedId: "dQw4w9WgXcQ"` (×2) | Both video projects open *Never Gonna Give You Up*. A recruiter clicking "Watch showcase" gets pranked. **Fix first.** |
| 2 | **Fake testimonials with real company names** | `src/data/testimonials.ts` | Invented quotes from "Tanvir Ahmed", "Farhan Shakil", "Sadia Chowdhury" are attributed to **Factoryze Technologies, Instaquirk, Binary Physics** · real companies you actually worked with. Publishing fabricated endorsements from real employers is a genuine professional and legal risk. Delete or replace with real, permissioned quotes. |
| 3 | **Contact form doesn't send anything** | `src/components/sections/Contact.tsx` → `onSubmit` | It waits 1.6s, fires confetti, and says *"Message sent! I'll reply within 24 hours."* Nothing is sent. **Every message a visitor writes is silently lost**, and they believe you received it. |
| 4 | **Invented employment dates** | `src/data/experiences.ts` → `period` | `2023 · Present`, `2022 · 2023`, `2021 · 2022` were guessed, not given by you. Verify against your real CV. |
| 5 | **Fabricated projects & metrics** | `src/data/projects.ts` | "NovaFlow", "Echoes of Dhaka", "250K+ organic views", "99+ Lighthouse score", "Sub-100ms API latency" are all invented. Replace with real work, or mark the section as concept work. |
| 6 | **Placeholder photos** | `public/images/` | `rahat.jpg` is an AI-generated stand-in, not you. `about-workspace.jpg`, `project-saas.jpg`, `project-video.jpg` are stock-style fillers. |

---

## ✅ Things to do

### Priority 1 · Blocks launch
- [ ] Replace `public/images/rahat.jpg` with your real photo (keep the filename · navbar, hero, preloader and mobile menu all read it automatically)
- [ ] Replace both `embedId` values in `src/data/projects.ts` with your real YouTube IDs
- [ ] Delete or replace every entry in `src/data/testimonials.ts`
- [ ] Connect the contact form to a real backend (see AI prompts below)
- [ ] Verify the three `period` dates in `src/data/experiences.ts`
- [ ] Swap the 6 placeholder projects for your real work (title, description, tags, links, metrics)

### Priority 2 · Content polish
- [ ] Replace `about-workspace.jpg` with a real photo of your desk/setup
- [ ] Add real project screenshots (replace `project-saas.jpg`, `project-video.jpg`)
- [ ] Review skill percentages in `src/data/skills.ts` · they are estimates
- [ ] Host a real PDF resume and point the Download Resume buttons at it (currently a `mailto:` request)
- [ ] Update the stat counters in `src/data/personalInfo.ts` (`3+ years`, `50+ videos`, etc.) with true numbers

### Priority 3 · Launch readiness
- [ ] Buy/connect a domain and deploy (`dist/` is a single HTML file · works on Netlify, Vercel, GitHub Pages, any static host)
- [ ] Add a real Open Graph preview image (`index.html` references `og:image` but no file exists yet)
- [ ] Add Google Analytics or Plausible if you want traffic data
- [ ] Test on a real phone (iOS Safari + Android Chrome), not just a browser emulator
- [ ] Run Lighthouse and check accessibility + performance scores
- [ ] Add a `favicon.ico` fallback for older browsers (currently SVG-only)

### Priority 4 · Nice to have
- [ ] Blog or "Notes" section for writing
- [ ] Detailed case-study pages per project
- [ ] Bengali (বাংলা) language toggle
- [ ] Downloadable showreel / video portfolio section

---

## 🤖 What you can do with AI

Copy-paste these prompts to extend the site. Each one is scoped so the AI changes only what you intend.

### Fix the launch blockers
```
Wire my contact form to Formspree. My endpoint is https://formspree.io/f/XXXXX.
Show a real error state if the request fails, and only show the success
message + confetti after the server actually confirms delivery.
```
```
Remove all testimonials and the entire testimonials section from the page,
including the import in App.tsx and the data file.
```
```
Replace the 6 placeholder projects with these real ones: [paste your project
name, description, tech tags, live URL, GitHub URL, and YouTube ID for each].
```

### Content & data
```
Update my experience section: [paste real job titles, companies, exact start
and end dates, and 3 bullet points of what you actually did at each].
```
```
Add a new section called "Services" after About, with pricing tiers for
web development and video editing. Match the existing card style.
```
```
Change the hero tagline to "[your text]" and update the typewriter roles to
cycle through: [role 1], [role 2], [role 3].
```

### Design & layout
```
Make the dark mode warmer · less blue, more neutral charcoal. Keep the
light mode exactly as it is.
```
```
Add a new accent color option and let me switch between 3 color themes
(indigo, emerald, orange) with a small palette picker in the navbar.
```
```
The hero feels too tall on small phones. Reduce vertical spacing below
640px only · don't touch desktop.
```

### Features
```
Add a project detail page. Clicking a project card opens a full case study
with problem, process, screenshots and results. Use React Router.
```
```
Add a blog section that reads Markdown files from a /content folder,
with a listing page and individual post pages.
```
```
Add a language toggle for English and Bengali. Keep all existing animations.
```

### Performance & quality
```
Audit this site for accessibility issues and fix them · focus on color
contrast, keyboard navigation, and screen reader labels.
```
```
The bundle is large because images are inlined. Switch to separate image
files with lazy loading and modern formats (WebP/AVIF).
```
```
Add unit tests for the scroll utility and the theme context using Vitest.
```

### Useful AI tools for the rest
- **Writing project descriptions** · paste your raw notes, ask for a tight 2-line version
- **Resume PDF** · ask AI to draft it from your experience data, then export from Google Docs
- **Image cleanup** · background removal / upscaling for your portrait and screenshots
- **Alt text** · ask AI to write descriptive alt text for each image (good for SEO + accessibility)
- **SEO meta** · ask for optimized title/description tags for `index.html`

### Tips for better AI results
1. **Always say "don't change the desktop version"** if you only want mobile edits · otherwise both get touched.
2. **Give real data, not "make something up"** · that's how the Rickroll and fake testimonials got in here.
3. **Ask one thing at a time.** Big multi-part requests are where mistakes hide.
4. **Ask it to verify:** *"run the build and confirm it passes"* before you trust the result.
5. **Ask what it changed and why** · if the answer is vague, review the diff yourself.

---

## 📁 Where to change what

| I want to change... | Edit this file |
|---|---|
| Name, bio, tagline, emails, socials, stats | `src/data/personalInfo.ts` |
| Projects (titles, tags, links, videos) | `src/data/projects.ts` |
| Work history | `src/data/experiences.ts` |
| Skills & percentages | `src/data/skills.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Colors, fonts, type scale, shadows | `src/index.css` (top section) |
| Page section order | `src/App.tsx` |
| Nav links | `src/components/layout/Navbar.tsx` |
| Mobile bottom action bar | `src/components/ui/MobileFloatingBar.tsx` |
| SEO tags, favicon | `index.html` |
| Photos | `public/images/` |

### Design tokens
Colors live as CSS variables in `src/index.css`. Dark mode is the default.

| Token | Light | Dark (bluish) |
|---|---|---|
| Background | `#FAFAFA` | `#060A13` |
| Text | `#111827` | `#EDF1F8` |
| Card | `#FFFFFF` | `#0C1526` |
| Accent | `#4F46E5` | `#6366F1` |

Gradients are used **only** in the page background (`.bg-wash`). Everything else is solid.

---

## 📱 Mobile vs Desktop

Desktop and mobile are the same codebase, split by Tailwind breakpoints (`md:` = 768px+).

**Mobile-only:** bottom floating action bar, profile card in the drawer menu, full-width buttons, compacted tabs, photo-first hero order, softer white gradient.
**Desktop-only:** custom cursor, 3D tilt cards, mouse parallax, split hero layout, alternating timeline, hover effects.

When editing, use `md:` / `lg:` prefixes to target desktop and unprefixed classes for mobile-first defaults.
