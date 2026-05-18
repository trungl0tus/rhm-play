import { Controller, Get, Query } from '@nestjs/common';
import { FeedQueryDto } from './dto/feed-query.dto';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeed(@Query() query: FeedQueryDto) {
    return this.feedService.getFeed(query);
  }
}
