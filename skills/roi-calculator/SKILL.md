---
name: roi-calculator
description: Build ROI analyses, TCO comparisons, and value calculators for prospects. Use this skill when a rep needs to justify the investment to a prospect, build a business case with numbers, create an ROI model, compare total cost of ownership, says "build me an ROI calculator", "what's the payback period", "help me show the value", "TCO comparison", or when a prospect asks "what's the return on this?". Also trigger when building value engineering tools, cost-benefit analyses, or investment justification documents.
---

# ROI Calculator

Help reps quantify the value of their solution in the prospect's specific context. An ROI analysis turns "our product is great" into "here's exactly how much money this saves you and how fast you'll see the return." It's the single most powerful tool for getting budget approved.

## Why ROI Matters in B2B Sales

- Finance stakeholders approve budgets with numbers, not stories
- Champions need ammunition to sell internally — an ROI model is that ammunition
- It reframes the conversation from "cost" to "investment"
- It creates urgency by quantifying the cost of delay

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                      ROI CALCULATOR                               │
├─────────────────────────────────────────────────────────────────┤
│  MODELS                                                           │
│  1. ROI Analysis — Return on investment with payback period      │
│  2. TCO Comparison — Total cost of ownership vs alternatives     │
│  3. Cost of Inaction — What it costs to NOT buy your solution    │
│  4. Value Calculator — Interactive model prospects can customize  │
├─────────────────────────────────────────────────────────────────┤
│  OUTPUT                                                           │
│  • Financial model with assumptions clearly stated               │
│  • Executive-ready summary                                       │
│  • Sensitivity analysis (best/likely/worst case)                 │
│  • Interactive HTML calculator (if requested)                    │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Deal size, company revenue, and team context           │
│  + ~~CRM: Current solution and contract details                  │
│  + ~~conversation intelligence (Gong): Discovery call metrics    │
│  + ~~conversation intelligence (Gong): Prospect-stated costs     │
│  + ~~data enrichment (ZoomInfo): Company financials & headcount  │
│  + ~~data enrichment (ZoomInfo): Industry and tech stack context │
│  + ~~data enrichment (Clay): Company enrichment and signals      │
│  + ~~data enrichment (LinkedIn): Company growth and hiring data  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "Build an ROI model for [Company] — our product costs $X and saves them Y"
- "What's the payback period for a $50K deal that saves 10 hours per week?"
- "Create a TCO comparison: us vs their current solution"
- "Help me quantify the cost of inaction for [prospect]"
- "Build me a value calculator I can share with the prospect"

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking for pricing and cost data, pull everything from connected tools. Real company data makes the ROI model dramatically more credible than industry averages.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Find the deal.** Search `deals` for the company/deal name the user mentioned.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`
   - The `amount` field gives you the investment number for the ROI model
2. **Pull company.** Get associated company data.
   - Properties: `name`, `domain`, `industry`, `numberofemployees`, `annualrevenue`, `description`, `founded_year`
   - Annual revenue → market context for the ROI model
   - Employee count → headcount-based savings calculations
3. **Pull contacts.** Get associated contacts for the deal.
   - Properties: `firstname`, `lastname`, `jobtitle`, `email`
   - Titles tell you who the ROI model needs to convince (CFO wants different metrics than VP Ops)
4. **Check for prior deals or products.** Search for other deals with this company to understand current spend and contract history.

#### Sales Intelligence Data Pull

**ZoomInfo** (if available):
1. **Get company financials.** Use `zoominfo_search_company` with the prospect company name/domain.
   - Revenue, employee count, funding → calibrate the ROI model to their scale
   - Industry → select appropriate industry benchmarks
2. **Get tech stack.** Use `zoominfo_get_tech_stack` for the prospect company.
   - Current tools and costs → feeds TCO comparison directly

**Clay** (if available):
1. **Enrich the company.** Use `clay_enrich_company` with the prospect company domain.
   - Additional financial data, growth signals, and company context

**LinkedIn** (if available):
1. **Search company updates.** Use `linkedin_search_companies` for hiring trends and growth indicators.
   - Rapid hiring → opportunity for headcount-efficiency arguments
   - Growth trajectory → tie ROI to scaling challenges

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

1. **Find discovery calls.** Use `gong_search_calls` with the company name.
2. **Pull transcripts.** Use `gong_get_transcript` on discovery calls.
   - Extract: specific cost numbers the prospect mentioned ("we spend $X on...", "it takes us Y hours to...")
   - Extract: stated goals and success metrics they care about
   - Extract: their current process and pain points (feeds "Current State" in value drivers)
3. **Use prospect-stated numbers** as the primary inputs — their own data is the most credible input for an ROI model.

#### Present What You Found

> "I pulled context for the **[Company]** ROI model: **$[X] deal size** per CRM. Per ZoomInfo, they're a **$[X]M revenue** company with **[N] employees** in **[industry]**. [If Gong:] On the discovery call, they mentioned spending **$[X] per month** on [current solution] and losing **[N] hours per week** to [problem]. Building the ROI model with their actual numbers now..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the tools couldn't provide:
- **Your solution's specific efficiency gains** — What does your product actually improve?
- **Pricing structure** — If not in CRM deal data
- **Implementation costs** — One-time costs beyond subscription
- **Prospect-specific cost data** — Anything not captured in discovery (ask the rep what they know)

### Step 2: Generate the ROI Model

Build using ALL evidence. Use prospect-stated numbers (from Gong) as primary inputs. Use ZoomInfo/CRM data as secondary inputs. Use industry benchmarks only as fallback. Cite sources: "Per prospect (Gong discovery call):", "Per CRM:", "Per ZoomInfo:", "Industry benchmark:"

### Step 3: Store Insights

- Update `memory/deal-patterns.md` with ROI drivers that resonate by industry/persona
- Update `memory/product.md` with new cost/value data points discovered
- Log the analysis in `memory/changelog.md`

---

## What I Need From You (When Tools Aren't Connected)

**About your solution:**
1. **Price** — Total investment (or annual cost)
2. **Implementation cost/time** — Any upfront investment beyond the subscription
3. **What it does** — Specific efficiency gains, cost reductions, revenue impact

**About the prospect:**
1. **Their current costs** — What they're spending now (time, money, tools, headcount)
2. **Their pain** — What problems this solves and how much those cost
3. **Team size** — How many people are affected
4. **Revenue context** — Company size, deal values, or other relevant financial context

Don't worry if you don't have everything — I'll use reasonable industry assumptions and clearly label them. The prospect can adjust.

---

## ROI Analysis Framework

### Revenue Impact
- New revenue enabled (faster sales, better conversion, larger deals)
- Revenue retention (reduced churn, faster renewals)
- Revenue acceleration (shorter sales cycles, faster time-to-value)

### Cost Reduction
- Labor savings (time saved × fully loaded cost per hour)
- Tool consolidation (replacing existing software costs)
- Error reduction (cost of mistakes, rework, compliance risk)
- Operational efficiency (process improvement, automation gains)

### Strategic Value (harder to quantify but important)
- Competitive advantage
- Risk mitigation
- Employee satisfaction and retention
- Scalability without headcount growth

---

## Output Format: ROI Analysis

```markdown
# ROI Analysis: [Your Solution] for [Company]

