import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Home } from 'lucide-react'
import { useState } from 'react'

import { Button } from '../../atoms/Button'
import { Sidebar } from '../../atoms/Sidebar'
import { AppShell } from './AppShell'
import { mockAppShellProps, mockNavigationItems } from './AppShell.fixtures'

const meta = {
  title: 'Organisms/AppShell',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// Demo sidebar component
const DemoSidebar = () => (
  <Sidebar variant="inset">
    <Sidebar.Header>
      <Sidebar.MenuButton size="lg">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Home className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden!">
          <span className="font-semibold">{mockAppShellProps.appName}</span>
          <span className="text-xs text-muted-foreground">v1.0.0</span>
        </div>
      </Sidebar.MenuButton>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
        <Sidebar.GroupContent>
          <Sidebar.Menu>
            {mockNavigationItems.map((item) => (
              <Sidebar.MenuItem key={item.label}>
                <Sidebar.MenuButton isActive={item.isActive} tooltip={item.label}>
                  <item.icon className="size-4" />
                  <span>{item.label}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            ))}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Sidebar.MenuButton tooltip={mockAppShellProps.user.name}>
            <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {mockAppShellProps.user.avatar}
            </div>
            <span>{mockAppShellProps.user.name}</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Footer>
    <Sidebar.Rail />
  </Sidebar>
)

// Demo header component
const DemoHeader = () => (
  <AppShell.Header>
    <div className="flex items-center gap-2">
      <h1 className="text-lg font-semibold">Dashboard</h1>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon">
        <Bell className="size-4" />
      </Button>
    </div>
  </AppShell.Header>
)

// Demo content
const DemoContent = () => (
  <div className="p-6">
    <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
      Main content area
    </div>
  </div>
)

export const Default: Story = {
  render: () => (
    <AppShell defaultSidebarOpen sidebar={<DemoSidebar />} header={<DemoHeader />}>
      <DemoContent />
    </AppShell>
  ),
}

export const CollapsedSidebar: Story = {
  render: () => (
    <AppShell defaultSidebarOpen={false} sidebar={<DemoSidebar />} header={<DemoHeader />}>
      <DemoContent />
    </AppShell>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-1">
          <AppShell
            sidebarOpen={open}
            onSidebarOpenChange={setOpen}
            sidebar={<DemoSidebar />}
            header={<DemoHeader />}
          >
            <DemoContent />
          </AppShell>
        </div>
      </div>
    )
  },
}

export const WithoutHeader: Story = {
  render: () => (
    <AppShell sidebar={<DemoSidebar />}>
      <DemoContent />
    </AppShell>
  ),
}

export const RichContent: Story = {
  render: () => (
    <AppShell sidebar={<DemoSidebar />} header={<DemoHeader />}>
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg border bg-card p-4">
              <div className="text-sm text-muted-foreground">Card {i}</div>
              <div className="text-2xl font-bold">{i * 100}</div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Main Section</h2>
          <p className="text-muted-foreground">
            This demonstrates how content flows within the AppShell layout. The sidebar can be
            collapsed to give more room for content.
          </p>
        </div>
      </div>
    </AppShell>
  ),
}
