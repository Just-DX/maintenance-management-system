# Web Admin

Frontend for the JustMT CMMS admin experience. Built with React + Vite, TanStack Router, and TanStack Query. The current codebase is intentionally minimal, with routing and layout scaffolding in place and a small set of pages under `src/pages`.

## Quick start

- Install: `pnpm install`
- Run: `pnpm --filter web-admin dev`

## Tech stack

- React 19 + Vite
- TanStack Router
- TanStack Query
- Tailwind CSS v4
- TypeScript
- Shared monorepo packages (`@justdx/*`)

## Scripts

```bash
pnpm --filter web-admin dev          # Start dev server (port 3001)
pnpm --filter web-admin build        # Build for production
pnpm --filter web-admin preview      # Preview production build
pnpm --filter web-admin type-check   # Run TypeScript checks
pnpm --filter web-admin lint         # Run ESLint
pnpm --filter web-admin format       # Format code with Prettier
```

## Code structure & conventions

### Routing

- Router entry: `src/router.ts`
- Route tree: `src/routes/` (public + app routes and layouts)

### Pages

- Pages live in `src/pages/` (currently `Login`).
- As new pages are added, follow the same folder pattern used in `web-app` (components/hooks/constants/config) when useful, but only create folders when needed.

### Layouts, plugins, styles

- Layouts: `src/layouts/`
- TanStack Query client: `src/plugins/react-query/client.ts`
- Global styles: `src/styles/globals.css`

### Import aliases

- `@*` maps to `src/*` (e.g., `@pages`, `@routes`, `@layouts`, `@plugins`)
- Shared monorepo packages: `@justdx/*`

## Shared packages

- `@justdx/components` - shared UI components
- `@justdx/types` - shared TypeScript types
- `@justdx/common` - shared utilities and schemas
- `@justdx/config` - shared configuration (Tailwind, ESLint, etc.)
