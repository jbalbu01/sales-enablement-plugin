---
name: handoff-builder
description: Create structured handoff documents between GTM functions — sales-to-CS, SDR-to-AE, AE-to-SE, sales-to-implementation. Captures deal context, customer expectations, success criteria, risk flags, and action items so nothing falls through the cracks. Use this skill whenever a deal is closing and needs to transition to CS or implementation, when an SDR qualifies a lead for an AE, when a rep needs SE support, or when someone says "hand off this deal", "create a CS transition doc", "pass this lead to [rep]", "implementation kickoff", or when building handoff templates for the team.
---

# Handoff Builder

Create seamless transitions between GTM functions. The handoff between sales and CS is where most customer relationships break — the customer repeats everything they already told sales, expectations get lost, and trust erodes. This skill prevents that.

## The Handoff Problem

Every GTM handoff is a moment of risk:
- **SDR → AE:** Context about the prospect's pain and urgency gets lost
- **AE → SE:** Technical requirements aren't fully communicated
- **Sales → CS:** Customer expectations don't match what was sold
- **Sales → Implementation:** Scope and timeline assumptions differ
- **CS → Sales:** Expansion opportunities don't get pursued

Bad handoffs cost deals, create churn, and destroy cross-functional trust.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    HANDOFF BUILDER                                │
├─────────────────────────────────────────────────────────────────┤
│  HANDOFF TYPES                                                   │
│  1. SDR → AE — Lead context and qualification notes              │
│  2. Sales → CS — Full deal context and customer expectations     │
│  3. AE → SE — Technical requirements for demo/POC               │
│  4. Sales → Implementation — Scope, timeline, requirements       │
│  5. CS → Sales — Expansion signals and customer context          │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Full deal data, contacts, company, and notes           │
│  + ~~CRM: Deal timeline and stage progression history            │
│  + ~~CRM: Associated contacts with roles and titles              │
│  + ~~conversation intelligence (Gong): Key call transcripts      │
│  + ~~conversation intelligence (Gong): Discovery insights        │
│  + ~~conversation intelligence (Gong): Objections raised         │
│  + ~~data enrichment (ZoomInfo): Company and contact profiles    │
│  + ~~data enrichment (LinkedIn): Stakeholder backgrounds         │
│  + ~~chat: Internal deal discussions and context                 │
│  + ~~calendar/email: Meeting history and correspondence          │
└─────────────────────────────────────────────────────────────────┘
```

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking for deal context, auto-populate the handoff from connected tools. A data-rich handoff is dramatically better than a form the rep fills out from memory.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Find the deal.** Search `deals` for the company/deal name the user mentioned.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `createdate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `closed_won_reason`, `notes_last_contacted`, `num_notes`
2. **Pull ALL contacts.** Get every contact associated with the deal.
   - Properties: `firstname`, `lastname`, `jobtitle`, `email`, `phone`, `company`, `lifecyclestage`
   - Map roles: champion, economic buyer, technical lead, executive sponsor, potential blocker
3. **Pull company.** Get full company profile.
   - Properties: `name`, `domain`, `industry`, `numberofemployees`, `annualrevenue`, `description`, `about_us`, `founded_year`, `country`
4. **Pull deal timeline.** Calculate days from `createdate` to `closedate`, note stage progression.
5. **Check for other deals.** Search for any additional deals with this company (prior products, expansions).

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

1. **Find all calls for this deal.** Use `gong_search_calls` with the company name and deal date range.
2. **Pull key transcripts.** Use `gong_get_transcript` on:
   - Discovery call → customer's stated pain and goals (in their words)
   - Demo/presentation → features shown and reactions
   - Negotiation call → concerns raised, objections handled, commitments made
3. **Extract for the handoff:**
   - Customer's own words about expectations and success criteria
   - Objections raised and how they were resolved
   - Competitor mentions and why the customer chose you
   - Technical requirements discussed
   - Timeline commitments made
4. **Pull call analytics.** Use `gong_get_call_details` for topic coverage across the deal.

#### Sales Intelligence Data Pull

**ZoomInfo** (if available):
1. **Get company profile.** Use `zoominfo_search_company` for the customer company.
   - Company context, tech stack, org structure → feeds technical and stakeholder sections
2. **Get org chart.** Use `zoominfo_get_org_chart` for the customer.
   - Reporting relationships → helps CS identify additional stakeholders

**LinkedIn** (if available):
1. **Get stakeholder profiles.** Use `linkedin_get_profile` for key contacts.
   - Background, tenure, career path → helps CS build relationships

#### Chat Data Pull

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for the deal/company name in sales and deal-room channels
2. Surface: internal discussions about risks, competitive dynamics, pricing decisions, special terms
3. Look for any commitments made informally that should be documented

#### Calendar/Email Data Pull

If calendar/email tools are available:
1. Search for the meeting history with the customer — complete engagement timeline
2. Check for materials exchanged (SOWs, proposals, technical docs)
3. Pull any follow-up commitments or action items from recent correspondence

#### Present What You Found

