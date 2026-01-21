# Monorepo Architecture Reference

> **Purpose**: A reusable architecture reference for building modern multi-app products in a single monorepo.  
> This document defines repo layout, responsibilities, shared packages, design tokens, build orchestration, and tooling conventions so teams can replicate the setup consistently.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Repository Layout](#repository-layout)
3. [Applications](#applications)
4. [Shared Packages](#shared-packages)
5. [Design System and Styling Tokens](#design-system-and-styling-tokens)
6. [Build and Dev Orchestration](#build-and-dev-orchestration)
7. [API Contracts and Type Safety](#api-contracts-and-type-safety)
8. [Testing Strategy](#testing-strategy)
9. [Docker and Deployment](#docker-and-deployment)
10. [Code Quality Tooling](#code-quality-tooling)
11. [Environment and Secrets](#environment-and-secrets)
12. [Governance and Conventions](#governance-and-conventions)
13. [File and Folder Naming Rules](#file-and-folder-naming-rules-modern-architecture-standard)

---

## System Overview

### Tech Stack (reference)

> Replace versions to match your project. Keep this list updated.

- **Frontend**: React, Next.js, Vite
- **Backend**: NestJS (or equivalent Node framework)
- **Database**: PostgreSQL + Prisma
- **API contract**: OpenAPI 3.x with TypeScript generation
- **Styling**: Tailwind CSS v4 (CSS-first tokens)
- **Language**: TypeScript
- **Monorepo orchestration**: Turborepo
- **Package manager**: PNPM workspace
- **Node version**: 20+

### Architecture Pattern

- **Monorepo Type**: PNPM workspace-based monorepo
- **Build orchestration**: Turborepo (parallel tasks + caching)
- **Code organization**: “Clean Architecture” boundaries:
  - Apps own **delivery + wiring** (controllers/routes, pages, framework setup)
  - Packages own **reusable logic** (domain, utilities, design system, contracts)

**Recommendations**

- Use **structured logging** from day 1 (JSON logs, correlation IDs).
- Add basic **health endpoints** for APIs/workers (`/healthz`, `/readyz`) early.
- Keep “domain logic” outside app frameworks whenever possible (`packages/common`).

---

## Repository Layout

### Top-level structure

```
your-project/
├── apps/                      # Deployable applications
│   ├── api-admin/            # Admin REST API (NestJS)
│   ├── web-admin/            # Admin dashboard (Vite + React)
│   ├── api-app/              # Main app REST API (NestJS)
│   ├── web-app/              # Main app web portal (Vite + React)
│   ├── landing/              # Marketing site (Next.js)
│   ├── workers/              # Background job processors
│   └── e2e/                  # Playwright E2E tests
│
├── packages/                  # Shared reusable code
│   ├── common/               # Utilities + schemas (Zod, helpers)
│   ├── components/           # React component library
│   ├── config/               # Shared configs (ESLint/Prettier/TS/Tailwind/env)
│   ├── database/             # Prisma schema + client wrapper
│   ├── types/                # Generated API types + shared domain types
│   ├── logger/               # Logging utilities
│   └── generators/           # Scaffolding (turbo generators / plop)
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── README.md                 # Setup + onboarding guide
└── ARCHITECTURE.md           # This document
```

### Naming conventions

- Apps:
  - `api-*` = backend API services
  - `web-*` = frontend apps
  - `workers` = async jobs
- Packages:
  - `common`, `types`, `database` should be framework-agnostic
  - `components` is React-specific
  - `config` is internal tooling

**Recommendations**

- Add `scripts/` at root for shared automation (`seed`, `check-contrast`, `generate-types`).
- Consider `infra/` if you keep Terraform, Helm, or deployment manifests.

---

## Applications

> Each app is independently deployable and depends on shared packages via `workspace:*`.

### 1) Admin API — `apps/api-admin`

**Role**: Admin-only REST API (users, billing, moderation, system configuration).  
**Responsibilities**:

- Staff auth + RBAC
- Audit logs for admin actions
- OpenAPI generation for types/client generation

**Recommendations**

- Add a dedicated `AdminGuard` + role decorator.
- Enforce audit logging on destructive/admin endpoints.

---

### 2) Admin Web — `apps/web-admin`

**Role**: Admin dashboard UI.  
**Responsibilities**:

- Manage and moderate platform state
- Use generated API types (no manual DTO duplication)
- Use shared components + tokens

**Recommendations**

- Separate “admin layout + navigation” into shared organisms in `packages/components` if multiple admin UIs exist.
- Prefer a typed API client layer over scattered `axios` calls.

---

### 3) Main App API — `apps/api-app`

**Role**: Core product API.  
**Responsibilities**:

- Public/authenticated endpoints
- Rate limiting + abuse prevention
- OpenAPI generation

**Recommendations**

- Standardize error shape (code, message, details) for all endpoints.
- Add rate limiting and request size limits early.

---

### 4) Main App Web — `apps/web-app`

**Role**: Main product UI.  
**Responsibilities**:

- Authentication and core workflows
- Uses `@justdx/types` for API request/response typing
- Uses shared component system + tokens

**Recommendations**

- Maintain a single “API client” module per app to centralize base URL, auth headers, retries.
- Prefer feature folders (e.g. `src/features/billing/*`) to avoid a flat `components/` sprawl.

---

### 5) Landing — `apps/landing`

**Role**: Marketing site (SEO, pricing, docs, conversion).  
**Responsibilities**:

- Performance + SEO
- Content pages
- Signup redirects / marketing funnel

**Recommendations**

- Keep landing dependencies minimal and avoid coupling to app internals.
- Share design tokens and components when helpful, but don’t block landing deployment on app complexity.

---

### 6) Workers — `apps/workers`

**Role**: Background processing.  
**Responsibilities**:

- Queue consumers (emails, AI jobs, analytics, scheduled tasks)
- Retry + idempotency
- Dead-letter handling

**Recommendations**

- Implement idempotency keys per job type.
- Add a “job status” table or event log for observability/debugging.
- Use separate queues by workload class (cpu-heavy vs latency-sensitive).

---

### 7) E2E — `apps/e2e`

**Role**: End-to-end test suite (Playwright).  
**Responsibilities**:

- Critical user flows across web + api (+ workers where possible)
- Stable fixtures and deterministic seeding

**Recommendations**

- Run fast “smoke E2E” on PRs and full E2E nightly.
- Seed via API or DB scripts to reduce flakiness and runtime.

---

## Shared Packages

### 1) `packages/common`

**Role**: Framework-agnostic logic:

- utilities, helpers
- schemas (Zod recommended)
- shared validation and type inference

**Rules**

- No React / no NestJS imports
- Keep dependencies minimal
- Isolate Node-only utilities if the package is also used in web

**Recommendations**

- Prefer Zod schemas + `.parse()` at boundaries.
- Avoid lodash deep imports in ESM unless configured correctly (or use native alternatives).

---

### 2) `packages/components`

**Role**: Shared React component library.  
**Typical contents**:

- atoms/molecules/organisms (optional)
- shadcn-compatible primitives (optional)
- `globals.css` (imports tokens)

**Recommendations**

- Enforce accessibility baseline (focus states, aria).
- Add Storybook + Chromatic only if you will actually maintain visual tests.

---

### 3) `packages/config`

**Role**: Shared internal tooling config:

- ESLint flat configs
- Prettier presets
- TS base configs
- Tailwind tokens
- env schema helpers

**Rules**

- Must be `private: true`

**Recommendations**

- Add consistent `lint`, `type-check`, `format:check` scripts here and reuse everywhere.

---

### 4) `packages/database`

**Role**: Prisma schema, migrations, client wrapper.  
**Rules**

- Single owner of migrations
- Only expose safe DB access patterns

**Recommendations**

- Export a `getPrisma()` factory for serverless environments (avoid singleton pitfalls).
- Keep seeding deterministic and environment-aware.

---

### 5) `packages/types`

**Role**:

- Generated API types (OpenAPI → TS)
- Shared domain enums/constants
- Type utilities

**Recommendations**

- Keep runtime code out of this package; it should be “types-only” where possible.
- Generate into `src/generated/*` and do not manually edit generated files.

---

### 6) `packages/logger`

**Role**: Standardized logging for APIs/workers.

**Recommendations**

- Always log with context: `requestId`, `userId`, `jobId`, `service`, `env`.
- Use pretty logging only in dev; keep JSON in prod.

---

### 7) `packages/generators`

**Role**: Scaffolding templates and scripts.

**Recommendations**

- Provide generators for:
  - new app / new package
  - new Nest module
  - new component
  - new schema
- Generators should include config wiring to prevent drift.

---

## Design System and Styling Tokens

### Tailwind v4 tokens (CSS-first)

**Source of truth**

- `packages/config/src/tailwind/base.css`

**Principles**

- semantic tokens (`--background`, `--primary`)
- dark mode via `.dark`
- foreground pairing for accessibility
- OKLCH colors

**Recommendations**

- Add:
  - typography scale tokens (text sizes, line heights)
  - spacing scale tokens (semantic spacing + container padding)
  - motion tokens (durations + easing)
  - z-index system
  - component tokens (button height, input padding, card padding)
- Add an optional contrast check script in CI if accessibility is a priority.

---

## Build and Dev Orchestration

### PNPM workspace

`pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Turborepo

**Recommendations**

- Cache build artifacts for packages and apps.
- Do not cache stateful commands:
  - migrations, seeds, database reset
- Ensure outputs match frameworks:
  - Vite: `dist/**`
  - Next: `.next/**`

---

## API Contracts and Type Safety

### Recommended: OpenAPI-first pipeline

1. APIs define DTOs + OpenAPI metadata
2. APIs export OpenAPI JSON deterministically (build step or dev endpoint)
3. `packages/types` generates TS types
4. Web apps import from `@justdx/types` only

**Recommendations**

- Consider generating a typed client (not just types) using tools like `orval` or `openapi-fetch`.
- Standardize error responses and pagination shapes across all APIs.

---

## Testing Strategy

### Layers

| Layer             | Tooling               | Where           |
| ----------------- | --------------------- | --------------- |
| Unit              | Vitest/Jest           | per package/app |
| Integration       | Jest + Supertest      | API apps        |
| Component         | Testing Library       | components      |
| Visual (optional) | Storybook + Chromatic | components      |
| E2E               | Playwright            | apps/e2e        |

**Recommendations**

- Define a test DB strategy: local docker Postgres, CI ephemeral DB, or schema-per-run.
- Keep E2E focused on critical paths; avoid testing everything via E2E.

---

## Docker and Deployment

### Principle

- Each app deploys separately (its own image)

**Recommendations**

- Use workspace pruning (`pnpm deploy`) or equivalent prune strategy.
- Multi-stage builds: install → build → prune → runtime.
- Add health checks in Docker and orchestrators.

---

## Code Quality Tooling

### ESLint (flat config)

- Shared presets in `packages/config`
- Imported into each workspace

### Prettier

- Shared preset config
- `format:check` in CI

### TypeScript

- Base config in `packages/config`
- Per-app overrides only when required (module type, target)

**Recommendations**

- Add CI checks:
  - `pnpm lint`
  - `pnpm type-check`
  - `pnpm test`
  - `pnpm build`
- Consider `changesets` if you plan to publish internal packages.

---

## Environment and Secrets

### Rules

- Never commit secrets
- Provide `.env.example`
- Validate env at startup

**Recommendations**

- Use Zod env schemas per app:
  - fail fast on boot
  - avoid runtime “undefined env” bugs
- Keep a consistent naming convention:
  - `APP_*` for web
  - `API_*` for backend
  - `WORKER_*` for workers

---

## Governance and Conventions

### Dependency boundaries

- Apps can depend on packages
- Packages should not depend on apps

**Hard rules**

- `database` does not import app code
- `types` stays types-only (avoid runtime)
- `common` stays framework-agnostic

### Workspace dependency protocol

Always use `workspace:*`:

```json
{
  "dependencies": {
    "@justdx/common": "workspace:*",
    "@justdx/types": "workspace:*"
  }
}
```

### Publish safety

Mark internal-only packages as private:

- `config`, `generators` → `private: true`
- `logger` → private unless intentionally shared
- `components/common` → publishable only if intended

**Recommendations**

- Create a short “architecture lint” checklist for PR reviews:
  - Are boundaries respected?
  - Is contract typing used correctly?
  - Did we add new env vars with schema updates?

---

## File and Folder Naming Rules (Modern Architecture Standard)

This section defines **mandatory naming conventions** to ensure consistency, scalability, and readability across all applications and packages in the monorepo.

These rules are optimized for:

- Large teams
- Long-lived codebases
- TypeScript + React + NestJS ecosystems
- Clean Architecture and feature-based design

---

### General Rules (Global)

**Applies to all apps and packages**

| Item             | Rule                              |
| ---------------- | --------------------------------- |
| Folder names     | **kebab-case**                    |
| File names       | **kebab-case**                    |
| TypeScript files | `*.ts`, `*.tsx`                   |
| Test files       | `*.test.ts`, `*.test.tsx`         |
| Storybook files  | `*.stories.tsx`                   |
| Index files      | `index.ts` only (no logic)        |
| Barrel exports   | Allowed but shallow (1 level max) |

✅ **Good**

```
user-profile/
billing-service/
create-user.dto.ts
use-auth.ts
button.test.tsx
```

❌ **Avoid**

```
UserProfile/
billingService/
createUserDTO.ts
authHook.ts
index.tsx (with logic)
```

---

### Folder Responsibility Rule

> **A folder must have exactly one responsibility.**

If a folder name needs “and”, “misc”, or “utils”, it’s usually a smell.

✅ **Good**

```
users/
auth/
billing/
notifications/
```

❌ **Avoid**

```
helpers/
shared/
common-utils/
misc/
```

---

### App-Level Structure Rules

Each app should follow a **predictable structure**, even if some folders are empty initially.

#### Backend App (NestJS example)

```
apps/api-app/src/
├── app.module.ts
├── main.ts
│
├── modules/              # Feature modules
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── users.repository.ts
│   │
│   └── billing/
│
├── infrastructure/       # External services & adapters
│   ├── database/
│   ├── redis/
│   ├── mailer/
│   └── http/
│
├── common/               # App-specific shared code
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   └── decorators/
│
└── config/               # App configuration
    ├── env.ts
    └── app.config.ts
```

**Rules**

- `modules/` = business features
- `infrastructure/` = external systems
- `common/` = app-scoped cross-cutting concerns
- No feature logic in `main.ts`

---

#### Frontend App Structure Rules (React / Vite / Next.js)

Prefer **feature-based architecture**, not type-based.

```
apps/web-app/src/
├── app/                  # App bootstrap (providers, router)
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.ts
│   │   ├── schemas.ts
│   │   └── index.ts
│   │
│   ├── billing/
│   └── profile/
│
├── shared/
│   ├── ui/               # Thin wrappers around @justdx/components
│   ├── hooks/
│   ├── utils/
│   └── constants/
│
├── assets/
│   ├── images/
│   └── icons/
│
└── styles/
    └── globals.css
```

**Rules**

- `features/` owns business logic
- `shared/` is app-specific (NOT reusable across apps)
- API calls live near features, not globally
- Avoid giant `components/` folders

---

### Shared Packages Rules (`packages/*`)

#### `packages/common`

```
packages/common/src/
├── schemas/
│   ├── user.schema.ts
│   └── billing.schema.ts
│
├── utils/
│   ├── date.ts
│   └── string.ts
│
├── domain/
│   ├── user.ts
│   └── billing.ts
│
└── index.ts
```

**Rules**

- No framework imports (React, NestJS)
- Domain concepts go in `domain/`
- Validation goes in `schemas/`

---

#### `packages/components`

```
packages/components/src/
├── atoms/
│   └── button/
│       ├── button.tsx
│       ├── button.test.tsx
│       └── index.ts
│
├── molecules/
├── organisms/
├── hooks/
├── styles/
│   └── globals.css
└── index.ts
```

**Rules**

- Component folder name = component name (kebab-case)
- One component per folder
- No business logic

---

### File Naming Patterns (Required)

| File Type       | Pattern                 |
| --------------- | ----------------------- |
| React component | `component-name.tsx`    |
| Hook            | `use-feature.ts`        |
| DTO             | `create-entity.dto.ts`  |
| Schema (Zod)    | `entity.schema.ts`      |
| Service         | `feature.service.ts`    |
| Controller      | `feature.controller.ts` |
| Repository      | `feature.repository.ts` |
| Test            | `*.test.ts(x)`          |

---

### Index File Rule

`index.ts` is **export-only**.

✅ **Allowed**

```ts
export * from "./user.schema";
export * from "./billing.schema";
```

❌ **Forbidden**

```ts
const value = computeSomething();
export default value;
```

---

### Import Rules

**Always prefer relative imports inside a feature**  
**Prefer absolute imports across layers**

✅ **Good**

```ts
import { CreateUserSchema } from "./schemas/create-user.schema";
import { logger } from "@justdx/logger";
```

❌ **Avoid**

```ts
import { CreateUserSchema } from "../../../schemas/create-user.schema";
```

---

### Test and Spec Placement Rules

- Tests live **next to the code**
- No global `__tests__` folders

```
users.service.ts
users.service.test.ts
```

---

### Folder Evolution Rule

If a folder grows beyond **7–10 files**, split it.

Example:

```
users/
├── controllers/
├── services/
├── repositories/
└── dto/
```

---

### Enforcement Recommendations

- Add ESLint checks for naming and module boundaries where possible.
- Use generators (`packages/generators`) to scaffold features/modules/components consistently.
- Reject PRs that violate naming rules to prevent drift.

---

**Document Version**: 1.2  
**Last Updated**: 2026-01-21  
**Owner**: Engineering Team
