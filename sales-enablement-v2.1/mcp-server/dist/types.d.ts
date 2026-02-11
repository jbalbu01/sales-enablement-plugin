/**
 * Shared TypeScript interfaces for the Sales Intelligence MCP server.
 */
export interface GongCall {
    id: string;
    title: string;
    started: string;
    duration: number;
    url: string;
    direction: string;
    scope: string;
    parties: GongParty[];
    media?: string;
}
export interface GongParty {
    id: string;
    emailAddress?: string;
    name?: string;
    title?: string;
    speakerId?: string;
    affiliation?: string;
    phoneNumber?: string;
}
export interface GongTranscriptSentence {
    start: number;
    end: number;
    text: string;
    speakerId?: string;
}
export interface GongTranscript {
    callId: string;
    transcript: GongTranscriptSentence[];
}
export interface GongCallDetails {
    metaData: GongCall;
    content?: {
        topics?: Array<{
            name: string;
            duration: number;
        }>;
        trackers?: Array<{
            name: string;
            count: number;
            occurrences: Array<{
                startTime: number;
            }>;
        }>;
        pointsOfInterest?: {
            actionItems?: Array<{
                snippet: string;
                speakerId: string;
            }>;
        };
    };
    interaction?: {
        interactionStats?: Array<{
            name: string;
            value: number;
        }>;
        speakers?: Array<{
            id: string;
            talkTime: number;
            userId?: string;
        }>;
    };
}
export interface GongUserActivity {
    userId: string;
    callsAsHost: number;
    callsAttended: number;
    callsGiven: number;
    callsReceived: number;
    callsScored: number;
}
export interface ZoomInfoCompany {
    id: number;
    name: string;
    website: string;
    industry: string;
    subIndustry?: string;
    employees: number;
    revenue: number;
    revenueRange?: string;
    city?: string;
    state?: string;
    country?: string;
    description?: string;
    foundedYear?: number;
    phone?: string;
    ticker?: string;
    techStack?: string[];
}
export interface ZoomInfoContact {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    directPhone?: string;
    mobilePhone?: string;
    jobTitle: string;
    managementLevel?: string;
    department?: string;
    companyId?: number;
    companyName?: string;
    linkedInUrl?: string;
    city?: string;
    state?: string;
    country?: string;
}
export interface ZoomInfoOrgChartEntry {
    contactId: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    directReports?: number;
    reportsTo?: number;
    department?: string;
    managementLevel?: string;
}
export interface ClayPersonEnrichment {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
    company?: string;
    companyDomain?: string;
    linkedInUrl?: string;
    location?: string;
    bio?: string;
}
export interface ClayCompanyEnrichment {
    name?: string;
    domain?: string;
    industry?: string;
    employeeCount?: number;
    revenue?: string;
    description?: string;
    foundedYear?: number;
    location?: string;
    techStack?: string[];
    fundingTotal?: string;
    lastFundingRound?: string;
}
export interface LinkedInProfile {
    firstName: string;
    lastName: string;
    headline?: string;
    location?: string;
    industry?: string;
    currentCompany?: string;
    currentTitle?: string;
    summary?: string;
    profileUrl?: string;
    connectionDegree?: number;
    experienceYears?: number;
}
export interface LinkedInCompany {
    name: string;
    industry?: string;
    employeeCount?: number;
    headquarters?: string;
    description?: string;
    website?: string;
    specialties?: string[];
    founded?: number;
}
export interface PaginatedResponse<T> {
    total: number;
    count: number;
    offset: number;
    items: T[];
    has_more: boolean;
    next_offset?: number;
}
//# sourceMappingURL=types.d.ts.map