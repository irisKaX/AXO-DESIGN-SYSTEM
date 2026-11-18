# AXO Button Effects Implementation Plan

> **For agentic workers:** Implement inline with `superpowers:executing-plans`; preserve the user's live workspace and use temporary browser checks, without commits or test infrastructure.

**Goal:** Keep Primary solid, restyle Secondary through Button-specific tokens, add optional `gradient` and `gradient-border` variants.

**Architecture:** Central signature gradient/effect tokens, reusable CSS orbital-border utility, and the existing shared Button/CVA API. Pseudo-elements paint behind content without wrappers, layout changes or focus clipping.

**Tech Stack:** Existing React, TypeScript, Vite, Tailwind v4, CSS transitions/masks/registered custom properties.

**Spec:** User's “AXO Button Collection – Color & Gradient Redesign”, followed by approval of a uniform AXO dark overlay and a target contrast of at least 5:1. Exact stops: #4B13BF 0%, #5821CF 50%, #168EDA 100%.

## Global Constraints

Keep sizes, pill/circle radii, icons, typography, spacing, logic and global theme palettes. No dependencies, new test framework, CI, commits, push or deployment. Both themes, keyboard focus and reduced motion must work.

## Review Focus

- asChild/composed Buttons must retain effects and their accessible content without added wrappers.
- Secondary Badge and global shadcn secondary roles must remain unchanged.
- Reversed gradient must reveal left-to-right and reverse smoothly without swapping images.
- Glow must remain outside the content area and disappear at keyboard focus/disabled/reduced-motion.
- Contrast must cover positions, both directions, wipe edges, pressed and disabled exceptions.

## Tasks

- [x] 1. Add exact signature primitives/gradient tokens and Button/effect semantic roles. Use a 22% neutral-950 overlay (minimum theoretical 5.17:1) and stronger pressed overlay; do not alter existing palette values. Capture current dimensions and colors before implementation.
- [x] 2. Add reusable CSS effects, add the two Button variants and Button-specific Secondary rules. Keep existing Primary and other variants. Reveal reverse gradient with a 450ms clip-path transition. Orbital highlight runs on hover, masks only the border, fades out on leave and is hidden at focus/disabled/reduced-motion. Static gradient border remains as fallback.
- [x] 3. Expose variants in Button/Icon Button/Loading Button catalog controls. Verify geometry, ARIA, keyboard, color contrast, forward/reverse/interrupted wipe, orbital masking, reduced motion, both themes, unrelated components, TypeScript, ESLint and HMR. Record results in docs/AXO_BUTTON_COLLECTION.md and request a read-only final review.

## Progress

- User approved uniform overlay; 16% gives 4.65:1, 20% gives 4.99:1, 22% gives 5.17:1. No local label backing.
- Verification scripts/artifacts stay in /private/tmp. Existing uncommitted user workspace and live Vite are preserved.

- Complete:184 geometry cases,120 state cases,64 loading cases,42 effect/API cases; TS/ESLint and local Vite verified.
- Review fixed: hover media gate prevents sticky touch orbit; host contrast layer protects replaced asChild input; Secondary CVA utilities and layered default positioning preserve className overrides. Targeted real-component checks passed.
- Decision: orbital is hover-only and static for touch/reduced-motion/focus/disabled; avoids unsolicited continuous page motion.
- Decision: exact Dark gradient border is decorative (some segments below3:1); text and independent focus identify the action. A future Input must retain a contrast-safe input boundary.
- Decision: uniform22% overlay gives5.17:1; pressed total28% gives5.77:1. No changed stop ratios or local label backing. Replaced native hosts retain an accessible static fallback.
