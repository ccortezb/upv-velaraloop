export type PhaseId = "discover" | "define" | "build" | "ship" | "govern" | "learn";

export interface PhaseExercise {
  prompt: string;
  outputLabel: string;
  placeholder: string;
  toolUrl?: string;
  toolLabel?: string;
}

export interface Phase {
  id: PhaseId;
  number: number;
  name: string;
  tagline: string;
  summary: string;
  activities: string[];
  frameworks: string[];
  output: string;
  aiAssists: string;
  exercise: PhaseExercise;
}

export const PHASES: Phase[] = [
  {
    id: "discover",
    number: 1,
    name: "DISCOVER",
    tagline: "Understand the problem",
    summary:
      "User research, market audit, problem statement, and opportunity sizing. Know what you're solving and why it matters before you build anything.",
    activities: [
      "User research (interviews, surveys, data analysis)",
      "Market & competitor audit",
      "Problem statement definition",
      "Opportunity sizing & validation",
    ],
    frameworks: ["Double Diamond", "JTBD", "Lean Canvas", "Opportunity Solution Tree"],
    output: "Discovery Brief (1-pager)",
    aiAssists: "Research summarization, competitor analysis, persona generation",
    exercise: {
      prompt: "Write a one-page Discovery Brief for the product you want to ship.",
      outputLabel: "Discovery Brief",
      placeholder:
        "Problem: ...\nWho has this problem: ...\nWhy now: ...\nCompetitors: ...\nOpportunity size: ...\nEvidence this is worth solving: ...",
      toolUrl: "https://kit.upvelara.com/tools/discovery-canvas",
      toolLabel: "Open Discovery Canvas tool →",
    },
  },
  {
    id: "define",
    number: 2,
    name: "DEFINE",
    tagline: "Write the spec",
    summary:
      "Statement of Work, user stories, architecture decisions, prioritized backlog, and success metrics. This is where VelaraLoop diverges — write specs, give them to an AI agent, ship same day.",
    activities: [
      "Statement of Work (SoW) with phases & deliverables",
      "User stories (INVEST format)",
      "Architecture & technical decisions",
      "Prioritized backlog (RICE, MoSCoW, or Kano)",
      "Success metrics (OKRs, North Star Metric)",
    ],
    frameworks: ["Story Mapping", "RICE", "MoSCoW", "OKRs", "Kano Model", "Spec-Driven Development"],
    output: "SoW + Prioritized Backlog (ready for AI execution)",
    aiAssists: "SoW drafting, user story generation, architecture diagrams",
    exercise: {
      prompt: "Write a SoW for your product with phases and deliverables.",
      outputLabel: "Statement of Work",
      placeholder:
        "Product: ...\nGoal: ...\nPhase A: ...\nPhase B: ...\nPhase C: ...\nDeliverables: ...\nSuccess metrics: ...",
      toolUrl: "https://kit.upvelara.com/tools/progress-dashboard",
      toolLabel: "Track SoWs in Progress Dashboard →",
    },
  },
  {
    id: "build",
    number: 3,
    name: "BUILD",
    tagline: "Execute with AI agents",
    summary:
      "Open a coding agent (Kiro, Claude Code, Cursor) with the spec. AI generates code; you review and steer. Test as you go. Commit with messages that reference SoW + phase.",
    activities: [
      "Open coding agent (Kiro, Claude Code, Cursor) with the spec",
      "AI generates code; you review and steer",
      "Test as you go (AI runs tests too)",
      "Commit with meaningful messages (reference SoW + phase)",
    ],
    frameworks: ["Sprint Planning", "Definition of Done", "Sprint Velocity"],
    output: "Working code (committed, tested)",
    aiAssists: "Code generation, test authoring, refactoring. Knowing WHAT to ask, not HOW to code.",
    exercise: {
      prompt: "Define your sprint: what will the AI agent build first?",
      outputLabel: "Sprint Plan",
      placeholder:
        "Sprint goal: ...\nFirst slice (smallest shippable piece): ...\nDefinition of Done: ...\nWhich agent will you use: ...",
      toolUrl: "https://kit.upvelara.com/tools/sprint-board",
      toolLabel: "Plan sprints in Sprint Board →",
    },
  },
  {
    id: "ship",
    number: 4,
    name: "SHIP",
    tagline: "Deploy to production",
    summary:
      "Build & deploy (Vercel, Cloudflare, AWS, Docker). Verify mobile, performance, SSL. Domain + DNS setup. Announce to stakeholders or users.",
    activities: [
      "Build & deploy (Vercel, Cloudflare, AWS, Docker)",
      "Verify: works on mobile? Performance? SSL?",
      "Domain + DNS setup",
      "Announce to stakeholders / users",
    ],
    frameworks: ["Release Checklist", "Feature Flags", "Canary/Blue-Green Deploys"],
    output: "Live URL / Published product",
    aiAssists: "Deploy commands, config troubleshooting, DNS setup",
    exercise: {
      prompt: "Write your release checklist before you ship.",
      outputLabel: "Release Checklist",
      placeholder:
        "Live URL: ...\nPlatform: ...\n[] Build passes\n[] Mobile check\n[] Performance check\n[] SSL / domain ok\n[] Announced to: ...",
    },
  },
  {
    id: "govern",
    number: 5,
    name: "GOVERN",
    tagline: "Track what was done",
    summary:
      "Write a changelog, update SoW status, track versions in git, record deploys, update the kanban. Real products need governance — who did what, when, why.",
    activities: [
      "Write changelog (what was delivered, when, why)",
      "Update SoW status (phases → ✅)",
      "Version tracking (git commits with SoW references)",
      "Deploy history (dashboards, records)",
      "Kanban board updated",
    ],
    frameworks: ["Burndown/Burnup", "Changelogs", "Version Control", "Kanban"],
    output: "Changelog + SoW update + Deploy record",
    aiAssists: "Changelog drafting from commit history, status tracking",
    exercise: {
      prompt: "Write the changelog entry for what you just shipped.",
      outputLabel: "Changelog Entry",
      placeholder:
        "# Session YYYY-MM-DD\n\n## [Product]\n- What was delivered\n- When\n- Why\n\nDeploy: ...\nSoW status updated: ...",
    },
  },
  {
    id: "learn",
    number: 6,
    name: "LEARN",
    tagline: "Measure and iterate",
    summary:
      "Check metrics (views, signups, revenue, engagement). Gather feedback. Run experiments. Retrospective. Decide: iterate current or discover new? The loop closes — LEARN feeds back into DISCOVER.",
    activities: [
      "Check metrics (views, signups, revenue, engagement)",
      "Gather user feedback",
      "Run experiments (A/B tests, feature flags)",
      "Sprint retrospective",
      "Decide: iterate current? Or discover new?",
    ],
    frameworks: ["OKR Review", "Pirate Metrics (AARRR)", "NPS", "PMF Test", "Retention Curves"],
    output: "Learnings doc + Next sprint priorities",
    aiAssists: "Metric analysis, feedback clustering, retrospective notes",
    exercise: {
      prompt: "Write your learnings and decide what's next.",
      outputLabel: "Learnings + Next Priorities",
      placeholder:
        "Metrics that moved: ...\nUser feedback: ...\nWhat worked: ...\nWhat didn't: ...\nNext sprint priorities: ...\n[ ] Iterate current product\n[ ] Discover new problem",
      toolUrl: "https://kit.upvelara.com/tools/okr-dashboard",
      toolLabel: "Track OKRs in the dashboard →",
    },
  },
];

export const PHASE_ORDER: PhaseId[] = PHASES.map((p) => p.id);

export function getPhase(id: string): Phase | undefined {
  return PHASES.find((p) => p.id === id);
}
