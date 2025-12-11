# Base-Joy: Component Library Implementation Plan

## Project Overview

**Goal:** Build an open-source React component library (base-joy) using Base UI 1.0 + Tailwind, inspired by Joy UI's design patterns and shadcn/ui's component architecture, with 15 demo applications showcasing real-world usage.

**Tech Stack:**
- Base UI 1.0.0 (released Dec 11, 2025) - unstyled, accessible components
- TypeScript + React
- Tailwind CSS + Class Variance Authority (CVA)
- Nx monorepo
- Custom Nx generators for repeatability

**Key Decisions:**
- Both **Sheet** (Joy UI-inspired) and **Item** (shadcn-inspired) as foundational components
- ~30 essential components for v1
- Build open-source versions of complex components (DataGrid, DatePicker)
- 15 demo apps starting with Blog, Airbnb, Netflix
- Human-in-the-loop, incremental approach

---

## Foundational Component Architecture

### Two Base Components (Not One)

**Sheet** - Styled container with variant system (from Joy UI)
- Purpose: Visual styling foundation
- Props: `variant`, `color`, `size`, `as` (polymorphic)
- Variants: `solid`, `soft`, `outlined`, `plain`
- Colors: `primary`, `neutral`, `success`, `warning`, `danger`
- Used by: Card, Button, Badge, Alert, etc.

**Item** - Structured content component with slots (from shadcn/ui)
- Purpose: Content layout foundation
- Sub-components: ItemHeader, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemFooter, ItemMedia
- Use cases: Lists, notifications, settings pages, dashboards
- Can wrap with Sheet for styling

**Why both?**
- Sheet = styling/appearance system
- Item = content structure system
- Many components use both: `<Sheet><Item>...</Item></Sheet>`

---

## Component Strategy: Minimal First, Documented Roadmap

**Philosophy:** Start with the absolute minimum needed for Blog demo, then add components incrementally as demos demand them. Track everything via GitHub issues with clear prioritization.

### Minimal Set (Phase 1-2: Weeks 1-3)

**What we'll build first** - Just enough for Blog demo:

#### Foundation (2 components)
1. **Sheet** - Styled container with variants
2. **Item** - Structured content with slots

#### Essential Inputs (4 components)
3. **Button** - Actions (Base UI Button + Sheet styling)
4. **Input** - Text input (Base UI + Sheet)
5. **Textarea** - Multi-line input (for comment forms)
6. **Link** - Navigation links

#### Data Display (5 components)
7. **Card** - Content container (Sheet + structure)
8. **Avatar** - User image/initials
9. **Badge** - Status indicators (tags)
10. **Typography** - Headings, paragraphs, text
11. **Divider** - Visual separator

#### Layout (3 components)
12. **Container** - Max-width wrapper
13. **Stack** - Vertical/horizontal spacing
14. **Grid** - Grid layouts

**Total: 14 components** - enough to build Blog demo

### Component Roadmap (GitHub Issues)

All remaining components will be tracked as GitHub issues. Each component gets:
- Issue with component name as title
- Description with use case and Base UI mapping
- Priority label (P0-Critical, P1-High, P2-Medium, P3-Low)
- Category label (inputs, data-display, feedback, navigation, layout, complex)
- Demo label (which demo(s) need it)
- Milestone assignment

#### Priority 1 (P1) - Needed for Airbnb Demo
- **Select** - Dropdown selection (filters, location picker)
- **Checkbox** - Multi-select filters
- **Slider** - Price range selector
- **DatePicker** - Date range for bookings
- **Popover** - Filter panels
- **Modal/Dialog** - Photo lightbox
- **Skeleton** - Loading states

#### Priority 2 (P2) - Needed for Netflix Demo
- **Tabs** - Content categories
- **Menu/Dropdown** - User menu
- **Carousel** - Horizontal content rows
- **Switch** - Toggle settings
- **Progress** - Video progress bar
- **Toast** - Notifications

#### Priority 3 (P3) - Needed for Other Demos
- **Radio/RadioGroup** - Single selection forms
- **Table** - Basic data tables
- **Breadcrumbs** - Page hierarchy
- **Alert** - Important messages
- **Tooltip** - Hover help text
- **Accordion** - FAQ sections
- **AspectRatio** - Media containers

#### Priority 4 (P4) - Complex Components
- **DataGrid** - Sortable, filterable tables with pagination
- **CommandK** - Command palette (Cmd+K)
- **DateRangePicker** - Advanced date selection
- **RichTextEditor** - WYSIWYG editing
- **FileUpload** - Drag and drop upload
- **Chart** - Data visualization wrapper
- **TreeView** - Hierarchical data

#### Priority 5 (P5) - Advanced Patterns
- **InfiniteScroll** - Endless feeds
- **VirtualList** - Performance for long lists
- **DragAndDrop** - Sortable lists
- **MultiSelect** - Advanced selection
- **Combobox** - Autocomplete
- **ColorPicker** - Color selection
- **CodeBlock** - Syntax highlighting

---

## Testing & Code Quality Standards

### Testing Strategy: ~100% Coverage Goal

**Philosophy:** Every line of code should be tested. Tests are not optional - they're part of the definition of "done."

#### Test Coverage Requirements

**Component Tests (Unit):**
- ✅ **100% line coverage** (enforce with coverage thresholds)
- ✅ **100% branch coverage** (all conditional paths)
- ✅ **100% function coverage** (all functions called)
- ✅ All prop combinations tested
- ✅ All variant/color/size combinations tested
- ✅ Error states tested
- ✅ Loading states tested
- ✅ Empty states tested

**What to Test (Checklist):**
```typescript
// For EVERY component:
describe('ComponentName', () => {
  // 1. Rendering
  it('renders without crashing', () => { /* ... */ });
  it('renders children correctly', () => { /* ... */ });

  // 2. All variants
  it('renders solid variant', () => { /* ... */ });
  it('renders soft variant', () => { /* ... */ });
  it('renders outlined variant', () => { /* ... */ });
  it('renders plain variant', () => { /* ... */ });

  // 3. All colors
  it('renders primary color', () => { /* ... */ });
  it('renders neutral color', () => { /* ... */ });
  it('renders success color', () => { /* ... */ });
  it('renders warning color', () => { /* ... */ });
  it('renders danger color', () => { /* ... */ });

  // 4. All sizes
  it('renders sm size', () => { /* ... */ });
  it('renders md size', () => { /* ... */ });
  it('renders lg size', () => { /* ... */ });

  // 5. Polymorphic rendering
  it('renders as different element with as prop', () => { /* ... */ });

  // 6. Props
  it('applies custom className', () => { /* ... */ });
  it('forwards all HTML attributes', () => { /* ... */ });
  it('forwards ref', () => { /* ... */ });

  // 7. States
  it('handles disabled state', () => { /* ... */ });
  it('handles loading state', () => { /* ... */ });
  it('handles error state', () => { /* ... */ });

  // 8. Events
  it('calls onClick when clicked', () => { /* ... */ });
  it('calls onChange when value changes', () => { /* ... */ });

  // 9. Accessibility
  it('has correct ARIA attributes', () => { /* ... */ });
  it('supports keyboard navigation', () => { /* ... */ });
  it('announces changes to screen readers', () => { /* ... */ });

  // 10. Edge cases
  it('handles undefined/null props gracefully', () => { /* ... */ });
  it('handles very long text content', () => { /* ... */ });
  it('handles empty content', () => { /* ... */ });
});
```

**Testing Tools:**
- **Vitest** - Fast unit test runner
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - DOM matchers
- **@testing-library/user-event** - User interaction simulation
- **@axe-core/react** - Accessibility testing
- **vitest-axe** - Accessibility assertions

**Coverage Configuration:**

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.ts', // Re-exports only
      ],
      thresholds: {
        lines: 95,        // Aim for 100%, enforce 95%
        functions: 95,
        branches: 95,
        statements: 95,
      },
    },
  },
});
```

**Test File Structure:**

```
libs/ui/components/src/Button/
├── Button.tsx              # Component
├── Button.test.tsx         # Tests
├── Button.types.ts         # TypeScript types
└── index.ts                # Exports
```

**skill:code-review Checklist for Tests:**
- [ ] All test cases pass
- [ ] Coverage thresholds met (~100%)
- [ ] Tests are readable (good descriptions)
- [ ] No skipped tests (.skip)
- [ ] No focused tests (.only)
- [ ] Tests are deterministic (no flaky tests)
- [ ] Tests are fast (< 100ms per test ideally)
- [ ] Proper use of screen queries (getByRole > getByLabelText > getByText)
- [ ] User events used instead of fireEvent
- [ ] Accessibility tested

---

### Custom ESLint Rules

**Philosophy:** Enforce base-joy patterns automatically. If we notice a common mistake, create a lint rule for it.

#### Custom Rules to Create

**Rule 1: `base-joy/require-variant-props`**
- Ensures all styled components accept variant/color/size props
- Error if component uses Sheet/CVA but doesn't have these props

```typescript
// ❌ Bad - no variant props
interface ButtonProps {
  onClick: () => void;
}

