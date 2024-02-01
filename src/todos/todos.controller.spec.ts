/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
            completeAll: jest.fn(),
            removeCompletedTodos: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTodos', () => {
    it('should return an array of todos', async () => {
      const result = [{ id: 'mock_id', title: 'Test Todo' }];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('createTodo', () => {
    it('should create and return the todo', async () => {
      const newTodo = { title: 'New Todo' };
      const result = { id: 'mock_id', ...newTodo };
      jest.spyOn(service, 'create').mockImplementation(async () => result);

      expect(await controller.create(newTodo)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete the todo', async () => {
      const todoId = 'mock_id';
      jest.spyOn(service, 'remove').mockImplementation(async () => {});

      await controller.remove(todoId);
      expect(service.remove).toHaveBeenCalledWith(todoId);
    });
  });

  describe('updateTodo', () => {
    it('should update and return the todo', async () => {
      const todoId = 'mock_id';
      const updateData = { title: 'Updated Todo' };
      const updatedTodo = { id: todoId, ...updateData };
      jest.spyOn(service, 'update').mockImplementation(async () => updatedTodo);

      expect(await controller.update(todoId, updateData)).toBe(updatedTodo);
    });
  });

  describe('completeAll', () => {
    it('should complete all todos', async () => {
      jest.spyOn(service, 'completeAll').mockImplementation(async () => {});

      await controller.completeAll();
      expect(service.completeAll).toHaveBeenCalled();
    });
  });

  describe('removeCompletedTodos', () => {
    it('should remove all completed todos', async () => {
      jest
        .spyOn(service, 'removeCompletedTodos')
        .mockImplementation(async () => {});

      await controller.removeCompletedTodos();
      expect(service.removeCompletedTodos).toHaveBeenCalled();
    });
  });
});
