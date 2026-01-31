import { prisma } from '@justdx/database'

export class UserRepository {
  async findByIdWithRoles(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        userRoles: { include: { role: true } },
      },
    })
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
  }

  async findByUsername(username: string) {
    return prisma.user.findFirst({
      where: { username },
      select: { id: true },
    })
  }

  async upsertUserProfile(payload: {
    id: string
    email: string
    fullName: string
    username: string
    avatar?: string | null
  }) {
    const { id, email, fullName, username, avatar } = payload
    const baseData = {
      email,
      fullName,
      username,
      isActive: true,
      isDeleted: false,
      ...(avatar !== undefined ? { avatar } : {}),
    }

    return prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { id },
        update: baseData,
        create: {
          id,
          ...baseData,
        },
        include: { userRoles: { include: { role: true } } },
      })

      await tx.userProfile.upsert({
        where: { userId: id },
        update: {},
        create: { userId: id },
      })

      return user
    })
  }
}
