export const mockPageHeaderProps = {
  title: 'Page Title',
  description: 'A brief description of this page and its purpose.',
}

export const mockPageHeaderWithBreadcrumb = {
  title: 'User Details',
  description: 'View and manage user account information.',
  breadcrumbItems: [
    { label: 'Dashboard', href: '/' },
    { label: 'Users', href: '/users' },
    { label: 'John Doe' },
  ],
}

export const mockPageHeaderWithActions = {
  title: 'Team Members',
  description: 'Manage your organization team members and their permissions.',
}
