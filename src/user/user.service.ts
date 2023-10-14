import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

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

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserById(userId: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }
}
