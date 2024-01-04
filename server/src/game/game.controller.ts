import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateGameResponse } from './dto/create-game.dto';
import { GetGameByIdParams, GetGameByIdResponse } from './dto/get-game-by-id.dto';
import { JoinGameParams, JoinGameResponse } from './dto/join-game.dto';
import { ListGamesResponse } from './dto/list-games-for-player';
import { MakeStepBody, MakeStepParams, MakeStepResponse } from './dto/make-step.dto';
import { GameService } from './game.service';
import { AuthUserModel } from '../auth/auth-user.model';
import { HTTPBearerAuth } from '../decorators/http-bearer-auth';
import { AuthUser } from '../decorators/token-user';
import { LoggerService } from '../logger/logger.service';
import { WsGateway } from '../ws/ws.gateway';

@ApiTags('Games')
@Controller('/api/v1/games')
export class GameController {
  public constructor(
    private readonly wsGateway: WsGateway,
    private readonly gameService: GameService,
    private readonly logger: LoggerService,
  ) {}

  @HTTPBearerAuth()
  @ApiOperation({ description: 'Create Game' })
  @ApiResponse({ type: CreateGameResponse })
  @Post('/')
  public async createGame(@AuthUser() user: AuthUserModel): Promise<CreateGameResponse> {
    try {
      const game = await this.gameService.createGame({ playerId: user.id });

      return new CreateGameResponse(game);
    } catch (error) {
      this.logger.error('GameController.createGame', error);
      throw error;
    }
  }

  @HTTPBearerAuth()
  @ApiOperation({ description: 'Get Game By Id' })
  @ApiResponse({ type: GetGameByIdResponse })
  @Get('/:gameId')
  public async getGameById(@Param() params: GetGameByIdParams): Promise<GetGameByIdResponse> {
    try {
      const game = await this.gameService.getGameById({ id: params.gameId });

      return new GetGameByIdResponse(game);
    } catch (error) {
      this.logger.error('GameController.getGameById', error);
      throw error;
    }
  }

  @HTTPBearerAuth()
  @ApiOperation({ description: 'Join Game' })
  @ApiResponse({ type: JoinGameResponse })
  @Post('/:gameId/join')
  public async joinGame(@AuthUser() user: AuthUserModel, @Param() params: JoinGameParams): Promise<JoinGameResponse> {
    try {
      const game = await this.gameService.joinGame({ gameId: params.gameId, playerId: user.id });
      this.wsGateway.send(game);

      return new JoinGameResponse(game);
    } catch (error) {
      this.logger.error('GameController.joinGame', error);
      throw error;
    }
  }

  @HTTPBearerAuth()
  @ApiOperation({ description: 'Make Step' })
  @ApiResponse({ type: MakeStepResponse })
  @Post('/:gameId/make-step')
  public async makeStep(
    @AuthUser() user: AuthUserModel,
    @Param() params: MakeStepParams,
    @Body() body: MakeStepBody,
  ): Promise<MakeStepResponse> {
    try {
      const game = await this.gameService.makeStep({ gameId: params.gameId, cell: body.cell, playerId: user.id });

      this.wsGateway.send(game);

      return new MakeStepResponse(game);
    } catch (error) {
      this.logger.error('GameController.makeStep', error);
      throw error;
    }
  }

  @HTTPBearerAuth()
  @ApiOperation({ description: 'List Games' })
  @ApiResponse({ type: ListGamesResponse })
  @Get('/')
  public async listGames(@AuthUser() user: AuthUserModel): Promise<ListGamesResponse> {
    try {
      const games = await this.gameService.listGames();

      return new ListGamesResponse(games);
    } catch (error) {
      this.logger.error('GameController.listGamesForPlayer', error);
      throw error;
    }
  }
}
