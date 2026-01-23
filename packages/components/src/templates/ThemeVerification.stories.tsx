import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '../atoms/Badge'
import { Card } from '../atoms/Card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../atoms/Table'

const ThemeVerification = () => {
  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Status Colors</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="alert-success p-4 rounded-md border">
            <h3 className="font-semibold flex items-center gap-2">Success Alert</h3>
            <p className="text-sm opacity-90">This is a success message using semantic tokens.</p>
          </div>
          <div className="alert-warning p-4 rounded-md border">
            <h3 className="font-semibold flex items-center gap-2">Warning Alert</h3>
            <p className="text-sm opacity-90">This is a warning message using semantic tokens.</p>
          </div>
          <div className="alert-info p-4 rounded-md border">
            <h3 className="font-semibold flex items-center gap-2">Info Alert</h3>
            <p className="text-sm opacity-90">This is an info message using semantic tokens.</p>
          </div>
          <div className="alert-destructive p-4 rounded-md border">
            <h3 className="font-semibold flex items-center gap-2 text-destructive-foreground">
              Destructive Alert
            </h3>
            <p className="text-sm opacity-90 text-destructive-foreground">
              This is a destructive message using semantic tokens.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Elevations & Surfaces</h2>
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Shadow SM</h3>
            <p className="text-muted-foreground text-sm">Subtle elevation for cards.</p>
          </Card>
          <Card className="p-6 shadow-md">
            <h3 className="font-semibold mb-2">Shadow MD</h3>
            <p className="text-muted-foreground text-sm">
              Medium elevation for popovers/dropdowns.
            </p>
          </Card>
          <Card className="p-6 shadow-lg">
            <h3 className="font-semibold mb-2">Shadow LG</h3>
            <p className="text-muted-foreground text-sm">High elevation for modals.</p>
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Table States</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="table-row-hover cursor-pointer">
                <TableCell>
                  <Badge variant="outline">Pending</Badge>
                </TableCell>
                <TableCell>user@example.com</TableCell>
                <TableCell>$100.00</TableCell>
              </TableRow>
              <TableRow className="table-row-selected">
                <TableCell>
                  <Badge>Paid</Badge>
                </TableCell>
                <TableCell>admin@example.com</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow className="table-row-hover cursor-pointer">
                <TableCell>
                  <Badge variant="destructive">Failed</Badge>
                </TableCell>
                <TableCell>guest@example.com</TableCell>
                <TableCell>$0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Skeleton Shimmer</h2>
        <div className="space-y-3">
          <div className="h-12 w-12 rounded-full skeleton-shimmer bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-62.5 skeleton-shimmer bg-muted rounded" />
            <div className="h-4 w-62.5 skeleton-shimmer bg-muted rounded" />
          </div>
        </div>
      </section>
    </div>
  )
}

const meta = {
  title: 'Templates/ThemeVerification',
  component: ThemeVerification,
} satisfies Meta<typeof ThemeVerification>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
