# GTM Enablement Engine

A compounding intelligence platform for Go-to-Market teams — built on Claude. Goes beyond static content generation into a self-healing, learning system that gets smarter with every deal, every call, and every quarter.

Not a collection of templates. An enablement **infrastructure** that compounds.

## What Makes This Different

Traditional enablement plugins generate content. This one **learns from outcomes** and **heals itself**:

- **Memory Layer:** Every skill reads from and writes to a persistent knowledge base. Competitive intel, deal patterns, ICP data, and team profiles compound over time.
- **Self-Healing Content:** Content freshness is scored continuously. When a competitor launches a new feature, the system flags every battle card, playbook, and talk track that needs updating — automatically.
- **Personalization:** Materials adapt to each rep's experience level, skill gaps, and learning style. A new hire gets scaffolding; a veteran gets targeted nudges.
- **Cross-GTM:** Covers sales, marketing, CS, partnerships, and RevOps — because deals don't live in one function.
- **Scheduled Automations:** Weekly competitive scans, pipeline digests, and content audits run on autopilot.

## Installation

```bash
claude plugins add gtm-enablement-engine
```

## Commands

Explicit workflows you invoke with a slash command:

| Command | Description |
|---|---|
| `/deal-review` | Structured deal strategy session — health score, MEDDIC assessment, risk analysis, win plan |
| `/enablement-dashboard` | Audit enablement readiness — content, training, process, tools — with gap analysis |
| `/onboarding-plan` | New hire onboarding curriculum with milestones, training, and certification gates |
| `/competitive-pulse` | Real-time competitive intelligence briefing — recent moves, positioning shifts, risk to pipeline |
| `/pipeline-digest` | Weekly pipeline intelligence digest — health metrics, risk alerts, coaching signals, forecast view |
| `/content-audit` | Content library health check — freshness scoring, gap analysis, dependency mapping, remediation plan |
| `/rep-dashboard` | Personalized rep performance dashboard — skill profile, deal patterns, coaching priorities, dev plan |

All commands work **standalone** (describe your situation, paste notes, or upload data) and get **supercharged** with MCP connectors.

## Skills

### Core Enablement (10 skills)

The foundation — domain knowledge Claude uses automatically when relevant:

| Skill | Description |
|---|---|
| `battle-cards` | Competitive battle cards with feature matrices, pricing intel, talk tracks, and objection responses |
| `objection-handling` | ACES framework — live help, library builder, role-play practice, and coaching modes |
| `discovery-guide` | Structured discovery using SPIN, Sandler, or Challenger with tailored question sets per persona |
| `deal-qualification` | MEDDIC/BANT/SPICED scoring with gap analysis and go/no-go recommendations |
| `proposal-builder` | Proposals, business cases, executive summaries, mutual action plans, and SOWs |
| `roi-calculator` | ROI analyses, TCO comparisons, cost-of-inaction models, and interactive calculators |
| `win-loss-analysis` | Post-mortems and batch analysis with retroactive qualification and pattern detection |
| `sales-coaching` | Call reviews, skill assessments, development plans, role-play, and coaching templates |
| `playbook-builder` | Product, segment, motion, competitive, and new-hire playbooks |
| `buyer-persona` | ICPs, buying committee maps, journey mapping, and persona-specific messaging |

### Intelligence & Personalization (2 skills)

The learning layer — makes everything else smarter over time:

| Skill | Description |
|---|---|
| `gtm-memory` | Persistent intelligence layer — stores competitive intel, deal patterns, ICP data, product context, and team knowledge. Every skill reads from and writes to this layer. |
| `rep-profile` | Personalization engine — tracks skill scores, deal patterns, and learning styles per rep. Adapts every output to the rep's experience level and development needs. |

### Self-Healing System (1 skill)

Keeps your enablement content alive and current:

| Skill | Description |
|---|---|
| `content-health` | Continuous freshness monitoring with three-layer decay scoring (time + events + outcomes). Tracks dependencies so one change propagates correctly. Auto-generates refresh tasks. |

### Cross-GTM Enablement (5 skills)

