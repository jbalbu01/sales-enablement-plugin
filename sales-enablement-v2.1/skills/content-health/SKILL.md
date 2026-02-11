---
name: content-health
description: Self-healing content monitoring system that tracks freshness of all enablement assets, detects when content is stale, and triggers updates automatically. Use this skill whenever checking if enablement content is current, when a product change happens and assets need updating, when competitive landscape shifts, or when win rates drop (which may signal stale playbooks). Also trigger proactively when any enablement asset is older than 30 days, when a competitor makes news, when pricing changes, or when the user says "is our content up to date", "what needs refreshing", "we just launched a new feature", or "competitor just announced X". This is the self-healing engine that Matthew describes — content that knows when it's decaying.
---

# Content Health Monitor

The "self-healing" layer of the enablement system. Traditional enablement creates content once and hopes someone remembers to update it. This system actively monitors every asset, detects decay signals, and either auto-refreshes or flags content for human review.

## The Decay Problem

Enablement content has a half-life:
- **Battle cards** decay when competitors ship new features or change pricing (~30 days)
- **Playbooks** decay when win rates change or process evolves (~90 days)
- **Proposals** decay when product or pricing changes (~immediate)
- **Discovery guides** decay when ICP shifts or new personas emerge (~60 days)
- **ROI models** decay when benchmarks or pricing change (~90 days)
- **Buyer personas** decay when market conditions shift (~120 days)

If your battle card is 6 months old but your competitor shipped 3 features since then, the rep using that card is fighting with outdated intel.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTENT HEALTH                                  │
├─────────────────────────────────────────────────────────────────┤
│  MONITORING LAYERS                                                │
│                                                                   │
│  Layer 1: TIME-BASED                                              │
│  • Track age of every asset in content-registry.md               │
│  • Flag when assets exceed their freshness threshold              │
│  • Escalate overdue assets in weekly health reports              │
│                                                                   │
│  Layer 2: EVENT-DRIVEN                                            │
│  • Product change → Flag all assets referencing old info         │
│  • Competitor news → Flag related battle cards                   │
│  • Lost deal → Check if loss reason indicates stale content      │
│  • Win rate drop → Investigate if playbook needs refresh         │
│                                                                   │
│  Layer 3: OUTCOME-BASED                                           │
│  • Track which content gets used and which doesn't               │
│  • Identify assets with declining effectiveness                   │
│  • Surface "zombie content" that exists but nobody uses          │
│                                                                   │
│  RESPONSE                                                         │
│  • Auto-refresh: Update with new data (competitive intel, etc.)  │
│  • Flag for review: Alert human when judgment needed             │
│  • Propagate changes: When one thing changes, update downstream  │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Win rate trends that signal playbook decay             │
│  + ~~CRM: Lost deal reasons that expose content gaps             │
│  + ~~CRM: Deal stage conversion drops flagging stale process     │
│  + ~~competitive intel (ZoomInfo): Competitor tech stack changes  │
│  + ~~competitive intel (ZoomInfo): New competitor product launches│
│  + ~~competitive intel (Clay): Company signal changes            │
│  + ~~competitive intel (LinkedIn): Competitor hiring & news      │
│  + ~~conversation intelligence (Gong): Objection frequency shifts│
│  + ~~conversation intelligence (Gong): Talk track effectiveness  │
│  + ~~chat: Rep feedback on stale or missing content              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before generating a health report from the registry alone, pull live data from connected tools to detect decay signals that time-based tracking misses.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Pull recent deal outcomes.** Search `deals` for Closed Won and Closed Lost in the last 30-60 days.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `closed_lost_reason`, `closed_won_reason`, `pipeline`
   - Look for: loss reasons that indicate content gaps (e.g., "competitor had feature we didn't address" → battle card stale)
2. **Check win rate trends.** Compare recent win rate to historical baseline.
   - Win rate dropping? → Flag playbooks and discovery guides for review
   - Specific pipeline declining? → Check segment-specific content
3. **Identify new competitors.** Look for competitor names in lost deal reasons that don't exist in `competitors.md`.
   - New competitor appearing? → Trigger battle card creation
