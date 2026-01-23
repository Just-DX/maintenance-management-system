import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { TablePagination } from './TablePagination'
import {
  mockTablePaginationEnd,
  mockTablePaginationMiddle,
  mockTablePaginationSmall,
} from './TablePagination.fixtures'

const meta = {
  title: 'Molecules/TablePagination',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    return (
      <TablePagination
        page={page}
        pageSize={pageSize}
        total={100}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    )
  },
}

export const SmallDataset: Story = {
  render: () => {
    const [page, setPage] = useState(mockTablePaginationSmall.page)
    const [pageSize, setPageSize] = useState(mockTablePaginationSmall.pageSize)
    return (
      <TablePagination
        page={page}
        pageSize={pageSize}
        total={mockTablePaginationSmall.total}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    )
  },
}

export const MiddlePage: Story = {
  render: () => {
    const [page, setPage] = useState(mockTablePaginationMiddle.page)
    const [pageSize, setPageSize] = useState(mockTablePaginationMiddle.pageSize)
    return (
      <TablePagination
        page={page}
        pageSize={pageSize}
        total={mockTablePaginationMiddle.total}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    )
  },
}

export const LastPage: Story = {
  render: () => {
    const [page, setPage] = useState(mockTablePaginationEnd.page)
    return (
      <TablePagination
        page={page}
        pageSize={mockTablePaginationEnd.pageSize}
        total={mockTablePaginationEnd.total}
        onPageChange={setPage}
      />
    )
  },
}

export const WithoutPageSize: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <TablePagination
        page={page}
        pageSize={10}
        total={100}
        onPageChange={setPage}
        showPageSize={false}
      />
    )
  },
}

export const WithoutInfo: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    return (
      <TablePagination
        page={page}
        pageSize={pageSize}
        total={100}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        showInfo={false}
      />
    )
  },
}

export const LargeDataset: Story = {
  render: () => {
    const [page, setPage] = useState(50)
    const [pageSize, setPageSize] = useState(20)
    return (
      <TablePagination
        page={page}
        pageSize={pageSize}
        total={5000}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    )
  },
}

export const CustomPageSizes: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(25)
    return (
      <TablePagination
        page={page}
        pageSize={pageSize}
        total={250}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[25, 50, 100, 250]}
      />
    )
  },
}
