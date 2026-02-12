---
name: partner-enablement
description: Create enablement materials for channel partners, co-sell partners, and technology partners — partner playbooks, co-sell guides, joint value propositions, and partner onboarding kits. Use this skill when building partner sales materials, co-selling strategies, channel partner programs, joint go-to-market motions, or when someone says "enable our partners", "partner playbook", "co-sell guide", "channel partner kit", or "help partners sell our product". Also trigger when someone mentions partner ecosystem, alliance management, channel strategy, or co-marketing.
---

# Partner Enablement

Help channel, co-sell, and technology partners sell your product effectively. Partners are an extension of your sales team — but they have less context, less training, and less urgency. The materials need to be simpler, more self-serve, and more opinionated than internal enablement.

## Partner Types

- **Channel Partners / Resellers:** Sell your product as part of their portfolio
- **Co-sell Partners:** Sell alongside you into shared accounts
- **Technology Partners:** Integrate with your product and bring joint solutions to market
- **Referral Partners:** Send leads your way for a commission
- **Services Partners:** Implement your product for customers

Each type needs different enablement — a reseller needs a full playbook; a referral partner needs a one-pager.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                  PARTNER ENABLEMENT                               │
├─────────────────────────────────────────────────────────────────┤
│  DELIVERABLES                                                     │
│  1. Partner Playbook — Complete selling guide for partners       │
│  2. Co-Sell Guide — How to run joint opportunities               │
│  3. Joint Value Prop — Combined messaging for the partnership    │
│  4. Partner Onboarding Kit — Everything a new partner needs     │
│  5. Deal Registration Guide — How to register and track deals   │
│  6. Partner Battle Card — Competitive positioning for partners  │
├─────────────────────────────────────────────────────────────────┤
│  KEY PRINCIPLE                                                    │
│  Partner materials must be simpler than internal materials.      │
│  Partners have less time, less context, and more products to    │
│  sell. Make it dead simple to understand, position, and sell.   │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Partner-sourced deal data and win rates                │
│  + ~~CRM: Partner deal pipeline and conversion metrics           │
│  + ~~CRM: Customer profiles for partner success stories          │
│  + ~~data enrichment (ZoomInfo): Partner company research        │
│  + ~~data enrichment (ZoomInfo): Partner customer tech stacks    │
│  + ~~data enrichment (Clay): Partner company enrichment          │
│  + ~~data enrichment (LinkedIn): Partner contact profiles        │
│  + ~~data enrichment (LinkedIn): Partner company updates         │
│  + ~~conversation intelligence (Gong): Partner call patterns     │
│  + ~~conversation intelligence (Gong): Joint call recordings     │
│  + ~~chat: Partner feedback and deal discussions                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking for partner context, pull data from connected tools. Partner materials are strongest when grounded in real deal data from the partner channel.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Pull partner-sourced deals.** Search `deals` for deals associated with the partner (by partner name, source, or deal type).
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `createdate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `closed_won_reason`, `closed_lost_reason`
   - Compute: partner channel win rate, avg deal size, avg cycle length
2. **Identify partner ICP from won deals.** Pull companies associated with partner-sourced won deals.
   - Properties: `name`, `industry`, `numberofemployees`, `annualrevenue`
   - Pattern: Which company profiles win through the partner channel? → Feeds "Who To Sell This To"
3. **Pull buying committee from partner wins.** Get contacts from partner-sourced won deals.
   - Properties: `firstname`, `lastname`, `jobtitle`, `email`
   - Pattern: Which titles appear in partner-closed deals? → Feeds "Best-Fit Personas"
4. **Analyze partner losses.** Pull closed-lost deals from partner channel.
   - Common loss reasons → Feeds "Common Objections" and training focus areas
5. **Check partner pipeline.** Pull open deals from partner channel.
   - Stage distribution → Shows where partners get stuck (enablement gap)

#### Sales Intelligence Data Pull

**ZoomInfo** (if available):
1. **Research the partner company.** Use `zoominfo_search_company` with the partner's company name.
   - Company size, focus areas, customer base → Tailor materials to partner's context
2. **Get partner customer tech stacks.** Use `zoominfo_get_tech_stack` on partner's existing customer base.
   - Common tech stacks → Integration positioning for the partner playbook

**Clay** (if available):
1. **Enrich the partner company.** Use `clay_enrich_company` with the partner domain.
   - Growth signals, recent changes, market positioning → Partner context

**LinkedIn** (if available):
1. **Get partner contact profiles.** Use `linkedin_get_profile` for partner sales leadership.
   - Background, priorities, communication style → Tailor materials to partner audience
2. **Search partner company updates.** Use `linkedin_search_companies` for partner company.
   - Recent initiatives, focus areas, market positioning → Align materials to partner strategy

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

1. **Find partner co-sell calls.** Use `gong_search_calls` with the partner company name.
   - How do partner reps currently position your product?
2. **Analyze joint call patterns.** Use `gong_get_call_stats` on partner-involved calls.
   - Talk-to-listen ratios, topics covered → Where do partners struggle?
3. **Extract positioning gaps.** Use `gong_get_transcript` on partner-led calls.
   - Where do partners misspeak about features or value props? → Training focus

#### Chat Data Pull

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for the partner name in partner/channel channels
2. Surface partner feedback, deal questions, and enablement requests
3. Look for common questions partners ask — these reveal enablement gaps

#### Present What You Found

> "I pulled data for the **[Partner]** channel: **[N] partner-sourced deals** in the last [period] — **[X]% win rate** with **$[X] avg deal size**. Per CRM, partners win most with **[company profile]** companies, and common loss reasons include **[reasons]**. [If Gong:] Found **[N] joint calls** — partners tend to [positioning pattern]. [If ZoomInfo:] Partner focuses on **[market/industry]** with **[N] customers**. Building partner materials now..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the tools couldn't provide:
- **Partner type** — Channel, co-sell, technology, referral, or services?
- **Deliverable** — Playbook, co-sell guide, joint value prop, onboarding kit, or battle card?
- **Partner-specific context** — Margin structure, deal registration process, support SLA
- **Relationship nuance** — What the partner cares about, their competitive landscape

### Step 2: Generate Partner Materials

Build using ALL evidence. Use partner-channel deal data as primary evidence. Cite sources: "Per CRM (partner deals):", "Per Gong (joint calls):", "Per ZoomInfo:", "Per Slack:". Keep materials simpler than internal equivalents — partners have less time and context.

### Step 3: Store Insights

- Update `memory/deal-patterns.md` with partner channel patterns discovered
- Update `memory/content-registry.md` with new partner enablement assets
- Log in `memory/changelog.md`

---

## Getting Started

- "Build a partner playbook for our channel resellers"
- "Create a co-sell guide for our partnership with [Partner]"
- "Help me build a joint value proposition with [Technology Partner]"
- "Create an onboarding kit for new partners"
- "Build a partner-facing battle card for our competitive landscape"

---

## Output: Partner Playbook

```markdown
# Partner Sales Playbook: [Your Product]

