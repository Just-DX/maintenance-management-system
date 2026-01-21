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
