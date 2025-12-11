# Code Review: $ARGUMENTS

> Use `/code-review` to run this skill (avoids conflict with built-in `/review` command)

Perform a comprehensive code review of changed files with a consistent, visual report format.

## Step 1: Detect What to Review

First, determine what changes to review:

```bash
CURRENT_BRANCH=$(git branch --show-current)
```

**If on a feature branch (not `main`):**
- Review all changes between `main` and the current branch
- Use: `git diff main...HEAD` for the diff
- Use: `git diff main...HEAD --name-only` for changed files
- Use: `git log main..HEAD --oneline` for commit history

**If on `main`:**
- Review staged and unstaged changes in the working directory
- Use: `git diff` and `git diff --staged`
- Use: `git diff --name-only` and `git diff --staged --name-only`

**If arguments provided:**
- `/review --files src/Button` - Only review files matching the pattern
- `/review --no-verify` - Skip running tests and typecheck

## Step 2: Run Verification

Unless `--no-verify` is specified, run:

```bash
yarn test --passWithNoTests
yarn typecheck
```

Capture pass/fail status and any error details for the report.

## Step 3: Read and Analyze Changed Files

For each changed file:
1. Read the current file content
2. Review the diff to understand what changed
3. Analyze for issues in these categories:

| Category | Icon | What to Check |
|----------|------|---------------|
| Security | `🔒` | XSS, injection, unsafe patterns, hardcoded secrets, `dangerouslySetInnerHTML` |
| Bugs | `🐛` | Logic errors, null/undefined access, race conditions, infinite loops |
| TypeScript | `📘` | `any` usage, missing types, incorrect type assertions, type safety |
| Performance | `⚡` | Missing memoization, unnecessary renders, expensive operations in render |
| Accessibility | `♿` | Missing ARIA labels, keyboard navigation, focus management |
| Best Practices | `📝` | Project patterns (CVA, cn utility), naming conventions, error handling |
| Tests | `🧪` | Missing tests for new functionality, uncovered edge cases |

## Step 4: Classify Severity

**🔴 Critical (BLOCK)** - Must fix before merge:
- Security vulnerabilities
- Runtime errors or crashes
- Data loss potential
- Breaking changes without migration

**🟡 Warning (WARN)** - Should fix:
- Performance issues
- Missing error handling
- Accessibility problems
- TypeScript `any` usage
- Missing tests for new code

**🟢 Suggestion (OK)** - Nice to have:
- Code style improvements
- Minor refactoring opportunities
- Documentation improvements
- Magic numbers that could be constants

## Step 5: Generate Report

Output the report in this exact format:

```
═══════════════════════════════════════════════════════════════
                        CODE REVIEW REPORT
═══════════════════════════════════════════════════════════════

📊 SUMMARY
┌──────────────┬────────┬───────┐
│ Category     │ Status │ Count │
├──────────────┼────────┼───────┤
│ 🔴 Critical  │ BLOCK  │ X     │
│ 🟡 Warning   │ WARN   │ X     │
│ 🟢 Suggest   │ OK     │ X     │
│ 📁 Files     │ —      │ X     │
└──────────────┴────────┴───────┘

🔧 VERIFICATION
┌─────────────┬────────┬─────────────────────┐
│ Check       │ Result │ Details             │
├─────────────┼────────┼─────────────────────┤
│ Tests       │ ✅ PASS │ X passed            │
│ TypeCheck   │ ✅ PASS │ No errors           │
└─────────────┴────────┴─────────────────────┘

═══════════════════════════════════════════════════════════════
                          FINDINGS
═══════════════════════════════════════════════════════════════

🔴 CRITICAL ISSUES (must fix)
───────────────────────────────────────────────────────────────

┌─ #1 ─────────────────────────────────────────────────────────┐
│ [ICON] Category: Brief title                                 │
├──────────────────────────────────────────────────────────────┤
│ 📍 Location: path/to/file.tsx:LINE                          │
│                                                              │
│ ❌ Problem:                                                   │
│    Clear description of what's wrong                         │
│                                                              │
│ ✅ Fix:                                                       │
│    Specific actionable fix                                   │
└──────────────────────────────────────────────────────────────┘

🟡 WARNINGS (should fix)
───────────────────────────────────────────────────────────────

┌─ #1 ─────────────────────────────────────────────────────────┐
│ [ICON] Category: Brief title                                 │
├──────────────────────────────────────────────────────────────┤
│ 📍 Location: path/to/file.tsx:LINE                          │
│                                                              │
│ ⚠️ Issue:                                                     │
│    Description of the concern                                │
│                                                              │
│ 💡 Suggestion:                                                │
│    How to improve it                                         │
└──────────────────────────────────────────────────────────────┘

🟢 SUGGESTIONS (nice to have)
───────────────────────────────────────────────────────────────

┌─ #1 ─────────────────────────────────────────────────────────┐
│ [ICON] Category: Brief title                                 │
├──────────────────────────────────────────────────────────────┤
│ 📍 Location: path/to/file.tsx:LINE                          │
│                                                              │
│ 💡 Suggestion:                                                │
│    Optional improvement                                      │
└──────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════
                        FILES REVIEWED
═══════════════════════════════════════════════════════════════

┌────────────────────────────────────┬──────────┬─────────────┐
│ File                               │ Changes  │ Issues      │
├────────────────────────────────────┼──────────┼─────────────┤
│ path/to/file1.tsx                  │ +XX -XX  │ 🔴 X 🟡 X   │
│ path/to/file2.ts                   │ +XX -XX  │ —           │
└────────────────────────────────────┴──────────┴─────────────┘

═══════════════════════════════════════════════════════════════
                         END OF REVIEW
═══════════════════════════════════════════════════════════════
```

