---
name: playbook-builder
description: Create comprehensive sales playbooks for products, segments, or sales motions. Use this skill whenever someone needs to build a sales playbook, create a new hire onboarding guide, document a sales process, standardize a sales motion, says "build a playbook for [product/segment]", "document our sales process", "create a selling guide", or when systematizing tribal knowledge into repeatable processes. Also trigger when someone mentions sales methodology documentation, go-to-market playbooks, vertical playbooks, or rep enablement guides.
---

# Playbook Builder

Create structured, actionable sales playbooks that turn your best reps' knowledge into a repeatable system the whole team can follow. A playbook isn't a PDF that sits on a shelf — it's a living reference that reps actually use in their day-to-day work.

## What Makes a Good Playbook

- **Actionable** — Every section answers "what do I do?" not just "what should I know?"
- **Scannable** — Reps look things up mid-conversation, not during study hall
- **Opinionated** — It takes a position on what works. "It depends" is useless guidance.
- **Evidence-based** — Grounded in what actually wins deals, not theory
- **Maintained** — Updated as the product, market, and competition evolve

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    PLAYBOOK BUILDER                                │
├─────────────────────────────────────────────────────────────────┤
│  PLAYBOOK TYPES                                                   │
│  1. Product Playbook — How to sell a specific product            │
│  2. Segment Playbook — How to sell into a specific vertical      │
│  3. Motion Playbook — Inbound, outbound, expansion, etc.        │
│  4. Competitive Playbook — How to win against specific rivals    │
│  5. New Hire Playbook — Everything a new rep needs to ramp       │
├─────────────────────────────────────────────────────────────────┤
│  DELIVERY                                                         │
│  • Structured markdown (copy-paste, wiki-ready)                  │
│  • Word document for formal distribution                         │
│  • Interactive HTML with collapsible sections                    │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Win/loss patterns, deal metrics, stage analysis        │
│  + ~~CRM: Rep performance data for best-practice extraction      │
│  + ~~CRM: ICP validation from won deal profiles                  │
│  + ~~conversation intelligence (Gong): Top rep call patterns     │
│  + ~~conversation intelligence (Gong): Discovery question bank   │
│  + ~~conversation intelligence (Gong): Objection frequency data  │
│  + ~~data enrichment (ZoomInfo): ICP company validation          │
│  + ~~data enrichment (ZoomInfo): Competitive tech stack intel    │
│  + ~~data enrichment (LinkedIn): Buyer persona validation        │
│  + ~~chat: Internal tribal knowledge and rep feedback            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "Build a sales playbook for [product]"
- "Create a vertical playbook for selling into healthcare"
- "Document our outbound sales motion"
- "Build an onboarding playbook for new AEs"
- "Help me systematize how our top reps sell"

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking for tribal knowledge, pull every data point from connected tools. The best playbooks are grounded in actual win patterns, not theory.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Pull all closed deals (Won + Lost) for the last 6-12 months.**
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `createdate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `closed_lost_reason`, `closed_won_reason`
2. **Compute win metrics for the playbook:**
   - Win rate, avg deal size, avg cycle length
   - Win rate by deal type, pipeline, and company size
   - Most common loss reasons → feeds "Common Mistakes" sections
   - Stage conversion rates → feeds "Sales Process" exit criteria
3. **Identify ICP from won deals.** Pull companies associated with won deals:
   - Properties: `name`, `industry`, `numberofemployees`, `annualrevenue`
   - Cluster: What company size/industry/profile wins most? → feeds "Ideal Customer Profile"
4. **Identify buying committee from won deals.** Pull contacts from won deals:
   - Properties: `firstname`, `lastname`, `jobtitle`, `email`
   - Pattern: What titles are most common in won deals? → feeds "Buying Committee"
5. **Segment by rep.** Use `search_owners` to identify top performers.
   - What do top reps do differently? (deal size, cycle length, stage velocity)

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

1. **Pull call patterns for top performers.** Use `gong_search_calls_by_participant` + `gong_get_call_stats` for reps with highest win rates.
   - Talk-to-listen ratios → feeds "Discovery" best practices
   - Avg questions per call → feeds "Discovery Question Bank"
   - Topics covered → feeds "Key Value Drivers"
2. **Extract discovery questions.** Use `gong_get_transcript` on 3-5 top-performer discovery calls.
   - What questions do they consistently ask? → feeds "Discovery Question Bank"
3. **Extract objection patterns.** Use `gong_search_calls` with objection keywords.
   - Most frequent objections → feeds "Objection Handling Quick Reference"
   - How top reps handle them → feeds response scripts
4. **Extract competitive mentions.** Use `gong_get_call_details` to find competitor mentions.
   - What competitors come up? → feeds "Competitive Positioning"
   - How do top reps respond? → feeds competitive talk tracks

#### Sales Intelligence Data Pull

**ZoomInfo** (if available):
1. **Validate ICP.** Use `zoominfo_search_company` on won deal companies to verify company profiles.
   - Industry, size, tech stack patterns across wins
2. **Map competitor tech stacks.** Use `zoominfo_get_tech_stack` on won and lost deal companies.
   - What tools do your best customers use? → integration positioning

**LinkedIn** (if available):
1. **Validate buyer personas.** Use `linkedin_search_leads` for champion titles from won deals.
   - Career paths, backgrounds, common traits of your best buyers

#### Chat Data Pull

If chat tools are available:
1. Search for playbook-related discussions, win stories, and best practices shared by reps
2. Surface tribal knowledge that hasn't been formally documented

#### Present What You Found

> "I analyzed **[N] deals** from the last [period] — **[N] won** at **[X]% win rate** with **$[X] avg deal size** and **[X]-day avg cycle**. Top loss reasons: **[reason 1]**, **[reason 2]**. Per CRM, your best customers are **[size] [industry]** companies, and your typical buying committee includes **[titles]**. [If Gong:] Top performers have a **[X:Y] talk ratio** and ask **[N] questions per call**. Building your data-driven playbook now..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the tools couldn't provide:
- **Playbook type** — Product, segment, motion, competitive, or new hire?
- **Product details** — Pricing, packaging, key differentiators (if not in memory/product.md)
- **Team insights** — What do your best reps do that isn't captured in data?
- **Known gaps** — What does the team struggle with most?

### Step 2: Generate the Playbook

Build using ALL evidence. Mark data-sourced sections: "Per CRM ([N] deals):", "Per Gong (top 5 reps):", "Per ZoomInfo:", "Per Slack:" The playbook should be grounded in what actually works, not generic frameworks.

### Step 3: Store Insights

- Update `memory/product.md` with product positioning documented in the playbook
- Update `memory/deal-patterns.md` with patterns discovered during analysis
- Update `memory/competitors.md` with competitive intelligence surfaced
- Register the playbook in `memory/content-registry.md`
- Log in `memory/changelog.md`

---

## What I Need From You (When Tools Aren't Connected)

The more context you provide, the more specific and useful the playbook:

1. **What you sell** — Product, pricing, key differentiators
2. **Who you sell to** — ICP, personas, typical buying committee
3. **How you sell** — Current process, sales stages, typical cycle length
4. **What works** — Your top reps' best practices, winning patterns
5. **What doesn't work** — Common mistakes, lost deal patterns
6. **Competitive landscape** — Who you compete against and how you differentiate

I'll supplement with research and proven frameworks, but your team's actual experience is the most valuable input.

---

## Output Format: Product Playbook

```markdown
# Sales Playbook: [Product Name]

