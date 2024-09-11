import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../../entitys/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersServiceModule {}
