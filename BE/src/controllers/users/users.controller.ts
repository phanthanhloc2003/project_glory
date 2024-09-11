import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import {
  GetUserDTO,
  RegisterUserBodyDTO,
  UserNotPass,
} from '../../types/app.type';
import { PublicRouter } from '../../decorators/public-router.decorator';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('sign-in')
  @PublicRouter()
  async register(@Body() body: RegisterUserBodyDTO): Promise<UserNotPass> {
    return await this.usersService.create(body);
  }

  @Get('user-information/:phone')
  async getUser(@Param() param: GetUserDTO): Promise<UserNotPass> {
    const user = await this.usersService.findOneByPhone(param.phone);
    delete user.password;
    return user;
  }
}
