import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';
import { User } from '../entitys/user.entity';

export class RegisterUserBodyDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class GetUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10)
  phone: string;
}

export class RefreshTokenBodyDTO {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export interface UserNotPass extends Omit<User, 'password'> {}
