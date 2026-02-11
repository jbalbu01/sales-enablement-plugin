<div align="center">

# Sales Enablement Plugin for Claude

**A compounding GTM intelligence engine that learns from every deal and gets smarter over time.**

[![Version](https://img.shields.io/badge/version-2.4.0-blue.svg)](https://github.com/jbalbu01/sales-enablement-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/skills-18-orange.svg)](#skills)
[![MCP Tools](https://img.shields.io/badge/MCP_tools-16-purple.svg)](#mcp-integrations)
[![Commands](https://img.shields.io/badge/commands-7-red.svg)](#commands)

[Install](#installation) · [Skills](#skills) · [Commands](#commands) · [MCP Setup](#mcp-integrations) · [Architecture](#architecture)

---

</div>

## What Is This?

A Claude plugin that turns your sales enablement into a **living, learning system**. Unlike static template generators, this plugin builds intelligence over time — tracking competitive shifts, learning from deal outcomes, and adapting content to each rep's skill level automatically.

### Key Capabilities

- **18 specialized skills** covering sales, marketing, CS, partnerships, and RevOps
- **7 slash commands** for instant workflow execution
- **4 scheduled automations** for competitive scans, pipeline digests, and content audits
- **16 custom MCP tools** for deep integration with Gong, ZoomInfo, Clay, and LinkedIn Sales Navigator
- **9 pre-configured remote connectors** for HubSpot, Slack, MS365, Notion, and more
- **Persistent memory layer** that compounds knowledge across every interaction
- **Self-healing content system** that detects stale assets and triggers refresh workflows

### How It's Different

| Traditional Enablement | This Plugin |
|---|---|
| Static templates | Learns from deal outcomes |
| One-size-fits-all | Adapts to each rep's skill level |
| Manual content updates | Self-healing freshness monitoring |
| Siloed by function | Cross-GTM (sales, marketing, CS, partnerships) |
| Point-in-time snapshots | Compounding intelligence over quarters |

---

## Installation

### As a Claude Plugin (Recommended)

Download the latest release zip and upload it as a custom plugin in Claude Desktop or Cowork.

### From Source

```bash
git clone https://github.com/jbalbu01/sales-enablement-plugin.git
cd sales-enablement-plugin/sales-enablement-v2.1

# Set up the bundled MCP server (optional — only if you use Gong/ZoomInfo/Clay/LinkedIn)
cd mcp-server
npm install
cd ..
```

---

## Commands

Invoke these directly with a slash command:

| Command | What It Does |
|---|---|
| `/deal-review` | Structured deal strategy session — health score, MEDDIC assessment, risk analysis, win plan |
| `/pipeline-digest` | Weekly pipeline intelligence digest — health metrics, risk alerts, coaching signals |
| `/competitive-pulse` | Real-time competitive intelligence briefing — recent moves, positioning shifts |
| `/rep-dashboard` | Personalized rep performance dashboard — skill gaps, coaching priorities |
| `/enablement-dashboard` | Audit enablement readiness — content, training, process, tools |
| `/content-audit` | Content library health check — freshness scoring, gap analysis, remediation |
| `/onboarding-plan` | New hire onboarding curriculum with milestones and certification gates |

All commands work **standalone** (paste notes, describe your situation) and get **supercharged** when you connect integrations.

---

## Skills

### Core Enablement

| Skill | Description |
|---|---|
| `battle-cards` | Competitive battle cards with feature matrices, pricing intel, and talk tracks |
| `objection-handling` | ACES framework with live help, library builder, and role-play practice |
| `discovery-guide` | Structured discovery using SPIN, Sandler, or Challenger frameworks |
| `deal-qualification` | MEDDIC/BANT/SPICED scoring with gap analysis and go/no-go recommendations |
| `proposal-builder` | Proposals, business cases, executive summaries, and mutual action plans |
| `roi-calculator` | ROI analyses, TCO comparisons, and interactive value calculators |
| `win-loss-analysis` | Deal post-mortems with pattern detection and retroactive qualification |
| `sales-coaching` | Call reviews, skill assessments, development plans, and coaching templates |
| `playbook-builder` | Product, segment, motion, competitive, and new-hire playbooks |
| `buyer-persona` | ICPs, buying committee maps, journey mapping, and persona-specific messaging |

### Intelligence & Personalization

| Skill | Description |
|---|---|
| `gtm-memory` | Persistent intelligence layer — stores competitive intel, deal patterns, ICP data. Every skill reads from and writes to this. |
| `rep-profile` | Personalization engine — adapts every output to the rep's experience level and skill gaps |

### Self-Healing System

| Skill | Description |
|---|---|
| `content-health` | Continuous freshness monitoring with three-layer decay scoring. Tracks dependencies so one change propagates correctly. |

### Cross-GTM Enablement

| Skill | Description |
|---|---|
| `campaign-to-field` | Translates marketing campaigns into field-ready talk tracks and email templates |
| `handoff-builder` | Structured handoffs — SDR-to-AE, Sales-to-CS, AE-to-SE |
| `expansion-playbook` | Upsell, cross-sell, and renewal playbooks with signal detection |
| `pipeline-intelligence` | Smart analytics that learn from outcomes — risk prediction, coaching signals |
| `partner-enablement` | Partner playbooks, co-sell guides, and joint value propositions |

---

## Scheduled Automations

Set-and-forget workflows that run on autopilot:

| Shortcut | Schedule | What It Does |
|---|---|---|
| `weekly-competitive-pulse` | Monday 7am | Scans competitors, updates memory, flags stale battle cards |
| `weekly-pipeline-digest` | Monday 7am | Pipeline health report with risk alerts and coaching signals |
| `monthly-content-audit` | 1st of month | Scores all content freshness, builds remediation plan |
| `daily-deal-signals` | Weekdays 8am | Lightweight scan for expansion triggers and stalled deals |

---

## MCP Integrations

This plugin ships with a `.mcp.json` that pre-configures **10 MCP servers** across two categories.

### Remote Connectors (One-Click)

Connect through Claude's connector UI — no local setup required:

| Connector | Category | What It Enables |
|---|---|---|
| HubSpot | CRM | Deal data, pipeline, contacts, win/loss patterns |
| Slack | Chat | Competitive intel, team context, briefing delivery |
| Microsoft 365 | Calendar + Email | Meeting prep, call scheduling, outbound sequences |
| Notion | Knowledge Base | Playbooks, case studies, content library |
| Fireflies | Transcripts | Call recordings and transcripts |
| Clay | Enrichment | Company/contact enrichment |
| ZoomInfo | Enrichment | Company/contact data |
| Atlassian | Wiki + Tickets | Confluence pages, Jira issues |
| Close | CRM (Alt) | Alternative CRM option |

### Bundled Sales Intelligence Server (16 Tools)

A custom MCP server included at `mcp-server/` for deep integration beyond what official connectors offer:

| Service | Tools | Capabilities |
|---|---|---|
| **Gong** | 5 | Call search, full transcripts, analytics (topics, trackers, speaker stats), participant lookup, team stats |
| **ZoomInfo** | 4 | Company search with firmographics, contact search, org chart mapping, tech stack analysis |
| **Clay** | 3 | Person enrichment, company enrichment, webhook table triggers |
| **LinkedIn Sales Nav** | 3 | Lead search with filters, profile retrieval, company search |
| **Status** | 1 | Service connectivity check |

#### Setup

```bash
cd mcp-server && npm install
```

Then fill in your API keys in `.mcp.json` at the plugin root — only the services you subscribe to. Everything else gracefully degrades.

| Service | Where to Get Keys |
|---|---|
| Gong | Settings → Integrations → API → Create Access Key |
| ZoomInfo | Developer Portal → Create App |
| Clay | Settings → API (Enterprise plan) |
| LinkedIn | Requires SNAP partnership |

---

## How the Learning Loop Works

```
Every interaction:
  1. READ from memory    → Get context before acting
  2. DO the task         → Battle card, coaching, deal review, etc.
  3. WRITE to memory     → Store what was learned
  4. CHECK content       → Flag stale assets affected

Quarter 1 outputs ≠ Quarter 4 outputs. It compounds.
```

### Memory Architecture

```
memory/
├── product.md          # Your product, features, pricing, roadmap
├── competitors.md      # Competitive landscape and intelligence
├── icp.md              # Ideal customer profile and personas
├── deal-patterns.md    # Win/loss patterns and risk signals
├── objections.md       # Objection library with effectiveness scores
├── team.md             # Team roster, roles, territories
├── content-registry.md # All enablement assets with freshness scores
└── changelog.md        # Audit trail of all memory changes
```

---

## Architecture

```
sales-enablement-v2.1/
├── .mcp.json                  # Pre-configured MCP servers (10 total)
├── .claude-plugin/plugin.json # Plugin manifest (v2.4.0)
├── CONNECTORS.md              # Full connector reference
├── mcp-server/                # Bundled Sales Intelligence MCP server
│   ├── src/                   # TypeScript source (16 tools)
│   └── dist/                  # Pre-compiled JS (ready to run)
├── skills/                    # 18 specialized skills
├── commands/                  # 7 slash commands
└── shortcuts/                 # 4 scheduled automations
```

---

## Example Workflows

**Weekly Sales Manager Routine:**
```
Monday morning:
→ /pipeline-digest        See pipeline health and risk alerts
→ /competitive-pulse      Catch competitive moves from last week
→ /rep-dashboard Sarah    Prep coaching topics for 1:1
→ /deal-review            Deep dive on priority deals
```

**Competitor Announces New Feature:**
```
→ competitive-pulse detects     Logged to memory
→ content-health triggers       Flags all affected assets
→ battle-cards re-evaluated     Specific sections identified
→ Remediation plan created      Prioritized with effort estimates
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

**Jose Balbuena** — [GitHub](https://github.com/jbalbu01)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
