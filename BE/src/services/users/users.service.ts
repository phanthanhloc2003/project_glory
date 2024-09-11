import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../../entitys/user.entity';
import { RegisterUserBodyDTO, UserNotPass } from '../../types/app.type';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(param: RegisterUserBodyDTO): Promise<UserNotPass> {
    try {
      const { firstName, lastName, password, phone } = param;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.usersRepository.create({
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        phone: phone,
      });
      const newUser = await this.usersRepository.save(user);
      delete newUser.password;
      return newUser;
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw error;
    }
  }

  async findOneByPhone(phone: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({
        where: { phone: phone },
      });
    } catch (error) {
      this.logger.error('Error finding user by phone', error.stack);
      throw error;
    }
  }
}
