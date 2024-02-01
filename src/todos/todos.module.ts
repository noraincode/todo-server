import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todos } from './entities/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todos])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
