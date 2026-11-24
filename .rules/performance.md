# Performance & Scalability Standards

## Overview

Performance is an essential feature, but optimization without measurement is wasted effort. Measure first, identify actual bottlenecks, and apply targeted engineering solutions. Never sacrifice correctness, readability, or system maintainability for speculative micro-optimizations.

---

## 1. The Measurement-First Philosophy

- **Profile Before Optimizing:**
  - Base performance work on real profiling data, metrics, query plans (`EXPLAIN ANALYZE`), APM traces, or browser performance tools (Lighthouse / Chrome DevTools).
  - Prioritize optimizations that directly improve user experience (Time to First Byte, First Contentful Paint, interaction latency, query execution times).
- **Avoid Premature Optimization:**
  - Do not introduce complex caching layers, manual memory recycling, or convoluted bitwise operations unless measurements prove a significant bottleneck.
  - Write clean, maintainable code first. Optimize only when benchmarks justify the change.

---

## 2. Database & Data Access Performance

- **Query Tuning & Index Utilization:**
  - Ensure queries utilize appropriate indexes (b-tree, compound, or GIN/GiST for full-text/JSON).
  - Eliminate sequential table scans on high-cardinality tables.
  - Optimize `ORDER BY` and `LIMIT` queries with composite indexes matching the sorting keys.
- **Payload & Memory Bounding:**
  - Avoid selecting unnecessary large columns (such as embedded base64 strings or massive JSON documents) in list queries.
  - Implement streaming or batch processing (using database cursors) for large exports or batch jobs to prevent out-of-memory crashes.
- **Connection Management:**
  - Maintain an appropriately configured connection pool to prevent connection churn.
  - Keep transaction durations as short as possible to release locks and minimize transaction pool contention.

---

## 3. Caching Strategies & Invalidation

- **Appropriate Caching Layers:**
  - **HTTP Caching:** Use `Cache-Control` headers (e.g. `s-maxage`, `stale-while-revalidate`) for publicly cacheable, static, or semi-static content.
  - **Application / Memory Cache (Redis / In-Memory):** Cache expensive computation results, session metadata, or frequently requested shared datasets.
- **Cache Invalidation Discipline:**
  - Explicitly define cache Time-To-Live (TTL) values.
  - Implement explicit cache invalidation or cache-busting keys whenever mutated data changes.
  - Guard against **cache stampedes** (dog-piling) using locking, mutexes, or background revalidation.
  - Treat the cache as ephemeral: the application must function correctly even if the cache is cold, restarted, or cleared.

---

## 4. Frontend & Rendering Performance

- **Asset Optimization & Bundling:**
  - Use modern, compressed image formats (WebP, AVIF) with responsive sizes.
  - Dynamic imports (`next/dynamic` or `React.lazy`) for heavy, non-critical components (e.g. chart libraries, rich text editors).
- **Minimizing Unnecessary Renders:**
  - Keep state localized to the components that actually consume it.
  - Avoid lifting state unnecessarily high up the component tree.
  - Virtualize long lists (e.g., using virtual scrolling) when rendering hundreds or thousands of rows.
- **Core Web Vitals:**
  - Optimize Largest Contentful Paint (LCP) by prioritizing critical images and fonts.
  - Minimize Cumulative Layout Shift (CLS) by assigning explicit width and height dimensions to media.
  - Optimize Interaction to Next Paint (INP) by keeping JavaScript execution out of long blocking tasks on the main thread.

---

## 5. Background Processing & Scalability

- **Offload Heavy Workloads:**
  - Offload heavy tasks (video/PDF processing, bulk email sending, AI synthesis, report generation) to asynchronous background workers or queues.
  - Return an immediate `202 Accepted` response with a task ID or polling endpoint.
- **Queue Throughput & Backpressure:**
  - Define bounded queue capacities and handle backpressure gracefully.
  - Monitor queue lag and error rates to prevent worker starvation or overwhelming external APIs.
