# Sales Intelligence MCP Server

A unified MCP (Model Context Protocol) server that gives Claude access to four sales intelligence platforms through 16 tools:

| Service | Tools | What It Does |
|---------|-------|-------------|
| **Gong** | 5 | Search calls, pull transcripts, get call analytics, find calls by participant, aggregate stats |
| **ZoomInfo** | 4 | Search companies, search contacts, get org charts, get tech stacks |
| **Clay** | 3 | Enrich person data, enrich company data, trigger webhook-based enrichment tables |
| **LinkedIn Sales Navigator** | 3 | Search leads, get profiles, search companies |
| **Status** | 1 | Check which services are connected |

## Setup

### 1. Install Dependencies

```bash
npm install
npm run build
```

### 2. Configure API Keys

Set environment variables for the services you want to use. You only need keys for the services you plan to use — unconfigured services will return helpful setup messages.

```bash
# Gong (Basic Auth)
export GONG_ACCESS_KEY="your-access-key"
export GONG_ACCESS_KEY_SECRET="your-access-key-secret"

# ZoomInfo (JWT Auth)
export ZOOMINFO_CLIENT_ID="your-client-id"
export ZOOMINFO_PRIVATE_KEY="your-private-key"

# Clay (API Key)
export CLAY_API_KEY="your-api-key"

# LinkedIn Sales Navigator (OAuth Bearer Token — requires SNAP partnership)
export LINKEDIN_ACCESS_TOKEN="your-oauth-token"
```

### 3. Connect to Claude

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "sales-intelligence": {
      "command": "node",
      "args": ["/path/to/sales-intelligence-mcp-server/dist/index.js"],
      "env": {
        "GONG_ACCESS_KEY": "your-key",
        "GONG_ACCESS_KEY_SECRET": "your-secret",
        "ZOOMINFO_CLIENT_ID": "your-id",
        "ZOOMINFO_PRIVATE_KEY": "your-key",
        "CLAY_API_KEY": "your-key",
        "LINKEDIN_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

Or for Claude Code, add to `.mcp.json`:

```json
{
  "mcpServers": {
    "sales-intelligence": {
      "command": "node",
      "args": ["./sales-intelligence-mcp-server/dist/index.js"],
      "env": {
        "GONG_ACCESS_KEY": "",
        "GONG_ACCESS_KEY_SECRET": "",
        "ZOOMINFO_CLIENT_ID": "",
        "ZOOMINFO_PRIVATE_KEY": "",
        "CLAY_API_KEY": "",
        "LINKEDIN_ACCESS_TOKEN": ""
      }
    }
  }
}
```

## Tool Reference

### Gong Tools

| Tool | Description |
|------|-------------|
| `gong_search_calls` | Search calls by date range with pagination |
| `gong_get_transcript` | Get full timestamped transcript for a call |
| `gong_get_call_details` | Get topics, trackers, action items, speaker stats |
| `gong_search_calls_by_participant` | Find calls by participant email |
| `gong_get_call_stats` | Aggregate stats: total calls, avg duration, top participants |

### ZoomInfo Tools

| Tool | Description |
|------|-------------|
| `zoominfo_search_company` | Search by name, domain, industry, size, revenue |
| `zoominfo_search_contact` | Search by name, title, department, company, level |
| `zoominfo_get_org_chart` | Get reporting hierarchy for a company |
| `zoominfo_get_tech_stack` | Get technology stack for a company |

### Clay Tools

| Tool | Description |
|------|-------------|
| `clay_enrich_person` | Enrich person by email, LinkedIn URL, or name+company |
| `clay_enrich_company` | Enrich company by domain or name |
| `clay_trigger_enrichment` | Send data to a Clay webhook table for async enrichment |

### LinkedIn Sales Navigator Tools

| Tool | Description |
|------|-------------|
| `linkedin_search_leads` | Search leads by keywords, title, company, seniority, geo |
| `linkedin_get_profile` | Get detailed profile by URL or member ID |
| `linkedin_search_companies` | Search companies by name, industry, size, geo |

### Utility

| Tool | Description |
|------|-------------|
| `sales_intel_status` | Check which services are configured |

## Architecture

```
src/
├── index.ts              # Server entry point, registers all tools
├── constants.ts          # API URLs, limits, enums
├── types.ts              # TypeScript interfaces for all services
├── services/
│   ├── gong-client.ts    # Gong API client (Basic Auth)
│   ├── zoominfo-client.ts # ZoomInfo API client (JWT)
│   ├── clay-client.ts    # Clay API client (API Key + Webhooks)
│   └── error-handler.ts  # Shared error handling and truncation
└── tools/
    ├── gong-tools.ts     # 5 Gong tools
    ├── zoominfo-tools.ts # 4 ZoomInfo tools
    ├── clay-tools.ts     # 3 Clay tools
    └── linkedin-tools.ts # 3 LinkedIn tools
```

## Getting API Keys

| Service | How to Get Keys |
|---------|----------------|
| **Gong** | Settings → Integrations → API → Create Access Key |
| **ZoomInfo** | Developer Portal → Create App → Get Client ID + Private Key |
| **Clay** | Settings → API → Generate Key (Enterprise plan required for enrichment endpoints) |
| **LinkedIn** | Requires SNAP partnership — apply at LinkedIn Developer Portal |

## License

MIT
