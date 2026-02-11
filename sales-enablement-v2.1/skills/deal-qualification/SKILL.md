---
name: deal-qualification
description: Qualify sales deals using MEDDIC, BANT, SPICED, or CHAMP frameworks with structured scoring and gap analysis. Use this skill whenever a rep needs to qualify a deal, assess deal health, decide whether to invest more time in an opportunity, says "should I pursue this deal", "qualify this opportunity", "MEDDIC score", "BANT check", or asks about deal qualification criteria. Also trigger when a manager reviews pipeline quality or when someone mentions deal scoring, opportunity assessment, or go/no-go decisions.
---

# Deal Qualification

Help reps and managers objectively assess whether a deal is worth pursuing, identify gaps in qualification, and decide where to invest their time. The worst thing in sales is spending months on a deal that was never going to close — qualification prevents that.

## Frameworks

### MEDDIC (Recommended for Enterprise B2B SaaS)
The gold standard for complex, multi-stakeholder deals:

- **M — Metrics:** What quantifiable outcomes does the prospect expect?
- **E — Economic Buyer:** Who has the budget authority and final say?
- **D — Decision Criteria:** What factors will they use to choose a vendor?
- **D — Decision Process:** What are the steps, stakeholders, and timeline?
- **I — Identify Pain:** What specific problem are they solving?
- **C — Champion:** Who inside the account is actively selling for you?

### BANT (Good for Simpler or Faster Sales Cycles)
- **B — Budget:** Do they have money allocated?
- **A — Authority:** Are you talking to the decision-maker?
- **N — Need:** Do they have a real problem you solve?
- **T — Timeline:** Is there urgency to act?

### SPICED (Good for Customer-Centric Selling)
- **S — Situation:** What's their current state?
- **P — Pain:** What's broken or missing?
- **I — Impact:** What happens if they don't fix it?
- **C — Critical Event:** Is there a forcing function or deadline?
- **E — Economic Decision:** Who decides and how?
- **D — Decision Criteria:** How will they evaluate options?

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                   DEAL QUALIFICATION                              │
├─────────────────────────────────────────────────────────────────┤
│  MODES                                                            │
│  1. Score a Deal — Rate a specific opportunity on all criteria    │
│  2. Gap Analysis — Identify what's missing and how to fill it    │
│  3. Go/No-Go — Make a structured decision on whether to pursue   │
│  4. Pipeline Audit — Score multiple deals for prioritization      │
├─────────────────────────────────────────────────────────────────┤
│  OUTPUT                                                           │
│  • Qualification scorecard with red/yellow/green per criterion   │
│  • Gap analysis with specific next actions                       │
│  • Risk assessment and overall confidence level                  │
│  • Comparison against ideal deal profile                         │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Deal data, contacts, company, and engagement velocity  │
│  + ~~CRM: Stage progression and probability scoring              │
│  + ~~conversation intelligence (Gong): Discovery call transcripts│
│  + ~~conversation intelligence (Gong): Champion engagement signals│
│  + ~~conversation intelligence (Gong): Competitor mentions in calls│
│  + ~~data enrichment (ZoomInfo): Company profile validation      │
│  + ~~data enrichment (ZoomInfo): Org chart for buying committee  │
│  + ~~data enrichment (Clay): Company signals and enrichment      │
│  + ~~data enrichment (LinkedIn): Stakeholder backgrounds         │
│  + ~~data enrichment (LinkedIn): Champion activity and tenure    │
│  + ~~chat: Internal deal discussions and risk flags              │
│  + ~~calendar/email: Meeting history and engagement signals      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "Score this deal using MEDDIC"
- "Is this deal worth pursuing? Here's what I know..."
- "What gaps do I have in qualifying [Company]?"
- "Review my pipeline — which deals are real?"
- "I have a go/no-go meeting — help me prepare"

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking the user for deal context, check what MCP tools are available and pull data automatically. Reps should never have to paste data that already lives in their tools.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar CRM search/get functions in your available tools).

If CRM tools ARE available:

