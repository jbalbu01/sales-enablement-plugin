---
name: campaign-to-field
description: Bridge between marketing campaigns and field-ready sales materials — translate launches, campaigns, and messaging into talk tracks, email templates, and discovery angles that reps can actually use. Use this skill whenever marketing launches a campaign and sales needs to know how to leverage it, when there's a product launch and reps need positioning materials, when a rep says "marketing just launched X — how do I use this?", "what's the messaging for [campaign]?", or when aligning sales and marketing on go-to-market motions. Also trigger when someone mentions sales-marketing alignment, campaign enablement, field readiness, or launch readiness.
---

# Campaign to Field

Turn marketing campaigns into field-ready sales tools. Marketing creates campaigns, messaging, and content — but reps need specific guidance on how to use that in their conversations, emails, and deals. This skill bridges that gap.

## The Alignment Problem

Marketing launches a campaign: new positioning, new content, new ads. What happens next?

**Without this skill:** Reps get a Slack message saying "check out our new campaign!" and then... nothing changes in how they sell. Campaign ROI drops because the field doesn't adopt the messaging.

**With this skill:** The campaign is instantly translated into: talk tracks for each persona, email templates reps can send today, discovery questions that tie into campaign themes, objection responses that leverage new proof points, and a guide for which deals the campaign is most relevant to.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                   CAMPAIGN TO FIELD                                │
├─────────────────────────────────────────────────────────────────┤
│  INPUT                                                            │
│  • Campaign brief, messaging doc, or launch plan                 │
│  • Product announcement or feature release                       │
│  • New content piece (whitepaper, case study, report)            │
│  • Updated positioning or messaging framework                    │
│                                                                   │
│  OUTPUT                                                           │
│  • Rep-ready summary (what changed and why it matters)           │
│  • Talk tracks per persona                                       │
│  • Email templates that reference campaign materials             │
│  • Discovery questions tied to campaign themes                   │
│  • Objection responses leveraging new proof points               │
│  • Deal targeting guide (which pipeline deals to apply this to)  │
│  • Internal FAQ for reps                                         │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Auto-target pipeline deals for campaign relevance      │
│  + ~~CRM: Identify which reps/deals benefit most                 │
│  + ~~data enrichment (LinkedIn): Prospect targeting for campaign  │
│  + ~~chat: Distribute field-ready materials to sales channels    │
│  + ~~calendar/email: Context on upcoming meetings to leverage    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "Marketing just launched a new campaign around [theme] — make it field-ready"
- "We have a new case study — turn it into sales ammunition"
- "New feature launching next week — build the sales enablement kit"
- "Here's our updated messaging — translate it for the field"
- "New whitepaper dropped — how should reps use this in deals?"

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** After receiving the campaign brief/materials from the user, immediately check what MCP tools are available and pull data to auto-generate the Deal Targeting section.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Pull active pipeline deals.** Search `deals` for open pipeline.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `createdate`
   - Assess which deals align with the campaign theme based on deal type, stage, and description

2. **Pull associated contacts and companies.** For high-relevance deals, get contacts and companies.
   - Match contact titles to campaign personas
   - Match company profiles to campaign ICP criteria

3. **Map rep names.** Use `search_owners` to identify which reps have deals that match the campaign target.

4. **Auto-populate the Deal Targeting table.** Instead of a generic template, list actual deals that should leverage this campaign:
   - High priority: Deals in Discovery/Demo stage matching campaign theme
   - Medium priority: Early-stage deals that could benefit from campaign content
   - Cite: "Per CRM: [Deal Name] is in [Stage] and matches campaign ICP"

#### Sales Intelligence Data Pull

**LinkedIn** (if available):
1. **Search for prospect profiles matching campaign ICP.** Use `linkedin_search_leads` with campaign persona titles.
   - Identify prospects in active pipeline deals who match campaign personas
   - This helps reps personalize campaign outreach to specific contacts

#### Calendar/Email Data Pull

If calendar/email tools are available (`outlook_calendar_search`, `outlook_email_search`):
1. Search for upcoming meetings with prospects matching campaign themes
2. Flag meetings in the next 2 weeks where reps could leverage new campaign materials
3. Add to Deal Targeting section: "Per Calendar: Meeting with [Company] on [Date] — use new talk track"

#### Chat Data Pull

If chat tools are available:
1. Search for any existing discussion about this campaign or launch
2. Identify which channels to distribute field-ready materials to
3. Surface rep questions or confusion about prior campaigns (to proactively address in FAQ)

