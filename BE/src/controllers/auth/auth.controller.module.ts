import { Module } from '@nestjs/common';
import { AuthServiceModule } from '../../services/auth/auth.service.module';
import { AuthController } from './auth.controller';
import { LogoutServiceModule } from '../../services/logout/logout.service.module';

@Module({
  imports: [AuthServiceModule, LogoutServiceModule],
  controllers: [AuthController],
})
export class AuthControllerModule {}
