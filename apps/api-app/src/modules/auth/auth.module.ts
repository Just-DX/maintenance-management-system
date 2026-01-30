import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SupabaseService } from '@modules/supabase/supabase.service'
import { UserRepository } from './repositories/user.repository'

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [SupabaseService, AuthService, UserRepository],
  exports: [SupabaseService, UserRepository],
})
export class AuthModule {}
