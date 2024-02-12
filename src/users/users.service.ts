import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, Role } from './dto/createUser.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password, confirmPassword } = createUserDto;
      const existingUser = await this.prismaService.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new BadRequestException('User already exists.');
      }
      if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      delete createUserDto.confirmPassword;
      const createdUser: User = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
          role: createUserDto.enableSuperAdmin ? Role.ADMIN : Role.USER,
        },
      });

      return createdUser;
    } catch (error) {
      Logger.log('Error =>', error.message);
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await this.prismaService.findAllUsers({
        select: {
          email: true,
          id: true,
          name: true,
          status: true,
          role: true,
          avatar: true,
          address: true,
          jobTitle: true,
          phone: true,
        },
      });
      Logger.log('users = > ', users);
      return users;
    } catch (error) {
      Logger.error('Error in getting users = > ', error.message);
      throw error;
    }
  }
}