// ✅ Good
interface ButtonProps extends BaseComponentProps {
  onClick: () => void;
}
```

**Rule 2: `base-joy/consistent-decorator-naming`**
- Enforces `startDecorator`/`endDecorator` naming
- Errors on `leftIcon`, `rightIcon`, `prefix`, `suffix`

```typescript
// ❌ Bad
<Button leftIcon={<Icon />}>Click</Button>

// ✅ Good
<Button startDecorator={<Icon />}>Click</Button>
```

**Rule 3: `base-joy/no-inline-styles`**
- Prevents inline style objects (use Tailwind classes instead)
- Allows `style` prop only for dynamic values

```typescript
// ❌ Bad
<div style={{ padding: '16px', color: 'red' }}>Content</div>

// ✅ Good
<div className="p-4 text-danger-600">Content</div>
```

**Rule 4: `base-joy/require-as-prop-types`**
- Ensures polymorphic components have proper TypeScript types
- Component props must extend from element type when `as` is used

**Rule 5: `base-joy/no-direct-dom-manipulation`**
- Prevents querySelector, getElementById, etc.
- Use refs instead

**Rule 6: `base-joy/require-aria-for-icons`**
- Icon-only buttons must have aria-label
- Ensures accessibility

```typescript
// ❌ Bad
<Button><IconPlus /></Button>

// ✅ Good
<Button aria-label="Add item"><IconPlus /></Button>
```

**Rule 7: `base-joy/prefer-composition`**
- Warns when prop API gets too complex (>10 props)
- Suggests using sub-components instead

**Rule 8: `base-joy/no-magic-values`**
- Spacing/sizing values must use design tokens
- No hardcoded pixel values

```typescript
// ❌ Bad
className="p-[13px]"

// ✅ Good
className="p-3.5" // Uses Tailwind scale
```

**Rule 9: `base-joy/consistent-event-handlers`**
- Event handlers must follow React naming (onClick, onChange, etc.)
- No custom names for standard events

**Rule 10: `base-joy/require-tests`**
- Every component file must have corresponding .test.tsx
- Enforced at commit time

**ESLint Config:**

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:@nx/react',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['base-joy'], // Our custom rules
  rules: {
    // Custom base-joy rules
    'base-joy/require-variant-props': 'error',
    'base-joy/consistent-decorator-naming': 'error',
    'base-joy/no-inline-styles': 'warn',
    'base-joy/require-as-prop-types': 'error',
    'base-joy/no-direct-dom-manipulation': 'error',
    'base-joy/require-aria-for-icons': 'error',
    'base-joy/prefer-composition': 'warn',
    'base-joy/no-magic-values': 'warn',
    'base-joy/consistent-event-handlers': 'error',
    'base-joy/require-tests': 'error',

    // Accessibility
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-role': 'error',

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
  },
};
```

**skill:lint-rule-creator Workflow:**
1. Identify common mistake in code review
2. Document the mistake and correct pattern
3. Create ESLint rule to catch it
4. Add to .eslintrc.js
5. Run on codebase, fix violations
6. Document in contributing guide

---

### Code Review Process (skill:code-review)

**When:** Before EVERY commit. The code-review skill runs automatically.

**What it checks:**

**1. Code Quality**
- [ ] No code smells (long functions, deep nesting, etc.)
- [ ] DRY principle followed (no duplication)
- [ ] SOLID principles followed
- [ ] Clear variable/function names
- [ ] Comments only where necessary (code should be self-documenting)
- [ ] No console.log statements (use debug tools)
- [ ] No commented-out code

**2. TypeScript**
- [ ] No `any` types
- [ ] All functions have return types
- [ ] Proper use of generics
- [ ] Union types over enums where appropriate
- [ ] Readonly where applicable

**3. React Best Practices**
- [ ] Proper use of hooks (no hooks in conditionals)
- [ ] Dependencies arrays correct
- [ ] No unnecessary re-renders
- [ ] Memoization used appropriately
- [ ] Key props on lists

**4. Accessibility**
- [ ] Semantic HTML used
- [ ] ARIA attributes correct
- [ ] Keyboard navigation works
- [ ] Focus management correct
- [ ] Color contrast sufficient

**5. Performance**
- [ ] No unnecessary renders
- [ ] Large lists virtualized if needed
- [ ] Images optimized
- [ ] Code splitting where appropriate

**6. Testing**
- [ ] All tests pass
- [ ] Coverage thresholds met
- [ ] Tests are meaningful (not just for coverage)
- [ ] Edge cases covered

**7. API Consistency**
- [ ] Follows BaseComponentProps pattern
- [ ] variant/color/size props if styled
- [ ] Polymorphic `as` prop if makes sense
- [ ] Consistent prop naming

**8. Documentation**
- [ ] Component documented in docs app
- [ ] JSDoc comments on public API
- [ ] README updated if needed
- [ ] Changelog entry if user-facing change

**Code Review Skill Output:**

```
✅ PASS: TypeScript compilation
✅ PASS: ESLint (0 errors, 0 warnings)
✅ PASS: Tests (54/54 passed)
✅ PASS: Coverage (100% lines, 100% branches)
✅ PASS: Accessibility (0 violations)
✅ PASS: API consistency
⚠️  WARN: Performance - Consider memoizing CardGrid
❌ FAIL: Documentation - Missing docs page for Badge component

Overall: 6/8 checks passed, 1 warning, 1 failure
Cannot commit until failures resolved.
```

**Git Hook Integration:**

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run code review skill
npx nx run-many --target=lint --all
npx nx run-many --target=test --all --coverage
npx nx run base-joy:code-review

# Prevent commit if skill fails
if [ $? -ne 0 ]; then
  echo "❌ Code review failed. Fix issues before committing."
  exit 1
