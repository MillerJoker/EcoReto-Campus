import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';

@Injectable()
export class ParticipationsService {
  constructor(private prisma: PrismaService) {}

  async create(createParticipationDto: CreateParticipationDto) {
    return await this.prisma.participation.create({
      data: createParticipationDto,
    });
  }

  async findAll() {
    return await this.prisma.participation.findMany({
      include: {
        user: true,
        challenge: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.participation.findUnique({
      where: { id },
      include: { user: true, challenge: true },
    });
  }

  async remove(id: string) {
    return await this.prisma.participation.delete({
      where: { id },
    });
  }
}