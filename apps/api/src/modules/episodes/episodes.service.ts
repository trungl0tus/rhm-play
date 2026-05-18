import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EpisodesService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const episode = await this.prisma.episode.findUnique({
      where: { id },
      include: {
        series: {
          select: { id: true, title: true, thumbnail: true },
        },
      },
    });

    if (!episode) {
      throw new NotFoundException(`Episode ${id} not found`);
    }

    return episode;
  }
}
