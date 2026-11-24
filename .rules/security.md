# Security, Privacy & Access Control Standards

## Overview

Security is a fundamental non-functional requirement that must be designed into every layer from day one. Assume all external input is untrusted and hostile. Protect user data, credentials, and business assets with defense-in-depth engineering.

---

## 1. Authentication & Authorization

- **Object-Level Access Control (IDOR Prevention):**
  - Never assume a user is allowed to access an entity just because they provide its ID (`/api/items/[id]`).
  - Always verify ownership and tenant isolation in the database query:
    ```typescript
    // SAFE: Enforces tenant/user ownership
    const item = await db.query.items.findFirst({
      where: and(eq(items.id, itemId), eq(items.userId, session.userId)),
    });
    ```
- **Principle of Least Privilege:**
  - Grant the minimum permissions necessary for any role, service account, or token.
  - Separate administrative privileges from standard user access.
- **Never Trust Client-Side Claims:**
  - Never trust roles, permissions, or user IDs sent directly in request bodies or client headers.
  - Resolve authentication context solely from verified, cryptographically signed session tokens (JWT or HTTP-only session cookies) validated server-side.
- **Verify Negative Paths:**
  - In automated and manual security testing, verify not only that authorized users succeed, but explicitly that unauthorized and unauthenticated users receive `401 Unauthorized` or `403 Forbidden`.

---

## 2. Injection & Attack Vector Protections

- **SQL Injection Prevention:**
  - Always use parameterized queries or type-safe ORMs (e.g. Drizzle ORM).
  - Never construct SQL queries via raw string interpolation or concatenation with user inputs.
- **Cross-Site Scripting (XSS):**
  - Rely on React/Next.js default escaping for JSX rendering.
  - Sanitize user-generated HTML or rich text using established sanitizers (e.g. DOMPurify) before rendering.
  - Configure strict Content Security Policy (CSP) headers to block unauthorized script execution.
- **Cross-Site Request Forgery (CSRF):**
  - Use `SameSite=Lax` or `SameSite=Strict` flags on all authentication cookies.
  - Implement anti-CSRF tokens for sensitive state-changing mutations where cookie authentication is used.
- **Server-Side Request Forgery (SSRF):**
  - If the application fetches URLs provided by users (e.g. webhooks, metadata scrapers), strictly validate and whitelist protocols (`https:` only).
  - Explicitly block internal, private, loopback, and link-local IP addresses (`127.0.0.1`, `localhost`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254`).

---

## 3. Secret Management & Credential Protection

- **Zero Secrets in Code or Bundles:**
  - Never hardcode passwords, API keys, private certificates, or encryption keys in source code.
  - Load secrets exclusively via environment variables (`process.env`).
  - Keep client environment variables strictly isolated; never prefix sensitive secret keys with client-exposed prefixes (such as `NEXT_PUBLIC_`).
- **Secure Password & Token Storage:**
  - Hash passwords using robust, modern key-derivation functions: `bcrypt` (work factor $\ge 12$) or `argon2id`.
  - Store tokens as salted hashes if they grant persistent access.
  - Enforce secure session termination and token revocation.
- **Encryption Standards:**
  - Require HTTPS / TLS 1.3 for all traffic in transit.
  - Encrypt sensitive data at rest (passwords, tokens, PII, payment info) using industry-standard AES-256-GCM or authenticated encryption.

---

## 4. Abuse Prevention & Supply Chain Security

- **Rate Limiting & Throttling:**
  - Enforce IP and account-based rate limiting on sensitive public endpoints (login, registration, password reset, AI generation, file uploads).
  - Return `429 Too Many Requests` with a `Retry-After` header when thresholds are exceeded.
- **File Upload Security:**
  - Validate file MIME types against actual magic bytes, not just user-supplied file extensions.
  - Enforce strict file size limits.
  - Store uploads in isolated object storage (S3/R2) with randomized keys; never serve uploaded user files directly from an executable application server directory.
- **Dependency & Supply Chain Security:**
  - Routinely audit npm dependencies (`npm audit`).
  - Pin dependency versions and inspect dependencies before adding them to avoid bloated, unmaintained, or malicious packages.
