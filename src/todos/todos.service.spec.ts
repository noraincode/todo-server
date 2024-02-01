/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todos } from './entities/todo.entity';
import { Repository } from 'typeorm/repository/Repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import MockDate from 'mockdate';

describe('TodosService', () => {
  let service: TodosService;
  let mockRepository: Partial<Repository<Todos>>;

  beforeEach(async () => {
    jest.resetAllMocks();

    mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };
    MockDate.set('2024-02-01');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todos),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const test_todos = [
        { id: 'mock_id', title: 'Test Todo', isCompleted: false },
      ];
      mockRepository.find.mockReturnValue(test_todos);

      expect(await service.findAll()).toBe(test_todos);
    });
  });

  describe('create', () => {
    it('should add a new todo and return it', async () => {
      const newTodo = { title: 'New Todo' };
      const savedTodo = { id: 'mock_id', ...newTodo };
      mockRepository.create.mockReturnValue(newTodo);
      mockRepository.save.mockResolvedValue(savedTodo);

      expect(await service.create(newTodo)).toEqual(savedTodo);
      expect(mockRepository.create.mock.calls).toMatchSnapshot(
        'calls to create',
      );
      expect(mockRepository.save.mock.calls).toMatchSnapshot('calls to save');
    });
  });

  describe('findOne', () => {
    it('should return a single todo item', async () => {
      const todoId = 'mock_id';
      const foundTodo = { id: todoId, title: 'Found Todo' };
      mockRepository.findOne.mockResolvedValue(foundTodo);

      expect(await service.findOne(todoId)).toEqual(foundTodo);
      expect(mockRepository.findOne.mock.calls).toMatchSnapshot(
        'calls to findOne',
      );
    });
  });

  describe('update', () => {
    it('should update a todo and return the updated todo', async () => {
      const todoId = 'mock_id';
      const updateData = { title: 'Updated Todo' };
      const updatedTodo = { id: todoId, ...updateData };
      mockRepository.findOne.mockResolvedValue(updatedTodo);
      mockRepository.save.mockResolvedValue(updatedTodo);

      expect(await service.update(todoId, updateData)).toEqual(updatedTodo);
      expect(mockRepository.findOne.mock.calls).toMatchSnapshot(
        'calls to findOne',
      );
      expect(mockRepository.save.mock.calls).toMatchSnapshot('calls to save');
    });
  });

  describe('completeAll', () => {
    it('should mark all todos as completed', async () => {
      const test_todos = [
        { id: 'mock_id', title: 'Test Todo', completed: false },
      ];
      mockRepository.find.mockReturnValue(test_todos);
      mockRepository.save.mockResolvedValue({ affected: 1 });

      expect(await service.completeAll()).toEqual({ affected: 1 });
      expect(mockRepository.save.mock.calls).toMatchSnapshot('calls to save');
    });
  });

  describe('removeCompletedTodos', () => {
    it('should remove all completed todos', async () => {
      const test_todos = [
        { id: 'mock_id', title: 'Test Todo', completed: true },
      ];
      mockRepository.find.mockReturnValue(test_todos);
      mockRepository.delete.mockResolvedValue({ affected: 1 }); // 假设删除操作返回受影响的行数

      expect(await service.removeCompletedTodos()).toEqual({ affected: 1 });
      expect(mockRepository.delete.mock.calls).toMatchSnapshot(
        'calls to delete',
      );
    });
  });
});
