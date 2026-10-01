import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaModule} from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ParticipationsModule } from './participations/participations.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [PrismaModule, CategoriesModule, UsersModule, ChallengesModule, ParticipationsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