fi
```

---

## Development Workflow & Skills Architecture

### Component Lifecycle: Design → Develop → Deploy → Release

**Philosophy:** Every component follows a standardized process with reusable "skills" that ensure consistency, quality, and accessibility.

#### Stage 1: Design

**What happens:**
- Component API designed
- Variants and props defined
- Accessibility requirements identified
- Base UI mapping decided
- Examples sketched

**Skills used:**
- `skill:api-design` - Ensures consistent variant/color/size API
- `skill:a11y-requirements` - Identifies ARIA requirements upfront
- `skill:base-ui-mapper` - Maps to appropriate Base UI primitives
- `skill:variant-designer` - Designs CVA variant combinations

**Outputs:**
- Component design doc (in GitHub issue)
- API proposal
- Accessibility checklist

**Validation:**
- API follows Sheet/Item patterns
- Accessibility requirements clear
- Base UI integration planned

---

#### Stage 2: Develop

**What happens:**
- Component implementation
- CVA variants coded
- TypeScript types written
- Unit tests created
- Accessibility tests added

**Skills used:**
- `skill:component-scaffold` - Generates component boilerplate
- `skill:cva-implementation` - Implements variant system
- `skill:typescript-types` - Generates proper TypeScript types
- `skill:base-ui-integration` - Integrates Base UI primitives
- `skill:a11y-testing` - Adds accessibility tests
- `skill:unit-testing` - Creates component tests
- `skill:storybook` (optional) - Creates stories

**Outputs:**
- Component implementation
- TypeScript types
- Tests passing
- Documented props

**Validation:**
- All tests pass
- ~100% code coverage achieved
- TypeScript types correct
- Accessibility tests pass
- Follows coding standards
- Code review skill approves changes
- Custom lint rules pass

---

#### Stage 3: Document

**What happens:**
- Component page created in docs app
- Examples written
- API reference generated
- Accessibility notes added

**Skills used:**
- `skill:docs-page-generator` - Scaffolds doc page
- `skill:example-generator` - Creates interactive examples
- `skill:api-reference-generator` - Generates API docs from types
- `skill:a11y-documenter` - Documents accessibility features

**Outputs:**
- Component documentation page
- Interactive examples
- API reference
- Accessibility guide

**Validation:**
- Docs are clear and complete
- Examples work
- Accessibility documented

---

#### Stage 4: Deploy (to demo)

**What happens:**
- Component used in demo app
- Real-world validation
- Edge cases discovered
- Refinements made

**Skills used:**
- `skill:demo-integrator` - Integrates component into demo
- `skill:edge-case-finder` - Identifies edge cases
- `skill:responsive-tester` - Tests responsive behavior
- `skill:cross-browser-tester` - Tests browser compatibility

**Outputs:**
- Component used in demo
- Edge cases handled
- Responsive design validated

**Validation:**
- Works in real demo context
- No visual regressions
- Responsive at all breakpoints

---

#### Stage 5: Release

**What happens:**
- Version bump
- Changelog updated
- GitHub release created
- npm package published (if applicable)

**Skills used:**
- `skill:version-bumper` - Semantic versioning
- `skill:changelog-generator` - Generates changelog
- `skill:release-publisher` - Publishes to GitHub/npm
- `skill:migration-guide` (if breaking) - Creates migration docs

**Outputs:**
- New version released
- Changelog entry
- GitHub release
- npm package (optional)

**Validation:**
- Version bumped correctly
- Changelog accurate
- Release notes complete

---

### Skills Catalog

**Component Development (20 skills)**
- `skill:api-design` - Design consistent component API
- `skill:variant-designer` - Design CVA variant system
- `skill:component-scaffold` - Generate component boilerplate
- `skill:cva-implementation` - Implement variant system
- `skill:typescript-types` - Generate TypeScript types
- `skill:base-ui-integration` - Integrate Base UI primitives
- `skill:props-validator` - Validate prop combinations
- `skill:polymorphic-component` - Implement `as` prop
- `skill:compound-components` - Create sub-components
- `skill:controlled-uncontrolled` - Support both modes
- `skill:ref-forwarding` - Forward refs properly
- `skill:event-handlers` - Implement event handling
- `skill:style-composition` - Compose styles with `cn()`
- `skill:theme-integration` - Integrate with theme system
- `skill:responsive-variants` - Responsive variant support
- `skill:animation-integration` - Add smooth animations
- `skill:performance-optimization` - Optimize renders
- `skill:error-boundaries` - Add error handling
- `skill:loading-states` - Handle loading states
- `skill:empty-states` - Handle empty states

**Testing & Quality (15 skills)**
- `skill:unit-testing` - Create unit tests
- `skill:integration-testing` - Test component integration
- `skill:visual-regression-testing` - Catch visual changes
- `skill:a11y-testing` - Accessibility testing (axe, etc.)
- `skill:keyboard-navigation-testing` - Test keyboard nav
- `skill:screen-reader-testing` - Test screen reader support
- `skill:responsive-testing` - Test all breakpoints
- `skill:cross-browser-testing` - Test browser compatibility
- `skill:edge-case-testing` - Test edge cases
- `skill:performance-testing` - Measure performance
- `skill:bundle-size-testing` - Monitor bundle size
- `skill:type-checking` - TypeScript type tests
- `skill:lint-checking` - ESLint/Prettier
- `skill:snapshot-testing` - Jest snapshots
- `skill:e2e-testing` - End-to-end tests

**Accessibility (10 skills)**
- `skill:a11y-requirements` - Define ARIA requirements
- `skill:aria-attributes` - Add ARIA attributes
- `skill:keyboard-navigation` - Implement keyboard nav
- `skill:focus-management` - Manage focus properly
- `skill:semantic-html` - Use semantic HTML
- `skill:color-contrast` - Ensure contrast ratios
- `skill:reduced-motion` - Support prefers-reduced-motion
- `skill:screen-reader-text` - Add SR-only text
- `skill:a11y-documenter` - Document a11y features
- `skill:wcag-validator` - Validate WCAG compliance

**Documentation (8 skills)**
- `skill:docs-page-generator` - Generate doc page
- `skill:example-generator` - Create examples
- `skill:api-reference-generator` - Generate API docs
- `skill:a11y-documenter` - Document accessibility
- `skill:migration-guide` - Create migration guides
- `skill:code-snippets` - Generate code snippets
- `skill:interactive-playground` - Add live playground
- `skill:search-indexer` - Index for search

**Build & Release (10 skills)**
- `skill:version-bumper` - Bump version (semver)
- `skill:changelog-generator` - Generate changelog
- `skill:release-publisher` - Publish release
- `skill:npm-publisher` - Publish to npm
- `skill:bundler` - Bundle for distribution
- `skill:treeshaking-optimizer` - Optimize treeshaking
- `skill:sourcemap-generator` - Generate sourcemaps
- `skill:typescript-declarations` - Generate .d.ts files
- `skill:license-checker` - Validate licenses
- `skill:security-scanner` - Scan for vulnerabilities

**Demo Apps (8 skills)**
- `skill:demo-app-generator` - Generate demo app
- `skill:demo-integrator` - Integrate component in demo
- `skill:mock-data-generator` - Generate mock data
- `skill:routing-setup` - Set up routing
- `skill:seo-optimizer` - Add SEO metadata
- `skill:analytics-integrator` - Add analytics
- `skill:deployment-config` - Configure deployment
- `skill:environment-setup` - Set up env vars

**Design System (12 skills)**
- `skill:design-token-creator` - Create design tokens
- `skill:theme-generator` - Generate themes
- `skill:color-palette-generator` - Generate color palettes
- `skill:typography-scale-generator` - Generate type scale
- `skill:spacing-scale-generator` - Generate spacing scale
- `skill:icon-optimizer` - Optimize SVG icons
- `skill:asset-optimizer` - Optimize images/assets
- `skill:figma-sync` - Sync with Figma
- `skill:css-variable-generator` - Generate CSS vars
- `skill:tailwind-plugin-creator` - Create Tailwind plugins
- `skill:design-lint` - Lint design consistency
- `skill:component-audit` - Audit component usage

**Developer Experience (10 skills)**
- `skill:generator-creator` - Create Nx generators
- `skill:cli-command-creator` - Create CLI commands
- `skill:vscode-snippet-creator` - Create VSCode snippets
- `skill:intellisense-optimizer` - Optimize autocomplete
- `skill:error-message-improver` - Better error messages
- `skill:debug-helper` - Add debug utilities
- `skill:dev-server-optimizer` - Optimize dev server
- `skill:hot-reload-optimizer` - Improve HMR
- `skill:git-hooks-setup` - Set up git hooks
- `skill:pr-template-creator` - Create PR templates

**Monitoring & Analytics (7 skills)**
- `skill:performance-monitor` - Monitor performance
- `skill:bundle-analyzer` - Analyze bundle
- `skill:dependency-auditor` - Audit dependencies
- `skill:usage-tracker` - Track component usage
- `skill:error-reporter` - Report errors
- `skill:metrics-dashboard` - Create metrics dashboard
- `skill:changelog-analyzer` - Analyze changelogs

**Total: ~100+ skills**

---

### Skill Composition & Stacking

**Example: Creating a new component (Button)**

1. **Design Phase**
   ```bash
   # Stack design skills
   skill:api-design → skill:variant-designer → skill:a11y-requirements → skill:base-ui-mapper
   ```

2. **Develop Phase**
   ```bash
   # Stack development skills
   skill:component-scaffold → skill:base-ui-integration → skill:cva-implementation →
   skill:typescript-types → skill:polymorphic-component → skill:ref-forwarding
   ```

3. **Test Phase**
   ```bash
   # Stack testing skills
   skill:unit-testing → skill:a11y-testing → skill:keyboard-navigation-testing →
   skill:responsive-testing
   ```

4. **Document Phase**
   ```bash
   # Stack documentation skills
   skill:docs-page-generator → skill:example-generator → skill:api-reference-generator →
   skill:a11y-documenter
   ```

5. **Deploy Phase**
   ```bash
   # Stack deployment skills
   skill:demo-integrator → skill:edge-case-finder → skill:responsive-tester
   ```

**Skills as Nx Generators:**

Each skill could be implemented as an Nx generator or script:

```bash
# tools/skills/api-design/
# tools/skills/component-scaffold/
# tools/skills/a11y-testing/
# etc.
```

**Skill Interface (Consistent API):**

```typescript
// Every skill follows this interface
interface Skill {
  name: string;
  description: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  dependencies?: string[]; // Other skills this depends on

