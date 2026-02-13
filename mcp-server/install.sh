#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Sales Intelligence MCP Server — One-Click Installer
# ═══════════════════════════════════════════════════════════════
#
# Usage:  bash install.sh
#
# What this does:
#   1. Checks that Node.js is installed (v18+)
#   2. Copies the MCP server to a stable folder on your computer
#   3. Installs dependencies (npm install)
#   4. Finds your Claude Desktop config file automatically
#   5. Adds the MCP server entry to your config
#   6. Prompts you for API keys (optional — skip any you don't have)
#
# After running: restart Claude Desktop and you're good to go.
# ═══════════════════════════════════════════════════════════════

set -e

# ─── Colors ───────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

print_step() { echo -e "\n${BLUE}▸${NC} ${BOLD}$1${NC}"; }
print_ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
print_warn() { echo -e "  ${YELLOW}⚠${NC} $1"; }
print_err()  { echo -e "  ${RED}✗${NC} $1"; }

echo -e "${BOLD}"
echo "╔══════════════════════════════════════════════════╗"
echo "║   Sales Intelligence MCP Server — Installer     ║"
echo "╚══════════════════════════════════════════════════╝"
echo -e "${NC}"

# ─── Step 1: Check Node.js ────────────────────────────────────
print_step "Checking Node.js..."

if ! command -v node &> /dev/null; then
    print_err "Node.js is not installed."
    echo ""
    echo "  Install it from: https://nodejs.org (v18 or higher)"
    echo "  Or with Homebrew: brew install node"
    echo ""
    exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_err "Node.js v18+ required. You have v$(node -v)."
    echo "  Update at: https://nodejs.org"
    exit 1
fi

print_ok "Node.js $(node -v) detected"

# ─── Step 2: Determine install location ───────────────────────
print_step "Setting up install location..."

INSTALL_DIR="$HOME/sales-intelligence-mcp"

if [ -d "$INSTALL_DIR" ]; then
    print_warn "Existing installation found at $INSTALL_DIR"
    read -p "  Overwrite it? (y/N): " OVERWRITE
    if [[ "$OVERWRITE" =~ ^[Yy] ]]; then
        rm -rf "$INSTALL_DIR"
        print_ok "Removed old installation"
    else
        echo "  Keeping existing installation. Will update dependencies."
    fi
fi

# Copy files to stable location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ "$SCRIPT_DIR" != "$INSTALL_DIR" ]; then
    cp -r "$SCRIPT_DIR" "$INSTALL_DIR" 2>/dev/null || true
fi

print_ok "Installed to: $INSTALL_DIR"

# ─── Step 3: Install dependencies ─────────────────────────────
print_step "Installing dependencies..."

cd "$INSTALL_DIR"
npm install --silent 2>&1 | tail -1
print_ok "Dependencies installed"

# ─── Step 4: Build the server ─────────────────────────────────
print_step "Building the server..."

npm run build --silent 2>&1 | tail -1

if [ ! -f "$INSTALL_DIR/dist/index.js" ]; then
    print_err "Build failed — dist/index.js not found"
    exit 1
fi

print_ok "Server built successfully"

# ─── Step 5: Find Claude Desktop config ───────────────────────
print_step "Finding Claude Desktop config..."

# Check all known config locations
CONFIG_FILE=""
CONFIG_LOCATIONS=(
    "$HOME/Library/Application Support/Claude/claude_desktop_config.json"  # macOS
    "$HOME/.config/Claude/claude_desktop_config.json"                      # Linux
    "$APPDATA/Claude/claude_desktop_config.json"                           # Windows (Git Bash)
    "$HOME/AppData/Roaming/Claude/claude_desktop_config.json"              # Windows (alt)
)

for loc in "${CONFIG_LOCATIONS[@]}"; do
    if [ -f "$loc" ]; then
        CONFIG_FILE="$loc"
        break
    fi
done

# If not found, check if the directory exists (config might not be created yet)
if [ -z "$CONFIG_FILE" ]; then
    for loc in "${CONFIG_LOCATIONS[@]}"; do
        CONFIG_DIR="$(dirname "$loc")"
        if [ -d "$CONFIG_DIR" ]; then
            CONFIG_FILE="$loc"
            break
        fi
    done
fi

# Still not found — ask the user
if [ -z "$CONFIG_FILE" ]; then
    print_warn "Couldn't find Claude Desktop config automatically."
    echo ""
    echo "  Common locations:"
    echo "    macOS:   ~/Library/Application Support/Claude/claude_desktop_config.json"
    echo "    Linux:   ~/.config/Claude/claude_desktop_config.json"
    echo "    Windows: %APPDATA%\\Claude\\claude_desktop_config.json"
    echo ""
    read -p "  Enter the full path to your config file: " CONFIG_FILE
