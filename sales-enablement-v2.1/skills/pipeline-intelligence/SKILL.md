---
name: pipeline-intelligence
description: Smart pipeline analytics that learns from deal outcomes over time — identify patterns, predict risks, and surface coaching opportunities from pipeline data. Use this skill whenever a manager wants pipeline insights beyond basic reporting, when analyzing conversion rates, deal velocity, or stage progression, when someone says "why are we losing deals at stage X", "what's wrong with our pipeline", "pipeline trends", or when building data-driven coaching strategies. Also trigger when someone mentions pipeline health, deal velocity, conversion analysis, or RevOps analytics. This is the layer that turns pipeline data into actionable intelligence.
---

# Pipeline Intelligence

Go beyond pipeline reporting into pipeline understanding. Traditional dashboards show you what's happening — this skill tells you why and what to do about it. It learns from your deal outcomes over time, so insights get sharper with each quarter.

## What Makes This Different from Reports

A CRM report says: "Your win rate is 22%."
Pipeline Intelligence says: "Your win rate is 22%, down from 28% last quarter. The drop is concentrated in deals over $100K where you're competing against CompX. Reps who do multi-threaded discovery have a 35% win rate in the same segment. Here are 3 deals in your current pipeline that match the loss pattern — take action this week."

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                 PIPELINE INTELLIGENCE                              │
├─────────────────────────────────────────────────────────────────┤
│  ANALYSES                                                         │
│  1. Pipeline Health — Overall assessment with risk flags         │
│  2. Conversion Analysis — Where and why deals stall/drop        │
│  3. Velocity Analysis — What speeds up or slows down deals      │
│  4. Pattern Detection — Correlations between behaviors & wins   │
│  5. Risk Prediction — Which current deals match loss patterns   │
│  6. Coaching Signals — Data-driven coaching priorities           │
├─────────────────────────────────────────────────────────────────┤
│  LEARNING                                                         │
│  • Updates deal-patterns.md with each analysis                   │
│  • Predictions improve as more outcomes are logged               │
│  • Compares predictions to actuals to calibrate confidence       │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Full pipeline data, stage progression, deal velocity   │
│  + ~~CRM: Rep performance metrics and owner segmentation         │
│  + ~~conversation intelligence (Gong): Call activity per deal    │
│  + ~~conversation intelligence (Gong): Talk patterns vs outcomes │
│  + ~~conversation intelligence (Gong): Competitor mention trends │
│  + ~~data enrichment (ZoomInfo): Pipeline company enrichment     │
│  + ~~data enrichment (ZoomInfo): Tech stack patterns across deals│
│  + ~~data enrichment (Clay): Company signal monitoring           │
│  + ~~data enrichment (LinkedIn): Stakeholder movement tracking   │
│  + ~~chat: Team deal discussions and escalation signals          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "Analyze our pipeline health" (with CSV upload or CRM connection)
- "Why are deals stalling at the demo stage?"
- "Which deals in my pipeline are most at risk?"
- "What separates our top reps from average performers?"
- "Give me a weekly pipeline intelligence briefing"

---

## Execution Flow

### Step 0: Automatic Pipeline Data Pull

**CRITICAL:** Before asking the user for a CSV export or manual data, check what MCP tools are available and pull pipeline data directly.

