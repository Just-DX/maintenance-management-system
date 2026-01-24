import { Wrench } from 'lucide-react'

export function LeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
            <Wrench className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-sidebar-foreground">JustMT</span>
        </div>

        <h1 className="text-4xl font-bold text-sidebar-foreground mb-4">
          Maintenance Management,
          <br />
          Simplified.
        </h1>
        <p className="text-lg text-sidebar-foreground/70 max-w-md">
          Track work orders, manage assets, and schedule preventive maintenance across all your
          sites with ease.
        </p>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-foreground font-semibold">1</span>
          </div>
          <p className="text-sidebar-foreground/80">Multi-site asset management</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-foreground font-semibold">2</span>
          </div>
          <p className="text-sidebar-foreground/80">Work order tracking & scheduling</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-foreground font-semibold">3</span>
          </div>
          <p className="text-sidebar-foreground/80">Preventive maintenance automation</p>
        </div>
      </div>
    </div>
  )
}