Bridges between functions — because deals don't live in one silo:

| Skill | Description |
|---|---|
| `campaign-to-field` | Translates marketing campaigns into field-ready talk tracks, email templates, discovery questions, and deal targeting guides |
| `handoff-builder` | Structured handoffs between GTM functions — SDR→AE, Sales→CS, AE→SE, Sales→Implementation |
| `expansion-playbook` | Upsell, cross-sell, and renewal playbooks with signal detection and pre-renewal timelines |
| `pipeline-intelligence` | Smart analytics that learn from deal outcomes — risk prediction, conversion analysis, coaching signals |
| `partner-enablement` | Partner playbooks, co-sell guides, joint value props, and partner onboarding kits |

## Scheduled Automations

Set-and-forget workflows that keep your enablement infrastructure running:

| Shortcut | Schedule | What It Does |
|---|---|---|
| `weekly-competitive-pulse` | Monday 7am | Scans competitors, updates memory, flags stale battle cards, delivers briefing |
| `weekly-pipeline-digest` | Monday 7am | Generates pipeline health report, risk alerts, coaching signals, forecast view |
| `monthly-content-audit` | 1st of month | Scores all content freshness, identifies gaps, builds remediation plan |
| `daily-deal-signals` | Weekdays 8am | Lightweight scan for expansion triggers, risk events, and stalled deals |

## How the Learning Loop Works

```
┌──────────────────────────────────────────────────────┐
│                    EVERY INTERACTION                      │
│                                                          │
│  1. READ from memory/  → Get context before acting       │
│  2. DO the task         → Battle card, coaching, etc.     │
│  3. WRITE to memory/   → Store what was learned          │
│  4. CHECK content      → Flag stale assets affected       │
│                                                          │
│  The more you use it, the smarter it gets.               │
│  Quarter 1 outputs ≠ Quarter 4 outputs.                  │
└──────────────────────────────────────────────────────┘
```

### Memory Architecture

```
memory/
├── product.md          # Your product, features, pricing, roadmap
├── competitors.md      # Competitive landscape, intelligence, trends
├── icp.md              # Ideal customer profile, personas, segments
├── deal-patterns.md    # Win/loss patterns, risk signals, benchmarks
├── objections.md       # Objection library with effectiveness scores
├── team.md             # Team roster, roles, territories
├── content-registry.md # All enablement assets with freshness scores
└── changelog.md        # Audit trail of all memory changes
```

## Example Workflows

### Weekly Sales Manager Routine

```
Monday morning:
1. /pipeline-digest          → See pipeline health, risk alerts, coaching priorities
2. /competitive-pulse        → Catch any competitive moves from last week
3. /rep-dashboard Sarah      → Prep for 1:1 with specific coaching topics
4. /deal-review              → Deep dive on the 2-3 deals that need strategy
```

### New Campaign Launch

```
Marketing launches a campaign:
1. campaign-to-field triggers → Generates talk tracks, email templates, FAQ
2. content-health updates    → Registers new assets, flags old ones
3. battle-cards checks       → Updates competitive position if campaign changes messaging
```

### Self-Healing in Action

```
Competitor announces a new feature:
1. competitive-pulse detects → Logged to memory/competitors.md
2. content-health triggers   → Flags all assets referencing that competitor
3. battle-cards re-evaluated → Specific sections needing update identified
4. Remediation plan created  → Prioritized tasks with effort estimates
```

## Standalone + Supercharged

Every command and skill works without any integrations:

| Capability | Standalone | Supercharged With |
|---|---|---|
| Competitive intel | Web search + your input | Chat, Knowledge base, CRM |
| Deal reviews | Manual input + scoring | CRM (deal data), Transcripts |
| Pipeline analysis | Upload CSV or describe | CRM (live pipeline), Chat |
| Content management | Manual inventory | Knowledge base, CRM (usage data) |
| Rep development | Self-assessment + coaching | Transcripts (call quality), CRM (metrics) |
| Cross-GTM handoffs | Your context | CRM, Chat, Calendar |
| Expansion plays | Account context | CRM (usage), Chat (signals) |
| Partner enablement | Your knowledge | Knowledge base, CRM |
| Scheduled automations | File-based reports | Chat (delivery), CRM (data source) |

