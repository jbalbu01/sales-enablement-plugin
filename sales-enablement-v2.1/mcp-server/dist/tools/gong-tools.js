/**
 * Gong MCP Tools
 *
 * Tools for searching calls, pulling transcripts, getting call details,
 * and analyzing rep activity via the Gong API v2.
 */
import { z } from "zod";
import { gongPost } from "../services/gong-client.js";
import { handleApiError, truncateResponse } from "../services/error-handler.js";
import { CHARACTER_LIMIT, ResponseFormat } from "../constants.js";
// ─── Schemas ──────────────────────────────────────────────────
const SearchCallsSchema = z.object({
    from_date: z.string().describe("Start date in ISO 8601 format (e.g. '2024-01-01T00:00:00Z')"),
    to_date: z.string().describe("End date in ISO 8601 format (e.g. '2024-02-01T00:00:00Z')"),
    workspace_id: z.string().optional().describe("Optional Gong workspace ID to scope results"),
    cursor: z.string().optional().describe("Pagination cursor from a previous response"),
    response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
        .describe("Output format: 'markdown' or 'json'"),
}).strict();
const GetCallTranscriptSchema = z.object({
    call_id: z.string().describe("The Gong call ID to fetch the transcript for"),
    response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
        .describe("Output format: 'markdown' or 'json'"),
}).strict();
const GetCallDetailsSchema = z.object({
    call_id: z.string().describe("The Gong call ID to fetch details for"),
    response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
        .describe("Output format: 'markdown' or 'json'"),
}).strict();
const SearchCallsByParticipantSchema = z.object({
    email: z.string().email().describe("Email address of the participant to search for"),
    from_date: z.string().describe("Start date in ISO 8601 format"),
    to_date: z.string().describe("End date in ISO 8601 format"),
    response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
        .describe("Output format: 'markdown' or 'json'"),
}).strict();
const GetCallStatsSchema = z.object({
    from_date: z.string().describe("Start date in ISO 8601 format"),
    to_date: z.string().describe("End date in ISO 8601 format"),
    response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
        .describe("Output format: 'markdown' or 'json'"),
}).strict();
// ─── Helpers ──────────────────────────────────────────────────
function formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
}
function formatCallMarkdown(call) {
    const parties = (call.parties || [])
        .map((p) => `${p.name || "Unknown"} (${p.affiliation || "external"})${p.title ? ` — ${p.title}` : ""}`)
        .join(", ");
    return [
        `### ${call.title || "Untitled Call"}`,
        `- **ID**: ${call.id}`,
        `- **Date**: ${call.started}`,
        `- **Duration**: ${formatDuration(call.duration)}`,
        `- **Direction**: ${call.direction || "N/A"}`,
        `- **Participants**: ${parties || "N/A"}`,
        `- **URL**: ${call.url || "N/A"}`,
        "",
    ].join("\n");
}
// ─── Tool Registration ────────────────────────────────────────
export function registerGongTools(server) {
    // ── gong_search_calls ──
    server.registerTool("gong_search_calls", {
        title: "Search Gong Calls",
        description: `Search for recorded calls in Gong within a date range.

Returns a list of calls with metadata: title, date, duration, participants, and Gong URL.
Use this to find calls for a specific time period, then use gong_get_call_details or gong_get_transcript for deeper analysis.

Args:
  - from_date (string): Start date in ISO 8601 (e.g. '2024-01-01T00:00:00Z')
  - to_date (string): End date in ISO 8601 (e.g. '2024-02-01T00:00:00Z')
  - workspace_id (string, optional): Gong workspace ID to scope results
  - cursor (string, optional): Pagination cursor from previous response
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns: List of calls with title, date, duration, direction, participants, and URL.

Examples:
  - "Find all calls last week" -> from_date='2024-01-08T00:00:00Z', to_date='2024-01-15T00:00:00Z'
  - "Get recent demo calls" -> search calls then filter by title containing 'demo'`,
        inputSchema: SearchCallsSchema,
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
            idempotentHint: true,
            openWorldHint: true,
        },
    }, async (params) => {
        try {
            const body = {
                filter: {
                    fromDateTime: params.from_date,
                    toDateTime: params.to_date,
                    ...(params.workspace_id ? { workspaceId: params.workspace_id } : {}),
                },
                ...(params.cursor ? { cursor: params.cursor } : {}),
            };
            const data = await gongPost("/calls", body);
            const calls = data.calls || [];
            if (!calls.length) {
                return { content: [{ type: "text", text: "No calls found in the specified date range." }] };
            }
            if (params.response_format === ResponseFormat.JSON) {
                const output = {
                    total: data.records?.totalRecords || calls.length,
                    count: calls.length,
                    next_cursor: data.records?.cursor || null,
                    calls,
                };
                return { content: [{ type: "text", text: JSON.stringify(output, null, 2) }] };
            }
            const lines = [
                `# Gong Calls (${params.from_date} to ${params.to_date})`,
                `Found **${data.records?.totalRecords || calls.length}** calls.\n`,
                ...calls.map(formatCallMarkdown),
            ];
            if (data.records?.cursor) {
                lines.push(`\n---\n*More results available. Use cursor:* \`${data.records.cursor}\``);
            }
            const text = truncateResponse(lines.join("\n"), CHARACTER_LIMIT);
            return { content: [{ type: "text", text }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: handleApiError(error, "Gong") }], isError: true };
        }
    });
    // ── gong_get_transcript ──
    server.registerTool("gong_get_transcript", {
        title: "Get Gong Call Transcript",
        description: `Retrieve the full transcript of a specific Gong call.

Returns timestamped sentences with speaker identification. Use gong_search_calls first to find call IDs.

Args:
  - call_id (string): The Gong call ID
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns: Timestamped transcript with speaker labels.

Examples:
  - "Get the transcript for call 123456" -> call_id='123456'`,
        inputSchema: GetCallTranscriptSchema,
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
            idempotentHint: true,
            openWorldHint: true,
        },
    }, async (params) => {
        try {
            const data = await gongPost("/calls/transcript", { filter: { callIds: [params.call_id] } });
            const transcripts = data.callTranscripts || [];
            if (!transcripts.length || !transcripts[0].transcript?.length) {
                return { content: [{ type: "text", text: `No transcript available for call ${params.call_id}.` }] };
            }
            const sentences = transcripts[0].transcript;
            if (params.response_format === ResponseFormat.JSON) {
                return { content: [{ type: "text", text: JSON.stringify({ callId: params.call_id, sentences }, null, 2) }] };
            }
            const lines = [`# Transcript — Call ${params.call_id}\n`];
            let lastSpeaker = "";
            for (const s of sentences) {
                const speaker = s.speakerId || "Unknown";
                const timestamp = formatDuration(Math.floor(s.start / 1000));
                if (speaker !== lastSpeaker) {
                    lines.push(`\n**[${timestamp}] Speaker ${speaker}:**`);
                    lastSpeaker = speaker;
                }
                lines.push(s.text);
            }
            const text = truncateResponse(lines.join("\n"), CHARACTER_LIMIT);
            return { content: [{ type: "text", text }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: handleApiError(error, "Gong") }], isError: true };
        }
    });
    // ── gong_get_call_details ──
    server.registerTool("gong_get_call_details", {
        title: "Get Gong Call Details",
        description: `Get detailed analytics for a specific Gong call — topics discussed, trackers triggered, action items, talk ratios, and speaker stats.

Use gong_search_calls first to find call IDs.

Args:
  - call_id (string): The Gong call ID
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns: Call metadata, topics, trackers, action items, interaction stats, and speaker breakdown.

Examples:
  - "Analyze call 123456" -> call_id='123456'
  - "What topics were discussed in call 789?" -> call_id='789'`,
        inputSchema: GetCallDetailsSchema,
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
            idempotentHint: true,
            openWorldHint: true,
        },
    }, async (params) => {
        try {
            const data = await gongPost("/calls/extensive", {
                filter: { callIds: [params.call_id] },
                contentSelector: {
                    exposedFields: {
                        content: { topics: true, trackers: true, pointsOfInterest: true },
                        interaction: { interactionStats: true, speakers: true },
                    },
                },
            });
            const calls = data.calls || [];
            if (!calls.length) {
                return { content: [{ type: "text", text: `No details found for call ${params.call_id}.` }] };
            }
            const call = calls[0];
            if (params.response_format === ResponseFormat.JSON) {
                return { content: [{ type: "text", text: JSON.stringify(call, null, 2) }] };
            }
            const meta = call.metaData;
            const lines = [
                `# Call Details — ${meta?.title || params.call_id}`,
                `- **Date**: ${meta?.started || "N/A"}`,
                `- **Duration**: ${meta ? formatDuration(meta.duration) : "N/A"}`,
                "",
            ];
            // Topics
            const topics = call.content?.topics || [];
            if (topics.length) {
                lines.push("## Topics Discussed");
                for (const t of topics)
                    lines.push(`- **${t.name}** (${formatDuration(t.duration)})`);
                lines.push("");
            }
            // Trackers
            const trackers = call.content?.trackers || [];
            if (trackers.length) {
                lines.push("## Trackers Triggered");
                for (const t of trackers)
                    lines.push(`- **${t.name}**: ${t.count} occurrences`);
                lines.push("");
            }
            // Action Items
            const actionItems = call.content?.pointsOfInterest?.actionItems || [];
            if (actionItems.length) {
                lines.push("## Action Items");
                for (const a of actionItems)
                    lines.push(`- ${a.snippet} *(Speaker ${a.speakerId})*`);
                lines.push("");
            }
            // Speaker Stats
            const speakers = call.interaction?.speakers || [];
            if (speakers.length) {
                lines.push("## Speaker Breakdown");
                for (const s of speakers) {
                    lines.push(`- **Speaker ${s.id}**: ${formatDuration(s.talkTime)} talk time`);
                }
                lines.push("");
            }
            // Interaction Stats
            const stats = call.interaction?.interactionStats || [];
            if (stats.length) {
                lines.push("## Interaction Stats");
                for (const s of stats)
                    lines.push(`- **${s.name}**: ${s.value}`);
                lines.push("");
            }
            const text = truncateResponse(lines.join("\n"), CHARACTER_LIMIT);
            return { content: [{ type: "text", text }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: handleApiError(error, "Gong") }], isError: true };
        }
    });
    // ── gong_search_calls_by_participant ──
    server.registerTool("gong_search_calls_by_participant", {
        title: "Search Gong Calls by Participant",
        description: `Find Gong calls where a specific person participated, identified by their email address.

Useful for pulling a prospect's or rep's recent call history.

Args:
  - email (string): Email address of the participant
  - from_date (string): Start date in ISO 8601
  - to_date (string): End date in ISO 8601
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns: List of calls the participant was on.

Examples:
  - "Find calls with john@acme.com in January" -> email='john@acme.com', from_date='2024-01-01T00:00:00Z', to_date='2024-02-01T00:00:00Z'`,
        inputSchema: SearchCallsByParticipantSchema,
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
            idempotentHint: true,
            openWorldHint: true,
        },
    }, async (params) => {
        try {
            const body = {
                filter: {
                    fromDateTime: params.from_date,
                    toDateTime: params.to_date,
                    callParticipantsEmailAddresses: [params.email],
                },
            };
            const data = await gongPost("/calls", body);
            const calls = data.calls || [];
            if (!calls.length) {
                return {
                    content: [{ type: "text", text: `No calls found with participant ${params.email} in the specified date range.` }],
                };
            }
            if (params.response_format === ResponseFormat.JSON) {
                return { content: [{ type: "text", text: JSON.stringify({ total: calls.length, calls }, null, 2) }] };
            }
            const lines = [
                `# Calls with ${params.email}`,
                `Found **${calls.length}** calls.\n`,
                ...calls.map(formatCallMarkdown),
            ];
            return { content: [{ type: "text", text: truncateResponse(lines.join("\n"), CHARACTER_LIMIT) }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: handleApiError(error, "Gong") }], isError: true };
        }
    });
    // ── gong_get_call_stats ──
    server.registerTool("gong_get_call_stats", {
        title: "Get Gong Call Statistics",
        description: `Get aggregate call statistics for a date range — total calls, average duration, and call breakdown.

Useful for pipeline reviews and rep activity analysis.

Args:
  - from_date (string): Start date in ISO 8601
  - to_date (string): End date in ISO 8601
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns: Total calls, average duration, direction breakdown, and top participants.

Examples:
  - "How many calls did we have last month?" -> set appropriate from/to dates`,
        inputSchema: GetCallStatsSchema,
        annotations: {
            readOnlyHint: true,
            destructiveHint: false,
            idempotentHint: true,
            openWorldHint: true,
        },
    }, async (params) => {
        try {
            const data = await gongPost("/calls", {
                filter: { fromDateTime: params.from_date, toDateTime: params.to_date },
            });
            const calls = data.calls || [];
            const total = data.records?.totalRecords || calls.length;
            const totalDuration = calls.reduce((sum, c) => sum + (c.duration || 0), 0);
            const avgDuration = calls.length ? Math.round(totalDuration / calls.length) : 0;
            // Direction breakdown
            const directionCounts = {};
            for (const c of calls) {
                const d = c.direction || "unknown";
                directionCounts[d] = (directionCounts[d] || 0) + 1;
            }
            // Top participants by frequency
            const participantCounts = {};
            for (const c of calls) {
                for (const p of c.parties || []) {
                    if (p.emailAddress) {
                        participantCounts[p.emailAddress] = (participantCounts[p.emailAddress] || 0) + 1;
                    }
                }
            }
            const topParticipants = Object.entries(participantCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10);
            const output = {
                period: { from: params.from_date, to: params.to_date },
                totalCalls: total,
                callsInPage: calls.length,
                totalDurationSeconds: totalDuration,
                averageDurationSeconds: avgDuration,
                directionBreakdown: directionCounts,
                topParticipants: topParticipants.map(([email, count]) => ({ email, callCount: count })),
            };
            if (params.response_format === ResponseFormat.JSON) {
                return { content: [{ type: "text", text: JSON.stringify(output, null, 2) }] };
            }
            const lines = [
                "# Gong Call Statistics\n",
                `**Period**: ${params.from_date} to ${params.to_date}`,
                `**Total Calls**: ${total}`,
                `**Average Duration**: ${formatDuration(avgDuration)}`,
                `**Total Talk Time**: ${formatDuration(totalDuration)}\n`,
                "## Direction Breakdown",
                ...Object.entries(directionCounts).map(([dir, count]) => `- **${dir}**: ${count} calls`),
                "",
                "## Most Active Participants",
                ...topParticipants.map(([email, count], i) => `${i + 1}. **${email}** — ${count} calls`),
            ];
            return { content: [{ type: "text", text: lines.join("\n") }] };
        }
        catch (error) {
            return { content: [{ type: "text", text: handleApiError(error, "Gong") }], isError: true };
        }
    });
}
//# sourceMappingURL=gong-tools.js.map