1. **Find the deal.** Search the `deals` object type using whatever identifier the user gave you.
   - Request these properties: `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `notes_last_updated`, `notes_last_contacted`, `num_notes`, `hs_deal_stage_probability`, `hs_forecast_amount`
   - If the user said "qualify my Acme deal", search with query "Acme" on the `deals` object type
   - If multiple deals match, present them and ask which one

2. **Pull associated contacts.** Once you have the deal ID, search for contacts associated with this deal.
   - Search the `contacts` object type with association filter: `associatedWith` → `objectType: "deals"`, `operator: "EQUAL"`, `objectIds: ["<deal_id>"]`
   - Request these contact properties: `firstname`, `lastname`, `jobtitle`, `email`, `phone`, `company`, `hs_lead_status`, `lifecyclestage`
   - **Map contacts to MEDDIC roles** based on job title:
     - C-suite, VP, Director titles → likely **Economic Buyer** candidates
     - Primary contact with most engagement → likely **Champion**
     - Technical titles (Engineer, Architect, IT) → **Technical Evaluator**
     - Procurement, Legal, Finance titles → **Decision Process** gatekeepers

3. **Pull associated company.** Search `companies` with association to the deal.
   - Properties: `name`, `domain`, `industry`, `numberofemployees`, `annualrevenue`, `total_revenue`, `description`, `about_us`, `founded_year`, `country`
   - Use this to assess deal size relative to company size

4. **Assess engagement velocity.**
   - `notes_last_contacted` — No contact in 14+ days on an active deal = 🔴 risk flag
   - `num_notes` — Low activity count + long cycle = stalling signal
   - `hs_deal_stage_probability` — Compare CRM probability vs your MEDDIC assessment

#### Chat Data Pull

Check if you have access to chat tools (look for `slack_search_public`, `slack_search_public_and_private`, `chat_message_search`).

If chat tools ARE available:
1. Search for the company/deal name in sales channels
2. Look for competitive intel, blockers, or internal sentiment
3. Surface risk flags mentioned by teammates — this context rarely makes it into the CRM

#### Conversation Intelligence Data Pull (Gong)

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:
1. **Pull discovery calls.** Use `gong_search_calls` with the company/deal name.
   - Look for discovery and qualification calls specifically
   - Use `gong_get_transcript` on the most recent calls to extract:
     - Pain points articulated by the prospect (fills **Identify Pain**)
     - Decision process details mentioned (fills **Decision Process**)
     - Budget/metrics discussions (fills **Metrics** and **Economic Buyer**)
     - Competitor mentions (flags competitive risk)
2. **Assess champion engagement.** Use `gong_search_calls_by_participant` with the champion's email.
   - Frequency of calls → Champion still engaged or going dark?
   - Talk patterns → Are they selling internally for you?
3. **Get call stats.** Use `gong_get_call_stats` for calls related to this deal.
   - Talk-to-listen ratio → Did the rep actually do discovery or just pitch?
   - Questions asked → Was qualification thorough?
   - Next steps confirmed → Is the process advancing?

#### Sales Intelligence Data Pull (ZoomInfo / Clay / LinkedIn)

**ZoomInfo** (check for tools prefixed with `zoominfo_`):
1. **Validate company profile.** Use `zoominfo_search_company` with the prospect company name.
   - Employee count, revenue, industry → Validate deal size is realistic
   - Growth signals → Is this company in a position to buy?
2. **Map buying committee.** Use `zoominfo_get_org_chart` to identify:
   - Who reports to the Economic Buyer → potential blockers
   - Technical evaluators not yet in the CRM → missing stakeholders
   - Procurement/Legal contacts → anticipate Decision Process steps
3. **Get tech stack.** Use `zoominfo_get_tech_stack` for the prospect company.
   - Current tools they use → competitive displacement opportunity or integration angle

**Clay** (check for tools prefixed with `clay_`):
1. **Enrich prospect company.** Use `clay_enrich_company` for recent signals.
   - Funding rounds, hiring surges, leadership changes → buying triggers or red flags
   - Growth trajectory → validates budget availability

**LinkedIn** (check for tools prefixed with `linkedin_`):
1. **Research key contacts.** Use `linkedin_get_profile` for the Economic Buyer and Champion.
   - Career tenure → Will they be around to see the deal through?
   - Previous companies → Did they use your product (or a competitor's) before?
   - Shared connections → Warm introduction opportunities
2. **Validate org structure.** Use `linkedin_search_leads` at the prospect company.
   - Cross-check against CRM contacts → Are we missing stakeholders?

#### Calendar/Email Pull

Check if you have access to calendar or email tools (look for `outlook_calendar_search`, `outlook_email_search`).

If available:
1. Search upcoming meetings with the prospect company name
2. Search recent emails for engagement signals

#### Present What You Found

After pulling data, present a brief summary:

> "I pulled the **[Deal Name]** deal from your CRM — **$[amount]** in **[stage]** stage, expected close **[date]**. I found **[N] contacts** including [Name] ([Title]) who looks like your Economic Buyer and [Name] ([Title]) as your primary contact. The company is a [industry] company with [N] employees.
>
> Here's what I still need from you to complete the qualification: [list specific gaps]"

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for information you couldn't find in the tools.

---

## What I Need From You

If I pulled data from your CRM, I'll pre-fill what I can and only ask about gaps. If no tools are connected, tell me everything you know:

1. **Company and deal size** — Who and how big?
2. **What you're selling** — Product, use case, proposed solution
3. **Who you're talking to** — Names, titles, roles in the decision
4. **What you've learned** — Pain points, requirements, timeline
5. **Where you are in the process** — Stage, next steps, blockers
6. **Framework preference** — MEDDIC, BANT, SPICED, or "you decide"

**When tools are connected:** I'll already have items 1, 3, and 5 from your CRM. I'll focus on items 2, 4, and 6 — the context that lives in your head, not your CRM.

### Step 2: Score Using Framework

Apply the framework against ALL evidence — CRM data, chat context, calendar signals, and user input. Cite tool-sourced evidence in the scorecard: "Per CRM, last contact was 18 days ago — scoring Engagement low."

### Step 3: Store Insights

After generating the scorecard:
- Update `memory/deal-patterns.md` with qualification insights and scores
- Update `memory/team.md` if rep-specific patterns emerge
- Flag competitive intel for `memory/competitors.md`
- If the deal scored 🔴 on Champion, suggest running the **discovery-guide** skill

---

## Output Format: Deal Scorecard

```markdown
# Deal Qualification: [Company Name]

