---
name: buyer-persona
description: Build and refine ideal customer profiles (ICPs) and buyer personas with pain points, motivations, and messaging guidance. Use this skill whenever someone needs to define their target buyer, create buyer personas, refine their ICP, understand a specific buyer type, says "who should we be selling to", "build a buyer persona for [role]", "define our ICP", "what does a [title] care about", or when developing messaging for a specific audience. Also trigger when someone mentions ideal customer profile, buyer journey, persona development, customer segmentation, or target market definition.
---

# Buyer Persona

Build detailed, actionable buyer personas that help reps understand who they're selling to and what those people actually care about. Good personas aren't demographic profiles — they're empathy tools that help your team see the world through your buyer's eyes.

## Why Personas Matter for Sales

- Reps who understand their buyer's daily reality build stronger rapport
- Messaging that speaks to specific pain points converts better than generic pitches
- Discovery is more productive when you know what questions to ask each persona
- Proposals land harder when they address the buyer's specific priorities
- Objection handling improves when you understand the buyer's real concerns

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                     BUYER PERSONA                                 │
├─────────────────────────────────────────────────────────────────┤
│  MODES                                                            │
│  1. Build Persona — Create a detailed buyer persona from scratch │
│  2. ICP Definition — Define ideal company + buyer characteristics│
│  3. Buying Committee — Map all stakeholders in a typical deal    │
│  4. Persona Messaging — Create tailored messaging per persona    │
│  5. Journey Mapping — Map the buyer's journey and touchpoints    │
├─────────────────────────────────────────────────────────────────┤
│  ALWAYS (works standalone)                                        │
│  • Web research on the role, industry, and common challenges     │
│  • Your input on what you've observed from real customers        │
│  • Industry benchmarks and trends                                │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Real deal data — who buys, company profiles, patterns  │
│  + ~~data enrichment (ZoomInfo): Firmographic, technographic data│
│  + ~~data enrichment (ZoomInfo): Contact search by title/dept    │
│  + ~~data enrichment (Clay): Person & company enrichment         │
│  + ~~data enrichment (LinkedIn): Lead profiles, seniority data   │
│  + ~~chat: Team observations about this buyer type               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "Build a buyer persona for VP of Engineering at a mid-market SaaS company"
- "Define our ideal customer profile"
- "Map the typical buying committee for our product"
- "What does a Chief Revenue Officer care about?"
- "Help me create messaging that resonates with [persona]"
- "Map the buyer journey for our ICP"

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking the user to describe their buyer, check what MCP tools are available and ground the persona in real data. Personas built from data beat personas built from assumptions.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Pull won deals to profile real buyers.** Search `deals` with `dealstage` = Closed Won stages, last 180 days.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `createdate`
   - Get associated `contacts` for these deals — their titles, roles, and seniority ARE your persona data
   - Get associated `companies` — industry, size, revenue = your ICP data

2. **Analyze contact titles.** From won deal contacts:
   - Group by `jobtitle` to find the most common buyer titles
   - Map titles to persona roles (Economic Buyer, Champion, Technical Evaluator)
   - Identify which titles appear in the most won deals (high-correlation personas)

3. **Build ICP from company data.** From won deal companies:
   - Calculate distributions: most common `industry`, `numberofemployees` ranges, `annualrevenue` ranges
   - These become the "Ideal" column in the ICP table — backed by real data, not guesses

#### Sales Intelligence Data Pull

Check if you have access to sales intelligence tools (look for tools prefixed with `zoominfo_`, `clay_`, `linkedin_`).

**ZoomInfo** (if available):
1. **Search contacts by target title.** Use `zoominfo_search_contact` with the target persona title, filtered by relevant industries.
   - Get: typical management level, department, seniority patterns
   - This validates whether the target title is common enough to be a real persona
2. **Search companies matching ICP.** Use `zoominfo_search_company` to validate ICP criteria.
   - Confirm company size, revenue ranges, and industry segments match real market data

**Clay** (if available):
1. **Enrich sample contacts.** Use `clay_enrich_person` on 2-3 real contacts from won deals.
   - Get enriched profiles: background, tenure, career path, social presence
   - These real profiles ground the "Professional Profile" section of the persona

**LinkedIn** (if available):
1. **Search leads by title and seniority.** Use `linkedin_search_leads` with the target persona title.
   - Validate typical seniority levels, geographic distribution
   - Identify common career paths for this persona type
2. **Get sample profiles.** Use `linkedin_get_profile` on 1-2 real contacts from won deals.
   - Career progression, skills, endorsements reveal what this persona values

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:
1. **Search calls with this persona type.** Use `gong_search_calls` to find calls where contacts with this title participated.
2. **Analyze call patterns.** Use `gong_get_call_details` on 3-5 calls:
   - What topics do they raise? (reveals real pain points)
   - What questions do they ask? (reveals decision criteria)
   - What objections do they voice? (reveals real concerns)

#### Chat Data Pull

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for the persona title/role in sales channels
2. Look for observations about this buyer type from the field team
3. Surface win/loss stories involving this persona

#### Present What You Found

> "I analyzed **[N] won deals** from your CRM and found the most common buyer title is **[Title]** (appeared in [X]% of wins). Your best customers are **[Industry]** companies with **[N]-[N] employees**. I enriched [N] real contact profiles via ZoomInfo/Clay and found [N] Gong calls with this persona type. Building the persona from this data..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the data doesn't tell you:

1. **Your product** — What you sell and what problem it solves (if not in memory/product.md)
2. **Your experience** — Qualitative observations about this buyer type that data can't capture
3. **Framework preference** — What mode do you want? (Persona, ICP, Buying Committee, Messaging, Journey)

When tools ARE connected, skip questions about company size, industry, and buyer titles — you already have that from CRM data.

### Step 2: Build the Persona

Combine ALL evidence: CRM deal patterns, enrichment profiles, Gong call insights, Slack observations, web research, and user input. Cite sources: "Per CRM (N=47 won deals):", "Per ZoomInfo:", "Per Gong:", "User reported:"

### Step 3: Store Insights

- Update `memory/icp.md` with validated ICP attributes from CRM data
- Update `memory/deal-patterns.md` with persona-to-outcome correlations
- Register the persona in `memory/content-registry.md`

---

## Output Format: Buyer Persona

```markdown
# Buyer Persona: [Persona Name]

**Title:** [Typical titles for this persona]
**Reports to:** [Who they report to]
**Team:** [Who reports to them]
**Company Type:** [Size, industry, stage]

---

## A Day in Their Life

[2-3 paragraphs describing what this person's work life actually looks like. What do they spend their time on? What meetings dominate their calendar? What metrics keep them up at night? What does success look like for them?]

---

## Professional Profile

| Attribute | Detail |
|-----------|--------|
| **Experience** | [Typical career path] |
| **Key Responsibilities** | [Top 3-5 responsibilities] |
| **Measured On** | [KPIs and metrics they're judged by] |
| **Reports To** | [Their boss and what the boss cares about] |
| **Budget Authority** | [What they can approve, what needs escalation] |
| **Tech Savviness** | [How comfortable with technology] |

---

## Pain Points

### Top Professional Pains
1. **[Pain 1]** — [How it manifests in their daily work]
2. **[Pain 2]** — [How it affects their goals]
3. **[Pain 3]** — [Why it's hard to solve]

### Underlying Fears
- [What they're afraid will happen if problems aren't solved]
- [Career risk or political risk they worry about]

### What They've Tried
- [Previous solutions or approaches they've taken]
- [Why those didn't fully work]

---

## Motivations and Goals

### Professional Goals
1. [What they're trying to achieve in their role]
2. [What success looks like for them this year]
3. [What would earn them a promotion]

### Personal Motivations
- [What drives them beyond the job description]
- [How they want to be perceived by peers and leadership]

### Buying Triggers
- [Events or situations that make them start looking for a solution]
- [Signals that indicate they're in buying mode]

---

## How They Buy

### Information Sources
- [Where they learn about new solutions: peers, analysts, events, social]
- [Who they trust for recommendations]

### Decision-Making Style
- [Analytical vs. intuitive, consensus vs. unilateral]
- [How they evaluate vendors — formal RFP, informal eval, committee]

### Common Objections
1. "[Typical objection]" — [What they really mean]
2. "[Objection]" — [Real concern]
3. "[Objection]" — [Real concern]

### What Wins Their Trust
- [Evidence types: case studies, ROI data, peer references, demos]
- [Communication style they prefer]
- [Red flags that make them disengage]

---

## Messaging That Resonates

### Opening Hook
> "[A first line that would get their attention because it speaks to their world]"

### Value Proposition (For This Persona)
> "[Your product value framed in terms of what they care about]"

### Proof Points They Want
1. [Type of evidence they find compelling]
2. [Specific metric or outcome that matters]
3. [Social proof format they trust]

### Language to Use
- [Terms and phrases that resonate with this buyer]
- [Industry-specific language they use]

### Language to Avoid
- [Terms that feel salesy, generic, or off-putting to this buyer]
- [Jargon from the wrong domain]

---

## Discovery Questions for This Persona

1. "[Question tailored to their specific situation]"
2. "[Question about their pain points]"
3. "[Question about their decision process]"
4. "[Question about their success metrics]"
5. "[Question about their timeline and urgency]"

---

## Relationship to Other Personas

| Persona | Relationship | Their Influence |
|---------|-------------|----------------|
| [Their Boss] | Approver | [How they influence the deal] |
| [Their Peer] | Influencer | [Role in the decision] |
| [End User] | User | [How they factor in] |

---

## Sources
- [Research sources]
- [Industry reports]
- [Customer interview insights if shared]
```

---

## ICP Definition Mode

When defining the ideal company profile:

```markdown
# Ideal Customer Profile

## Company Characteristics
| Attribute | Ideal | Acceptable | Disqualify |
|-----------|-------|------------|------------|
| Size (employees) | [Range] | [Range] | [Range] |
| Revenue | [Range] | [Range] | [Range] |
| Industry | [List] | [List] | [List] |
| Growth Stage | [Stage] | [Stage] | [Stage] |
| Tech Stack | [Requirements] | [Nice to have] | [Blockers] |

## Trigger Events
[Events that indicate a company is ready to buy]

## Disqualification Criteria
[Hard no-go signals]
```

---

## Related Skills

- **discovery-guide** — Use persona insights to tailor discovery questions
- **playbook-builder** — Embed personas into sales playbooks
- **proposal-builder** — Customize proposals based on persona priorities
- **objection-handling** — Prepare persona-specific objection responses