## MCP Integrations

> See [CONNECTORS.md](CONNECTORS.md) for full connector details.

This plugin ships with a bundled `.mcp.json` that pre-configures two categories of connectors:

### Remote MCP Servers (HTTP — one-click connect)

These are hosted MCP servers you connect through Claude's connector UI. No local setup required.

| Server | Category | What It Enables |
|---|---|---|
| **HubSpot** | CRM | Deal data, pipeline history, contacts, company profiles, win/loss patterns |
| **Slack** | Chat | Competitive intel, team discussions, deal context, briefing delivery |
| **Microsoft 365** | Calendar + Email | Meeting context, call prep, handoff scheduling, outbound sequences |
| **Notion** | Knowledge Base | Existing playbooks, case studies, content library |
| **Fireflies** | Conversation Intelligence | Basic call recordings and transcripts |
| **Clay** | Data Enrichment | Company/contact enrichment via Clay's official MCP |
| **ZoomInfo** | Data Enrichment | Company/contact data via ZoomInfo's official MCP |
| **Atlassian** | Knowledge Base | Confluence pages, Jira tickets |
| **Close** | CRM (Alt) | Alternative CRM if you don't use HubSpot |

### Sales Intelligence MCP Server (stdio — bundled locally)

A custom MCP server bundled at `./mcp-server/` that provides 16 deep-integration tools beyond what the official connectors offer:

| Service | Tools | What It Adds |
|---|---|---|
| **Gong** | 5 | Search calls, pull full transcripts, get call analytics (topics, trackers, speaker stats), find calls by participant, aggregate team stats |
| **ZoomInfo** | 4 | Company search with firmographics, contact search with filters, org chart mapping, tech stack analysis |
| **Clay** | 3 | Person enrichment (email/LinkedIn/name), company enrichment (domain/name), webhook table triggers |
| **LinkedIn Sales Nav** | 3 | Lead search with seniority/geo filters, full profile retrieval, company search |
| **Status** | 1 | Check which services are configured |

#### Sales Intelligence Setup

```bash
# 1. Navigate to the MCP server directory
cd mcp-server/

# 2. Install dependencies
npm install

# 3. Build the TypeScript source
npm run build

# 4. Set API keys for the services you use (only configure what you have)
# Gong (Basic Auth — Settings → Integrations → API)
export GONG_ACCESS_KEY="your-access-key"
export GONG_ACCESS_KEY_SECRET="your-access-key-secret"

# ZoomInfo (JWT Auth — Developer Portal → Create App)
export ZOOMINFO_CLIENT_ID="your-client-id"
export ZOOMINFO_PRIVATE_KEY="your-private-key"

# Clay (API Key — Settings → API, Enterprise plan required)
export CLAY_API_KEY="your-api-key"

# LinkedIn Sales Navigator (OAuth — requires SNAP partnership)
export LINKEDIN_ACCESS_TOKEN="your-oauth-token"
```

The `.mcp.json` at the plugin root is already configured to point to `./mcp-server/dist/index.js`. API keys in the `env` block are empty by default — fill in only the services you subscribe to. Unconfigured services return helpful setup messages instead of errors.

### How Skills Use These Tools

Every skill auto-detects available tools at runtime and pulls data before asking you anything. The priority order is: CRM → Sales Intelligence → Gong → Chat → Calendar/Email. If no tools are connected, every skill still works in standalone mode — you just provide context manually.

## Settings

Create a local settings file at `gtm-enablement/.claude/settings.local.json`:

