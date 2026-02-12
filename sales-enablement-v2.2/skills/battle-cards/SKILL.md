---
name: battle-cards
description: Build competitive battle cards with side-by-side feature comparisons, pricing intel, win/loss patterns, objection responses, and sales talk tracks. Use this skill whenever the user mentions battle cards, competitive positioning, "how do we compare to X", competitor analysis for sales, win themes, competitive differentiation, or needs ammunition against a specific competitor. Also trigger when a rep asks "what do I say when a prospect brings up [competitor]".
---

# Battle Cards

Create actionable competitive battle cards that reps can use in live conversations. Battle cards aren't marketing collateral — they're quick-reference weapons for the field. Every section should answer: "What do I say to the prospect right now?"

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                       BATTLE CARDS                                │
├─────────────────────────────────────────────────────────────────┤
│  ALWAYS (works standalone via web search + your input)            │
│  ✓ Competitor overview and positioning                           │
│  ✓ Feature-by-feature comparison matrix                          │
│  ✓ Pricing intelligence (public data + your input)               │
│  ✓ Strengths, weaknesses, and landmines                         │
│  ✓ Talk tracks for common competitive scenarios                  │
│  ✓ Objection responses specific to competitor                    │
│  ✓ Customer-facing "Why Us" narratives                           │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Win/loss data against this competitor                  │
│  + ~~CRM: Deal patterns — where you win vs lose                  │
│  + ~~data enrichment (ZoomInfo): Competitor tech stack, headcount │
│  + ~~data enrichment (Clay): Company enrichment, firmographics   │
│  + ~~data enrichment (LinkedIn): Competitor org and hiring trends │
│  + ~~chat: Internal competitive intel from team channels         │
│  + ~~knowledge base: Existing battle cards and collateral        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

Tell me who you're competing against:

- "Build a battle card for Competitor X"
- "How do we compare to Acme Corp?"
- "I keep losing to CompetitorY — help me fight back"
- "What should I say when a prospect brings up Rival Inc?"
- "Update our battle card — Competitor just launched a new feature"

I'll research them immediately and combine that with what you tell me about your own product.

---

## What I Need From You

The more context you give me, the sharper the battle card. At minimum I need:

1. **Your product/company** — What you sell and your key differentiators
2. **The competitor** — Name, and optionally their website/product
3. **Your ICP** — Who are you selling to? (role, company size, industry)