  execute(context: SkillContext): Promise<SkillResult>;
  validate(context: SkillContext): Promise<boolean>;
}
```

**Skill Composition:**

```typescript
// Compose multiple skills into a workflow
const createComponentWorkflow = composeSkills([
  'api-design',
  'component-scaffold',
  'cva-implementation',
  'typescript-types',
  'unit-testing',
  'a11y-testing',
  'docs-page-generator',
]);

// Run the workflow
await createComponentWorkflow.run({
  componentName: 'Button',
  category: 'inputs',
  baseUI: 'Button',
});
```

---

## API Design Principles & Consistency

### Component API Standard

**Every component MUST follow this API:**

```typescript
// Base props that ALL components support
interface BaseComponentProps {
  // Styling variants (from Sheet)
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';

  // Polymorphic rendering
  as?: React.ElementType;

  // Standard HTML attributes
  className?: string;
  style?: React.CSSProperties;

  // Standard React props
  children?: React.ReactNode;
  ref?: React.Ref<any>;
}

// Component-specific props extend base props
interface ButtonProps extends BaseComponentProps {
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  startDecorator?: React.ReactNode;
  endDecorator?: React.ReactNode;
}
```

### API Consistency Rules

**Rule 1: Variant System**
- ALL styled components accept `variant`, `color`, `size`
- Values are ALWAYS the same across components
- Default: `variant="outlined"`, `color="neutral"`, `size="md"`

**Rule 2: Polymorphic `as` Prop**
- ALL components support rendering as different HTML elements
- Enables semantic HTML without wrapper components
- Example: `<Button as="a" href="/link">Link Button</Button>`

**Rule 3: Decorator Pattern**
- Components that can have icons/content before/after use `startDecorator`/`endDecorator`
- NOT `leftIcon`/`rightIcon` or `prefix`/`suffix`
- Consistent naming across all components

**Rule 4: Boolean Props**
- Use boolean props for states: `disabled`, `loading`, `selected`, `active`
- NOT string values like `disabled="true"`
- Always optional with sensible defaults

**Rule 5: Controlled & Uncontrolled**
- Support both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`)
- Detect mode automatically
- Never mix modes

**Rule 6: Event Handlers**
- Use standard React event names: `onClick`, `onChange`, `onFocus`, etc.
- Provide additional semantic handlers when useful: `onSelect`, `onOpen`, `onClose`
- All event handlers optional

**Rule 7: Accessibility Props**
- Accept all ARIA attributes via spread
- Provide helper props for common cases: `label`, `description`, `error`
- Generate ARIA attributes automatically when possible

**Rule 8: Composition**
- Prefer composition over configuration
- Sub-components over complex prop APIs
- Example: `Card.Header`, `Card.Content`, `Card.Footer` vs. `headerContent` prop

### API Documentation Standard

**Every component API must be documented with:**

1. **Type Definition** (auto-generated from TypeScript)
2. **Prop Table** with columns:
   - Name
   - Type
   - Default
   - Description
3. **Examples** showing common usage patterns
4. **Accessibility** notes for each prop

**Example API Documentation:**

```markdown
## Button API

### Props

| Prop           | Type                                                         | Default    | Description                          |
| -------------- | ------------------------------------------------------------ | ---------- | ------------------------------------ |
| variant        | 'solid' \| 'soft' \| 'outlined' \| 'plain'                   | 'outlined' | Visual style variant                 |
| color          | 'primary' \| 'neutral' \| 'success' \| 'warning' \| 'danger' | 'primary'  | Color theme                          |
| size           | 'sm' \| 'md' \| 'lg'                                         | 'md'       | Size variant                         |
| disabled       | boolean                                                      | false      | Disables the button                  |
| loading        | boolean                                                      | false      | Shows loading spinner                |
| fullWidth      | boolean                                                      | false      | Makes button full width              |
| startDecorator | ReactNode                                                    | -          | Content before children (icon, etc.) |
| endDecorator   | ReactNode                                                    | -          | Content after children (icon, etc.)  |
| as             | ElementType                                                  | 'button'   | Element to render as                 |

### Examples

#### Basic Button
\`\`\`tsx
<Button>Click me</Button>
\`\`\`

#### With Icon
\`\`\`tsx
<Button startDecorator={<IconPlus />}>Add Item</Button>
\`\`\`

#### As Link
\`\`\`tsx
<Button as="a" href="/profile">View Profile</Button>
\`\`\`

### Accessibility

- Uses `<button>` or `as` element semantically
- Supports `aria-label` for icon-only buttons
- Disabled state uses `aria-disabled` and prevents interaction
- Loading state announces to screen readers
```

### API Testing & Validation

**Skills for API consistency:**

`skill:api-validator` - Validates component API matches standards
- Checks all components have variant/color/size
- Validates prop naming conventions
- Ensures TypeScript types are correct
- Checks accessibility props

`skill:api-documenter` - Generates API documentation
- Auto-generates prop tables from TypeScript
- Creates examples from tests/stories
- Validates examples actually work

`skill:breaking-change-detector` - Detects API breaking changes
- Compares TypeScript types between versions
- Flags removed/renamed props
- Requires migration guide for breaking changes

---

## Nx Workspace Structure

```
base-joy/
├── apps/
│   ├── docs/                          # Custom docs site
│   ├── demo-blog/                     # Demo 1 (Week 5)
│   ├── demo-airbnb/                   # Demo 2 (Week 7-8)
│   ├── demo-netflix/                  # Demo 3 (Week 9-10)
│   └── demo-{12 more}/                # Demos 4-15 (Weeks 11-20)
│
├── libs/
│   ├── ui/
│   │   ├── core/                      # Sheet, Item, foundational
│   │   ├── components/                # 30 essential components
│   │   ├── complex/                   # DataGrid, DatePicker, etc.
│   │   └── patterns/                  # Composed patterns (CardGrid, CommandK)
│   │
│   ├── design-system/
│   │   ├── tokens/                    # Design tokens (colors, spacing, typography)
│   │   ├── themes/                    # Theme presets (light, dark)
│   │   └── utils/                     # CVA utilities, cn() helper
│   │
│   ├── shared/
│   │   ├── utils/                     # Shared utilities
│   │   ├── hooks/                     # Shared React hooks
│   │   └── types/                     # Shared TypeScript types
│   │
│   └── demo-shared/
│       ├── layouts/                   # Common layouts for demos
│       ├── data/                      # Mock data generators
│       └── assets/                    # Shared assets
│
├── tools/
│   └── generators/
│       ├── demo-app/                  # Generator: new demo app
│       ├── component/                 # Generator: new component
│       └── pattern/                   # Generator: new pattern
│
├── tailwind.config.js                 # Shared Tailwind config
├── tsconfig.base.json                 # TypeScript path mappings
└── nx.json                            # Nx configuration
```

**Library Dependency Flow:**
```
apps/* → libs/ui/* + libs/demo-shared/*
libs/ui/patterns → libs/ui/complex
libs/ui/complex → libs/ui/components
libs/ui/components → libs/ui/core
libs/ui/core → libs/design-system/*
```

---

## Implementation Phases

### Phase 1: Foundation Setup (Week 1)

**Goals:**
- Nx workspace created
- Tailwind + CVA configured
- Design tokens defined
- Sheet component working

**Tasks:**
1. Create Nx workspace:
   ```bash
   npx create-nx-workspace@latest base-joy \
     --preset=react-monorepo \
     --bundler=vite \
     --framework=react \
     --appName=docs \
     --style=css \
     --nxCloud=skip
   ```

2. Install dependencies:
   ```bash
   npm install @base-ui/react@^1.0.0
   npm install class-variance-authority clsx tailwind-merge
   npm install -D tailwindcss postcss autoprefixer
   ```

3. Configure Tailwind:
   ```bash
   npx tailwindcss init -p
   ```
   - Update `content` to scan all libs/apps
   - Define color palette (primary, neutral, success, warning, danger)
   - Define spacing scale, typography scale

4. Create library structure:
   ```bash
   nx g @nx/react:library core --directory=libs/ui/core --bundler=vite
   nx g @nx/react:library tokens --directory=libs/design-system/tokens --bundler=vite
   nx g @nx/react:library utils --directory=libs/design-system/utils --bundler=vite
   ```

5. Implement Sheet component:
   - Create `libs/ui/core/src/Sheet/Sheet.tsx`
   - Use CVA for variant management
   - Support all variant/color/size combinations
   - Polymorphic `as` prop