```json
{
  "name": "Your Name",
  "title": "Sales Enablement Manager",
  "company": "Your Company",
  "product": {
    "name": "Your Product",
    "description": "Brief description of what you sell",
    "pricing_model": "Per seat / Usage / Tier",
    "average_deal_size": 50000,
    "average_sales_cycle_days": 60,
    "value_props": [
      "Key value proposition 1",
      "Key value proposition 2",
      "Key value proposition 3"
    ],
    "competitors": [
      "Competitor A",
      "Competitor B",
      "Competitor C"
    ]
  },
  "icp": {
    "company_size": "50-500 employees",
    "industries": ["SaaS", "Technology"],
    "primary_persona": "VP of Engineering",
    "secondary_personas": ["CTO", "Director of Ops"]
  },
  "methodology": "MEDDIC",
  "team": {
    "aes": 10,
    "sdrs": 5,
    "ses": 3,
    "csms": 4,
    "managers": 2
  },
  "automations": {
    "competitive_pulse": "weekly",
    "pipeline_digest": "weekly",
    "content_audit": "monthly",
    "deal_signals": "daily"
  }
}
```

The plugin will ask you for this information interactively if it's not configured.

## Architecture

```
gtm-enablement-engine/
├── .mcp.json                        # Pre-configured MCP servers (remote + local)
├── .claude-plugin/
│   └── plugin.json                  # Plugin manifest (v2.3.0)
├── README.md                        # This file
├── CONNECTORS.md                    # Tool-agnostic connector reference
├── LICENSE                          # MIT
├── mcp-server/                      # Bundled Sales Intelligence MCP server
│   ├── package.json                 # Node.js dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── src/                         # TypeScript source
│   │   ├── index.ts                 # Server entry — registers all 16 tools
│   │   ├── constants.ts             # API URLs, limits, enums
│   │   ├── types.ts                 # Shared TypeScript interfaces
│   │   ├── services/                # API clients (Gong, ZoomInfo, Clay, LinkedIn)
│   │   └── tools/                   # Tool definitions (5 Gong, 4 ZI, 3 Clay, 3 LI)
│   └── dist/                        # Compiled JS (pre-built, ready to run)
│       └── index.js                 # Entry point for .mcp.json
├── skills/                          # 18 MCP-integrated skills
│   ├── battle-cards/SKILL.md        # Competitive battle cards
│   ├── objection-handling/SKILL.md  # ACES objection framework
│   ├── discovery-guide/SKILL.md     # Discovery call preparation
│   ├── deal-qualification/SKILL.md  # MEDDIC/BANT/SPICED scoring
│   ├── proposal-builder/SKILL.md    # Proposals and business cases
│   ├── roi-calculator/SKILL.md      # ROI and TCO analysis
│   ├── win-loss-analysis/SKILL.md   # Deal outcome analysis
│   ├── sales-coaching/SKILL.md      # Rep coaching and development
│   ├── playbook-builder/SKILL.md    # Sales playbook creation
│   ├── buyer-persona/SKILL.md       # ICPs and persona development
│   ├── gtm-memory/SKILL.md         # Persistent intelligence layer
│   ├── rep-profile/SKILL.md        # Personalization engine
│   ├── content-health/SKILL.md     # Self-healing content system
│   ├── campaign-to-field/SKILL.md  # Marketing → sales bridge
│   ├── handoff-builder/SKILL.md    # Cross-functional handoffs
│   ├── expansion-playbook/SKILL.md # Upsell/cross-sell/renewal
│   ├── pipeline-intelligence/SKILL.md # Smart pipeline analytics
│   └── partner-enablement/SKILL.md # Partner/channel enablement
├── commands/                        # 7 slash commands
│   ├── deal-review.md               # /deal-review
│   ├── enablement-dashboard.md      # /enablement-dashboard
│   ├── onboarding-plan.md           # /onboarding-plan
│   ├── competitive-pulse.md         # /competitive-pulse
│   ├── pipeline-digest.md           # /pipeline-digest
│   ├── content-audit.md             # /content-audit
│   └── rep-dashboard.md             # /rep-dashboard
└── shortcuts/                       # 4 scheduled automations
    ├── weekly-competitive-pulse.md  # Monday competitive scan
    ├── weekly-pipeline-digest.md    # Monday pipeline health
    ├── monthly-content-audit.md     # Monthly freshness scoring
    └── daily-deal-signals.md        # Daily signal detection
```
