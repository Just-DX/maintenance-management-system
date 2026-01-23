import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'

import { Button } from '../../atoms/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../atoms/Card'
import { Skeleton } from '../../atoms/Skeleton'
import { PageHeader } from '../../molecules/PageHeader'
import { PageLayout } from './PageLayout'

const meta = {
  title: 'Organisms/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'list', 'detail'] },
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    padding: { control: 'select', options: ['none', 'default', 'compact'] },
  },
} satisfies Meta<typeof PageLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    maxWidth: 'full',
  },
  render: (args) => (
    <PageLayout
      {...args}
      header={
        <PageHeader title="Page Title" description="A brief description of the page content." />
      }
    >
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        Main content area
      </div>
    </PageLayout>
  ),
}

export const ListVariant: Story = {
  args: {
    variant: 'list',
  },
  render: (args) => (
    <PageLayout
      {...args}
      header={
        <PageHeader
          title="Users"
          description="Manage your team members and their permissions."
          actions={
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          }
        />
      }
    >
      <div className="rounded-lg border p-4 text-muted-foreground">
        Table / List content would go here
      </div>
    </PageLayout>
  ),
}

export const DetailVariant: Story = {
  args: {
    variant: 'detail',
  },
  render: (args) => (
    <PageLayout
      {...args}
      header={
        <PageHeader
          title="User Details"
          description="View and manage user account information."
          actions={
            <Button variant="outline" size="sm">
              Edit
            </Button>
          }
        />
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">User profile information</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">User permissions and roles</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  ),
}

export const ConstrainedWidth: Story = {
  args: {
    variant: 'detail',
    maxWidth: 'lg',
  },
  render: (args) => (
    <PageLayout
      {...args}
      header={<PageHeader title="Settings" description="Configure your application preferences." />}
    >
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Settings content with constrained width for better readability.
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  ),
}

export const WithLoadingSkeleton: Story = {
  args: {
    variant: 'detail',
  },
  render: (args) => (
    <PageLayout {...args} header={<PageHeader title="Loading..." />}>
      <Skeleton.PageDetail />
    </PageLayout>
  ),
}

export const CompactPadding: Story = {
  args: {
    variant: 'list',
    padding: 'compact',
  },
  render: (args) => (
    <PageLayout
      {...args}
      header={
        <PageHeader
          title="Compact Layout"
          description="Using reduced padding for denser content."
        />
      }
    >
      <div className="rounded-lg border p-4 text-muted-foreground">
        Content with compact padding
      </div>
    </PageLayout>
  ),
}
