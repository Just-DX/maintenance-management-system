import { RequestUserRole } from '@modules/auth/auth.types'
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? []

    if (requiredRoles.length === 0) return true

    const request = context.switchToHttp().getRequest()
    const user = request.user
    const siteId = request.headers['x-site-id'] as string | undefined

    const hasRole = user?.roles?.some((role: RequestUserRole) => {
      const siteMatches = siteId ? role.siteId === siteId : true
      return siteMatches && requiredRoles.includes(role.code)
    })

    if (!hasRole) {
      throw new ForbiddenException('Insufficient role')
    }

    return true
  }
}
