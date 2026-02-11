---
name: objection-handling
description: Handle sales objections with proven frameworks, scripted responses, and practice scenarios. Use this skill whenever a rep asks how to respond to a prospect's pushback, needs help with common objections (price, timing, competition, authority, need), wants to build an objection handling library, or says things like "the prospect said X, what do I say?", "how do I handle the price objection", or "they want to think about it". Also trigger when building training materials around objection handling.
---

# Objection Handling

Help reps respond to prospect objections confidently, honestly, and effectively. Good objection handling isn't about overcoming resistance — it's about understanding the real concern behind the stated objection and addressing it directly.

## Philosophy

Most objections fall into one of five categories, and the stated objection often isn't the real one. A prospect who says "it's too expensive" might really mean "I don't see enough value yet" or "I can't justify this to my boss." This skill helps reps diagnose the real objection and respond appropriately.

The five root categories:

1. **Value** — "I don't see enough ROI" / "It's too expensive"
2. **Timing** — "Not right now" / "Maybe next quarter"
3. **Authority** — "I need to check with my boss" / "We have a committee"
4. **Need** — "We're fine with what we have" / "This isn't a priority"
5. **Trust** — "We've never heard of you" / "We're happy with [Competitor]"

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    OBJECTION HANDLING                              │
├─────────────────────────────────────────────────────────────────┤
│  MODES                                                            │
│  1. Live Help — "They just said X, what do I say?"               │
│  2. Library Builder — Generate a full objection playbook          │
│  3. Practice — Role-play objection scenarios                      │
│  4. Coaching — Review how a rep handled an objection              │
├─────────────────────────────────────────────────────────────────┤
│  FRAMEWORK                                                        │
│  A → Acknowledge the concern (don't dismiss it)                  │
│  C → Clarify the real issue (ask before answering)               │
│  E → Engage with a response (address root cause)                 │
│  S → Suggest next step (keep momentum)                           │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + ~~CRM: Win/loss correlation with objection types              │
│  + ~~CRM: Deal outcomes after specific objections handled        │
│  + ~~conversation intelligence (Gong): Real objection recordings │
│  + ~~conversation intelligence (Gong): Top rep handling patterns │
│  + ~~conversation intelligence (Gong): Competitor mention context│
│  + ~~chat: Rep questions about specific objections               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Execution Flow

### Step 0: Automatic Data Pull (Before Asking the User Anything)

**CRITICAL:** Before giving a generic objection response, check for connected tools that can provide evidence-based, data-backed responses grounded in what actually works for your team.

#### Gong Data Pull (Highest Impact for Objection Handling)

Check if you have access to Gong tools (look for tools prefixed with `gong_`).

If Gong tools ARE available:

**For Live Help / Coaching mode:**
1. **Find calls where this objection was raised.** Use `gong_search_calls` with keywords related to the objection (e.g., "too expensive", "think about it", competitor name).
2. **Analyze how top reps handle it.** Use `gong_get_call_details` on calls from reps with highest win rates:
   - What language did they use?
   - How did they transition after the objection?
   - Did they confirm next steps after handling it?
3. **Pull the actual response.** Use `gong_get_transcript` to get verbatim examples of effective handling.
   - Real responses from your team are 10x more useful than generic frameworks

**For Library Builder mode:**
1. **Pull call stats for objection frequency.** Use `gong_search_calls` for each objection category.
   - Which objections come up most often?
   - At what stage do they surface?
2. **Identify patterns in won vs lost deals.** Compare how objections were handled in deals that closed vs deals that were lost.
3. **Extract top-performer language.** Pull 3-5 examples of each objection handled well.

#### CRM Data Pull

Check if you have access to CRM tools (look for tools containing `search_crm_objects`, `get_crm_objects`, or similar).

If CRM tools ARE available:

1. **Analyze loss reasons.** Search `deals` for Closed Lost deals and examine `closed_lost_reason`.
   - Which objection categories correlate with losses?
   - Are certain objections deal-killers vs. speed bumps?
2. **Find the specific deal.** If the rep names a company, pull the deal and contact data.
   - Properties: `dealname`, `amount`, `dealstage`, `pipeline`, `description`
   - Context about the deal → better objection diagnosis
3. **Check competitive deals.** If the objection is competitive, pull deals involving that competitor.
   - Win rate against that competitor → calibrate the response

#### Chat Data Pull

If chat tools are available (`slack_search_public`, `slack_search_public_and_private`):
1. Search for the objection topic in sales channels
2. Surface how other reps have handled similar pushback
3. Look for any team discussion or manager guidance on the topic

#### Present What You Found

> "[If Gong:] I found **[N] calls** where this objection was raised. On won deals, top reps typically respond by [pattern]. Here's how [Top Rep] handled it on [date]: [brief summary]. [If CRM:] Deals with this objection close at **[X]%** vs **[Y]%** overall. Here's a data-backed response..."

### Step 1: Gather Remaining Context

After the auto-pull, ask ONLY for what the tools couldn't provide:
- **Mode** — Live help, library, practice, or coaching?
- **Deal context** — What's the deal stage, relationship, and backstory?
- **Product context** — What do you sell? (if not in memory/product.md)

### Step 2: Generate the Response

Build using ALL evidence. When possible, include verbatim examples from top reps (via Gong). Cite sources: "Per Gong (won deal with [Company]):", "Per CRM:", "Per Slack:"

### Step 3: Store Insights

- Update `memory/objections.md` with newly documented objection patterns and responses
- Update `memory/competitors.md` if competitive objections revealed new intel
- Log the interaction in `memory/changelog.md`

---

## Getting Started

Just describe the situation:

- "The prospect says it's too expensive — what do I say?"
- "They want to 'think about it' — how do I respond?"
- "Build me an objection handling playbook for our product"
- "Help me practice handling the 'we're happy with our current solution' objection"
- "I handled the budget objection badly on my last call — help me do better"

---

## The ACES Framework

Every objection response follows this structure:

### A — Acknowledge
Show the prospect you heard them and their concern is valid. Never dismiss, minimize, or immediately pivot.

**Example:** "That's a fair concern — pricing is something every team needs to get right."

### C — Clarify
Ask a follow-up question to understand the real objection behind the stated one. This is where most reps skip ahead and lose the deal.

**Example:** "When you say it's too expensive, is that relative to your budget for this category, or relative to the value you're seeing so far?"

### E — Engage
Now address the actual concern — not the surface objection, but what the clarifying question revealed.

**Example (if budget):** "Let me show you how our customers typically phase the rollout to spread the investment..."
**Example (if value):** "That tells me I haven't done a good enough job showing the impact. Let me walk through a real example..."

### S — Suggest Next Step
Always end with forward momentum. Don't let the conversation stall after handling the objection.

**Example:** "Would it help if I put together a business case you could share with your CFO?"

---

## Output Format: Live Help

When a rep describes a specific objection:

```markdown
## Handling: "[The Objection]"

**Category:** [Value / Timing / Authority / Need / Trust]
**Likely Real Concern:** [What they probably actually mean]

### Recommended Response

**Acknowledge:** "[Script]"

**Clarify:** "[Question to ask]"

**If they say [A]:**
> "[Response path A]"

**If they say [B]:**
> "[Response path B]"

**Suggest Next Step:** "[Forward momentum action]"

### What NOT to Say
- [Common mistake and why it backfires]

### If It Stalls Anyway
[Fallback approach — different angle, involve another stakeholder, send follow-up resource]
```

---

## Output Format: Objection Library

When building a full playbook:

```markdown
# Objection Handling Playbook: [Product/Company]

**Generated:** [Date]
**Product:** [Product name]
**ICP:** [Target buyer]

---

## Price / Value Objections

### "It's too expensive"
**Real Concern:** [Diagnosis]
**Response:** [ACES framework response]

### "We don't have the budget"
**Real Concern:** [Diagnosis]
**Response:** [ACES framework response]

### "Your competitor is cheaper"
**Real Concern:** [Diagnosis]
**Response:** [ACES framework response]

---

## Timing Objections

### "Not right now — maybe next quarter"
...

### "We have other priorities"
...

---

## Authority Objections

### "I need to run this by my boss"
...

### "We have a buying committee"
...

---

## Need Objections

### "We're fine with what we have"
...

### "This isn't a priority for us"
...

---

## Trust Objections

### "We've never heard of you"
...

### "We're happy with [Competitor]"
...

---

## Stall Tactics

### "Send me more information"
...

### "Let me think about it"
...

### "We'll get back to you"
...
```

---

## Practice Mode

When a rep wants to practice, I'll role-play as the prospect:

1. **Set the scene** — Tell me your product, the prospect persona, and which objection to practice
2. **I'll push back** — I'll play a realistic prospect throwing the objection at you
3. **You respond** — Handle it however you would in real life
4. **I'll coach** — After each exchange, I'll give specific feedback on what worked and what to adjust
5. **Repeat** — We iterate until the response feels natural

I'll calibrate difficulty — if you're newer, I'll start with straightforward objections. If you're experienced, I'll chain objections and throw curveballs.

---

## Coaching Mode

Paste a call transcript or describe how you handled an objection:

1. I'll identify where the objection surfaced
2. Evaluate how it was handled (what worked, what didn't)
3. Suggest an alternative approach with specific language
4. Highlight patterns if this is a recurring issue

---

## Tips

1. **Silence is powerful** — After acknowledging, pause. Let the prospect fill the silence with more context.
2. **Never argue** — You can't win an argument with a prospect. You can only help them see a new perspective.
3. **Qualify the objection** — "If we could solve [concern], would you be ready to move forward?" This tests if it's a real blocker or a smokescreen.
4. **Use stories, not stats** — "One of our customers had the same concern. Here's what happened..." is more compelling than data points.

---

## Related Skills

- **battle-cards** — Competitive-specific objection responses
- **discovery-guide** — Prevent objections by uncovering needs earlier
- **sales-coaching** — Broader coaching beyond objection handling
- **roi-calculator** — Build the value case to preempt price objections