**For:** [Partner Type] Partners
**Version:** [X.0]
**Last Updated:** [Date]

---

## Your 60-Second Pitch

[The simplest possible explanation of what the product does, who it's for, and why they should care. If a partner can't explain this in a meeting without preparation, the pitch is too complex.]

---

## Who To Sell This To

### Ideal Customer
| Attribute | Detail |
|-----------|--------|
| Company size | [Range] |
| Industry | [Top 3] |
| Trigger event | [What makes them ready to buy now] |

### Best-Fit Personas
**Primary:** [Title] — [What they care about in one sentence]
**Secondary:** [Title] — [What they care about]

### Qualifying Questions
Ask these three questions. If the prospect answers "yes" to two or more, they're a fit:
1. "[Simple qualifying question]"
2. "[Question]"
3. "[Question]"

---

## How to Position

### Lead with this:
> "[One sentence value proposition that works in any conversation]"

### Avoid saying:
- [Common mistake partners make when positioning]
- [Technical detail that confuses prospects at this stage]

### Customer Proof Point
"[Customer X] deployed [your product] and saw [specific result] in [timeframe]."

---

## Pricing & Deal Structure

| Tier/SKU | Price | Partner Margin | Notes |
|----------|-------|---------------|-------|
| [Tier] | $[X] | [X]% | [When to recommend] |

---

## Common Objections (Top 3)

### "[Objection 1]"
> "[Simple response — one paragraph max]"

### "[Objection 2]"
> "[Response]"

### "[Objection 3]"
> "[Response]"

---

## Deal Registration & Support

**How to register:** [Simple steps]
**Support contact:** [Who to reach out to]
**Demo support:** [How to get a demo for their prospect]
**SLA:** [Response time for partner requests]

---

## Resources
| Resource | What It Is | Link |
|----------|-----------|------|
| Demo video | [Description] | [Link] |
| One-pager | [Description] | [Link] |
| Case study | [Description] | [Link] |
```

---

## Design Principles for Partner Content

1. **Shorter is better.** Partners won't read 20 pages. Keep it under 5.
2. **Decision-ready, not information-rich.** "Sell this to companies with 50-500 employees" not "our product scales from SMB to enterprise."
3. **Scripted, not conceptual.** Give them exact words to say, not messaging frameworks.
4. **Self-serve.** Partners won't attend your training. Make materials that work without explanation.
5. **Focus on WIIFM.** What's in it for the partner? Lead with their margin, their customer value, their competitive advantage.

---

## Related Skills

- **battle-cards** → Simplified competitive cards for partner use
- **playbook-builder** → Full playbooks adapted for partner context
- **buyer-persona** → Simplified personas for partner qualification
- **campaign-to-field** → Joint marketing campaigns translated for partner field teams
