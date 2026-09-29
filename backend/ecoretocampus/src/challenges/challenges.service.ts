import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async create(createChallengeDto: CreateChallengeDto) {
    return await this.prisma.challenge.create({
      data: createChallengeDto,
    });
  }

  async findAll() {
    return await this.prisma.challenge.findMany({
      include: {
        category: true, 
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.challenge.findUnique({
      where: { id },
      include: { category: true, participations: true },
    });
  }

  async remove(id: string) {
    return await this.prisma.challenge.delete({
      where: { id },
    });
  }
}