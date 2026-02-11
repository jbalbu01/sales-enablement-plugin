---
description: Generate a structured new sales rep onboarding and ramp plan with milestones, training modules, and certification checkpoints
argument-hint: "<role: AE, SDR, SE, Manager>"
---

# /onboarding-plan

Create a comprehensive onboarding curriculum for new sales hires. Covers everything from day 1 through full ramp, with training modules, practice exercises, certification gates, and milestone targets.

## Usage

```
/onboarding-plan
```

Optionally specify the role: `/onboarding-plan AE` or `/onboarding-plan SDR`

---

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    ONBOARDING PLAN                                 │
├─────────────────────────────────────────────────────────────────┤
│  STANDALONE (always works)                                        │
│  ✓ Role-specific onboarding curriculum                           │
│  ✓ Week-by-week schedule with daily activities                   │
│  ✓ Training modules: product, process, skills, tools             │
│  ✓ Certification checkpoints and assessments                     │
│  ✓ Ramp targets and milestone expectations                       │
│  ✓ Manager coaching guide for the onboarding period              │
│  ✓ Self-assessment tools for the new hire                        │
├─────────────────────────────────────────────────────────────────┤
│  SUPERCHARGED (when you connect your tools)                      │
│  + Knowledge base: Link to existing training docs and wikis      │
│  + CRM: Set up dashboards and pipeline targets                   │
│  + Calendar: Schedule training sessions and check-ins            │
└─────────────────────────────────────────────────────────────────┘
```

---

## What I Need From You

1. **Role** — AE, SDR/BDR, Sales Engineer, Sales Manager
2. **Your product** — What you sell, complexity level, typical deal size
3. **Sales cycle** — Average length and key stages
4. **Expected ramp time** — How long until full productivity (30/60/90 days?)
5. **Existing resources** — What training content already exists?
6. **Team context** — Team size, who mentors new hires, available coaching time

---

## Output

```markdown
# Onboarding Plan: [Role] at [Company]

**Role:** [AE / SDR / SE / Manager]
**Ramp Period:** [X days/months]
**Prepared:** [Date]
**Manager:** [Name if provided]

---

## Ramp Milestones

| Milestone | Target Date | Criteria | Assessment |
|-----------|------------|----------|------------|
| Day 1-5 | Week 1 | Complete orientation, access all tools | Checklist |
| Day 30 | Month 1 | [Specific capability milestone] | [How assessed] |
| Day 60 | Month 2 | [Capability milestone] | [Assessment] |
| Day 90 | Month 3 | [Full productivity milestone] | [Assessment] |

**Full Ramp Definition:** [What "fully ramped" means in measurable terms — quota attainment %, pipeline generation, etc.]

---

## Week 1: Foundation

### Day 1 — Welcome & Setup
- [ ] Complete HR onboarding and tool access
- [ ] Meet manager, buddy/mentor, and team
- [ ] Access CRM, email, communication tools
- [ ] Read: Company overview and product positioning
- [ ] Read: Sales team handbook / norms

