# Web App

Frontend for the JustMT CMMS end-user experience. Built with React + Vite, TanStack Router, and TanStack Query. The codebase favors page folders with colocated UI and page-scoped config/constants, plus shared helpers under `src/shared` and domain logic under `src/features`.

## Quick start

- Install: `pnpm install`
- Run: `pnpm --filter web-app dev`

## Tech stack

- React 19 + Vite
- TanStack Router
- TanStack Query
- Tailwind CSS v4
- TypeScript
- Shared monorepo packages (`@justdx/*`)

## Scripts

```bash
pnpm --filter web-app dev           # Start dev server (port 3002)
pnpm --filter web-app build         # Build for production
pnpm --filter web-app preview       # Preview production build
pnpm --filter web-app type-check    # Run TypeScript checks
pnpm --filter web-app lint          # Run ESLint
pnpm --filter web-app format        # Format code with Prettier
```

## Code structure & conventions

### Routing

- Router entry: `src/router.ts`
- Route tree: `src/routes/` (public + app routes and layouts)

### Pages

- Pages live in `src/pages/` and are organized by page folder.
- Common per-page folders (use only when needed):

```
src/pages/WorkOrders/
├── components/     # UI-only page building blocks
├── hooks/          # page-scoped state + handlers
├── constants/      # copy/labels/enums for the page
├── config/         # page config (schemas, table columns, etc.)
└── index.tsx       # main page component
```

### Features

- Domain logic lives in `src/features/`.
- Example: `src/features/work-orders/` contains types, schemas, constants, and shared fields for work order flows.

### Shared

- Cross-page helpers live in `src/shared/`:
  - `config/` (navigation/auth config)
  - `hooks/` (shared hooks)
  - `utils/` (shared utilities)

### Layouts, plugins, styles

- Layouts: `src/layouts/`
- TanStack Query client: `src/plugins/react-query/client.ts`
- Global styles: `src/styles/globals.css`

### Import aliases

- `@*` maps to `src/*` (e.g., `@pages`, `@routes`, `@shared`, `@features`)
- Shared monorepo packages: `@justdx/*`

## Shared packages

- `@justdx/components` - shared UI components
- `@justdx/types` - shared TypeScript types
- `@justdx/common` - shared utilities and schemas
- `@justdx/config` - shared configuration (Tailwind, ESLint, etc.)