**Date:** [Today]
**Framework:** [MEDDIC]
**Deal Size:** [$ amount]
**Stage:** [Current stage]
**Rep:** [Name]

---

## Qualification Score: [X / 30]

| Criterion | Score (0-5) | Status | Evidence |
|-----------|------------|--------|----------|
| **Metrics** | [0-5] | 🟢🟡🔴 | [What we know] |
| **Economic Buyer** | [0-5] | 🟢🟡🔴 | [What we know] |
| **Decision Criteria** | [0-5] | 🟢🟡🔴 | [What we know] |
| **Decision Process** | [0-5] | 🟢🟡🔴 | [What we know] |
| **Identify Pain** | [0-5] | 🟢🟡🔴 | [What we know] |
| **Champion** | [0-5] | 🟢🟡🔴 | [What we know] |

**Score Guide:** 🟢 25-30 (Strong) | 🟡 15-24 (Needs Work) | 🔴 0-14 (At Risk)

---

## Confidence Level: [High / Medium / Low]

[One paragraph assessment of overall deal health and likelihood to close]

---

## Gap Analysis

### Critical Gaps (Must Fill)
1. **[Gap]** — [Why it matters] — **Action:** [Specific step to fill this gap]
2. **[Gap]** — [Why it matters] — **Action:** [Step]

### Important Gaps (Should Fill)
1. **[Gap]** — **Action:** [Step]

### Nice to Have
1. **[Gap]** — **Action:** [Step]

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| [Risk 1] | High/Med/Low | [What to do] |
| [Risk 2] | ... | ... |

---

## Recommended Next Steps

1. [Most important action with specific guidance]
2. [Second priority]
3. [Third priority]

---

## Go / No-Go Recommendation

**Recommendation:** [PURSUE / PURSUE WITH CAUTION / DEPRIORITIZE / WALK AWAY]

**Rationale:** [Why — based on the evidence]

**Conditions to Continue:** [What must be true to keep investing in this deal]
```

---

## Scoring Guide

Each criterion scores 0-5:

- **5 — Fully Validated:** Clear evidence, confirmed by the prospect
- **4 — Strong Indication:** Good evidence but not fully confirmed
- **3 — Partial:** Some information but significant gaps remain
- **2 — Assumed:** Based on inference, not direct confirmation
- **1 — Unknown:** We know we need this but don't have it
- **0 — Missing/Negative:** No information or actively concerning signals

---

## Pipeline Audit Mode

When reviewing multiple deals, I'll produce a ranked list:

```markdown
# Pipeline Qualification Audit

| Rank | Deal | Size | Score | Confidence | Key Risk | Action |
|------|------|------|-------|------------|----------|--------|
| 1 | [Deal A] | $X | 26/30 | High | [Risk] | [Action] |
| 2 | [Deal B] | $X | 21/30 | Medium | [Risk] | [Action] |
| ... | ... | ... | ... | ... | ... | ... |

## Summary
- **Strong deals:** [Count] worth $[total]
- **At-risk deals:** [Count] worth $[total] — need attention this week
- **Recommended deprioritize:** [Count] worth $[total]
```

---

## Related Skills

- **discovery-guide** — Fill qualification gaps with better discovery
- **proposal-builder** — Build proposals for well-qualified deals
- **win-loss-analysis** — Learn from past deal outcomes to improve qualification
- **roi-calculator** — Quantify the Metrics criterion
