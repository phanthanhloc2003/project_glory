import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from '../../strategys/local.strategy';
import { UsersServiceModule } from '../users/users.service.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../strategys/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersServiceModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('KEY_ACCESS_TOKEN'),
        signOptions: {
          expiresIn: configService.get<string>('TIME_ACCESS_TOKEN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthServiceModule {}
