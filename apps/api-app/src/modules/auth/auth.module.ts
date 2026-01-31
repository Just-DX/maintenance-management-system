import { SupabaseService } from '@modules/supabase/supabase.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserRepository } from './repositories/auth.repository'

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [SupabaseService, AuthService, UserRepository],
  exports: [SupabaseService, UserRepository],
})
export class AuthModule {}
