import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Todos } from './todos/entities/todo.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.prod.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 或者根据您的数据库类型调整
        host: configService.get<string>('TIDB_HOST'),
        port: configService.get<number>('TIDB_PORT'),
        username: configService.get<string>('TIDB_USER'),
        password: configService.get<string>('TIDB_PASSWORD'),
        database: configService.get<string>('TIDB_DATABASE'),
        entities: [Todos],
        synchronize: configService.get<boolean>('TIDB_SYNCHRONIZE', false),
        ssl: { true: { rejectUnauthorized: false } },
      }),
      inject: [ConfigService],
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
