---
name: weekly-competitive-pulse
description: "Automated weekly competitive intelligence scan — runs every Monday morning to surface competitor moves, update battle cards, and brief the team."
schedule: "0 7 * * 1"
---

# Weekly Competitive Pulse

## Task Description

Run a comprehensive competitive intelligence scan and deliver a weekly briefing. Execute the following steps:

1. **Read competitive baseline** — Load `memory/competitors.md` to understand the current competitive landscape, tracked competitors, and known positioning.

2. **Scan for new intelligence** — For each tracked competitor:
   - Search the web for recent news, press releases, product announcements, and funding events from the past 7 days.
   - Check for pricing page changes, new customer logos, or messaging shifts on their website.
   - Look for new G2/Capterra reviews or analyst mentions.

3. **Compare to baseline** — Identify what's changed since the last pulse:
   - New product features or capabilities announced
   - Positioning or messaging changes
   - New customer wins or case studies
   - Leadership changes or hiring patterns
   - Funding, acquisitions, or partnerships

4. **Assess pipeline impact** — If CRM is connected, identify active deals where detected competitors are present and flag any that may be affected by competitor moves.

5. **Update memory** — Write confirmed new intelligence to `memory/competitors.md` and log the scan to `memory/changelog.md`.

6. **Check content freshness** — Cross-reference findings with `memory/content-registry.md`. Flag any battle cards, talk tracks, or competitive materials that need updating based on new intelligence.

7. **Generate briefing** — Produce a structured competitive pulse report with:
   - Executive summary (3-4 sentences, most important findings)
   - Per-competitor activity table
   - Deals at risk
   - Battle card health status
   - Recommended actions for the week

8. **Deliver** — If Slack is connected, post the briefing to the designated sales enablement channel. Otherwise, save as a markdown file to the outputs folder.

## Success Criteria

- All tracked competitors scanned for recent activity
- New intelligence captured and stored in memory
- Stale content flagged for refresh
- Actionable briefing delivered with specific recommended responses
- Pipeline deals cross-referenced for competitive risk

## Constraints

- Focus on actionable intelligence, not noise. Skip minor updates that don't affect selling.
- Keep the briefing under 2 pages — reps won't read more.
- Always cite sources for competitive claims.
- If no significant changes detected, say so clearly and keep the briefing short.
