import type { BaseRecord } from './RecordTable.types'

export const isAllSelected = <T extends BaseRecord>(
  data: T[],
  selectedIds: (string | number)[]
) => {
  return data.length > 0 && selectedIds.length === data.length
}

export const getSelectAllIds = <T extends BaseRecord>(allSelected: boolean, data: T[]) => {
  if (allSelected) return []
  return data.map((row) => row.id)
}

export const toggleRowSelection = (selectedIds: (string | number)[], id: string | number) => {
  if (selectedIds.includes(id)) {
    return selectedIds.filter((selectedId) => selectedId !== id)
  }
  return [...selectedIds, id]
}
