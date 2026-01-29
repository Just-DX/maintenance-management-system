# @justdx/components

A comprehensive React component library built for the Maintenance Management System platform. This package provides reusable UI components, utilities, and design system primitives that follow the Atomic Design methodology.

## Architecture

The component library is organized using **Atomic Design** principles:

- **Atoms**: Basic building blocks (buttons, inputs, icons)
- **Molecules**: Simple groups of atoms (page headers, form fields)
- **Organisms**: Complex components made of groups of molecules (app shell, tables)

## Installation

This package is part of the monorepo and should be installed via the workspace:

```json
{
  "dependencies": {
    "@justdx/components": "workspace:*"
  }
}
```

## Usage

### Basic Import

```tsx
import { Button, Card, PageHeader } from '@justdx/components'
```

### CSS Imports

```tsx
import '@justdx/components/globals.css'
```

### Granular Imports

```tsx
// Individual component imports
import { Button } from '@justdx/components/atoms/Button'
import { PageHeader } from '@justdx/components/molecules/PageHeader'
import { AppShell } from '@justdx/components/organisms/AppShell'
```

## Component Categories

### Atoms (40 components)

Basic UI building blocks that cannot be broken down further:

- **Form Controls**: Button, Input, Checkbox, Switch, Select, Textarea, RadioGroup
- **Navigation**: Breadcrumb, Pagination, Tabs
- **Feedback**: Badge, Progress, StatusBadge, PriorityBadge, Skeleton, EmptyState
- **Layout**: Card, Separator, Sidebar, ScrollArea
- **Overlays**: Dialog, AlertDialog, Popover, Tooltip, Sonner
- **Data Display**: Table, Chart, Avatar, Icon, Kbd
- **Interactive**: AutoComplete, MultiSelect, DatePicker, Calendar, FileUpload

### Molecules (6 components)

Groups of atoms functioning together as a unit:

- **PageHeader**: Page titles with actions and breadcrumbs
- **TableToolbar**: Search and filter controls for tables
- **TablePagination**: Pagination controls with page size selection
- **AutoField**: Dynamic form field rendering based on schema
- **ThemeToggle**: Light/dark mode toggle with system preference
- **Attachments**: File upload and display component

### Organisms (4 components)

Complex components made of groups of molecules and atoms:

- **AppShell**: Application layout with sidebar and header
- **PageLayout**: Standard page wrapper with consistent spacing
- **RecordTable**: Full-featured data table with sorting and pagination
- **ClientTable**: Client-side data table with search and filtering

## Features

### Design System Integration

- **Tailwind CSS v4**: CSS-first design tokens
- **shadcn/ui**: High-quality, accessible primitives
- **Radix UI**: Unstyled, accessible component foundations
- **Lucide Icons**: Beautiful, consistent iconography

### Developer Experience

- **TypeScript**: Full type safety and IntelliSense
- **Storybook**: Component documentation and testing
- **ESM**: Modern module format
- **Tree-shaking**: Only import what you need

### Accessibility

- ARIA attributes and keyboard navigation
- Focus management and screen reader support
- High contrast mode support
- Semantic HTML structure

## Development

### Scripts

```bash
# Development
pnpm dev              # Start Storybook development server
pnpm storybook        # Start Storybook (alias for dev)

# Building
pnpm build            # Build components for production
pnpm build-storybook  # Build static Storybook

# Quality
pnpm type-check       # TypeScript type checking
pnpm lint             # ESLint code linting
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Cleanup
pnpm clean            # Remove build artifacts
```

### File Structure

Each component follows a consistent structure:

```
ComponentName/
├── ComponentName.tsx        # Main component implementation
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.constants.ts # Styles and configuration
├── ComponentName.fixtures.ts  # Test data and mock props
├── ComponentName.type.ts     # TypeScript type definitions
└── index.ts                 # Public exports
```

### Adding New Components

1. **Choose the right level**: Determine if your component is an atom, molecule, or organism
2. **Create the folder structure**: Follow the established naming convention (PascalCase)
3. **Implement the component**: Use TypeScript and follow accessibility guidelines
4. **Add stories**: Document usage patterns in Storybook
5. **Export properly**: Add exports to the appropriate index files

### Styling Guidelines

- Use **Tailwind CSS classes** for styling
- Define reusable styles in `.constants.ts` files
- Use **CSS custom properties** for theming
- Follow the established **design tokens** from `@justdx/config`

## Component Exports

### Public API

The main export from `@justdx/components` includes:

```typescript
// All atoms, molecules, and organisms
export * from './atoms'
export * from './molecules'
export * from './organisms'

// Utilities and providers
export * from './hooks'
export * from './providers'
export { cn } from './lib/utils'
export { useSidebar } from './shadcn-primitives/sidebar'
```

### Available Exports

**Utilities:**

- `cn` - className utility function (clsx + twMerge)

**Hooks:**

- `useIsMobile` - Responsive breakpoint detection
- `useSidebar` - Sidebar state management

**Providers:**

- `ThemeProvider` - Dark/light mode theme management

## Peer Dependencies

This package requires these peer dependencies in your application:

- `react`: ^18.3.1 || ^19.0.0
- `react-dom`: ^18.3.1 || ^19.0.0

## Configuration

### Tailwind CSS

The components require Tailwind CSS to be configured in your application. Import the global styles:

```css
@import '@justdx/components/globals.css';
```

### Theme Provider

Wrap your application with the theme provider for dark mode support:

```tsx
import { ThemeProvider } from '@justdx/components'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {/* Your app */}
    </ThemeProvider>
  )
}
```

## Contributing

When contributing to this component library:

1. **Follow the atomic design principles**
2. **Maintain accessibility standards**
3. **Add comprehensive Storybook stories**
4. **Include TypeScript types**
5. **Test across different themes**
6. **Document component APIs**

## Dependencies

### Core Dependencies

- `@radix-ui/*` - Accessible primitive components
- `class-variance-authority` - Component variant management
- `clsx` - Conditional className utility
- `lucide-react` - Icon library
- `next-themes` - Theme management
- `react-hook-form` - Form handling

### Build Dependencies

- `tsup` - TypeScript bundler
- `storybook` - Component documentation
- `tailwindcss` - CSS framework
- `vite` - Build tool and dev server

## License

Private - All rights reserved.
