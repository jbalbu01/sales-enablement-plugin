---
description: Get an overview of your sales enablement assets, identify gaps, and get recommendations for what to build next
argument-hint: "<optional: specific area to focus on>"
---

# /enablement-dashboard

Audit your sales enablement readiness across all dimensions — content, training, tools, and process. Identifies what you have, what's missing, and what to build next based on impact.

## Usage

```
/enablement-dashboard
```

Optionally specify a focus area: `/enablement-dashboard competitive` or `/enablement-dashboard onboarding`

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                  ENABLEMENT DASHBOARD                             │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                        │
│  ✓ Tell me what you sell and I'll assess enablement readiness    │
│  ✓ Audit content: playbooks, battle cards, case studies, etc.   │
│  ✓ Assess training: onboarding, ongoing, coaching programs      │
│  ✓ Evaluate tools: CRM, enablement platform, content library    │
│  ✓ Gap analysis with prioritized recommendations                │
│  ✓ Buildable action plan using this plugin's skills             │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + Knowledge base: Scan existing documents and content           │
│  + CRM: Assess process adherence and data quality               │
│  + Chat: Understand team communication patterns                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## What I Need From You

Tell me about your sales organization:

1. **What you sell** — Product, pricing, typical deal size
2. **Team size** — How many reps, managers, SDRs
3. **Maturity** — Startup/growth/enterprise, how long the sales team has existed
4. **What you already have** — Existing playbooks, training, content, tools
5. **Biggest challenges** — Where reps struggle, what gaps you're aware of

---

## Output

```markdown
# Sales Enablement Dashboard

**Company:** [Name]
**Product:** [Product]
**Team Size:** [Reps/Managers]
**Assessment Date:** [Date]

---

## Overall Readiness Score: [X/100]

| Category | Score | Status |
|----------|-------|--------|
| Sales Content | [X/25] | 🟢🟡🔴 |
| Training & Coaching | [X/25] | 🟢🟡🔴 |
| Process & Methodology | [X/25] | 🟢🟡🔴 |
| Tools & Technology | [X/25] | 🟢🟡🔴 |

---

## Sales Content Audit

| Asset | Status | Quality | Priority to Build/Update |
|-------|--------|---------|-------------------------|
| Sales Playbook | ✅ Have / ❌ Missing | Good/Fair/Poor | High/Med/Low |
| Battle Cards | ✅ / ❌ | [Quality] | [Priority] |
| Case Studies | ✅ / ❌ | [Quality] | [Priority] |
| ROI Calculator | ✅ / ❌ | [Quality] | [Priority] |
| Email Templates | ✅ / ❌ | [Quality] | [Priority] |
| Proposal Template | ✅ / ❌ | [Quality] | [Priority] |
| Demo Scripts | ✅ / ❌ | [Quality] | [Priority] |
| Objection Library | ✅ / ❌ | [Quality] | [Priority] |
| Buyer Personas | ✅ / ❌ | [Quality] | [Priority] |
| Discovery Guides | ✅ / ❌ | [Quality] | [Priority] |
| Qualification Framework | ✅ / ❌ | [Quality] | [Priority] |
| Pricing Guide | ✅ / ❌ | [Quality] | [Priority] |
| Onboarding Materials | ✅ / ❌ | [Quality] | [Priority] |

---

## Training & Coaching Assessment

| Program | Status | Coverage |
|---------|--------|----------|
| New hire onboarding | ✅ / ❌ | [Description] |
| Product training | ✅ / ❌ | [Description] |
| Sales methodology training | ✅ / ❌ | [Description] |
| Objection handling practice | ✅ / ❌ | [Description] |
| Demo certification | ✅ / ❌ | [Description] |
| Regular coaching (1:1s) | ✅ / ❌ | [Description] |
| Call reviews | ✅ / ❌ | [Description] |
| Win/loss reviews | ✅ / ❌ | [Description] |

---

## Top 5 Priorities

Based on impact and effort, here's what to build next:

### Priority 1: [Asset/Program]
**Impact:** [Why this matters most]
**Effort:** [How long it takes]
**How to Build:** Use the `[skill-name]` skill — just say "[trigger phrase]"

### Priority 2: [Asset/Program]
[Same structure]

### Priority 3-5:
[Brief descriptions]

---

## Quick Wins (Build This Week)

These can be created right now using this plugin:

1. **[Asset]** — Say: "[trigger phrase]" — [15 min]
2. **[Asset]** — Say: "[trigger phrase]" — [20 min]
3. **[Asset]** — Say: "[trigger phrase]" — [10 min]

---

## 30-Day Enablement Plan

| Week | Focus | Deliverables | Skill to Use |
|------|-------|-------------|-------------|
| Week 1 | [Focus area] | [What to build] | [Skill] |
| Week 2 | [Focus area] | [Deliverables] | [Skill] |
| Week 3 | [Focus area] | [Deliverables] | [Skill] |
| Week 4 | [Focus area] | [Deliverables] | [Skill] |
```

---

## Focus Areas

You can deep-dive into specific areas:

- `/enablement-dashboard competitive` — Focus on competitive readiness
- `/enablement-dashboard onboarding` — Focus on new hire enablement
- `/enablement-dashboard content` — Focus on sales content gaps
- `/enablement-dashboard coaching` — Focus on coaching programs
- `/enablement-dashboard process` — Focus on sales methodology and process
