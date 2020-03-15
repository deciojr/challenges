import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { userRoutes } from './user.routes';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller(userRoutes.prefix)
@ApiTags(userRoutes.swaggerTag)
export class UserController {
  constructor(@Inject(UserService) readonly userService: UserService) {}

  @ApiOperation({
    description: 'Create a new User',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Could not create the user',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already registered',
  })
  @Post(userRoutes.paths.save as string)
  async save(@Body() createUserDTO: CreateUserDTO, @Res() response: Response) {
    const user = await CreateUserDTO.toUser(createUserDTO);

    const statusCode = await this.userService.save(user);

    return response.send({
      statusCode,
    });
  }
}
