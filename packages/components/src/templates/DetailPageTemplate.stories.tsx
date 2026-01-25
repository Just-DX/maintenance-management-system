import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Edit, Home, Trash2 } from 'lucide-react'

import { Badge } from '../atoms/Badge'
import { Breadcrumb } from '../atoms/Breadcrumb'
import { Button } from '../atoms/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../atoms/Card'
import { Separator } from '../atoms/Separator'
import { Sidebar } from '../atoms/Sidebar'
import { Skeleton } from '../atoms/Skeleton'
import { PageHeader } from '../molecules/PageHeader'
import { AppShell } from '../organisms/AppShell'
import { mockAppShellProps, mockNavigationItems } from '../organisms/AppShell/AppShell.fixtures'
import { PageLayout } from '../organisms/PageLayout'
import { mockUsers } from '../organisms/RecordTable/RecordTable.fixtures'

const meta = {
  title: 'Templates/DetailPageTemplate',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// Reusable sidebar for templates
const TemplateSidebar = () => (
  <Sidebar variant="inset">
    <Sidebar.Header>
      <Sidebar.MenuButton size="lg">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Home className="size-4" />
        </div>
        <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden!">
          <span className="font-semibold">{mockAppShellProps.appName}</span>
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
                <Sidebar.MenuButton isActive={item.label === 'Users'} tooltip={item.label}>
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

// Get a sample user for the detail view
const sampleUser = mockUsers[0]!

export const Default: Story = {
  render: () => (
    <AppShell
      sidebar={<TemplateSidebar />}
      header={
        <AppShell.Header>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">User Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="size-4" />
            </Button>
          </div>
        </AppShell.Header>
      }
    >
      <PageLayout
        variant="detail"
        header={
          <PageHeader
            title={sampleUser.name}
            description={sampleUser.email}
            breadcrumb={
              <Breadcrumb>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Dashboard</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/users">Users</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>{sampleUser.name}</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb>
            }
            actions={
              <>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </>
            }
          />
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Basic user account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Full Name</div>
                <div>{sampleUser.name}</div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Email Address</div>
                <div>{sampleUser.email}</div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Member Since</div>
                <div>{sampleUser.createdAt}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role & Permissions</CardTitle>
              <CardDescription>Access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Role</div>
                <div className="mt-1">
                  <Badge variant="outline">{sampleUser.role}</Badge>
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div className="mt-1">
                  <Badge variant={sampleUser.status === 'Active' ? 'default' : 'secondary'}>
                    {sampleUser.status}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium text-muted-foreground">Permissions</div>
                <div className="flex gap-1 mt-1 flex-wrap">
                  <Badge variant="secondary">Read</Badge>
                  <Badge variant="secondary">Write</Badge>
                  <Badge variant="secondary">Delete</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Recent actions performed by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Updated profile settings', time: '2 hours ago' },
                  { action: 'Changed password', time: '1 day ago' },
                  { action: 'Logged in from new device', time: '3 days ago' },
                  { action: 'Created new document', time: '1 week ago' },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <span>{activity.action}</span>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </AppShell>
  ),
}

export const Loading: Story = {
  render: () => (
    <AppShell
      sidebar={<TemplateSidebar />}
      header={
        <AppShell.Header>
          <h1 className="text-lg font-semibold">User Details</h1>
        </AppShell.Header>
      }
    >
      <PageLayout
        variant="detail"
        header={
          <PageHeader
            title="Loading..."
            breadcrumb={
              <Breadcrumb>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Dashboard</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/users">Users</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>...</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb>
            }
          />
        }
      >
        <Skeleton.PageDetail />
      </PageLayout>
    </AppShell>
  ),
}

export const ConstrainedWidth: Story = {
  render: () => (
    <AppShell
      sidebar={<TemplateSidebar />}
      header={
        <AppShell.Header>
          <h1 className="text-lg font-semibold">Settings</h1>
        </AppShell.Header>
      }
    >
      <PageLayout
        variant="detail"
        maxWidth="lg"
        header={
          <PageHeader
            title="Account Settings"
            description="Manage your account preferences and security settings."
            breadcrumb={
              <Breadcrumb>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Dashboard</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator />
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>Settings</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb>
            }
          />
        }
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configure your general application preferences. This section uses constrained width
                for better readability on wide screens.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Manage your password, two-factor authentication, and other security settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Choose what notifications you want to receive and how you want to receive them.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </AppShell>
  ),
}