**Prepared:** [Date]
**Annual Investment:** $[amount]
**Projected Annual Return:** $[amount]
**ROI:** [X]%
**Payback Period:** [X months]

---

## Executive Summary

[2-3 sentences: "Based on [Company]'s specific situation, we project a [X]% ROI with a [X]-month payback period. The primary value drivers are [top 2-3]. Conservative estimates suggest $[X] in annual savings/revenue impact."]

---

## Investment

| Component | Annual Cost |
|-----------|-----------|
| [Product/license] | $[amount] |
| [Implementation] | $[amount] (one-time) |
| [Training] | $[amount] (one-time) |
| **Total Year 1** | **$[amount]** |
| **Annual Recurring** | **$[amount]** |

---

## Value Drivers

### 1. [Value Driver Name] — $[amount]/year

**Current State:** [What they do today and what it costs]
**Future State:** [What changes with your solution]
**Calculation:**
- [Input] × [Rate] × [Factor] = $[amount]

**Assumption:** [Clearly state the assumption and how to verify]

### 2. [Value Driver Name] — $[amount]/year
[Same structure]

### 3. [Value Driver Name] — $[amount]/year
[Same structure]

---

## Three-Year Projection

| | Year 1 | Year 2 | Year 3 | Total |
|---|--------|--------|--------|-------|
| **Investment** | $[X] | $[X] | $[X] | $[X] |
| **Returns** | $[X] | $[X] | $[X] | $[X] |
| **Net Value** | $[X] | $[X] | $[X] | $[X] |
| **Cumulative ROI** | [X]% | [X]% | [X]% | [X]% |

---

## Sensitivity Analysis

| Scenario | Annual Return | ROI | Payback |
|----------|-------------|-----|---------|
| **Conservative** (50% of projected) | $[X] | [X]% | [X] months |
| **Expected** | $[X] | [X]% | [X] months |
| **Optimistic** (150% of projected) | $[X] | [X]% | [X] months |

Even in the conservative scenario, the investment pays for itself in [X] months.

---

## Cost of Delay

Every month you wait costs approximately $[monthly impact]:
- [Cost element 1]: $[X]/month
- [Cost element 2]: $[X]/month

Over a typical [X]-month evaluation cycle, the cost of delay is $[total].

---

## Assumptions and Methodology

| Assumption | Value | Source |
|-----------|-------|--------|
| [Assumption 1] | [Value] | [Prospect-provided / Industry benchmark / Estimate] |
| [Assumption 2] | [Value] | [Source] |

All assumptions are adjustable. We recommend validating these numbers with your finance team.

---

## Sources
- [Industry benchmarks used]
- [Research cited]
```

---

## Interactive Calculator Option

When requested, I can build an HTML calculator the rep can share with the prospect. It includes:
- Input fields for the prospect to enter their own numbers
- Real-time ROI calculation
- Visual charts showing payback timeline
- Downloadable summary

This is powerful because it puts the prospect in control — they trust their own numbers more than yours.

---

## Tips for Effective ROI Conversations

1. **Use their numbers, not yours** — Ask the prospect for their cost data. They'll trust it more.
2. **Be conservative** — Under-promise. A believable 150% ROI beats an unbelievable 500% ROI.
3. **Label every assumption** — Transparency builds trust. Let them challenge your inputs.
4. **Include soft costs** — Opportunity cost, employee frustration, and risk are real even if harder to quantify.
5. **Cost of delay is your friend** — "Every month you wait costs $X" creates urgency without pressure.

---

## Related Skills

- **proposal-builder** — Embed the ROI analysis in a formal proposal
- **deal-qualification** — ROI data fills the "Metrics" criterion in MEDDIC
- **objection-handling** — Use ROI data to handle price objections
- **discovery-guide** — Better discovery gives you better inputs for the ROI model
