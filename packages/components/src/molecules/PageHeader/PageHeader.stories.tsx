import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus, Settings } from 'lucide-react'

import { Breadcrumb } from '../../atoms/Breadcrumb'
import { Button } from '../../atoms/Button'
import { PageHeader } from './PageHeader'
import { mockPageHeaderProps, mockPageHeaderWithActions } from './PageHeader.fixtures'

const meta = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  args: mockPageHeaderProps,
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof PageHeader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    title: 'Dashboard',
    description: 'Welcome back! Here is an overview of your maintenance operations.',
  },
}

export const WithActions: Story = {
  args: {
    ...mockPageHeaderWithActions,
  },
  render: (args) => (
    <PageHeader
      {...args}
      actions={
        <>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </>
      }
    />
  ),
}

export const WithBreadcrumb: Story = {
  args: {
    title: 'User Details',
    description: 'View and manage user account information.',
  },
  render: (args) => (
    <PageHeader
      {...args}
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
              <Breadcrumb.Page>John Doe</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      }
      actions={
        <Button variant="outline" size="sm">
          Edit User
        </Button>
      }
    />
  ),
}

export const TitleOnly: Story = {
  args: {
    title: 'Settings',
    description: undefined,
  },
}

export const LongTitle: Story = {
  args: {
    title: 'Maintenance Request #12345 - HVAC System Replacement for Building A',
    description:
      'This is a very long description that might wrap to multiple lines depending on the container width.',
  },
  render: (args) => (
    <PageHeader
      {...args}
      actions={
        <>
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button variant="outline" size="sm">
            Save Draft
          </Button>
          <Button size="sm">Submit</Button>
        </>
      }
    />
  ),
}
