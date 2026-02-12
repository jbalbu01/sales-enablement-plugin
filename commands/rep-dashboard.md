---
description: Generate a personalized rep performance dashboard — skill gaps, pipeline health, coaching priorities, and development recommendations tailored to each rep's profile
argument-hint: "<rep name or 'my dashboard'>"
---

# /rep-dashboard

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Get a personalized performance dashboard for any rep or yourself. Combines pipeline data, skill assessments, deal outcomes, and coaching history into a single view with specific development recommendations.

## Usage

```
/rep-dashboard
/rep-dashboard Sarah
/rep-dashboard my dashboard
```

Then provide the rep's recent data, or let me pull from connected tools.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                      REP DASHBOARD                                  │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                         │
│  ✓ Performance metrics summary (pipeline, win rate, velocity)     │
│  ✓ Skill assessment across core selling competencies              │
│  ✓ Deal pattern analysis (what works, what doesn't)               │
│  ✓ Coaching priorities ranked by impact                           │
│  ✓ Personalized development plan (30/60/90)                       │
│  ✓ Peer benchmarking (anonymous team comparison)                  │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                       │
│  + CRM: Pull pipeline, activity, and deal history                 │
│  + Transcription: Analyze call quality and technique              │
│  + Calendar: Meeting patterns and prospect engagement             │
│  + Chat: Communication patterns and collaboration                 │
├─────────────────────────────────────────────────────────────────┤
│  PERSONALIZATION (adapts to the rep)                               │
│  → Reads rep-profile for skill scores and learning style          │
│  → Adapts recommendations based on experience level               │
│  → Tracks improvement over time against previous dashboards       │
│  → New reps get onboarding-focused view                           │
│  → Experienced reps get mastery-focused view                      │
│  → Managers get team rollup with individual drill-downs           │
└─────────────────────────────────────────────────────────────────┘
```

---

## What I Need From You

Tell me about the rep (or yourself). Include:

- **Recent performance** — Win rate, pipeline size, deals closed
- **Experience level** — New hire, ramping, fully ramped, veteran
- **Known strengths and gaps** — What they're good at, where they struggle
- **Recent deals** — 3-5 recent wins and losses with brief context
- **Role** — AE, SDR, SE, or manager

**Quick mode:** "Dashboard for Sarah — she's a mid-level AE, strong at discovery, struggles with closing, 25% win rate this quarter"

---

## Output: Individual Rep

```markdown
# Rep Dashboard: [Rep Name]

**Role:** [AE/SDR/SE] | **Tenure:** [X months]
**Experience Level:** [New / Ramping / Ramped / Veteran]
**Period:** [Date range]

---

## Performance Summary

| Metric | This Period | Last Period | Trend | Team Avg |
|--------|-----------|------------|-------|----------|
| Pipeline | $[X] | $[X] | ↑↓→ | $[X] |
| Win Rate | [X]% | [X]% | ↑↓→ | [X]% |
| Avg Deal Size | $[X] | $[X] | ↑↓→ | $[X] |
| Avg Cycle Length | [X] days | [X] days | ↑↓→ | [X] days |
| Deals Closed | [N] | [N] | ↑↓→ | [N] |
| Activities | [N] | [N] | ↑↓→ | [N] |
| Quota Attainment | [X]% | [X]% | ↑↓→ | [X]% |

**Overall Assessment:** [2-3 sentences on where this rep stands and the single most impactful thing they can improve]

---

## Skill Profile

| Competency | Score | Trend | Evidence | Priority |
|------------|-------|-------|----------|----------|
| Discovery & Qualification | [1-5] | ↑↓→ | [Specific evidence] | 🟢🟡🔴 |
| Objection Handling | [1-5] | ↑↓→ | [Evidence] | 🟢🟡🔴 |
| Demo & Presentation | [1-5] | ↑↓→ | [Evidence] | 🟢🟡🔴 |
| Negotiation & Closing | [1-5] | ↑↓→ | [Evidence] | 🟢🟡🔴 |
| Pipeline Management | [1-5] | ↑↓→ | [Evidence] | 🟢🟡🔴 |
| Business Acumen | [1-5] | ↑↓→ | [Evidence] | 🟢🟡🔴 |
| Technical Knowledge | [1-5] | ↑↓→ | [Evidence] | 🟢🟡🔴 |
| Competitive Positioning | [1-5] | ↑↓→ | [Evidence] | 🟢🟡🔴 |

**Strengths:** [Top 2 skills — what to lean into]
**Development Areas:** [Top 2 gaps — highest leverage improvements]

---

## Deal Patterns

### What's Working
| Pattern | Evidence | Deals |
|---------|----------|-------|
| [Winning behavior] | [Data-backed] | [Which deals] |

### What's Not Working
| Pattern | Evidence | Impact | Fix |
|---------|----------|--------|-----|
| [Losing pattern] | [Data] | [Revenue at risk] | [Specific behavior change] |

---

## Current Pipeline Health

| Deal | Size | Stage | Health | Risk | Next Step |
|------|------|-------|--------|------|-----------|
| [Deal A] | $[X] | [Stage] | 🟢🟡🔴 | [Risk if any] | [What to do] |

---

## Coaching Priorities (Ranked by Impact)

### #1: [Highest-leverage skill gap]
**Why:** [Data showing impact on performance]
**Evidence:** [Specific deals or patterns]
**Coaching Approach:** [Concrete coaching steps]
**Expected Impact:** [If improved, what changes]

### #2: [Second priority]
[Same structure]

---

## Development Plan

### Next 30 Days
| Week | Focus | Activity | Success Metric |
|------|-------|---------|---------------|
| 1 | [Skill] | [Specific activity] | [Measurable outcome] |
| 2 | [Skill] | [Activity] | [Metric] |
| 3-4 | [Skill] | [Activity] | [Metric] |

### 60-Day Milestone
[What should be different in 60 days if coaching is effective]

### 90-Day Target
[Performance targets based on skill improvement trajectory]

---

## Comparison to Profile Baseline

| Metric | When Profiled | Current | Change |
|--------|-------------|---------|--------|
| Win Rate | [X]% | [X]% | +/-[X]% |
| Avg Deal Size | $[X] | $[X] | +/-$[X] |
| Top Skill | [Skill]: [Score] | [Score] | +/-[X] |
| Gap Skill | [Skill]: [Score] | [Score] | +/-[X] |

[Is this rep improving? Plateauing? Declining? Specific assessment.]
```

---

## Output: Manager / Team View

When a manager runs `/rep-dashboard` without a specific name:

```markdown
# Team Dashboard: [Manager Name]'s Team

**Period:** [Date range]
**Team Size:** [N] reps

## Team Performance Summary
| Metric | Team | Target | Gap |
|--------|------|--------|-----|
| Total Pipeline | $[X] | $[X] | $[X] |
| Team Win Rate | [X]% | [X]% | [X]% |
| Quota Attainment | [X]% | — | — |

## Rep Comparison
| Rep | Pipeline | Win Rate | Cycle | Quota % | Top Strength | Top Gap | Priority |
|-----|----------|---------|-------|---------|-------------|---------|----------|
| [Rep A] | $[X] | [X]% | [X]d | [X]% | [Skill] | [Skill] | 🟢🟡🔴 |

## Coaching Calendar
| Rep | This Week's Focus | Coaching Topic | Prep |
|-----|------------------|---------------|------|
| [Rep] | [Specific deal or skill] | [Topic] | [What to review before 1:1] |
```

---

## Integration with Rep Profile

Every dashboard run:
1. **Reads** existing rep profile for baseline scores and history
2. **Updates** performance metrics and skill assessments
3. **Compares** current performance to previous dashboard
4. **Adjusts** coaching recommendations based on what's changed
5. **Tracks** improvement trajectory for long-term development

---

## Scheduling

- **Weekly:** Generate before manager 1:1s
- **Monthly:** Full dashboard with trend analysis
- **Quarterly:** Deep assessment with updated development plan
- **On-demand:** Before performance reviews or coaching conversations

---

## Tips

1. **Lead with strengths** — Reps respond better when coaching starts with what they do well.
2. **One thing at a time** — Focus coaching on the #1 priority. Trying to fix everything fixes nothing.
3. **Use the data, not opinions** — "Your win rate drops 40% when you skip multi-threaded discovery" is more powerful than "you should do better discovery."
4. **Track over time** — A single dashboard is a snapshot. The trend across dashboards tells the real story.
5. **Self-serve for reps** — Reps can run their own dashboard to self-coach. Not everything needs a manager.
