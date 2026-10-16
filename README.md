# Estuscia Group — cinematic website (React + TypeScript + Vite)

Black-and-purple financial brand experience: green rising profit graph, money icons, scroll-driven 3D camera journey
(Three.js), GSAP ScrollTrigger scenes, compact glass navbar with scroll-spy, and a working EmailJS contact form.

## Run
    npm install
    npm run dev          # http://localhost:5173
    npm run build        # type-check + production build in /dist
    npm run preview

## Folder structure
    public/                    static files (favicon, robots.txt, sitemap.xml, images/logo.png, images/team/)
    src/
      main.tsx  App.tsx        entry + page composition
      config/                  site.ts (contact details), emailjs.ts (IDs/key), sections.ts (ids + nav)
      data/                    ecosystem.ts, why.ts, team.ts, inquiry.ts  ← edit content here
      types/                   shared TypeScript types
      scene/                   FinanceScene.tsx (3D), state.ts, cameraPath.ts, icons.ts (money icons)
      hooks/                   useJourney (camera path), useScrollSpy, useShown (reveals), useReducedMotion
      utils/                   scroll.ts (no-#hash scrolling), leads.ts (safe browser-local copy)
      components/layout/       Navbar, Footer, Loader
      components/ui/           Split (word reveal), Reveal, Button
      sections/                Hero, About, WhyUs, Ecosystem, Leadership, contact/ (Section, Info, Form, validation)
      styles/                  base, layout, sections, responsive, motion

## Behaviour notes
- The URL never changes when navigating (no #about / #contact). Any stray #hash is cleared on load.
- Reduced-motion users get a static version (no intro, no pinned scenes). If WebGL is unavailable a gradient fallback is used.
- Ecosystem: selecting a brand is click-only; scrolling never changes it.
- On phones "Why Estuscia" is not pinned: items and the pillar graph fade in automatically, then the page scrolls on (no overlap).
- Leadership cards are compact horizontal profiles on phones.
- Leadership cards reveal with a single CSS class on the grid, so all four always appear.

## Contact form (EmailJS)
Service `support_estuscia_2026`, template `template_estuscia_new`, public key in `src/config/emailjs.ts` (override via `.env`, see `.env.example`).
Payload fields: full_name, email, phone, organization, inquiry_type, message, date.
- Name is captured before the form resets; failures show an error (never a false success); duplicate submits are blocked.
- Leads are also copied to this browser's localStorage only (not a CRM). No lead "assignment" is claimed.
- If EmailJS domain restrictions are enabled, add your production domain in the EmailJS dashboard.

## Add / confirm before launch
- Photos: `public/images/team/` → shahzeen-khalid.jpg, akshay-m-a.jpg, riza-mathiyam.jpg, anirudh-menon.jpg (initials until then)
- Favicon: replace `public/favicon.png` (currently the bird mark from the logo)
- `src/config/site.ts`: confirm business-hours wording, the 24-hour response promise and NDA notice
- Footer legal / privacy / disclosure links; exact live-site wording for ecosystem and strength descriptions in `src/data/`
- Not verified from the live site: investment philosophy, vendor capital, industries/portfolio sections (no text was available)
