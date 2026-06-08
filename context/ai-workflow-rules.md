# AI Workflow Rules: DastarKhwan

This document defines how any AI developer or coding assistant must operate within this repository. These are strict constraints, not optional guidelines.

## 1. Incremental, Spec-Driven Implementation

- **Read the Context First**: Before starting any task or making any change, read `AGENT.md` and review the context files.
- **One Unit at a Time**: Work on a single task unit from the progress tracker or spec checklist at a time. Do not begin work on Unit 2 until Unit 1 is completely implemented, verified, and checked off.
- **Stay in Your Lane**: Do not write speculative code or add files for features not listed in the current active unit. If you see code that could be refactored elsewhere, do not touch it unless it is explicitly part of the active task.

## 2. Requirement Clarification & Ambiguity

- **No Guessing**: If a user requirement, database field, UI placement, or system behavior is ambiguous, do not make assumptions. Stop and request clarification from the user, or draft an implementation design note.
- **Document Changes**: If you make architectural or schema decisions under user approval, update `context/architecture.md` or `context/project-overview.md` immediately before writing the functional code.

## 3. Preserving Documentation and Context

- **Keep Tracker Up-to-Date**: Update `context/progress-tracker.md` to reflect the active task state (mark as In Progress) when you start work, and mark as Completed once verified.
- **Preserve Existing Comments**: When editing files, preserve unrelated inline comments, docstrings, and HTML markup.

## 4. Verification Protocol

Before declaring any unit complete, execute and pass the following checklist:

1. **Syntax & Types**: Ensure there are no TypeScript compile errors and no runtime console errors.
2. **Responsive Checks**: Test component rendering at both desktop screen width and a mobile simulation (e.g. `375px` viewport width). Ensure all buttons and text fit cleanly.
3. **Build Status**: Run the project build command (`npm run build` or equivalent) and verify it completes without errors.
4. **Clean Code Audit**: Verify that no debugging statements (`console.log`, `debugger`, mock tests) are left in the source code.
