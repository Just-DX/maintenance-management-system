import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty({ format: 'uuid' })
  id!: string

  @ApiProperty()
  email!: string

  @ApiProperty({ nullable: true })
  fullName!: string | null

  @ApiProperty({ nullable: true })
  avatar!: string | null

  @ApiProperty({
    type: () => [UserRoleDto],
  })
  roles!: UserRoleDto[]
}

export class UserRoleDto {
  @ApiProperty({ format: 'uuid' })
  siteId!: string

  @ApiProperty({ format: 'uuid' })
  roleId!: string

  @ApiProperty()
  code!: string

  @ApiProperty()
  name!: string
}
