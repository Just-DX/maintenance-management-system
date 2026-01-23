export const appShellStyles = {
  root: 'flex min-h-svh w-full',
  header:
    'flex h-12 shrink-0 items-center gap-2 border-b bg-background px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 rounded-t-xl',
  headerTrigger: '-ml-1',
  headerSeparator: 'mr-2 data-[orientation=vertical]:h-4',
  headerContent: 'flex flex-1 items-center justify-between',
  content: 'flex flex-1 flex-col',
  main: 'flex flex-1 flex-col gap-4 p-4 pt-0',
} as const
