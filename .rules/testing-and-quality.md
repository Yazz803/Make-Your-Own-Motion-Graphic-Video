# Testing & Code Quality Standards

## Overview

Testing is an integral component of software implementation, not an optional afterthought. High code quality and thorough automated testing provide the confidence needed to deploy, refactor, and evolve software rapidly without fear of regressions.

---

## 1. Testing Pyramid & Verification Levels

Structure automated verification across multiple levels:

```
          / \
         / E2E \       Critical user journeys (Playwright/Cypress)
        /───────\
       / Integr. \     API contracts, database mutations, transactions
      /───────────\
     /    Unit     \   Business logic, pure functions, state machines
    /───────────────\
```

1. **Unit Tests:**
   - Test isolated business rules, domain invariants, mathematical calculations, utility functions, and complex reducers.
   - Fast, deterministic, and free of external network/database dependencies.
2. **Integration Tests:**
   - Verify interaction between code and real infrastructure (e.g. database transactions, repository layers, API route handlers).
   - Test that schema constraints, foreign keys, and rollbacks function as expected under real database conditions.
3. **End-to-End (E2E) Tests:**
   - Exercise critical user journeys (e.g. user authentication, quiz execution, checkout/payment flows).
   - Test happy paths and critical error handling from the user interface down to persistence.
4. **Regression Tests:**
   - Every fixed bug must be accompanied by an automated regression test reproducing the original issue and ensuring it cannot reappear.
5. **Security & Negative Tests:**
   - Explicitly test negative paths: unauthorized access attempts, IDOR attempts, invalid inputs, SQL injection vectors, and boundary values.

---

## 2. Test Quality & Assertions

- **Meaningful Assertions Over Raw Coverage:**
  - High test coverage with weak assertions creates a false sense of security.
  - Assert the exact resulting state, database mutation, emitted event, and response payload, not merely that the function "did not throw".
- **Test Failure & Boundary Paths:**
  - Verify edge cases: empty strings, null/undefined values, zero values, negative numbers, maximum array lengths, and unexpected characters.
- **Deterministic Fixtures & Test Isolation:**
  - Each test must run independently and be able to execute in any random order without depending on state left by a prior test.
  - Use clean test databases, transactional rollbacks between tests, or unique tenant/user IDs per test run.
- **Investigate Failures Thoroughly:**
  - When a test fails, determine the root cause.
  - **Never** weaken assertions, comment out tests, or delete tests to force a passing build.

---

## 3. Code Quality & Maintainability

### Clean Code Principles
- **Clarity Over Cleverness:** Write readable, explicit code that any engineer can understand. Avoid esoteric syntax tricks.
- **Descriptive, Unambiguous Naming:**
  - Variables, functions, and classes must describe their intent and domain meaning.
  - Avoid single-letter variables (except standard loop indices) and vague abbreviations (e.g. `data`, `res`, `temp`, `info`).
- **Single Responsibility Principle (Cohesion):**
  - Functions and modules should do one thing well.
  - Keep functions focused and short. If a function requires deep nesting or hundreds of lines, decompose it into cohesive sub-functions.
- **Low Cognitive Complexity:**
  - Flatten deeply nested conditionals using early returns / guard clauses.
  - Replace magic numbers and arbitrary string literals with named constants or enums.
- **Avoid God Objects & Giant Components:**
  - Decompose large monolithic files into cohesive, single-responsibility modules.
  - Separate business logic and orchestrations from presentation markup.
- **No Drive-by Refactoring:**
  - Do not rewrite or restyle untouched code to satisfy personal aesthetic preferences. Keep changes focused and reviewable.

---

## 4. Pre-Delivery Verification Checklist

Before opening a pull request, committing code, or declaring a task complete, execute the full verification suite:

1. **Type Checking:** Run the TypeScript compiler (`npx tsc --noEmit` or project equivalent) to verify zero type errors.
2. **Linting:** Run linter (`npm run lint` or `eslint`) and resolve all warnings and errors.
3. **Automated Tests:** Run unit and integration tests (`npm run test`) and ensure 100% pass rate.
4. **Production Build:** Execute the build command (`npm run build`) to ensure bundle compilation, tree-shaking, and server components compile without failure.
5. **Diff Review:** Review `git diff` thoroughly to ensure no unintended files, secrets, or temporary debug logs (`console.log`) remain.
