# Next.js Fullstack Architecture & App Router Standards

## Overview

Architectural standards and best practices for Next.js (App Router) + React 19 + TypeScript applications. These guidelines ensure strict server/client boundary separation, feature-driven domain discoverability, type-safe API communication, robust database patterns, and defensive frontend state management.

---

## 1. Core Architectural Rules

### 1.1 Decouple Types from Server Storage
- Define shared domain models, DTOs, and interface contracts in `types/` (or `src/types/`).
- **Strict Boundary:** Never import directly from `@/server/db/*`, ORM schemas, or server stores into client components (`"use client"`). Doing so risks bundling server-only dependencies, leaking environment secrets, and bloating client bundles.

### 1.2 Feature-Driven ("Screaming") Architecture
- Group business-domain components, specialized hooks, sub-views, and modals under `features/<domain>/` (e.g. `features/study/`, `features/courses/`, `features/auth/`, `features/gamification/`).
- Reserve `components/` strictly for:
  - `components/ui/`: Generic UI primitives (buttons, inputs, dialogs, badges).
  - `components/layout/`: Shared application shells (Header, Sidebar, Navigation, DashboardShell).
  - `components/common/`: Cross-cutting feedback widgets (ErrorBoundary, GlobalToast, SkeletonLoading).

### 1.3 Encapsulate Client API Communication
- Centralize all client-side network calls in typed service modules under `services/` (e.g. `api-client.ts`, `study.service.ts`, `auth.service.ts`).
- **Never** scatter raw `fetch("/api/...")` or `axios` calls with ad-hoc error handling directly inside UI components, `page.tsx`, or global UI stores.
- Standardize on an `apiFetch` wrapper that throws typed `ApiError` instances containing structured HTTP status and error payloads.

### 1.4 Thin Route & Page Orchestrators
- Keep `app/**/page.tsx` as lightweight composition roots (typically under 150 lines).
- Delegate layout chrome, navigation state, sub-tabs, and drawer logic into dedicated layout or feature components.

### 1.5 Preserve Re-export Façades During Refactoring
- When relocating components or route handlers into feature folders or standardized `/api/` endpoints, leave a single-line re-export bridge (`export { default } from "@/features/..."`) at the legacy path.
- **Route Segment Configs Cannot Be Re-exported:** For App Router Route Handlers, always declare route segment configs (`export const dynamic = 'force-dynamic';`) inline in the file before re-exporting HTTP methods (`export { GET, POST, OPTIONS } from "..."`). Re-exporting segment constants triggers Next.js static analysis failures.

### 1.6 Reuse Installed Dependencies Before Writing Helpers
- Check `package.json` before implementing custom utilities.
- When `clsx` and `tailwind-merge` are present, use the standard `cn()` helper in `lib/utils.ts`.
- Place general formatters in `lib/utils.ts` and barrel-export constants in `lib/constants/index.ts`.

### 1.7 Zero Native Browser Dialogs & Modal Hierarchy
- **Ban `window.alert()` and `window.confirm()`:** Native dialogs block the single-threaded JavaScript runtime, cannot adapt to dark/light themes, and break automated E2E tests.
- Always use accessible, asynchronous `ConfirmModal` / `AlertModal` components with semantic variants (`danger`, `warning`, `info`, `success`) and promise-based callbacks.
- **Nested Modal Escape Isolation:** When a confirmation modal opens atop a parent drawer/dialog, intercept the `Escape` key hierarchically: dismiss only the topmost confirmation modal first, keeping the parent view intact.
- **Mobile Header Ergonomics:** Avoid redundant "Kembali" buttons if a top-right close icon (`FiX`) already exists. Redundant buttons crowd out titles and badges on narrow screens (<400px).

### 1.8 Tailwind CSS v4 Manual Dark/Light Mode
- Tailwind v4 defaults to `@media (prefers-color-scheme: dark)`. If the OS is in dark mode, removing the `.dark` class from `<html>` will not take effect unless the variant is explicitly overridden.
- In `globals.css`, declare: `@custom-variant dark (&:where(.dark, .dark *));`.
- Prevent theme flashes (FOUC) and hydration mismatches by injecting a tiny inline theme-initialization script in `<head>` inside `layout.tsx`, and add `suppressHydrationWarning` to the `<html>` tag.
- If Turbopack caches the default media query after modifying CSS, touch `next.config.ts` to invalidate Turbopack's stylesheet cache.

### 1.9 Database Layer (Drizzle ORM / SQL Persistence)
- Define database schemas under `lib/db/schema.ts` (or `src/lib/db/schema.ts`) with explicit relational mappings (`relations()`).
- In development, cache the database client instance on `globalThis` to prevent connection pool exhaustion across Hot Module Replacement (HMR) reloads.
- Configure `output: "standalone"` in `next.config.ts` for containerized deployments.
- Use `drizzle-kit generate` for trackable migration files and `drizzle-kit push` for direct synchronization in development.

