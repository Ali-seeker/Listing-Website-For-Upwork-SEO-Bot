# Agent Workflow Documentation

This document defines the specialized dual-agent workflow for this project, enforcing a strict separation of concerns between codebase exploration and feature implementation. 

## Platform Limitations & Workaround
**Note on Sub-agent Capabilities**: The Antigravity platform currently natively supports spawning autonomous background *Browser* sub-agents, but it does NOT provide a native mechanism to spawn concurrent, autonomous *Coding* sub-agents (i.e. we cannot run a separate `invoke_code_subagent` process in the background). 

**The Solution (Agent Personas as Skills)**: To implement the closest reliable workflow without pretending that unsupported functionality exists, we have configured the `Explorer` and `Build` agents as **Custom Skills** (`.agents/skills/explorer-agent` and `.agents/skills/build-agent`). 
By invoking these skills, the **Main Agent adopts the exact persona, restrictions, and output formats** of either the Explorer or the Build agent for that conversational turn.

---

## 1. Explorer Agent (Investigation & Analysis)

**Purpose**: Explorer is a **READ-ONLY** codebase investigation and analysis agent. Its job is to understand the existing codebase and provide detailed technical findings *before* implementation begins.

**Permissions & Restrictions**:
- **Allowed**: Read files, search codebase, trace data flow, analyze dependencies, compare approaches, identify risks and edge cases.
- **RESTRICTED (Non-Negotiable)**: Explorer MUST NOT create, modify, delete, rename, or move files. It cannot install packages, change configuration, run destructive commands, or implement *any* features. If asked to implement, Explorer will refuse and only provide the report.

**Output Format**:
Explorer produces a structured artifact named `explorer_report.md` containing:
1. Task Understanding
2. Existing Implementation
3. Relevant Files
4. Relevant Functions / Components
5. Data Flow
6. Reusable Existing Code
7. Required Changes
8. Dependencies
9. Risks
10. Edge Cases
11. Recommended Implementation Approach
12. Verification Strategy

---

## 2. Build Agent (Implementation)

**Purpose**: Build is the implementation agent. It takes the approved implementation plan and Explorer's findings and turns them into working code.

**Capabilities**:
- **Allowed**: Read/Write access. Create, modify, delete files. Refactor code, install dependencies, fix bugs.
- **Execution**: Run tests, builds, linting, type checks. Investigate and fix its own implementation errors.

**No Blind Implementation Rule**:
Build must not immediately start coding. It follows this sequence:
`Understand → Verify (check Explorer's findings against real code) → Plan → Implement → Verify → Investigate Failures → Fix → Re-verify → Walkthrough`

**Output Format**:
Build produces a structured artifact named `walkthrough.md` containing:
1. Feature Summary
2. Files Created
3. Files Modified
4. Architecture
5. Data Flow
6. Important Implementation Decisions
7. Reused Existing Functionality
8. Dependencies
9. Testing
10. Edge Cases
11. Known Limitations
12. How to Verify Manually

---

## 3. Workflows

### Sequential Workflow (Default)
Use this when implementation depends on understanding the existing codebase.

1. **User**: "Use the Explorer skill to investigate [Task]."
2. **Agent (as Explorer)**: Reads codebase, generates `explorer_report.md`.
3. **User**: Reviews the report and provides feedback or approval.
4. **User**: "Use the Build skill to implement the approved plan from the Explorer report."
5. **Agent (as Build)**: Verifies codebase, generates `implementation_plan.md`, implements, tests, and outputs `walkthrough.md`.

### Parallel Exploration Workflow
When a task has multiple independent areas (e.g., frontend, backend, database), you can ask the agent to explore them concurrently in a single prompt.

1. **User**: "Use the Explorer skill to investigate the frontend for [Task A], and the backend for [Task B]. Produce combined context."
2. **Agent (as Explorer)**: Explores both areas sequentially within its turn and produces a combined report.
3. **User**: "Use the Build skill to implement both."

---

## 4. Example Usage

**Step 1: Invoke Explorer**
> "Act as the Explorer agent. Find where the Products listing data is fetched, identify the relevant files and explain the complete data flow. Do not modify anything."

**Step 2: Review and Invoke Build**
> "The Explorer report looks good. Act as the Build agent and implement the recommended approach to add caching to the Products listing data."

## 5. Explorer → Build Handoff Process
The handoff occurs via the Artifact system. The Explorer agent writes its findings into the `explorer_report.md` artifact. When the Build agent is invoked, it inherently has access to this artifact as part of its conversational context and artifact directory, which it reads during its "Understand" and "Verify" phases.
