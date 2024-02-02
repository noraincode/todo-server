import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './nest/interceptors/response.interceptor';
import { HttpExceptionFilter } from './nest/filters/http-exception.filter';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const corsOptions: CorsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  };

  app.enableCors(corsOptions);
  await app.listen(5001);
}
bootstrap();
