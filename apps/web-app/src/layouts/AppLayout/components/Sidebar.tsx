import { getInitials, getRoleBadgeClass } from '@justdx/common'
import { cn } from '@justdx/components'
import { Avatar, AvatarFallback } from '@justdx/components/atoms/Avatar'
import { Badge } from '@justdx/components/atoms/Badge'
import { DropdownMenu } from '@justdx/components/atoms/DropdownMenu'
import { Sidebar as SidebarComponent } from '@justdx/components/atoms/Sidebar'
import { APP_CONFIG, NAVIGATION_GROUPS } from '@shared/config/navigation'
import { Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { useSidebar } from '../hooks/useSidebar'

export function Sidebar() {
  const { user, AppLogo, isMobile, role, handleSignOut, checkIsActive } = useSidebar()

  return (
    <SidebarComponent variant="inset">
      <SidebarComponent.Header>
        <SidebarComponent.MenuButton size="lg">
          <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <AppLogo className="size-6" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden!">
            <span className="font-semibold">{APP_CONFIG.name}</span>
            <span className="text-xs text-muted-foreground">{APP_CONFIG.version}</span>
          </div>
        </SidebarComponent.MenuButton>
      </SidebarComponent.Header>

      <SidebarComponent.Content>
        {NAVIGATION_GROUPS.map((group) => (
          <SidebarComponent.Group key={group.label}>
            <SidebarComponent.GroupLabel>{group.label}</SidebarComponent.GroupLabel>
            <SidebarComponent.GroupContent>
              <SidebarComponent.Menu>
                {group.items.map((item) => {
                  const isActive = checkIsActive(item.href)
                  return (
                    <SidebarComponent.MenuItem key={item.label}>
                      <Link to={item.href}>
                        <SidebarComponent.MenuButton isActive={isActive} tooltip={item.label}>
                          <item.icon className="size-4" />
                          <span>{item.label}</span>
                        </SidebarComponent.MenuButton>
                      </Link>
                    </SidebarComponent.MenuItem>
                  )
                })}
              </SidebarComponent.Menu>
            </SidebarComponent.GroupContent>
          </SidebarComponent.Group>
        ))}
      </SidebarComponent.Content>

      <SidebarComponent.Footer>
        <SidebarComponent.Menu>
          <SidebarComponent.MenuItem>
            <DropdownMenu>
              <DropdownMenu.Trigger asChild>
                <SidebarComponent.MenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      'ml-auto text-[10px] h-4 px-1.5 border font-medium group-data-[collapsible=icon]:hidden',
                      getRoleBadgeClass(role)
                    )}
                  >
                    {role}
                  </Badge>
                </SidebarComponent.MenuButton>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu>
          </SidebarComponent.MenuItem>
        </SidebarComponent.Menu>
      </SidebarComponent.Footer>
      <SidebarComponent.Rail />
    </SidebarComponent>
  )
}