### Day 2 — Product Deep Dive
- [ ] Product overview training (what it does, who it's for)
- [ ] Watch 2 recorded demos
- [ ] Create your first test account / sandbox
- [ ] Read: [Playbook — Product section]

### Day 3 — Market & Customer
- [ ] ICP and buyer persona review
- [ ] Listen to 3 recorded customer calls
- [ ] Study: Top 3 customer case studies
- [ ] Read: [Playbook — ICP and Personas section]

### Day 4 — Sales Process & Methodology
- [ ] Sales process walkthrough (stages, activities, exit criteria)
- [ ] CRM training (how to log, update, forecast)
- [ ] Read: [Playbook — Sales Process section]
- [ ] Qualification framework training (MEDDIC/BANT)

### Day 5 — Competition & Positioning
- [ ] Competitive landscape overview
- [ ] Review top 3 battle cards
- [ ] Value proposition practice (elevator pitch)
- [ ] End-of-week check-in with manager

---

## Week 2: Skill Building

### Discovery
- [ ] Discovery framework training (SPIN methodology)
- [ ] Study discovery question bank
- [ ] Listen to 3 strong discovery calls
- [ ] Role-play: Discovery with manager or buddy
- [ ] Practice: Use the `discovery-guide` skill for call prep

### Objection Handling
- [ ] Study top 10 common objections and responses
- [ ] Role-play: Handle each objection with a partner
- [ ] Practice: Use the `objection-handling` skill in practice mode

### Demo / Presentation
- [ ] Watch 2 recorded demos
- [ ] Deliver first practice demo to manager
- [ ] Get feedback and iterate
- [ ] Deliver second practice demo

---

## Week 3-4: Supervised Practice

- [ ] Shadow 5+ live calls with experienced reps
- [ ] Take notes using the deal review framework
- [ ] Lead first discovery call (manager observes)
- [ ] Lead first demo (manager observes)
- [ ] Debrief each call using the `sales-coaching` skill
- [ ] Begin building personal pipeline
- [ ] First pipeline review with manager

### 30-Day Certification
- [ ] Deliver a full demo to a panel (manager + peers)
- [ ] Pass product knowledge quiz
- [ ] Complete objection handling role-play assessment
- [ ] Demonstrate CRM proficiency
- [ ] Hit: [30-day pipeline or activity target]

---

## Month 2: Building Momentum

### Week 5-6
- [ ] Running discovery independently (weekly call review)
- [ ] First proposal created (use `proposal-builder` skill)
- [ ] Building pipeline to [target]
- [ ] Advanced product training (edge cases, integrations)
- [ ] Negotiation basics training

### Week 7-8
- [ ] Managing 3+ active deals independently
- [ ] First competitive deal (use `battle-cards` skill)
- [ ] Building ROI analysis for a real prospect (use `roi-calculator`)
- [ ] Mid-ramp check-in with manager and skip-level

### 60-Day Checkpoint
- [ ] Active pipeline at [target amount]
- [ ] [X] deals at proposal stage or beyond
- [ ] Delivering demos without assistance
- [ ] Handling objections effectively (manager assessment)
- [ ] Using CRM properly (data quality check)

---

## Month 3: Full Ramp

### Week 9-12
- [ ] Full quota accountability begins
- [ ] Independent deal management with weekly check-ins
- [ ] Advanced skills: multi-threading, executive selling, negotiation
- [ ] Win/loss review on first closed/lost deals
- [ ] Peer coaching — help shadow newer hires

### 90-Day Certification
- [ ] Pipeline at [X]% of quota coverage
- [ ] [X] deals closed or in final negotiation
- [ ] Manager confidence rating: Ready for independence
- [ ] Complete self-assessment and development plan

---

## Manager Coaching Guide

### Weekly 1:1 Structure During Onboarding

| Time | Topic | Purpose |
|------|-------|---------|
| 5 min | Check-in | How are you feeling? What's confusing? |
| 15 min | Call review | Review one call together, specific feedback |
| 10 min | Pipeline review | Assess deal quality and next steps |
| 10 min | Skill focus | Practice one specific skill |
| 5 min | Action items | Clear next steps for both parties |

### Coaching Principles During Ramp
1. **More coaching, less telling** — Ask "what do you think?" before giving answers
2. **One thing at a time** — Don't overwhelm with feedback. Pick the highest-leverage skill to work on each week.
3. **Celebrate progress** — Acknowledge improvements, even small ones
4. **Normalize struggle** — Ramp is hard. Make it safe to make mistakes.

---

## Self-Assessment Tool

New hire self-assessment at 30/60/90 days:

| Skill | 1 (Struggling) | 2 (Learning) | 3 (Competent) | 4 (Confident) | 5 (Teaching Others) |
|-------|----------------|--------------|---------------|----------------|---------------------|
| Product knowledge | ○ | ○ | ○ | ○ | ○ |
| Discovery | ○ | ○ | ○ | ○ | ○ |
| Demo/presentation | ○ | ○ | ○ | ○ | ○ |
| Objection handling | ○ | ○ | ○ | ○ | ○ |
| Pipeline management | ○ | ○ | ○ | ○ | ○ |
| Competitive knowledge | ○ | ○ | ○ | ○ | ○ |
| CRM proficiency | ○ | ○ | ○ | ○ | ○ |
| Time management | ○ | ○ | ○ | ○ | ○ |
```

---

## Role Variants

I'll adjust the plan based on role:

- **AE:** Full sales cycle focus — discovery through close
- **SDR/BDR:** Outbound and qualification focus — prospecting, qualifying, handoff
- **SE:** Technical focus — demo mastery, technical discovery, POC management
- **Manager:** Leadership focus — coaching, pipeline management, hiring, team development
