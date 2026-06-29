# Placeholders to confirm / fill in

Nothing below was invented. Each item is a placeholder awaiting real information.
Most are edited in the **visual editor at `/admin`** (no code needed). A few
(marked _code_) are developer/config items.

Items appear in the content marked like `[EMAIL — PLACEHOLDER]` so they're easy to spot.

## Site Settings (`/admin` → Site Settings)

- [ ] **Logo** — upload the official NBUF-KC logo (`[LOGO]`)
- [ ] **Office ZIP code** — currently `Kansas City, MO [ZIP — PLACEHOLDER]`
- [ ] **Contact email** — `[EMAIL — PLACEHOLDER]`
- [ ] **Phone number** — `[PHONE — PLACEHOLDER]`
- [ ] **Office hours** — `[HOURS — PLACEHOLDER]`
- [ ] **Next Liberation Forum date** — `[NEXT FORUM DATE — PLACEHOLDER]`
- [ ] **Donation link** — optional; leave blank to hide the Donate button
- [ ] **Confirm social URLs** — Facebook (`facebook.com/NBUFKC`) and Instagram
      (`@nationalblackunitedfront_kc`) are pre-filled from the brief; please confirm.

## Home Page (`/admin` → Home Page)

- [ ] **Mission snapshot** — official mission wording (`[MISSION STATEMENT]`)
- [ ] **"Our Work" intro + focus areas** — real descriptions (`[OUR WORK INTRO]`, focus areas)
- [ ] **Hero image** (optional) — `[PHOTO NEEDED]`

## About Page (`/admin` → About Page)

- [ ] **Mission** — `[MISSION]`
- [ ] **Vision** — `[VISION]`
- [ ] **History** — `[HISTORY]`
- [ ] **What We Do** — `[WHAT WE DO]` + program items (`[PROGRAM]`)
- [ ] **Leadership** (optional) — add people; section is hidden until filled (`[PHOTO NEEDED]` per person)

## Updates (`/admin` → Updates)

- [ ] Replace the **three `[SAMPLE]` posts** with real updates, or delete them
- [ ] **Cover images** (optional) — `[PHOTO NEEDED]`

## Partners (`/admin` → Partners)

- [ ] Add real partner organizations (name, blurb, link). Starts empty with an empty-state.

## Resources (`/admin` → Resources)

- [ ] Upload real documents (PDFs/flyers). Starts empty with an empty-state.

## Contact / Maps

- [ ] **Google Maps embed URL** (optional) — Site Settings → Address → Map Embed URL.
      A default map for 7714 Prospect Ave. is shown if left blank.

## Optional / code items

- [ ] **Open Graph share image** — add a default social-share image (_code_:
      add `app/opengraph-image.(png|tsx)`)
- [ ] **Instagram feed embed** — the Resources page links to the profile; a live
      feed embed needs a third-party widget or the Instagram API (_code_)
- [ ] **Production domain** — set `NEXT_PUBLIC_SITE_URL` once the domain is live (_code/config_)

## Credentials to provide (set in Vercel + optionally `.env.local`)

- [ ] `NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN` — from Tina Cloud
- [ ] `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — for the contact form
