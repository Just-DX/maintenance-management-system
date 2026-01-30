import type { User } from '@justdx/database'
import type { Request } from 'express'

export type RequestUserRole = {
  siteId: string
  roleId: string
  code: string
  name: string
}

export type RequestUser = Pick<User, 'id' | 'email' | 'fullName' | 'avatar'> & {
  roles: RequestUserRole[]
  raw: User
}

export type AuthenticatedRequest = Request & { user?: RequestUser }
