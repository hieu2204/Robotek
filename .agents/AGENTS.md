# Project Rules & Agent Execution Guidelines

## 0. Mandatory Session Bootstrap — READ FIRST

For EVERY new agent session working in this repository:

1. Before analyzing, planning, editing, generating, refactoring, or fixing ANY frontend/UI code, the agent MUST read:

   `.agents/skills/figma-to-tailwind/SKILL.md`

2. This requirement applies to ANY task involving:

   * Figma
   * HTML
   * Tailwind CSS
   * CSS
   * responsive layout
   * typography
   * spacing
   * colors
   * components
   * sections
   * navigation/header/footer
   * visual fixes
   * UI refactoring
   * Tailwind cleanup
   * arbitrary values
   * design-system changes

3. The agent MUST NOT rely on memory from a previous conversation/session.

4. The agent MUST re-read the current `SKILL.md` from disk at the beginning of each new session because the skill may have been updated.

5. Reading only this `AGENTS.md` file is NOT sufficient for frontend/UI tasks.

6. The agent MUST NOT start modifying frontend/UI code until `SKILL.md` has been successfully read.

7. If `.agents/skills/figma-to-tailwind/SKILL.md` cannot be found or read:

   * STOP frontend/UI implementation.
   * Report that the required skill file could not be loaded.
   * Do NOT guess or reconstruct the rules from memory.

---

## 1. Source of Truth

For all Figma/frontend/UI implementation rules:

`.agents/skills/figma-to-tailwind/SKILL.md`

is the canonical project-level source of truth.

Do NOT duplicate or independently reinterpret its detailed rules inside this file.

If this file and `SKILL.md` contain overlapping frontend implementation instructions, follow the current `SKILL.md`.

The agent MUST enforce the complete skill, not only selected sections.

This includes, but is not limited to:

* Operation Mode detection
* Repository inspection
* Existing Component Discovery
* Reusability Inventory
* Figma inspection
* Design System Audit
* Shared Component Change Safety
* Spacing Reconciliation
* Arbitrary Value Budget
* Color Token Promotion
* Tailwind Utility Resolution Priority
* Component reuse / `@apply` strategy
* Responsive rules
* Final Tailwind Cleanup
* Technical QA
* Visual mismatch correction workflow

---


## Frontend Repository Architecture

These rules are repository-specific and apply in addition to
`.agents/skills/figma-to-tailwind/SKILL.md`.

### JavaScript

- `assets/js/main.js` is the shared frontend JavaScript entry point.
- New page interaction logic MUST be added to `main.js` unless the repository
  already contains a more appropriate existing module.
- Do NOT add inline `<script>` blocks to HTML pages.
- Do NOT duplicate Swiper, Fancybox, navigation, accordion, tab, modal, or
  other shared initialization logic between HTML pages.
- Before creating new JavaScript, search existing `main.js` and related JS files
  for an existing implementation.
- Page-specific behavior inside `main.js` MUST be safely guarded by DOM
  existence checks so it does not break other pages.

### CSS / Tailwind

- Use the existing Tailwind/CSS entry file discovered from the repository.
- Do NOT add inline `<style>` blocks for normal UI implementation.
- Shared/repeated semantic patterns belong in the existing `@layer components`.
- Project design tokens belong in the existing `@theme` definition.
- Do not create a second token/config location.

### Existing Architecture First

Before adding a new CSS or JavaScript file:

1. Search the existing repository.
2. Reuse the existing entry/module when appropriate.
3. Create a new file only when there is a clear architectural reason.

---

## 3. Mandatory Pre-Edit Gate

Before making ANY frontend/UI modification, complete this sequence:

```text
Read AGENTS.md
      ↓
Read .agents/skills/figma-to-tailwind/SKILL.md from disk
      ↓
Determine applicable Operation Mode
      ↓
Inspect relevant repository scope
      ↓
Apply required discovery/audit gates from SKILL.md
      ↓
Only then modify code
```

No frontend/UI edit is allowed before this gate is completed.

---

## 4. No Session Memory Assumption

Every new conversation/session must be treated as if the agent has no reliable memory of:

* previous SKILL.md contents;
* previous design-system decisions;
* previous Tailwind mappings;
* existing reusable components;
* previous Figma inspections.

Always inspect the current repository and current skill file again where required by `SKILL.md`.

Do not say:

> "I already know the skill"

or rely on rules remembered from another session.

The repository files on disk are the source of truth.

---

## 5. Task Scope Protection

When the user asks to fix/refactor a specific section or component:

* Follow the relevant correction/refactor workflow in `SKILL.md`.
* Do NOT automatically rebuild the entire page.
* Do NOT modify already-correct sections outside the requested scope.
* Inspect shared components before modifying them globally.
* Preserve existing visual output unless the task explicitly requests a visual change.

---

## 6. Tailwind Enforcement

The detailed Tailwind priority chain is defined in `SKILL.md` and MUST be followed.

In particular:

* Do not recreate existing semantic components inline.
* Do not default to arbitrary values.
* Do not translate Figma pixel values directly into `[...]` without first resolving project tokens and standard Tailwind utilities.
* Do not introduce ad-hoc CSS when an existing component, token, or standard Tailwind utility correctly solves the requirement.
* Preserve visual fidelity.

Do not maintain a second independent Tailwind mapping table in this file.

`SKILL.md` owns those rules.

---

## 7. Technical Verification

After frontend/UI modifications:

1. Execute the cleanup/QA steps required by `SKILL.md`.
2. Run:

```bash
npm run build
```

3. Resolve compilation/syntax errors introduced by the changes.
4. Report the build status.

---

## 8. Required Behavior for New Sessions

A request such as:

```text
Fix the About page timeline.
```

must implicitly be interpreted as:

```text
1. Read AGENTS.md.
2. Read .agents/skills/figma-to-tailwind/SKILL.md.
3. Determine the appropriate correction mode/workflow.
4. Inspect only the relevant code/Figma scope.
5. Apply the skill rules.
6. Make the requested fix.
7. Run Tailwind Cleanup + Technical QA.
8. Run npm run build.
```

The user does NOT need to explicitly say:

```text
Read SKILL.md first.
```

for every task.
