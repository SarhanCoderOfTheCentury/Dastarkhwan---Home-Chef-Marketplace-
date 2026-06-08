# Agent Orchestration Guide: DastarKhwan

Welcome, Agent! To ensure high-quality code, prevent context confusion, and minimize token consumption in this heavy workspace, you must adhere strictly to these orchestration rules.

---

## 📂 1. Context Files: When & When NOT to Use

To prevent high token consumption and context dilution, **never read all context files together**. Follow these strict rules:

### Context File Mapping
| File | When to Use (Read) | When to NOT Use (Do NOT Read) |
| :--- | :--- | :--- |
| **`context/progress-tracker.md`** | **Read first, every turn.** Check to find the active task. **Update last** before ending your turn. | Do not reference or read during code writing or styling. |
| **`context/screens.md`** | Read when implementing page layouts, form inputs, validation fields, or screen transition states. | Do not use for backend architecture or DB schema planning. |
| **`context/project-overview.md`** | Read when verifying feature scope, checking in-scope vs out-of-scope boundaries, or reviewing target customer/chef flows. | Do not use when styling components, writing CSS, or writing typescript files. |
| **`context/architecture.md`** | Read when designing database tables, writing RLS policies, configuring Supabase, or writing server-side logic. | Do not use when styling cards, editing markdown, or writing front-end mock assets. |
| **`context/ui-context.md`** | Read when configuring Tailwind theme variables, deciding layout gutters, setting typography scales, or defining components. | Do not use when writing RLS rules, database triggers, or API route handlers. |
| **`context/code-standards.md`** | Read when writing TypeScript definitions, organizing folder routes, standardizing async error boundaries, or writing hooks. | Do not use when design tokens or slide structures are the main focus. |
| **`context/ai-workflow-rules.md`** | Read when running the final verification checks (desktop/mobile layout test, build validation). | Do not read during functional code implementation. |

### General Rules for Context Files:
- **No Concatenation**: Never read multiple context files in a single turn unless they are directly dependent.
- **Selective Line Reading**: If you only need to check a specific detail (e.g. database schema for `orders`), use `view_file` with `StartLine` and `EndLine` instead of loading the entire document.

---

## 🛠️ 2. Developer Tools: When & When NOT to Use

Using the wrong tool or running commands inefficiently causes excessive API calls, slow response times, and token bloat.

### Tool Selection Matrix
| Tool | When to Use | When to NOT Use |
| :--- | :--- | :--- |
| **`view_file`** | To inspect specific lines of code, read configuration setups, or verify file contents. | Do not read massive files (>500 lines) fully; specify `StartLine` and `EndLine` ranges. |
| **`replace_file_content`** | To apply a single, contiguous block of edits to a file. | Do not use to create files. Do not use for multiple separate changes in a single file. |
| **`multi_replace_file_content`** | To apply multiple non-contiguous edits across a file in a single tool call. | Do not replace the entire file content; target specific lines to avoid token limits. |
| **`write_to_file`** | To create brand new files or completely overwrite small configuration files. | Do not use for editing large existing files (use replacement tools). |
| **`run_command`** | To run compilers (`npm run build`), spin up dev servers (`npm run dev`), install packages, or run tests. | **Never run `cd` commands** (use the `Cwd` parameter instead). Do not run interactive commands that require prompt input. |
| **`command_status`** | To monitor long-running background tasks (e.g. server starts or builds). | Do not call in rapid succession; wait at least 3-5 seconds between polls. |
| **`grep_search`** | To find exact string matches or references across the workspace (e.g., finding where a component is imported). | Do not query generic keywords (like `React` or `div`) that yield hundreds of results. |
| **`list_dir`** | To verify folder contents or inspect project structures. | Do not run on root directories containing thousands of files (e.g., `node_modules`). |
| **`search_web` / `read_url_content`** | To look up Next.js App Router syntax, Supabase client docs, or third-party package APIs. | Do not use to find local variables or files inside this workspace. |
| **`browser_subagent`** | To run E2E page checks, verify responsiveness at 375px width, and capture visual walkthroughs. | Do not use for verifying code logic, linting, or simple API status checks. |

---

## 🧩 3. Agent Skills: Which to Use & When

Skills extend your capabilities with ready-made instructions. Use them selectively based on the active layer of the application.

### Skill Directories (`.agents/skills/`)
1. **`supabase` & `supabase-postgres-best-practices`**:
   - **Use when**: Writing migrations, schema scripts, RLS policies, trigger functions, and Supabase client code.
   - **Do NOT use when**: Writing client component layouts, working with CSS, or designing slides.
2. **`next-best-practices`**:
   - **Use when**: Planning route paths (`src/app`), Server vs Client component placement, server actions, route handlers, or metadata definitions.
   - **Do NOT use when**: Editing raw DB tables or writing local utility helpers.
3. **`ui-ux-pro-max` & `ckm-ui-styling`**:
   - **Use when**: Implementing page interfaces from `screens.md`, configuring accessibility layers (touch targets, aria-labels), planning animations (150-300ms timing), and verifying dark/light theme tokens.
   - **Do NOT use when**: Modifying PostgreSQL functions or writing server-side auth hooks.
4. **`ckm-slides`**:
   - **Use when**: Structuring presentations, pitch decks, or slide assets.
   - **Do NOT use when**: Writing functional code, layouts, or database rules.
5. **`ckm-brand` & `ckm-banner-design`**:
   - **Use when**: Generating visual assets, brand icons, logo codes, or promotional graphics.
   - **Do NOT use when**: Modifying code architecture.

### General Skill Principles:
- **Check Before Load**: Do not read a skill’s `SKILL.md` if you are working on a simple bug fix, linting edit, or standard page assembly that doesn't involve design decision-making.
- **Reference by Name**: Mention the specific skill guidelines being applied in your change description to maintain transparency.
