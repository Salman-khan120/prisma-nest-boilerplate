import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import {
  JwtPayload,
  UserIntoRoleBasedGuard,
} from '../utils/types/common.types';

config();

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServ: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async validateUserByJwt(payload: JwtPayload) {
    try {
      const email = payload?.email;
      if (!email) return null;

      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      Logger.log('User = > ', user);
      if (!user) return null;

      const returnUser: UserIntoRoleBasedGuard = {
        name: user.name,
        email: user.email,
        id: user.id,
        role: user.role,
        status: user.status,
      };
      return returnUser;
    } catch (error) {
      Logger.error('Error occurred in validating user = > ', error.message);
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password }: LoginDto = loginDto;
      Logger.log('Email - password', { email, password });

      const user = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (!user) throw new BadRequestException('user cannot be found');

      const isMatch = await bcrypt.compare(password, user.password);
      Logger.log('Matched password=> ', isMatch);
      if (!isMatch) throw new BadRequestException('password do not match');

      const payload: JwtPayload = { email };
      const token = this.jwtServ.sign(payload);
      Logger.log('Token=>', token);
      delete user.password;
      return { user, token };
    } catch (error) {
      Logger.log('Error =>', error.message);
      throw error;
    }
  }
}
