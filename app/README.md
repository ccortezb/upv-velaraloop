# VelaraLoop — loop.upvelara.com

Guided learning platform for the VelaraLoop 6-phase framework. Users log in with Google, pick a project, and walk through DISCOVER → DEFINE → BUILD → SHIP → GOVERN → LEARN — producing a real deliverable per phase.

Built per **SoW-UPV-008** (`sandrakristell/upv-roadmap/sows/sow-upv-008-velaraloop-platform.md`).

## Stack

- Next.js 16 (App Router, static export) + React 19
- TypeScript + Tailwind CSS v4
- Firebase (Auth + Firestore) — data at `users/{uid}/tools/velaraloop-project`
- Deploy: Cloudflare Pages (loop.upvelara.com)

## Getting started

```bash
pnpm install
cp .env.local.template .env.local   # fill Firebase config
pnpm dev
```

## Build & deploy

```bash
pnpm build      # static export → out/
```

Deploy the `out/` folder to Cloudflare Pages as a new project (`velaraloop-loop`), bound to `loop.upvelara.com`.

## Structure

```
app/
├── app/
│   ├── page.tsx                 # Landing — 6-phase loop, login CTA
│   ├── project/page.tsx         # Project workspace + progress + certificate
│   ├── phases/[phase]/page.tsx  # Guided phase walkthrough (SSG, 6 pages)
│   │   └── PhaseClient.tsx      # Exercise editor + save
│   └── not-found.tsx
├── components/                  # Navbar, GoogleLoginButton, LoopProgress
├── lib/
│   ├── firebase.ts              # Firebase init (client-side only)
│   ├── auth-context.tsx         # Google login + user doc
│   ├── loop-project.ts          # Project store (Firestore + localStorage)
│   └── phases.ts                # 6-phase content (from docs/framework.md)
├── firestore.rules              # Firestore security rules
└── firebase.json
```

## Data model

```
users/{uid}/tools/velaraloop-project
  {
    id, name, description,
    createdAt, updatedAt,
    completedPhases: PhaseId[],
    deliverables: { [phaseId]: string }
  }
```

`completedPhases.length === 6` → completion badge shown.
