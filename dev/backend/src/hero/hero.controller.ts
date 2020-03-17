import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { JwtGuard } from '../authentication/guard/jwt.guard';

import { CreateHeroDTO } from './dto/create-hero.dto';
import { heroRoutes } from './hero.routes';
import { HeroService } from './hero.service';

@Controller(heroRoutes.prefix)
@ApiTags(heroRoutes.swaggerTag)
@UseGuards(JwtGuard)
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @ApiOperation({
    description: 'Register a new Hero',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Hero created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Could not create the hero',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Badge already registered',
  })
  @Post(heroRoutes.paths.save as string)
  async save(@Body() createHeroDTO: CreateHeroDTO, @Res() response: Response) {
    const hero = await CreateHeroDTO.toHero(createHeroDTO);

    const statusCode = await this.heroService.save(hero);

    return response.send({
      id: statusCode,
    });
  }
}
