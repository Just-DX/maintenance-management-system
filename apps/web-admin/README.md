# Web Admin

Frontend for the JustMT CMMS admin experience. This app uses TanStack Router and TanStack Query, with page-level folders split into components, hooks, services, constants, and utils to keep UI clean and logic isolated.

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

## Project structure (high level)

- `src/pages/` - page folders and screen-level composition
- `src/routes/` - TanStack Router route definitions
- `src/layouts/` - layout wrappers (App, Auth)
- `src/plugins/` - shared client setups (TanStack Query)
- `src/styles/` - global styles and Tailwind configuration
- `src/assets/` - static assets

## Page folder pattern

Each page follows a structured pattern for maintainability:

```
src/pages/Login/
├── components/     # UI-only building blocks (if needed)
├── hooks/         # page-scoped state + event logic (if needed)
├── services/      # TanStack Query queries/mutations (if needed)
├── constants/     # copy, labels, and enums used by the page (if needed)
├── utils/         # page-scoped helpers (if needed)
├── config/        # page configuration (schemas, validation)
└── index.tsx      # main page component
```

_Note: Only create folders as needed - not every page requires all folders._

## TanStack Query setup

- **Client**: `src/plugins/react-query/client.ts`
- **Provider**: `src/main.tsx` wraps the app with `QueryClientProvider`
- **Usage**: define queries/mutations in page `services/` folders

## Layouts

- `AuthLayout` - for authentication pages
- `AppLayout` - for main application pages with admin navigation

## Scripts

```bash
pnpm --filter web-admin dev         # Start development server (port 3001)
pnpm --filter web-admin build       # Build for production
pnpm --filter web-admin preview     # Preview production build
pnpm --filter web-admin type-check  # Run TypeScript checks
pnpm --filter web-admin lint        # Run ESLint
pnpm --filter web-admin format      # Format code with Prettier
```

## Shared packages

This app leverages monorepo packages:

- `@justdx/components` - shared UI component library
- `@justdx/types` - TypeScript type definitions
- `@justdx/common` - shared utilities and schemas
- `@justdx/config` - shared configuration (Tailwind, ESLint, etc.)

## Admin-specific features

This admin app will handle:

- System configuration and settings
- User management and permissions
- Organization and site administration
- Advanced reporting and analytics
- Asset and equipment management
- Maintenance scheduling and oversight

## Enhancements needed

### 1. Features folder structure

Consider adding a `src/features/` folder for domain-specific logic:

```
src/features/
├── admin/
│   ├── services/    # admin-specific queries
│   ├── hooks/       # admin state management
│   └── types/       # admin-related types
├── users/
│   ├── services/
│   ├── hooks/
│   └── types/
├── organizations/
│   ├── services/
│   ├── hooks/
│   └── types/
└── shared/
    ├── services/api/  # low-level API wrappers
    └── hooks/         # cross-feature hooks
```

### 2. Context providers

Add a `src/context/` folder for app-wide state:

```
src/context/
├── AuthContext/     # admin authentication state
├── AdminContext/    # admin-specific state
├── ThemeContext/    # UI theme management
└── index.ts         # combined providers
```

### 3. Admin-specific enhancements

- Role-based access control (RBAC) system
- Advanced data tables with filtering, sorting, and pagination
- Dashboard with charts and metrics
- Bulk operations for data management
- Audit logs and activity tracking
- Export functionality for reports

```

```
