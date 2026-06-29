# Case Study: FinOptix — AI Model from Hackathon to Product

> "A 14-billion parameter FinOps AI model built in a weekend for $8 total cost."

---

## Overview

| | |
|---|---|
| **Product** | FinOptix-14B — SLM specialized in FinOps reasoning |
| **Builder** | Carlos Cortez |
| **Mode** | Solo |
| **Duration** | 1 weekend (hackathon) + ongoing roadmap |
| **Result** | Fine-tuned model, HuggingFace Space, GGUF published, 6 hackathon badges |

---

## The VelaraLoop in Action

### DISCOVER
- Identified: no small language model specialized in cloud FinOps
- Market: FinOps practitioners need AI that understands cost optimization, not generic ChatGPT
- Opportunity: HuggingFace hackathon (deadline-driven)
- Analyzed: existing FinOps tools lack AI reasoning layer

### DEFINE
- Scope: fine-tune a 14B model on FinOps data (audit reports, cost recommendations)
- Training plan: Unsloth + LoRA on T4 GPU
- Dataset: 5K gold examples (synthetic + curated)
- Deliverable: model on HuggingFace + demo Space + blog post

### BUILD
- Fine-tuned Qwen-2.5-14B with FinOps domain data
- Used Unsloth for efficient training (4-bit quantization)
- Created Gradio demo app (HuggingFace Space)
- Converted to GGUF for local inference
- Total compute cost: $3.50 (training) + $4.00 (GGUF) + $0.58 (Space) = **$8.08**

### SHIP
- Model published: `ccortezb/FinOptix-14B` on HuggingFace
- GGUF published: `ccortezb/FinOptix-14B-GGUF` (8.99 GB, Q4_K_M)
- Space live: HuggingFace demo with Gradio
- YouTube demo recorded
- Blog published on HuggingFace

### GOVERN
- All training artifacts versioned
- Blog documents the process (reproducible)
- Cost breakdown tracked ($8.08 total)
- 6 hackathon badges earned (documented)

### LEARN
- Model performs well on FinOps queries but needs more training data
- GGUF enables local inference (no API costs for users)
- Integration path: SOFE findings → FinOptix explains them in natural language
- Roadmap: 6 model versions planned (Finemma-4B → Finomotrix-49B)

---

## Key Metrics

| Metric | Value |
|--------|:-----:|
| Model size | 14B parameters |
| Training cost | $3.50 |
| Total cost | $8.08 |
| Time to ship | 1 weekend |
| HuggingFace badges | 6 |
| GGUF size | 8.99 GB |
| Blog published | Yes (HF blog) |

---

## What This Proves

1. **VelaraLoop works for AI/ML products** — not just web apps
2. **Speed matters:** hackathon deadline forces DISCOVER→SHIP in 48h
3. **Cost discipline is a feature** — $8 total tracked as part of GOVERN
4. **Solo Mode with AI agents** — used AI for dataset curation + blog writing
5. **LEARN feeds forward** — model roadmap (6 versions) came from post-hackathon analysis
