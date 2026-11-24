# External Integrations & Resilience Standards

## Overview

Treat all external services, third-party APIs, microservices, and network boundaries as fundamentally unreliable. Upstream services will experience latency spikes, dropped connections, rate limits, breaking schema changes, and intermittent outages. Defend your application with resilient integration patterns.

---

## 1. Resilience Patterns & Timeout Policies

- **Mandatory Timeouts:**
  - Never issue unbounded HTTP/network calls. Every external request must have explicit, defensive timeouts:
    - Connection Timeout (e.g. 3–5 seconds).
    - Read/Execution Timeout (e.g. 10–30 seconds depending on payload size).
  - Use `AbortController` with `setTimeout` or client-configured timeout options to terminate hung connections.
- **Bounded Retries with Exponential Backoff:**
  - Never retry infinitely. Bound retries to 3–5 attempts maximum.
  - Implement exponential backoff with random jitter to prevent "thundering herd" problems:
    $$t_{\text{backoff}} = \min(t_{\max}, t_{\text{base}} \times 2^{\text{attempt}}) \pm \text{jitter}$$
- **Classify Retryable vs Non-Retryable Errors:**
  - **Retryable (transient):** `429 Too Many Requests`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Gateway Timeout`, network drops, TCP connection resets.
  - **Non-Retryable (permanent):** `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422 Unprocessable Content`. Retrying these wastes resources and can trigger account bans.
- **Circuit Breakers & Graceful Degradation:**
  - If a downstream service repeatedly fails beyond a threshold, trip a circuit breaker to reject requests early and protect system health.
  - Provide fallback behavior (serve stale cached content, degrade non-critical UI features, queue requests for later processing).

---

## 2. Idempotency & Duplicate Prevention

- **Idempotency Keys on Mutations:**
  - When communicating with payment processors, SMS/email dispatchers, or stateful external APIs, send an `Idempotency-Key` header (e.g. a deterministic UUID or entity hash).
  - Never blindly retry non-idempotent mutations without an idempotency mechanism, as this leads to duplicate charges or duplicate records.
- **Cross-System Reconciliation:**
  - Design background reconciliation jobs (cron or scheduled tasks) to cross-check local entity states against external system statuses (e.g., verifying subscription or payment status with Stripe).
  - Correct discrepancies and log synchronization anomalies.

---

## 3. Webhook Handling & Ingestion

External webhooks are public endpoints open to the internet and must be hardened defensively:

- **Cryptographic Signature Verification:**
  - Verify incoming webhook signatures (HMAC SHA256) using the raw request body before parsing or processing.
  - Reject requests with invalid or missing signatures with `401 Unauthorized`.
- **Idempotent Webhook Processing:**
  - External providers may deliver webhooks multiple times, out of order, or delayed.
  - Track processed webhook event IDs (`webhook_events` table).
  - If an event ID has already been recorded and processed, return `200 OK` immediately without re-executing side effects.
- **Asynchronous Processing:**
  - Acknowledge webhooks rapidly (`200 OK`) to prevent provider timeout retries.
  - Offload heavy or time-consuming processing to a background job or queue worker.

---

## 4. Observability & Contract Validation

- **Contract Validation on External Responses:**
  - Never assume external APIs always return the expected structure. Validate external response payloads against a schema (e.g. Zod) before reading fields.
  - Gracefully handle unexpected fields or missing optional properties.
- **Logging & Tracing:**
  - Log external request duration, HTTP status, and attempt counts.
  - Redact sensitive API keys, authorization bearer tokens, and customer PII from external request and response logs.
