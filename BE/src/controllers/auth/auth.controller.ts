import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PublicRouter } from '../../decorators/public-router.decorator';
import { LocalAuthGuard } from '../../guard/local-auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import { LogoutService } from '../../services/logout/logout.service';
import { RefreshTokenBodyDTO } from '../../types/app.type';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private logoutService: LogoutService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @PublicRouter()
  @Post('login')
  async login(@Request() req) {
    return this.authService.handleLogin(req.user);
  }

  @PublicRouter()
  @Put('refresh-token')
  async refreshToken(@Body() body: RefreshTokenBodyDTO) {
    return await this.authService.handleRefreshToken(body.refreshToken);
  }

  @Put('logout')
  async logout(@Request() req: Request) {
    const accessToken = req?.headers['authorization']?.split(' ')[1];
    if (!accessToken) throw new BadRequestException();

    return await this.logoutService.addToken(accessToken);
  }
}
