---
name: win-loss-analysis
description: Analyze won and lost deals to identify patterns, improve win rates, and refine sales strategy. Use this skill whenever a rep or manager wants to understand why deals were won or lost, identify trends in pipeline outcomes, review deal performance over time, says "why did we lose that deal", "analyze our win rate", "what do our wins have in common", "post-mortem on this deal", or when conducting quarterly business reviews. Also trigger when someone uploads CRM export data for deal analysis, or when building training materials based on historical deal outcomes.
---

# Win/Loss Analysis

Turn deal outcomes into actionable insights. Understanding why you win and lose is the fastest way to improve your sales process, coaching, and competitive strategy. This isn't about blame — it's about patterns.

## Why This Matters

Most teams track win rate as a number but don't systematically learn from it. Win/loss analysis reveals:
- Which competitors you beat and which beat you (and why)
- What discovery patterns lead to wins vs. losses
- Where deals stall and die in your pipeline
- Which rep behaviors correlate with better outcomes
- How pricing, timing, and stakeholder engagement affect close rates

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    WIN/LOSS ANALYSIS                               │
├─────────────────────────────────────────────────────────────────┤
│  MODES                                                            │
│  1. Single Deal — Post-mortem on one specific deal               │
│  2. Batch Analysis — Analyze a set of deals from CSV/CRM         │
│  3. Pattern Finder — Identify trends across wins and losses      │
│  4. Competitive Insight — Win/loss rates by competitor            │
│  5. Rep Performance — Analysis by rep (for managers)             │
├─────────────────────────────────────────────────────────────────┤
│  INPUT OPTIONS                                                    │
│  • Describe a deal and what happened                             │
│  • Upload a CSV export from your CRM                             │
│  • Paste deal notes or CRM data                                  │
│  • Connect CRM for automatic data pull                           │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Won/lost deal data with all properties                 │
│  + ~~CRM: Contact roles and company profiles per deal            │
│  + ~~CRM: Stage progression timing and conversion rates          │
│  + ~~CRM: Rep performance comparison across deals                │
│  + ~~conversation intelligence (Gong): Call transcripts for deals│
│  + ~~conversation intelligence (Gong): Talk ratios and topics    │
│  + ~~conversation intelligence (Gong): Competitor mentions       │
│  + ~~data enrichment (ZoomInfo): Company data for lost prospects │
│  + ~~data enrichment (LinkedIn): Champion job changes post-loss  │
│  + ~~chat: Internal deal discussion and feedback                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "We lost the Acme deal — help me understand why"
- "Analyze these 50 deals and tell me what our wins have in common"
- "What's our win rate against Competitor X?"
- "Why do our deals stall at the proposal stage?"
- "Build a win/loss report for Q4"

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking the user to describe a deal or provide CSV data, check what MCP tools are available and pull deal data automatically. Data-driven win/loss analysis beats anecdotal recall every time.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

**For Single Deal Post-Mortem:**
1. **Find the deal.** Search `deals` for the company/deal name.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `createdate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `hs_deal_stage_probability`, `closed_lost_reason`, `closed_won_reason`, `notes_last_contacted`, `num_notes`
2. **Pull associated contacts.** Get contacts tied to the deal.
   - Properties: `firstname`, `lastname`, `jobtitle`, `email`, `phone`, `company`, `lifecyclestage`
   - Map roles: Who was the champion? Economic buyer? Technical evaluator? Blocker?
3. **Pull associated company.** Get company data.
   - Properties: `name`, `domain`, `industry`, `numberofemployees`, `annualrevenue`, `description`, `founded_year`
4. **Calculate deal timeline.** Days from `createdate` to `closedate`, time spent in each stage if stage history available.

**For Batch Analysis / Pattern Finder:**
1. **Pull all closed deals.** Search `deals` for Closed Won and Closed Lost stages in the target period.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `createdate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `closed_lost_reason`, `closed_won_reason`
2. **Compute aggregate metrics:**
   - Win rate = Closed Won / (Closed Won + Closed Lost)
   - Avg deal size by outcome (Won vs Lost)
   - Avg cycle length by outcome
   - Loss reason distribution (from `closed_lost_reason`)
