---
name: discovery-guide
description: Run structured discovery calls using SPIN, Sandler, or Challenger frameworks with tailored question sets and call guides. Use this skill whenever a rep needs help preparing discovery questions, is about to do a first call with a new prospect, wants a discovery call template, says "what questions should I ask", "help me prepare for a discovery call", "I need a call guide", or is working on improving their discovery process. Also trigger when someone mentions SPIN selling, Sandler, Challenger, or gap selling in a sales context.
---

# Discovery Guide

Help reps run better discovery calls by asking the right questions in the right order. Discovery is the most important part of the sales process — everything downstream (demo, proposal, close) depends on how well you understand the prospect's situation.

## Why Discovery Matters

Bad discovery leads to generic demos, weak proposals, and lost deals. Good discovery:
- Uncovers the real problem (not just the stated one)
- Identifies all stakeholders and their priorities
- Quantifies the impact of the problem (sets up ROI conversations)
- Establishes urgency and timeline
- Gives you everything you need for a compelling demo and proposal

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                     DISCOVERY GUIDE                               │
├─────────────────────────────────────────────────────────────────┤
│  MODES                                                            │
│  1. Call Prep — Generate a tailored discovery guide for a call    │
│  2. Framework Training — Learn SPIN, Sandler, or Challenger      │
│  3. Question Library — Browse questions by topic and stage        │
│  4. Call Review — Evaluate discovery quality from a transcript    │
├─────────────────────────────────────────────────────────────────┤
│  FRAMEWORKS                                                       │
│  • SPIN — Situation, Problem, Implication, Need-Payoff           │
│  • Sandler — Pain, Budget, Decision                              │
│  • Challenger — Teach, Tailor, Take Control                      │
│  • MEDDIC-aligned — Metrics, Economic Buyer, Decision Criteria   │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Deal/contact/company data for pre-call context         │
│  + ~~conversation intelligence (Gong): Past calls with prospect  │
│  + ~~conversation intelligence (Gong): Call review from transcript│
│  + ~~data enrichment (ZoomInfo): Company research, org chart     │
│  + ~~data enrichment (Clay): Person enrichment for attendees     │
│  + ~~data enrichment (LinkedIn): Prospect profiles and background│
│  + ~~calendar/email: Meeting context and prior correspondence    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "Prepare discovery questions for my call with [Company]"
- "Give me a SPIN framework call guide for [industry/persona]"
- "What questions should I ask a VP of Engineering about [topic]?"
- "Build a discovery question library for our SDR team"
- "Review my discovery call transcript — did I miss anything?"

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking for prospect context, pull everything available from connected tools. The best discovery calls start with thorough pre-call research — and tools can do that research in seconds.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Find the deal.** Search `deals` for the company/prospect name the user mentioned.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `notes_last_contacted`, `num_notes`
2. **Pull contacts.** Get associated contacts for the deal.
   - Properties: `firstname`, `lastname`, `jobtitle`, `email`, `phone`, `company`, `lifecyclestage`
   - Identify which contact the rep is meeting
3. **Pull company.** Get associated company data.
   - Properties: `name`, `domain`, `industry`, `numberofemployees`, `annualrevenue`, `description`, `about_us`, `founded_year`, `country`
   - Use this to pre-fill the "Pre-Call Context" and skip Situation Questions you already know answers to

#### Sales Intelligence Data Pull

Check if you have access to sales intelligence tools (look for tools prefixed with `zoominfo_`, `clay_`, `linkedin_`).

**ZoomInfo** (if available):
1. **Research the company.** Use `zoominfo_search_company` with the prospect company name/domain.
   - Company size, revenue, funding, tech stack, industry
2. **Get org chart.** Use `zoominfo_get_org_chart` to understand the prospect's reporting structure.
   - Who does your contact report to? (potential Economic Buyer)
   - Who reports to your contact? (potential users/influencers)
3. **Get tech stack.** Use `zoominfo_get_tech_stack` for the prospect company.
   - Know what tools they use today — feeds Situation Questions and competitive context

