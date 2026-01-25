/**
 * Get role badge class
 */
export function getRoleBadgeClass(role: string): string {
  switch (role) {
    case 'admin':
      return 'bg-primary text-primary-foreground'
    case 'user':
      return 'bg-secondary text-secondary-foreground'
    default:
      return 'bg-muted text-muted-foreground'
  }
}
