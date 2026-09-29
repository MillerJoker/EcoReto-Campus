import { Difficulty } from '@prisma/client';

export class CreateChallengeDto {
  title: string;
  description: string;
  difficulty?: Difficulty; // EASY, MEDIUM, HARD
  pointsReward?: number;
  categoryId: string;
}
