import { AppShell } from '@justdx/components/organisms/AppShell'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell defaultSidebarOpen sidebar={<Sidebar />} header={<Header />}>
      <div className="p-6">
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          {children}
        </div>
      </div>
    </AppShell>
  )
}
