import { AppShell } from '@justdx/components/organisms/AppShell'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell defaultSidebarOpen sidebar={<Sidebar />} header={<Header />}>
      <div className="py-6">{children}</div>
    </AppShell>
  )
}
