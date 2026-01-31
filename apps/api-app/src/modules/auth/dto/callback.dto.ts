import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class AuthCallbackDto {
  @ApiProperty()
  @IsString()
  accessToken!: string

  @ApiProperty({ nullable: true })
  @IsOptional()
  @IsString()
  refreshToken?: string

  @ApiProperty({ nullable: true, description: 'Unix timestamp (seconds)' })
  @IsOptional()
  @IsNumber()
  expiresAt?: number

  @ApiProperty({ nullable: true, description: 'Seconds until expiry' })
  @IsOptional()
  @IsNumber()
  expiresIn?: number
}
