---
name: sales-coaching
description: Coach sales reps with call reviews, skill development plans, and role-play practice. Use this skill whenever a manager wants to coach a rep, a rep wants to improve their skills, someone asks for feedback on a sales conversation, needs help with a skill development plan, says "coach me on [skill]", "review my call", "how can I improve my close rate", "what should I work on", or when building a training curriculum. Also trigger when someone mentions sales training, rep development, ramp plans, or skill gaps.
---

# Sales Coaching

Help managers coach their reps and help reps develop their own skills. Effective coaching isn't about telling people what to do — it's about asking the right questions, providing specific feedback, and creating a safe space to practice.

## Coaching Philosophy

Great sales coaching:
- **Is specific** — "Your discovery was weak" isn't coaching. "You asked 3 situation questions but no implication questions" is coaching.
- **Is timely** — Coach close to the event, not weeks later.
- **Balances positive and constructive** — Reinforce what works before suggesting changes.
- **Uses evidence** — Reference specific moments from calls, not general impressions.
- **Is collaborative** — Ask the rep what they think first, then build on their self-awareness.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                     SALES COACHING                                │
├─────────────────────────────────────────────────────────────────┤
│  MODES                                                            │
│  1. Call Review — Analyze a specific call or meeting              │
│  2. Skill Assessment — Evaluate rep across core competencies     │
│  3. Development Plan — Create a personalized improvement plan    │
│  4. Role-Play — Practice specific scenarios with feedback        │
│  5. Coaching Template — Give managers a structured coaching guide │
├─────────────────────────────────────────────────────────────────┤
│  COMPETENCY AREAS                                                 │
│  • Discovery & questioning                                       │
│  • Objection handling                                            │
│  • Presentation & demo skills                                   │
│  • Negotiation & closing                                        │
│  • Pipeline management & qualification                           │
│  • Business acumen & executive presence                          │
│  • Time management & productivity                                │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~conversation intelligence (Gong): Pull transcripts directly │
│  + ~~conversation intelligence (Gong): Talk-listen ratios, topics│
│  + ~~conversation intelligence (Gong): Aggregate call patterns   │
│  + ~~CRM: Rep deal data — win rates, cycle length, patterns      │
│  + ~~CRM: Performance vs. team averages                          │
│  + ~~chat: Internal feedback and coaching discussions             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Getting Started

- "Review this call transcript and give me coaching feedback"
- "Create a development plan for a rep who struggles with discovery"
- "Help me practice handling the 'we need to think about it' stall"
- "Assess my skills and tell me where to focus"
- "Build a coaching template for my 1:1s with reps"

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before asking for a transcript or manual context, check what MCP tools are available. Coaching grounded in data is more impactful than coaching from gut feel.

#### Gong Data Pull (Highest Impact for Coaching)

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

**For Call Review mode:**
1. **Find the call.** If the user names a company or date, use `gong_search_calls` with `from_date`/`to_date` to locate the call.
2. **Pull the transcript.** Use `gong_get_transcript` with the `call_id` — this replaces the need to paste transcripts.
3. **Pull call analytics.** Use `gong_get_call_details` to get:
   - Talk-to-listen ratio (target: 40:60 or better)
   - Topics discussed (auto-detected by Gong)
   - Tracker matches (competitor mentions, pricing discussions, next steps)
   - Action items identified
   - Speaker statistics (interruptions, longest monologue, question count)
4. **Pre-fill the Key Metrics table** with actual call data instead of estimates.

**For Skill Assessment / Development Plan mode:**
1. **Pull call history for the rep.** Use `gong_search_calls_by_participant` with the rep's email.
2. **Aggregate patterns across calls.** Use `gong_get_call_stats` for the rep's recent period:
   - Average talk-to-listen ratio across calls
   - Average number of questions asked per call
   - Most frequent topics and trackers
   - Trend over time — are they improving?
3. **Identify coaching moments.** Use `gong_get_call_details` on 3-5 recent calls to find:
   - Calls with low question count (discovery weakness)
   - Calls with high talk ratio (not listening enough)
   - Calls where competitors were mentioned (competitive handling skill)
   - Calls with no confirmed next steps (closing discipline)

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Pull rep's deal performance.** Search `deals` filtered by `hubspot_owner_id` matching the rep.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `createdate`, `hs_deal_stage_probability`
   - Calculate: win rate, avg deal size, avg cycle length
2. **Compare to team.** Pull all deals to compute team averages for the same metrics.
   - Where is this rep above/below team average?
3. **Identify stage-specific issues.** Look at where the rep's deals die:
   - High loss rate at Discovery → coaching focus on discovery skills
   - High loss rate at Proposal → coaching focus on value articulation
   - Long time in Negotiation → coaching focus on closing

4. **Map rep name.** Use `search_owners` to get the owner record.

#### Chat Data Pull

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for the rep's name in coaching/management channels
2. Look for any prior feedback, kudos, or flagged issues from the team

#### Present What You Found

> "I pulled **[N] calls** from Gong for [Rep Name] over the last [N] days. Their average talk-to-listen ratio is **[X:Y]** (team avg: [A:B]) and they ask an average of **[N] questions per call** (team avg: [N]). Per CRM, their win rate is **[X]%** vs team average of **[Y]%**, and they tend to lose deals at the **[Stage]** stage. Running the coaching analysis now..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the tools couldn't provide:
- **For Call Review:** If no Gong access, request the transcript or notes
- **Context not in CRM:** What was the rep trying to accomplish? What's the coaching goal?
- **Manager input:** Specific areas they want to focus on

### Step 2: Generate Coaching Output

