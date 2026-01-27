import { ThemeToggle } from '@justdx/components'
import { Button } from '@justdx/components/atoms/Button'
import { AppShell } from '@justdx/components/organisms/AppShell'
import { Bell } from 'lucide-react'

export function Header() {
  return (
    <AppShell.Header>
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="size-4" />
        </Button>
      </div>
    </AppShell.Header>
  )
}
