# National Black United Front – Kansas City (NBUF-KC) Website

An accessible, mobile-first community website for NBUF-KC, with a **visual CMS
(TinaCMS)** so non-technical staff can edit every page in the browser. Built with
Next.js (App Router) and deployed on Vercel.

- **Edit content visually:** go to `/admin`, log in, click text on the page, and save.
- **Saving commits to GitHub**, which triggers an automatic redeploy on Vercel.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [How Cameron (or any staff member) edits the site](#how-cameron-edits-the-site)
3. [Local development](#local-development)
4. [One-time setup: Tina Cloud](#one-time-setup-tina-cloud)
5. [One-time setup: Vercel](#one-time-setup-vercel)
6. [Environment variables](#environment-variables)
7. [Contact form (email)](#contact-form-email)
8. [Custom domain](#custom-domain)
9. [Project structure](#project-structure)
10. [Placeholders to fill in](#placeholders-to-fill-in)
11. [Notes & decisions](#notes--decisions)

---

## Tech stack

- **Next.js 15 (App Router) + TypeScript** — strict mode
- **Tailwind CSS v4** — Pan-African color palette as theme tokens (`app/globals.css`)
- **TinaCMS** — visual/inline editing on live pages + an admin at `/admin`; content
  stored in this Git repo as JSON/MDX
- **Resend** — contact-form email (with a no-backend Formspree fallback documented below)
- **next/font** — Montserrat (headings) + Inter (body)

> **Why Next 15 + React 18 (not 16/19)?** TinaCMS is officially tested against
> Next 15 + React 18, and that combination builds and runs cleanly here. See
> [Notes & decisions](#notes--decisions).

---

## How Cameron edits the site

No coding required.

1. Go to **`https://YOUR-DOMAIN/admin`** (e.g. `https://nbufkc.org/admin`).
2. Log in with your Tina Cloud account (you'll be invited once; see Tina setup).
3. You'll see the website with an editing sidebar. Two ways to edit:
   - **Inline:** click directly on headings/text on the page and type.
   - **Forms:** use the left sidebar to open a section (e.g. **Home Page**,
     **Site Settings**, **Updates**) and edit its fields.
4. **Upload images or PDFs:** in any image/file field, click to upload. Files are
   stored in the site's `public/uploads` folder automatically.
5. Click **Save**.

**What happens when you save:** Tina commits your change to the GitHub repository.
Vercel sees the commit and rebuilds the site automatically. Your change is live in
about a minute.

### What you can edit

| Section in `/admin` | Controls |
| --- | --- |
| **Site Settings** | Org name, tagline, logo, address, email, phone, hours, next forum date, social links, optional donation link |
| **Home Page** | Hero, mission, action cards, "Our Work", upcoming forum, contact CTA |
| **About Page** | Mission, vision, history, what we do, optional leadership |
| **Updates (Blog)** | Create/edit/delete posts (title, date, excerpt, cover image, body) |
| **Partners** | Add partner orgs (name, blurb, link) |
| **Resources** | Upload downloadable documents (title, file, type) |

---

## Local development

Requirements: **Node.js 18+** (Node 20/22 recommended) and npm.

```bash
npm install
npm run dev
```

This runs `tinacms dev -c "next dev"`, which starts the Tina content server **and**
Next.js together. Open:

- **Site:** http://localhost:3000
- **Visual editor:** http://localhost:3000/admin

For local dev you don't strictly need Tina Cloud credentials — Tina runs a local
content server. To test the production build locally (no credentials needed):

```bash
npm run build:local
```

> `npm run build` is the **Vercel** build command (`tinacms build && next build`)
> and expects Tina Cloud credentials. `build:local` is the offline equivalent for
> testing on your machine.

Other scripts:

- `npm run lint` — ESLint
- `npm run format` — Prettier

---

## One-time setup: Tina Cloud

Tina Cloud is what lets staff log in at `/admin` and have their edits saved to GitHub.

1. Go to **https://app.tina.io** and sign up (free tier is fine to start).
2. **Create a project** and connect it to the GitHub repo
   **`WCM-LLC/nbufkc`** (authorize Tina's GitHub app for the repo).
3. In the project's settings, copy:
   - **Client ID** → `NEXT_PUBLIC_TINA_CLIENT_ID`
   - A **Read-Only/Content Token** → `TINA_TOKEN`
4. Set the branch to **`main`** → `NEXT_PUBLIC_TINA_BRANCH=main`.
5. **Invite editors** (e.g. Cameron) from the Tina Cloud dashboard so they can log
   in at `/admin`.

You'll put these values into Vercel (next section) and, optionally, a local
`.env.local`.

---

## One-time setup: Vercel

1. Go to **https://vercel.com**, **Add New → Project**, and import the GitHub repo
   **`WCM-LLC/nbufkc`**.
2. Framework preset: **Next.js** (auto-detected). The build command is already
   `tinacms build && next build` (from `package.json`) — leave defaults.
3. Add the **environment variables** (next section) under
   **Settings → Environment Variables** (Production + Preview).
4. Click **Deploy**. Vercel gives you a `*.vercel.app` URL.
5. After the first deploy, every push to `main` (including Tina saves) auto-deploys.

> Do not promote to a production domain until you've reviewed the preview and filled
> in the placeholders.

---

## Environment variables

Copy `.env.example` to `.env.local` for local use, and set the same keys in Vercel.

| Variable | Required | What it's for |
| --- | --- | --- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Yes (for `/admin`) | Tina Cloud project client ID |
| `TINA_TOKEN` | Yes (for `/admin`) | Tina Cloud content token |
| `NEXT_PUBLIC_TINA_BRANCH` | Yes | Git branch Tina reads/writes (`main`) |
| `RESEND_API_KEY` | For contact form | Resend API key |
| `CONTACT_TO_EMAIL` | For contact form | Where messages are delivered |
| `CONTACT_FROM_EMAIL` | Optional | Verified "from" address (defaults to Resend sandbox) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL for SEO/sitemap (e.g. `https://nbufkc.org`) |

**Never commit real secrets.** `.env.local` is git-ignored; `.env.example` is the
template that is committed.

---

## Contact form (email)

The form at `/contact` posts to `app/api/contact/route.ts`, which sends an email via
**Resend**.

1. Create an account at **https://resend.com** and an **API key** → `RESEND_API_KEY`.
2. Set `CONTACT_TO_EMAIL` to the inbox that should receive messages.
3. **Verify a domain** in Resend and set `CONTACT_FROM_EMAIL` to an address on it
   (e.g. `info@nbufkc.org`). Until a domain is verified, Resend only sends from its
   sandbox (`onboarding@resend.dev`) to your own verified address.

**No-backend fallback (Formspree):** if you'd rather not run email server-side,
create a form at **https://formspree.io**, then point the form at your Formspree
endpoint instead of `/api/contact`. In `components/contact-form.tsx`, change the
`fetch("/api/contact", …)` URL to your Formspree URL
(`https://formspree.io/f/XXXX`) and remove the Resend route. No environment
variables needed.

---

## Custom domain

1. In Vercel: **Settings → Domains → Add**, enter your domain (e.g. `nbufkc.org`).
2. Update DNS at your registrar as Vercel instructs (A/CNAME records).
3. Vercel provisions **SSL automatically** (HTTPS).
4. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy so SEO/sitemap URLs
   are correct.

---

## Project structure

```
app/                     Next.js App Router pages
  page.tsx               Home (server) → components/home-content.tsx (live editing)
  about/                 About page
  updates/               Blog list + [slug] detail
  partners/              Partners grid
  resources/             Document downloads + social
  contact/               Contact info + form
  api/contact/route.ts   Contact form email handler (Resend)
  sitemap.ts, robots.ts  SEO
components/              Header, footer, page content, contact form, rich text
content/                 EDITABLE CONTENT (managed by Tina)
  settings/, home/, about/, partners/, resources/, updates/
tina/config.ts           TinaCMS schema (collections/fields)
lib/                     Small helpers (site config, formatting, UI classes)
public/uploads/          Images/PDFs uploaded via Tina
public/admin/            Built visual editor (generated; not committed)
```

---

## Placeholders to fill in

Anything below is a **placeholder** — replace it in `/admin` (Site Settings or the
relevant page). Items are clearly marked in the content with `[... — PLACEHOLDER]`.

- [ ] **Logo** — upload in Site Settings (`[LOGO]`)
- [ ] **Office ZIP code** — Site Settings → Address (`Kansas City, MO [ZIP]`)
- [ ] **Email** — Site Settings (`[EMAIL]`)
- [ ] **Phone** — Site Settings (`[PHONE]`)
- [ ] **Office hours** — Site Settings (`[HOURS]`)
- [ ] **Next Liberation Forum date** — Site Settings (`[NEXT FORUM DATE]`)
- [ ] **Donation link** — Site Settings (optional; empty = hidden)
- [ ] **Mission statement** — Home Page + About Page
- [ ] **Vision statement** — About Page
- [ ] **History** — About Page
- [ ] **"What We Do" / "Our Work" details** — Home + About
- [ ] **Leadership** — About Page (optional; section hidden until added)
- [ ] **Partners** — Partners section (starts empty)
- [ ] **Resources / documents** — Resources section (starts empty)
- [ ] **Updates** — replace the 3 `[SAMPLE]` posts with real content
- [ ] **Photos** — fields marked `[PHOTO NEEDED]` (hero, leadership, post covers)
- [ ] **Google Maps embed** (optional) — Site Settings → Address → Map Embed URL.
      A default map for 7714 Prospect Ave. is shown if left blank.
- [ ] **Social media verification** — confirm Facebook/Instagram URLs are correct
- [ ] **Open Graph share image** (optional) — add a default social-share image

---

## Notes & decisions

- **Next 15 + React 18 (instead of "latest" 16/19).** TinaCMS's tested matrix is
  Next 15 + React 18. On Next 16 / React 19, Tina's transitive dependencies pull a
  second React copy, which is fragile. Next 15 + React 18 builds and runs cleanly,
  which best serves the goals of a clean build and reliable long-term editing. To
  revisit later, bump versions in `package.json` and re-test the build.
- **`NODE_ENV` during builds.** Production builds must run with
  `NODE_ENV=production`. The `build:local` script handles this for offline testing;
  Vercel sets it automatically. (Running `next build` under `tinacms dev` forces
  development mode and triggers spurious Next.js build errors.)
- **Instagram feed embed.** The Resources page links to the Instagram profile. A
  live *feed* embed requires a third-party widget or the Instagram API; add one
  later if desired.
- **No facts were invented.** Names, leadership, history, contact details, partner
  links, and dates are placeholders to be confirmed.
```
```
