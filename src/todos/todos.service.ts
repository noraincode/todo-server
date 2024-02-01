import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todos } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos)
    private todosRepository: Repository<Todos>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    const todo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(todo);
  }

  findAll() {
    return this.todosRepository.find();
  }

  async findOne(id: string) {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    if (updateTodoDto.completed) {
      updateTodoDto.completed_at = new Date();
    }
    this.todosRepository.merge(todo, updateTodoDto);
    return this.todosRepository.save(todo);
  }

  async remove(id: string) {
    const todo = await this.todosRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return this.todosRepository.delete(id);
  }

  async completeAll() {
    const todos = await this.todosRepository.find({
      where: { completed: false },
    });
    if (todos.length === 0) {
      throw new NotFoundException('No uncompleted todos found');
    }

    const now_date = new Date();

    const todos_to_complete = todos.map((todo) => {
      return {
        ...todo,
        completed: true,
        completed_at: now_date,
      };
    });

    return this.todosRepository.save(todos_to_complete);
  }

  async removeCompletedTodos() {
    const completed_todos = await this.todosRepository.find({
      where: { completed: true },
    });
    if (completed_todos.length === 0) {
      throw new NotFoundException('No completed todos found');
    }

    return this.todosRepository.delete({ completed: true });
  }
}
