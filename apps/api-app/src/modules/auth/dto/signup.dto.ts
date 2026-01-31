import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class SignupDto {
  @ApiProperty({ example: 'jane.doe@example.com' })
  @IsEmail()
  email!: string

  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @MinLength(2)
  fullName!: string

  @ApiProperty({ minLength: 8, example: 'StrongP@ssw0rd!' })
  @IsString()
  @MinLength(8)
  password!: string

  @ApiProperty({ example: 'janedoe' })
  @IsString()
  @MinLength(3)
  username!: string
}

export class SignupResponseDto {
  @ApiProperty({ description: 'Created user id', format: 'uuid' })
  id!: string

  @ApiProperty({ example: 'jane.doe@example.com' })
  email!: string

  @ApiProperty({ example: 'Jane Doe', nullable: true })
  fullName!: string | null

  @ApiProperty({ example: 'janedoe' })
  username!: string
}
