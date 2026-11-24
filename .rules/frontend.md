# Frontend Engineering & UI/UX Standards

## Overview

Build responsive, accessible, reliable user interfaces with predictable state management, defensive asynchronous data handling, and clean component boundaries. The frontend is the face of the application and must maintain rock-solid reliability across diverse devices and network conditions.

---

## 1. The Complete UI State Lifecycle

Every asynchronous UI flow must comprehensively handle all five core states:

```
                  ┌──────────────────────┐
                  │    Initial / Idle    │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   Loading / Pending  │
                  └──────┬────────┬──────┘
                         │        │
               Success   │        │   Failure
        ┌────────────────┘        └────────────────┐
        ▼                                          ▼
┌──────────────────────┐                  ┌──────────────────────┐
│     Success State    │                  │      Error State     │
│ (Populated or Empty) │                  │ (Actionable & Clear) │
└──────────────────────┘                  └──────────────────────┘
```

1. **Loading & Pending States:**
   - Display contextual indicators: skeleton loaders, spinner buttons, or subtle progress bars.
   - Disable interactive triggers while mutations are pending to prevent accidental double-clicks.
   - Avoid sudden layout shifts (CLS) when content finishes loading.
2. **Success States:**
   - Transition smoothly into populated data views.
   - Provide clear, non-intrusive feedback (toasts, status badges, banners) where appropriate.
3. **Empty States:**
   - Never show a blank screen when a query returns zero items.
   - Provide a clear message explaining why the list is empty and an actionable call-to-action (CTA) to create or populate items.
4. **Error States:**
   - Present user-friendly, actionable error messages instead of raw crash stack traces.
   - Include retry mechanisms (`Retry` button) for transient network or server errors.
   - Confine component crashes using Error Boundaries to prevent tearing down the entire application.
5. **Stale Asynchronous Responses & Race Conditions:**
   - Defend against race conditions in search, filtering, and tab switches.
   - Use `AbortController` or query cancellation so stale responses from previous requests do not overwrite newer user selections.

---

## 2. User Interaction & Form Handling

- **Immediate Client-Side Validation:**
  - Validate user input as they interact (or on blur) with clear, contextual feedback adjacent to the input field.
  - Client-side validation improves user experience, but **must never replace backend validation**.
- **Duplicate Submission Prevention:**
  - Automatically disable submit buttons and display a pending state immediately upon click.
  - Prevent rapid double-clicks from spawning duplicate API requests.
- **Accessibility & Semantic HTML:**
  - Use proper semantic elements (`<button>`, `<main>`, `<nav>`, `<header>`, `<article>`, `<label>`).
  - Ensure full keyboard accessibility: interactive elements must be reachable via `Tab` and activatable via `Enter`/`Space`.
  - Maintain sufficient color contrast ratios (WCAG AA standards).
  - Include appropriate `aria-label`, `aria-expanded`, and `aria-live` attributes where visual cues alone are insufficient.
- **Responsive Layouts:**
  - Build mobile-first, ensuring graceful degradation across mobile (small screens), tablet, and desktop viewports.
  - Test responsive breakpoints, overflow behavior, and word wrapping on long text inputs.

---

## 3. Component Architecture & State Management

- **Separation of Presentation and Business Logic:**
  - Keep UI components ("view/dumb" components) focused on rendering and layout.
  - Extract complex orchestration, API queries, and transformations into custom React hooks or utility functions.
- **State Ownership Hierarchy:**
  - **Local UI State (`useState`):** Ephemeral state like dropdown toggles, modal open/close, hover states.
  - **URL / Query Param State:** Filter, search queries, pagination, and active tabs that should be shareable and survive page refreshes.
  - **Server / Cache State (SWR, React Query):** Remote data fetching, background revalidation, and caching.
  - **Global Context:** Truly global application concerns (active user session, theme preferences).
- **Preventing Common Frontend Pitfalls:**
  - **Unnecessary Re-renders:** Avoid creating new function references or object literals in render loops without justification. Memoize expensive computations with `useMemo` when profiling shows real cost.
  - **Memory Leaks:** Always clean up event listeners, intervals, timeouts, and WebSocket connections in `useEffect` cleanup returns.
  - **Optimistic Updates:** If using optimistic UI updates, ensure a guaranteed rollback strategy if the subsequent server mutation fails.
  - **Client Bundle Security:** Never expose environment secrets, internal tokens, or sensitive administrative metadata in client-side code bundles.
