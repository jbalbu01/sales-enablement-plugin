---
name: gtm-memory
description: Persistent intelligence layer that accumulates deal knowledge, competitive intel, product context, and team patterns over time — making every other skill smarter with use. This skill should ALWAYS be checked at the start of any GTM-related task. It reads from and writes to a structured knowledge base so that insights from one conversation carry into the next. Use this skill on every interaction that involves sales, marketing, CS, partnerships, or RevOps context. Also trigger proactively when the user shares deal outcomes, competitive intel, product updates, rep feedback, or customer insights — capture it even if they didn't ask you to.
---

# GTM Memory

The intelligence backbone of the sales enablement system. Every other skill reads from this memory and writes back to it, creating a compounding loop where the system gets smarter with every deal, call, and interaction.

## Why This Exists

Traditional enablement creates content and hopes people use it. This system learns from what actually happens in the field — which talk tracks win deals, which discovery questions reveal the most, which objections trip reps up, which competitors keep winning in specific segments — and feeds those insights back into every future interaction.

The result: a plugin that's meaningfully better on day 90 than day 1.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      GTM MEMORY                                   │
├─────────────────────────────────────────────────────────────────┤
│  KNOWLEDGE STORE (persists across sessions)                      │
│  📁 memory/                                                      │
│  ├── product.md        — Product details, features, pricing      │
│  ├── competitors.md    — Competitive landscape + intel log       │
│  ├── icp.md            — ICP definition + refinements over time  │
│  ├── deal-patterns.md  — Win/loss patterns, what works           │
│  ├── objections.md     — Objection library with effectiveness    │
│  ├── team.md           — Rep profiles, strengths, development    │
│  ├── content-registry.md — All enablement assets + freshness    │
│  └── changelog.md      — All updates with timestamps             │
├─────────────────────────────────────────────────────────────────┤
│  WORKING MEMORY (CLAUDE.md — always in context)                  │
│  • Current priorities and focus areas                            │
│  • Recent insights not yet integrated                            │
│  • Active deals requiring attention                              │
│  • Stale content flags                                           │
│  • Cross-references to memory/ files                             │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Deal outcomes auto-seeding win/loss patterns           │
│  + ~~CRM: Contact roles populating buyer committee knowledge     │
│  + ~~CRM: Company profiles enriching ICP definitions             │
│  + ~~conversation intelligence (Gong): Call patterns & talk tracks│
│  + ~~conversation intelligence (Gong): Objection frequency data  │
│  + ~~conversation intelligence (Gong): Discovery question library│
│  + ~~competitive intel (ZoomInfo): Competitor profiles & updates  │
│  + ~~competitive intel (ZoomInfo): Tech stack intelligence        │
│  + ~~data enrichment (Clay): Company signals & enrichment        │
│  + ~~data enrichment (LinkedIn): Stakeholder career movements    │
│  + ~~chat: Field feedback and tribal knowledge capture            │
│  + ~~calendar/email: Engagement patterns and correspondence      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Execution Flow

### Step 0: Automatic Data Pull (Seed and Refresh Memory from Connected Tools)

**CRITICAL:** GTM Memory is dramatically more valuable when seeded from real data. Before relying solely on user-provided context, pull from connected tools to populate memory files with evidence-based intelligence.

