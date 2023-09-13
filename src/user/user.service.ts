import { Injectable } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReturnUserDTO } from './dtos/returnUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: createUserDto): Promise<UserEntity> {
    const salt = 10;
    const hashedPassword = await hash(createUserDto.password, salt);
    return this.userRepository.save({
      ...createUserDto,
      typeUser: 1,
      password: hashedPassword,
    });
  }

  async getAllUsers(): Promise<ReturnUserDTO[]> {
    const users: UserEntity[] = await this.userRepository.find();
    const usersDTO = users.map((UserEntity) => new ReturnUserDTO(UserEntity));
    return usersDTO;
  }
}
