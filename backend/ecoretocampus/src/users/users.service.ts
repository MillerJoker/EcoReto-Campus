import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: { participations: true },
    });
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { participations: true },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}