#### CRM Data Pull (Seeds: deal-patterns.md, icp.md, team.md)

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Seed deal-patterns.md.** Pull all Closed Won and Closed Lost deals from the last 6-12 months.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `createdate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `closed_lost_reason`, `closed_won_reason`
   - Compute: win rate, avg deal size, avg cycle, win rate by segment/pipeline
   - Extract: top loss reasons, top win reasons, stage conversion rates
2. **Seed icp.md.** Pull companies associated with won deals.
   - Properties: `name`, `industry`, `numberofemployees`, `annualrevenue`, `description`
   - Cluster: What profile wins most? Build data-driven ICP definition.
3. **Seed team.md.** Use `search_owners` to list all reps.
   - Cross-reference with deal data: win rates per rep, avg deal sizes, cycle lengths
   - Identify top performers and patterns in their deals
4. **Seed icp.md buyer committee.** Pull contacts from won deals.
   - Properties: `firstname`, `lastname`, `jobtitle`
   - Pattern: Most common titles in won deals → buying committee definition

#### Gong Data Pull (Seeds: deal-patterns.md, objections.md, product.md)

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

1. **Seed objections.md.** Use `gong_search_calls` with common objection keywords.
   - Frequency of each objection type across all calls
   - How top reps handle each objection (verbatim from transcripts)
2. **Seed deal-patterns.md with talk patterns.** Use `gong_get_call_stats` for top performers.
   - Talk-to-listen ratios, questions per call, topics covered → what works
3. **Seed product.md with value props.** Use `gong_get_transcript` on won-deal calls.
   - Which value propositions and features come up in won deals?
   - What do customers say they value most? (in their own words)
4. **Build discovery question library.** Extract questions from top-performer discovery calls.
   - What do the best reps ask that others don't? → feeds discovery guides

#### Sales Intelligence Data Pull (Seeds: competitors.md, icp.md)

**ZoomInfo** (if available):
1. **Seed competitors.md.** Use `zoominfo_search_company` on known competitors.
   - Company profiles, employee counts, tech stacks, market positioning
2. **Validate icp.md.** Use `zoominfo_search_company` on best customer profiles.
   - Industry benchmarks, company context, tech stack patterns

**Clay** (if available):
1. **Enrich competitor profiles.** Use `clay_enrich_company` on competitors.
   - Growth signals, funding, recent changes → competitive context

**LinkedIn** (if available):
1. **Track stakeholder movements.** Use `linkedin_get_profile` for known champions and buyers.
   - Job changes (champion leaves → churn risk signal)
2. **Monitor competitor activity.** Use `linkedin_search_companies` for competitor updates.
   - Product launches, hiring surges, strategic announcements

#### Chat Data Pull (Seeds: all memory files)

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for tribal knowledge: "what works", "we win when", "we lose when" in sales channels
2. Surface competitive intel shared informally by reps
3. Capture product feedback, feature requests, and pricing discussions
4. Look for rep coaching conversations that reveal skill gaps → team.md

#### Calendar/Email Data Pull

If calendar/email tools are available:
1. Analyze meeting patterns — who meets with prospects most, engagement cadence
2. Check for materials exchanged that should be in the content registry

#### Present What You Found

> "Memory seed/refresh complete. Auto-populated from connected tools: [If CRM:] **[N] deals** analyzed — **[X]% win rate**, **$[X] avg deal size**, top loss reasons: **[reasons]**. ICP: **[profile]**. **[N] reps** profiled. [If Gong:] **[N] objections** catalogued from **[N] calls**. Top-performer patterns identified. [If ZoomInfo:] **[N] competitor** profiles enriched. [If Slack:] **[N] tribal knowledge** items captured. Memory files updated — the system is now **[X]% richer** than last session."

### Step 1: Gather Remaining Context

After the auto-pull, capture what tools can't provide:
- **Product positioning** — How do you describe what you sell? (if product.md is empty)
- **Strategic context** — Current priorities, market shifts, upcoming launches
- **Qualitative patterns** — What do your best reps do that data doesn't capture?
- **Historical context** — Past deals, lost customers, lessons learned

### Step 2: Update Memory Files

Write ALL new intelligence into the appropriate memory files. Use structured formats defined in the Memory File Formats section below. Always append new data with timestamps — never overwrite historical entries. Cite sources: "Per CRM ([N] deals):", "Per Gong:", "Per ZoomInfo:", "Per Slack:", "User reported:"

### Step 3: Log and Summarize

- Add timestamped entry to `memory/changelog.md` documenting all updates
- Update `CLAUDE.md` working memory with current priorities and fresh insights
- Report to user: what was learned, what changed, what needs human input

---

## How It Works

### Reading (Before Any Task)

Before generating any enablement content, check relevant memory files:

1. **Building a battle card?** → Read `competitors.md` + `deal-patterns.md` + `objections.md`
2. **Prepping discovery?** → Read `icp.md` + `deal-patterns.md` + `team.md` (for rep's skill level)
3. **Coaching a rep?** → Read `team.md` (rep profile) + `deal-patterns.md`
4. **Building a proposal?** → Read `product.md` + `icp.md` + `competitors.md`
5. **Any task?** → Read `CLAUDE.md` for current context and priorities

This means a battle card built on day 90 incorporates 90 days of deal outcomes, competitive encounters, and field feedback — not just what the user told you in this one conversation.

### Writing (After Any Interaction)

After completing any GTM task, capture new intelligence:

```
Did we learn something new about:
✓ A competitor? → Update competitors.md
✓ What works in deals? → Update deal-patterns.md
✓ An objection and what beats it? → Update objections.md
✓ A rep's skill gap or strength? → Update team.md
✓ The product or pricing? → Update product.md
✓ The ICP or personas? → Update icp.md
✓ A new content asset was created? → Update content-registry.md
Always → Add timestamped entry to changelog.md
```

### Proactive Capture

When the user shares information casually — "we lost the Acme deal to Competitor X because of their API" — capture it even if they didn't ask you to. Say: "Got it — I've logged that competitive loss pattern. This will inform future battle cards and deal reviews."

---

## Memory File Formats

### product.md
```markdown
# Product Knowledge

