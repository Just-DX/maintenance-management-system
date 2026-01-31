import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'
import { UserDto } from './user.dto'

export class SignInDto {
  @ApiProperty({ example: 'jane.doe@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'StrongP@ssw0rd!' })
  @IsString()
  @MinLength(8)
  password!: string
}

export class SignInResponseDto {
  @ApiProperty({ type: () => UserDto })
  user!: UserDto

  @ApiProperty({
    nullable: true,
    description: 'Unix timestamp (seconds) when the access token expires',
  })
  sessionExpiresAt!: number | null
}

export class SignOutResponseDto {
  @ApiProperty({ example: true })
  success!: boolean
}
