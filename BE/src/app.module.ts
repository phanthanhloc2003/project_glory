import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthControllerModule } from './controllers/auth/auth.controller.module';
import { UsersControllerModule } from './controllers/users/users.controller.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db/db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersControllerModule,
    AuthControllerModule,
  ],
})
export class AppModule {}
