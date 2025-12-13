# Missing Features from Joy UI

This document tracks features from Joy UI that we haven't implemented yet.

## Medium Priority

### 1. TypeScript Theme Augmentation
**Current State:** ⚠️ Basic types only

**What's Missing:**
- Theme augmentation API for custom colors
- Type-safe theme customization with IntelliSense for custom values

**Current Implementation:**
- Theme interface exists with full typing
- No module augmentation pattern for extending theme

---

## Low Priority

### 2. Animation/Transitions
**Current State:** ⚠️ Basic transitions only

**What's Missing:**
- Coordinated animations across components
- Motion prefers-reduced-motion support
- Consistent animation timing tokens

---

## Notes

These features align well with our CVA-based architecture and can be added incrementally without breaking changes.