#### CRM Bulk Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Pull all open deals.** Search the `deals` object type for active pipeline.
   - Filter: `dealstage` NOT IN closed stages (use `get_properties` on `deals` for `dealstage` to discover stage IDs if needed)
   - Request these properties: `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `createdate`, `notes_last_contacted`, `notes_last_updated`, `num_notes`, `hs_deal_stage_probability`, `hs_forecast_amount`, `hs_projected_amount`, `num_contacted_notes`, `hs_lastmodifieddate`
   - Use `limit: 200` and paginate with `offset` if needed to get all deals
   - Use `count_total: true` (via the search) to know the full pipeline size

2. **Pull closed deals for pattern analysis.** Search for recently closed deals (won and lost).
   - Filter by `closedate` in the last 90-180 days
   - Filter by stage for "Closed Won" and "Closed Lost" separately
   - Same properties as above — this provides the historical comparison data

3. **Identify owners.** Use the `search_owners` tool to map `hubspot_owner_id` values to actual rep names.
   - This enables per-rep analysis and coaching signals

4. **Get stage definitions.** Use `get_properties` on `deals` for the `dealstage` property to get all stage names and their order.
   - This lets you build an accurate conversion funnel

#### Computed Metrics (Calculate from CRM Data)

From the raw deal data, compute:
- **Win Rate:** Closed Won / (Closed Won + Closed Lost) for the period
- **Avg Deal Size:** Mean of `amount` across won deals
- **Avg Cycle Length:** Mean days from `createdate` to `closedate` for won deals
- **Pipeline Coverage:** Total open pipeline value / quota target (ask user for quota if not in CRM)
- **Stage Conversion:** Count of deals at each stage / count at previous stage
- **Velocity by Stage:** Average days spent in each stage
- **Deals at Risk:** Open deals where `notes_last_contacted` > 14 days ago, or `closedate` is past due

#### Conversation Intelligence Data Pull (Gong)

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:
1. **Aggregate call activity.** Use `gong_get_call_stats` for the analysis period.
   - Total calls, avg duration, questions per call → team-wide engagement health
   - Compare top performers vs team average → identify coaching signals
2. **Analyze deal-level call patterns.** Use `gong_search_calls` for at-risk deals.
   - Deals with no recent calls → stalling signal
   - Deals with declining call frequency → disengagement signal
   - Deals where competitor was mentioned → competitive risk
3. **Extract talk pattern correlations.** Use `gong_get_call_details` on a sample of won vs lost deals.
   - Talk-to-listen ratios in won vs lost deals → what predicts success
   - Discovery questions in won vs lost → qualification thoroughness correlation
   - Multi-threading (multiple contacts on calls) → engagement breadth
4. **Track competitor trends.** Use `gong_search_calls` with competitor names.
   - Which competitors are coming up most frequently?
   - Are mentions increasing or decreasing vs last period?

#### Sales Intelligence Data Pull (ZoomInfo / Clay / LinkedIn)

**ZoomInfo** (check for tools prefixed with `zoominfo_`):
1. **Enrich pipeline companies.** Use `zoominfo_search_company` on open deal companies.
   - Employee count, revenue, industry → segment pipeline by company profile
   - Growth signals → prioritize deals at growing companies
2. **Identify tech stack patterns.** Use `zoominfo_get_tech_stack` on won vs lost deal companies.
   - Which tech stacks correlate with wins? → refine ICP
   - Competitive tool presence → flag displacement opportunities or risks

**Clay** (check for tools prefixed with `clay_`):
1. **Monitor pipeline company signals.** Use `clay_enrich_company` on top pipeline deals.
   - Funding rounds, hiring surges, leadership changes → buying signals or risk flags
   - Use these to adjust deal probability up or down

**LinkedIn** (check for tools prefixed with `linkedin_`):
1. **Track stakeholder movements.** Use `linkedin_get_profile` for champions in top deals.
   - Champion job change → immediate churn/deal risk
   - Champion promoted → may accelerate deal or change priorities
2. **Monitor prospect companies.** Use `linkedin_search_companies` for pipeline companies.
   - Recent announcements → timing signals for deal acceleration

#### Chat Data Pull

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for recent deal-related discussions in sales channels
2. Look for escalation signals or blockers mentioned by the team
3. Surface competitive threats flagged in conversations

#### Present the Data

Show the user what you pulled before diving into analysis:

> "I pulled **[N] open deals** worth **$[total]** from your CRM, plus **[N] closed deals** from the last [90] days for comparison. Your pipeline has **[N] reps** across **[N] stages**. Running analysis now..."

### Step 1: Analyze and Generate Report

With the raw CRM data in hand, generate the full Pipeline Intelligence Report (format below). Every metric should be computed from actual data, not estimated.

### Step 2: Cross-Reference with Memory

Read `memory/deal-patterns.md` to compare current patterns against historical insights. Flag if current data confirms or contradicts prior predictions.

### Step 3: Store New Insights

After analysis:
- Update `memory/deal-patterns.md` with new conversion rates, velocity benchmarks, and risk patterns
- Update `memory/team.md` with per-rep performance data
- Flag deals that match loss patterns for immediate attention

---

## Output Format: Pipeline Intelligence Report

```markdown
# Pipeline Intelligence Report

