import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { JwtGuard } from '../authentication/guard/jwt.guard';
import { CreateHeroDTO } from './dto/create-hero.dto';
import { DeleteHeroDTO } from './dto/dalete-hero.dto';
import { UpdateHeroDTO } from './dto/update-hero.dto';
import { Hero } from './hero.entity';
import { heroRoutes } from './hero.routes';
import { HeroService } from './hero.service';
import { QueryParams } from './model/query-params.model';

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

  @ApiOperation({
    description: 'List heroes',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of heroes based on the query parameters',
  })
  @Get(heroRoutes.paths.list as string)
  async list(@Query() query: QueryParams, @Res() response: Response) {
    const heroes = await this.heroService.list(query);
    return response.send(heroes);
  }

  @ApiOperation({
    description: 'Update a hero',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated the hero successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Could not update the hero',
  })
  @Put(heroRoutes.paths.update as string)
  async update(
    @Body() updateHeroDTO: UpdateHeroDTO,
    @Res() response: Response,
  ) {
    const hero = UpdateHeroDTO.toHero(updateHeroDTO);

    const statusCode = await this.heroService.update(hero);

    return response.send({
      id: statusCode,
    });
  }

  @ApiOperation({
    description: 'Delete a hero',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted the hero successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Could not delete the hero',
  })
  @Delete(heroRoutes.paths.delete as string)
  async delete(@Param('id') id: string, @Res() response: Response) {
    const statusCode = await this.heroService.delete(id);

    return response.send({
      id: statusCode,
    });
  }
}
