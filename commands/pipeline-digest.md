---
description: Generate a weekly pipeline intelligence digest — health metrics, risk alerts, coaching signals, and recommended actions for managers and RevOps
argument-hint: "<team, segment, or 'all'>"
---

# /pipeline-digest

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Get a data-driven pipeline digest that goes beyond reporting into actionable intelligence. Designed for weekly team meetings, 1:1s, and forecast calls.

## Usage

```
/pipeline-digest
/pipeline-digest enterprise team
/pipeline-digest Q2 forecast
```

Then provide pipeline data (upload CSV, paste from CRM, or describe your deals).

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    PIPELINE DIGEST                                  │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                         │
│  ✓ Pipeline health assessment from provided data                  │
│  ✓ Stage conversion and velocity analysis                         │
│  ✓ Risk flagging based on deal pattern matching                   │
│  ✓ Coaching recommendations per rep                               │
│  ✓ Forecast scenarios (best / likely / worst)                     │
│  ✓ Recommended actions prioritized by impact                      │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                       │
│  + CRM: Pull live pipeline data and deal history                  │
│  + Chat: Surface deal-related conversations and blockers          │
│  + Calendar: Upcoming meetings that signal deal momentum          │
│  + Transcription: Recent call insights per deal                   │
├─────────────────────────────────────────────────────────────────┤
│  LEARNING (compounds over time)                                    │
│  → Reads from memory/deal-patterns.md for historical context      │
│  → Reads rep-profile data to tailor coaching signals              │
│  → Compares current patterns to past wins/losses                  │
│  → Updates memory/deal-patterns.md with new pattern observations  │
│  → Tracks prediction accuracy to improve confidence scoring       │
└─────────────────────────────────────────────────────────────────┘
```

---

## What I Need From You

Provide your pipeline data. Options:

- **Upload CSV/Excel** with deal data (company, size, stage, close date, owner, age)
- **Paste from CRM** — Copy deal list from your CRM view
- **Describe key deals** — Walk me through your top 10-15 deals
- **Segment focus** — "Just look at enterprise deals" or "Focus on Q2 close dates"

---

## Output

```markdown
# Pipeline Digest: Week of [Date]

**Prepared for:** [Manager / Team]
**Pipeline Coverage:** [X]x (target: 3-4x)
**Total Pipeline:** $[X] across [N] deals
**Forecast Commit:** $[X] | **Best Case:** $[X]

---

## Health Snapshot

| Metric | This Week | Last Week | Trend | Status |
|--------|-----------|-----------|-------|--------|
| Total Pipeline | $[X] | $[X] | ↑↓→ | 🟢🟡🔴 |
| New Pipeline Created | $[X] | $[X] | ↑↓→ | |
| Pipeline Moved Forward | $[X] | $[X] | ↑↓→ | |
| Pipeline Slipped | $[X] | $[X] | ↑↓→ | |
| Win Rate (Rolling 90d) | [X]% | [X]% | ↑↓→ | |
| Avg Deal Cycle | [X] days | [X] days | ↑↓→ | |
| Avg Deal Size | $[X] | $[X] | ↑↓→ | |

**Bottom Line:** [2-3 sentences — what does this data tell us about pipeline health this week?]

---

## Deals That Need Attention

### 🔴 At Risk (Act Now)

| Deal | Size | Stage | Days in Stage | Risk Signal | Action |
|------|------|-------|--------------|------------|--------|
| [Deal] | $[X] | [Stage] | [N] | [Why it's at risk] | [What to do this week] |

### 🟡 Watch List (Monitor Closely)

| Deal | Size | Stage | Concern | Next Step |
|------|------|-------|---------|-----------|
| [Deal] | $[X] | [Stage] | [Concern] | [Action] |

### 🟢 Momentum (Accelerate)

| Deal | Size | Stage | Positive Signal | How to Capitalize |
|------|------|-------|----------------|-------------------|
| [Deal] | $[X] | [Stage] | [What's going well] | [Push harder here] |

---

## Conversion Funnel

| Stage | Deals | Value | Conversion → Next | Avg Days | vs. Benchmark |
|-------|-------|-------|------------------|----------|---------------|
| [Stage 1] | [N] | $[X] | [X]% | [N] | ↑↓→ |
| [Stage 2] | [N] | $[X] | [X]% | [N] | ↑↓→ |

**Bottleneck:** [Stage] — [X]% of pipeline value is stuck here. [Root cause hypothesis and action.]

---

## Forecast View

| Category | Value | Confidence | Notes |
|----------|-------|-----------|-------|
| Committed | $[X] | High | Deals with verbal/written commitment |
| Best Case | $[X] | Medium | Commit + likely upside |
| Pipeline | $[X] | Low | Everything else |
| **Weighted Forecast** | **$[X]** | | Probability-adjusted |

**Gap to Quota:** $[X] — [What needs to happen to close the gap]

---

## Coaching Signals

| Rep | Pattern | Evidence | Suggested Coaching |
|-----|---------|---------|-------------------|
| [Rep] | [Specific weakness pattern] | [Data-backed evidence] | [Coaching action for 1:1] |

---

## This Week's Priorities

1. **[Highest-impact action]** — [Deal/Context] — [Owner]
2. **[Second priority]** — [Context] — [Owner]
3. **[Third priority]** — [Context] — [Owner]
```

---

## Scheduling

This command is designed for recurring use:

- **Weekly:** Auto-generate digest before Monday pipeline meetings
- **Before forecast calls:** Generate forecast-focused view
- **1:1 prep:** Generate rep-specific digest before manager 1:1s

---

## Integration with Memory

Every digest:
1. **Reads** `memory/deal-patterns.md` for historical loss/win patterns
2. **Reads** rep profiles to personalize coaching signals
3. **Compares** current pipeline shape to historical patterns
4. **Updates** `memory/deal-patterns.md` with any new pattern observations
5. **Tracks** prediction accuracy (which risk flags resulted in actual losses?)

---

## Tips

1. **Use weekly** — Pipeline intelligence is a habit, not an event. The patterns get clearer over time.
2. **Focus on actions** — Reading the digest isn't the point. Taking the recommended actions is.
3. **Bring to 1:1s** — The coaching signals section is designed for manager-rep conversations.
4. **Challenge the forecast** — If the gap to quota is large, have an honest conversation about what's realistic.