**Period:** [Date range]
**Deals Analyzed:** [N]
**Total Pipeline Value:** $[X]

---

## Health Summary

| Metric | Current | Last Period | Trend | Benchmark |
|--------|---------|------------|-------|-----------|
| Win Rate | [X]% | [X]% | ↑↓→ | [Industry avg] |
| Avg Deal Size | $[X] | $[X] | ↑↓→ | |
| Avg Cycle Length | [X] days | [X] days | ↑↓→ | |
| Pipeline Coverage | [X]x | [X]x | ↑↓→ | 3-4x target |
| Stage Conversion (Overall) | [X]% | [X]% | ↑↓→ | |

**Overall Assessment:** [2-3 sentences on pipeline health with the most important insight]

---

## Conversion Funnel

| Stage | Deals | Value | Conversion | Avg Days | Bottleneck? |
|-------|-------|-------|-----------|----------|-------------|
| Qualified | [N] | $[X] | — | — | |
| Discovery | [N] | $[X] | [X]% | [X] | [Yes/No] |
| Demo | [N] | $[X] | [X]% | [X] | [Yes/No] |
| Proposal | [N] | $[X] | [X]% | [X] | [Yes/No] |
| Negotiation | [N] | $[X] | [X]% | [X] | [Yes/No] |
| Closed Won | [N] | $[X] | [X]% | [X] | |

**Biggest Leak:** [Stage] — [X]% of deals and $[X] in value die here
**Root Cause Hypothesis:** [Based on deal patterns and outcomes]
**Recommended Action:** [Specific intervention]

---

## Risk Alerts

Deals that match historical loss patterns:

| Deal | Size | Risk Signal | Confidence | Action |
|------|------|------------|------------|--------|
| [Deal A] | $[X] | [Matches loss pattern: no champion] | [X]% | [What to do] |
| [Deal B] | $[X] | [Risk signal] | [X]% | [Action] |

---

## Pattern Insights

### What Winners Do Differently
1. [Behavior] — Found in [X]% of wins vs [Y]% of losses
2. [Behavior] — [Evidence]
3. [Behavior] — [Evidence]

### Emerging Trends
- [New pattern not previously tracked — flagged for monitoring]

---

## Coaching Priorities

Based on pipeline data, these are the highest-leverage coaching investments:

| Rep | Issue | Evidence | Suggested Coaching |
|-----|-------|---------|-------------------|
| [Rep A] | [Pattern] | [Data] | [Specific coaching conversation] |
| [Rep B] | [Pattern] | [Data] | [Coaching] |
```

---

## Learning Over Time

Pipeline Intelligence improves by comparing predictions to actual outcomes:

1. **Predict:** Flag deals at risk based on current patterns
2. **Track:** Record which flagged deals actually close or lose
3. **Calibrate:** Adjust pattern confidence based on prediction accuracy
4. **Improve:** Refine which signals actually predict outcomes

This creates a flywheel: the more deals flow through the system, the better it gets at identifying risk and opportunity.

---

## Related Skills

- **deal-qualification** → Qualification scores feed pipeline intelligence
- **win-loss-analysis** → Deal outcomes update pattern library
- **sales-coaching** → Pipeline insights drive coaching priorities
- **rep-profile** → Individual patterns tracked per rep
- **gtm-memory** → All patterns stored in deal-patterns.md
