import { LeftPanel } from './LeftPanel'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-linear-to-br from-background via-background to-secondary/30">
      <LeftPanel />

      {/* Right Panel - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">{children}</div>
    </div>
  )
}