**Clay** (if available):
1. **Enrich the contact.** Use `clay_enrich_person` with the attendee's email or name+company.
   - Background, tenure, career path — personalization gold for building rapport

**LinkedIn** (if available):
1. **Get prospect profile.** Use `linkedin_get_profile` for the meeting attendee.
   - Career history, education, shared connections, recent activity
   - Feeds the "Build Rapport" section of the call guide
2. **Search the company.** Use `linkedin_search_companies` for company updates, hiring trends.

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

**For Call Prep mode:**
1. **Search for prior calls with this prospect.** Use `gong_search_calls` with company name or contact email.
2. **If prior calls exist,** pull transcripts and analytics:
   - What was discussed previously? (don't repeat questions they already answered)
   - What pain points were uncovered? (go deeper this time)
   - Were there any unresolved objections? (prepare for these)
   - What next steps were agreed? (follow up on commitments)

**For Call Review mode:**
1. **Pull the call transcript.** Use `gong_get_transcript` with the call ID.
2. **Pull call analytics.** Use `gong_get_call_details` for talk ratio, question count, topics.
3. Pre-fill the evaluation metrics with actual data.

#### Calendar/Email Data Pull

If calendar/email tools are available (`outlook_calendar_search`, `outlook_email_search`):
1. Search for the meeting details — attendees, agenda, any prep notes
2. Search email history with the prospect — prior correspondence reveals context
3. Check for any materials shared by or to the prospect

#### Present What You Found

> "I pulled context for your call with **[Name], [Title]** at **[Company]**: a **[industry]** company with **[N] employees** and **$[X] revenue**. Per ZoomInfo, they use [Tech Stack]. Per LinkedIn, [Name] has been in this role for [N] years, previously at [Company]. Per CRM, this is a **$[X] deal** in **[Stage]** stage. [If prior calls exist:] I found **[N] prior Gong calls** — last call covered [topics]. Building your discovery guide now..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what couldn't be found:
- **Framework preference** — SPIN, Sandler, Challenger, or "whatever works"
- **Your goal for this call** — What specific things do you need to learn?
- **What you sell** — If not in memory/product.md

When tools are connected, you already have prospect context, company data, and prior interaction history.

### Step 2: Generate the Call Guide

Build using ALL evidence. Mark Situation Questions as "SKIP — already known from research" when the answer is in the tool data. Cite: "Per CRM:", "Per ZoomInfo:", "Per Gong:", "Per LinkedIn:"

### Step 3: Store Insights

- After the call, update `memory/deal-patterns.md` with discovery findings
- Note the prospect's qualification status for the deal-qualification skill

---

## What I Need From You (When Tools Aren't Connected)

For a tailored call guide:

1. **Who are you meeting?** — Name, title, company
2. **What do you sell?** — Your product and key value propositions
3. **What do you know already?** — Any context from prior conversations or research
4. **What's the goal?** — First meeting? Follow-up? What do you need to learn?
5. **Framework preference?** — SPIN, Sandler, Challenger, or "whatever works"

---

## The SPIN Framework

The most universally applicable discovery framework. Questions progress through four stages, each building on the last:

### S — Situation Questions
Understand their current state. Keep these brief — don't interrogate. You should know most of this from research.

Purpose: Establish context without wasting the prospect's time.

### P — Problem Questions
Identify pain points, challenges, and gaps in their current approach.

Purpose: Get the prospect to articulate what's not working.

### I — Implication Questions
Explore the consequences of the problem. This is where deals are won or lost — most reps skip this entirely.

Purpose: Help the prospect realize the problem is bigger than they thought.

### N — Need-Payoff Questions
Get the prospect to describe how a solution would improve their situation. Let them sell themselves.

Purpose: The prospect articulates the value, not you.

---

## Output Format: Call Guide

```markdown
# Discovery Call Guide: [Company Name]

**Prospect:** [Name, Title]
**Company:** [Company] — [Brief description]
**Date:** [Call date]
**Framework:** [SPIN / Sandler / Challenger]
**Goal:** [What you need to learn from this call]

---

## Pre-Call Context
[What you already know about the prospect and company, relevant news, any prior interactions]

---

## Opening (2-3 minutes)

**Agenda Set:**
> "Thanks for making time, [Name]. I was hoping to learn more about [their situation] and see if there's a fit. I've got a few questions, and of course I want to leave time for yours too. Does that work?"

**Build Rapport:**
- [Personal connection point from research]
- [Company-specific observation: recent news, growth, initiative]

---

## Situation Questions (3-5 minutes)

Keep brief — show you've done your homework.

1. "[Question about their current setup/process]"
2. "[Question about team structure or ownership]"
3. "[Question about tools they're using today]"

**Listen for:** [What signals to pay attention to]

---

## Problem Questions (5-8 minutes)

This is where discovery really begins.

1. "[Question about challenges with current approach]"
2. "[Question about what's not working]"
3. "[Question about what they've tried before]"
4. "[Question about impact on their goals]"

**Listen for:** [Pain indicators, frustration signals]

**Follow-up prompts:**
- "Tell me more about that..."
- "How does that affect [downstream outcome]?"
- "How long has that been an issue?"

---

## Implication Questions (5-8 minutes)

Help them connect the dots to bigger consequences.

1. "[Question about business impact: revenue, cost, time]"
2. "[Question about team impact: morale, productivity, retention]"
3. "[Question about strategic impact: competitive position, growth goals]"
4. "[Question about what happens if they don't solve this]"

**Listen for:** [Quantifiable impact, emotional reactions, urgency signals]

---

## Need-Payoff Questions (3-5 minutes)

Let them describe the ideal outcome.

1. "If you could wave a magic wand, what would [process/outcome] look like?"
2. "What would solving [problem] mean for [their goals]?"
3. "How would your team's day-to-day change if [pain point] went away?"

**Listen for:** [Their vision of success — use this in your proposal]

---

## Qualification Check

Before wrapping, confirm:

- [ ] **Pain:** Clearly articulated problem with measurable impact
- [ ] **Champion:** This person can advocate internally
- [ ] **Timeline:** There's a reason to act now (or within a defined window)
- [ ] **Budget:** They have or can get the resources
- [ ] **Decision Process:** You understand who else is involved

---

## Close the Call

**Summarize:**
> "Let me make sure I've got this right — [recap key pain points and desired outcomes]."

**Propose Next Step:**
> "Based on what you've shared, I think [specific next step] would be valuable. How does [date/time] look?"

---

## Notes Template

After the call, capture:
- **Key pains:** [What they said in their words]
- **Impact:** [Quantified if possible]
- **Decision process:** [Who, how, timeline]
- **Next step:** [What you agreed to]
- **Red flags:** [Anything concerning]
```

---

## Question Library

When building a reusable question library, I'll organize questions by:

1. **Framework stage** (Situation, Problem, Implication, Need-Payoff)
2. **Buyer persona** (C-suite, VP, Director, IC)
3. **Industry vertical** (SaaS, Healthcare, Financial Services, etc.)
4. **Topic area** (Budget, Timeline, Decision Process, Technical Requirements, etc.)

---

## Call Review Mode

Paste a transcript or notes from a discovery call, and I'll evaluate:

1. **Coverage** — Did you hit all four SPIN stages?
2. **Depth** — Did you go deep enough on implications?
3. **Balance** — Prospect talk time vs. rep talk time (aim for 60/40 prospect)
4. **Missed Opportunities** — Questions you should have asked
5. **Next Steps** — What to follow up on based on what was uncovered

---

## Related Skills

- **deal-qualification** — Use discovery findings to formally qualify the deal
- **objection-handling** — Handle objections that surface during discovery
- **proposal-builder** — Turn discovery insights into a compelling proposal
- **buyer-persona** — Understand your buyer before the call