**Version:** [X.0]
**Last Updated:** [Date]
**Owner:** [Name/Team]

---

## Quick Reference

| | Detail |
|---|---|
| **Product** | [Name and one-line description] |
| **ICP** | [Company size, industry, characteristics] |
| **Primary Persona** | [Title and description] |
| **Average Deal Size** | $[X] |
| **Average Sales Cycle** | [X] weeks/months |
| **Win Rate** | [X]% |
| **Top Competitors** | [List] |

---

## Ideal Customer Profile

### Company Characteristics
- **Size:** [Employee count and/or revenue range]
- **Industry:** [Verticals where you win most]
- **Signals:** [Events/triggers that indicate a good fit]
- **Disqualifiers:** [Red flags that mean bad fit]

### Buying Committee

| Role | Priority | What They Care About | How to Engage |
|------|----------|---------------------|---------------|
| [Title] | Champion | [Their priorities] | [Approach] |
| [Title] | Decision Maker | [Their priorities] | [Approach] |
| [Title] | Influencer | [Their priorities] | [Approach] |
| [Title] | Blocker | [Their concerns] | [How to neutralize] |

---

## Value Proposition

### Elevator Pitch (30 seconds)
> "[Scripted pitch that any rep can use]"

### By Persona

**For [Persona 1]:**
> "[Tailored message focused on their priorities]"

