# Sales Enablement Plugin for Claude

A compounding GTM enablement engine — 18 skills, 7 commands, 16 MCP tools, self-healing content, and persistent memory that learns from every deal.

This is not a collection of static templates. It's enablement infrastructure that gets smarter the more your team uses it.

## Quick Start

```bash
# Install the plugin
claude plugins add sales-enablement-plugin

# Build the bundled MCP server (optional, for Gong/ZoomInfo/Clay/LinkedIn tools)
cd mcp-server && npm install && npm run build
```

Then restart Claude Desktop. That's it.

## How It Works

```
┌─────────────────────────────────────────────────────┐
│                  Claude Desktop                      │
│                                                      │
│   User: "/deal-review Acme Corp"                     │
│                                                      │
│   ┌───────────────┐    ┌──────────────────────┐     │
│   │  18 Skills     │◄──►│  Persistent Memory   │     │
│   │  (analysis,    │    │  (deal patterns,     │     │
│   │   coaching,    │    │   competitive intel, │     │
│   │   playbooks)   │    │   ICP data)          │     │
│   └───────┬───────┘    └──────────────────────┘     │
│           │                                          │
│   ┌───────▼───────────────────────────────────┐     │
│   │           16 MCP Tools                     │     │
│   │  Gong · ZoomInfo · Clay · LinkedIn         │     │
│   │  HubSpot · Slack · Notion · Fireflies      │     │
│   └───────────────────────────────────────────┘     │
│                                                      │
│   Output: Deal score, risk flags, next steps,        │
│   competitive positioning — all personalized         │
│   to the rep's experience level                      │
└─────────────────────────────────────────────────────┘
```

Every interaction reads from and writes to memory. The system learns your competitive landscape, deal patterns, ICP, and team strengths over time.

## What's Inside

### 18 Skills

**Core Enablement (10)**
| Skill | What It Does |
|---|---|
| Battle Cards | Side-by-side competitive comparisons with talk tracks |
| Objection Handling | Framework-based responses (price, timing, competition) |
| Discovery Guide | SPIN/Sandler/Challenger question sets and call guides |
| Deal Qualification | MEDDIC/BANT/SPICED scoring with gap analysis |
| Proposal Builder | Custom proposals, business cases, and exec summaries |
| ROI Calculator | TCO comparisons and value models for prospects |
| Win-Loss Analysis | Pattern recognition across won and lost deals |
| Sales Coaching | Call reviews, skill plans, and role-play practice |
| Playbook Builder | Repeatable sales processes by product or segment |
| Buyer Persona | ICP and persona development with messaging guidance |

**Intelligence Layer (2)**
| Skill | What It Does |
|---|---|
| GTM Memory | Persistent knowledge base that compounds across sessions |
| Rep Profile | Adapts all output to each rep's skill level and style |

**Self-Healing (1)**
| Skill | What It Does |
|---|---|
| Content Health | Flags stale assets when market conditions shift |

**Cross-GTM (5)**
| Skill | What It Does |
|---|---|
| Campaign to Field | Translates marketing launches into rep-ready materials |
| Handoff Builder | Structured handoffs (SDR-to-AE, AE-to-CS, etc.) |
| Expansion Playbook | Upsell/cross-sell/renewal plays for existing customers |
| Pipeline Intelligence | Deal velocity, conversion, and coaching signals |
| Partner Enablement | Channel partner playbooks and co-sell guides |

### 7 Commands

| Command | What It Does |
|---|---|
| `/deal-review` | Structured deal assessment with scoring and next steps |
| `/enablement-dashboard` | Org-wide readiness evaluation |
| `/onboarding-plan` | New hire ramp curriculum with milestones |
| `/competitive-pulse` | Latest competitive landscape briefing |
| `/pipeline-digest` | Weekly pipeline health and risk analysis |
| `/content-audit` | Asset freshness scan with gap identification |
| `/rep-dashboard` | Personalized performance and development view |

### 4 Scheduled Automations

- **Weekly Competitive Pulse** — Scans for competitor moves
- **Weekly Pipeline Digest** — Pipeline health summary
- **Monthly Content Audit** — Flags stale enablement assets
- **Daily Deal Signals** — Surfaces deals needing attention

### 16 MCP Tools (Bundled Server)

The plugin ships with a TypeScript MCP server providing direct access to four platforms:

| Platform | Tools |
|---|---|
| **Gong** | search_calls, get_transcript, get_call_details, search_calls_by_participant, get_call_stats |
| **ZoomInfo** | search_company, search_contact, get_org_chart, get_tech_stack |
| **Clay** | enrich_person, enrich_company, trigger_enrichment |
| **LinkedIn** | search_leads, get_profile, search_companies |
| **Utility** | sales_intel_status |

## Integrations

Works standalone out of the box. Optionally connect any of these for richer context:

| Platform | What It Adds |
|---|---|
| HubSpot | Deal data, contact history, pipeline metrics |
| Slack | Team signals, deal room context |
| Notion | Playbooks, competitive docs, knowledge base |
| Microsoft 365 | Email threads, calendar context |
| Fireflies | Meeting transcripts and action items |
| Clay | Contact and company enrichment |
| ZoomInfo | Firmographic and technographic data |
| Atlassian | Project tracking, engineering context |
| Close | Pipeline and activity data |

See [CONNECTORS.md](CONNECTORS.md) for setup instructions.

## Configuration

Copy the settings template and customize:

```json
{
  "company_name": "Your Company",
  "product_name": "Your Product",
  "default_qualification_framework": "MEDDIC",
  "default_discovery_framework": "SPIN"
}
```

## Example Output

**Input:** `/deal-review Acme Corp`

**Output:**
```
Deal Health Score: 72/100

Strengths:
- Champion identified (VP Sales, strong internal advocate)
- Technical validation complete, positive eval feedback
- Timeline aligns with Q2 budget cycle

Risks:
- No access to economic buyer (CFO)
- Competitor (Rival Inc) in final evaluation
- Legal review not yet started — 3 week typical cycle

Recommended Next Steps:
1. Request champion intro to CFO before next meeting
2. Prepare Rival Inc battlecard (see /competitive-pulse)
3. Send ROI model tailored to their 340-rep team size

Confidence: Commit (if CFO access secured by Feb 28)
```

## Project Structure

```
sales-enablement-plugin/
├── skills/              # 18 skill modules
├── commands/            # 7 slash commands
├── shortcuts/           # 4 scheduled automations
├── mcp-server/          # TypeScript MCP server (16 tools)
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── docs/                # Additional documentation
├── .claude-plugin/      # Plugin configuration
├── CONNECTORS.md        # Integration setup guide
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE              # MIT
```

## License

MIT — see [LICENSE](LICENSE).
