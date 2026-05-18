import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeriesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.series.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { episodes: true } },
      },
    });
  }

  async findOne(id: string) {
    const series = await this.prisma.series.findUnique({
      where: { id },
      include: {
        episodes: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
            isFree: true,
            videoUrl: true,
          },
        },
      },
    });

    if (!series) {
      throw new NotFoundException(`Series ${id} not found`);
    }

    return series;
  }
}
