---
name: weekly-pipeline-digest
description: "Automated weekly pipeline intelligence digest — generates health metrics, risk alerts, coaching signals, and priority actions before Monday pipeline meetings."
schedule: "0 7 * * 1"
---

# Weekly Pipeline Digest

## Task Description

Generate a comprehensive pipeline intelligence digest for the team's Monday pipeline review. Execute the following steps:

1. **Load historical patterns** — Read `memory/deal-patterns.md` to understand historical win/loss patterns, conversion benchmarks, and known risk signals.

2. **Gather pipeline data** — If CRM is connected, pull the current pipeline snapshot including:
   - All open opportunities with stage, value, close date, owner, and age
   - Deals that moved forward or backward in the past 7 days
   - Deals created in the past 7 days
   - Deals closed (won and lost) in the past 7 days
   If no CRM connection, reference the most recent pipeline data provided by the user.

3. **Calculate health metrics** — Compute key pipeline health indicators:
   - Total pipeline value and deal count
   - Pipeline coverage ratio (pipeline / quota remaining)
   - Week-over-week pipeline movement (created, advanced, slipped, closed)
   - Rolling 90-day win rate, average deal size, and average cycle length
   - Stage-by-stage conversion rates and average days in stage

4. **Identify risks** — Flag deals matching historical loss patterns:
   - Deals stuck in stage longer than historical average
   - Deals with close dates that have slipped multiple times
   - Deals missing key qualification criteria (no champion identified, no economic buyer engaged)
   - Deals where competitive intelligence suggests a threat
   - Deals with no recent activity or engagement

5. **Generate coaching signals** — For each rep, identify data-driven coaching priorities:
   - Read rep profiles from `memory/team.md` for context
   - Compare individual conversion rates to team averages
   - Identify specific stage-transition weaknesses per rep
   - Flag behavioral patterns correlated with losses

6. **Build forecast view** — Create three forecast scenarios:
   - **Committed:** Deals with verbal/written commitment, high probability
   - **Best case:** Committed + deals with strong momentum signals
   - **Weighted:** Full pipeline weighted by stage probability and deal-specific risk adjustments

7. **Prioritize actions** — Rank the top 5-10 actions for the week by potential revenue impact:
   - Which deals need immediate intervention?
   - Which coaching conversations are highest leverage?
   - What pipeline creation activities are needed to close the coverage gap?

8. **Update memory** — Write any new pattern observations to `memory/deal-patterns.md`. Log the digest run to `memory/changelog.md`.

9. **Generate digest** — Produce a structured pipeline digest report with:
   - Health snapshot table
   - Deals that need attention (🔴🟡🟢 categorized)
   - Conversion funnel analysis
   - Forecast view with gap-to-quota analysis
   - Coaching signals per rep
   - Prioritized action list for the week

10. **Deliver** — If Slack is connected, post the digest to the sales team channel. Otherwise, save to the outputs folder.

## Success Criteria

- Pipeline health metrics calculated and trended week-over-week
- At-risk deals identified with specific risk signals and recommended actions
- Coaching priorities tied to data, not opinions
- Forecast is realistic with clear commit vs. upside distinction
- Actions are specific, assigned, and time-bound
- Historical patterns updated with any new observations

## Constraints

- Keep the digest to 1-2 pages max for the summary view. Detailed deal analysis can be in appendix.
- Differentiate between data-backed risk flags and speculation. Label confidence levels.
- Don't flag everything as a risk — if too many deals are flagged, none get attention. Focus on top 5-7 deals.
- Compare to last week's digest when available. Did last week's risk flags play out? Track prediction accuracy to improve over time.
- If pipeline data is stale (>7 days), note this prominently and recommend a CRM refresh.