4. **Check deal stage conversion.** Compare stage progression rates to baseline.
   - Stage conversion dropping? → Flag content for that stage (e.g., demo-to-proposal dropping → check proposal templates)

#### Sales Intelligence Data Pull

**ZoomInfo** (if available):
1. **Monitor competitor changes.** Use `zoominfo_search_company` on competitors listed in `competitors.md`.
   - New product announcements, funding rounds, hiring surges → flag related battle cards
   - Tech stack changes at competitor → update competitive positioning
2. **Check ICP company trends.** Use `zoominfo_search_company` to validate current ICP definition.
   - Market shifts → flag ICP.md and buyer personas for review

**Clay** (if available):
1. **Check enrichment signals.** Use `clay_enrich_company` on key competitors for recent changes.
   - Company signals that indicate strategic shifts → flag competitive content

**LinkedIn** (if available):
1. **Scan competitor company pages.** Use `linkedin_search_companies` for competitor updates.
   - Recent posts, product launches, leadership changes → flag battle cards
2. **Check for ICP shifts.** Use `linkedin_search_leads` to validate persona definitions.
   - New buyer titles emerging → flag buyer personas and discovery guides

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

1. **Analyze objection frequency trends.** Use `gong_search_calls` to compare objection patterns over last 30 vs prior 30 days.
   - New objections appearing? → Flag objection library for update
   - Existing objection responses failing more? → Flag for refresh
2. **Check talk track effectiveness.** Use `gong_get_call_stats` for top performers vs team average.
   - Divergence growing? → Playbook may not reflect current best practices
3. **Scan for competitor mentions.** Use `gong_search_calls` with competitor names.
   - New competitor appearing in calls? → Trigger battle card creation
   - Frequency of competitor mentions changing? → Update priority of battle cards

#### Chat Data Pull

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for "stale", "outdated", "wrong", "update" in sales channels — rep feedback on content
2. Search for new competitive intel shared informally
3. Look for product changes or pricing discussions that haven't been reflected in content

#### Present What You Found

> "Content health scan complete. **[N] decay signals** detected from live data: [If CRM:] Win rate dropped **[X]%** in last 30 days — flagging playbook for review. [N] deals lost to **[Competitor]** not in our battle cards. [If Gong:] New objection '**[objection]**' appearing in **[N] calls** — not in objection library. [If ZoomInfo:] **[Competitor]** announced **[change]** — battle card is **[N] days** stale. [If Slack:] **[N] reps** flagged content issues in the last month. Running full health report now..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the tools couldn't provide:
- **Product changes** — Any recent changes not captured in tools?
- **Strategic shifts** — New markets, new personas, new positioning?
- **Known gaps** — Content the team needs but doesn't have?

### Step 2: Generate Health Report

Build using ALL evidence. Combine time-based decay (from content-registry.md) with event-driven signals (from tools). Cite sources: "Per CRM:", "Per Gong:", "Per ZoomInfo:", "Per Slack:", "Per content-registry.md:". Prioritize actions by severity × business impact.

### Step 3: Update Registry and Memory

- Update `content-registry.md` with current freshness scores incorporating tool data
- Update `memory/competitors.md` with any new competitive intel discovered
- Update `memory/deal-patterns.md` with new win/loss patterns
- Log the health check in `memory/changelog.md`

---

## Content Registry

Every enablement asset is tracked in `memory/content-registry.md`:

```markdown
| Asset | Type | Created | Last Updated | Freshness Score | Max Age | Dependencies | Auto-Refresh? |
|-------|------|---------|-------------|-----------------|---------|-------------|---------------|
| Battle Card: CompA | battle-card | 2026-01-15 | 2026-01-15 | 🟢 95/100 | 30 days | competitors.md | Yes |
| Enterprise Playbook | playbook | 2025-12-01 | 2026-01-10 | 🟡 62/100 | 90 days | product.md, icp.md | No — needs review |
| SDR Discovery Guide | discovery | 2025-11-15 | 2025-11-15 | 🔴 28/100 | 60 days | icp.md | Yes |
```

