# Case Study: BYaML — From Protocol Spec to Ecosystem

> "A YAML-based architecture protocol that grew from spec to core API, schema registry, MCP server, and VSCode plugin."

---

## Overview

| | |
|---|---|
| **Product** | BYaML — Architecture-as-Code protocol (byaml.org) |
| **Builder** | Carlos Cortez (solo → team) |
| **Mode** | Solo (protocol design + tooling) → Team (platform integration) |
| **Duration** | 3+ months |
| **Result** | Protocol v0.3, Core API, Schema Registry, MCP Server, VSCode Plugin |

---

## The VelaraLoop in Action

### DISCOVER
- Identified gap: no standard way to describe cloud architecture that's both human-readable AND machine-parseable
- Analyzed: Terraform (too low-level), TOSCA (too complex), diagrams-as-code (no governance)
- Target: DevOps teams who need architecture documentation that stays in sync with reality

### DEFINE
- Protocol spec (v0.1 → v0.3) with component catalog, relationships, policies
- 10+ SoWs covering: schema, catalog, validation, CLI, MCP integration
- Architecture: schema registry → core API → validation engine → consumers (MCP, plugin, frontend)

### BUILD
- **Schema:** YAML spec with 58+ component types (aws.ec2, aws.s3, etc.)
- **Core API (NestJS):** validation, linting, catalog management, render
- **MCP Server:** 9 tools for AI assistants (generate, validate, cost estimate)
- **VSCode Plugin:** syntax highlighting + validation
- **aws-collectors:** 40 TypeScript + 7 Python collectors for resource discovery
- All built with AI agents (Kiro CLI), spec-driven from SoWs

### SHIP
- byaml-core deployed to AWS Lambda
- Schema published to schema.byaml.org (S3 + CloudFront)
- MCP server published to PyPI (`pip install byaml-finops-mcp`)
- VSCode plugin published to marketplace
- Landing page at byaml.org

### GOVERN
- SoWs in `mega-plan/` (shared with BrickstoreAI — same platform)
- Schema versioned (v0.1 → v0.2 → v0.3)
- Catalog seeded with component data (SoW-044, SoW-045)
- Deploy history tracked in HTML dashboard

### LEARN
- Community feedback: "needs more component types" → led to SoW-050 (expand scan)
- MCP benchmark vs AWS CLI: MCP found $40.50 waste that CLI missed
- Protocol adoption metric: used in 4+ internal projects
- Evolution: BYaML types now used in SOFE for resource classification

---

## Key Metrics

| Metric | Value |
|--------|:-----:|
| Protocol versions | 3 (v0.1 → v0.3) |
| Component types | 58+ |
| Collectors | 47 (40 TS + 7 Python) |
| MCP tools | 9 |
| PyPI packages | 1 (byaml-finops-mcp) |
| Services deployed | 3 (core, schema registry, landing) |

---

## What This Proves

1. **VelaraLoop works for protocol/spec products** — not just apps
2. **Solo→Team transition is natural** — start alone, bring team when scale demands
3. **The DEFINE phase is critical for protocols** — spec IS the product
4. **Ecosystem thinking:** one protocol → multiple consumers (API, MCP, plugin, frontend)
5. **GOVERN phase keeps schema evolution controlled** — versioning prevents breaking changes
