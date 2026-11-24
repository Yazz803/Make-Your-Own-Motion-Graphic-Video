# Architecture & System Design Standards

## Overview

Maintain explicit responsibilities, cohesive modules, and understandable dependency boundaries. Software systems must be architected for predictability, testability, and graceful evolution over time.

---

## 1. Architectural Model & Layered Boundaries

Adopt a clean, layered architectural boundary model:

$$\text{Presentation} \longrightarrow \text{Application / Use Cases} \longrightarrow \text{Domain} \longrightarrow \text{Infrastructure}$$

```
┌────────────────────────────────────────────────────────┐
│                   Presentation Layer                   │
│   (UI Components, Pages, Route Handlers, Controllers)  │
└───────────────────────────┬────────────────────────────┘
                            │ depends on
                            ▼
┌────────────────────────────────────────────────────────┐
│                Application / Use Cases                 │
│  (Orchestration, Workflows, Transaction Coordination)  │
└───────────────────────────┬────────────────────────────┘
                            │ depends on
                            ▼
┌────────────────────────────────────────────────────────┐
│                      Domain Layer                      │
│     (Business Rules, Invariants, Entities, Enums)      │
└───────────────────────────▲────────────────────────────┘
                            │ referenced by
┌───────────────────────────┴────────────────────────────┐
│                  Infrastructure Layer                  │
│    (Database Repositories, Third-Party APIs, Queues)   │
└────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

1. **Presentation Layer:**
   - Handles UI rendering, user interaction, request parsing, HTTP status codes, and serialization.
   - Does not execute raw business invariants or direct SQL queries.
2. **Application / Use Cases Layer:**
   - Orchestrates multi-step business workflows.
   - Manages transaction lifecycles, dispatches domain operations, and coordinates external notifications.
3. **Domain Layer:**
   - Contains pure business rules, domain invariants, core calculations, and entity schemas.
   - Independent of external frameworks, transport mechanisms, or specific database drivers.
4. **Infrastructure Layer:**
   - Implements data persistence (e.g. Drizzle ORM, PostgreSQL, SQLite, file storage).
   - Manages integrations with third-party APIs (OpenAI, payment gateways, mailers, caches).
   - Keeps infrastructural quirks isolated behind clean domain/application interfaces.

---

## 2. Core Architectural Principles

- **High Cohesion, Low Coupling:** Modules should have a single, well-defined focus. Changes to one module must not cause unexpected cascading breaks across unrelated features.
- **Strict Dependency Direction:** Dependencies must always point inward toward the core business domain. The Domain layer must never import from Presentation or Infrastructure.
- **Stable Module Contracts:** Expose well-defined, strongly typed interfaces. Consumers interact with contracts, not hidden implementation details.
- **Explicit Data Ownership:** Define which module owns which table, entity, or state. Avoid multiple disparate modules writing directly to the same raw database records without ownership boundaries.
- **Backward-Compatible Evolution:** When updating contracts, APIs, or database schemas, ensure changes do not break active clients or in-flight requests.
- **Reject Unjustified Complexity:**
  - Do not introduce microservices when a modular monolith is simpler and more reliable.
  - Do not implement event sourcing, CQRS, or multi-queue architectures without measurable, concrete justification.
  - Choose the simplest architecture that completely fulfills the requirements.

---

## 3. Technical Decision-Making Framework

When evaluating technical solutions, architectural patterns, or technology choices, evaluate against these criteria:

1. **Correctness & Security:** Does the solution guarantee system invariants, tenant safety, and data integrity?
2. **Simplicity & Maintainability:** Can another engineer easily understand, debug, and extend this in 6 months?
3. **Compatibility:** Does it integrate naturally with the existing tech stack, conventions, and dependencies?
4. **Delivery Cost & Risk:** What is the implementation overhead and potential risk to ongoing operations?
5. **Operational Overhead:** What are the requirements for monitoring, logging, and failure recovery?
6. **Ecosystem Maturity:** Is the library/tool widely supported, stable, and actively maintained?
7. **Reversibility (Two-Way Doors):**
   - **Reversible decisions:** Move quickly, experiment with low overhead.
   - **Irreversible decisions (schema migrations, major architectural splits):** Subject to rigorous scrutiny, documented trade-offs, and fallback plans.

### Documenting Significant Decisions (ADRs)
For non-trivial architectural changes, record:
- **Context:** The problem, constraints, and business drivers.
- **Options Considered:** Viable alternatives and their relative strengths/weaknesses.
- **Decision & Rationale:** The chosen approach and why it was selected.
- **Trade-offs & Mitigations:** Known downsides and how they will be handled.
