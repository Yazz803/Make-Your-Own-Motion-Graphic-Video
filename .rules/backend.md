# Backend Engineering & API Design Standards

## Overview

Design backend services around explicit contracts, validated inputs, strictly enforced business rules, predictable error handling, and robust concurrency control. The backend is the ultimate guardian of data integrity and security.

---

## 1. API Design & HTTP Semantics

### Explicit Contracts & Validation
- **Boundary Validation:** Never trust client-provided payloads. Every incoming request (body, query parameters, route params, headers) must be rigorously validated using strict schema validators (e.g. Zod) before reaching business logic.
- **Explicit Request & Response Shapes:** Define clear TypeScript interfaces / schemas for both input and output. Avoid returning unstructured or unpredictable JSON blobs.
- **Resource Limits & Pagination:**
  - Always enforce upper limits on query results (e.g. `limit=50`, max `100`).
  - Provide cursor-based or offset-based pagination on collections to prevent memory exhaustion and database lockups.
- **Backward-Compatible Evolution:**
  - Add fields non-destructively; never rename or remove required fields without a planned migration window.
  - Maintain compatibility across mobile or third-party API clients.

### Proper HTTP Status Codes
Follow standard HTTP semantics accurately:
- `200 OK`: Successful read or update.
- `201 Created`: Successful creation of a new resource (return `Location` header or created object).
- `204 No Content`: Successful deletion or action with no response body.
- `400 Bad Request`: Malformed syntax, invalid JSON, or unparseable input.
- `401 Unauthorized`: Authentication missing, expired, or invalid.
- `403 Forbidden`: Authenticated user lacks permission to access the specified resource.
- `404 Not Found`: Target resource does not exist (or concealed for security).
- `409 Conflict`: Business rule violation, unique constraint collision, or concurrent edit conflict.
- `422 Unprocessable Content`: Semantically invalid data failing business/schema validation.
- `429 Too Many Requests`: Rate limit exceeded.
- `500 Internal Server Error`: Unexpected unhandled server exception.

---

## 2. Business Logic & Invariant Enforcement

- **Layered Invariant Enforcement:** Enforce domain rules in application/domain services, never in presentation controllers or relying on client-side checks.
- **State Transition Integrity:** Prevent illegal entity state transitions (e.g., transitioning an order from `Cancelled` to `Shipped`). Validate preconditions explicitly.
- **Atomic Transactions:** Wrap multi-step mutations that must succeed or fail together inside database transactions. If step 3 of 4 fails, the entire transaction must roll back cleanly.
- **Idempotency for Sensitive Mutations:**
  - Support idempotency keys on payment operations, wallet deductions, or critical creations vulnerable to duplicate execution due to retries or network blips.
  - Record processed idempotency keys to safely return cached responses on repeat deliveries.
- **Concurrency & Race Condition Control:**
  - Prevent double-spending and lost updates using appropriate concurrency patterns:
    - Optimistic concurrency control (version checks: `UPDATE ... WHERE version = x`).
    - Pessimistic locking (`SELECT FOR UPDATE`) for high-contention sequential workflows.
    - Unique constraints at the database level.
- **Explicit Side Effects:** Keep side effects (sending emails, queueing jobs, logging analytics) explicit and isolated. Dispatch notifications only *after* the database transaction has successfully committed.

---

## 3. Error Handling & Diagnostics

### Error Categorization
Distinguish cleanly between error classes:
1. **Client / Validation Errors (4xx):** User input errors, missing parameters, invalid formats.
2. **Authorization Errors (401/403):** Authentication failures, insufficient roles, IDOR violations.
3. **Transient Dependency Errors (502/503/504):** Third-party timeouts, database connection drops.
4. **Unexpected Server Exceptions (500):** Bugs, unhandled exceptions, runtime failures.

### Standardized Error Response Format
Always return structured JSON errors with actionable details:
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The provided payload contains invalid values.",
    "details": [
      {
        "field": "email",
        "issue": "Must be a valid email address"
      }
    ]
  }
}
```

### Safety & Logging Rules
- **Never Swallow Exceptions:** Never catch an error with an empty catch block (`catch (e) {}`). Always log the error or handle it explicitly.
- **No Information Leakage:** Never expose database connection strings, SQL query fragments, internal file paths, or raw stack traces to the client in production responses.
- **Contextual Logging:** Log errors with sufficient diagnostic context (user ID, request path, correlation ID, error name, stack trace) to enable rapid root-cause isolation.
