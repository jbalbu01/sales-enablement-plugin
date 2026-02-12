---
name: rep-profile
description: Hyper-personalization engine that adapts all enablement content to each rep's skill level, experience, deal patterns, and learning style. Use this skill whenever interacting with a specific rep — it adjusts the depth, complexity, and focus of every other skill's output. Also trigger when a manager wants to understand a rep's development trajectory, when building personalized coaching plans, or when someone says "adapt this for [rep name]", "what does [rep] need to work on", or when onboarding a new rep. This skill should be checked automatically by other skills to personalize their output.
---

# Rep Profile

Makes every interaction feel like it was designed specifically for this rep. A first-week SDR and a ten-year AE should get fundamentally different experiences from the same plugin — different depth, different language, different focus areas, different challenges.

## Why This Matters

"Hyper-personalized learning" isn't about adding a name to a template. It means:
- A rep who crushes discovery but struggles with closing gets coaching focused on negotiation
- A rep who just joined gets scaffolded frameworks; a veteran gets contextual nudges
- A rep who learns by doing gets role-play practice; one who learns by studying gets frameworks and examples
- Content complexity scales with the rep's experience and comfort level

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                      REP PROFILE                                  │
├─────────────────────────────────────────────────────────────────┤
│  PROFILE COMPONENTS                                               │
│  • Skill assessment (scored competencies)                        │
│  • Experience level (tenure, deals closed, ramp stage)           │
│  • Deal patterns (what they win, what they lose, why)            │
│  • Learning style (doing, studying, observing, discussing)       │
│  • Development plan (current focus areas and progress)           │
│  • Interaction history (what help they've asked for before)      │
├─────────────────────────────────────────────────────────────────┤
│  ADAPTATION RULES                                                 │
│  New rep → More structure, more scaffolding, explicit frameworks │
│  Mid-level → Balanced guidance, focus on weak spots              │
│  Senior rep → Brief nudges, advanced scenarios, edge cases       │
│  Manager → Coaching lens, team patterns, data-driven insights    │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Deal history, win rates, cycle lengths, quota data     │
│  + ~~CRM: Stage-specific patterns and performance vs team avg    │
│  + ~~conversation intelligence (Gong): Talk-to-listen ratios     │
│  + ~~conversation intelligence (Gong): Questions per call        │
│  + ~~conversation intelligence (Gong): Competitor handling skill  │
│  + ~~conversation intelligence (Gong): Next steps discipline     │
│  + ~~data enrichment (LinkedIn): Career history and expertise    │
│  + ~~data enrichment (ZoomInfo): Industry vertical experience    │
│  + ~~chat: Coaching conversations and peer feedback              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Profile Structure

Stored in `memory/team.md` with a section per rep:

```markdown
## [Rep Name]

**Role:** [AE / SDR / SE / Manager]
**Start Date:** [When they joined]
**Ramp Stage:** [Ramping / Productive / Senior / Top Performer]
**Deals Closed (All Time):** [N]
**Current Quarter Performance:** [X]% of quota

### Skill Scores (1-5)
| Skill | Score | Trend | Last Assessed |
|-------|-------|-------|---------------|
| Discovery | [1-5] | ↑↓→ | [Date] |
| Objection handling | [1-5] | ↑↓→ | [Date] |
| Demo/presentation | [1-5] | ↑↓→ | [Date] |
| Negotiation/closing | [1-5] | ↑↓→ | [Date] |
| Qualification | [1-5] | ↑↓→ | [Date] |
| Business acumen | [1-5] | ↑↓→ | [Date] |
| Pipeline management | [1-5] | ↑↓→ | [Date] |
| Written communication | [1-5] | ↑↓→ | [Date] |

### Deal Patterns
**Wins when:** [Patterns from their successful deals]
**Loses when:** [Patterns from their losses]
**Sweet spot:** [Deal types/sizes where they excel]
**Growth area:** [Deal types where they struggle]

### Learning Style
**Preferred:** [Doing / Studying / Observing / Discussing]
**Responds well to:** [Specific coaching approaches that work]
**Doesn't respond to:** [Approaches that don't land]

### Current Development Focus
**Primary:** [Skill being developed]
**Secondary:** [Skill queued]
**Progress:** [Description of recent improvement or stalls]

### Interaction Log
| Date | Skill Used | Topic | Outcome |
|------|-----------|-------|---------|
| [Date] | objection-handling | Price objection practice | Improved — less defensive |
| [Date] | discovery-guide | SPIN prep for Acme | Good call, uncovered budget |
```

---

## Adaptation Rules

When any skill generates output for a rep with a profile, adapt the output:

### For New Reps (< 90 days, ramp stage)
- **Always include** the full framework explanation (don't assume they know SPIN, MEDDIC, etc.)
- **Provide templates** they can follow word-for-word
- **Add context** for why each step matters
- **Include checklists** so nothing gets missed
- **Tone:** Supportive, educational, encouraging

### For Mid-Level Reps (90 days - 2 years)
- **Skip basics** — reference frameworks by name without re-explaining
- **Focus on their weak spots** — if they score 2/5 on negotiation, weight content toward that
- **Include nuance** — edge cases, when to break the rules, situational judgment
- **Challenge them** — "What would you do differently if the champion left?"
- **Tone:** Collaborative, coaching-oriented

### For Senior Reps (2+ years, top performers)
- **Be brief** — they don't need hand-holding
- **Provide intel, not instructions** — competitive data, deal insights, customer patterns
- **Focus on advanced scenarios** — multi-threaded deals, executive selling, complex negotiations
- **Ask their opinion** — "You've seen this before — what's worked?"
- **Tone:** Peer, strategic partner

### For Managers
- **Data-driven** — metrics, trends, comparisons
- **Team-level patterns** — not just individual deals
- **Coaching-ready** — frame insights as coaching conversation starters
- **Action-oriented** — "Here's what to focus on in your 1:1s this week"
- **Tone:** Strategic, analytical

---

## Building a Profile

### From Scratch
When you don't have a profile yet:

1. Ask role and experience level
2. Ask about recent deals (2-3 wins and losses)
3. Ask what they feel strongest/weakest at
4. Ask their manager for input (if available)
5. Create initial profile in `memory/team.md`

### From Interactions
Every time a rep uses the plugin:
- Note what they asked for help with (signals a gap)
- Note what they didn't need help with (signals strength)
- After coaching sessions, update skill scores
- After deal outcomes, update deal patterns
- Track improvement trends over time

### From Data (Automatic — Highest Quality)

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:
1. **Pull rep's deals.** Search `deals` filtered by `hubspot_owner_id`.
   - Properties: `dealname`, `amount`, `dealstage`, `closedate`, `createdate`, `pipeline`, `dealtype`, `hs_deal_stage_probability`
   - Separate won, lost, and open deals
2. **Calculate performance metrics:**
   - Win rate = Closed Won / (Closed Won + Closed Lost)
   - Avg deal size = Mean of `amount` across won deals
   - Avg cycle length = Mean days from `createdate` to `closedate` for won deals
   - Pipeline coverage = Open pipeline value / quota (ask user for quota if needed)
3. **Compare to team averages.** Pull all reps' deals and compute team-level metrics.
   - Flag where this rep is significantly above or below average
4. **Identify stage-specific patterns:**
   - Where do their deals stall? (avg days in each stage vs. team)
   - Where do they lose? (stage distribution of lost deals vs. team)
   - Deal types they excel at vs. struggle with
5. **Map rep name.** Use `search_owners` to translate owner ID.

#### Gong Data Pull

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:
1. **Pull call stats.** Use `gong_get_call_stats` for the rep's recent period.
   - Total calls, average duration, average questions per call
2. **Analyze call patterns.** Use `gong_search_calls_by_participant` with the rep's email, then `gong_get_call_details` on 5-10 calls:
   - Average talk-to-listen ratio → maps to Discovery & Questioning skill
   - Average questions per call → Discovery skill indicator
   - Competitor mention frequency → Competitive handling skill
   - Next steps confirmation rate → Closing discipline
   - Topic distribution → Where they spend conversation time
3. **Build data-driven skill scores:**
   - Talk ratio > 55% → Lower Discovery score
   - < 5 questions per call → Lower Discovery score
   - No next steps in > 30% of calls → Lower Closing score
   - Low competitor mention handling → Lower Objection Handling score

#### Sales Intelligence Data Pull (ZoomInfo / Clay / LinkedIn)

**ZoomInfo** (check for tools prefixed with `zoominfo_`):
1. **Validate industry expertise.** Use `zoominfo_search_company` on the rep's won deal companies.
   - Which industries does this rep win in most? → vertical specialization signal
   - What company sizes do they close? → segment fit indicator

**Clay** (check for tools prefixed with `clay_`):
1. **Enrich deal context.** Use `clay_enrich_company` on rep's recent deals.
   - Were their wins at companies with buying signals? → luck vs skill indicator

**LinkedIn** (check for tools prefixed with `linkedin_`):
1. **Get rep's LinkedIn profile.** Use `linkedin_get_profile` if rep's LinkedIn URL is known.
   - Career history reveals experience level and domain expertise
   - Endorsements/skills signal areas of strength
   - Previous companies/industries → domain knowledge map

#### Auto-Generated Profile

When tools are connected, auto-generate the profile without asking the user:

> "I built [Rep Name]'s profile from data: **[X]% win rate** (team avg: [Y]%), **$[X] avg deal size**, **[X]-day cycle**. Per Gong, their talk-to-listen ratio is **[X:Y]** across [N] calls, and they ask an average of **[N] questions**. Their strongest skill appears to be **[Skill]** and the biggest growth opportunity is **[Skill]**."

---

## Profile Dashboard

When a manager or rep wants to see the profile:

```markdown
# Rep Profile: [Name]

**Performance Snapshot**
| Metric | This Quarter | Last Quarter | Team Avg |
|--------|-------------|-------------|----------|
| Quota Attainment | [X]% | [X]% | [X]% |
| Win Rate | [X]% | [X]% | [X]% |
| Avg Deal Size | $[X] | $[X] | $[X] |
| Avg Cycle Length | [X] days | [X] days | [X] days |

**Skill Map** [Visual representation of strengths and gaps]

**Top Priority:** [The one skill that would most impact their numbers]

**Recommended This Week:**
1. [Specific practice exercise using plugin skill]
2. [Call to review for coaching moment]
3. [Content to study]
```

---

## Related Skills

- **sales-coaching** → Updates skill scores after coaching sessions
- **win-loss-analysis** → Updates deal patterns after post-mortems
- **All skills** → Read rep profile to personalize output depth and focus
- **gtm-memory** → Rep profiles are stored in the team.md memory file
