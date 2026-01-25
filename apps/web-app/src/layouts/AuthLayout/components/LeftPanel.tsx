import { AUTH_LAYOUT_CONTENT } from '@shared/config/auth'

export function LeftPanel() {
  const { logo: Logo, appName, headline, subheadline, features } = AUTH_LAYOUT_CONTENT

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
            <Logo className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-sidebar-foreground">{appName}</span>
        </div>

        <h1 className="text-4xl font-bold text-sidebar-foreground mb-4 whitespace-pre-line">
          {headline}
        </h1>
        <p className="text-lg text-sidebar-foreground/70 max-w-md">{subheadline}</p>
      </div>

      <div className="relative z-10 space-y-6">
        {features.map((feature) => (
          <div key={feature.number} className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-sidebar-accent flex items-center justify-center">
              <span className="text-sidebar-foreground font-semibold">{feature.number}</span>
            </div>
            <p className="text-sidebar-foreground/80">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