**For [Persona 2]:**
> "[Tailored message]"

### Key Value Drivers
1. **[Driver 1]** — [Supporting evidence, customer quote, data point]
2. **[Driver 2]** — [Evidence]
3. **[Driver 3]** — [Evidence]

---

## Sales Process

### Stage 1: [Prospecting/Outreach]
**Goal:** [What you're trying to achieve]
**Activities:**
- [Activity 1]
- [Activity 2]
**Exit Criteria:** [What must be true to advance]
**Tools/Resources:** [What to use]

### Stage 2: [Discovery]
**Goal:** [Goal]
**Key Questions:** [Top 5 questions]
**Exit Criteria:** [Qualification gates]
**Common Mistakes:** [What to avoid]

### Stage 3: [Demo/Presentation]
**Goal:** [Goal]
**Demo Flow:** [Recommended structure]
**Personalization Points:** [How to tailor]
**Exit Criteria:** [Next step commitment]

### Stage 4: [Proposal/Business Case]
**Goal:** [Goal]
**Proposal Template:** [Link or reference]
**Pricing Guidance:** [How to present pricing]
**Exit Criteria:** [Verbal commitment]

### Stage 5: [Negotiation/Close]
**Goal:** [Goal]
**Negotiation Guardrails:** [What you can/can't flex on]
**Common Objections:** [Top 3 with responses]
**Close Techniques:** [What works for this product]

---

## Objection Handling Quick Reference

| Objection | Category | Response |
|-----------|----------|----------|
| "[Objection 1]" | Price | [Brief response] |
| "[Objection 2]" | Timing | [Brief response] |
| "[Objection 3]" | Competition | [Brief response] |
| "[Objection 4]" | Need | [Brief response] |

---

## Competitive Positioning

### vs [Competitor A]
**We win when:** [Scenario]
**We lose when:** [Scenario]
**Key differentiator:** [What to lead with]
**Landmine question:** "[Question that exposes their weakness]"

### vs [Competitor B]
[Same structure]

### vs Status Quo (No Decision)
**We win when:** [What creates urgency]
**We lose when:** [Why they stick with current state]
**Key argument:** [Cost of inaction]

---

## Discovery Question Bank

### Situation
1. [Question]
2. [Question]

### Problem
1. [Question]
2. [Question]

### Implication
1. [Question]
2. [Question]

### Need-Payoff
1. [Question]
2. [Question]

---

## Email Templates

### Initial Outreach
**Subject:** [Template]
**Body:** [Template with personalization markers]

### Post-Discovery Follow-Up
**Subject:** [Template]
**Body:** [Template]

### Proposal Send
**Subject:** [Template]
**Body:** [Template]

---

## Success Stories

### [Customer Name]
**Situation:** [Brief context]
**Challenge:** [What was broken]
**Solution:** [What you provided]
**Result:** [Quantified outcome]
**Quote:** "[Customer quote]"

---

## Resources

| Resource | Purpose | Location |
|----------|---------|----------|
| [Battle card] | Competitive ammo | [Link] |
| [ROI calculator] | Value justification | [Link] |
| [Demo environment] | Live demos | [Link] |
| [Case studies] | Social proof | [Link] |
```

---

## Tips for Building Great Playbooks

1. **Interview your top reps** — Their instincts contain gold that needs to be documented
2. **Include what NOT to do** — Failure patterns are as valuable as success patterns
3. **Keep it modular** — Reps should be able to jump to any section without reading the whole thing
4. **Version it** — Date everything and update quarterly at minimum
5. **Test it with new hires** — If a new rep can follow it and succeed, it's a good playbook

---

## Related Skills

- **battle-cards** — Generate the competitive sections
- **discovery-guide** — Build the discovery question bank
- **objection-handling** — Create the objection response library
- **buyer-persona** — Define the ICP and persona sections
- **win-loss-analysis** — Ground the playbook in real deal outcomes
