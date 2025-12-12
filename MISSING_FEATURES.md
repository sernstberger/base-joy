# Missing Features from Joy UI

This document tracks features from Joy UI that we haven't implemented yet.

## High Priority

### 1. Dark Mode Support
**Reference:** https://mui.com/joy-ui/main-features/dark-mode-optimization/

**Current State:** ❌ Not implemented

**What's Missing:**
- Color scheme switching (light/dark modes)
- `useColorScheme()` hook for programmatic control
- System preference detection
- Persistent color scheme storage
- Dark-optimized color palettes
- Automatic dark mode variant adjustments

**Implementation Notes:**
- Need to add `data-color-scheme` attribute support
- Extend color tokens with dark mode variants
- Add ColorScheme provider/context
- Update Sheet/Typography to support dark mode colors

---

### 2. Automatic Size Adjustment
**Reference:** https://mui.com/joy-ui/main-features/automatic-adjustment/

**Current State:** ⚠️ Partially implemented (size inheritance via context)

**What's Missing:**
- Automatic size inheritance from parent components
- `size` context that propagates to children
- Components automatically adapting to container size
- Size adjustment based on density

**Current Implementation:**
- We have size props on individual components
- No automatic propagation

**TODO:**
- Add SizeContext provider
- Make components read from size context as fallback
- Add documentation for size inheritance

---

### 3. Automatic Color Adjustment
**Reference:** https://mui.com/joy-ui/main-features/automatic-adjustment/

**Current State:** ⚠️ Partially implemented (color inheritance via CSS)

**What's Missing:**
- Automatic variant adjustment based on parent
- Color scheme awareness (changing variants for dark mode)
- Nested component adaptation

**Current Implementation:**
- Text colors inherit via CSS
- No programmatic color adjustment

---

## Medium Priority

### 4. CSS Variables API
**Current State:** ❌ Not implemented

**What's Missing:**
- Ability to customize colors via CSS variables
- Component-specific CSS variable customization
- Runtime theme customization

---

### 5. TypeScript Theme Augmentation
**Current State:** ⚠️ Basic types only

**What's Missing:**
- Theme augmentation API for custom colors
- Type-safe theme customization
- IntelliSense for custom theme values

---

### 6. Component Slots API
**Current State:** ❌ Not implemented

**What's Missing:**
- `slots` prop for component customization
- `slotProps` for passing props to slots
- Named slots for complex components

**Note:** Base UI uses `render` prop pattern, which we're using. Joy UI adds slots on top.

---

## Low Priority

### 7. Animation/Transitions
**Current State:** ⚠️ Basic transitions only

**What's Missing:**
- Coordinated animations across components
- Motion prefers-reduced-motion support
- Consistent animation timing

---

### 8. Focus Management
**Current State:** ⚠️ Basic focus rings via Sheet

**What's Missing:**
- Focus-within variants
- Better keyboard navigation indicators
- Focus trap utilities

---

## Implementation Roadmap

### Phase 0: Foundation (PREREQUISITE)
**Issue:** [#36 - Implement Theme System Foundation](https://github.com/sernstberger/base-joy/issues/36)

**Critical:** This must be completed before Phase 1 features can be implemented.

1. **Theme Configuration Structure** - Define Theme interface and defaultTheme
2. **Theme Provider & Context** - ThemeProvider component and useTheme() hook
3. **Theme Application** - Mechanism to apply themes via CSS custom properties
4. **Type-Safe Theme API** - TypeScript types with IntelliSense support

**Why it's needed:** Dark mode, CSS variables, and theme augmentation all require a theme system to work.

---

### Phase 1: Core Features (Q1 2025)
1. Dark mode support (#28) - **Blocked by #36**
2. Automatic size adjustment (#29)
3. Complete color inversion implementation - ✅ Already implemented

### Phase 2: DX Improvements (Q2 2025)
4. CSS Variables API (#31) - **Blocked by #36**
5. Theme augmentation (#32) - **Blocked by #36**
6. Component slots (#33)

### Phase 3: Polish (Q3 2025)
7. Animation system
8. Focus management improvements

---

## Notes

- **Color Inversion:** ✅ Implemented (WCAG AA/AAA compliance)
- **Global Variants:** ✅ Implemented (solid, soft, outlined, plain)
- **Typography Inheritance:** ✅ Implemented

These features align well with our CVA-based architecture and can be added incrementally without breaking changes.
