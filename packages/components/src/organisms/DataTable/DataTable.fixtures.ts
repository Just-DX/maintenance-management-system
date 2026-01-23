// Mock Users Dataset
export interface MockUser {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Inactive' | 'Pending'
  createdAt: string
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-01-25',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Viewer',
    status: 'Pending',
    createdAt: '2024-04-05',
  },
  {
    id: '6',
    name: 'Diana Lee',
    email: 'diana@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-02-14',
  },
  {
    id: '7',
    name: 'Edward Kim',
    email: 'edward@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-03-22',
  },
  {
    id: '8',
    name: 'Fiona Chen',
    email: 'fiona@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2024-01-30',
  },
  {
    id: '9',
    name: 'George Taylor',
    email: 'george@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-04-12',
  },
  {
    id: '10',
    name: 'Hannah Martinez',
    email: 'hannah@example.com',
    role: 'Viewer',
    status: 'Pending',
    createdAt: '2024-02-28',
  },
  {
    id: '11',
    name: 'Ian Thompson',
    email: 'ian@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-03-05',
  },
  {
    id: '12',
    name: 'Julia Anderson',
    email: 'julia@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-04-18',
  },
  {
    id: '13',
    name: 'Kevin White',
    email: 'kevin@example.com',
    role: 'Viewer',
    status: 'Active',
    createdAt: '2024-01-08',
  },
  {
    id: '14',
    name: 'Laura Garcia',
    email: 'laura@example.com',
    role: 'Editor',
    status: 'Inactive',
    createdAt: '2024-02-02',
  },
  {
    id: '15',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Viewer',
    status: 'Active',
    createdAt: '2024-03-15',
  },
  {
    id: '16',
    name: 'Nancy Davis',
    email: 'nancy@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-04-25',
  },
  {
    id: '17',
    name: 'Oscar Miller',
    email: 'oscar@example.com',
    role: 'Editor',
    status: 'Pending',
    createdAt: '2024-01-20',
  },
  {
    id: '18',
    name: 'Patricia Wilson',
    email: 'patricia@example.com',
    role: 'Viewer',
    status: 'Active',
    createdAt: '2024-02-10',
  },
  {
    id: '19',
    name: 'Quinn Johnson',
    email: 'quinn@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-03-28',
  },
  {
    id: '20',
    name: 'Rachel Lee',
    email: 'rachel@example.com',
    role: 'Viewer',
    status: 'Inactive',
    createdAt: '2024-04-08',
  },
  {
    id: '21',
    name: 'Samuel Clark',
    email: 'samuel@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: '2024-01-12',
  },
  {
    id: '22',
    name: 'Tina Roberts',
    email: 'tina@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-02-22',
  },
  {
    id: '23',
    name: 'Ulysses Moore',
    email: 'ulysses@example.com',
    role: 'Viewer',
    status: 'Pending',
    createdAt: '2024-03-18',
  },
  {
    id: '24',
    name: 'Victoria Hall',
    email: 'victoria@example.com',
    role: 'Editor',
    status: 'Active',
    createdAt: '2024-04-02',
  },
  {
    id: '25',
    name: 'William Young',
    email: 'william@example.com',
    role: 'Viewer',
    status: 'Active',
    createdAt: '2024-01-28',
  },
]

// Mock Invoices Dataset
export interface MockInvoice {
  id: string
  invoice: string
  customer: string
  amount: number
  status: 'Paid' | 'Pending' | 'Overdue'
  dueDate: string
}

export const mockInvoices: MockInvoice[] = [
  {
    id: '1',
    invoice: 'INV-001',
    customer: 'Acme Corp',
    amount: 1500.0,
    status: 'Paid',
    dueDate: '2024-01-15',
  },
  {
    id: '2',
    invoice: 'INV-002',
    customer: 'TechStart Inc',
    amount: 2300.5,
    status: 'Pending',
    dueDate: '2024-02-20',
  },
  {
    id: '3',
    invoice: 'INV-003',
    customer: 'Global Systems',
    amount: 890.0,
    status: 'Overdue',
    dueDate: '2024-01-10',
  },
  {
    id: '4',
    invoice: 'INV-004',
    customer: 'DataFlow Ltd',
    amount: 3200.0,
    status: 'Paid',
    dueDate: '2024-02-28',
  },
  {
    id: '5',
    invoice: 'INV-005',
    customer: 'CloudNet Pro',
    amount: 1750.25,
    status: 'Pending',
    dueDate: '2024-03-05',
  },
]

export const mockDataTableProps = {
  pageSize: 10,
  page: 1,
}
