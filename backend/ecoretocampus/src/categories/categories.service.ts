import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-categories.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  //Se crea la categoria
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });
  }

  //Traer todas las categorias
  async findAll() {
    return await this.prisma.category.findMany({
      include: {
        challenges: true,
      },
    });
  }

  // Buscar por ID
  async findOne(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
      include: { challenges: true },
    });
  }

  // Eliminar una categoría
  async remove(id: string) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}