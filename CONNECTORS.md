# Connectors

## How tool references work

Plugin files use `~~category` as a placeholder for whatever tool the user connects in that category. For example, `~~CRM` might mean Salesforce, HubSpot, or any other CRM with an MCP server.

Plugins are **tool-agnostic** — they describe workflows in terms of categories (CRM, chat, email, etc.) rather than specific products. The `.mcp.json` pre-configures specific MCP servers, but any MCP server in that category works.

## Connectors for this plugin

| Category | Placeholder | Included servers | Other options |
|----------|-------------|-----------------|---------------|
| CRM | `~~CRM` | HubSpot, Salesforce | Close, Pipedrive, Copper, Freshsales |
| Chat | `~~chat` | Slack | Microsoft Teams, Discord |
| Knowledge Base | `~~knowledge base` | Notion | Confluence, Guru, Coda, Slite |
| Meeting Transcription | `~~conversation intelligence` | Fireflies | Gong, Chorus, Otter.ai, Fathom |
| Data Enrichment | `~~data enrichment` | Clay, ZoomInfo | Apollo, Clearbit, Lusha, Cognism |
| Calendar | `~~calendar` | Microsoft 365 | Google Calendar |
| Email | `~~email` | Microsoft 365 | Gmail, Outreach, Salesloft |
| CS Platform | `~~CS platform` | Gainsight | ChurnZero, Vitally, Totango, Catalyst |
| Project Management | `~~project management` | Asana | Jira, Linear, Monday.com |

## What each connector enables

### CRM (Highest Impact)

The single most impactful connector. Enables:

- **Deal reviews:** Pull live deal data instead of manual input
- **Win/loss analysis:** Analyze pipeline data automatically
- **Qualification:** Pre-fill MEDDIC scores from CRM fields
- **Pipeline intelligence:** Real-time pipeline health, risk detection, coaching signals
- **Expansion plays:** Usage data and renewal dates for upsell timing
- **Rep dashboards:** Activity metrics, quota attainment, deal velocity per rep
- **Forecast:** Weighted pipeline and commit/upside breakdown
- **Scheduled automations:** Pipeline digest and deal signals run against live data

### Knowledge Base

Store and retrieve enablement content:

- **Playbooks:** Reference existing playbooks when building new ones
- **Battle cards:** Check if battle cards already exist before creating
- **Case studies:** Pull customer stories into proposals and talk tracks
- **Content health:** Scan the full content library for freshness scoring
- **Campaign-to-field:** Access campaign briefs and marketing materials to translate

### Conversation Intelligence

Analyze real calls for coaching and insights:

- **Call reviews:** Pull transcripts automatically instead of copy-paste
- **Coaching:** Identify patterns across many calls per rep
- **Win/loss:** Include call quality in deal analysis
- **Discovery quality:** Score discovery calls against best practice frameworks
- **Rep profiles:** Build skill assessments from actual call performance

### Chat

Access team knowledge, deliver briefings, and surface signals:

- **Battle cards:** Find competitive intel shared in team channels
- **Playbooks:** Capture tribal knowledge from team discussions
- **Coaching:** Reference internal discussions about deals
- **Competitive pulse:** Deliver weekly briefings to sales channels
- **Pipeline digest:** Post weekly digest to team channels
- **Deal signals:** Surface deal-related conversations and blockers
- **Handoffs:** Notify receiving team when handoff documents are ready

### Data Enrichment

Research prospects, companies, and market context:

- **Buyer personas:** Enrich personas with real firmographic and technographic data
- **Battle cards:** Research competitor details, tech stacks, and customer logos
- **Proposals:** Add prospect-specific context and personalization
- **Account research:** Company size, funding, tech stack, org charts
- **Expansion signals:** Hiring patterns, funding events, company news

### Calendar + Email

Context for meetings, outreach, and follow-ups:

- **Discovery prep:** Know who you're meeting and their prior correspondence
- **Onboarding:** Schedule training sessions and manager check-ins
- **Coaching:** Track follow-through on action items
- **Campaign-to-field:** Deploy email templates through existing outbound tools
- **Handoffs:** Schedule kickoff meetings as part of transition workflows

### CS Platform

Customer success data for retention and expansion:

- **Expansion playbook:** Health scores, usage trends, and adoption metrics to time upsell conversations
- **Handoff builder:** CS teams get full context when deals close
- **Renewal strategy:** Risk flags and renewal timing from CS data
- **Pipeline intelligence:** Existing customer pipeline tracked alongside new business
- **Content health:** Track which enablement content impacts customer outcomes

### Project Management

Track enablement initiatives and remediation tasks:

