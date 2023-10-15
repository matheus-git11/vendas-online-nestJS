import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDTO } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch: boolean = await compare(
      loginDto.password,
      user?.password || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Email ou Senha invalido');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDTO(user),
    };
  }
}