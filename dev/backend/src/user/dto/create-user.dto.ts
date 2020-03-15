import { ApiProperty } from '@nestjs/swagger/';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { DTO } from '../../shared/model/dto.model';

import { User } from '../user.entity';

export class CreateUserDTO implements Readonly<DTO<CreateUserDTO>> {
  static examples: {
    valid: CreateUserDTO;
    invalid: CreateUserDTO;
  } = {
    valid: {
      email: 'email@email.com',
      password: 'password',
      firstName: 'firstname',
      lastName: 'lastname',
      secretQuestion: 'question',
      secretAnswer: 'answer',
    },
    invalid: {
      email: undefined,
      password: '123',
      firstName: undefined,
      lastName: undefined,
      secretQuestion: undefined,
      secretAnswer: undefined,
    },
  };

  @ApiProperty({ required: true })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  secretQuestion: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  secretAnswer: string;

  static async toUser({
    firstName,
    lastName,
    email,
    password,
    secretQuestion,
    secretAnswer,
  }: CreateUserDTO): Promise<User> {
    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.password = await user.hashPassword(password);
    user.email = email;
    user.secretQuestion = secretQuestion;
    user.secretAnswer = secretAnswer;

    return user;
  }
}
