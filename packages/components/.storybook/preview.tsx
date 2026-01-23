import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/styles/globals.css'

const applyTheme = (theme?: string) => {
  if (typeof document === 'undefined') {
    return
  }
  const root = document.documentElement
  const prefersDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolvedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : (theme ?? 'light')

  if (resolvedTheme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// Lightweight toolbar toggle to reduce friction; manual theme testing remains required.
const withTheme: Decorator = (Story, context) => {
  applyTheme(context.globals.theme as string | undefined)
  return <Story />
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'system', title: 'System' },
        ],
      },
    },
  },
  decorators: [withTheme],
}

export default preview