- **Content audit:** Create remediation tasks directly from audit findings
- **Onboarding plans:** Track new hire progress through milestones
- **Content health:** Auto-create refresh tasks when content goes stale
- **Campaign-to-field:** Track field readiness rollout across teams

## Connector Priority

If you're connecting tools for the first time, here's the recommended order:

1. **CRM** — Unlocks 80% of the value. Pipeline data powers everything.
2. **Chat** — Enables briefing delivery and captures team intelligence.
3. **Knowledge Base** — Content health and self-healing require knowing what content exists.
4. **Conversation Intelligence** — Transforms coaching from opinion-based to data-driven.
5. **Data Enrichment** — Enriches research, personas, and competitive analysis.
6. **CS Platform** — Critical for expansion and renewal workflows.
7. **Calendar + Email** — Contextual prep and outbound deployment.
8. **Project Management** — Task tracking for remediation and enablement programs.

---

## MCP Tool Reference

This section maps each connector category to the specific MCP tool functions that skills use. Skills detect available tools automatically — they check if tools matching these patterns exist in the current session and use them if found. If a tool isn't available, the skill falls back to standalone mode.

### CRM Tools (HubSpot, Salesforce, etc.)

**How skills detect CRM:** Look for tools containing `search_crm_objects`, `get_crm_objects`, `manage_crm_objects`, `search_properties`, `get_properties`, or `search_owners`.

**Key operations for skills:**

| Operation | Tool Function | Object Type | Key Properties |
|-----------|---------------|-------------|----------------|
| Find a deal | `search_crm_objects` | `deals` | `dealname`, `amount`, `dealstage`, `closedate`, `pipeline`, `hubspot_owner_id`, `dealtype`, `description`, `notes_last_updated`, `notes_last_contacted`, `num_notes`, `hs_deal_stage_probability`, `hs_forecast_amount`, `hs_projected_amount`, `createdate` |
| Get deal contacts | `search_crm_objects` | `contacts` (with `associatedWith` filter on deals) | `firstname`, `lastname`, `jobtitle`, `email`, `phone`, `company`, `hs_lead_status`, `lifecyclestage` |
| Get deal company | `search_crm_objects` | `companies` (with `associatedWith` filter on deals) | `name`, `domain`, `industry`, `numberofemployees`, `annualrevenue`, `total_revenue`, `description`, `about_us`, `founded_year`, `country` |
| Browse pipeline | `search_crm_objects` | `deals` (filter by stage/pipeline) | Same as "Find a deal" + `num_contacted_notes`, `hs_lastmodifieddate` |
| Map rep names | `search_owners` | N/A | Maps `hubspot_owner_id` to names |
| Get stage definitions | `get_properties` | `deals` (property: `dealstage`) | Returns all stage names, values, and display order |
| Update deal notes | `manage_crm_objects` | `deals` | Write qualification scores, risk flags back to CRM |

**Association patterns:**
- To find contacts for a deal: search `contacts` with `filterGroups` containing `associatedWith: [{objectType: "deals", operator: "EQUAL", objectIds: ["<deal_id>"]}]`
- To find company for a deal: search `companies` with same association pattern
- To find deals for a rep: filter `deals` where `hubspot_owner_id` equals the owner ID

**Contact-to-MEDDIC role mapping:**
- C-suite, VP, SVP, Director → **Economic Buyer** candidate
- Primary contact, highest engagement → **Champion** candidate
- Engineer, Architect, IT Manager → **Technical Evaluator**
- Procurement, Legal, Finance → **Decision Process** gatekeeper
- End users, individual contributors → **Influencer**

### Chat Tools (Slack, Microsoft Teams)

**How skills detect chat:** Look for tools containing `slack_search_public`, `slack_search_public_and_private`, `slack_read_channel`, `slack_send_message`, `chat_message_search`, or similar.

**Key operations for skills:**

| Operation | Tool Function | Usage Pattern |
|-----------|---------------|---------------|
| Find deal context | `slack_search_public` | Query: `"<company name>"` in sales channels |
| Find competitive intel | `slack_search_public` | Query: `"<competitor name>"` or `in:#competitive-intel` |
| Find internal blockers | `slack_search_public` | Query: `"<company name> blocked"` or `"<company name> risk"` |
| Post briefing | `slack_send_message` | Send pipeline digest or competitive pulse to a channel |
| Read thread context | `slack_read_thread` | Follow up on a specific conversation thread |

### Calendar/Email Tools (Outlook, Gmail)

**How skills detect calendar/email:** Look for tools containing `outlook_calendar_search`, `outlook_email_search`, or similar.

