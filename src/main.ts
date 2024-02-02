import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './nest/interceptors/response.interceptor';
import { HttpExceptionFilter } from './nest/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: 'https://todo-app-psi-roan.vercel.app', // Change to http://localhost:3000 while debug
    methods: 'GET,PATCH,POST,DELETE', // 允许的 HTTP 请求方法
    allowedHeaders: 'Content-Type, Accept', // 允许的 HTTP 请求头
    credentials: true, // 是否允许发送 Cookie
  });
  await app.listen(5001);
}
bootstrap();