### 1.10 Study Platform & AI Learning Station Topology
- **3-Column Layout:** Left Navigation Sidebar (courses/sessions) | Center Workspace Canvas (multi-tab: Learn, Summary, Flashcards, Quizzes, MindMap) | Right Collapsible AI Companion Drawer.
- **Database as Sole Truth for Chat (No `localStorage` Chat History):** Never duplicate chat messages in `localStorage`. Consume chat directly from the server endpoint (`GET /api/sessions/[id]/content` or `/api/chat`).
- **Cursor-Based Pagination & Scroll Preservation:** In chat streams, paginate older messages using `before` timestamp cursors. When prepending messages at top (`scrollTop <= 40`), restore reading position via `container.scrollTop = newScrollHeight - prevScrollHeight + prevScrollTop` inside `requestAnimationFrame`.
- **Chronological Ordering with Role-Based Tie-Breaking:** When inserting user + AI message pairs, offset timestamps (e.g. +200ms for assistant) and sort deterministically: user before assistant if timestamps match.
- **Strict Grounding:** Scope AI requests strictly to the active session's documents with a strict grounding system prompt to eliminate hallucination.

### 1.11 Monolithic Canvas & Multi-Tab Decomposition
- When a workspace component exceeds ~300 lines by bundling multiple tabs, extract each tab into a dedicated sub-view under `features/<domain>/components/tabs/` (e.g. `SummaryTab`, `FlashcardsTab`, `QuizTab`, `LearnTab`).
- Isolate tab-specific states into custom hooks (`useQuizSession`, `useFlashcardDeck`), leaving the top workspace as a lightweight layout coordinator.

### 1.12 Deterministic Geometric Avatars (`@blobatar/react`)
- Use `@blobatar/react` (`import { Blobatar } from "@blobatar/react"`) for deterministic silhouettes derived from string seeds (usernames, course IDs, agent IDs).
- Import `"blobatar/motion.css"` and `"blobatar/gaze.css"` once globally in root `layout.tsx`.
- Wrap avatars in a reusable presence container with semantic states (`online`, `away`, `offline`, `thinking`).
- Dynamically toggle to `state="thinking"` when an AI pipeline is processing (`isLoading = true`).

### 1.13 Standardized Iconography (`react-icons`) Over Inline SVGs
- Standardize strictly on the `react-icons` package (e.g. `react-icons/fi`, `react-icons/ri`, `react-icons/hi2`).
- Never hand-roll raw inline `<svg>` blocks in UI components. This ensures consistent sizing (`h-4 w-4`, `h-5 w-5`), proper line weight, automatic `currentColor` inheritance, and tree-shaking.

### 1.14 Zero Status Dot ("Circle Dot") Ambiguity
- **Strictly forbid generic circle dots** (`rounded-full h-2 w-2 bg-green-500 animate-pulse` or colored bullets).
- Unlabeled colored dots fail accessibility for color-blind users and add visual noise. Communicate status using concise typography, semantic tonal badges with explicit text (`ONLINE`, `AKTIF`, `TERPUTUS`), or recognizable icons.

### 1.15 Plain-Language UX Copywriting
- In student-, user-, or merchant-facing interfaces, eliminate developer and gateway jargon (e.g. "CRC16 checksum", "TTL timeout", "Polling interval", "Token hash", "EMVCo payload").
- Use intuitive, friendly Indonesian copy ("Jumlah Tagihan", "Nomor Nota", "Riwayat Aktivitas", "Salin Teks"). Retain only universally recognized functional terms.

### 1.16 Route Segment Page & Route Handler Collision Isolation
- In Next.js App Router, a route directory **CANNOT** contain both `page.tsx` and `route.ts`. Doing so triggers: `Error: A conflicting public route was found: ... cannot have both a page and a route handler at the same path`.
- Relocate backend API handlers under `/api/` (e.g. `/api/courses/route.ts`) and user-facing pages under distinct semantic paths.

### 1.17 Server-Verified Resource Ownership in Route Handlers
- Authenticate inside every private route handler; middleware session verification does not authorize access to a specific resource ID.
- Scope reads, updates, and deletes to the authenticated user through the resource's relational chain (e.g. `material → session → course.userId`).
- Return a non-disclosing `404 Not Found` for missing or foreign resources.
- Put ownership predicates directly in the database query to eliminate race windows.

### 1.18 Server-Side Scoring & Client Input Normalization
- In assessment or quiz endpoints, never trust client-submitted `score` or `correctAnswersCount`.
- Clients submit only the raw answer map `{ [questionIndex]: selectedOptionIndex }`. The server loads the authorized answer key, calculates the score independently, and persists only the server-derived values.

