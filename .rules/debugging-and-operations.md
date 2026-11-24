# Debugging, Incident Response & DevOps Operations

## Overview

Software defects and operational incidents are inevitable in production systems. Managing them requires a calm, disciplined, evidence-based approach: isolate root causes systematically, restore services safely, configure reproducible environments, and maintain accurate operational documentation.

---

## 1. The 8-Step Systematic Debugging Process

When resolving defects, unexpected failures, or test crashes, follow this strict 8-step discipline:

```
[1. Reproduce] ──> [2. Contrast Expected vs Actual] ──> [3. Gather Evidence]
                                                              │
[6. Targeted Correction] <── [5. Isolate Root Cause] <── [4. Testable Hypothesis]
          │
          └──> [7. Add Regression Test] ──> [8. Verify Sibling Paths]
```

1. **Reproduce the Issue:**
   - Create a reliable, minimal reproduction script, test case, or sequence of steps.
   - If unable to reproduce locally, inspect environmental differences (env vars, data volume, node versions).
2. **Identify Expected vs. Actual Behavior:**
   - Clearly define what should have happened versus what actually occurred.
3. **Gather Concrete Evidence:**
   - Inspect application logs, HTTP network traces, database state, stack traces, and system metrics.
   - **Never Fabricate Output:** Never invent log lines, guess command outputs, or assert unverified hypotheses.
4. **Form Testable Hypotheses:**
   - Formulate clear, falsifiable hypotheses regarding the mechanism of failure.
5. **Isolate the Root Cause:**
   - Distinguish symptoms from underlying root causes.
   - Trace the bug back to its origin rather than patching over downstream error symptoms.
6. **Implement Targeted Correction:**
   - Apply the smallest clean, robust fix that directly resolves the root cause without collateral damage.
7. **Add Regression Test Coverage:**
   - Add automated test coverage asserting the exact defect scenario to prevent future regressions.
8. **Verify Related Call Paths:**
   - Inspect adjacent files, sister endpoints, or sibling functions for the same vulnerability or logic flaw.

---

## 2. Production Incident Response & Containment

During active production incidents, follow the prioritized response hierarchy:

1. **Triage & Assess User Impact:**
   - Quantify severity: How many users are affected? Is data integrity or security compromised?
2. **Containment & Mitigation First:**
   - Prioritize stopping active damage (e.g. revoke compromised keys, enable maintenance mode, rollback recent deployment, disable failing feature flag).
   - Restore service availability before conducting in-depth root cause post-mortems.
3. **Preserve Forensic Evidence:**
   - Capture snapshots of error logs, failing request IDs, and database state before restarting or clearing systems.
4. **Data Integrity Verification:**
   - Verify that incomplete or interrupted transactions did not leave orphaned records or corrupted balances. Run reconciliation scripts where necessary.
5. **Post-Mortem & Remediation:**
   - Document timeline, root cause, impact, resolution, and action items to prevent recurrence.

---

## 3. DevOps & Production Readiness

Ensure software is engineered for reliable deployment, operation, and maintenance:

- **Reproducible Builds:**
  - Build artifacts must be strictly reproducible using deterministic lockfiles (`package-lock.json`, `pnpm-lock.yaml`).
  - Keep build scripts clean of hardcoded absolute paths or local environment dependencies.
- **Environment Separation:**
  - Strictly isolate configuration across Development, Staging, and Production environments.
  - Inject secrets and environment variables at runtime via secure secret managers (e.g. Doppler, AWS Secrets Manager, platform environment variables).
- **Health & Readiness Probes:**
  - Expose dedicated health endpoints (`/api/health` or `/api/ready`) that verify critical downstream connections (database connectivity, cache access) for container orchestrators.
- **Graceful Shutdown:**
  - Listen for termination signals (`SIGTERM`, `SIGINT`).
  - Stop accepting new traffic, finish in-flight requests, drain queue workers, and close database connection pools cleanly before process exit.
- **Structured Logging & Observability:**
  - Emit machine-readable structured JSON logs in production (`timestamp`, `level`, `correlationId`, `userId`, `message`, `context`).
  - Track core operational metrics: latency percentiles (p50, p95, p99), error rates, throughput, and CPU/memory utilization.

---

## 4. Actionable & Living Documentation

- **Keep Documentation Synchronized:**
  - Outdated documentation is worse than no documentation. Whenever implementation, architecture, or configuration changes, update documentation immediately.
- **Document Critical Knowledge:**
  - **Setup & Onboarding:** Step-by-step local development setup instructions.
  - **Environment Variables:** Document every required variable, its type, and example values in `.env.example`.
  - **API Contracts:** Document routes, authentication requirements, and payloads.
  - **Architectural Decision Records (ADRs):** Record context and rationale for significant architectural choices.
  - **Operational Runbooks:** Clear instructions for migrations, rollbacks, backups, and disaster recovery.
