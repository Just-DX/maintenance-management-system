import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUrl } from 'class-validator'

export class OAuthLoginDto {
  @ApiProperty({
    description: 'Full URL to redirect back after provider login',
    example: 'http://localhost:3002/dashboard',
  })
  @IsString()
  @IsUrl({ require_tld: false })
  redirectTo!: string
}

export class OAuthLoginResponseDto {
  @ApiProperty({ description: 'Provider authorization URL' })
  url!: string
}