**Key operations for skills:**

| Operation | Tool Function | Usage Pattern |
|-----------|---------------|---------------|
| Find prospect meetings | `outlook_calendar_search` | Query: `"<company name>"`, filter by date range |
| Check email engagement | `outlook_email_search` | Query: `"<company name>"` or filter by contact email |
| Meeting prep context | `outlook_calendar_search` | Query upcoming meetings for call prep |

### Sales Intelligence Tools (Gong, ZoomInfo, Clay, LinkedIn)

**How skills detect sales intelligence tools:** Look for tools prefixed with `gong_`, `zoominfo_`, `clay_`, or `linkedin_`.

These tools come from the **Sales Intelligence MCP Server** — a companion MCP that provides deep sales data beyond what CRM offers.

#### Gong (Conversation Intelligence)

| Operation | Tool Function | Key Parameters |
|-----------|---------------|----------------|
| Search calls by date | `gong_search_calls` | `from_date`, `to_date`, `cursor` |
| Get call transcript | `gong_get_transcript` | `call_id` |
| Get call analytics | `gong_get_call_details` | `call_id` → returns topics, trackers, action items, speaker stats |
| Find calls by person | `gong_search_calls_by_participant` | `email`, `from_date`, `to_date` |
| Aggregate call stats | `gong_get_call_stats` | `from_date`, `to_date` → total calls, avg duration, top participants |

**Skills that use Gong:** deal-review, win-loss-analysis, sales-coaching, discovery-guide, rep-profile, call-prep

#### ZoomInfo (Company & Contact Intelligence)

| Operation | Tool Function | Key Parameters |
|-----------|---------------|----------------|
| Search companies | `zoominfo_search_company` | `company_name`, `domain`, `industry`, `min_employees`, `min_revenue` |
| Search contacts | `zoominfo_search_contact` | `job_title`, `management_level`, `department`, `company_name` |
| Get org chart | `zoominfo_get_org_chart` | `company_id`, `department` |
| Get tech stack | `zoominfo_get_tech_stack` | `company_id` or `domain` |

**Skills that use ZoomInfo:** battle-cards, buyer-persona, account-research, competitive-intelligence, proposal-builder

#### Clay (Data Enrichment)

| Operation | Tool Function | Key Parameters |
|-----------|---------------|----------------|
| Enrich person | `clay_enrich_person` | `email`, `linkedin_url`, or `first_name` + `last_name` + `company_domain` |
| Enrich company | `clay_enrich_company` | `domain` or `company_name` |
| Trigger table enrichment | `clay_trigger_enrichment` | `webhook_url`, `data` (key-value pairs) |

**Skills that use Clay:** buyer-persona, proposal-builder, draft-outreach, account-research

#### LinkedIn Sales Navigator (Prospect Research)

| Operation | Tool Function | Key Parameters |
|-----------|---------------|----------------|
| Search leads | `linkedin_search_leads` | `keywords`, `title`, `company_name`, `seniority`, `geography` |
| Get profile | `linkedin_get_profile` | `linkedin_url` or `member_id` |
| Search companies | `linkedin_search_companies` | `keywords`, `company_name`, `industry`, `min_employees` |

**Skills that use LinkedIn:** buyer-persona, account-research, competitive-intelligence, draft-outreach

#### Status Check

| Operation | Tool Function | Returns |
|-----------|---------------|---------|
| Check configured services | `sales_intel_status` | Which of Gong/ZoomInfo/Clay/LinkedIn are connected |

---

### Tool Detection Pattern (For Skill Authors)

Every skill that pulls data should follow this pattern:

```
1. CHECK: Do I have CRM tools available? (search for tool names containing "crm" or "objects")
2. IF YES: Pull relevant data automatically using the operations above
3. CHECK: Do I have sales intel tools? (look for gong_, zoominfo_, clay_, linkedin_ prefixes)
4. IF YES: Pull enrichment and conversation data
5. CHECK: Do I have chat tools? Calendar/email tools?
6. IF YES: Pull supplementary context
7. PRESENT: Show the user what you found and what's still missing
8. ASK: Only request information that couldn't be found in tools
9. EXECUTE: Run the skill's core logic against ALL evidence
10. CITE: Tag evidence sources — "Per CRM:", "Per Gong:", "Per ZoomInfo:", "Per Slack:", "User reported:"
11. STORE: Write new insights back to memory/ files
```

Skills should NEVER require tools to function — they must always work in standalone mode. But when tools ARE available, they should pull data WITHOUT asking the user first. The user said "qualify my Acme deal" — that's permission to look up Acme in the CRM and enrich contacts via ZoomInfo.