### Freshness Score Calculation

```
Base Score: 100 (at creation/update)

Decay factors:
- Time: -1 point per day beyond 50% of max age
- Event-triggered: -20 points per relevant product/competitor change
- Outcome-based: -10 points if win rate in related deals drops >5%
- Usage: -15 points if asset hasn't been referenced in 30 days

Freshness thresholds:
🟢 70-100: Current — no action needed
🟡 40-69:  Aging — schedule refresh within 2 weeks
🔴 0-39:   Stale — refresh immediately or retire
```

---

## Decay Triggers

### Product Changes
When the user reports a product change (new feature, pricing update, positioning shift):

1. Scan content-registry.md for all assets with `product.md` as a dependency
2. Assess which assets are directly affected
3. For each affected asset:
   - If auto-refresh is possible → regenerate with updated info
   - If judgment needed → flag for review with specific change context
4. Update content-registry.md with new freshness scores
5. Log the propagation in changelog.md

**Example:**
> User: "We just raised our pricing by 15%"
> System: "Updated product.md. Flagging 4 assets for refresh: ROI Calculator (auto-refreshing now), Proposal Template (needs your review — value framing may change), Battle Card: CompA (auto-refreshing pricing comparison), Enterprise Playbook (pricing section needs manual update)."

### Competitor Changes
When competitive news is detected (via scheduled monitoring or user input):

1. Identify which competitor
2. Update competitors.md with new intel
3. Flag all battle cards for that competitor
4. Check if any playbooks reference this competitor's positioning
5. Assess if deal-patterns.md needs updating

### Deal Outcomes
When a deal is won or lost:

1. Check if the outcome reveals a content gap
2. If loss reason = "competitor had feature we didn't address" → Flag battle card
3. If loss reason = "prospect didn't see enough value" → Flag ROI calculator and proposal template
4. If win rate drops below threshold → Flag playbook for review

---

## Health Report

Generated on demand or via scheduled automation:

```markdown
# Enablement Content Health Report

**Date:** [Today]
**Total Assets:** [N]
**Health Distribution:** 🟢 [N] current | 🟡 [N] aging | 🔴 [N] stale

---

## Immediate Action Required (🔴 Stale)

| Asset | Age | Last Event | Recommended Action |
|-------|-----|-----------|-------------------|
| [Asset] | [X] days | [What triggered staleness] | [Refresh / Retire / Review] |

## Schedule Refresh (🟡 Aging)

| Asset | Freshness | Estimated Effort | Skill to Use |
|-------|-----------|-----------------|-------------|
| [Asset] | [Score]/100 | [Quick / Medium / Deep] | [battle-cards / playbook-builder / etc.] |

## Recently Refreshed

| Asset | Updated | By | Change |
|-------|---------|-----|--------|
| [Asset] | [Date] | [Auto / Manual] | [What changed] |

---

## Trends

- Content freshness trend: [Improving / Stable / Declining]
- Most frequently updated: [Asset] — [Why it changes often]
- Zombie content (exists but unused): [List]
- Missing content (gaps identified): [List]
```

---

## Change Propagation

When one piece of knowledge changes, the system traces downstream dependencies:

```
Product pricing changes
    ↓
├── ROI Calculator → Auto-refresh calculations
├── Proposal Template → Flag pricing section
├── Battle Card: CompA → Refresh pricing comparison
├── Playbook → Flag pricing objection section
└── Objection Library → Update "too expensive" responses
```

This is tracked via the Dependencies column in the content registry. Each asset declares what it depends on, and changes propagate through the dependency graph.

---

## Automation Integration

This skill works with scheduled shortcuts:

- **`/competitive-pulse`** → Feeds competitor intel into the decay engine
- **`/content-audit`** → Generates the full health report
- **Weekly automation** → Runs health check and sends summary

---

## Related Skills

- **gtm-memory** → Content registry lives in the memory system
- **battle-cards** → Most frequently refreshed asset type
- **playbook-builder** → Refreshes playbooks when patterns change
- **All content-generating skills** → Register their output in the content registry