3. **Pull contacts and companies for top deals.** Enrich with contact titles and company profiles.
   - Identify: Most common buyer titles in wins vs losses
   - Identify: Company size/industry patterns in wins vs losses
4. **Segment by rep.** Use `hubspot_owner_id` + `search_owners` to compute per-rep win rates.
   - Flag reps with significantly above/below average win rates

**For Competitive Insight:**
1. **Search deals mentioning competitors.** Filter by `description` or custom competitor field.
2. **Calculate competitive win rates.** Win rate when Competitor A is involved vs Competitor B vs no competitor.

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

**For Single Deal Post-Mortem:**
1. **Find calls for this deal.** Use `gong_search_calls` with the company name and deal date range.
2. **Pull transcripts.** Use `gong_get_transcript` on key calls (first discovery, demo, negotiation).
3. **Analyze call quality.** Use `gong_get_call_details` for:
   - Talk-to-listen ratio on discovery calls (was the rep listening enough?)
   - Question count (did they run good discovery?)
   - Competitor mentions (was the competition discussed?)
   - Topics covered (were key objections addressed?)
4. **Correlate call patterns to outcome.** Did poor discovery lead to the loss? Did strong demo lead to the win?

**For Batch Analysis:**
1. **Pull call stats for reps with highest and lowest win rates.** Use `gong_get_call_stats`.
2. **Compare patterns.** Use `gong_get_call_details` on 5-10 calls from top performers vs bottom:
   - Do top performers ask more implication questions?
   - Do they have better talk-to-listen ratios?
   - Do they confirm next steps more consistently?

#### Sales Intelligence Data Pull

**ZoomInfo** (if available):
1. **For lost deals:** Use `zoominfo_search_company` to get current data on lost prospect companies.
   - Did the company recently grow or shrink? (May explain timing)
   - What's their tech stack? (May reveal competitive or integration factors)

**LinkedIn** (if available):
1. **Check champion movement.** Use `linkedin_search_leads` to see if your champion at lost deals has changed jobs.
   - Champions leaving is a common hidden loss reason
2. **Check company trajectory.** Use `linkedin_search_companies` for recent news, hiring trends.

#### Chat Data Pull

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for the deal/company name in sales channels
2. Look for internal discussion about the deal — win/loss context reps shared informally
3. Surface any retrospective notes or team feedback

#### Present What You Found

> "I pulled **[N] closed deals** from the last [period] — **[N] won** ($[X] total) and **[N] lost** ($[X] total), for a **[X]% win rate**. Top loss reasons: **[reason 1]** ([N] deals), **[reason 2]** ([N] deals). I found **[N] Gong calls** across these deals. Per CRM, [Rep A] has the highest win rate at [X]% and [Rep B] the lowest at [X]%. Running the full analysis now..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the tools couldn't provide:
- **For single deal:** Qualitative context — what happened behind the scenes? What's not in the CRM?
- **For batch analysis:** Any specific angle to focus on? (competitor, stage, rep, time period)
- **Mode preference:** Single deal, batch, competitive, or rep performance analysis?

### Step 2: Generate Analysis

Build using ALL evidence. Cite sources throughout: "Per CRM:", "Per Gong (call 1/15):", "Per ZoomInfo:", "Per LinkedIn:", "Per Slack:", "User reported:"

### Step 3: Store Insights

- Update `memory/deal-patterns.md` with newly identified win and loss patterns
- Update `memory/competitors.md` with competitive win/loss data
- Update `memory/team.md` with rep-specific patterns from the analysis
- Log the analysis in `memory/changelog.md`

---

## Single Deal Post-Mortem

### What I Need (When Tools Aren't Connected)

Tell me everything about the deal:
- Company, deal size, timeline
- Who was involved (your side and theirs)
- What happened at each stage
- Why it was won or lost
- Competitors involved
- Any red flags you noticed in hindsight

### Output Format

