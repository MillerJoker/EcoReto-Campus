import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Prueba de Conexión a la Base de Datos', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('Conectandose exitosamente a PostgreSQL', async () => {
    const result = await prismaService.$queryRaw<any[]>`SELECT 1 as connected`;
    
    expect(result).toBeDefined();
    expect(result[0].connected).toEqual(1);
  });
});