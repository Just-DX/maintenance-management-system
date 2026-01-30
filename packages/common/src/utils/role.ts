export function getRoleBadgeClass(role: string): string {
  switch (role) {
    case 'admin':
      return 'bg-primary text-primary-foreground'
    case 'technician':
      return 'bg-secondary text-secondary-foreground'
    default:
      return 'bg-muted text-muted-foreground'
  }
}
