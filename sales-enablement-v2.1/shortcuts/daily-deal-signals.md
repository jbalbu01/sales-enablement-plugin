---
name: daily-deal-signals
description: "Automated daily scan for deal signals — surfaces expansion triggers, risk events, and coaching moments from CRM and communication data."
schedule: "0 8 * * 1-5"
---

# Daily Deal Signals

## Task Description

Run a lightweight daily scan to surface the most actionable deal signals for the team. This is the fast daily complement to the deeper weekly pipeline digest. Execute the following steps:

1. **Scan for trigger events** — Look for signals that require same-day action:
   - **Expansion signals:** Customer hired new team members, usage spike, champion promoted, new department showing interest
   - **Risk signals:** Champion left the company, budget freeze announced, competitor RFP detected, engagement drop-off
   - **Momentum signals:** Executive meeting scheduled, technical validation completed, procurement engaged, verbal commitment received
   - **Stalled signals:** No activity in 14+ days on active deal, close date approaching with no next step, stakeholder went dark

2. **Cross-reference with memory** — Read `memory/deal-patterns.md` to match current signals against known patterns:
   - Does this signal pattern historically lead to wins or losses?
   - What intervention worked in similar past situations?

3. **Prioritize by impact** — Rank signals by:
   - Deal size at risk or expansion potential
   - Urgency (time-sensitive signals first)
   - Actionability (only surface signals where there's something concrete to do)

4. **Generate daily brief** — Produce a concise daily signals report:
   - Top 3-5 signals requiring action today
   - For each: the deal, the signal, why it matters, and the recommended action
   - Any expansion opportunities detected
   - Stalled deals that need a nudge

5. **Deliver** — If Slack is connected, post as a morning brief to the sales team channel. Keep it tight — under 10 lines for the summary, with a "see details" link for full context.

## Success Criteria

- Signals are actionable (every signal has a recommended next step)
- No more than 5-7 signals surfaced per day (focus over noise)
- Expansion signals captured alongside risk signals
- Reps know exactly what to do before their first call of the day

## Constraints

- Brevity is critical. This is a daily nudge, not a report. If it takes more than 2 minutes to read, it's too long.
- Only surface signals where there's a clear action. "Customer posted on LinkedIn" is not actionable without context.
- Don't repeat signals from previous days unless the situation has escalated.
- If no significant signals detected, say "No action items today" and skip the report. Don't create noise.
