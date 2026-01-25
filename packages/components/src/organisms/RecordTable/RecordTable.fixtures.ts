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
