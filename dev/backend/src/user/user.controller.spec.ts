import { HttpStatus } from '@nestjs/common';
import { Connection } from 'typeorm';
import { createInMemoryDatabaseConnection } from '../shared/test/create-in-memory-database-connection';
import { CreateUserDTO } from './dto/create-user.dto';

import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;
  let repository: UserRepository;
  let database: Connection;

  const response: any = {
    send: (body?: any) => body,
  };

  beforeAll(async () => {
    database = await createInMemoryDatabaseConnection([User], 'userController');
    repository = database.getRepository(User);
    service = new UserService(repository);
    controller = new UserController(service);
  });

  describe('Save a User', () => {
    it('should return status code 200 on success', async () => {
      expect(
        await controller.save(CreateUserDTO.examples.valid, response),
      ).toMatchSnapshot({
        statusCode: HttpStatus.CREATED,
      });
    });
    it('should return status code 409 on malformed request (invalid DTO)', async () => {
      expect(
        await controller.save(CreateUserDTO.examples.invalid, response),
      ).toMatchSnapshot({
        statusCode: HttpStatus.BAD_REQUEST,
      });
    });

    it('should return status code 401 on email conflict ', async () => {
      await controller.save(CreateUserDTO.examples.valid, response);

      expect(
        await controller.save(CreateUserDTO.examples.valid, response),
      ).toMatchSnapshot({
        statusCode: HttpStatus.CONFLICT,
      });
    });
  });
});
