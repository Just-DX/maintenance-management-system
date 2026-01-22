// Shared domain types
// Add your domain types here

export type ID = string

export interface BaseEntity {
  id: ID
  createdAt: Date
  updatedAt: Date
}