6. Implement Item component:
   - Create `libs/ui/core/src/Item/` directory
   - Main Item component + sub-components (ItemHeader, ItemContent, etc.)
   - Composable slot-based architecture

**Validation:**
- Can render Sheet with all variant combinations
- Can render Item with all sub-components
- Tailwind classes apply correctly
- TypeScript types working

**Critical Files Created:**
- `/Users/stevo/src/base-joy/libs/ui/core/src/Sheet/Sheet.tsx`
- `/Users/stevo/src/base-joy/libs/ui/core/src/Item/Item.tsx`
- `/Users/stevo/src/base-joy/libs/design-system/tokens/src/colors.ts`
- `/Users/stevo/src/base-joy/libs/design-system/utils/src/cn.ts`
- `/Users/stevo/src/base-joy/tailwind.config.js`

---

### Phase 2: Minimal Component Set (Week 2-3)

**Goals:**
- 14 minimal components built (just enough for Blog demo)
- Base UI integration patterns established
- Component docs started
- GitHub issue system set up

**Components (from minimal set):**
1. Button (Base UI + Sheet)
2. Input (Base UI + Sheet)
3. Textarea
4. Link
5. Card (Sheet + structure)
6. Avatar
7. Badge (Sheet-based)
8. Typography (Heading, Text, Link components)
9. Divider
10. Container
11. Stack
12. Grid

**Implementation Pattern (Example: Button):**
```typescript
// libs/ui/components/src/Button/Button.tsx
import { Button as BaseButton } from '@base-ui/react';
import { cva } from 'class-variance-authority';
import { cn } from '@base-joy/design-system/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        solid: 'shadow-sm',
        soft: '',
        outlined: 'border',
        plain: '',
      },
      color: {
        primary: '',
        neutral: '',
        // ... compound variants for color + variant
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-primary-600 text-white hover:bg-primary-700',
      },
      // ... more combinations
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
    },
  }
);

export const Button = ({ variant, color, size, className, ...props }) => {
  return (
    <BaseButton
      className={cn(buttonVariants({ variant, color, size }), className)}
      {...props}
    />
  );
};
```

**Each component needs:**
- Component file with CVA variants
- TypeScript types
- Export from `libs/ui/components/src/index.ts`
- Basic documentation page in docs app

**Validation:**
- All inputs accept variant/color/size props consistently
- Base UI accessibility features work
- Components compose together
- Form example works in docs app

---

### Phase 3: GitHub Issue System Setup (Week 3)

**Goals:**
- Set up GitHub repository
- Create issue templates
- Generate issues for all roadmap components
- Set up labels, milestones, projects

**GitHub Repository Structure:**

```
base-joy/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── component.md          # Template for new components
│   │   ├── pattern.md            # Template for composed patterns
│   │   ├── demo-app.md           # Template for demo apps
│   │   └── bug.md                # Bug report template
│   └── workflows/
│       └── ci.yml                # CI/CD pipeline
```

**Issue Template: Component**

```markdown
---
name: Component Request
about: Request a new component for base-joy
labels: component, needs-triage
---

## Component Name
[e.g., DatePicker, DataGrid, Carousel]

## Category
- [ ] Foundation
- [ ] Inputs
- [ ] Data Display
- [ ] Feedback
- [ ] Navigation
- [ ] Layout
- [ ] Complex

## Priority
- [ ] P0 - Critical (blocks demo)
- [ ] P1 - High (needed soon)
- [ ] P2 - Medium (nice to have)
- [ ] P3 - Low (future)

## Related Demo(s)
Which demo app(s) need this component?
- [ ] Blog
- [ ] Airbnb
- [ ] Netflix
- [ ] YouTube
- [ ] Amazon
- [ ] Other: _______

## Description
What does this component do? What problem does it solve?

## Base UI Mapping
Which Base UI component(s) does this wrap (if any)?
- [ ] None (custom component)
- [ ] Base UI: _______

## Reference Implementations
Links to similar components in other libraries:
- Joy UI: [link]
- shadcn/ui: [link]
- Material UI: [link]
- MUI X: [link]

## API Design (rough)
```tsx
<ComponentName
  variant="solid" | "soft" | "outlined" | "plain"
  color="primary" | "neutral" | "success" | "warning" | "danger"
  size="sm" | "md" | "lg"
  // component-specific props
/>
```

## Acceptance Criteria
- [ ] Component follows Sheet/Item patterns
- [ ] CVA variants implemented
- [ ] TypeScript types complete
- [ ] Accessible (WAI-ARIA compliant)
- [ ] Documented in docs app
- [ ] Used in at least one demo
```

**GitHub Labels:**

**Category Labels:**
- `foundation` (Sheet, Item)
- `inputs` (Button, Input, Select, etc.)
- `data-display` (Card, Avatar, Badge, etc.)
- `feedback` (Alert, Toast, Progress, etc.)
- `navigation` (Link, Menu, Breadcrumbs, etc.)
- `layout` (Container, Stack, Grid, etc.)
- `complex` (DataGrid, DatePicker, Carousel, etc.)
- `pattern` (Composed patterns like CardGrid, CommandK)
- `demo-app` (Demo application issues)

**Priority Labels:**
- `P0-critical` (Red) - Blocks current demo
- `P1-high` (Orange) - Needed for next demo
- `P2-medium` (Yellow) - Nice to have
- `P3-low` (Green) - Future consideration

**Status Labels:**
- `needs-triage` - Not yet reviewed
- `ready` - Approved, ready to work on
- `in-progress` - Currently being worked on
- `blocked` - Blocked by other work
- `needs-review` - Ready for PR review

**Demo Labels:**
- `demo:blog`
- `demo:airbnb`
- `demo:netflix`
- `demo:youtube`
- `demo:amazon`
- etc.

**GitHub Milestones:**

1. **v0.1 - Foundation** (Weeks 1-3)
   - Sheet, Item
   - 14 minimal components
   - Blog demo

2. **v0.2 - Airbnb Demo** (Weeks 7-8)
   - P1 components (Select, DatePicker, etc.)
   - Airbnb demo complete

3. **v0.3 - Netflix Demo** (Weeks 9-10)
   - P2 components (Carousel, Tabs, etc.)
   - Netflix demo complete

4. **v0.4 - Complex Components** (Weeks 11-15)
   - DataGrid, CommandK, Charts
   - 3-4 more demos

5. **v1.0 - Complete Library** (Week 20)
   - All 15 demos
   - 45-50 components
   - Documentation complete

**GitHub Project Board:**

Use GitHub Projects (Kanban style) with columns:
- **Backlog** - All component issues
- **Next Up** - Prioritized for upcoming work
- **In Progress** - Currently being built
- **Review** - PR open, needs review
- **Done** - Merged and documented

**Automated Issue Creation:**

Create a script to generate all component issues:

```bash
# tools/scripts/generate-component-issues.sh

# P1 Components (Airbnb)
gh issue create --title "Component: Select" --label "component,inputs,P1-high,demo:airbnb" --body-file .github/issues/select.md

gh issue create --title "Component: Checkbox" --label "component,inputs,P1-high,demo:airbnb" --body-file .github/issues/checkbox.md

# ... etc for all components
```

**Validation:**
- GitHub repo created
- All component issues created (~40 issues)
- Labels and milestones set up
- Project board organized
- Ready to pull from backlog as demos need components

---

### Phase 4: Component Documentation (Week 4)

**Goals:**
- Document all 14 minimal components in docs app
- Create component showcase pages
- Establish documentation patterns

**Documentation Structure:**

```
apps/docs/src/
├── pages/
│   ├── components/
│   │   ├── foundation/
│   │   │   ├── sheet.tsx
│   │   │   └── item.tsx
│   │   ├── inputs/
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── link.tsx
│   │   ├── data-display/
│   │   │   ├── card.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── typography.tsx
│   │   │   └── divider.tsx
│   │   └── layout/
│   │       ├── container.tsx
│   │       ├── stack.tsx
│   │       └── grid.tsx
│   └── roadmap.tsx             # Links to GitHub issues
```

**Component Doc Page Template:**

Each component gets a page with:
1. **Overview** - What it does, when to use it
2. **Examples** - Interactive examples with code
3. **API Reference** - Props, variants, types
4. **Accessibility** - ARIA attributes, keyboard nav
5. **Related Components** - Links to similar components