**Last Updated:** [Date]

## Product Overview
[What we sell, in one paragraph]

## Key Features
| Feature | Description | Differentiator? |
|---------|-------------|----------------|
| ... | ... | Yes/No |

## Pricing
[Current pricing model and tiers]

## Recent Changes
| Date | Change | Impact on Selling |
|------|--------|------------------|
| ... | ... | ... |

## Value Propositions (Ranked by Effectiveness)
1. [VP that wins most often] — Win rate: [X]%
2. [VP2] — Win rate: [X]%
```

### competitors.md
```markdown
# Competitive Intelligence

**Last Updated:** [Date]

## [Competitor A]
**Last Intel:** [Date]
**Win Rate Against:** [X]%
**Key Differentiators:** [Theirs vs ours]

### Recent Intel
| Date | Source | Intel | Impact |
|------|--------|-------|--------|
| ... | Deal: [Name] | [What we learned] | [Updated battle card?] |

### What Beats Them
[Patterns from won deals]

### Where They Beat Us
[Patterns from lost deals]
```

### deal-patterns.md
```markdown
# Deal Patterns

**Last Updated:** [Date]
**Deals Analyzed:** [N]

## Win Patterns
1. [Pattern] — Confidence: [High/Med] — Evidence: [N] deals
2. ...

## Loss Patterns
1. [Pattern] — Confidence: [High/Med] — Evidence: [N] deals
2. ...

## Stage Conversion Insights
| Stage Transition | Success Factor | Failure Factor |
|-----------------|----------------|----------------|
| Discovery → Demo | [What works] | [What fails] |
| Demo → Proposal | ... | ... |

## Emerging Trends
[New patterns not yet confirmed]
```

### content-registry.md
```markdown
# Content Registry

All enablement assets with freshness tracking.

| Asset | Type | Created | Last Updated | Freshness | Trigger for Refresh |
|-------|------|---------|-------------|-----------|-------------------|
| [Battle Card: CompA] | battle-card | [Date] | [Date] | 🟢🟡🔴 | [Competitor news, lost deal] |
| [Playbook: Enterprise] | playbook | [Date] | [Date] | 🟢🟡🔴 | [Process change, win rate drop] |
```

---

## Initialization

When used for the first time:

1. Ask the user about their product, team, and current state
2. Create the `memory/` directory and seed each file with initial context
3. Create `CLAUDE.md` with working memory summary
4. Log initialization in `changelog.md`

On subsequent uses:
1. Read `CLAUDE.md` first (always in context)
2. Read relevant memory files based on the current task
3. After the task, update memory files with new learnings

---

## Compounding Loop

```
User interaction
    ↓
Read relevant memory → Better context → Higher quality output
    ↓
Capture new insights from the interaction
    ↓
Update memory files
    ↓
Next interaction starts with richer context
    ↓
Repeat (system gets smarter with every use)
```

This is what Matthew means by "infrastructure that compounds" — the plugin isn't just generating content, it's building an institutional knowledge base that makes every future interaction better.

---

## Related Skills

Every other skill in this plugin reads from and writes to GTM Memory:
- **battle-cards** → reads competitors.md, writes back competitive intel
- **deal-qualification** → reads deal-patterns.md, writes back deal outcomes
- **sales-coaching** → reads team.md, writes back skill assessments
- **content-health** → reads content-registry.md, flags stale assets
- **All skills** → read CLAUDE.md for current context
