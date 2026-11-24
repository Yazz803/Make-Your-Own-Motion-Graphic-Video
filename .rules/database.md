# Database Engineering & Data Integrity Standards

## Overview

Treat the database as a primary component of system correctness and reliability. Do not rely exclusively on application-level code to protect data integrity—the database must be the final, immutable authority on relational validity and constraint enforcement.

---

## 1. Data Modeling & Relational Integrity

- **Primary Keys:** Every table must have a clear primary key (`id` with UUID v7 / CUID2 or auto-incrementing bigint).
- **Foreign Key Constraints:**
  - Enforce relational links using explicit foreign key constraints (`REFERENCES other_table(id)`).
  - Explicitly declare referential actions: `ON DELETE RESTRICT` for protected assets, `ON DELETE CASCADE` only where child entities have no standalone domain value.
- **Database-Level Invariants:**
  - Enforce uniqueness via `UNIQUE` constraints / indexes (e.g. `unique(email)`, `unique(user_id, slug)`).
  - Enforce presence via `NOT NULL` columns. Avoid nullable fields unless null has explicit, documented business meaning.
  - Use `CHECK` constraints to restrict invalid numerical ranges (e.g. `amount >= 0`, `status IN (...)`).
- **Auditability & Timestamps:**
  - Every table should include `created_at` (timestamptz default now) and `updated_at` timestamps.
  - Maintain immutable audit logs or event tables for financial, permission, or critical status changes.

---

## 2. Query Optimization & Performance

- **Targeted Indexing:**
  - Index foreign keys used in join operations.
  - Index columns frequently present in `WHERE`, `ORDER BY`, or `GROUP BY` clauses.
  - Use compound indexes aligned with query ordering (leftmost prefix rule).
  - Avoid creating redundant or unused indexes; every index incurs write/update overhead.
- **Eliminate N+1 Queries:**
  - Never execute database queries inside iterating loops.
  - Batch queries using `IN (...)`, relational `JOIN`s, or ORM eager-loading features (e.g. Drizzle relational queries).
- **Bounded Query Results:**
  - Never issue unconstrained `SELECT * FROM table` queries in production.
  - Always apply explicit `LIMIT` and pagination.
  - Select only the necessary columns rather than pulling heavy text/JSON blobs indiscriminately.
- **Analyze Query Plans:**
  - Run `EXPLAIN ANALYZE` on complex queries to detect sequential table scans, slow nested loops, or missing index usage.

---

## 3. Schema Migrations & Zero-Downtime Evolution

- **Safe, Non-Destructive Migrations:**
  - Use the **Expand and Contract** pattern for schema evolutions:
    1. *Expand:* Add new column/table as nullable or with safe defaults.
    2. *Migrate Code:* Deploy application code that reads/writes both old and new columns.
    3. *Backfill:* Safely backfill historical data in bounded background batches.
    4. *Contract:* Remove the old column/table only after code is completely migrated and stabilized.
- **Destructive Operation Safeguards:**
  - Never drop columns, rename active tables, or truncate tables without prior review, verified database backups, and scheduled maintenance procedures.
  - Keep migrations reversible or provide clear roll-forward scripts.
- **Transaction Isolation & Locking:**
  - Understand lock impacts during migrations (e.g., adding an index with `CONCURRENTLY` in PostgreSQL to prevent table read/write locks).
  - Choose appropriate transaction isolation levels (e.g., `READ COMMITTED` vs `SERIALIZABLE`) to balance throughput against phantom reads and serialization anomalies.
- **Connection Pooling & Lifecycle:**
  - Use connection pools appropriately sized for your deployment environment (e.g., PgBouncer or serverless connection proxies).
  - Enforce connection timeouts and query timeouts to prevent rogue queries from starving the pool.
