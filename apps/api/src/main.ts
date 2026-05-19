import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.setGlobalPrefix('api');

  // Production: lock CORS to a comma-separated allowlist in ALLOWED_ORIGINS.
  // Dev / unset: fall back to `true` which echoes the request origin.
  const allowed = process.env.ALLOWED_ORIGINS?.split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: allowed && allowed.length > 0 ? allowed : true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());

  const port = Number(process.env.PORT ?? 4000);
  // Bind to 0.0.0.0 so platform routers (Railway, Render) can reach us;
  // localhost-only would 502 in production.
  await app.listen(port, '0.0.0.0');
  Logger.log(`RHM Play API running on port ${port} (prefix: /api)`, 'Bootstrap');
}

bootstrap();
