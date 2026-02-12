---
description: Run a comprehensive audit of your sales enablement content — surface stale assets, identify gaps, score freshness, and build a remediation plan
argument-hint: "<content type or 'full audit'>"
---

# /content-audit

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Audit your sales enablement content library for freshness, completeness, and alignment. The self-healing system identifies what's stale, what's missing, and what needs immediate attention.

## Usage

```
/content-audit
/content-audit battle cards
/content-audit full audit
```

Then describe your content library or let me scan what's available.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                      CONTENT AUDIT                                  │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                         │
│  ✓ Catalog all enablement content with metadata                   │
│  ✓ Score freshness based on age, events, and outcomes             │
│  ✓ Identify content gaps (things reps need but don't have)        │
│  ✓ Check content alignment with current messaging/positioning     │
│  ✓ Build prioritized remediation plan                              │
│  ✓ Estimate effort and assign recommended owners                  │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                       │
│  + Knowledge base: Scan content library for all assets            │
│  + CRM: Check which content gets used in deals                    │
│  + Chat: Find requests for content that doesn't exist             │
│  + Web: Verify competitive claims are still accurate              │
├─────────────────────────────────────────────────────────────────┤
│  SELF-HEALING (automated maintenance)                              │
│  → Reads memory/content-registry.md for tracked assets            │
│  → Applies freshness decay scoring (time + event + outcome)       │
│  → Propagates updates through dependency graphs                   │
│  → Generates refresh tasks automatically                          │
│  → Logs all changes to memory/changelog.md                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## What I Need From You

Options:

- **Describe your content** — List the enablement materials your team has today
- **Upload a content inventory** — CSV or spreadsheet of assets with dates
- **Focused audit** — "Audit our battle cards" or "Check our case studies"
- **Gap analysis** — "What's missing from our enablement library?"
- **Full audit** — "Run a complete content health check"

---

## Output

```markdown
# Content Audit Report

**Date:** [Today]
**Scope:** [Full library / Battle cards / Case studies / etc.]
**Assets Audited:** [N]
**Overall Health Score:** [X/100]

---

## Health Summary

| Status | Count | % of Library |
|--------|-------|-------------|
| 🟢 Current (score 70-100) | [N] | [X]% |
| 🟡 Aging (score 40-69) | [N] | [X]% |
| 🔴 Stale (score 0-39) | [N] | [X]% |
| ⚫ Missing (gap identified) | [N] | — |

---

## Content by Category

### Battle Cards
| Asset | Last Updated | Freshness | Trigger for Decay | Priority |
|-------|-------------|-----------|-------------------|----------|
| [CompA battle card] | [Date] | [Score]/100 | [Competitor launched new feature] | 🔴 Urgent |
| [CompB battle card] | [Date] | [Score]/100 | [Age > 90 days] | 🟡 Soon |

### Case Studies
| Asset | Last Updated | Freshness | Issue | Priority |
|-------|-------------|-----------|-------|----------|
| [Case study X] | [Date] | [Score]/100 | [Customer churned] | 🔴 Remove |
| [Case study Y] | [Date] | [Score]/100 | [Data is 18 months old] | 🟡 Refresh |

### Playbooks
| Asset | Last Updated | Freshness | Issue | Priority |
|-------|-------------|-----------|-------|----------|
| [Playbook A] | [Date] | [Score]/100 | [Pricing changed] | 🔴 Update |

### Email Templates / Talk Tracks / Discovery Guides / ROI Models
[Same format per category]

---

## Content Gaps

Assets that should exist but don't:

| Missing Asset | Why It's Needed | Evidence | Priority | Effort |
|--------------|----------------|----------|----------|--------|
| [Asset type] | [Business reason] | [Reps asking for it, deals lost without it] | 🔴🟡🟢 | [Hours] |

---

## Dependency Impact

Assets where one change triggers cascading updates:

| Changed Asset | Depends On It | Update Needed |
|--------------|--------------|---------------|
| [Pricing page] | Battle cards, proposals, ROI models | [All reference old pricing] |
| [New feature launch] | Playbooks, case studies, demos | [Don't reflect new capability] |

---

## Remediation Plan

### Immediate (This Week)
| # | Action | Asset | Owner | Effort |
|---|--------|-------|-------|--------|
| 1 | [Update/Create/Remove] | [Asset] | [Who] | [Hours] |

### Short-term (This Month)
| # | Action | Asset | Owner | Effort |
|---|--------|-------|-------|--------|
| 1 | [Action] | [Asset] | [Who] | [Hours] |

### Backlog
| # | Action | Asset | Priority | Effort |
|---|--------|-------|----------|--------|
| 1 | [Action] | [Asset] | [Priority] | [Hours] |

---

## Usage Insights (when CRM connected)

| Asset | Times Shared | Win Rate When Used | Recommendation |
|-------|-------------|-------------------|----------------|
| [Asset] | [N] | [X]% | [Keep/Update/Retire] |
```

---

## Scheduling

This command is designed for recurring use:

- **Monthly:** Full content library audit → remediation plan
- **Event-triggered:** Auto-audit when pricing changes, new competitors emerge, or product launches
- **Quarterly:** Deep audit with usage analytics and ROI of content investments

---

## Integration with Content-Health Skill

The `/content-audit` command is the on-demand version of the content-health skill's continuous monitoring:

1. **content-health** runs in the background, tracking freshness and events
2. **/content-audit** surfaces the current state in a structured report
3. Both read from and write to `memory/content-registry.md`
4. Audit findings feed back into the automated freshness scoring

---

## Tips

1. **Audit before you create** — Before building new content, check what exists and what's stale. Refreshing > creating from scratch.
2. **Track the dependencies** — One change (like pricing) can invalidate a dozen assets. The dependency map saves you.
3. **Retire boldly** — Stale content is worse than no content. If a case study features a churned customer, remove it.
4. **Measure content ROI** — When CRM is connected, you can see which content actually correlates with wins. Fund what works.
