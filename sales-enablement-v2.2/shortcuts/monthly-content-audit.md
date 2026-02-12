---
name: monthly-content-audit
description: "Automated monthly content freshness scan — scores all enablement assets, identifies stale content, and generates a remediation plan."
schedule: "0 8 1 * *"
---

# Monthly Content Audit

## Task Description

Run a comprehensive content health audit across the entire enablement library and generate a remediation plan. Execute the following steps:

1. **Load content registry** — Read `memory/content-registry.md` to get the full inventory of tracked enablement assets with their metadata (type, last updated, dependencies, freshness scores).

2. **Calculate freshness scores** — For each registered asset, compute a freshness score (0-100) based on three decay factors:
   - **Time decay:** How old is the content? (>90 days starts losing points, >180 days is critical)
   - **Event decay:** Have triggering events occurred since last update? (pricing changes, new features, competitive moves, new case studies)
   - **Outcome decay:** Has the content's effectiveness data changed? (win rate shifts, negative feedback, deals lost citing outdated info)

3. **Check for triggering events** — Scan for events that should trigger content updates:
   - Read `memory/competitors.md` for competitive changes since last audit
   - Read `memory/product.md` for product changes
   - Read `memory/deal-patterns.md` for outcome pattern shifts
   - Check `memory/changelog.md` for recent changes that cascade

4. **Identify content gaps** — Compare the enablement library against what a fully-enabled team needs:
   - Battle cards for all known competitors
   - Case studies per target industry/segment
   - Playbooks for each active sales motion
   - Updated talk tracks for current messaging
   - Objection responses reflecting current proof points

5. **Map dependencies** — Trace which content updates cascade to other assets. Example: if pricing changed, flag battle cards, proposals, ROI calculators, and partner materials that reference pricing.

6. **Build remediation plan** — Prioritize updates by:
   - Impact: How much pipeline or revenue is at risk from stale content?
   - Effort: How long does each update take?
   - Dependencies: Which updates unblock other updates?

7. **Update content registry** — Write new freshness scores and status to `memory/content-registry.md`. Log the audit to `memory/changelog.md`.

8. **Generate report** — Produce a structured content audit report with:
   - Overall health score
   - Category-by-category breakdown
   - Stale content flagged for immediate action
   - Content gaps with priority scores
   - Dependency impact map
   - Prioritized remediation plan with effort estimates and suggested owners

9. **Deliver** — If Slack is connected, post the summary to the enablement channel with the full report attached. Otherwise, save to the outputs folder.

## Success Criteria

- All registered content assets scored for freshness
- Stale content identified with specific reasons for decay
- Content gaps cataloged with business impact
- Dependency chains mapped so updates cascade properly
- Remediation plan is actionable with clear priorities, owners, and effort estimates
- Content registry updated with new scores

## Constraints

- Score objectively — don't mark content as "current" just because it hasn't been flagged. Age alone is a decay factor.
- Be specific about what needs updating in each asset, not just "needs refresh."
- Prioritize by business impact, not recency. A stale battle card for your #1 competitor matters more than an aging case study for a niche segment.
- If the content registry is empty or sparse, flag this and recommend a full content cataloging exercise before the next audit.