**Roadmap Page:**

The docs app should have a Roadmap page that:
- Shows all components planned (from GitHub issues)
- Links to GitHub issues for each
- Shows priority and category
- Allows filtering by demo, priority, category

**Validation:**
- Every minimal component has documentation
- Examples are interactive and copyable
- Roadmap page syncs with GitHub issues
- Docs app looks professional

---

### Phase 5: First Demo App - Blog (Week 5)

**Goals:**
- Validate component library in real-world use
- Identify missing components/patterns
- Establish demo app structure template

**Why Blog First?**
- Simpler than Airbnb/Netflix
- Text-focused validates typography
- Fewer complex interactions
- Fast to build (~3-5 days)

**Pages:**
1. Homepage - grid of article cards
2. Article detail - long-form content with typography
3. Category page - filtered articles
4. Author profile - author info + article list

**Components Used:**
- Typography (Heading, Text, Link)
- Card (article previews)
- Button
- Avatar (author)
- Badge (tags)
- Container, Stack, Grid (layout)
- List (related articles)
- Menu (navigation)

**New Components Discovered:**
- ArticleCard (pattern) - composed from Card + Typography + Avatar + Badge
- Navigation (pattern) - composed from Menu + Link
- Footer (pattern)

**Implementation:**
```bash
# Create app
nx g @nx/react:app demo-blog --directory=apps --bundler=vite

# Structure
apps/demo-blog/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ArticlePage.tsx
│   │   │   ├── CategoryPage.tsx
│   │   │   └── AuthorPage.tsx
│   │   ├── components/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Footer.tsx
│   │   └── App.tsx
│   └── main.tsx
```

**Validation:**
- Blog looks professional
- No one-off custom styles needed
- Components are reusable
- Can identify patterns for generators

**Critical Files:**
- `/Users/stevo/src/base-joy/apps/demo-blog/src/app/components/ArticleCard.tsx`
- `/Users/stevo/src/base-joy/apps/demo-blog/src/app/pages/HomePage.tsx`

---

### Phase 6: Nx Generators (Week 6)

**Goals:**
- Codify patterns learned from Blog demo
- Make creating new apps/components fast
- Enable repeatability for remaining 14 demos

**Generators to Build:**

#### 1. Demo App Generator
```bash
nx g workspace-generator:demo-app demo-name
```

**What it generates:**
- App structure (pages/, components/, App.tsx)
- Tailwind config
- Navigation component template
- Footer component template
- Example homepage
- Mock data setup
- Routing scaffold (React Router)

**Implementation:**
```bash
# Create generator
nx g @nx/plugin:generator demo-app

# Location: tools/generators/demo-app/
```

#### 2. Component Generator
```bash
nx g workspace-generator:component ComponentName --lib=components
```

**What it generates:**
- Component file with CVA variants boilerplate
- TypeScript types
- Export from library index
- Optional: test file, story file

**Template:**
```typescript
// tools/generators/component/files/__name__/__name__.tsx.template
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@base-joy/design-system/utils';

const <%= name.toLowerCase() %>Variants = cva(
  // base styles
  '',
  {
    variants: {
      variant: {
        solid: '',
        soft: '',
        outlined: '',
        plain: '',
      },
      color: {
        primary: '',
        neutral: '',
        success: '',
        warning: '',
        danger: '',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      color: 'neutral',
      size: 'md',
    },
  }
);

export interface <%= name %>Props
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof <%= name.toLowerCase() %>Variants> {}

export const <%= name %> = ({
  variant,
  color,
  size,
  className,
  ...props
}: <%= name %>Props) => {
  return (
    <div
      className={cn(<%= name.toLowerCase() %>Variants({ variant, color, size }), className)}
      {...props}
    />
  );
};
```

#### 3. Pattern Generator
```bash
nx g workspace-generator:pattern PatternName
```

**What it generates:**
- Pattern component (composition of multiple components)
- Example usage file
- Documentation template

**Validation:**
- Can scaffold demo-test app in < 5 minutes
- Can create new TestComponent in < 2 minutes
- Generated code follows established patterns
- No manual file creation needed

**Critical Files:**
- `/Users/stevo/src/base-joy/tools/generators/demo-app/index.ts`
- `/Users/stevo/src/base-joy/tools/generators/component/index.ts`

---

### Phase 7: Second Demo - Airbnb (Week 7-8)

**Goals:**
- Test generators
- Build complex components (DatePicker, CardGrid)
- Validate component completeness

**Why Airbnb Second?**
- Tests generators with complex use case
- Drives need for advanced components
- Card grid patterns crucial for many apps

**Pages:**
1. Search results - grid of property cards with filters
2. Property detail - photos, info, booking form
3. User profile - saved properties

**New Complex Components Needed:**

**DatePicker/DateRangePicker** (our open-source version)
- Built with Base UI primitives (Calendar, Popover)
- Inspired by MUI X but fully custom
- Tailwind styling
- Sheet-based variants

**CardGrid with Pagination** (pattern)
- Responsive grid layout
- Pagination controls
- Loading states (Skeleton)
- Empty states

**FilterPanel** (pattern)
- Checkbox groups
- Select dropdowns
- Slider (price range)
- Apply/Clear buttons

**Implementation Approach - DatePicker:**
```typescript
// libs/ui/complex/src/DatePicker/DatePicker.tsx
import { Popover, Calendar } from '@base-ui/react';
import { Sheet } from '@base-joy/ui/core';
import { Input, Button } from '@base-joy/ui/components';

export const DatePicker = ({ value, onChange, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Input
          value={value ? format(value, 'PP') : ''}
          readOnly
          {...props}
        />
      </Popover.Trigger>
      <Popover.Content>
        <Sheet variant="outlined" className="p-4">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            // Custom styling with Tailwind
          />
        </Sheet>
      </Popover.Content>
    </Popover>
  );
};
```

**Validation:**
- Generator successfully scaffolded demo-airbnb
- DatePicker works well
- CardGrid pattern is reusable
- FilterPanel handles complex forms

**Critical Files:**
- `/Users/stevo/src/base-joy/libs/ui/complex/src/DatePicker/DatePicker.tsx`
- `/Users/stevo/src/base-joy/libs/ui/patterns/src/CardGrid/CardGrid.tsx`
- `/Users/stevo/src/base-joy/apps/demo-airbnb/src/app/pages/SearchPage.tsx`

---

### Phase 8: Third Demo - Netflix (Week 9-10)

**Goals:**
- Media-focused patterns
- Horizontal scrolling
- Dark theme validation
- Carousel component

**Pages:**
1. Browse - multiple content rows (horizontal scroll)
2. Watch - video player page
3. Search - grid results

**New Components Needed:**

**Carousel** (complex component)
- Horizontal scrolling
- Navigation arrows
- Smooth animations
- Responsive

**VideoCard** (pattern)
- Hover effects (play on hover)
- Progress indicator
- Title overlay

**HorizontalScroll** (pattern)
- Overflow scroll with styled scrollbar
- Arrow navigation
- Snap points

**Implementation:**
```typescript
// libs/ui/complex/src/Carousel/Carousel.tsx
import { useEmblaCarousel } from 'embla-carousel-react';
import { Button } from '@base-joy/ui/components';

export const Carousel = ({ children, ...props }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 'auto',
  });

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {children}
        </div>
      </div>
      <Button
        variant="plain"
        className="absolute left-0 top-1/2 -translate-y-1/2"
        onClick={() => emblaApi?.scrollPrev()}
      >
        ←
      </Button>
      <Button
        variant="plain"
        className="absolute right-0 top-1/2 -translate-y-1/2"
        onClick={() => emblaApi?.scrollNext()}
      >
        →
      </Button>
    </div>
  );
};
```

**Validation:**
- Dark theme works across all components
- Horizontal scrolling smooth
- Carousel reusable for other demos
- Performance good with many cards

---

### Phase 9: Remaining Demos (Week 11-20)

**Goals:**
- Scale to 15 total demo apps
- Use generators for speed
- Discover remaining components needed
- Build to ~40-50 total components

**Remaining 12 Demos:**
1. **YouTube** (video platform, comments, subscriptions)
2. **Amazon** (e-commerce, product grids, cart, checkout)
3. **University** (content-heavy, courses, enrollment forms)
4. **Dashboard** (charts, metrics, data tables)
5. **Social Media** (Twitter/X-like - feeds, infinite scroll, posting)
6. **Portfolio** (galleries, case studies, contact form)
7. **Restaurant** (menus, reservations, location)
8. **News Site** (article layouts, breaking news, categories)
9. **SaaS Landing** (marketing, pricing tables, CTAs)
10. **Documentation** (code blocks, navigation, search)
11. **Forum** (Reddit-like - threads, discussions, voting)
12. **E-learning** (Udemy-like - courses, progress tracking, video)

