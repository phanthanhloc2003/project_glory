import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersServiceModule } from '../../services/users/users.service.module';

@Module({
  imports: [UsersServiceModule],
  controllers: [UsersController],
})
export class UsersControllerModule {}
