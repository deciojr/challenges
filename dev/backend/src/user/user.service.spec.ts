import { HttpStatus } from '@nestjs/common';
import { Connection } from 'typeorm';

import { createInMemoryDatabaseConnection } from '../shared/test/create-in-memory-database-connection';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  let database: Connection;

  beforeAll(async () => {
    database = await createInMemoryDatabaseConnection([User], 'userService');
    repository = database.getRepository(User);
    service = new UserService(repository);
  });

  describe('Save a User', () => {
    it('should save a user', async () => {
      expect(await service.save(CreateUserDTO.examples.valid)).toMatchSnapshot(
        HttpStatus.CREATED,
      );
    });

    it('should not save the same email twice', async () => {
      await service.save(CreateUserDTO.examples.valid);
      expect(await service.save(CreateUserDTO.examples.valid)).toMatchSnapshot(
        HttpStatus.CONFLICT,
      );
    });

    it('should send a bad request on error', async () => {
      expect(await service.save(null)).toMatchSnapshot(HttpStatus.BAD_REQUEST);
    });
  });
});
