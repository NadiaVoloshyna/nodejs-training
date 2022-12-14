import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUsersService')
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const areEqual = await compare(String(password), user.password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async payload(payload) {
    const user = await this.usersService.getUserByEmail(payload.email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(user: User, authLoginDto: AuthLoginDto) {
    const payload = {
      user,
      email: authLoginDto.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    createUserDto.password = await hash(createUserDto.password, 10);

    return this.usersService.create(createUserDto);
  }
}
