---
description: Get an instant competitive intelligence briefing — recent moves, positioning shifts, new threats, and recommended responses across your competitive landscape
argument-hint: "<competitor name or 'all'>"
---

# /competitive-pulse

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Get a real-time competitive intelligence pulse. This command aggregates signals from across your GTM stack and the web to surface what competitors are doing and what you should do about it.

## Usage

```
/competitive-pulse
/competitive-pulse CompetitorX
/competitive-pulse all
```

Then describe which competitors to focus on, or say "all" for a full landscape scan.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPETITIVE PULSE                                │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                         │
│  ✓ Web research on competitor activity and announcements          │
│  ✓ Positioning analysis based on public messaging                 │
│  ✓ Comparison against your current battle cards                   │
│  ✓ Risk assessment for active pipeline deals                      │
│  ✓ Recommended talking points and counter-positioning             │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                       │
│  + CRM: Surface deals where this competitor is present            │
│  + Chat: Find recent internal mentions of competitors             │
│  + Knowledge base: Check if existing collateral needs updating    │
│  + Web search: Latest news, press releases, product launches      │
├─────────────────────────────────────────────────────────────────┤
│  LEARNING (compounds over time)                                    │
│  → Reads from memory/competitors.md for baseline intelligence     │
│  → Updates memory/competitors.md with new signals detected        │
│  → Flags stale battle cards via content-health skill              │
│  → Tracks competitive trends across multiple pulse runs           │
└─────────────────────────────────────────────────────────────────┘
```

---

## What I Need From You

Tell me which competitors to monitor. Options:

- **Single competitor:** "Give me a pulse on CompetitorX"
- **Landscape scan:** "All competitors" or "Full landscape"
- **Deal-specific:** "We're competing against CompX and CompY in the Acme deal"
- **Segment-specific:** "What are competitors doing in the enterprise segment?"

**Quick mode:** "/competitive-pulse CompetitorX" — I'll scan and brief you.

---

## Output

```markdown
# Competitive Pulse: [Date]

**Scope:** [Single competitor / Full landscape]
**Period:** Last [30] days
**Overall Threat Level:** 🟢 Stable / 🟡 Elevated / 🔴 High

---

## Executive Summary

[3-4 sentences: Most important competitive developments and their impact on your pipeline. Lead with what requires immediate action.]

---

## Competitor Activity

### [Competitor A]

**Threat Level:** 🟢🟡🔴
**Recent Moves:**
| Date | Signal | Source | Impact |
|------|--------|--------|--------|
| [Date] | [What happened] | [Where we found it] | [How it affects us] |

**Positioning Shifts:**
[Has their messaging changed? New claims? New target segments?]

**Deals at Risk:**
| Deal | Size | Stage | Risk | Action |
|------|------|-------|------|--------|
| [Deal] | $[X] | [Stage] | [Why this competitor threatens it] | [What to do] |

**Recommended Response:**
1. [Specific action to counter this competitor's moves]
2. [Updated talking point or positioning]

---

## Landscape Changes

| Trend | Evidence | Impact | Action |
|-------|----------|--------|--------|
| [New entrant / Acquisition / Pivot] | [Evidence] | [High/Med/Low] | [Response] |

---

## Battle Card Health

| Battle Card | Last Updated | Status | Action Needed |
|-------------|-------------|--------|---------------|
| [Competitor A] | [Date] | 🟢 Current / 🟡 Aging / 🔴 Stale | [Update needed?] |

---

## Recommended Actions

### Immediate (This Week)
1. [Most urgent competitive action]

### Short-term (This Month)
1. [Strategic response]

### Monitor
1. [Trend to watch]

---

## Intelligence Gaps

Things we don't know that could matter:
1. [Unknown and how to find out]
```

---

## Scheduling

This command is designed to run on a schedule:

- **Weekly:** Automated competitive landscape scan → summary to Slack
- **On-demand:** Deep dive on specific competitor before a deal
- **Event-triggered:** Auto-run when a competitor is mentioned in a lost deal

---

## Integration with Memory

Every pulse run:
1. **Reads** `memory/competitors.md` for baseline intelligence
2. **Compares** new findings to stored intelligence
3. **Updates** `memory/competitors.md` with confirmed new signals
4. **Flags** content assets that need refreshing via content-health
5. **Logs** trends to `memory/changelog.md` for longitudinal tracking

---

## Tips

1. **Run weekly** — Competitive intelligence degrades fast. Weekly pulses keep you current.
2. **Pair with deal reviews** — Run `/competitive-pulse CompX` before a deal review where CompX is in play.
3. **Feed wins and losses** — After a competitive deal closes, update the competitive memory. Patterns emerge over time.
4. **Watch the gaps** — The "Intelligence Gaps" section is as important as what you know. Unknown unknowns lose deals.