Helpful extras:
- Where you tend to win vs. this competitor and why
- Where you tend to lose and why
- Pricing (yours and theirs if known)
- Common prospect objections that reference this competitor
- Any recent wins or losses against them

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking the user for competitive context, check what MCP tools are available and pull data automatically. The best battle cards combine hard data with field observations.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Pull closed-lost deals against this competitor.** Search the `deals` object type for recently lost deals.
   - Filter by `dealstage` = "Closed Lost" stages, `closedate` in the last 180 days
   - Request properties: `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `hs_closed_lost_reason`, `description`, `notes_last_updated`
   - Look for loss reason patterns that mention the competitor name

2. **Pull closed-won deals against this competitor.** Same search but for "Closed Won" to find where you WIN against them.
   - These deals are your proof points — mine them for win themes and customer stories

3. **Calculate competitive win rate.** From the won and lost data:
   - Win rate vs. this competitor = Closed Won / (Closed Won + Closed Lost) where competitor was involved
   - Average deal size for wins vs. losses against this competitor
   - Which reps win most often (identifies who to interview for intel)

4. **Map rep names.** Use `search_owners` to translate `hubspot_owner_id` to actual names for the win story section.

#### Sales Intelligence Data Pull

Check if you have access to sales intelligence tools (look for tools prefixed with `zoominfo_`, `clay_`, `linkedin_`).

**ZoomInfo** (if available):
1. **Search competitor company.** Use `zoominfo_search_company` with the competitor name/domain.
   - Get: employee count, revenue, funding, industry, HQ location
   - This data feeds the "At a Glance" comparison table
2. **Get competitor tech stack.** Use `zoominfo_get_tech_stack` with competitor domain.
   - Reveals what technologies they use internally — useful for positioning against their stack
3. **Search competitor employees.** Use `zoominfo_search_contact` to find their sales team size, engineering headcount, leadership changes.
   - Hiring patterns reveal strategic priorities (hiring 20 ML engineers = investing in AI features)

**Clay** (if available):
1. **Enrich competitor company.** Use `clay_enrich_company` with competitor domain.
   - Supplements ZoomInfo with additional firmographic and technographic signals

**LinkedIn** (if available):
1. **Search competitor company.** Use `linkedin_search_companies` with competitor name.
   - Get company size, recent growth, industry positioning
2. **Search competitor leadership.** Use `linkedin_search_leads` with `company_name` + senior titles.
   - Leadership changes signal strategic shifts — new CRO = new sales motion, new CPO = product pivot

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:
1. **Search calls mentioning competitor.** Use `gong_search_calls` to find recent calls where this competitor was discussed.
2. **Analyze competitor mentions.** Use `gong_get_call_details` on relevant calls to find:
   - What prospects say about the competitor (positioning you didn't know about)
   - How top reps handle competitive objections (real talk tracks, not theoretical)
   - Which competitor features prospects mention most (their perceived strengths)

#### Chat Data Pull

Check if you have access to chat tools (`slack_search_public`, `slack_search_public_and_private`, `chat_message_search`).

If chat tools ARE available:
1. Search for the competitor name in sales and competitive channels
2. Look for win/loss stories, competitive intel, pricing observations
3. Surface any recent competitive insights shared by field reps

#### Present What You Found

After pulling data, present a summary:

> "I found **[N] competitive deals** in your CRM against [Competitor] — **[X] wins and [Y] losses** for a **[Z]% win rate**. Per ZoomInfo, they have [N] employees and $[X] in revenue. I also found [N] call recordings where [Competitor] was discussed and [N] Slack messages with competitive intel. Building the battle card now..."

### Step 1: Research the Competitor (Web Search)

Supplement the tool-sourced data with public web research:

```
Run web searches:
1. "[Competitor] product features" → Core capabilities
2. "[Competitor] pricing plans" → Public pricing
3. "[Competitor] vs [alternatives]" → Market positioning
4. "[Competitor] reviews G2 Capterra" → Customer sentiment
5. "[Competitor] news 2025 2026" → Recent launches, funding, changes
6. "[Competitor] limitations complaints" → Known weaknesses
```

### Step 2: Gather Remaining Context

After the auto-pull, ask ONLY for information you couldn't find in tools. If you pulled CRM data, you already know win/loss patterns. If you got ZoomInfo data, you already have company details. Focus questions on:
- Your own product's differentiators (if not already in memory/product.md)
- Qualitative observations from the field that data doesn't capture
- Pricing details not available publicly

### Step 3: Map Your Differentiation

Using ALL evidence — CRM win/loss data, ZoomInfo intel, Gong call insights, Slack intel, web research, and user input:
- Identify areas where you're clearly stronger
- Identify areas where the competitor has an edge (be honest — reps need to know)
- Find "landmines" — questions reps can ask that expose competitor weaknesses
- Build talk tracks that reframe competitor strengths into your narrative

### Step 4: Store Insights

After generating the battle card:
- Update `memory/competitors.md` with new intel gathered during research
- Register the battle card in `memory/content-registry.md` with today's date and dependencies
- Update `memory/deal-patterns.md` with competitive win/loss patterns from CRM data
- Cite evidence sources throughout: "Per CRM:", "Per ZoomInfo:", "Per Gong:", "Per Slack:", "Per web research:", "User reported:"

### Step 5: Generate the Battle Card

Build the card using the template below, keeping everything concise and action-oriented. Every section should be scannable in under 30 seconds — reps use these mid-conversation.

---

## Output Format

```markdown
# Battle Card: [Your Product] vs [Competitor]