### 1.19 Persistent Job Queues & Idempotent Retry Writes
- Never rely solely on an in-memory or `globalThis` queue for asynchronous AI synthesis or heavy batch jobs; server restarts or container re-deployments immediately drop in-memory jobs.
- Persist job records in a dedicated PostgreSQL table (`synthesis_jobs`) with status, attempts, locked_at, and payload.
- Wrap output generation in an atomic transaction that cleans up existing child records before inserting new ones, ensuring idempotent retries.

---

## 2. Default Project Structure

```text
src/
├── app/                          # Next.js App Router (routes, layouts, API endpoints)
│   ├── api/                      # Backend API Route Handlers (route.ts)
│   ├── layout.tsx                # Root layout & global providers
│   ├── globals.css               # Tailwind CSS v4 & custom variants
│   └── page.tsx                  # Lightweight composition root
│
├── types/                        # Pure TypeScript contracts, DTOs & domain schemas
│   ├── index.ts
│   └── <domain>.ts
│
├── features/                     # Feature-driven domain modules
│   ├── <domain>/
│   │   ├── components/           # Domain components, modals, and tabs
│   │   │   └── tabs/             # Tab sub-views (e.g. SummaryTab, QuizTab)
│   │   ├── hooks/                # Domain-specific custom hooks
│   │   └── index.ts              # Domain barrel export
│   └── index.ts
│
├── services/                     # Client-side typed API service wrappers
│   ├── api-client.ts             # Generic apiFetch wrapper & ApiError class
│   ├── <domain>.service.ts       # Typed REST/RPC endpoints
│   └── index.ts
│
├── components/                   # Shared UI primitives & App Shell
│   ├── ui/                       # Generic buttons, inputs, modal primitives
│   ├── layout/                   # Sidebar, Header, DashboardShell
│   └── common/                   # SkeletonLoading, ErrorBoundary
│
├── hooks/                        # Global shared React hooks
│   └── useDebounce.ts
│
├── lib/                          # Shared utilities, DB & constants
│   ├── db/                       # Drizzle ORM client, schemas, seeders
│   ├── utils.ts                  # cn(), date & number formatters
│   └── constants/                # App-wide static configurations
│
└── server/                       # Server-only domain logic (never imported by client)
    ├── agent-runtime/            # Server synthesis engines, LLM pipelines
    └── security/                 # Auth verification, JWT secrets, rate limiters
```

---

## 3. Crucial Next.js & React 19 Pitfalls to Avoid

- **React 19 / ESLint `react-hooks/set-state-in-effect` in Modals:**
  - Do not call `setState` synchronously inside `useEffect` when populating modal form state from props/external stores.
  - Instead, use a lazy state initializer `useState(() => currentUser?.field || "")` paired with a unique key on the modal (`<EditModal key={currentUser?.id} />`), or defer with `queueMicrotask(() => setState(...))`.
- **React 19 / ESLint `react-hooks/refs` During Render:**
  - Never read `ref.current` directly in JSX rendering (e.g. `<div id={holderId.current} />`). Refs are not synchronized during render. Use `useId()` or generate a stable ID in state/useMemo.
- **Deriving Active State Instead of Syncing in Effects:**
  - Avoid `useEffect(() => setSelectedId(items[0]?.id), [items])`.
  - Instead, derive the active item: `const activeItem = (selectedId ? items.find(i => i.id === selectedId) : null) || items[0] || null`.
- **Relative Navigation via `window.location.href` in Client Components:**
  - Avoid assigning `window.location.href = "/path"` in event handlers. Use `useRouter().push('/path')` or server-side `redirect('/path')` to prevent full page reloads and adhere to Next.js navigation rules.
- **Private Runtime Uploads in Next.js Standalone:**
  - Never store private user uploads under `public/` or expose an arbitrary path-based `/uploads/[...path]` handler; the public namespace bypasses resource authorization, while standalone's static file set does not track files written after startup.
  - Store runtime uploads in a private persistent folder and serve them through an authorized resource-ID endpoint (e.g. `/api/materials/[id]/file`) that checks ownership and preserves byte-range support for PDF streaming.
- **Standalone Docker Mode Missing Static Assets:**
  - Next.js standalone mode does NOT bundle static files automatically. Dockerfiles must explicitly copy both `public` to `/app/public` and `.next/static` to `/app/.next/static` in the runner stage.
- **Turbopack Google Font Discrete Weight on Variable Fonts:**
  - When loading variable fonts with `next/font/google` in Turbopack (e.g. Caveat, Plus Jakarta Sans), do not pass an explicit discrete weight array like `weight: ["500", "600", "700"]`. Omit the `weight` property to let the variable font load as a continuous axis.
- **Embedded `*/` in Multiline Comments:**
  - Never wrap blocks of code containing template literals with path expressions (e.g. `/${fileSize}`) or regex containing `*/` inside `/* ... */`. The lexer interprets `*/` as the comment closure, causing syntax errors. Use single-line `//` comments instead.
