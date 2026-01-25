import { Badge } from '@justdx/components/atoms/Badge'
import { Breadcrumb } from '@justdx/components/atoms/Breadcrumb'
import { Button } from '@justdx/components/atoms/Button'
import { InputSearch } from '@justdx/components/atoms/InputGroup'
import { Kbd } from '@justdx/components/atoms/Kbd'
import { AppShell } from '@justdx/components/organisms/AppShell'
import { Bell, Moon } from 'lucide-react'

export function Header() {
  return (
    <AppShell.Header>
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Main Campus</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Assets</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>

      {/* Right side controls */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative">
          <InputSearch
            placeholder="Search..."
            className="h-8 w-48 pr-12 text-sm"
            endIcon={
              <Kbd>
                <span className="text-xs">⌘</span>/
              </Kbd>
            }
          />
        </div>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" className="size-8">
          <Moon className="size-4" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative size-8">
          <Bell className="size-4" />
          <Badge className="absolute -right-1 -top-1 h-4 min-w-4 px-1 text-[10px]">50</Badge>
        </Button>
      </div>
    </AppShell.Header>
  )
}
