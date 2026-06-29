# Getting Started with VelaraLoop

> From zero to shipped product in 1 day. Here's how.

---

## Prerequisites

- A computer with terminal access
- An AI coding agent installed (pick one):
  - [Kiro CLI](https://kiro.dev) (recommended)
  - [Claude Code](https://claude.ai)
  - [Cursor](https://cursor.com)
- A GitHub account
- A deploy target (Vercel, Cloudflare Pages, or similar — all free tier)

---

## Step 1: DISCOVER (15 min)

Create a file `discovery.md` and answer:

```markdown
# Discovery Brief

## Problem
[What problem am I solving? For who?]

## Solution (1 sentence)
[What will I build?]

## Success looks like
[How will I know it worked?]
```

**That's it.** Don't overthink. Write fast. You'll learn more by SHIPPING.

---

## Step 2: DEFINE (30 min)

Create a file `sow.md` using the [SoW Template](../templates/sow-template.md):

```markdown
# SoW-001: [Your Product Name]

## Deliverables
| # | What | Status |
|---|------|:------:|
| 1 | [specific thing] | 🔴 |
| 2 | [specific thing] | 🔴 |

## Phase A: [First chunk of work]
[Describe what to build — specific enough for an AI agent]

## Phase B: [Second chunk]
[...]
```

**Key rule:** Each phase should be completable in 1-2 hours. If it's bigger, split it.

---

## Step 3: BUILD (1-4 hours)

Open your AI agent and give it context:

```
I'm building [product]. Here's my spec:

[paste your sow.md]

Start with Phase A. Use [TypeScript/Python/etc].
```

**Your job during BUILD:**
- Steer the AI (approve/reject suggestions)
- Test as you go
- Commit after each working state

```bash
git add .
git commit -m "phase-a: [what was built]"
```

---

## Step 4: SHIP (15-30 min)

Deploy it live:

```bash
# Option A: Vercel
npx vercel --prod

# Option B: Cloudflare Pages
npx wrangler pages deploy out --project-name=my-project

# Option C: GitHub Pages
git push origin main  # if configured
```

**Verify:** Open the URL. Does it work? Mobile? Share it with someone.

---

## Step 5: GOVERN (10 min)

Create `changelog.md`:

```markdown
# Changelog — 2026-06-29

## What was done
- Phase A: [built X]
- Phase B: [built Y]
- Deployed to: [URL]

## SoW Status
| Phase | Status |
|-------|:------:|
| A | ✅ |
| B | ✅ |
```

Update your SoW: mark phases as ✅.

---

## Step 6: LEARN (10 min)

Ask yourself:
- Did it solve the problem from DISCOVER?
- What would I do differently?
- What's the next loop? (new feature? new product? fix something?)

Write 3 bullet points in your changelog under "## Learnings".

---

## Congratulations 🎉

You just completed your first VelaraLoop. Total time: **2-5 hours**.

You now have:
- ✅ A live product
- ✅ A spec (SoW)
- ✅ A changelog
- ✅ Git history
- ✅ Learnings for next iteration

**Next:** Do it again. Each loop gets faster.

---

## Tips

- **Start small.** Your first loop should be a landing page or simple tool. Not a SaaS.
- **Don't skip GOVERN.** The changelog is what makes you professional.
- **Time-box BUILD.** If Phase A takes >2h, you defined it too broadly. Split next time.
- **Ship imperfect.** A live imperfect product beats a perfect plan every time.
- **Use templates.** They remove decision fatigue. See [/templates](../templates/).