#### Present What You Found

> "I analyzed your pipeline and found **[N] deals worth $[X]** that align with this campaign. **[N] of those have meetings in the next 2 weeks** where reps can use these materials. I've built the deal targeting list and identified the reps who should prioritize this. Here's your field enablement kit..."

### Step 1: Generate Field Enablement Kit

Build the complete kit using all evidence. Cite tool-sourced data: "Per CRM:", "Per Calendar:", "Per Slack:"

### Step 2: Store and Distribute

- Register new campaign content in `memory/content-registry.md`
- Update `memory/product.md` if the campaign reflects a positioning change
- Trigger content-health checks on related assets (battle cards, playbooks) that may need updating

---

## Output Format

```markdown
# Field Enablement: [Campaign/Launch Name]

**Campaign:** [Name]
**Launch Date:** [Date]
**Campaign Owner:** [Marketing contact]
**Field Readiness Date:** [When reps should start using this]

---

## TL;DR for Reps

[3-4 sentences: What changed, why it matters to your prospects, and what to do differently starting now. This is the only section a busy rep will read — make it count.]

---

## What's New

### The Change
[Clear description of what marketing launched or what changed]

### Why It Matters to Prospects
[Translate marketing language into prospect benefit language]

### Who Cares Most
| Persona | Why This Matters to Them | When to Bring It Up |
|---------|------------------------|-------------------|
| [Persona 1] | [Their specific pain this addresses] | [Deal stage or conversation context] |
| [Persona 2] | [Benefit] | [When] |

---

## Talk Tracks

### For [Persona 1]
> "[Natural conversation script that introduces the campaign theme without sounding like a marketing brochure]"

### For [Persona 2]
> "[Adapted talk track for this persona's priorities]"

### For Existing Customers
> "[How to position this for expansion/upsell conversations]"

---

## Email Templates

### Cold Outreach Leveraging Campaign
**Subject:** [Template]
**Body:**
[Plain text email that references campaign content naturally]

### For Active Pipeline Deals
**Subject:** [Template]
**Body:**
[Email to send to prospects already in your pipeline]

### Content Share
**Subject:** [Template]
**Body:**
[Email that shares campaign content — whitepaper, case study, etc.]

---

## Discovery Questions

Campaign-themed questions to work into discovery:

1. "[Question that surfaces the pain the campaign addresses]"
2. "[Question about the trend/theme the campaign is built around]"
3. "[Question that sets up the campaign's key proof point]"

---

## Objection Responses (Updated)

If the campaign introduces new proof points, these objections now have stronger responses:

### "[Objection]"
**Before:** [Old response]
**Now:** [Stronger response leveraging new campaign data/case study/proof point]

---

## Deal Targeting

### Which Deals to Apply This To

**High priority:** [Deal characteristics where this campaign is most relevant]
**Medium priority:** [Deals where it's useful but not central]
**Not relevant:** [Deal types where this doesn't apply — don't force it]

### Suggested Outreach
| Deal | Stage | Why This Is Relevant | Suggested Action |
|------|-------|---------------------|-----------------|
| [Deal A] | Discovery | [Connection to campaign theme] | [Send email template X] |
| [Deal B] | Proposal | [Connection] | [Reference new case study] |

---

## Rep FAQ

**Q: Do I need to change my pitch?**
A: [Honest answer — is this a tweak or a major shift?]

**Q: What collateral can I share with prospects?**
A: [List with links]

**Q: How does this affect our competitive positioning?**
A: [Impact on battle cards]

**Q: Do I need to update my active proposals?**
A: [Yes/no and guidance]
```

---

## Product Launch Kit

For major product launches, the output is more comprehensive:

1. **One-page summary** — What launched and why
2. **Demo guide** — How to show the new feature
3. **Pricing impact** — How pricing changes (if at all)
4. **Competitive impact** — How this changes our position vs. competitors
5. **FAQ** — Questions prospects will ask
6. **Timeline** — When features are available, GA date, etc.
7. **Content updates needed** — Which existing assets need refreshing (triggers content-health)

---

## Related Skills

- **battle-cards** → Update competitive position based on campaign/launch
- **playbook-builder** → Incorporate campaign messaging into playbooks
- **content-health** → Register new campaign content and flag stale assets
- **gtm-memory** → Log campaign context for future reference