fi

if [ -z "$CONFIG_FILE" ]; then
    print_err "No config file path provided. Skipping config update."
    echo ""
    echo "  You'll need to manually add this to your Claude Desktop config:"
    echo ""
    echo '  "sales-intelligence": {'
    echo '    "command": "node",'
    echo "    \"args\": [\"$INSTALL_DIR/dist/index.js\"],"
    echo '    "env": { ... your API keys ... }'
    echo '  }'
    echo ""
    exit 0
fi

print_ok "Found config at: $CONFIG_FILE"

# ─── Step 6: Collect API keys ─────────────────────────────────
print_step "Configuring API keys (press Enter to skip any)..."

echo ""
echo "  You only need keys for the services you use."
echo "  Skip any you don't have — you can add them later."
echo ""

read -p "  Gong Access Key: " GONG_KEY
read -p "  Gong Access Key Secret: " GONG_SECRET
read -p "  ZoomInfo Client ID: " ZOOMINFO_ID
read -p "  ZoomInfo Private Key: " ZOOMINFO_KEY
read -p "  Clay API Key: " CLAY_KEY
read -p "  LinkedIn Access Token: " LINKEDIN_TOKEN

# ─── Step 7: Update Claude Desktop config ─────────────────────
print_step "Updating Claude Desktop config..."

# Create backup
if [ -f "$CONFIG_FILE" ]; then
    cp "$CONFIG_FILE" "${CONFIG_FILE}.backup"
    print_ok "Backed up existing config to ${CONFIG_FILE}.backup"
fi

# Build the new server entry
SERVER_PATH="$INSTALL_DIR/dist/index.js"

# Use node to safely merge JSON (handles existing config, formatting, etc.)
node -e "
const fs = require('fs');
const configPath = process.argv[1];
const serverPath = process.argv[2];

// Read existing config or create new
let config = {};
try {
    const raw = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(raw);
} catch {
    // File doesn't exist or is invalid — start fresh
}

// Ensure mcpServers exists
if (!config.mcpServers) config.mcpServers = {};

// Add our server entry
config.mcpServers['sales-intelligence'] = {
    command: 'node',
    args: [serverPath],
    env: {
        GONG_ACCESS_KEY: process.argv[3] || '',
        GONG_ACCESS_KEY_SECRET: process.argv[4] || '',
        ZOOMINFO_CLIENT_ID: process.argv[5] || '',
        ZOOMINFO_PRIVATE_KEY: process.argv[6] || '',
        CLAY_API_KEY: process.argv[7] || '',
        LINKEDIN_ACCESS_TOKEN: process.argv[8] || ''
    }
};

// Write back with clean formatting
fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
console.log('Config updated successfully');
" "$CONFIG_FILE" "$SERVER_PATH" "$GONG_KEY" "$GONG_SECRET" "$ZOOMINFO_ID" "$ZOOMINFO_KEY" "$CLAY_KEY" "$LINKEDIN_TOKEN"

print_ok "Config updated"

# ─── Step 8: Verify ───────────────────────────────────────────
print_step "Verifying installation..."

# Quick test — start the server and check output
VERIFY_OUTPUT=$(timeout 3 node "$INSTALL_DIR/dist/index.js" 2>&1 || true)

if echo "$VERIFY_OUTPUT" | grep -q "Sales Intelligence MCP server"; then
    print_ok "Server starts correctly"

    # Count configured services
    CONFIGURED=0
    echo "$VERIFY_OUTPUT" | grep -o "✓" | while read -r line; do CONFIGURED=$((CONFIGURED+1)); done

    # Show service status
    echo "$VERIFY_OUTPUT" | grep "Services:" | sed 's/^/  /'
else
    print_warn "Server may not have started correctly. Check the output above."
fi

# ─── Done ─────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}${BOLD}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}${BOLD}║            Installation Complete!                ║${NC}"
echo -e "${GREEN}${BOLD}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo "  Next steps:"
echo "    1. Restart Claude Desktop"
echo "    2. Look for 'sales-intelligence' in Settings → Connectors"
echo "    3. Try asking Claude: \"Check my sales intelligence status\""
echo ""
echo "  To add/change API keys later, edit:"
echo "    $CONFIG_FILE"
echo ""
echo "  Server installed at:"
echo "    $INSTALL_DIR"
echo ""
