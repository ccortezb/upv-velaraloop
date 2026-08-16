# AgentSpec: [Agent Name]

> The "SoW for agents" — VelaraLoop LOOP™ Track B · Agent Engineering.
> Define WHAT the agent does and how it's validated. The machine layer (`agent.config.yaml`) makes it enforceable.

**Agent:** [name] · **Version:** [1.0.0] · **Framework target:** [tinkuy | strands | langgraph | openai-agents | crewai]
**Status:** 🔴 Draft · **Owner:** [you/team] · **Budget reference:** [Tokenfesto or $]

---

## 1. Objective

### What it solves
[1-2 sentences: the problem the agent automates.]

### Success cases (what "works" means)
- [ ] [Given X, when Y → expected Z]
- [ ] [Edge success: ...]

### Failure cases (what must NOT happen)
- [ ] [If X → must not do Y]
- [ ] [Unsafe/expensive/costly path to block]

---

## 2. Tools registry

| Tool | Description | Inputs → Outputs | Cost hint |
|------|-------------|------------------|-----------|
| [tool_name] | [what it does] | [in] → [out] | [$ or tokens] |

> Machine layer: `tools.functions` + `tools.mcp` in `agent.config.yaml`.

---

## 3. Guardrails

| Rule | Enforcement | Action |
|------|-------------|--------|
| Budget per call / run / day / month | `budget.limits` (Sayay) | allow/warn/degrade/block |
| Rate limits, loop detection | `guardrails.loopDetection` | halt/notify |
| PII / injection | `guardrails.input` / `guardrails.pii` | block/redact |
| Kill switch condition | [when to halt the agent] | reject |

> Machine layer: `budget` + `guardrails` in `agent.config.yaml`.

---

## 4. Evaluation

### Golden set (≥10 cases — must pass)
| # | Input | Expected output | Status |
|---|-------|-----------------|:------:|
| 1 | [input] | [expected] | 🔴 |

### Adversarial set (≥5 edge cases — must not break)
| # | Input | Expected resilience | Status |
|---|-------|---------------------|:------:|
| 1 | [jailbreak/cost-spike/empty input] | [must not do X] | 🔴 |

### Metrics (thresholds)
| Metric | Threshold | Source |
|--------|-----------|--------|
| Success rate on golden set | ≥ 90% | eval run |
| Cost per call | ≤ $[X] | Qhaway / `tracing` |
| Latency p95 | ≤ [X]s | Qhaway |
| Guardrail violations | 0 in eval | Sayay |

> Runs as CI/CD gate on every change. Fail → back to DISCOVER/DEFINE.

---

## 5. Deploy + Governance

| Item | Value |
|------|-------|
| Target | [AWS (Bedrock/Strands) | Cloudflare (Workers) | Hybrid | MCP endpoint] |
| Region / edge | [us-east-1 | global] |
| Compliance | [none | SOX | HIPAA | ...] |
| Observability | [Qhaway + OTel exporter] |
| Governance policies | [SOFE policy IDs] |
| Dashboard | [where metrics live] |

---

## Machine layer — agent.config.yaml

```yaml
agent:
  name: [agent-name]
  description: [same as Objective]
  version: "1.0.0"
  framework: [tinkuy|strands|...]

models:
  primary:
    model: [model]
    provider: [openai|anthropic|google|bedrock|ollama|...]
    settings:
      temperature: 0.3
  fallbacks:
    - model: [backup]
      provider: [provider]
  routing:
    strategy: cost-optimized   # priority | cost-optimized | latency-optimized | round-robin | failover

budget:
  enabled: true
  currency: USD
  limits:
    perCall: { maxCostUsd: 0.50, maxTokens: 10000 }
    perRun:  { maxCostUsd: 5.00, maxCalls: 20 }
    perDay:  { maxCostUsd: 50.00 }
    perMonth:{ maxCostUsd: 500.00 }
  softThresholds: [0.7, 0.9]
  onSoftExceeded: downgrade-model
  onHardExceeded: reject

guardrails:
  input:
    - type: sayay-guard
      onViolation: block
  output:
    - type: hallucination-check
      onViolation: warn
  loopDetection:
    enabled: true
    maxIterations: 15
    maxToolCalls: 30
    onDetected: inject-message
  pii:
    enabled: true
    mode: redact

tracing:
  enabled: true
  exporter: otel            # otel | console | langfuse | arize-phoenix | ...
  privacy: metadata-only

tools:
  functions:
    - name: [tool_name]
      description: [what it does]
  mcp:
    - name: [mcp_server]
      transport: stdio      # stdio | sse | streamable-http
      command: npx
      args: ["-y", "@org/mcp-server"]
  maxConcurrent: 5

memory:
  shortTerm: { type: sliding-window, maxMessages: 50 }
  longTerm:
    enabled: true
    backend: [vector-db]     # pinecone | qdrant | ... | memory
  session: { enabled: true }

orchestration:
  mode: single               # single | sequential | hierarchical | swarm | graph

runtime:
  timeoutMs: 300000
  maxRetries: 3
  retryBackoff: exponential
  environment: development   # development | staging | production
  secrets:
    - name: API_KEY
      source: env
```

Validate & translate:
```bash
npx @agentconfig/spec agent.config.yaml
npx @agentconfig/spec agent.config.yaml translate --target tinkuy   # or strands/langgraph/openai-agents/crewai
```

---

*Template: VelaraLoop LOOP™ — `tinkuylabs/agent-config-spec/` for the machine layer (validate/translate). License: Apache-2.0 framework, AgentSpec.md content CC-BY.*