Use ALL evidence — Gong call data, CRM performance data, Slack observations, and user input. Cite sources: "Per Gong (call 1/15):", "Per CRM (last 90 days):", "Per Slack:", "User reported:"

### Step 3: Store Insights

- Update `memory/team.md` with coaching findings and updated skill scores for the rep
- Update `memory/deal-patterns.md` if coaching reveals rep-specific patterns
- Log the coaching interaction in the rep's Interaction Log

---

## Call Review Mode

### What I Need (When Tools Aren't Connected)
- **Call transcript or notes** — The more detail, the better the coaching
- **Context** — Deal stage, prospect profile, what the rep was trying to accomplish
- **Outcome** — What happened after the call?

**When Gong is connected:** I'll pull the transcript and analytics automatically. Just tell me which call (company name, date, or rep name).

### Output Format

```markdown
# Call Review: [Company] — [Date]

**Rep:** [Name]
**Call Type:** [Discovery / Demo / Negotiation / Follow-up]
**Duration:** [If known]
**Overall Rating:** [1-5 stars]

---

## What Went Well

1. **[Specific moment]** — [Why it was effective]
   > "[Quote from the call if available]"

2. **[Specific moment]** — [Why it was effective]

---

## Areas for Improvement

1. **[Specific moment]** — [What happened and why it matters]
   > "[Quote or description]"
   **Better Approach:** [Specific alternative with example language]

2. **[Specific moment]** — [What happened]
   **Better Approach:** [Alternative]

---

## Key Metrics

| Metric | This Call | Target |
|--------|----------|--------|
| Talk-to-listen ratio | [X:Y] | 40:60 or better |
| Discovery questions asked | [N] | 8-12 |
| Implication questions | [N] | 3-5 |
| Next steps confirmed | [Yes/No] | Always |
| Objections addressed | [N of N] | All |

---

## Coaching Questions

Ask the rep these questions in your 1:1 (don't just tell them):

1. "What do you think went well on that call?"
2. "[Specific coaching question about an improvement area]"
3. "If you could redo [moment], what would you do differently?"
4. "What do you need from me to [improve area]?"

---

## Priority Focus Area

**This week, focus on:** [One specific skill]
**Practice exercise:** [Concrete exercise the rep can do]
**Success looks like:** [Observable behavior change]
```

---

## Skill Assessment Mode

### Competency Framework

Rate the rep on each competency (1-5 scale):

```markdown
# Skill Assessment: [Rep Name]

**Date:** [Date]
**Assessed by:** [Manager name or self-assessment]

| Competency | Rating | Evidence | Priority |
|-----------|--------|----------|----------|
| Discovery & questioning | [1-5] | [Specific evidence] | [High/Med/Low] |
| Objection handling | [1-5] | [Evidence] | [Priority] |
| Demo / presentation | [1-5] | [Evidence] | [Priority] |
| Negotiation & closing | [1-5] | [Evidence] | [Priority] |
| Qualification discipline | [1-5] | [Evidence] | [Priority] |
| Business acumen | [1-5] | [Evidence] | [Priority] |
| Pipeline management | [1-5] | [Evidence] | [Priority] |
| Communication (written) | [1-5] | [Evidence] | [Priority] |
| Communication (verbal) | [1-5] | [Evidence] | [Priority] |
| Coachability | [1-5] | [Evidence] | [Priority] |

**Overall:** [X/50]

## Strengths to Leverage
[Top 2-3 competencies and how to use them as differentiators]

## Development Priorities
[Top 2 competencies to focus on and why — don't try to fix everything at once]
```

---

## Development Plan Mode

```markdown
# Development Plan: [Rep Name]

**Period:** [30/60/90 days]
**Focus Areas:** [Top 2 skills]
**Manager:** [Name]

---

## Skill 1: [Competency]

**Current Level:** [Description of where they are]
**Target Level:** [Description of where they need to be]

### Week 1-2: Foundation
- [ ] [Learning activity — read, watch, study]
- [ ] [Practice activity — role-play, mock calls]
- [ ] [Manager action — observe, provide example]

### Week 3-4: Application
- [ ] [Apply on real calls with observation]
- [ ] [Self-assess after each call]
- [ ] [Manager debrief and feedback]

### Week 5-8: Reinforcement
- [ ] [Independent application with spot-checks]
- [ ] [Peer coaching — teach someone else]
- [ ] [Measure improvement with specific metrics]

**Success Metric:** [How you'll know they've improved]

---

## Skill 2: [Competency]
[Same structure]

---

## Check-in Schedule

| Date | Focus | Deliverable |
|------|-------|-------------|
| [Date] | Baseline assessment | Call recording review |
| [Date] | Progress check | Role-play demonstration |
| [Date] | Mid-point review | Metrics review |
| [Date] | Final assessment | Updated skill scores |
```

---

## Role-Play Mode

I'll play the prospect and give you real-time feedback:

1. **Set the scenario** — Tell me who I am (title, company, situation)
2. **State your goal** — What skill are you practicing?
3. **We role-play** — I'll be realistic, not easy
4. **I debrief** — Specific feedback on what worked and what to adjust
5. **We repeat** — Practice until it feels natural

I calibrate difficulty. If you're new, I'll start with straightforward scenarios. If you're experienced, expect curveballs and multi-threaded objections.

---

## Related Skills

- **objection-handling** — Dedicated objection practice and frameworks
- **discovery-guide** — Discovery-specific coaching and practice
- **win-loss-analysis** — Use deal outcomes to identify coaching opportunities
- **playbook-builder** — Embed coaching frameworks into team playbooks