**Last Updated:** [Date]
**Confidence Level:** [High/Medium/Low — based on data quality]

---

## At a Glance

| | [Your Product] | [Competitor] |
|---|---|---|
| **Best For** | [Ideal use case] | [Their ideal use case] |
| **Pricing** | [Range/model] | [Range/model] |
| **Key Strength** | [Your #1 differentiator] | [Their #1 strength] |
| **Key Weakness** | [Your gap — be honest] | [Their biggest vulnerability] |

---

## Quick Win Themes

When you're competing against [Competitor], lead with these 3 themes:

1. **[Theme 1]** — [One sentence on why this matters to the prospect]
2. **[Theme 2]** — [One sentence]
3. **[Theme 3]** — [One sentence]

---

## Feature Comparison

| Capability | [Your Product] | [Competitor] | Verdict |
|------------|---------------|--------------|---------|
| [Feature 1] | [Your capability] | [Their capability] | [Who wins and why] |
| [Feature 2] | ... | ... | ... |
| [Feature 3] | ... | ... | ... |
| [Feature 4] | ... | ... | ... |
| [Feature 5] | ... | ... | ... |

---

## Pricing Intelligence

**Their Model:** [How they price — per seat, usage, tier]
**Your Model:** [How you price]

**Where We Win on Price:** [Scenarios where you're cheaper/better value]
**Where They Win on Price:** [Be honest — and how to handle it]

**Talk Track:**
> "[Scripted response when prospect says 'they're cheaper']"

---

## Landmine Questions

Questions to ask prospects that expose [Competitor]'s weaknesses:

1. "Have you looked into how [Competitor] handles [weakness area]?"
2. "What's your plan for [use case they can't support]?"
3. "How important is [capability they lack] for your team?"

These questions plant doubt without directly attacking the competitor.

---

## Objection Responses

### "We're already using [Competitor]"
> [Talk track — acknowledge, differentiate, propose evaluation]

### "[Competitor] is cheaper"
> [Talk track — reframe value, TCO argument, hidden costs]

### "[Competitor] has [feature we lack]"
> [Talk track — honest response, alternative approach, roadmap if relevant]

### "Our team already knows [Competitor]"
> [Talk track — switching costs vs. long-term value]

---

## Their Weaknesses (With Evidence)

- **[Weakness 1]:** [Evidence from reviews, customer feedback, or research]
- **[Weakness 2]:** [Evidence]
- **[Weakness 3]:** [Evidence]

---

## Our Vulnerabilities (Be Honest)

- **[Gap 1]:** [How to handle when it comes up]
- **[Gap 2]:** [Mitigation strategy]

Honesty here protects reps from being blindsided. It's better to have a prepared response than to be caught off guard.

---

## Recent Intel

- [Date]: [Recent news, product launch, pricing change, leadership change]
- [Date]: [Any relevant update]

---

## Win Story

**Customer:** [Name if shareable]
**Situation:** [They were evaluating us and [Competitor]]
**Why They Chose Us:** [The deciding factor]
**Quote:** "[Customer quote if available]"

---

## Sources
- [Source 1](URL)
- [Source 2](URL)
```

---

## Delivery Options

After generating the battle card, I'll ask how you want it:

1. **Markdown in chat** — Quick reference, copy-paste ready
2. **Document file** — Word doc or PDF for distribution
3. **HTML page** — Interactive card with collapsible sections (good for team portals)

---

## Tips for Better Battle Cards

1. **Be specific about your product** — The more I know about what you sell, the sharper the differentiation
2. **Share real win/loss stories** — These make battle cards credible and useful
3. **Update regularly** — Tell me when competitors ship something new and I'll refresh the card
4. **One competitor per card** — Focused cards are more useful than omnibus comparisons

---

## Related Skills

- **objection-handling** — Deep-dive on handling objections beyond competitive scenarios
- **discovery-guide** — Use landmine questions as part of a structured discovery
- **playbook-builder** — Embed battle cards into a comprehensive sales playbook
