# Sales Intelligence MCP Server

Gives Claude access to your sales tools — Gong, ZoomInfo, Clay, and LinkedIn — so you can research prospects, pull call transcripts, and enrich leads right from Claude.

## Quick Install (1 command)

Open Terminal and run:

```bash
bash /path/to/mcp-server/install.sh
```

**That's it.** The script will:
- Install the server to `~/sales-intelligence-mcp`
- Find your Claude Desktop config automatically
- Ask for your API keys (skip any you don't have)
- Add everything to Claude's config for you

Then just **restart Claude Desktop** and you're ready.

---

## Manual Setup (if you prefer)

### Step 1: Install & Build

```bash
cd /path/to/mcp-server
npm install
npm run build
```

### Step 2: Find Your Claude Config File

The config file is at:

| OS | Location |
|----|----------|
| **Mac** | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Linux** | `~/.config/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json` |

**Mac shortcut** — open it in TextEdit:
```bash
open -a TextEdit ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Step 3: Add to Config

Add `"sales-intelligence"` inside the `"mcpServers"` section. If you already have other servers (like Docker), just add it alongside them with a comma:

```json
{
  "mcpServers": {
    "YOUR_EXISTING_SERVER": { "..." : "..." },
    "sales-intelligence": {
      "command": "node",
      "args": ["/Users/YOURNAME/sales-intelligence-mcp/dist/index.js"],
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

**Important:** Replace `/Users/YOURNAME/` with your actual home folder path.

### Step 4: Add Your API Keys

Fill in the keys for whichever services you use. Leave the rest blank — they'll just show as "Not Configured" and you can add them later.

### Step 5: Restart Claude Desktop

Quit Claude completely and reopen it. Check Settings → Connectors — you should see "sales-intelligence" listed.

---

## Getting API Keys

| Service | Where to Get It |
|---------|----------------|
| **Gong** | Gong → Settings → Integrations → API → Create Access Key |
| **ZoomInfo** | ZoomInfo Developer Portal → Create App → Client ID + Private Key |
| **Clay** | Clay → Settings → API → Generate Key |
| **LinkedIn** | LinkedIn Developer Portal → Create App → OAuth 2.0 token (standard developer account works, no SNAP needed) |

---

## What You Can Do

Once connected, just ask Claude things like:

- *"Search for VPs of Engineering at SaaS companies in San Francisco"*
- *"Pull the transcript from my last call with Acme Corp"*
- *"Enrich this lead: jane@example.com"*
- *"What's the tech stack at Stripe?"*
- *"Check my sales intelligence status"* (to see which services are connected)

### All 16 Tools

| Service | Tool | What It Does |
|---------|------|-------------|
| Gong | `gong_search_calls` | Search calls by date range |
| Gong | `gong_get_transcript` | Get full call transcript |
| Gong | `gong_get_call_details` | Topics, trackers, action items |
| Gong | `gong_search_calls_by_participant` | Find calls by person |
| Gong | `gong_get_call_stats` | Call analytics & stats |
| ZoomInfo | `zoominfo_search_company` | Company firmographics |
| ZoomInfo | `zoominfo_search_contact` | Contact lookup |
| ZoomInfo | `zoominfo_get_org_chart` | Org chart for a company |
| ZoomInfo | `zoominfo_get_tech_stack` | Tech stack lookup |
| Clay | `clay_enrich_person` | Person enrichment |
| Clay | `clay_enrich_company` | Company enrichment |
| Clay | `clay_trigger_enrichment` | Webhook enrichment |
| LinkedIn | `linkedin_search_leads` | Search people on LinkedIn |
| LinkedIn | `linkedin_get_profile` | Get a LinkedIn profile |
| LinkedIn | `linkedin_search_companies` | Search companies on LinkedIn |
| Utility | `sales_intel_status` | Check which services are connected |

---

## Troubleshooting

**"Module not found" error?**
→ Run `cd ~/sales-intelligence-mcp && npm install` then restart Claude.

**Server doesn't show in Claude?**
→ Make sure the path in your config points to the actual `dist/index.js` file. Test it: `node ~/sales-intelligence-mcp/dist/index.js`

**LinkedIn returns 401?**
→ Your token may have expired. Generate a new one from the LinkedIn Developer Portal. Standard tokens (no SNAP) work fine.

**Services show ✗ in status?**
→ The API key for that service is missing or empty. Add it to your Claude config and restart.

**Config file not found?**
→ On Mac, open Terminal and run: `ls ~/Library/Application\ Support/Claude/`

## License

MIT