> "I auto-populated the handoff for **[Company]**: **$[X] deal** closed [date]. Per CRM, **[N] contacts** mapped across [roles]. Per Gong, I pulled transcripts from **[N] calls** — customer's key expectations: [summary]. [If ZoomInfo:] Company profile and org chart loaded. [If Slack:] Found [N] relevant internal discussions. The handoff document is [X]% pre-filled — just need your qualitative input on a few sections..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the tools couldn't provide:
- **Handoff type** — SDR→AE, Sales→CS, AE→SE, or Sales→Implementation?
- **Receiving person** — Who's taking ownership?
- **Qualitative context** — Political dynamics, informal commitments, relationship nuances
- **Known risks** — Things that could go wrong that aren't in the data

### Step 2: Generate the Handoff Document

Build using ALL evidence. Pre-fill every section possible from tool data. Cite sources: "Per CRM:", "Per Gong (discovery call):", "Per ZoomInfo:", "Per Slack:", "Per Email:". Flag any sections where data is missing and user input is needed.

### Step 3: Score and Store

- Score the handoff on completeness (target: 80%+ from tool data alone)
- Store handoff context in `memory/deal-patterns.md`
- Log in `memory/changelog.md`

---

## Handoff Types

### 1. SDR → AE Handoff
```markdown
# Lead Handoff: [Company Name]

**SDR:** [Name] | **AE:** [Name] | **Date:** [Date]

## Prospect Summary
| Field | Detail |
|-------|--------|
| Company | [Name, size, industry] |
| Contact | [Name, title, email, phone] |
| Source | [How they came in — inbound, outbound, event, referral] |

## Why They Took the Meeting
[What pain or interest did they express? Use their words.]

## Qualification Notes
| Criterion | What We Know |
|-----------|-------------|
| Pain | [Specific problem they mentioned] |
| Budget | [Any signal — allocated, looking for budget, unknown] |
| Authority | [Is this the decision-maker? Who else is involved?] |
| Timeline | [Any urgency driver or target date?] |

## Conversation History
[Summary of all touchpoints — emails, calls, content engagement]

## Suggested Approach for First Call
[Based on what the SDR learned, what should the AE focus on?]

## Red Flags
[Anything concerning — competitor already in play, low urgency, tire-kicking signals]
```

### 2. Sales → CS Handoff
```markdown
# Customer Handoff: [Company Name]

**AE:** [Name] | **CSM:** [Name] | **Date:** [Date]
**Deal Size:** $[amount] | **Contract Start:** [Date] | **Term:** [Duration]

## Customer Overview
| Field | Detail |
|-------|--------|
| Company | [Name, size, industry, HQ] |
| Primary Contact | [Name, title, email] |
| Executive Sponsor | [Name, title] |
| Technical Lead | [Name, title] |

## What They Bought and Why
[Clear description of: what was sold, which use cases they're deploying for, and the business problem they're solving. Don't just list SKUs — explain the intent.]

## Customer Expectations
[What did the customer explicitly say they expect to achieve? Use their words. This is the most important section — it's the promise CS needs to deliver on.]

### Success Criteria (Agreed with Customer)
1. [Specific, measurable outcome they expect]
2. [Second outcome]
3. [Third outcome]

### Timeline Expectations
| Milestone | Customer's Expected Date |
|-----------|------------------------|
| Go-live / first value | [Date] |
| Full rollout | [Date] |
| First business review | [Date] |

## Sales Cycle Context

### Key Decisions and Why
[What were the pivotal moments in the sale? What almost killed the deal? What won it?]

### Competitors Evaluated
[Who else they looked at and why they chose you — this helps CS reinforce the decision]

### Concerns Raised During Sales
[Any objections, hesitations, or risks the customer expressed. CS needs to know these so they don't resurface as churn risk.]

### Internal Champion
[Who advocated for you internally? CS should nurture this relationship.]

### Potential Blocker
[Anyone who was skeptical or opposed? CS should be aware.]

## Technical Context
| Item | Detail |
|------|--------|
| Integration requirements | [What needs to connect] |
| Data migration | [Scope of migration] |
| Technical constraints | [Known limitations or requirements] |
| Security/compliance | [Any special requirements] |

## Expansion Opportunity
[What wasn't included in this deal but could be a future upsell? What signals to watch for.]

## Risk Flags
| Risk | Severity | Mitigation |
|------|----------|------------|
| [Risk] | 🔴🟡🟢 | [What CS should do] |

## Attachments / References
- [Link to proposal]
- [Link to SOW]
- [Link to call recordings]
- [Link to CRM opportunity]
```

### 3. AE → SE Handoff
Brief but precise — what the SE needs to prep a demo or POC.

### 4. Sales → Implementation Handoff
Scope, timeline, technical requirements, customer expectations, and known risks.

---

## Handoff Quality Score

Every handoff gets scored on completeness:

| Section | Weight | Score |
|---------|--------|-------|
| Customer context | 20% | [Complete / Partial / Missing] |
| Expectations & success criteria | 25% | [Score] |
| Risk flags | 15% | [Score] |
| Technical requirements | 15% | [Score] |
| Relationship context | 15% | [Score] |
| Action items | 10% | [Score] |

**Overall:** [X/100] — handoffs below 70 get flagged for additional information.

---

## Related Skills

- **deal-qualification** → Qualification data feeds directly into handoff context
- **proposal-builder** → Proposal content referenced in handoff
- **expansion-playbook** → Expansion opportunities identified during handoff
- **gtm-memory** → Handoff context stored for future reference