**New Components These Drive:**

**From YouTube:**
- CommentThread (nested comments)
- VideoPlayer wrapper
- Subscription button variant

**From Amazon:**
- ProductCard pattern
- StarRating component
- CartDrawer (Drawer + Item list)

**From Dashboard:**
- Chart wrapper (using recharts or similar)
- StatCard pattern
- DataGrid (our open-source version)

**From Social Media:**
- InfiniteScroll pattern
- PostComposer (textarea + media upload)
- LikeButton with count

**From Documentation:**
- CodeBlock (syntax highlighting)
- TableOfContents (sticky navigation)
- SearchBar with CommandK

**DataGrid Implementation (Our Open Source Version):**
```typescript
// libs/ui/complex/src/DataGrid/DataGrid.tsx
import { Table } from '@base-joy/ui/components';
import { useState } from 'react';

export const DataGrid = ({
  columns,
  data,
  sortable = true,
  filterable = false,
  pagination = false,
  pageSize = 10,
}) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting logic
  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        // Sort implementation
      })
    : data;

  // Pagination logic
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  return (
    <div>
      <Table>
        <Table.Header>
          {columns.map(column => (
            <Table.HeaderCell
              key={column.key}
              onClick={() => sortable && setSortConfig({
                key: column.key,
                direction: sortConfig?.direction === 'asc' ? 'desc' : 'asc',
              })}
            >
              {column.label}
              {sortable && <SortIcon />}
            </Table.HeaderCell>
          ))}
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row, idx) => (
            <Table.Row key={idx}>
              {columns.map(column => (
                <Table.Cell key={column.key}>
                  {column.render ? column.render(row) : row[column.key]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / pageSize)}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
```

**Rollout Strategy:**
- Week 11-12: YouTube + Amazon
- Week 13-14: University + Dashboard
- Week 15-16: Social Media + Portfolio
- Week 17-18: Restaurant + News
- Week 19-20: SaaS + Docs + Forum + E-learning

**Each new app should:**
1. Use demo-app generator
2. Introduce 2-3 new components max
3. Reuse existing patterns
4. Take ~3-4 days to build

---

## Technical Implementation Details

### Design Tokens Structure

```typescript
// libs/design-system/tokens/src/colors.ts
export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  success: { /* green scale */ },
  warning: { /* yellow/orange scale */ },
  danger: { /* red scale */ },
};

// libs/design-system/tokens/src/variants.ts
export const variants = ['solid', 'soft', 'outlined', 'plain'] as const;
export const colors = ['primary', 'neutral', 'success', 'warning', 'danger'] as const;
export const sizes = ['sm', 'md', 'lg'] as const;

export type Variant = typeof variants[number];
export type Color = typeof colors[number];
export type Size = typeof sizes[number];
```

### Utility Function - cn()

```typescript
// libs/design-system/utils/src/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes properly, handling conflicts
 * Example: cn('px-2', 'px-4') => 'px-4' (not 'px-2 px-4')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
const { colors } = require('./libs/design-system/tokens/src/colors');

module.exports = {
  content: [
    './apps/**/*.{js,ts,jsx,tsx}',
    './libs/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        neutral: colors.neutral,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
      },
      spacing: {
        // Custom spacing if needed
      },
      typography: {
        // Custom typography if needed
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
```

### TypeScript Path Mappings

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@base-joy/ui/core": ["libs/ui/core/src/index.ts"],
      "@base-joy/ui/components": ["libs/ui/components/src/index.ts"],
      "@base-joy/ui/complex": ["libs/ui/complex/src/index.ts"],
      "@base-joy/ui/patterns": ["libs/ui/patterns/src/index.ts"],
      "@base-joy/design-system/tokens": ["libs/design-system/tokens/src/index.ts"],
      "@base-joy/design-system/themes": ["libs/design-system/themes/src/index.ts"],
      "@base-joy/design-system/utils": ["libs/design-system/utils/src/index.ts"],
      "@base-joy/shared/utils": ["libs/shared/utils/src/index.ts"],
      "@base-joy/shared/hooks": ["libs/shared/hooks/src/index.ts"],
      "@base-joy/shared/types": ["libs/shared/types/src/index.ts"],
      "@base-joy/demo-shared/*": ["libs/demo-shared/*/src/index.ts"]
    }
  }
}
```

---

## Component Reference Matrix

Which demos drive which components:

| Component      | Blog | Airbnb | Netflix | YouTube | Amazon | Other      |
| -------------- | ---- | ------ | ------- | ------- | ------ | ---------- |
| Sheet          | ✓    | ✓      | ✓       | ✓       | ✓      | All        |
| Item           | ✓    | ✓      | ✓       | ✓       | ✓      | All        |
| Button         | ✓    | ✓      | ✓       | ✓       | ✓      | All        |
| Input          | ✓    | ✓      | ✓       | ✓       | ✓      | All        |
| Card           | ✓    | ✓      | ✓       | ✓       | ✓      | All        |
| Typography     | ✓    | ✓      | ✓       | ✓       | ✓      | All        |
| DatePicker     | -    | ✓      | -       | -       | -      | University |
| CardGrid       | ✓    | ✓      | -       | -       | ✓      | Portfolio  |
| Carousel       | -    | ✓      | ✓       | ✓       | ✓      | Restaurant |
| DataGrid       | -    | -      | -       | -       | -      | Dashboard  |
| CommandK       | -    | ✓      | ✓       | ✓       | ✓      | Docs       |
| VideoPlayer    | -    | -      | ✓       | ✓       | -      | E-learning |
| InfiniteScroll | -    | -      | ✓       | ✓       | -      | Social     |
| CodeBlock      | -    | -      | -       | -       | -      | Docs       |
| Chart          | -    | -      | -       | -       | -      | Dashboard  |

---

## Success Metrics

### Phase 1-4 (Weeks 1-4):
✅ 30 essential components complete
✅ Sheet + Item working as foundations
✅ All components have consistent variant/color/size API
✅ Documentation site shows all components
✅ Can build complete page layouts

### Phase 5 (Week 5):
✅ Blog demo looks professional
✅ No one-off custom styles needed
✅ Identified reusable patterns
✅ Ready to create generators

### Phase 6 (Week 6):
✅ Demo app scaffolds in < 5 min
✅ New component scaffolds in < 2 min
✅ Generators work reliably

### Phase 7-8 (Weeks 7-10):
✅ Airbnb + Netflix demos complete
✅ Complex components (DatePicker, Carousel, DataGrid started)
✅ Component library at ~35-40 components
✅ Patterns established for remaining demos

### Phase 9 (Weeks 11-20):
✅ All 15 demo apps complete
✅ Component library at ~45-50 components
✅ Each new app took < 1 week with generators
✅ Library feels complete and cohesive

---

## Key Resources & Documentation

### Component Library References:
- [Base UI 1.0.0](https://base-ui.com/)
- [Joy UI Components](https://mui.com/joy-ui/getting-started/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [MUI Material UI](https://mui.com/material-ui/all-components/)
- [MUI X](https://mui.com/x/)

### Technical Documentation:
- [Class Variance Authority](https://cva.style/docs)
- [Nx React Monorepo](https://nx.dev/docs/getting-started/tutorials/react-monorepo-tutorial)
- [Nx Generators](https://nx.dev/recipe/workspace-generators)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## What to Build First vs. Later

### Immediate (Weeks 1-6): Foundation

**Build Now:**
- Nx workspace setup
- Testing infrastructure (Vitest, React Testing Library, ~100% coverage goal)
- Custom ESLint rules for base-joy patterns
- 14 minimal components (each with unit tests)
- Sheet + Item base components
- Basic Tailwind config
- GitHub repo + issue system
- Docs app structure
- Blog demo

**Skills to Build Now (Priority 0):**
1. `skill:component-scaffold` - Need this for every component (includes test scaffold)
2. `skill:code-review` - Review every file before committing (CRITICAL for quality)
3. `skill:api-design` - Validates API consistency from start
4. `skill:unit-testing` - Auto-generate unit tests (100% coverage goal)
5. `skill:demo-app-generator` - Will use after Blog demo
6. `skill:docs-page-generator` - Need for documenting components

**Document/Plan Now, Build Later:**
- All 100+ skills (document in GitHub issues)
- Skills for P1-P5 components (document as issues created)
- Advanced workflows (design → develop → deploy → release)
- Skill composition system

### Near-Term (Weeks 7-12): Next Skills

**After Blog demo is working, build these skills:**

7. `skill:a11y-testing` - Automate accessibility testing
8. `skill:lint-rule-creator` - Create custom ESLint rules for common mistakes
9. `skill:variant-designer` - Help design CVA variants
10. `skill:typescript-types` - Auto-generate TypeScript types
11. `skill:example-generator` - Auto-generate doc examples
12. `skill:api-validator` - Validate API consistency
13. `skill:changelog-generator` - Auto-generate changelogs

**Why these first?**
- Most repetitive tasks
- Highest ROI for time saved
- Build momentum for skills system

### Mid-Term (Weeks 13-18): Quality Skills

14. `skill:visual-regression-testing`
15. `skill:responsive-testing`
16. `skill:bundle-analyzer`
17. `skill:performance-monitor`
18. `skill:breaking-change-detector`
19. `skill:coverage-reporter` - Enforce coverage thresholds

### Long-Term (Weeks 19+): Advanced Skills

- Remaining 85+ skills built as needed
- Skills for new component categories
- Skills for deployment/monitoring
- Skills for Figma sync, etc.

### GitHub Issue Structure for Skills

**Create issues for each skill with:**

```markdown
---
title: "Skill: component-scaffold"
labels: skill, priority:P0, category:development
milestone: v0.2
---

