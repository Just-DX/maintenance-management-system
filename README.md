# Maintenance Management System

A modern monorepo for the Maintenance Management System platform.

## Tech Stack

- **Frontend**: React, Next.js, Vite
- **Backend**: NestJS
- **Database**: PostgreSQL + Prisma
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Monorepo**: Turborepo + PNPM

## Getting Started

### Prerequisites

- Node.js 20+
- PNPM 9+
- PostgreSQL

### Installation

```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev

# Build all packages/apps
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Documentation

- Monorepo root README.md (this file) for overall repo structure and conventions.
- Each package/app has its own README.md for specific details.

## Code conventions (high level)

### Web apps (Vite + React - apps/web-\*/)

- Each app has its own entry points and routing:
  - `apps/web-app/src/router.ts`
  - `apps/web-admin/src/router.ts`
- Routes live in `src/routes/` and are composed in `src/router.ts`.
- Page-level code is organized by page folder under `src/pages/`.
- Common per-page folders (create only when needed):

```
src/pages/SomePage/
├── components/     # UI-only building blocks
├── hooks/          # page-scoped state + handlers
├── constants/      # copy/labels/enums
├── config/         # schemas, table columns, page config
└── index.tsx       # main page component
```

- Shared helpers live in `src/shared/` (e.g., `config/`, `hooks/`, `utils/`).
- Domain logic lives in `src/features/` (e.g., work-order schemas/types).

### Landing (Next.js)

Define latest conventions here.

### Backend apps (NestJS - apps/api-\*/)

Define latest conventions here.

### Import aliases

- Web apps use `@*` to map to `src/*` (e.g., `@pages`, `@routes`, `@shared`, `@features`).
- Monorepo packages are imported as `@justdx/*`.

### Backend contracts and database

- OpenAPI-generated types in `packages/types` are the source of truth and should be used to constrain API type-checking.
- Prisma Client should be imported from `@justdx/database` so IntelliSense can recommend model/table names.
- If Prisma types are missing, run `pnpm --filter @justdx/database db:generate` (or `pnpm install` at the repo root, which runs it automatically).

## Repository Structure

```
├── apps/                    # Deployable applications
│   ├── api-admin/          # Admin REST API (NestJS)
│   ├── web-admin/          # Admin dashboard (Vite + React)
│   ├── api-app/            # Main app REST API (NestJS)
│   ├── web-app/            # Main app web portal (Vite + React)
│   ├── landing/            # Marketing site (Next.js)
│   ├── workers/            # Background job processors
│   └── e2e/                # Playwright E2E tests
│
├── packages/                # Shared reusable code
│   ├── common/             # Utilities + Zod schemas
│   ├── components/         # React component library
│   ├── config/             # Shared configs
│   ├── database/           # Prisma schema + client
│   ├── types/              # Generated API types
│   ├── logger/             # Logging utilities
│   └── generators/         # Scaffolding templates
│
├── turbo.json              # Turborepo config
├── pnpm-workspace.yaml     # PNPM workspace config
└── tsconfig.base.json      # Base TypeScript config
```

## License

Private - All rights reserved.