## Report Rules

1. **Always use the exact box-drawing format above** - consistency is key
2. **Order findings by severity** - Critical first, then Warnings, then Suggestions
3. **Within each severity, group by file** - makes it easy to address issues file by file
4. **Include line numbers** - use `file.tsx:123` format for easy navigation
5. **Be specific in fixes** - don't just say "fix this", explain how
6. **Skip empty sections** - if no Critical issues, don't show that section
7. **Count accurately** - summary counts must match actual findings

## Project-Specific Patterns to Enforce

For this base-joy component library:

1. **CVA Usage** - Components should use `cva()` for variants
2. **cn() Utility** - Always use `cn()` from `@base-joy/utils` for className merging
3. **forwardRef** - All components must use `React.forwardRef`
4. **Polymorphic as prop** - Components should support `as` prop for element type
5. **Type Imports** - Import types from `@base-joy/tokens`
6. **Test Coverage** - New components need tests following Kent C. Dodds methodology
7. **Accessibility** - Use jest-axe tests, include proper ARIA attributes

## Example: No Issues Found

If the code looks good:

```
═══════════════════════════════════════════════════════════════
                        CODE REVIEW REPORT
═══════════════════════════════════════════════════════════════

📊 SUMMARY
┌──────────────┬────────┬───────┐
│ Category     │ Status │ Count │
├──────────────┼────────┼───────┤
│ 🔴 Critical  │ —      │ 0     │
│ 🟡 Warning   │ —      │ 0     │
│ 🟢 Suggest   │ —      │ 0     │
│ 📁 Files     │ —      │ 3     │
└──────────────┴────────┴───────┘

🔧 VERIFICATION
┌─────────────┬────────┬─────────────────────┐
│ Check       │ Result │ Details             │
├─────────────┼────────┼─────────────────────┤
│ Tests       │ ✅ PASS │ 47 passed           │
│ TypeCheck   │ ✅ PASS │ No errors           │
└─────────────┴────────┴─────────────────────┘

═══════════════════════════════════════════════════════════════
                        FILES REVIEWED
═══════════════════════════════════════════════════════════════

┌────────────────────────────────────┬──────────┬─────────────┐
│ File                               │ Changes  │ Issues      │
├────────────────────────────────────┼──────────┼─────────────┤
│ libs/ui/core/src/Button/Button.tsx │ +89 -0   │ ✅           │
│ libs/ui/core/src/Button/index.ts   │ +3 -0    │ ✅           │
│ libs/ui/core/src/index.ts          │ +1 -0    │ ✅           │
└────────────────────────────────────┴──────────┴─────────────┘

✅ LGTM - No issues found. Code follows project patterns and best practices.

═══════════════════════════════════════════════════════════════
                         END OF REVIEW
═══════════════════════════════════════════════════════════════
```
