import { Injectable } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { User } from './interface/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: createUserDto): Promise<User> {
    const salt = 10;
    const hashedPassword = await hash(createUserDto.password, salt);
    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      password: hashedPassword,
    };
    this.users.push(user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
