---
description: Run a structured deal strategy session — assess deal health, identify risks, build a win plan, and assign next actions
argument-hint: "<deal name or context>"
---

# /deal-review

> If you see unfamiliar placeholders or need to check which tools are connected, see [CONNECTORS.md](../CONNECTORS.md).

Run a structured deal review and strategy session. This is the command reps and managers use to stress-test a deal, identify blind spots, and build a concrete action plan to win.

## Usage

```
/deal-review
```

Then describe the deal, paste CRM data, or upload a pipeline export.

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                       DEAL REVIEW                                 │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                        │
│  ✓ Describe your deal and I'll run a structured review           │
│  ✓ MEDDIC qualification score with gap analysis                  │
│  ✓ Risk identification and mitigation strategies                 │
│  ✓ Competitive positioning assessment                            │
│  ✓ Stakeholder map and power analysis                            │
│  ✓ Win plan with specific next actions                           │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + CRM: Pull deal data, opportunity history, contact records     │
│  + Chat: Find internal discussions about this account            │
│  + Calendar/Email: Meeting context and recent correspondence     │
│  + Knowledge base: Reference existing playbooks and collateral   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Execution Flow

When this command runs, follow this sequence:

### 1. Auto-Pull Data (Before Asking Questions)

**CRM** — Check if CRM tools are available (look for `search_crm_objects`, `get_crm_objects`).
If available:
- Search `deals` by name/company the user mentioned
- Properties: `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `notes_last_updated`, `notes_last_contacted`, `num_notes`, `hs_deal_stage_probability`, `hs_forecast_amount`
- Pull associated `contacts` with: `firstname`, `lastname`, `jobtitle`, `email`, `phone`, `company`, `hs_lead_status`
- Pull associated `companies` with: `name`, `domain`, `industry`, `numberofemployees`, `annualrevenue`, `description`
- Map contacts to deal roles (Economic Buyer, Champion, etc.) by job title

**Chat** — Check for `slack_search_public`, `slack_search_public_and_private`, `chat_message_search`.
If available:
- Search for company name in sales channels
- Surface competitive intel, blockers, team sentiment

**Calendar/Email** — Check for `outlook_calendar_search`, `outlook_email_search`.
If available:
- Find upcoming meetings with prospect
- Check recent email engagement

### 2. Present Summary and Ask for Gaps

Show what you found, then ask ONLY for what's missing:
> "I pulled [Deal Name] from CRM — $[X] in [Stage], close date [Date], [N] contacts. Here's what I still need..."

Focus on what CRM doesn't capture: competitive dynamics, champion strength, internal politics, pain validation.

### 3. Run the Full Review

Generate the Deal Review output (below) using ALL sources — CRM data, chat intel, email context, and user input. Cite where evidence comes from.

### 4. Store Intelligence

- Update `memory/deal-patterns.md` with deal characteristics
- Flag competitive intel for `memory/competitors.md`
- Update `memory/team.md` if coaching signals emerge

---

## What I Need From You

If tools are connected, I'll pull most of this automatically. Otherwise, tell me:

- **Company and deal size** — Who and how much?
- **Current stage** — Where are you in the process?
- **Key contacts** — Who you're talking to and their roles
- **Competition** — Who else is in the running?
- **Timeline** — Expected close date and what's driving it
- **Challenges** — What's not going well or concerns you
- **History** — Key moments, meetings, demos that have happened

**Quick mode:** "Review my deal with Acme Corp" (I'll pull the rest from your CRM)

**Standalone mode:** "Review my deal with Acme Corp — $150K, in proposal stage, competing with CompX, champion is their VP of Eng, close date end of Q2"

---

## Output

```markdown
# Deal Review: [Company Name]

**Date:** [Today]
**Deal Size:** $[amount]
**Stage:** [Current stage]
**Expected Close:** [Date]
**Win Probability:** [Assessed %]

---

## Deal Health Score: [X/100]

| Category | Score | Status |
|----------|-------|--------|
| Qualification (MEDDIC) | [X/30] | 🟢🟡🔴 |
| Stakeholder Engagement | [X/20] | 🟢🟡🔴 |
| Competitive Position | [X/20] | 🟢🟡🔴 |
| Process Control | [X/15] | 🟢🟡🔴 |
| Momentum | [X/15] | 🟢🟡🔴 |

---

## MEDDIC Assessment

| Criterion | Score | Evidence | Gap |
|-----------|-------|----------|-----|
| Metrics | [0-5] | [What we know] | [What's missing] |
| Economic Buyer | [0-5] | [Evidence] | [Gap] |
| Decision Criteria | [0-5] | [Evidence] | [Gap] |
| Decision Process | [0-5] | [Evidence] | [Gap] |
| Identify Pain | [0-5] | [Evidence] | [Gap] |
| Champion | [0-5] | [Evidence] | [Gap] |

---

## Stakeholder Map

| Person | Title | Role in Deal | Sentiment | Engaged? |
|--------|-------|-------------|-----------|----------|
| [Name] | [Title] | Champion / Decision Maker / Influencer / Blocker | Positive/Neutral/Negative | Yes/No |

**Power Analysis:** [Who has the real power, who can kill the deal, who's your strongest advocate]

---

## Risk Assessment

| Risk | Severity | Evidence | Mitigation |
|------|----------|----------|------------|
| [Risk 1] | 🔴 High | [Why this is a concern] | [What to do] |
| [Risk 2] | 🟡 Medium | [Evidence] | [Action] |
| [Risk 3] | 🟢 Low | [Evidence] | [Monitor] |

---

## Competitive Position

**Current Standing:** [Ahead / Behind / Even / Unknown]

**Our Advantages:**
1. [Advantage with evidence]
2. [Advantage]

**Their Advantages:**
1. [Competitor strength]
2. [Strength]

**Battleground:** [Where the decision will be made — the criteria where both solutions compete]

---

## Win Plan

### This Week
1. **[Action]** — [Owner] — [Why this matters now]
2. **[Action]** — [Owner] — [Rationale]

### Next 2 Weeks
1. **[Action]** — [Owner]
2. **[Action]** — [Owner]

### Before Close
1. **[Milestone that must happen]**
2. **[Milestone]**

---

## Questions to Answer

These are the unknowns that could make or break this deal:

1. [Critical question and how to get the answer]
2. [Question]
3. [Question]

---

## Recommendation

**Confidence Level:** [High / Medium / Low]
**Assessment:** [2-3 sentence honest assessment of where this deal stands and what it will take to win]
```

---

## Coaching Elements

When a manager is running the deal review:

I'll include coaching questions the manager can ask the rep:
1. "Walk me through the decision process — who signs, and what happens between now and signature?"
2. "If we lost this deal, what would be the reason?"
3. "What has the champion done to sell internally for us?"
4. "What does the economic buyer care about that we haven't addressed?"

---

## Tips

1. **Be brutally honest** — The value of a deal review is facing reality, not confirming optimism
2. **Focus on what you can control** — Don't dwell on competitor moves; focus on your actions
3. **Test your champion** — If they haven't done anything for you internally, they're not a champion
4. **Time-bound your plan** — "Soon" isn't an action. Every task needs a date and owner.
