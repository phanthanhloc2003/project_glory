import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserNotPass } from '../../types/app.type';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserNotPass | null> {
    try {
      const user = await this.usersService.findOneByPhone(username);
      if (user && bcrypt.compareSync(pass, user?.password)) {
        const result = { ...user };
        delete result.password;
        return result;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  handleLogin(user: UserNotPass) {
    return {
      accessToken: this.jwtService.sign(user),
      refreshToken: this.createRefreshToken(user),
      userInfo: user,
    };
  }

  async handleRefreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<
        UserNotPass & { exp: number; iat: number }
      >(refreshToken, {
        secret: this.configService.get<string>('KEY_REFRESH_TOKEN'),
      });
      const phone = payload.phone;
      const user = await this.usersService.findOneByPhone(phone);
      if (!user) throw new UnauthorizedException();

      const timeRefreshToken = payload?.exp;
      const payloadResponse = { ...user };
      delete payloadResponse.password;

      return {
        accessToken: this.jwtService.sign(payloadResponse),
        refreshToken: this.createRefreshToken(
          payloadResponse,
          timeRefreshToken,
        ),
        userInfo: payloadResponse,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }

  createRefreshToken(payload: UserNotPass, time?: number) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('KEY_REFRESH_TOKEN'),
      expiresIn: time ?? this.configService.get<string>('TIME_REFRESH_TOKEN'),
    });
    return refreshToken;
  }
}
