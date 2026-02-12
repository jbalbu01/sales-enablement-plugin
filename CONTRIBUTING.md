# Contributing

Thanks for your interest in contributing to the Sales Enablement Plugin for Claude.

## How to Contribute

### Reporting Issues

- Use [GitHub Issues](https://github.com/jbalbu01/sales-enablement-plugin/issues) to report bugs or suggest features
- Include steps to reproduce any bugs
- Describe what you expected vs. what happened

### Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test the plugin by uploading the zip to Claude Desktop or Cowork
5. Commit your changes (`git commit -m "Add your feature"`)
6. Push to your branch (`git push origin feature/your-feature`)
7. Open a Pull Request

### Skill Contributions

Each skill lives in `skills/<skill-name>/SKILL.md`. When adding or modifying a skill:

- Follow the existing SKILL.md structure
- Include clear trigger descriptions
- Test with real-world scenarios before submitting

### MCP Server Changes

The bundled MCP server is in `mcp-server/`. If you modify TypeScript source:

```bash
cd mcp-server
npm install
npm run build
```

Make sure to include both `src/` and updated `dist/` in your PR.

## Code of Conduct

Be respectful and constructive. We're all here to build better sales tools.
