# Case Study: cortez.cloud — Personal Brand Site with CDK

> "A personal website with CDK infrastructure, dynamic feeds API, and slide curator — shipped solo."

---

## Overview

| | |
|---|---|
| **Product** | cortez.cloud — Personal website for Carlos Cortez (AWS Hero) |
| **Builder** | Carlos Cortez |
| **Mode** | Solo |
| **Duration** | 2 weeks (5 dev versions) |
| **Result** | Live site, CDK infra, S3+CloudFront, Lambda feeds updater, 10 sections |

---

## The VelaraLoop in Action

### DISCOVER
- Need: professional online presence as AWS Community Hero
- Requirements: bilingual, dark mode, dynamic content (blog feeds, talks, slides)
- Constraint: must be serverless (minimal cost), deployable from CLI

### DEFINE
- 5 incremental versions planned (cc-dev-0.1 → 0.5)
- Each version = clear scope (setup → sections → feeds → curators → AI section)
- Architecture: Next.js static export → S3 bucket + CloudFront CDN
- Second bucket for dynamic content (feeds JSON, slide PDFs)

### BUILD
- **v0.1:** Dark mode, bilingual, 10 sections (Hero, About, Projects, Blog, etc.)
- **v0.2:** Pre-built feeds (Dev.to + Medium + YouTube)
- **v0.3:** CDK infrastructure (Python CDK stack)
- **v0.4:** Lambda feeds updater + LinkedIn/Talks curators
- **v0.5:** AI & Open Source section + stats bar
- All built with AI agents, each version on a feature branch

### SHIP
- Deployed via `npm run build` → `aws s3 sync` → CloudFront invalidation
- CDK manages: 2 S3 buckets, CloudFront distribution, Lambda, Route53
- Domain: cortez.cloud (Route53 + ACM certificate)
- Live: https://cortez.cloud

### GOVERN
- 5 branches tracked (cc-dev-0.1 to 0.5)
- Deployment documented in DEPLOY.md
- SoW written (sow-cortezcloud-* in cc-roadmap)
- Progress tracked in cc-command deploy-history.html

### LEARN
- Feeds auto-update works (Lambda scheduled)
- Slide curator saves time for talk uploads
- Bilingual toggle skipped (English primary, works fine)
- Next: integrate SOFE/FinOptix badges, add blog post previews

---

## Key Metrics

| Metric | Value |
|--------|:-----:|
| Versions shipped | 5 |
| Sections | 10 |
| Infrastructure | CDK (Python), 2 S3 buckets, CloudFront, Lambda |
| Monthly cost | ~$1-2 (S3 + CF free tier) |
| Deploy method | CLI (1 command) |
| Branches | 7 (5 dev + 2 feature) |

---

## What This Proves

1. **VelaraLoop works for personal brand projects** — not just B2B/SaaS
2. **Incremental versions (branches)** = natural VelaraLoop loops
3. **Infrastructure IS product** — CDK stack is as much a deliverable as the UI
4. **Low cost + high quality** is achievable with spec-driven AI development
5. **The GOVERN pattern (branches + deploy docs)** makes even personal projects maintainable