## Skill Name
component-scaffold

## Category
Component Development

## Priority
P0 - Critical (build in weeks 1-6)

## Description
Generates component boilerplate following base-joy patterns (Sheet/Item, CVA, TypeScript, etc.)

## Inputs
- componentName: string
- category: 'inputs' | 'data-display' | 'feedback' | 'navigation' | 'layout' | 'complex'
- baseUI: string (optional) - which Base UI component to wrap

## Outputs
- Component file with CVA variants
- TypeScript types
- Export from library index
- Basic test file (optional)

## Implementation
- Nx generator in tools/skills/component-scaffold/
- Templates for different component types
- Validates component name doesn't conflict

## Dependencies
None (foundational skill)

## Acceptance Criteria
- [ ] Can generate new component in < 30 seconds
- [ ] Generated code follows all API rules
- [ ] TypeScript compiles without errors
- [ ] Component exports correctly
- [ ] Works for all component categories
```

**Skill Labels:**
- `skill` - All skill issues
- `priority:P0` through `priority:P5` - When to build
- `category:development`, `category:testing`, `category:docs`, etc.

**Skill Milestones:**
- v0.1 - Core skills (4 skills)
- v0.2 - First workflow (6 additional skills)
- v0.3 - Quality skills (5 additional skills)
- v0.4 - Advanced skills (remaining 85+ skills as needed)

---

## Next Immediate Steps

**To start implementation (Week 1, Days 1-2):**

1. **Create workspace** (30 min)
   ```bash
   npx create-nx-workspace@latest base-joy --preset=react-monorepo
   ```

2. **Install dependencies** (15 min)
   ```bash
   npm install @base-ui/react class-variance-authority clsx tailwind-merge
   npm install -D tailwindcss postcss autoprefixer
   ```

3. **Configure Tailwind** (45 min)
   - `npx tailwindcss init -p`
   - Define color palette in config
   - Set up content paths

4. **Create first libraries** (45 min)
   ```bash
   nx g @nx/react:library core --directory=libs/ui/core
   nx g @nx/react:library tokens --directory=libs/design-system/tokens
   nx g @nx/react:library utils --directory=libs/design-system/utils
   ```

5. **Set up TypeScript paths** (15 min)
   - Update tsconfig.base.json with path mappings

6. **Build cn() utility** (15 min)
   - Create `libs/design-system/utils/src/cn.ts`

7. **Define design tokens** (1 hour)
   - Create color scales in `libs/design-system/tokens/src/colors.ts`
   - Define variants, sizes constants

8. **Build Sheet component** (3-4 hours)
   - Create `libs/ui/core/src/Sheet/Sheet.tsx`
   - Implement CVA variants
   - Add TypeScript types
   - Export from core library

9. **Build Item component** (3-4 hours)
   - Create `libs/ui/core/src/Item/Item.tsx`
   - Create sub-components (ItemHeader, ItemContent, etc.)
   - Export from core library

10. **Validate in docs app** (1 hour)
    - Render Sheet with all variants
    - Render Item with all sub-components
    - Verify Tailwind classes apply

**Total time to working foundation: ~1.5-2 days**

---

## Critical Files to Create (Phase 1)

These files form the foundation of the entire system:

1. **`/Users/stevo/src/base-joy/tailwind.config.js`**
   - Design tokens (colors, spacing)
   - Content paths for all libs/apps

2. **`/Users/stevo/src/base-joy/libs/design-system/utils/src/cn.ts`**
   - Class merging utility
   - Used by every component

3. **`/Users/stevo/src/base-joy/libs/design-system/tokens/src/colors.ts`**
   - Color palette definition
   - Variant/size type exports

4. **`/Users/stevo/src/base-joy/libs/ui/core/src/Sheet/Sheet.tsx`**
   - Foundation styling component
   - CVA variant system
   - Polymorphic `as` prop

5. **`/Users/stevo/src/base-joy/libs/ui/core/src/Item/Item.tsx`**
   - Foundation content structure component
   - Sub-component exports

6. **`/Users/stevo/src/base-joy/tsconfig.base.json`**
   - TypeScript path mappings
   - Import aliases

7. **`/Users/stevo/src/base-joy/nx.json`**
   - Nx configuration
   - Task pipeline
   - Caching settings

---

## Potential Challenges & Mitigations

### Challenge: Base UI 1.0.0 is brand new (released today)
**Mitigation:**
- Start with simpler components (Button, Input)
- Read Base UI source code when docs unclear
- May need to work around bugs
- Contribute fixes back to Base UI

### Challenge: Building open-source DataGrid/DatePicker is complex
**Mitigation:**
- Start with MVP versions (basic features)
- Iteratively add features as demos need them
- Don't try to match MUI X Pro feature-for-feature
- Focus on most common use cases (80/20 rule)

### Challenge: 15 apps is a lot of work
**Mitigation:**
- Generators make it faster after first 3 apps
- Each app can be simple (5-10 pages, not production-ready)
- Focus on showcasing components, not building full apps
- Some apps can be very minimal

### Challenge: Maintaining consistency across 50 components
**Mitigation:**
- Enforce Sheet/Item as foundations
- Use component generator for boilerplate
- Regular refactoring passes
- Clear component API guidelines

### Challenge: Human-in-the-loop slows progress
**Mitigation:**
- Good! This is intentional for quality
- Small, focused PRs/changes
- Validate before moving forward
- Better than big bang that fails

---

## Design Decisions & Rationale

### Why Both Sheet AND Item?
- **Sheet** = visual styling/appearance system (Joy UI's strength)
- **Item** = content structure/layout system (shadcn's strength)
- Different concerns, both valuable
- Many components use both: `<Sheet><Item>...</Item></Sheet>`

### Why ~30 components for v1 (not 50 or 80)?
- Enough for real apps (demos prove it)
- Not overwhelming to build/maintain
- Can add more based on demo needs
- Quality over quantity

### Why build our own DataGrid/DatePicker vs. using MUI X?
- Full control over design system integration
- Fully open source (MUI X Pro is paid)
- Learning opportunity
- Can start simple, add features incrementally

### Why generators so early (Phase 6)?
- Repeatability is key to success
- 12 more demos to build after first 3
- Codifies patterns while they're fresh
- Reduces manual toil

### Why Blog → Airbnb → Netflix order?
- **Blog**: Simplest, validates foundation
- **Airbnb**: Complex, drives advanced components
- **Netflix**: Different patterns (media, horizontal scroll)
- Increasing complexity curve

### Why custom docs (not Storybook)?
- Full control over design/UX
- Demonstrates component library itself
- No third-party lock-in
- Integrated with demos

---

This plan provides a clear, incremental path from empty directory to a complete component library with 15 demo applications. The key is building foundations first (Sheet + Item), validating with real demos (Blog), creating repeatability (generators), then scaling (12 more apps).
