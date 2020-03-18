import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { CreateThreatDTO } from './dto/create-threat.dto';
import { QueryParams } from './model/query-params.model';
import { threatRoutes } from './threat.routes';
import { ThreatService } from './threat.service';

@Controller(threatRoutes.prefix)
@ApiTags(threatRoutes.swaggerTag)
export class ThreatController {
  constructor(private threatService: ThreatService) {}

  @ApiOperation({
    description: 'Register a new Threat',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Threat created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Could not create the threat',
  })
  @Post(threatRoutes.paths.save as string)
  async save(
    @Body() createThreatDTO: CreateThreatDTO,
    @Res() response: Response,
  ) {
    const threat = await CreateThreatDTO.toThreat(createThreatDTO);

    const statusCode = await this.threatService.process(threat);

    return response.send({
      id: statusCode,
    });
  }

  @ApiOperation({
    description: 'List threats',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of threats based on the query parameters',
  })
  @Get(threatRoutes.paths.list as string)
  async list(@Query() query: QueryParams, @Res() response: Response) {
    const threats = await this.threatService.list(query);
    return response.send(threats);
  }
}
