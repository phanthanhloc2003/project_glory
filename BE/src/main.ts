import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import { LogoutService } from './services/logout/logout.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector, new LogoutService()));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(4000);
}
bootstrap();