```markdown
# Deal Post-Mortem: [Company Name]

**Outcome:** [Won / Lost / No Decision]
**Deal Size:** $[amount]
**Sales Cycle:** [Duration]
**Competitor:** [Who you competed against]
**Rep:** [Name]

---

## Timeline

| Date | Event | Impact |
|------|-------|--------|
| [Date] | [First meeting] | [Initial impression] |
| [Date] | [Key event] | [Positive/negative turning point] |
| [Date] | [Decision] | [Outcome] |

---

## What Went Right
1. [Strength — with specific evidence]
2. [Strength]

## What Went Wrong
1. [Issue — with specific evidence and what could have been done differently]
2. [Issue]

## Root Cause Analysis

**Primary reason for [win/loss]:** [The single biggest factor]

**Contributing factors:**
- [Factor 1]
- [Factor 2]

---

## Qualification Assessment (Retroactive)

| MEDDIC Criterion | Score at Close | Should Have Been |
|-----------------|---------------|-----------------|
| Metrics | [0-5] | [0-5] |
| Economic Buyer | [0-5] | [0-5] |
| Decision Criteria | [0-5] | [0-5] |
| Decision Process | [0-5] | [0-5] |
| Identify Pain | [0-5] | [0-5] |
| Champion | [0-5] | [0-5] |

---

## Lessons Learned

1. **[Lesson]** — [How to apply this to future deals]
2. **[Lesson]** — [Application]
3. **[Lesson]** — [Application]

## If You Could Replay This Deal

[Specific advice on what to do differently, starting from the first interaction]
```

---

## Batch Analysis

When analyzing multiple deals (from CSV upload or description):

```markdown
# Win/Loss Analysis: [Period or Description]

**Deals Analyzed:** [Count]
**Win Rate:** [X]%
**Average Deal Size:** $[X] (Won) / $[X] (Lost)
**Average Cycle Length:** [X] days (Won) / [X] days (Lost)

---

## Win Patterns

Deals you won share these characteristics:
1. **[Pattern]** — Found in [X]% of wins vs [Y]% of losses
2. **[Pattern]** — [Evidence]
3. **[Pattern]** — [Evidence]

## Loss Patterns

Deals you lost share these characteristics:
1. **[Pattern]** — Found in [X]% of losses
2. **[Pattern]** — [Evidence]
3. **[Pattern]** — [Evidence]

## Competitive Breakdown

| Competitor | Deals | Wins | Losses | Win Rate | Key Differentiator |
|-----------|-------|------|--------|----------|-------------------|
| [Comp A] | [N] | [N] | [N] | [X]% | [Why you win/lose] |
| [Comp B] | [N] | [N] | [N] | [X]% | [Why you win/lose] |
| No Competitor | [N] | [N] | [N] | [X]% | [Status quo] |

## Stage Analysis

| Stage | Deals Entering | Conversion | Avg Time | Bottleneck? |
|-------|---------------|------------|----------|-------------|
| Discovery | [N] | [X]% | [Days] | [Yes/No] |
| Demo | [N] | [X]% | [Days] | [Yes/No] |
| Proposal | [N] | [X]% | [Days] | [Yes/No] |
| Negotiation | [N] | [X]% | [Days] | [Yes/No] |
| Closed | [N] | — | — | — |

---

## Recommendations

### Quick Wins (This Quarter)
1. [Actionable recommendation with expected impact]
2. [Recommendation]

### Strategic Changes (Next Quarter)
1. [Larger initiative based on patterns]
2. [Initiative]

### Enablement Gaps
1. [Training or tool need identified from analysis]
2. [Gap]
```

---

## CSV Format

If uploading a CRM export, the more fields the better. Useful columns include:
- Company name, deal size, close date
- Win/loss status, loss reason
- Competitor, rep name
- Days in pipeline, stage progression dates
- Number of stakeholders, champion identified
- Discovery quality score (if tracked)

I'll work with whatever columns you have.

---

## Related Skills

- **deal-qualification** — Apply lessons learned to better qualify future deals
- **sales-coaching** — Turn win/loss insights into coaching conversations
- **battle-cards** — Update competitive intel based on win/loss patterns
- **playbook-builder** — Refine playbooks based on what actually works
