import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { prisma } from '@justdx/database'
import { SupabaseService } from '../../modules/supabase/supabase.service'
import type { AuthenticatedRequest, RequestUser } from '../../modules/auth/auth.types'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const accessToken = this.extractToken(request)

    if (!accessToken) {
      throw new UnauthorizedException('Missing bearer token')
    }

    const supabaseUser = await this.supabaseService.validateAccessToken(accessToken)

    if (!supabaseUser) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
      include: {
        userRoles: { include: { role: true } },
      },
    })

    if (!dbUser) {
      throw new ForbiddenException('User record not found')
    }

    if (!dbUser.isActive || dbUser.isDeleted) {
      throw new ForbiddenException('User is inactive or deleted')
    }

    const roles = dbUser.userRoles?.map(({ siteId, roleId, role }) => ({
      siteId,
      roleId,
      code: role.code,
      name: role.name,
    }))

    const requestUser: RequestUser = {
      id: dbUser.id,
      email: dbUser.email,
      fullName: dbUser.fullName,
      avatar: dbUser.avatar,
      roles: roles ?? [],
      raw: dbUser,
    }

    request.user = requestUser
    return true
  }

  private extractToken(request: AuthenticatedRequest): string | undefined {
    const authHeader = request.headers.authorization
    if (!authHeader) return undefined

    const [scheme, token] = authHeader.split(' ')
    if (scheme !== 'Bearer' || !token) return undefined

    return token
  }
}
